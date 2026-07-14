"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

export function StatCounter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  const numeric = match ? parseInt(match[1], 10) : 0;

  useEffect(() => {
    if (!inView || !match) return;
    const controls = animate(count, numeric, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, numeric, count, match]);

  if (!match) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {match[2]}
    </span>
  );
}
