"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 300;
const MAX_DISTANCE = 0.8;

function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return [pos, vel];
  }, []);

  const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Mouse interaction targeting
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Apply velocity
      positionsArray[i * 3] += velocities[i * 3];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Mouse attraction slightly
      const dx = targetX - positionsArray[i * 3];
      const dy = targetY - positionsArray[i * 3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        positionsArray[i * 3] += dx * 0.005;
        positionsArray[i * 3 + 1] += dy * 0.005;
      }

      // Boundary check
      if (Math.abs(positionsArray[i * 3]) > 5) velocities[i * 3] *= -1;
      if (Math.abs(positionsArray[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positionsArray[i * 3 + 2]) > 2.5) velocities[i * 3 + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update lines based on distance
    const linePositions = [];
    const lineOpacities = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DISTANCE) {
          linePositions.push(
            positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2],
            positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]
          );
          // Opacity based on distance
          const alpha = 1.0 - (dist / MAX_DISTANCE);
          lineOpacities.push(alpha, alpha);
        }
      }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineOpacities.map(a => [a,a,a]).flat(), 3));
    
    // Rotate scene slightly
    pointsRef.current.rotation.y += 0.001;
    linesRef.current.rotation.y += 0.001;
    pointsRef.current.rotation.x += 0.0005;
    linesRef.current.rotation.x += 0.0005;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 z-0 bg-background pointer-events-auto opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}