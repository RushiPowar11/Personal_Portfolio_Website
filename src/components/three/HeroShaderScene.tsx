"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uReduce;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(in vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  float motion = mix(0.02, 1.0, 1.0 - uReduce);

  float grain = noise(uv * 12.0 + uTime * 0.2 * motion);
  float wave = sin((centered.x * 8.0 + uTime * 0.45 * motion) + centered.y * 4.0) * 0.5;
  float radial = length(centered + (uMouse * 0.08 * motion));
  float glow = smoothstep(0.75, 0.05, radial);

  vec3 base = vec3(0.02, 0.02, 0.03);
  vec3 steel = vec3(0.45, 0.46, 0.54) * glow;
  vec3 chrome = vec3(0.82, 0.84, 0.92) * (wave * 0.25 + grain * 0.2);
  vec3 color = base + steel + chrome;

  gl_FragColor = vec4(color, 1.0);
}
`;

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const reducedMotion = useReducedMotion();
  const { mouse } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uReduce: { value: reducedMotion ? 1 : 0 },
    }),
    [reducedMotion],
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(mouse.x, mouse.y),
      0.09,
    );
    materialRef.current.uniforms.uReduce.value = reducedMotion ? 1 : 0;
  });

  return (
    <mesh scale={[18, 10, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroShaderScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-95">
      <Canvas camera={{ position: [0, 0, 1.2], fov: 55 }} dpr={[1, 1.6]}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
