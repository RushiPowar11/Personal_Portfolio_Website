"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DURATION, EASING } from "@/lib/motion";

function BrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a stylized primitive to represent an intelligence core/node
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 2), []);
  const wireframeGeometry = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    
    // Pulse effect
    const scale = 1 + Math.sin(time * 2) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>
      <lineSegments>
        <primitive object={wireframeGeometry} attach="geometry" />
        <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

const lines = [
  "I build intelligent systems",
  "that think, reason, and act.",
  "From RAG pipelines to",
  "multi-agent orchestration —",
  "I turn cutting-edge AI research",
  "into real-world products."
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen bg-background flex items-center py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative z-10" ref={textRef}>
          <motion.div className="flex flex-col gap-4">
            {lines.map((line, index) => (
              <div key={index} className="overflow-hidden">
                <motion.h2
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                  transition={{ 
                    duration: DURATION, 
                    ease: EASING, 
                    delay: index * 0.1 
                  }}
                  className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-balance ${
                    index === 0 || index === 1 ? 'font-medium text-foreground' : 'text-muted'
                  }`}
                >
                  {index === 3 ? (
                    <span className="text-primary italic font-bold">{line}</span>
                  ) : (
                    line
                  )}
                </motion.h2>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          style={{ y }}
          className="relative h-[50vh] lg:h-[80vh] w-full flex items-center justify-center cursor-none z-0"
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
            <directionalLight position={[-10, -10, -5]} intensity={1} color="#444444" />
            <BrainMesh />
          </Canvas>
          
          {/* Subtle glow behind the 3D object */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}