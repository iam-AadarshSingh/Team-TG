"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Moves its children vertically at a different rate than the page scrolls,
 * based on the wrapper's own position in the viewport (not the whole page).
 * `strength` in px — positive moves content down as you scroll past it.
 */
export function Parallax({
  children,
  className,
  strength = 60,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={className}>
      {/* Framer Motion applies `transform` even at y=0, which makes this div
          the new containing block for any `next/image fill` descendant. It
          needs an explicit size (not shrink-to-fit) or that image collapses
          to 0 height. */}
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
