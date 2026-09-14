import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient scroll-progress bar fixed at the very top of the viewport.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[60] bg-gradient-to-r from-primary via-accent to-chart-4"
    />
  );
}