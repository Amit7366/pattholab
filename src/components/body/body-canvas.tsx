"use client";

import { useEffect, useRef, useState } from "react";
import { findPart, type SystemId } from "@/data/anatomy";

const VIEWER_SRC = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";

const MODELS: Record<SystemId, { uid: string; title: string }> = {
  organs: { uid: "5cfafb312f504815aa3fec55735607a6", title: "Splanchnology" },
  skeleton: { uid: "a890d801336047d683d56d8bc676e894", title: "Arthrology" },
  muscles: { uid: "31b40fd809b14665b93773936d67c52c", title: "Myology" },
  circulation: { uid: "0caae8f894cc40b69f3f78adf14b9665", title: "Angiology" },
};

type Material = { id?: string; name?: string };

type SketchfabNode = {
  instanceID?: number;
  name?: string;
  type?: string;
  materialID?: string | number;
  children?: SketchfabNode[];
};

type SketchfabClick = { instanceID?: number; material?: Material };

type SketchfabApi = {
  start: () => void;
  stop: () => void;
  addEventListener: (
    event: string,
    callback: (payload: SketchfabClick & SketchfabNode) => void,
    options?: { pick: "fast" | "slow" },
  ) => void;
  getMaterialList: (callback: (error: unknown, materials: Material[]) => void) => void;
  getSceneGraph: (callback: (error: unknown, graph: SketchfabNode) => void) => void;
  highlightMaterial: (material: Material) => void;
  setHighlightOptions: (options: Record<string, unknown>, callback?: () => void) => void;
  setBackground: (options: { color: number[] }, callback?: () => void) => void;
  recenterCamera: (callback?: (error: unknown) => void) => void;
  getAnnotationList?: (callback: (error: unknown, annotations: unknown[]) => void) => void;
  hideAnnotation?: (index: number, callback?: () => void) => void;
};

type PartBinding = { instanceIDs: number[]; materials: Material[] };

type BodyIndex = {
  byPart: Map<string, PartBinding>;
  instanceToPart: Map<number, string>;
};

type SketchfabClient = {
  init: (uid: string, options: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    Sketchfab?: new (version: string, iframe: HTMLIFrameElement) => SketchfabClient;
  }
}

const NAME_RULES: { id: string; pattern: RegExp }[] = [
  { id: "vena-cava", pattern: /vena\s*cava|venae\s*cavae/i },
  { id: "aorta", pattern: /\baorta\b|\baortic arch\b/i },
  { id: "arteries", pattern: /\bartery\b|\barteries\b|\barterial\b/i },
  { id: "veins", pattern: /\bvein\b|\bveins\b|\bvenous\b/i },
  { id: "hamstrings", pattern: /biceps femoris|semitendinosus|semimembranosus|hamstring/i },
  { id: "quadriceps", pattern: /quadriceps|rectus femoris|\bvastus\b/i },
  { id: "biceps", pattern: /\bbiceps\b/i },
  { id: "deltoid", pattern: /\bdeltoid\b/i },
  { id: "pectoralis", pattern: /\bpectoralis\b/i },
  { id: "abdominals", pattern: /rectus abdominis|abdominal oblique|transversus abdominis/i },
  { id: "calf", pattern: /gastrocnemius|\bsoleus\b/i },
  { id: "trapezius", pattern: /\btrapezius\b/i },
  { id: "brain", pattern: /cerebrum|cerebellum|brainstem|encephalon|\bbrain\b/i },
  { id: "heart", pattern: /\bheart\b/i },
  { id: "lungs", pattern: /\blung\b|\blungs\b/i },
  { id: "liver", pattern: /\bliver\b/i },
  { id: "pancreas", pattern: /\bpancreas\b/i },
  { id: "stomach", pattern: /\bstomach\b/i },
  { id: "small-intestine", pattern: /small intestine|duodenum|jejunum|\bileum\b/i },
  { id: "large-intestine", pattern: /large intestine|greater intestine|\bcolon\b|\brectum\b|\bcaecum\b|\bcecum\b/i },
  { id: "kidneys", pattern: /\bkidney\b|\bkidneys\b/i },
  { id: "skull", pattern: /\bskull\b|\bcranium\b|frontal bone|parietal bone|occipital bone|temporal bone|\bmandible\b|\bmaxilla\b/i },
  { id: "spine", pattern: /vertebra|\bsacrum\b|\bcoccyx\b/i },
  { id: "rib-cage", pattern: /\brib\b|\bsternum\b|costal cartilage/i },
  { id: "shoulder", pattern: /\bscapula\b|\bclavicle\b/i },
  { id: "humerus", pattern: /\bhumerus\b/i },
  { id: "forearm", pattern: /\bradius\b|\bulna\b/i },
  { id: "pelvis", pattern: /\bpelvis\b|hip bone|\bilium\b|\bischium\b|\bpubis\b/i },
  { id: "femur", pattern: /\bfemur\b/i },
  { id: "lower-leg", pattern: /\btibia\b|\bfibula\b|\bpatella\b/i },
];

