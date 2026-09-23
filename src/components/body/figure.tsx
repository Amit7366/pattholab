"use client";

import { useContext, useEffect, useMemo, createContext } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

type LessonState = {
  selected: string | null;
  hovered: string | null;
  select: (id: string) => void;
  hover: (id: string | null) => void;
};

const LessonCtx = createContext<LessonState>({
  selected: null,
  hovered: null,
  select: () => undefined,
  hover: () => undefined,
});

const palette = {
  bone: "#e7dcc8",
  muscle: "#c17b6c",
  muscleDeep: "#a46358",
  shell: "#f0ddd2",
  heart: "#8f3038",
  lung: "#e4b7b8",
  liver: "#7a4534",
  stomach: "#d7b78a",
  bowel: "#d98978",
  colon: "#b96a5c",
  kidney: "#8d4c46",
  pancreas: "#e6d0a4",
  brain: "#f0d2cb",
  artery: "#9d2e32",
  vein: "#3c527c",
};

export const anchors: Record<string, [number, number, number]> = {
  brain: [0, 1.78, 0.12],
  heart: [0.12, 1.28, 0.14],
  lungs: [-0.2, 1.38, 0.14],
  liver: [-0.2, 1.12, 0.14],
  stomach: [0.18, 1.14, 0.14],
  pancreas: [0.12, 1.05, 0.08],
  "small-intestine": [0.12, 0.96, 0.12],
  "large-intestine": [0.16, 1.02, 0.12],
  kidneys: [0.16, 1.04, -0.12],
  skull: [0, 1.78, 0.14],
  spine: [0.16, 1.25, -0.1],
  "rib-cage": [0.2, 1.32, 0.12],
  shoulder: [0.28, 1.5, 0.08],
  humerus: [0.42, 1.28, 0.08],
  forearm: [0.52, 1.02, 0.08],
  pelvis: [0.18, 0.9, 0.1],
  femur: [0.24, 0.66, 0.1],
  "lower-leg": [0.22, 0.28, 0.1],
  deltoid: [0.28, 1.5, 0.1],
  pectoralis: [0.16, 1.36, 0.14],
  biceps: [0.4, 1.24, 0.12],
  abdominals: [0.12, 1.02, 0.14],
  quadriceps: [0.22, 0.68, 0.14],
  hamstrings: [0.22, 0.68, -0.12],
  calf: [0.2, 0.28, -0.1],
  trapezius: [0, 1.52, -0.14],
  aorta: [0.08, 1.4, 0.1],
  "vena-cava": [-0.12, 1.2, 0.08],
  arteries: [0.34, 1.2, 0.08],
  veins: [-0.16, 0.7, 0.08],
};

const smallBowel: readonly (readonly [number, number, number])[] = Array.from({ length: 34 }, (_, index) => {
  const angle = index * 0.58;
  const radius = 0.022 + (index % 6) * 0.006;
  return [
    Math.cos(angle) * radius * 1.15,
    1.0 - index * 0.0042,
    0.04 + Math.sin(angle) * radius * 0.5,
  ] as const;
});

const largeBowel: readonly (readonly [number, number, number])[] = [
  [0.01, 0.86, 0.05],
  [-0.07, 0.9, 0.05],
  [-0.09, 1.02, 0.045],
  [-0.07, 1.11, 0.04],
  [0.0, 1.125, 0.04],
  [0.07, 1.11, 0.04],
  [0.09, 1.0, 0.045],
  [0.06, 0.9, 0.055],
  [0.015, 0.85, 0.06],
];

const stomach: readonly (readonly [number, number, number])[] = [
  [0.015, 1.15, 0.055],
  [0.07, 1.175, 0.07],
  [0.105, 1.12, 0.065],
  [0.08, 1.05, 0.05],
  [0.035, 1.02, 0.045],
];

const aorta: readonly (readonly [number, number, number])[] = [
  [0.04, 1.27, 0.05],
  [0.02, 1.38, 0.045],
  [-0.035, 1.45, 0.02],
  [-0.015, 1.36, -0.02],
  [0, 1.16, -0.03],
  [0, 0.9, -0.02],
];

