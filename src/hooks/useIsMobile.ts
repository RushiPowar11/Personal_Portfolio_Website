"use client";

import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const isNarrow = window.innerWidth < 768;
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isNarrow || isTouch);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}
