import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/**
 * CountUp — animates a number from 0 to `value` when scrolled into view.
 * Renders the integer portion; pass a `prefix`/`suffix` for symbols like $ or %.
 */
export default function CountUp({ value = 0, duration = 1.8, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}