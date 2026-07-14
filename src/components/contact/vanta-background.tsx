"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type VantaEffect = { destroy: () => void };
type WindowWithThree = Window & { THREE?: typeof THREE };

export function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (effectRef.current || !containerRef.current) return;

    let cancelled = false;

    // vanta's DOTS effect reads `window.THREE` directly at its own module
    // top level (`let THREE = window.THREE`), separately from the
    // `options.THREE` override its base class supports. That top-level
    // code runs the instant the dynamic import below is evaluated — before
    // any .then() callback fires — so window.THREE has to be set here,
    // *before* the import() call, or it's already too late.
    (window as WindowWithThree).THREE = THREE;

    import("vanta/dist/vanta.dots.min").then(({ default: DOTS }) => {
      if (cancelled || !containerRef.current || effectRef.current) return;
      effectRef.current = DOTS({
        el: containerRef.current,
        THREE,
        backgroundColor: 0x0a0a0a,
        color: 0xff6b00,
        color2: 0xff6b00,
        size: 4.0,
        spacing: 25.0,
        showLines: false,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
      });
    });

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
      delete (window as WindowWithThree).THREE;
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
