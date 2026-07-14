"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { StatCounter } from "@/components/home/stat-counter";

const GLSLHills = dynamic(() => import("@/components/home/glsl-hills").then((m) => m.GLSLHills), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero({
  stats,
}: {
  stats: { label: string; value: string }[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const shaderY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen min-h-[640px] w-full flex-col items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: shaderY }}>
        <GLSLHills />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/20 to-background" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: contentY, opacity: contentOpacity }}
        className="pointer-events-none relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.h1
          variants={item}
          className="font-display text-6xl uppercase leading-none tracking-wide text-glow sm:text-8xl md:text-9xl"
        >
          Team <span className="text-accent">TG</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 text-lg uppercase tracking-[0.3em] text-muted sm:text-xl">
          Dominate · Unite · Conquer
        </motion.p>

        <motion.div variants={item} className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/games"
            className="border-glow rounded-sm bg-accent px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-black transition-transform hover:scale-105"
          >
            Explore Our Arena
          </Link>
          <Link
            href="/creators"
            className="rounded-sm border border-border px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Meet The Squad
          </Link>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-14 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3 md:grid-cols-5"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <dd className="font-display text-3xl text-accent sm:text-4xl">
                <StatCounter value={stat.value} />
              </dd>
              <dt className="mt-1 text-xs uppercase tracking-widest text-muted">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-accent/50 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-accent" />
        </motion.div>
      </motion.div>

      <div
        className="absolute inset-x-0 bottom-0 h-16 bg-background"
        style={{ clipPath: "polygon(0 100%, 100% 40%, 100% 100%)" }}
      />
    </section>
  );
}
