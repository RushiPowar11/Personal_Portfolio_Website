import type { Transition, Variants } from "framer-motion";

export const EASING = {
  softOut: [0.22, 1, 0.36, 1] as const,
  powerOut: [0.19, 1, 0.22, 1] as const,
  sharpInOut: [0.83, 0, 0.17, 1] as const,
};

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 1.1,
};

export const TIMINGS = {
  sectionStagger: 0.08,
  itemStagger: 0.05,
};

export const motionTransition = {
  fast: {
    duration: DURATION.fast,
    ease: EASING.softOut,
  } satisfies Transition,
  base: {
    duration: DURATION.base,
    ease: EASING.powerOut,
  } satisfies Transition,
  slow: {
    duration: DURATION.slow,
    ease: EASING.powerOut,
  } satisfies Transition,
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: motionTransition.base,
  },
};

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: TIMINGS.sectionStagger,
      delayChildren: 0.1,
    },
  },
};
