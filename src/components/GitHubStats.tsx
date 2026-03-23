"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/motion";

// Generate a 3D heatmap matrix based on random/mock data for visual prototype
const COLS = 52; // Weeks
const ROWS = 7;  // Days
const MAX_HEIGHT = 2;

function HeatmapBars() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummyData = useMemo(() => {
    const data = new Float32Array(COLS * ROWS);
    for (let i = 0; i < COLS * ROWS; i++) {
      // Create a pattern that looks somewhat organic (more activity towards recent weeks)
      const week = Math.floor(i / ROWS);
      const baseActivity = (week / COLS) * 0.5;
      data[i] = Math.random() > 0.3 ? Math.random() * baseActivity * MAX_HEIGHT : 0.1;
    }
    return data;
  }, []);

  const colorConfig = useMemo(() => {
    const color = new THREE.Color();
    const colors = new Float32Array(COLS * ROWS * 3);
    for (let i = 0; i < COLS * ROWS; i++) {
      const val = dummyData[i];
      if (val <= 0.1) color.setHex(0x111111);
      else if (val < 0.5) color.setHex(0x0e4429);
      else if (val < 1.0) color.setHex(0x006d32);
      else if (val < 1.5) color.setHex(0x26a641);
      else color.setHex(0x39d353);
      
      color.toArray(colors, i * 3);
    }
    return colors;
  }, [dummyData]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    let i = 0;
    for (let x = 0; x < COLS; x++) {
      for (let z = 0; z < ROWS; z++) {
        const height = dummyData[i];
        
        // Gentle wave animation
        const wave = Math.sin(x * 0.2 + time * 2) * 0.1;
        const currentHeight = Math.max(0.1, height + (height > 0.1 ? wave : 0));

        dummy.position.set(
          (x - COLS / 2) * 0.2, 
          currentHeight / 2, 
          (z - ROWS / 2) * 0.2
        );
        dummy.scale.set(0.15, currentHeight, 0.15);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COLS * ROWS]}>
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorConfig, 3]} />
      </boxGeometry>
      <meshStandardMaterial vertexColors metalness={0.5} roughness={0.2} emissive="#000000" />
    </instancedMesh>
  );
}

export default function GitHubStats() {
  const [stats, setStats] = useState({ repos: 13, followers: 0 });

  useEffect(() => {
    // In a real scenario, we'd fetch from https://api.github.com/users/RushiPowar11
    // but without auth tokens, rate limits might hit. We'll use static base for now as requested.
    setStats({ repos: 13, followers: 15 });
  }, []);

  return (
    <section className="relative py-32 bg-background overflow-hidden border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 z-10 relative pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION, ease: EASING }}
          >
            <h2 className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">Open Source</h2>
            <h3 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-white">
              GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#39d353]">Activity</span>
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION, ease: EASING, delay: 0.2 }}
            className="flex gap-8 mt-8 md:mt-0"
          >
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-display font-bold text-white">{stats.repos}</span>
              <span className="text-xs font-mono text-muted uppercase tracking-widest mt-2">Repositories</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl font-display font-bold text-white">Active</span>
              <span className="text-xs font-mono text-muted uppercase tracking-widest mt-2">Contributions</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-xl md:text-2xl font-mono font-bold text-primary mt-2">Python</span>
              <span className="text-xs font-mono text-muted uppercase tracking-widest mt-3">Top Language</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION, ease: EASING, delay: 0.4 }}
          className="relative w-full h-[40vh] md:h-[50vh] rounded-2xl border border-primary/20 bg-background overflow-hidden"
        >
          {/* Subtle green glow from bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#39d353]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <Canvas camera={{ position: [0, 5, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, 5, -10]} intensity={2} color="#39d353" />
            <group rotation={[0, Math.PI / 12, 0]}>
               <HeatmapBars />
            </group>
          </Canvas>

          <a 
            href="https://github.com/RushiPowar11" 
            target="_blank" 
            rel="noreferrer"
            data-cursor="pointer"
            className="absolute bottom-6 right-6 px-6 py-3 bg-background/80 backdrop-blur-md border border-primary/20 rounded-full text-xs font-mono uppercase tracking-widest text-primary hover:bg-primary/10 transition-colors z-10"
          >
            View Profile →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
