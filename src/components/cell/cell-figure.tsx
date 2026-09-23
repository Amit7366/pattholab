"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { CellGroupId, CellPartGroup } from "@/data/plant-cell";

type CellState = {
  group: CellGroupId;
  selected: string | null;
  hovered: string | null;
  select: (id: string) => void;
  hover: (id: string | null) => void;
};

const CellCtx = createContext<CellState>({
  group: "all",
  selected: null,
  hovered: null,
  select: () => undefined,
  hover: () => undefined,
});

const color = {
  wall: "#5e8f84",
  membrane: "#b85d6c",
  cytoplasm: "#e3f0c2",
  vacuole: "#d3e6a6",
  nucleus: "#e4b4d2",
  nucleolus: "#8a3d74",
  chromatin: "#5a2c50",
  chloroplast: "#2f8a44",
  grana: "#1c5a2c",
  mito: "#d4783c",
  smooth: "#e7a3b8",
  rough: "#c46d8c",
  ribosome: "#4a3144",
  golgi: "#f0c6d4",
  lysosome: "#6b9a58",
  gap: "#f6f3ea",
};

const nucleusIds = new Set([
  "nucleus",
  "nuclear-envelope",
  "nuclear-pore",
  "nucleolus",
  "chromatin",
  "nucleoplasm",
]);

export const cellAnchors: Record<string, [number, number, number]> = {
  "cell-wall": [-1.15, 0.72, 0.45],
  "plasma-membrane": [1.05, 0.55, 0.4],
  "intercellular-space": [1.35, 0.95, 0.2],
  cytoplasm: [-0.85, -0.15, 0.55],
  vacuole: [-0.35, 0.15, 0.55],
  nucleus: [0.72, 0.15, 0.55],
  "nuclear-envelope": [0.85, 0.28, 0.45],
  "nuclear-pore": [0.58, 0.22, 0.58],
  nucleolus: [0.62, 0.02, 0.62],
  chromatin: [0.48, -0.08, 0.55],
  nucleoplasm: [0.7, -0.12, 0.5],
  "smooth-er": [-0.15, 0.62, 0.5],
  "rough-er": [0.28, 0.28, 0.55],
  golgi: [0.22, -0.58, 0.55],
  mitochondria: [-0.55, 0.42, 0.5],
  chloroplast: [-0.45, 0.48, 0.55],
  lysosome: [0.78, -0.52, 0.5],
};

const smoothPath: readonly (readonly [number, number, number])[] = [
  [-0.35, 0.48, 0.28],
  [-0.12, 0.62, 0.32],
  [0.08, 0.5, 0.3],
  [-0.02, 0.38, 0.34],
];

const roughPath: readonly (readonly [number, number, number])[] = [
  [0.18, 0.22, 0.32],
  [0.32, 0.32, 0.36],
  [0.42, 0.18, 0.34],
  [0.3, 0.08, 0.38],
];

const chromatinPath: readonly (readonly [number, number, number])[] = [
  [-0.1, 0.1, 0.1],
  [-0.02, 0, 0.16],
  [-0.06, -0.1, 0.1],
  [0.04, -0.04, 0.18],
];

function setCursor(event: ThreeEvent<PointerEvent>, cursor: string) {
  if (event.nativeEvent.target instanceof HTMLElement) {
    event.nativeEvent.target.style.cursor = cursor;
  }
}

function usePick(id?: string) {
  const ctx = useContext(CellCtx);
  if (!id) return { raycast: () => undefined };
  return {
    onClick: (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      ctx.select(id);
    },
    onPointerOver: (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      ctx.hover(id);
      setCursor(event, "pointer");
    },
    onPointerOut: (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      ctx.hover(null);
      setCursor(event, "grab");
    },
  };
}

function shown(partGroup: CellPartGroup, group: CellGroupId) {
  return group === "all" || group === partGroup;
}

function Mat({
  id,
  partGroup,
  color: base,
  opacity = 1,
}: {
  id?: string;
  partGroup?: CellPartGroup;
  color: string;
  opacity?: number;
}) {
  const { group, selected, hovered } = useContext(CellCtx);
  const focused =
    Boolean(id && (selected === id || hovered === id)) ||
    Boolean(id && nucleusIds.has(id) && (selected === "nucleus" || hovered === "nucleus"));
  const faded = partGroup ? !shown(partGroup, group) : false;
  const alpha = faded ? opacity * 0.2 : opacity;
  return (
    <meshStandardMaterial
      color={base}
      roughness={0.48}
      metalness={0.02}
      emissive={focused ? base : "#000000"}
      emissiveIntensity={focused ? 0.3 : 0}
      transparent={alpha < 1}
      opacity={alpha}
      depthWrite={alpha > 0.6}
    />
  );
}

function Tube({
  id,
  partGroup,
  points,
  radius,
  tubeColor,
}: {
  id: string;
  partGroup: CellPartGroup;
  points: readonly (readonly [number, number, number])[];
  radius: number;
  tubeColor: string;
}) {
  const geometry = useMemo(() => {
    const path = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
    return new THREE.TubeGeometry(path, 40, radius, 8, false);
  }, [points, radius]);
  const pick = usePick(id);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh geometry={geometry} {...pick}>
      <Mat id={id} partGroup={partGroup} color={tubeColor} />
    </mesh>
  );
}

