"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useInView } from "@/hooks/useInView";

function EnergyField({ isVisible }: { isVisible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const reducedMotion = useReducedMotion();

  const points = useMemo(() => {
    const data = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 16;
      data[i * 3 + 1] = (Math.random() - 0.5) * 8;
      data[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion || !isVisible) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.11;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          itemSize={3}
          array={points}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        color="#d6d8df"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function WorkEnergyScene() {
  const isMobile = useIsMobile();
  const { ref, isInView } = useInView<HTMLDivElement>("200px");

  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(214,216,223,0.1),transparent_75%)] opacity-45" />
    );
  }

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-0 opacity-45">
      {isInView && (
        <Canvas camera={{ position: [0, 0, 8], fov: 48 }} dpr={[1, 1.25]} gl={{ powerPreference: "high-performance" }}>
          <ambientLight intensity={0.2} />
          <EnergyField isVisible={isInView} />
        </Canvas>
      )}
    </div>
  );
}
