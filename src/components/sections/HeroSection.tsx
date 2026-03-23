"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { ensureGsapPlugins, gsap, SplitText } from "@/lib/gsap";
import { motionTransition, revealUp, staggerParent } from "@/lib/motion-config";
import HeroShaderScene from "@/components/three/HeroShaderScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptorRef = useRef<HTMLParagraphElement | null>(null);
  const morphRef = useRef<SVGPathElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const ticker = window.setInterval(() => {
      setRoleIndex((value) => (value + 1) % profile.roleLine.length);
    }, 2100);
    return () => window.clearInterval(ticker);
  }, []);

  useEffect(() => {
    if (!headingRef.current || !descriptorRef.current || reducedMotion) return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current, { type: "chars,words" });
      gsap.from(split.chars, {
        yPercent: 115,
        opacity: 0,
        duration: 1.15,
        stagger: 0.018,
        ease: "expo.out",
      });

      gsap.from(descriptorRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        delay: 0.24,
        ease: "power3.out",
      });

      if (morphRef.current) {
        gsap.to(morphRef.current, {
          morphSVG: "#hero-path-b",
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-32 md:px-12 lg:px-20"
    >
      <HeroShaderScene />

      <div className="hero-grid pointer-events-none relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="pointer-events-auto space-y-8">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/[20%] bg-black/[35%] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/[80%] backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-white" />
            Available for high-impact AI builds
          </span>

          <h1
            ref={headingRef}
            className="font-display text-[15vw] uppercase leading-[0.84] tracking-[-0.03em] text-white md:text-[9.6vw] lg:text-[8vw]"
          >
            Rushikesh
            <br />
            Powar
          </h1>

          <p
            ref={descriptorRef}
            className="max-w-xl text-base leading-relaxed text-white/[72%] md:text-lg"
          >
            {profile.intro}
          </p>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-4"
          >
            <motion.div variants={revealUp}>
              <Link
                href="#work"
                data-cursor="magnetic"
                className="inline-flex items-center gap-3 rounded-full border border-white/[30%] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                Selected Work
                <svg viewBox="0 0 64 64" className="h-4 w-4" aria-hidden>
                  <path
                    ref={morphRef}
                    id="hero-path-a"
                    d="M10 32 C 20 5, 44 5, 54 32 C 44 59, 20 59, 10 32 Z"
                    fill="currentColor"
                  />
                  <path
                    id="hero-path-b"
                    d="M8 32 C 16 10, 48 12, 56 32 C 47 53, 19 57, 8 32 Z"
                    fill="currentColor"
                    className="hidden"
                  />
                </svg>
              </Link>
            </motion.div>
            <motion.div variants={revealUp}>
              <Link
                href="#contact"
                data-cursor="magnetic"
                className="inline-flex items-center gap-3 rounded-full border border-white/[30%] bg-transparent px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/[90%] transition-colors hover:bg-white/[10%]"
              >
                Start a conversation
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionTransition.slow}
          className="pointer-events-auto self-end justify-self-end"
        >
          <div className="w-full max-w-sm rounded-3xl border border-white/[15%] bg-black/[35%] p-7 backdrop-blur-2xl">
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/[60%]">Currently focused on</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
              {profile.roleLine[roleIndex]}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/[65%]">{profile.summary}</p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-[11px] uppercase tracking-[0.16em] text-white/[70%]">
              <div>
                <span className="block text-white/[45%]">Email</span>
                <a href={`mailto:${profile.email}`} data-cursor="magnetic" className="mt-2 block break-all text-white">
                  {profile.email}
                </a>
              </div>
              <div>
                <span className="block text-white/[45%]">Location</span>
                <span className="mt-2 block text-white">{profile.location}</span>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

