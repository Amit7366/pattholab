"use client";

import { useEffect, useRef, useState } from "react";
import { findCellPart, type CellGroupId } from "@/data/plant-cell";

const MODEL_UID = "7fe3ac29756a45c6b678804a8da8a760";
const VIEWER_SRC = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";

type Material = {
  id?: string;
  name?: string;
};

type SketchfabNode = {
  instanceID?: number;
  name?: string;
  type?: string;
  materialID?: string | number;
  children?: SketchfabNode[];
};

type SketchfabClick = {
  instanceID?: number;
  material?: Material;
};

type SketchfabApi = {
  start: () => void;
  stop: () => void;
  addEventListener: (
    event: string,
    callback: (payload: SketchfabClick & SketchfabNode) => void,
    options?: { pick: "fast" | "slow" },
  ) => void;
  getNodeMap: (callback: (error: unknown, nodes: Record<string, SketchfabNode>) => void) => void;
  getSceneGraph: (callback: (error: unknown, graph: SketchfabNode) => void) => void;
  getMaterialList: (callback: (error: unknown, materials: Material[]) => void) => void;
  show: (instanceID: number) => void;
  hide: (instanceID: number) => void;
  highlightMaterial: (material: Material) => void;
  setHighlightOptions: (options: Record<string, unknown>, callback?: () => void) => void;
  setBackground: (options: { color: number[] }, callback?: () => void) => void;
};

type PartBinding = {
  instanceIDs: number[];
  materials: Material[];
};

type CellIndex = {
  byPart: Map<string, PartBinding>;
  instanceToPart: Map<number, string>;
  geometryIds: number[];
};

type SketchfabClient = {
  init: (uid: string, options: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    Sketchfab?: new (version: string, iframe: HTMLIFrameElement) => SketchfabClient;
  }
}

const EXACT_NODE_PARTS: Record<string, string> = {
  Box008: "cell-wall",
  Group002: "cell-wall",
  Object028: "plasma-membrane",
  Box021: "vacuole",
  Box013: "chloroplast",
  Box017: "chloroplast",
  Box018: "chloroplast",
  Group003: "chloroplast",
  Object011: "rough-er",
  Object006: "mitochondria",
  Object007: "mitochondria",
  Object013: "mitochondria",
  Object014: "mitochondria",
  Object015: "mitochondria",
  Sphere026: "nucleus",
  Sphere009: "nuclear-envelope",
  Object: "chromatin",
};

const NAME_RULES: { id: string; pattern: RegExp }[] = [
  { id: "chloroplast", pattern: /chloroplast|kloroplast/i },
  { id: "mitochondria", pattern: /mita?kondri|mitochond/i },
  { id: "vacuole", pattern: /vacuole|vakuol|koful/i },
  { id: "golgi", pattern: /golgi/i },
  { id: "lysosome", pattern: /lysosom|lizoz/i },
  { id: "rough-er", pattern: /endoplaz|retik(u|ü)l/i },
  { id: "intercellular-space", pattern: /^Torus\d+$/ },
];

