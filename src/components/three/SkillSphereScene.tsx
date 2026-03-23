"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type OrbitalWordProps = {
  text: string;
  position: [number, number, number];
};

function OrbitalWord({ text, position }: OrbitalWordProps) {
  const labelRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (!labelRef.current) return;
    labelRef.current.quaternion.copy(camera.quaternion);
  });

  return (
    <Text
      ref={labelRef}
      position={position}
      fontSize={0.18}
      color="#f4f5fa"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.03}
    >
      {text}
    </Text>
  );
}

function SphereGroup({ words }: { words: string[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const positions = useMemo<[number, number, number][]>(
    () =>
      words.map((_, index) => {
        const phi = Math.acos(-1 + (2 * index) / words.length);
        const theta = Math.sqrt(words.length * Math.PI) * phi;
        const radius = 3.1;
        return [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi),
        ];
      }),
    [words],
  );

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x += delta * 0.06;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2.45, 2]} />
        <meshStandardMaterial
          color="#171820"
          wireframe
          transparent
          opacity={0.35}
          emissive="#242738"
          emissiveIntensity={0.5}
        />
      </mesh>
      {words.map((word, index) => (
        <OrbitalWord key={word} text={word} position={positions[index]} />
      ))}
    </group>
  );
}

export default function SkillSphereScene({ words }: { words: string[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 6, 4]} intensity={3} color="#cfd3ff" />
        <SphereGroup words={words} />
      </Canvas>
    </div>
  );
}
