"use client";

import { useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DURATION, EASING } from "@/lib/motion";

function NeuralOrb() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a sphere with points
  const pointsGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 4);
    return geo;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.5;
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(time) * 0.2;
      
      // Pulse scale
      const scale = 1 + Math.sin(time * 2) * 0.02;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <primitive object={pointsGeometry} attach="geometry" />
        <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.6} />
      </points>
      <mesh>
        <primitive object={pointsGeometry} attach="geometry" />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function Contact() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const hx = e.clientX - rect.left - rect.width / 2;
    const hy = e.clientY - rect.top - rect.height / 2;
    
    // Magnetic pull strength
    x.set(hx * 0.3);
    y.set(hy * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="contact" className="relative min-h-screen bg-background overflow-hidden flex flex-col justify-end">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <NeuralOrb />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 py-32 flex flex-col items-center text-center mt-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION, ease: EASING }}
        >
          <h2 className="text-[10vw] md:text-[6vw] font-display font-black tracking-tighter uppercase leading-[0.9] mb-12">
            Building something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted italic pr-4">with AI?</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATION, ease: EASING, delay: 0.2 }}
        >
          <motion.button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: smoothX, y: smoothY }}
            className="group relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary flex items-center justify-center overflow-hidden"
            data-cursor="pointer"
            onClick={() => window.open('mailto:rushikeshpowar@example.com', '_blank')} // Placeholder email
          >
            {/* Hover ripple effect */}
            <div className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
            
            <span className="relative z-10 text-primary-foreground font-bold tracking-widest uppercase text-sm md:text-base group-hover:text-primary transition-colors">
              Let&apos;s talk
            </span>
          </motion.button>
        </motion.div>

        <motion.div 
          className="mt-32 w-full flex flex-col md:flex-row justify-between items-center text-muted font-mono uppercase text-xs tracking-widest border-t border-primary/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-8 mb-4 md:mb-0">
            <a href="https://github.com/RushiPowar11" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" data-cursor="pointer">Github</a>
            <a href="https://www.linkedin.com/in/rushikeshpowar/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" data-cursor="pointer">LinkedIn</a>
          </div>
          <p>© {new Date().getFullYear()} Rushikesh Powar. All rights reserved.</p>
        </motion.div>

      </div>
    </section>
  );
}