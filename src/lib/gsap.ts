"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

let isRegistered = false;

export function ensureGsapPlugins() {
  if (isRegistered || typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin);
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });
  isRegistered = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, SplitText, MorphSVGPlugin };
