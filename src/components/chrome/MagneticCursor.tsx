"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function MagneticCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const smoothX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.34 });
  const smoothY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.34 });

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(pointer:fine)").matches) return;

    setEnabled(true);

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const hover = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const match = target?.closest(
        "a,button,[role='button'],input,textarea,[data-cursor='magnetic']",
      );
      setActive(Boolean(match));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", hover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hover);
    };
  }, [reducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[70%] mix-blend-difference"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: active ? 1.65 : 1,
          borderColor: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[89] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[85%] mix-blend-difference"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          scale: active ? 0.2 : 1,
          opacity: active ? 0.9 : 0.65,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  );
}

