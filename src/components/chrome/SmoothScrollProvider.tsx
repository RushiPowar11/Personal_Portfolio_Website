"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { children: React.ReactNode };

export default function SmoothScrollProvider({ children }: Props) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    ensureGsapPlugins();
    const root = document.documentElement;
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      duration: 1.1,
      lerp: 0.09,
      wheelMultiplier: 1,
      easing: (time: number) => 1 - Math.pow(1 - time, 3),
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      const maxScroll =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = maxScroll > 0 ? lenis.scroll / maxScroll : 0;
      root.style.setProperty("--scroll-progress", `${Math.min(1, Math.max(0, progress))}`);
      frame = window.requestAnimationFrame(raf);
    };

    const onPointerMove = (event: MouseEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX / window.innerWidth}`);
      root.style.setProperty("--pointer-y", `${event.clientY / window.innerHeight}`);
    };

    lenis.on("scroll", ScrollTrigger.update);
    window.addEventListener("mousemove", onPointerMove);
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onPointerMove);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}

