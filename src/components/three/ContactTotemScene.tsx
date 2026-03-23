"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Totem() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.44;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.24;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusKnotGeometry args={[1.5, 0.35, 180, 24]} />
        <meshPhysicalMaterial
          color="#f0f4ff"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.16}
          emissive="#161b29"
          emissiveIntensity={0.75}
        />
      </mesh>
    </group>
  );
}

export default function ContactTotemScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-65">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.45} />
        <pointLight position={[6, 3, 5]} intensity={12} color="#ffffff" />
        <pointLight position={[-6, -2, -5]} intensity={8} color="#6f7fff" />
        <Totem />
      </Canvas>
    </div>
  );
}