function partIdFromName(name: string | undefined, system: SystemId) {
  if (!name) return null;
  let id: string | null = null;
  for (const rule of NAME_RULES) {
    if (rule.pattern.test(name)) {
      id = rule.id;
      break;
    }
  }
  if (!id) return null;
  const part = findPart(id);
  return part?.systems.includes(system) ? id : null;
}

function materialKey(material: Material | undefined) {
  if (!material) return null;
  return material.id ?? material.name ?? null;
}

function bindingFor(index: BodyIndex, partId: string) {
  const existing = index.byPart.get(partId);
  if (existing) return existing;
  const created: PartBinding = { instanceIDs: [], materials: [] };
  index.byPart.set(partId, created);
  return created;
}

function rememberMaterial(binding: PartBinding, material: Material | undefined) {
  if (!material) return;
  const key = materialKey(material);
  if (binding.materials.some((item) => materialKey(item) === key && key)) return;
  binding.materials.push(material);
}

function materialForNode(node: SketchfabNode, materials: Material[], materialsById: Map<string, Material>) {
  if (node.materialID !== undefined) {
    const found = materialsById.get(String(node.materialID));
    if (found) return found;
  }
  if (!node.name) return undefined;
  return materials.find((material) => material.name && node.name?.includes(material.name));
}

function buildIndex(graph: SketchfabNode, materials: Material[], system: SystemId) {
  const index: BodyIndex = { byPart: new Map(), instanceToPart: new Map() };
  const materialsById = new Map<string, Material>();
  for (const material of materials) {
    if (material.id) materialsById.set(material.id, material);
  }

  const visit = (node: SketchfabNode, inherited: string | null) => {
    const material = materialForNode(node, materials, materialsById);
    const named = partIdFromName(node.name, system);
    const fromMaterial = partIdFromName(material?.name, system);
    const own = named ?? fromMaterial;
    const partId = own ?? inherited;
    if (partId && typeof node.instanceID === "number") {
      const binding = bindingFor(index, partId);
      if (own && !binding.instanceIDs.includes(node.instanceID)) binding.instanceIDs.push(node.instanceID);
      if (node.type === "Geometry") {
        index.instanceToPart.set(node.instanceID, partId);
        if (!binding.instanceIDs.includes(node.instanceID)) binding.instanceIDs.push(node.instanceID);
        if (named || fromMaterial === partId) rememberMaterial(binding, material);
      }
    }
    for (const child of node.children ?? []) visit(child, partId);
  };

  visit(graph, null);
  return index;
}

function applyHighlight(api: SketchfabApi, index: BodyIndex, partId: string | null) {
  const materials = partId ? (index.byPart.get(partId)?.materials ?? []) : [];
  api.setHighlightOptions(
    {
      outlineWidth: 2,
      outlineColor: [0.42, 0.16, 0.1, 1],
      outlineDuration: materials.length ? 3600 : 0,
      highlightColor: [0.95, 0.72, 0.45, 0.4],
      highlightDuration: materials.length ? 3600 : 0,
    },
    () => {
      for (const material of materials) api.highlightMaterial(material);
    },
  );
}

function loadViewerScript() {
  if (window.Sketchfab) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${VIEWER_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Sketchfab viewer failed to load")), {
        once: true,
      });
      if (window.Sketchfab) resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = VIEWER_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Sketchfab viewer failed to load"));
    document.body.appendChild(script);
  });
}

