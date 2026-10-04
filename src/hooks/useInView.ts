"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(rootMargin = "250px") {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Use IntersectionObserver as primary visibility tracker
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(node);

    // Listen for contentvisibilityautostatechange if supported
    const handleCviChange = (event: Event) => {
      const cviEvent = event as Event & { skipped?: boolean };
      if (typeof cviEvent.skipped === "boolean") {
        setIsInView(!cviEvent.skipped);
      }
    };

    node.addEventListener("contentvisibilityautostatechange", handleCviChange);

    return () => {
      observer.disconnect();
      node.removeEventListener("contentvisibilityautostatechange", handleCviChange);
    };
  }, [rootMargin]);

  return { ref, isInView };
}
