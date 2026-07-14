"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

// Keeps `v` looping within [min, max) forever, so the track never runs out
// of content regardless of how far it's scrolled in either direction.
function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// Repeated enough times that the track is always wider than any realistic
// viewport even with just 2-3 items — otherwise the loop visibly runs out
// of content before it wraps.
const COPIES = 8;
const WRAP_MIN = -(100 / COPIES) * (COPIES - 1);

export type PerspectiveMarqueeItem = { name: string; logoUrl?: string };

/**
 * Infinite horizontal marquee whose speed and direction react to page
 * scroll velocity: scrolling down speeds it up (default, leftward);
 * scrolling up reverses it (rightward); idle settles to a slow constant
 * baseline that never fully stops. Edges fade via a CSS mask, and the
 * track sits on a slight 3D-tilted plane.
 */
export function PerspectiveMarquee({
  items,
  baseSpeed = 4,
  className,
}: {
  items: PerspectiveMarqueeItem[];
  baseSpeed?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(WRAP_MIN, 0, v)}%`);

  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { damping: 40, stiffness: 300 });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 2000], [-14, 14], { clamp: false });

  // Wheel/trackpad scrolling arrives in discrete bursts, not one continuous
  // motion — velocity repeatedly dips near zero *between* bursts even
  // during a sustained scroll-up gesture. Committing to "default leftward"
  // the instant velocity crossed zero made direction flicker back and
  // forth every burst. Only update the committed direction once velocity
  // clears a deadzone, and hold the last direction through the gaps.
  const directionRef = useRef<1 | -1>(-1);
  const DEADZONE = 1.5;

  useAnimationFrame((_time, delta) => {
    const dt = delta / 1000;

    if (prefersReducedMotion) {
      baseX.set(baseX.get() - baseSpeed * 0.4 * dt);
      return;
    }

    const vf = velocityFactor.get();
    if (Math.abs(vf) > DEADZONE) {
      directionRef.current = vf >= 0 ? -1 : 1; // scroll down -> left (default); scroll up -> right
    }
    const magnitude = baseSpeed + Math.abs(vf);
    baseX.set(baseX.get() + directionRef.current * magnitude * dt);
  });

  return (
    <div
      className={`overflow-hidden ${className ?? ""}`}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        perspective: "700px",
      }}
    >
      <motion.div className="flex w-max items-center gap-16" style={{ x, rotateX: 6 }}>
        {Array.from({ length: COPIES }, (_, copy) =>
          items.map((item, i) => <MarqueeItem key={`${copy}-${item.name}-${i}`} item={item} />)
        )}
      </motion.div>
    </div>
  );
}

function MarqueeItem({ item }: { item: PerspectiveMarqueeItem }) {
  return (
    <div className="flex shrink-0 items-center gap-3 opacity-80">
      {item.logoUrl ? (
        <div className="relative h-8 w-32">
          <Image src={item.logoUrl} alt={item.name} fill className="object-contain" sizes="128px" />
        </div>
      ) : (
        <span className="font-display text-lg uppercase tracking-wide text-foreground">{item.name}</span>
      )}
    </div>
  );
}
