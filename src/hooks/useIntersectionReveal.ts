"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function useIntersectionReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T | null>(null);
  const optionsRef = useRef<IntersectionObserverInit>(options ?? { threshold: 0.22 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reducedMotion) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      optionsRef.current,
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return ref;
}
