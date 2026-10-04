"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useInView } from "@/hooks/useInView";

function Totem({ isVisible }: { isVisible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current || !isVisible) return;
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.44;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.24;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusKnotGeometry args={[1.5, 0.35, 120, 16]} />
        <meshPhysicalMaterial
          color="#f0f4ff"
          roughness={0.25}
          metalness={0.7}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          emissive="#161b29"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

export default function ContactTotemScene() {
  const isMobile = useIsMobile();
  const { ref, isInView } = useInView<HTMLDivElement>("200px");

  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(111,127,255,0.15),transparent_70%)] opacity-65" />
    );
  }

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 opacity-65">
      {isInView && (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.25]} gl={{ powerPreference: "high-performance" }}>
          <ambientLight intensity={0.45} />
          <pointLight position={[6, 3, 5]} intensity={10} color="#ffffff" />
          <pointLight position={[-6, -2, -5]} intensity={6} color="#6f7fff" />
          <Totem isVisible={isInView} />
        </Canvas>
      )}
    </div>
  );
}