export function BodyCanvas({
  system,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  system: SystemId;
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<SketchfabApi | null>(null);
  const indexRef = useRef<BodyIndex | null>(null);
  const onSelectRef = useRef(onSelect);
  const onHoverRef = useRef(onHover);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const model = MODELS[system];
  const labelId = hovered ?? selected;
  const label = labelId ? findPart(labelId) : null;

  useEffect(() => {
    onSelectRef.current = onSelect;
    onHoverRef.current = onHover;
  }, [onSelect, onHover]);

  useEffect(() => {
    const iframe = frameRef.current;
    if (!iframe) return;
    let cancelled = false;
    let api: SketchfabApi | null = null;
    const frameTimers: number[] = [];

    loadViewerScript()
      .then(() => {
        if (cancelled || !window.Sketchfab || !frameRef.current) return;
        const client = new window.Sketchfab("1.12.1", frameRef.current);
        client.init(model.uid, {
          success: (nextApi: SketchfabApi) => {
            if (cancelled) {
              nextApi.stop();
              return;
            }
            api = nextApi;
            apiRef.current = nextApi;
            nextApi.start();
            nextApi.addEventListener("viewerready", () => {
              const frameBody = () => {
                if (!cancelled) nextApi.recenterCamera();
              };
              nextApi.setBackground({ color: [0.835, 0.808, 0.761] });
              nextApi.getAnnotationList?.((_error, annotations) => {
                annotations?.forEach((_annotation, index) => nextApi.hideAnnotation?.(index));
                frameBody();
              });
              frameBody();
              frameTimers.push(window.setTimeout(frameBody, 1200), window.setTimeout(frameBody, 2800));
              nextApi.getMaterialList((materialError, materials) => {
                nextApi.getSceneGraph((graphError, graph) => {
                  if (cancelled || materialError || graphError || !graph) {
                    if (!cancelled) setStatus("error");
                    return;
                  }
                  const index = buildIndex(graph, materials ?? [], system);
                  indexRef.current = index;
                  applyHighlight(nextApi, index, hovered ?? selected);
                  setStatus("ready");
                });
              });
            });
            nextApi.addEventListener(
              "click",
              (info) => {
                const index = indexRef.current;
                if (!index || !info.instanceID) {
                  onSelectRef.current(null);
                  return;
                }
                const partId =
                  index.instanceToPart.get(info.instanceID) ??
                  partIdFromName(info.material?.name, system);
                if (partId) onSelectRef.current(partId);
              },
              { pick: "slow" },
            );
            nextApi.addEventListener(
              "nodeMouseEnter",
              (node) => {
                const partId =
                  (typeof node.instanceID === "number"
                    ? indexRef.current?.instanceToPart.get(node.instanceID)
                    : undefined) ?? partIdFromName(node.material?.name, system);
                onHoverRef.current(partId ?? null);
              },
              { pick: "fast" },
            );
            nextApi.addEventListener("nodeMouseLeave", () => onHoverRef.current(null), { pick: "fast" });
          },
          error: () => {
            if (!cancelled) setStatus("error");
          },
          autostart: 1,
          preload: 1,
          autospin: 0,
          scrollwheel: 1,
          ui_infos: 0,
          ui_controls: 0,
          ui_stop: 0,
          ui_inspector: 0,
          ui_help: 0,
          ui_settings: 0,
          ui_vr: 0,
          ui_fullscreen: 0,
          ui_annotations: 0,
          annotations_visible: 0,
          ui_hint: 0,
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      frameTimers.forEach((timer) => window.clearTimeout(timer));
      api?.stop();
      apiRef.current = null;
      indexRef.current = null;
    };
    // Each system is a separate model. Reset view remounts this canvas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model.uid]);

  useEffect(() => {
    const api = apiRef.current;
    const index = indexRef.current;
    if (!api || !index || status !== "ready") return;
    applyHighlight(api, index, hovered ?? selected);
  }, [hovered, selected, status]);

  return (
    <div className="relative h-full w-full">
      <iframe
        ref={frameRef}
        title={`${model.title} by Z-Anatomy`}
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
      {status !== "ready" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#d5cec2] px-6 text-center text-sm text-[#3f3832]">
          {status === "error" ? "The body model could not be loaded." : "Loading the body…"}
        </div>
      ) : null}
      {label ? (
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-[#1c1915] px-2.5 py-1.5 text-center shadow-sm">
          <p className="text-[11px] leading-none text-[#f4f0e8]">{label.nameEn}</p>
          <p className="mt-1 text-[11px] leading-none text-[#f4f0e8]/80 [font-family:var(--font-bengali)]">
            {label.nameBn}
          </p>
        </div>
      ) : null}
    </div>
  );
}