const venaCava: readonly (readonly [number, number, number])[] = [
  [-0.01, 1.24, 0.04],
  [-0.03, 1.4, 0.0],
  [-0.028, 1.16, -0.015],
  [-0.02, 0.9, -0.01],
];

const arteryBranches: readonly (readonly (readonly [number, number, number])[])[] = [
  [
    [-0.02, 1.44, 0.02],
    [0.0, 1.58, 0.01],
    [0.0, 1.7, 0.0],
  ],
  [
    [-0.03, 1.44, 0.02],
    [-0.16, 1.48, 0.03],
    [-0.32, 1.28, 0.04],
    [-0.42, 1.05, 0.04],
  ],
  [
    [0.01, 1.4, 0.02],
    [0.16, 1.48, 0.03],
    [0.32, 1.28, 0.04],
    [0.42, 1.05, 0.04],
  ],
  [
    [0, 0.92, -0.02],
    [-0.08, 0.78, 0.0],
    [-0.1, 0.45, 0.02],
    [-0.1, 0.12, 0.03],
  ],
  [
    [0, 0.92, -0.02],
    [0.08, 0.78, 0.0],
    [0.1, 0.45, 0.02],
    [0.1, 0.12, 0.03],
  ],
];

const veinBranches: readonly (readonly (readonly [number, number, number])[])[] = [
  [
    [-0.02, 1.38, 0.01],
    [-0.14, 1.46, 0.04],
    [-0.3, 1.26, 0.05],
    [-0.4, 1.04, 0.05],
  ],
  [
    [-0.01, 1.36, 0.02],
    [0.14, 1.46, 0.04],
    [0.3, 1.26, 0.05],
    [0.4, 1.04, 0.05],
  ],
  [
    [-0.02, 0.9, 0.0],
    [-0.09, 0.7, 0.02],
    [-0.11, 0.4, 0.04],
    [-0.1, 0.12, 0.05],
  ],
  [
    [-0.015, 0.9, 0.0],
    [0.09, 0.7, 0.02],
    [0.11, 0.4, 0.04],
    [0.1, 0.12, 0.05],
  ],
];

function ribPath(side: 1 | -1, index: number): readonly (readonly [number, number, number])[] {
  const height = 1.18 + index * 0.03;
  const reach = 0.055 + Math.sin((index / 7) * Math.PI) * 0.075;
  return [
    [0, height, -0.035],
    [side * reach, height - 0.008, 0.0],
    [side * reach * 0.45, height - 0.02, 0.07],
    [side * 0.012, height - 0.028, 0.086],
  ];
}

const ribs = Array.from({ length: 8 }, (_, index) => ({
  left: ribPath(-1, index),
  right: ribPath(1, index),
}));

const spine = Array.from({ length: 22 }, (_, index) => {
  const t = index / 21;
  return [0, 0.98 + t * 0.54, -0.04 + Math.sin(t * Math.PI) * 0.02] as const;
});

function setCursor(event: ThreeEvent<PointerEvent>, cursor: string) {
  if (event.nativeEvent.target instanceof HTMLElement) {
    event.nativeEvent.target.style.cursor = cursor;
  }
}

function usePick(id?: string) {
  const ctx = useContext(LessonCtx);
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

function Mat({ id, color, opacity = 1 }: { id?: string; color: string; opacity?: number }) {
  const { selected, hovered } = useContext(LessonCtx);
  const hot = Boolean(id && (selected === id || hovered === id));
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.5}
      metalness={0.02}
      emissive={hot ? color : "#000000"}
      emissiveIntensity={hot ? 0.32 : 0}
      transparent={opacity < 1}
      opacity={opacity}
      depthWrite={opacity > 0.5}
    />
  );
}

