import { Variants } from "framer-motion";

export const EASING: [number, number, number, number] = [0.87, 0, 0.13, 1]; // Expo out-like custom ease

// Use this for any transition to ensure consistency
export const DURATION = 0.8;

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { 
    y: 40, 
    opacity: 0,
    filter: "blur(10px)" 
  },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: DURATION,
      ease: EASING,
    },
  },
};

export const fadeInReveal: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: DURATION,
      ease: EASING,
    },
  },
};

export const revealText = (delay = 0): Variants => ({
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATION,
      ease: EASING,
      delay,
    },
  },
});
