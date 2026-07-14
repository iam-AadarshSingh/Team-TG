"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion, useMotionValue, useTransform } from "framer-motion";

const STORAGE_KEY = "tg-preloader-done";
const MAX_WAIT = 4000;
const REVEAL_DURATION = 1.4;

const WORDS = ["DOMINATE", "UNITE", "CONQUER"];
const WORD_DURATION = 700; // DOMINATE, UNITE, CONQUER each get exactly this long
const TEAM_TG_HOLD = 1600; // TEAM TG gets noticeably longer than the others
// The curtain is never allowed to start rising before the full word
// sequence (including the closing "TEAM TG") has had its turn on screen.
const MIN_DURATION = WORDS.length * WORD_DURATION + TEAM_TG_HOLD;

type Phase = "intro" | "reveal" | "done";

function waitForAssets(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const fontsReady = "fonts" in document ? document.fonts.ready : Promise.resolve();
  const images = Array.from(document.querySelectorAll<HTMLImageElement>("img[data-preload]"));
  const imagePromises = images.map(
    (img) =>
      new Promise<void>((resolve) => {
        if (img.complete) return resolve();
        img.addEventListener("load", () => resolve(), { once: true });
        img.addEventListener("error", () => resolve(), { once: true });
      })
  );
  return Promise.all([fontsReady, ...imagePromises]).then(() => undefined);
}

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [wordIndex, setWordIndex] = useState(0);
  const progress = useMotionValue(0);
  const startedReveal = useRef(false);

  // p=0 -> edge=-38 (arc chord above the viewport, fill spans the whole
  // screen down to y=110: curtain fully covers the hero during intro).
  // p=1 -> edge=108 (arc chord below the viewport: fill is entirely
  // off-screen, curtain fully risen and gone).
  const fillPath = useTransform(progress, (p) => {
    const edge = -38 + p * 146;
    const control = edge + 26;
    return `M 0 ${edge} Q 50 ${control} 100 ${edge} L 100 110 L 0 110 Z`;
  });
  const linePath = useTransform(progress, (p) => {
    const edge = -38 + p * 146;
    const control = edge + 26;
    return `M 0 ${edge} Q 50 ${control} 100 ${edge}`;
  });

  // The word/"TEAM TG" text was fixed to the center of the viewport the
  // whole time, independent of the curtain's own motion — so once the
  // curtain rose past it, the text was left behind, floating statically
  // over the revealed hero. Tie it to the same progress value so it exits
  // upward together with the curtain instead of staying parked in place.
  const textY = useTransform(progress, [0, 1], ["0%", "-140%"]);
  const textOpacity = useTransform(progress, [0, 0.7, 1], [1, 1, 0]);

  useEffect(() => {
    try {
      if (prefersReducedMotion || sessionStorage.getItem(STORAGE_KEY) === "done") {
        setPhase("done");
        return;
      }
    } catch {
      // sessionStorage unavailable — fall through and play once
    }

    const start = Date.now();
    let cancelled = false;

    Promise.race([waitForAssets(), new Promise((resolve) => setTimeout(resolve, MAX_WAIT))]).then(() => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => {
        if (cancelled || startedReveal.current) return;
        startedReveal.current = true;
        setPhase("reveal");
        animate(progress, 1, {
          duration: REVEAL_DURATION,
          ease: [0.85, 0, 0.15, 1],
          onComplete: () => {
            setPhase("done");
            try {
              sessionStorage.setItem(STORAGE_KEY, "done");
            } catch {
              // ignore
            }
          },
        });
      }, wait);
    });

    return () => {
      cancelled = true;
    };
  }, [prefersReducedMotion, progress]);

  useEffect(() => {
    if (phase !== "intro") return;
    // Explicit, individually-scheduled transitions (not a repeating
    // interval) so each word's on-screen time is exact and auditable:
    // DOMINATE/UNITE/CONQUER each get WORD_DURATION; the schedule then
    // lands on and stays at the final "TEAM TG" slot (index === WORDS.length).
    const timeouts = WORDS.map((_, i) => setTimeout(() => setWordIndex(i + 1), WORD_DURATION * (i + 1)));
    return () => timeouts.forEach(clearTimeout);
  }, [phase]);

  if (phase === "done") return null;

  const isFinalWord = wordIndex >= WORDS.length;

  return (
    <div className="fixed inset-0 z-50">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <motion.path d={fillPath} fill="#0a0a0a" />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#ff6b00"
          strokeWidth={0.5}
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 6px #ff6b00)" }}
        />
      </svg>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.85, 0, 0.15, 1] }}
            className="font-display text-4xl uppercase tracking-widest text-white sm:text-6xl"
          >
            {isFinalWord ? (
              <>
                TEAM <span className="text-accent">TG</span>
              </>
            ) : (
              WORDS[wordIndex]
            )}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