function Ball({
  id,
  position,
  radius = 1,
  scale = [1, 1, 1],
  rotation,
  color,
  opacity = 1,
}: {
  id?: string;
  position: [number, number, number];
  radius?: number;
  scale?: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  opacity?: number;
}) {
  const pick = usePick(id);
  return (
    <mesh position={position} scale={scale} rotation={rotation} renderOrder={id ? 2 : 0} {...pick}>
      <sphereGeometry args={[radius, 28, 20]} />
      <Mat id={id} color={color} opacity={opacity} />
    </mesh>
  );
}

function Bone({
  id,
  from,
  to,
  radius,
  color,
  opacity = 1,
}: {
  id?: string;
  from: readonly [number, number, number];
  to: readonly [number, number, number];
  radius: number;
  color: string;
  opacity?: number;
}) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const length = Math.max(start.distanceTo(end), radius * 2.1);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    end.clone().sub(start).normalize(),
  );
  const pick = usePick(id);

  return (
    <group>
      <mesh position={mid.toArray()} quaternion={quaternion} {...pick}>
        <capsuleGeometry args={[radius, length - radius * 2, 4, 10]} />
        <Mat id={id} color={color} opacity={opacity} />
      </mesh>
      <mesh position={from} {...pick}>
        <sphereGeometry args={[radius * 1.28, 14, 12]} />
        <Mat id={id} color={color} opacity={opacity} />
      </mesh>
      <mesh position={to} {...pick}>
        <sphereGeometry args={[radius * 1.12, 14, 12]} />
        <Mat id={id} color={color} opacity={opacity} />
      </mesh>
    </group>
  );
}

function Curve({
  id,
  points,
  radius,
  color,
  opacity = 1,
}: {
  id?: string;
  points: readonly (readonly [number, number, number])[];
  radius: number;
  color: string;
  opacity?: number;
}) {
  const geometry = useMemo(() => {
    const path = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
    return new THREE.TubeGeometry(path, 48, radius, 8, false);
  }, [points, radius]);
  const pick = usePick(id);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <mesh geometry={geometry} renderOrder={2} {...pick}>
      <Mat id={id} color={color} opacity={opacity} />
    </mesh>
  );
}

function Vertebra({
  position,
  id,
  opacity,
}: {
  position: readonly [number, number, number];
  id?: string;
  opacity: number;
}) {
  const pick = usePick(id);
  return (
    <mesh position={position} {...pick}>
      <cylinderGeometry args={[0.018, 0.02, 0.018, 10]} />
      <Mat id={id} color={palette.bone} opacity={opacity} />
    </mesh>
  );
}

function AbSegment({ position }: { position: [number, number, number] }) {
  const pick = usePick("abdominals");
  return (
    <mesh position={position} {...pick}>
      <boxGeometry args={[0.04, 0.04, 0.02]} />
      <Mat id="abdominals" color={palette.muscleDeep} />
    </mesh>
  );
}

function Shell() {
  return (
    <group>
      <Ball position={[0, 1.64, 0.02]} radius={0.12} color={palette.shell} opacity={0.1} />
      <Bone from={[0, 1.5, 0.01]} to={[0, 1.56, 0.02]} radius={0.04} color={palette.shell} opacity={0.1} />
      <Ball position={[0, 1.24, 0.02]} radius={0.2} scale={[1, 1.35, 0.72]} color={palette.shell} opacity={0.1} />
      <Ball position={[0, 0.98, 0.01]} radius={0.15} scale={[1.05, 0.7, 0.8]} color={palette.shell} opacity={0.1} />
      <Bone from={[-0.2, 1.48, 0.02]} to={[-0.36, 1.18, 0.03]} radius={0.04} color={palette.shell} opacity={0.08} />
      <Bone from={[0.2, 1.48, 0.02]} to={[0.36, 1.18, 0.03]} radius={0.04} color={palette.shell} opacity={0.08} />
      <Bone from={[-0.36, 1.18, 0.03]} to={[-0.46, 0.92, 0.04]} radius={0.032} color={palette.shell} opacity={0.08} />
      <Bone from={[0.36, 1.18, 0.03]} to={[0.46, 0.92, 0.04]} radius={0.032} color={palette.shell} opacity={0.08} />
      <Bone from={[-0.09, 0.9, 0.0]} to={[-0.11, 0.48, 0.02]} radius={0.055} color={palette.shell} opacity={0.08} />
      <Bone from={[0.09, 0.9, 0.0]} to={[0.11, 0.48, 0.02]} radius={0.055} color={palette.shell} opacity={0.08} />
      <Bone from={[-0.11, 0.48, 0.02]} to={[-0.1, 0.08, 0.03]} radius={0.04} color={palette.shell} opacity={0.08} />
      <Bone from={[0.11, 0.48, 0.02]} to={[0.1, 0.08, 0.03]} radius={0.04} color={palette.shell} opacity={0.08} />
    </group>
  );
}

