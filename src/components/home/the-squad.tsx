"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CreatorCard } from "@/components/creators/creator-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

type Creator = Parameters<typeof CreatorCard>[0]["creator"];

const INITIAL_COUNT = 8;

export function TheSquad({ creators }: { creators: Creator[] }) {
  const [showAll, setShowAll] = useState(false);

  if (creators.length === 0) return null;

  const visible = showAll ? creators : creators.slice(0, INITIAL_COUNT);
  const hasMore = creators.length > INITIAL_COUNT;

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">// The Squad</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">Our Creators</h2>
        </div>
        <Link
          href="/creators"
          className="text-sm uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          View All →
        </Link>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((creator) => (
          <RevealItem key={creator.id}>
            <CreatorCard creator={creator} />
          </RevealItem>
        ))}
      </RevealGroup>

      {hasMore && !showAll && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => setShowAll(true)}
            className="rounded-sm border border-accent px-8 py-3 text-sm uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-black"
          >
            Show More ({creators.length - INITIAL_COUNT} more)
          </button>
        </motion.div>
      )}
    </section>
  );
}
