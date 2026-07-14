"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Sponsor = {
  id: string;
  logoUrl: string | null;
  name: string;
  tier: string;
  description: string | null;
  subtitle: string | null;
  perks: string[];
  link: string | null;
};

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(sponsor.subtitle) || sponsor.perks.length > 0;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-border bg-surface/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_50px_-20px_rgba(255,107,0,0.45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_60%_at_50%_0%,rgba(255,107,0,0.1),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex h-28 items-center justify-center border-b border-border bg-black/20 px-6">
        {sponsor.logoUrl ? (
          <div className="relative h-12 w-full">
            <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-contain" sizes="240px" />
          </div>
        ) : (
          <span className="font-display text-2xl uppercase tracking-wide">{sponsor.name}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full border border-accent/40 px-3 py-1 text-xs uppercase tracking-widest text-accent">
          {sponsor.tier}
        </span>
        <h2 className="mt-3 font-display text-xl uppercase tracking-wide">{sponsor.name}</h2>
        {sponsor.description && <p className="mt-2 text-sm text-foreground/80">{sponsor.description}</p>}

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
          {sponsor.link && (
            <Link
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm uppercase tracking-widest text-accent"
            >
              Learn More
              <span className="transition-transform group-hover/link:translate-x-1">→</span>
            </Link>
          )}
          {hasDetails && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 text-sm uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              Partner Details
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                ▾
              </motion.span>
            </button>
          )}
        </div>

        <AnimatePresence>
          {open && hasDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-border pt-4">
                {sponsor.subtitle && (
                  <p className="text-xs uppercase tracking-widest text-accent/80">{sponsor.subtitle}</p>
                )}
                {sponsor.perks.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {sponsor.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
