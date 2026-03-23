"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { staggerContainer, revealText, fadeInUp } from "@/lib/motion";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background/50 animate-pulse" />,
});

const ROLES = [
  "AI Engineer",
  "LLM Builder",
  "Multi-Agent Systems",
  "RAG Architect"
];

export default function Hero() {
  const title1 = "RUSHIKESH";
  const title2 = "POWAR";
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background px-6 md:px-12 lg:px-24">
      <Scene />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2 md:gap-4"
        >
          <div className="overflow-hidden leading-[0.8]">
            <motion.h1 
              className="text-[12vw] md:text-[8vw] font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-muted uppercase"
              aria-label={title1}
            >
              {title1.split("").map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={revealText(0.02 * index)} 
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          <div className="overflow-hidden leading-[0.8]">
            <motion.h1 
              className="text-[12vw] md:text-[8vw] font-display font-black tracking-tighter text-primary uppercase ml-[10vw] md:ml-[15vw]"
              aria-label={title2}
            >
              {title2.split("").map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={revealText(0.02 * index + 0.2)} 
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.div variants={fadeInUp} className="mt-6 md:mt-12 max-w-xl md:ml-auto md:mr-[10vw] flex flex-col gap-4">
            <div className="text-xl md:text-2xl font-mono text-primary font-bold h-8 relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 top-0 tracking-widest uppercase"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            
            <p className="text-lg md:text-xl text-muted font-light leading-relaxed text-balance">
              Building at the frontier of applied AI. 
              <br className="hidden md:block" />
              Specializing in intelligent systems that think, reason, and act.
            </p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="mt-12 flex gap-4 md:ml-auto md:mr-[10vw]">
             <a href="#work" data-cursor="pointer" className="group relative overflow-hidden rounded-full border border-primary/20 bg-background/50 backdrop-blur-md px-8 py-4 transition-colors hover:bg-primary/10 inline-flex items-center justify-center">
                <span className="relative z-10 text-sm font-medium tracking-wide uppercase">View Work</span>
             </a>
             <a href="#contact" data-cursor="pointer" className="group relative overflow-hidden rounded-full bg-primary text-primary-foreground px-8 py-4 transition-transform hover:scale-105 inline-flex items-center justify-center">
                <span className="relative z-10 text-sm font-bold tracking-wide uppercase">Let&apos;s Talk</span>
             </a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70">Scroll</span>
        <div className="h-16 w-[1px] bg-gradient-to-b from-primary/70 to-transparent" />
      </motion.div>
    </section>
  );
}