function Organs() {
  return (
    <group>
      <Ball id="brain" position={[-0.028, 1.645, 0.015]} radius={0.046} scale={[1, 0.9, 1.05]} color={palette.brain} />
      <Ball id="brain" position={[0.028, 1.645, 0.015]} radius={0.046} scale={[1, 0.9, 1.05]} color={palette.brain} />
      <Ball id="brain" position={[0, 1.6, -0.015]} radius={0.028} color={palette.brain} />
      <Ball id="lungs" position={[-0.09, 1.32, 0.02]} radius={0.085} scale={[1, 1.25, 0.85]} color={palette.lung} />
      <Ball id="lungs" position={[0.095, 1.33, 0.025]} radius={0.072} scale={[1, 1.2, 0.82]} color={palette.lung} />
      <Ball
        id="heart"
        position={[0.04, 1.27, 0.05]}
        radius={0.055}
        scale={[0.85, 1.15, 0.75]}
        rotation={[0.4, 0.2, 0.7]}
        color={palette.heart}
      />
      <Ball id="liver" position={[-0.07, 1.12, 0.04]} radius={0.09} scale={[1.25, 0.72, 0.95]} color={palette.liver} />
      <Curve id="stomach" points={stomach} radius={0.028} color={palette.stomach} />
      <Bone id="pancreas" from={[-0.02, 1.07, 0.0]} to={[0.1, 1.05, 0.01]} radius={0.016} color={palette.pancreas} />
      <Curve id="small-intestine" points={smallBowel} radius={0.012} color={palette.bowel} />
      <Curve id="large-intestine" points={largeBowel} radius={0.016} color={palette.colon} />
      <Ball id="kidneys" position={[-0.07, 1.04, -0.055]} radius={0.04} scale={[0.85, 1.35, 0.7]} color={palette.kidney} />
      <Ball id="kidneys" position={[0.07, 1.04, -0.055]} radius={0.04} scale={[0.85, 1.35, 0.7]} color={palette.kidney} />
    </group>
  );
}

function Jaw({ id, opacity }: { id?: string; opacity: number }) {
  const pick = usePick(id);
  return (
    <mesh position={[0, 1.57, 0.055]} {...pick}>
      <boxGeometry args={[0.07, 0.035, 0.04]} />
      <Mat id={id} color={palette.bone} opacity={opacity} />
    </mesh>
  );
}

function Scapula({
  id,
  position,
  rotation,
  opacity,
}: {
  id?: string;
  position: [number, number, number];
  rotation: [number, number, number];
  opacity: number;
}) {
  const pick = usePick(id);
  return (
    <mesh position={position} rotation={rotation} {...pick}>
      <boxGeometry args={[0.08, 0.1, 0.012]} />
      <Mat id={id} color={palette.bone} opacity={opacity} />
    </mesh>
  );
}

