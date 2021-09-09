export const easy = {
  duration: 0.4,
  ease: [0.37, 0.15, 0.48, 0.99],
};

export const parentFadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.15, delayChildren: 0.15, staggerChildren: 0.2 },
  },
  exit: { opacity: 0, pointerEvents: "none" },
};
