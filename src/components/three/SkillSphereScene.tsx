"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useInView } from "@/hooks/useInView";

type OrbitalWordProps = {
  text: string;
  position: [number, number, number];
  isVisible: boolean;
};

function OrbitalWord({ text, position, isVisible }: OrbitalWordProps) {
  const labelRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (!labelRef.current || !isVisible) return;
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

function SphereGroup({ words, isVisible }: { words: string[]; isVisible: boolean }) {
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
    if (!groupRef.current || reducedMotion || !isVisible) return;
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
        <OrbitalWord key={word} text={word} position={positions[index]} isVisible={isVisible} />
      ))}
    </group>
  );
}

export default function SkillSphereScene({ words }: { words: string[] }) {
  const isMobile = useIsMobile();
  const { ref, isInView } = useInView<HTMLDivElement>("200px");

  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-wrap items-center justify-center gap-2 p-6 opacity-40">
        {words.slice(0, 12).map((word) => (
          <span key={word} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-widest text-white/70">
            {word}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 opacity-70">
      {isInView && (
        <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.25]} gl={{ powerPreference: "high-performance" }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[4, 6, 4]} intensity={3} color="#cfd3ff" />
          <SphereGroup words={words} isVisible={isInView} />
        </Canvas>
      )}
    </div>
  );
}