function partIdFromName(name: string | undefined) {
  if (!name) return null;
  const exact = EXACT_NODE_PARTS[name];
  if (exact) return exact;
  if (/default|material\s*#/i.test(name)) return null;
  for (const rule of NAME_RULES) {
    if (rule.pattern.test(name)) return rule.id;
  }
  return null;
}

function materialKey(material: Material | undefined) {
  if (!material) return null;
  return material.id ?? material.name ?? null;
}

function bindingFor(index: CellIndex, partId: string) {
  const existing = index.byPart.get(partId);
  if (existing) return existing;
  const created: PartBinding = { instanceIDs: [], materials: [] };
  index.byPart.set(partId, created);
  return created;
}

function rememberMaterial(binding: PartBinding, material: Material | undefined) {
  if (!material) return;
  const key = materialKey(material);
  const already = binding.materials.some((item) => materialKey(item) === key && key);
  if (!already) binding.materials.push(material);
}

function materialForNode(node: SketchfabNode, materials: Material[], materialsById: Map<string, Material>) {
  if (node.materialID !== undefined) {
    const found = materialsById.get(String(node.materialID));
    if (found) return found;
  }
  if (!node.name) return undefined;
  return materials.find((material) => material.name && node.name?.includes(material.name));
}

function buildIndex(graph: SketchfabNode, materials: Material[]) {
  const index: CellIndex = { byPart: new Map(), instanceToPart: new Map(), geometryIds: [] };
  const materialsById = new Map<string, Material>();
  for (const material of materials) {
    if (material.id) materialsById.set(material.id, material);
    const partId = partIdFromName(material.name);
    if (partId) rememberMaterial(bindingFor(index, partId), material);
  }

  const visit = (node: SketchfabNode, inherited: string | null) => {
    const own = partIdFromName(node.name);
    const partId = own ?? inherited;
    if (partId && typeof node.instanceID === "number") {
      const binding = bindingFor(index, partId);
      if (own && !binding.instanceIDs.includes(node.instanceID)) binding.instanceIDs.push(node.instanceID);
      if (node.type === "Geometry") {
        index.instanceToPart.set(node.instanceID, partId);
        if (!binding.instanceIDs.includes(node.instanceID)) binding.instanceIDs.push(node.instanceID);
        rememberMaterial(binding, materialForNode(node, materials, materialsById));
      }
    }
    if (node.type === "Geometry" && typeof node.instanceID === "number" && !index.geometryIds.includes(node.instanceID)) {
      index.geometryIds.push(node.instanceID);
    }
    for (const child of node.children ?? []) visit(child, partId);
  };

  visit(graph, null);

  const shareHighlight = (from: string, to: string) => {
    const source = index.byPart.get(from);
    if (!source) return;
    const target = bindingFor(index, to);
    for (const material of source.materials) rememberMaterial(target, material);
  };
  shareHighlight("nuclear-envelope", "nuclear-pore");
  shareHighlight("nucleus", "nucleoplasm");
  shareHighlight("nucleus", "nucleolus");

  return index;
}

function applyVisibility(api: SketchfabApi, index: CellIndex, group: CellGroupId) {
  if (group === "all") {
    for (const id of index.geometryIds) api.show(id);
    for (const binding of index.byPart.values()) {
      for (const id of binding.instanceIDs) api.show(id);
    }
    return;
  }

  const visible = new Set<number>();
  for (const [partId, binding] of index.byPart) {
    const show = findCellPart(partId)?.group === group;
    for (const id of binding.instanceIDs) {
      if (show) visible.add(id);
      else api.hide(id);
    }
  }
  for (const id of index.geometryIds) {
    if (!visible.has(id)) api.hide(id);
  }
}

function applyHighlight(api: SketchfabApi, index: CellIndex, partId: string | null) {
  const materials = partId ? (index.byPart.get(partId)?.materials ?? []) : [];
  api.setHighlightOptions(
    {
      outlineWidth: 2,
      outlineColor: [0.05, 0.42, 0.3, 1],
      outlineDuration: materials.length ? 3600 : 0,
      highlightColor: [0.55, 0.86, 0.7, 0.45],
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

export function CellCanvas({
  group,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  group: CellGroupId;
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string | null) => void;
  onHover: (id: string | null) => void;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<SketchfabApi | null>(null);
  const indexRef = useRef<CellIndex | null>(null);
  const onSelectRef = useRef(onSelect);
  const onHoverRef = useRef(onHover);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const labelId = hovered ?? selected;
  const label = labelId ? findCellPart(labelId) : null;

  useEffect(() => {
    onSelectRef.current = onSelect;
    onHoverRef.current = onHover;
  }, [onSelect, onHover]);

  useEffect(() => {
    const iframe = frameRef.current;
    if (!iframe) return;
    let cancelled = false;
    let api: SketchfabApi | null = null;

    loadViewerScript()
      .then(() => {
        if (cancelled || !window.Sketchfab || !frameRef.current) return;
        const client = new window.Sketchfab("1.12.1", frameRef.current);
        client.init(MODEL_UID, {
          success: (nextApi: SketchfabApi) => {
            if (cancelled) {
              nextApi.stop();
              return;
            }
            api = nextApi;
            apiRef.current = nextApi;
            nextApi.start();
            nextApi.addEventListener("viewerready", () => {
              nextApi.setBackground({ color: [0.894, 0.929, 0.839] });
              nextApi.getMaterialList((materialError, materials) => {
                nextApi.getSceneGraph((graphError, graph) => {
                  if (cancelled || materialError || graphError || !graph) {
                    if (!cancelled) setStatus("error");
                    return;
                  }
                  const index = buildIndex(graph, materials ?? []);
                  indexRef.current = index;
                  applyVisibility(nextApi, index, group);
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
                const partId = index.instanceToPart.get(info.instanceID);
                if (partId) onSelectRef.current(partId);
              },
              { pick: "slow" },
            );
            nextApi.addEventListener(
              "nodeMouseEnter",
              (node) => {
                const partId =
                  typeof node.instanceID === "number"
                    ? indexRef.current?.instanceToPart.get(node.instanceID)
                    : undefined;
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
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      api?.stop();
      apiRef.current = null;
      indexRef.current = null;
    };
    // The viewer is created once per mount. Reset view remounts this canvas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const api = apiRef.current;
    const index = indexRef.current;
    if (!api || !index || status !== "ready") return;
    applyVisibility(api, index, group);
  }, [group, status]);

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
        title="Plant cell model by NaraXR"
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
      {status !== "ready" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#e4edd6] px-6 text-center text-sm text-[#3d4a34]">
          {status === "error" ? "The plant-cell model could not be loaded." : "Loading the plant cell…"}
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