function Chloroplast({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const pick = usePick("chloroplast");
  return (
    <group position={position} rotation={rotation} {...pick}>
      <mesh scale={[0.2, 0.11, 0.08]}>
        <sphereGeometry args={[1, 24, 16]} />
        <Mat id="chloroplast" partGroup="organelles" color={color.chloroplast} />
      </mesh>
      {[ -0.04, 0, 0.04 ].map((offset) => (
        <mesh key={offset} position={[offset, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]} raycast={() => undefined}>
          <cylinderGeometry args={[0.035, 0.035, 0.012, 10]} />
          <Mat partGroup="organelles" color={color.grana} />
        </mesh>
      ))}
    </group>
  );
}

function Mitochondrion({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const pick = usePick("mitochondria");
  return (
    <group position={position} rotation={rotation} {...pick}>
      <mesh scale={[0.12, 0.07, 0.06]}>
        <sphereGeometry args={[1, 20, 14]} />
        <Mat id="mitochondria" partGroup="organelles" color={color.mito} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]} raycast={() => undefined}>
        <torusGeometry args={[0.035, 0.008, 6, 12]} />
        <Mat partGroup="organelles" color="#a85a28" />
      </mesh>
    </group>
  );
}

function WallBump({ position }: { position: [number, number, number] }) {
  const pick = usePick("cell-wall");
  return (
    <mesh position={position} {...pick}>
      <sphereGeometry args={[0.07, 16, 12]} />
      <Mat id="cell-wall" partGroup="boundary" color={color.wall} />
    </mesh>
  );
}

function Gap({ position }: { position: [number, number, number] }) {
  const pick = usePick("intercellular-space");
  return (
    <mesh position={position} scale={[0.16, 0.12, 0.08]} {...pick}>
      <sphereGeometry args={[1, 18, 12]} />
      <Mat id="intercellular-space" partGroup="boundary" color={color.gap} />
    </mesh>
  );
}

function Nucleus() {
  const body = usePick("nucleus");
  const nucleolus = usePick("nucleolus");
  const pore = usePick("nuclear-pore");
  const chromatin = usePick("chromatin");
  return (
    <group position={[0.52, -0.02, 0.3]}>
      <mesh scale={[0.26, 0.24, 0.2]} {...body}>
        <sphereGeometry args={[1, 32, 24]} />
        <Mat id="nucleus" partGroup="nucleus" color={color.nucleus} />
      </mesh>
      <mesh scale={[0.3, 0.28, 0.23]} raycast={() => undefined}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#f4d5e6" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh position={[0.04, 0.02, 0.1]} {...nucleolus}>
        <sphereGeometry args={[0.08, 20, 16]} />
        <Mat id="nucleolus" partGroup="nucleus" color={color.nucleolus} />
      </mesh>
      <group {...chromatin}>
        <Tube id="chromatin" partGroup="nucleus" points={chromatinPath} radius={0.012} tubeColor={color.chromatin} />
      </group>
      {[
        [0.18, 0.12, 0.12],
        [-0.16, 0.1, 0.14],
        [0.05, -0.16, 0.14],
        [0.2, -0.04, 0.08],
      ].map((position) => (
        <mesh key={position.join()} position={position as [number, number, number]} rotation={[0.6, 0.4, 0]} {...pore}>
          <torusGeometry args={[0.028, 0.008, 8, 14]} />
          <Mat id="nuclear-pore" partGroup="nucleus" color="#f4e7f0" />
        </mesh>
      ))}
    </group>
  );
}

const wallBumps: [number, number, number][] = [
  [-1.28, 0.15, 0.02],
  [-1.15, 0.62, 0.02],
  [-0.7, 1.02, 0.02],
  [0.15, 1.08, 0.02],
  [0.9, 0.82, 0.02],
  [1.28, 0.1, 0.02],
  [1.1, -0.62, 0.02],
  [0.35, -1.02, 0.02],
  [-0.75, -0.95, 0.02],
];

const gaps: [number, number, number][] = [
  [-1.22, 0.88, 0.05],
  [1.22, 0.82, 0.05],
  [-1.18, -0.86, 0.05],
  [1.15, -0.9, 0.05],
];

