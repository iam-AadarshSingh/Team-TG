"use client";

import dynamic from "next/dynamic";

// Lazy-loaded so vanta/three only ship in the bundle for the Contact route.
export const VantaBackgroundLoader = dynamic(
  () => import("@/components/contact/vanta-background").then((m) => m.VantaBackground),
  { ssr: false }
);
