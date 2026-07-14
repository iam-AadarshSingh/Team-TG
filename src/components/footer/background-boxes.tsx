"use client";

import { useRef, useState } from "react";

const COLORS = ["#ffffff", "#e5e5e5", "#c4c4c4", "#a3a3a3", "#8a8a8a", "#6b6b6b"];
const COLUMNS = 36;
const ROWS = 7;
const FADE_MS = 2000;

function BoxCell() {
  const [color, setColor] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    timeoutRef.current = setTimeout(() => setColor(null), FADE_MS);
  }

  return (
    <div
      onMouseEnter={handleEnter}
      className="pointer-events-auto border-[0.5px] border-white/5"
      style={{
        backgroundColor: color ?? "transparent",
        transition: color ? "background-color 0.1s ease-out" : `background-color ${FADE_MS}ms ease-out`,
      }}
    />
  );
}

/**
 * A full grid of hoverable cells covering the footer background — moving
 * the cursor across it lights up whichever cells it passes over, each
 * fading back out a couple seconds later, leaving a trailing effect.
 * Plain CSS transitions per-cell (not Framer Motion) since there can be
 * a couple hundred cells and this keeps it cheap; positions come entirely
 * from CSS grid rather than computed inline styles, which also sidesteps
 * any SSR/client style-formatting mismatch.
 */
export function BackgroundBoxes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 grid overflow-hidden opacity-80"
      style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {Array.from({ length: COLUMNS * ROWS }, (_, i) => (
        <BoxCell key={i} />
      ))}
    </div>
  );
}