export function CellFigure({
  group,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  group: CellGroupId;
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <CellCtx.Provider value={{ group, selected, hovered, select: onSelect, hover: onHover }}>
      <mesh scale={[1.32, 1.08, 0.78]} raycast={() => undefined}>
        <sphereGeometry args={[1.08, 48, 36]} />
        <meshStandardMaterial
          color={color.wall}
          transparent
          opacity={group === "all" || group === "boundary" ? 0.28 : 0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={[1.22, 1.0, 0.72]} raycast={() => undefined}>
        <sphereGeometry args={[1.02, 40, 32]} />
        <meshStandardMaterial
          color={color.cytoplasm}
          transparent
          opacity={0.45}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {wallBumps.map((position) => (
        <WallBump key={position.join()} position={position} />
      ))}
      <WallRing />
      <Membrane />
      {gaps.map((position) => (
        <Gap key={position.join()} position={position} />
      ))}

      <Cytoplasm />
      <Vacuole />
      <Nucleus />
      <Nucleoplasm />
      <Envelope />

      <Tube id="smooth-er" partGroup="organelles" points={smoothPath} radius={0.02} tubeColor={color.smooth} />
      <RoughEr />
      <Golgi />
      <Chloroplast position={[-0.72, 0.38, 0.36]} rotation={[0.2, 0.4, 0.3]} />
      <Chloroplast position={[-0.58, -0.36, 0.34]} rotation={[0.5, -0.2, 0.8]} />
      <Chloroplast position={[-0.08, 0.52, 0.38]} rotation={[0.3, 0.2, 1.2]} />
      <Chloroplast position={[0.12, -0.5, 0.36]} rotation={[0.4, 0.5, 0.2]} />
      <Chloroplast position={[0.78, 0.28, 0.32]} rotation={[0.2, 0.8, -0.4]} />
      <Mitochondrion position={[-0.48, 0.5, 0.32]} rotation={[0.4, 0.2, 0.6]} />
      <Mitochondrion position={[0.18, -0.42, 0.36]} rotation={[0.8, 0.3, 0.2]} />
      <Mitochondrion position={[0.88, -0.18, 0.28]} />
      <Lysosome />
    </CellCtx.Provider>
  );
}

function Membrane() {
  const pick = usePick("plasma-membrane");
  return (
    <mesh scale={[1.22, 1.0, 1]} {...pick}>
      <torusGeometry args={[1, 0.012, 8, 64]} />
      <Mat id="plasma-membrane" partGroup="boundary" color={color.membrane} />
    </mesh>
  );
}

function WallRing() {
  const pick = usePick("cell-wall");
  return (
    <mesh scale={[1.34, 1.1, 1]} {...pick}>
      <torusGeometry args={[1, 0.028, 8, 64]} />
      <Mat id="cell-wall" partGroup="boundary" color={color.wall} />
    </mesh>
  );
}

function Envelope() {
  const pick = usePick("nuclear-envelope");
  return (
    <mesh position={[0.52, -0.02, 0.3]} rotation={[0.8, 0.2, 0.4]} {...pick}>
      <torusGeometry args={[0.3, 0.012, 8, 28]} />
      <Mat id="nuclear-envelope" partGroup="nucleus" color="#f7e4ef" />
    </mesh>
  );
}

function Nucleoplasm() {
  const pick = usePick("nucleoplasm");
  return (
    <mesh position={[0.55, -0.08, 0.38]} {...pick}>
      <sphereGeometry args={[0.06, 16, 12]} />
      <Mat id="nucleoplasm" partGroup="nucleus" color="#f3d5e8" />
    </mesh>
  );
}

function Cytoplasm() {
  const pick = usePick("cytoplasm");
  return (
    <mesh position={[-0.78, -0.2, 0.28]} {...pick}>
      <sphereGeometry args={[0.09, 16, 12]} />
      <Mat id="cytoplasm" partGroup="organelles" color="#f4f8e4" />
    </mesh>
  );
}

function Vacuole() {
  const pick = usePick("vacuole");
  return (
    <mesh position={[-0.18, 0.02, 0.08]} scale={[0.58, 0.74, 0.4]} {...pick}>
      <sphereGeometry args={[1, 36, 28]} />
      <Mat id="vacuole" partGroup="organelles" color={color.vacuole} />
    </mesh>
  );
}

function RoughEr() {
  const pick = usePick("rough-er");
  const dots: [number, number, number][] = [
    [0.22, 0.26, 0.38],
    [0.3, 0.3, 0.4],
    [0.38, 0.22, 0.4],
    [0.34, 0.12, 0.42],
  ];
  return (
    <group {...pick}>
      <Tube id="rough-er" partGroup="organelles" points={roughPath} radius={0.022} tubeColor={color.rough} />
      {dots.map((position) => (
        <mesh key={position.join()} position={position} raycast={() => undefined}>
          <sphereGeometry args={[0.018, 10, 8]} />
          <Mat partGroup="organelles" color={color.ribosome} />
        </mesh>
      ))}
    </group>
  );
}

function Golgi() {
  const pick = usePick("golgi");
  return (
    <group position={[0.28, -0.55, 0.36]} {...pick}>
      {[0, 1, 2, 3].map((layer) => (
        <mesh key={layer} position={[0, layer * 0.04, 0]} scale={[0.16, 0.035, 0.09]}>
          <sphereGeometry args={[1, 18, 12]} />
          <Mat id="golgi" partGroup="organelles" color={layer % 2 === 0 ? color.golgi : "#e2a8ba"} />
        </mesh>
      ))}
    </group>
  );
}

function Lysosome() {
  const pick = usePick("lysosome");
  return (
    <mesh position={[0.72, -0.5, 0.34]} {...pick}>
      <sphereGeometry args={[0.07, 18, 14]} />
      <Mat id="lysosome" partGroup="organelles" color={color.lysosome} />
    </mesh>
  );
}
