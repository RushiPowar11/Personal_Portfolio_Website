"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DURATION, EASING } from "@/lib/motion";

const STEPS = [
  {
    num: "01",
    title: "Discovery & Architecture",
    desc: "Understanding the core objectives and mapping out the technical and visual architecture. Every great build starts with a solid foundation.",
  },
  {
    num: "02",
    title: "Interaction Design",
    desc: "Prototyping micro-interactions, spatial depth, and the overarching motion language. Creating the 'feel' before the final build.",
  },
  {
    num: "03",
    title: "High-Performance Engineering",
    desc: "Translating design into scalable, type-safe Next.js code. Implementing WebGL and complex GSAP/Framer animations without sacrificing Lighthouse scores.",
  },
  {
    num: "04",
    title: "Refinement & Launch",
    desc: "Iterative polishing, ensuring cross-browser perfection, accessibility compliance, and deploying via Vercel for edge network speeds.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className="relative min-h-[150vh] bg-background py-32" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10vw] md:text-[6vw] font-display font-black tracking-tighter uppercase text-primary leading-[0.8]"
          >
            The
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-muted to-muted/20 ml-[5vw]">Method</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Animated Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-accent">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>

          <div className="flex flex-col gap-32 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-12 md:gap-24"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: DURATION, ease: EASING, delay: 0.1 }}
              >
                <div className="flex-shrink-0 w-16 md:w-24 h-16 md:h-24 rounded-full bg-background border border-primary/20 flex items-center justify-center -ml-4 md:-ml-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                  <span className="font-mono text-primary text-xl md:text-2xl relative z-10">{step.num}</span>
                </div>
                
                <div className="pt-2 md:pt-6">
                  <h3 className="text-3xl md:text-5xl font-display font-black tracking-tighter uppercase mb-6">{step.title}</h3>
                  <p className="text-lg md:text-xl text-muted font-light max-w-2xl leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