function Skeleton({
  opacity = 1,
  interactive = true,
  showSkull = true,
}: {
  opacity?: number;
  interactive?: boolean;
  showSkull?: boolean;
}) {
  const id = (name: string) => (interactive ? name : undefined);
  return (
    <group>
      {showSkull ? (
        <>
          <Ball id={id("skull")} position={[0, 1.66, 0.02]} radius={0.1} color={palette.bone} opacity={opacity} />
          <Jaw id={id("skull")} opacity={opacity} />
        </>
      ) : null}
      {spine.map((position) => (
        <Vertebra key={position[1]} position={position} id={id("spine")} opacity={opacity} />
      ))}
      {ribs.map((rib) => (
        <group key={rib.left[0][1]}>
          <Curve id={id("rib-cage")} points={rib.left} radius={0.006} color={palette.bone} opacity={opacity} />
          <Curve id={id("rib-cage")} points={rib.right} radius={0.006} color={palette.bone} opacity={opacity} />
        </group>
      ))}
      <Bone id={id("rib-cage")} from={[0, 1.2, 0.09]} to={[0, 1.4, 0.078]} radius={0.01} color={palette.bone} opacity={opacity} />
      <Bone id={id("shoulder")} from={[-0.02, 1.46, 0.06]} to={[-0.18, 1.5, 0.02]} radius={0.01} color={palette.bone} opacity={opacity} />
      <Bone id={id("shoulder")} from={[0.02, 1.46, 0.06]} to={[0.18, 1.5, 0.02]} radius={0.01} color={palette.bone} opacity={opacity} />
      <Scapula id={id("shoulder")} position={[-0.16, 1.42, -0.04]} rotation={[0.4, 0.2, 0.4]} opacity={opacity} />
      <Scapula id={id("shoulder")} position={[0.16, 1.42, -0.04]} rotation={[0.4, -0.2, -0.4]} opacity={opacity} />
      <Bone id={id("humerus")} from={[-0.2, 1.48, 0.02]} to={[-0.34, 1.16, 0.03]} radius={0.016} color={palette.bone} opacity={opacity} />
      <Bone id={id("humerus")} from={[0.2, 1.48, 0.02]} to={[0.34, 1.16, 0.03]} radius={0.016} color={palette.bone} opacity={opacity} />
      <Bone id={id("forearm")} from={[-0.34, 1.16, 0.03]} to={[-0.44, 0.92, 0.04]} radius={0.011} color={palette.bone} opacity={opacity} />
      <Bone id={id("forearm")} from={[-0.33, 1.15, 0.02]} to={[-0.43, 0.92, 0.02]} radius={0.009} color={palette.bone} opacity={opacity} />
      <Bone id={id("forearm")} from={[0.34, 1.16, 0.03]} to={[0.44, 0.92, 0.04]} radius={0.011} color={palette.bone} opacity={opacity} />
      <Bone id={id("forearm")} from={[0.33, 1.15, 0.02]} to={[0.43, 0.92, 0.02]} radius={0.009} color={palette.bone} opacity={opacity} />
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2.4, 0, 0]} {...usePick(id("pelvis"))}>
        <torusGeometry args={[0.11, 0.022, 10, 24]} />
        <Mat id={id("pelvis")} color={palette.bone} opacity={opacity} />
      </mesh>
      <Bone id={id("femur")} from={[-0.09, 0.88, 0]} to={[-0.11, 0.46, 0.02]} radius={0.02} color={palette.bone} opacity={opacity} />
      <Bone id={id("femur")} from={[0.09, 0.88, 0]} to={[0.11, 0.46, 0.02]} radius={0.02} color={palette.bone} opacity={opacity} />
      <Bone id={id("lower-leg")} from={[-0.11, 0.46, 0.02]} to={[-0.1, 0.08, 0.03]} radius={0.015} color={palette.bone} opacity={opacity} />
      <Bone id={id("lower-leg")} from={[-0.1, 0.46, 0.0]} to={[-0.09, 0.08, 0.0]} radius={0.008} color={palette.bone} opacity={opacity} />
      <Bone id={id("lower-leg")} from={[0.11, 0.46, 0.02]} to={[0.1, 0.08, 0.03]} radius={0.015} color={palette.bone} opacity={opacity} />
      <Bone id={id("lower-leg")} from={[0.1, 0.46, 0.0]} to={[0.09, 0.08, 0.0]} radius={0.008} color={palette.bone} opacity={opacity} />
    </group>
  );
}

