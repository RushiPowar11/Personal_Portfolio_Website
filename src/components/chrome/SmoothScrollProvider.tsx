"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";

type Props = { children: React.ReactNode };

export default function SmoothScrollProvider({ children }: Props) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Disable smooth scroll RAF loop on mobile or reduced-motion devices to save main thread CPU
    if (reducedMotion || isMobile) return;

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
    let pointerFrame = 0;
    let pendingX = 0;
    let pendingY = 0;
    let hasPendingPointer = false;

    const raf = (time: number) => {
      lenis.raf(time);
      const maxScroll =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = maxScroll > 0 ? lenis.scroll / maxScroll : 0;
      root.style.setProperty("--scroll-progress", `${Math.min(1, Math.max(0, progress))}`);
      frame = window.requestAnimationFrame(raf);
    };

    const updatePointer = () => {
      if (hasPendingPointer) {
        root.style.setProperty("--pointer-x", `${pendingX}`);
        root.style.setProperty("--pointer-y", `${pendingY}`);
        hasPendingPointer = false;
      }
    };

    const onPointerMove = (event: MouseEvent) => {
      pendingX = event.clientX / window.innerWidth;
      pendingY = event.clientY / window.innerHeight;
      if (!hasPendingPointer) {
        hasPendingPointer = true;
        pointerFrame = window.requestAnimationFrame(updatePointer);
      }
    };

    lenis.on("scroll", ScrollTrigger.update);
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener("mousemove", onPointerMove);
      lenis.destroy();
    };
  }, [reducedMotion, isMobile]);

  return <>{children}</>;
}
