"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "AI/ML Core",
    skills: ["LLMs", "RAG", "Multi-Agent Systems", "Prompt Engineering", "Vector Databases", "Embeddings"]
  },
  {
    title: "Frameworks & Tools",
    skills: ["LangChain", "LlamaIndex", "OpenAI API", "HuggingFace", "FastAPI"]
  },
  {
    title: "Languages",
    skills: ["Python", "JavaScript"]
  },
  {
    title: "Infrastructure",
    skills: ["GitHub", "REST APIs", "WhatsApp Business API", "Docker", "AWS"]
  }
];

const ALL_SKILLS = SKILL_CATEGORIES.flatMap(c => c.skills);

function Word({ children, position, scale = 1 }: { children: string, position: [number, number, number], scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <Text
      ref={ref}
      position={position}
      color="#ffffff"
      fontSize={0.4 * scale}
      maxWidth={10}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
}

function OrbitalRings({ radius = 6 }) {
  const rings = useMemo(() => {
    const temp = [];
    const ringCount = 3;
    
    let skillIndex = 0;
    
    for (let r = 0; r < ringCount; r++) {
      const currentRadius = radius - (r * 1.5);
      const itemsInRing = Math.floor(ALL_SKILLS.length / ringCount);
      const yOffset = (Math.random() - 0.5) * 4;
      const tiltX = (Math.random() - 0.5) * 0.5;
      const tiltZ = (Math.random() - 0.5) * 0.5;
      
      const ringItems = [];
      for(let i=0; i<itemsInRing; i++) {
        if(skillIndex >= ALL_SKILLS.length) break;
        const angle = (i / itemsInRing) * Math.PI * 2;
        ringItems.push({
          word: ALL_SKILLS[skillIndex],
          angle,
          radius: currentRadius
        });
        skillIndex++;
      }
      
      temp.push({ yOffset, tiltX, tiltZ, items: ringItems, speed: (Math.random() > 0.5 ? 1 : -1) * (0.05 + Math.random() * 0.05) });
    }
    
    // add remaining skills to outer ring if any
    while(skillIndex < ALL_SKILLS.length) {
       temp[0].items.push({
          word: ALL_SKILLS[skillIndex],
          angle: Math.random() * Math.PI * 2,
          radius: radius
       });
       skillIndex++;
    }

    return temp;
  }, [radius]);

  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
    }
    
    rings.forEach((ring, i) => {
       if (ringRefs.current[i]) {
          ringRefs.current[i]!.rotation.y += ring.speed * delta;
       }
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, rIndex) => (
        <group 
          key={rIndex} 
          ref={(el) => { ringRefs.current[rIndex] = el }}
          position={[0, ring.yOffset, 0]}
          rotation={[ring.tiltX, 0, ring.tiltZ]}
        >
           {/* Visual ring line */}
           <mesh rotation={[Math.PI / 2, 0, 0]}>
             <torusGeometry args={[ring.items[0]?.radius || radius, 0.02, 16, 100]} />
             <meshBasicMaterial color="#333333" transparent opacity={0.3} />
           </mesh>
           
           {ring.items.map((item, i) => {
             const x = Math.cos(item.angle) * item.radius;
             const z = Math.sin(item.angle) * item.radius;
             const scale = rIndex === 0 ? 1.2 : (rIndex === 1 ? 1 : 0.8);
             return (
               <Word key={i} position={[x, 0, z]} scale={scale}>
                 {item.word}
               </Word>
             );
           })}
        </group>
      ))}
    </group>
  );
}

export default function Skills() {
  return (
    <section className="relative min-h-screen bg-background flex flex-col py-32 overflow-hidden">
      
      <div className="z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 relative pointer-events-none">
        <div>
           <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4"
            >
              Knowledge Graph
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase text-balance"
            >
              The AI Engine
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-muted text-lg max-w-md"
            >
              Bridging cutting-edge models with robust backend infrastructure to build production-ready AI systems.
            </motion.p>
        </div>

        <div className="flex flex-col gap-12 pointer-events-auto mt-12 lg:mt-0">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
            >
              <h4 className="text-primary font-mono text-sm tracking-widest uppercase mb-4 border-b border-primary/20 pb-2">
                {cat.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-3 py-1 bg-accent border border-primary/10 rounded-md text-sm text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3D Visualizer underneath */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-40 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <fog attach="fog" args={["#0a0a0a", 10, 25]} />
          <ambientLight intensity={1} />
          <OrbitalRings radius={7} />
        </Canvas>
      </div>
      
      {/* Overlay gradient to fade bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}