function Muscles() {
  return (
    <group>
      <Ball id="deltoid" position={[-0.2, 1.48, 0.03]} radius={0.055} color={palette.muscle} />
      <Ball id="deltoid" position={[0.2, 1.48, 0.03]} radius={0.055} color={palette.muscle} />
      <Ball id="pectoralis" position={[-0.07, 1.34, 0.08]} radius={0.06} scale={[1.1, 0.7, 0.55]} color={palette.muscle} />
      <Ball id="pectoralis" position={[0.07, 1.34, 0.08]} radius={0.06} scale={[1.1, 0.7, 0.55]} color={palette.muscle} />
      <Bone id="biceps" from={[-0.22, 1.42, 0.05]} to={[-0.34, 1.16, 0.06]} radius={0.022} color={palette.muscle} />
      <Bone id="biceps" from={[0.22, 1.42, 0.05]} to={[0.34, 1.16, 0.06]} radius={0.022} color={palette.muscle} />
      {[1.08, 1.02, 0.96].map((height) => (
        <group key={height}>
          <AbSegment position={[-0.028, height, 0.09]} />
          <AbSegment position={[0.028, height, 0.09]} />
        </group>
      ))}
      <Bone id="quadriceps" from={[-0.09, 0.84, 0.04]} to={[-0.11, 0.5, 0.055]} radius={0.032} color={palette.muscle} />
      <Bone id="quadriceps" from={[0.09, 0.84, 0.04]} to={[0.11, 0.5, 0.055]} radius={0.032} color={palette.muscle} />
      <Bone id="hamstrings" from={[-0.09, 0.84, -0.03]} to={[-0.11, 0.5, -0.02]} radius={0.026} color={palette.muscleDeep} />
      <Bone id="hamstrings" from={[0.09, 0.84, -0.03]} to={[0.11, 0.5, -0.02]} radius={0.026} color={palette.muscleDeep} />
      <Bone id="calf" from={[-0.1, 0.42, -0.015]} to={[-0.09, 0.16, -0.02]} radius={0.024} color={palette.muscle} />
      <Bone id="calf" from={[0.1, 0.42, -0.015]} to={[0.09, 0.16, -0.02]} radius={0.024} color={palette.muscle} />
      <Ball id="trapezius" position={[0, 1.5, -0.05]} radius={0.08} scale={[2.3, 0.7, 0.55]} color={palette.muscleDeep} />
    </group>
  );
}

function Circulation() {
  return (
    <group>
      <Ball
        id="heart"
        position={[0.04, 1.27, 0.05]}
        radius={0.055}
        scale={[0.85, 1.15, 0.75]}
        rotation={[0.4, 0.2, 0.7]}
        color={palette.heart}
      />
      <Curve id="aorta" points={aorta} radius={0.012} color={palette.artery} />
      <Curve id="vena-cava" points={venaCava} radius={0.011} color={palette.vein} />
      {arteryBranches.map((points) => (
        <Curve key={points[1].join(",")} id="arteries" points={points} radius={0.006} color={palette.artery} />
      ))}
      {veinBranches.map((points) => (
        <Curve key={points[1].join(",")} id="veins" points={points} radius={0.006} color={palette.vein} />
      ))}
    </group>
  );
}

export function Figure({
  system,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  system: "organs" | "skeleton" | "muscles" | "circulation";
  selected: string | null;
  hovered: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <LessonCtx.Provider value={{ selected, hovered, select: onSelect, hover: onHover }}>
      {(system === "organs" || system === "circulation") && <Shell />}
      {system === "organs" && (
        <>
          <Organs />
          <Skeleton opacity={0.16} interactive={false} showSkull={false} />
        </>
      )}
      {system === "skeleton" && <Skeleton />}
      {system === "muscles" && (
        <>
          <Skeleton opacity={0.28} interactive={false} />
          <Muscles />
        </>
      )}
      {system === "circulation" && <Circulation />}
    </LessonCtx.Provider>
  );
}
