"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent } from "react";

type MagneticStrength = {
  x?: number;
  y?: number;
};

export function useMagnetic(strength: MagneticStrength = { x: 0.26, y: 0.26 }) {
  const ref = useRef<HTMLElement | null>(null);
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  const x = useSpring(posX, { stiffness: 230, damping: 19, mass: 0.25 });
  const y = useSpring(posY, { stiffness: 230, damping: 19, mass: 0.25 });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    posX.set(offsetX * (strength.x ?? 0.26));
    posY.set(offsetY * (strength.y ?? 0.26));
  };

  const onLeave = () => {
    posX.set(0);
    posY.set(0);
  };

  return { ref, x, y, onMove, onLeave };
}
