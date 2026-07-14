"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { IconDiscord, IconInstagram, IconTwitch, IconX, IconYoutube } from "@/components/icons/social";

export type KineticCreator = {
  id: string;
  photoUrl: string | null;
  inGameName: string;
  realName: string;
  bio: string | null;
  active: boolean;
  youtube: string | null;
  instagram: string | null;
  twitch: string | null;
  discord: string | null;
  x: string | null;
  games: { id: string; name: string }[];
};

const SOCIALS = [
  { key: "youtube", Icon: IconYoutube, label: "YouTube" },
  { key: "instagram", Icon: IconInstagram, label: "Instagram" },
  { key: "twitch", Icon: IconTwitch, label: "Twitch" },
  { key: "discord", Icon: IconDiscord, label: "Discord" },
  { key: "x", Icon: IconX, label: "X" },
] as const;

function StatusPill({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">
      <span className={`size-1.5 rounded-full ${active ? "bg-green-500" : "bg-muted"}`} />
      {active ? "Active" : "Inactive"}
    </div>
  );
}

function Photo({ creator }: { creator: KineticCreator }) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-border bg-black/40">
      {creator.photoUrl ? (
        <Image src={creator.photoUrl} alt={creator.inGameName} fill className="object-cover" sizes="320px" />
      ) : (
        <div className="flex h-full w-full items-center justify-center font-display text-4xl text-border">
          {creator.inGameName.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="absolute bottom-3 left-3">
        <StatusPill active={creator.active} />
      </div>
    </div>
  );
}

function ProfileModal({ creator, onClose }: { creator: KineticCreator; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative grid w-full max-w-2xl gap-8 rounded-sm border border-border bg-surface p-8 sm:grid-cols-2"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
        >
          ×
        </button>

        <Photo creator={creator} />

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-1.5">
            {creator.games.map((g) => (
              <span key={g.id} className="rounded-full border border-accent/40 px-2.5 py-1 text-xs uppercase tracking-widest text-accent">
                {g.name}
              </span>
            ))}
          </div>
          <h2 className="mt-3 font-display text-3xl uppercase tracking-wide">{creator.inGameName}</h2>
          <p className="text-xs uppercase tracking-widest text-muted">{creator.realName}</p>
          {creator.bio && <p className="mt-4 text-sm text-foreground/80">{creator.bio}</p>}

          <div className="mt-auto flex gap-3 pt-6">
            {SOCIALS.filter(({ key }) => creator[key]).map(({ key, Icon, label }) => (
              <a
                key={key}
                href={creator[key]!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${creator.inGameName} on ${label}`}
                className="flex size-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function KineticList({ creators }: { creators: KineticCreator[] }) {
  const [hasHover, setHasHover] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalCreator, setModalCreator] = useState<KineticCreator | null>(null);

  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  if (creators.length === 0) {
    return <p className="mt-10 text-muted">No creators in this category yet.</p>;
  }

  const focusedId = hoveredId ?? creators[0]?.id;
  const focusedCreator = creators.find((c) => c.id === focusedId) ?? null;

  function handleRowClick(creator: KineticCreator) {
    if (hasHover) {
      setModalCreator(creator);
    } else {
      setExpandedId((prev) => (prev === creator.id ? null : creator.id));
    }
  }

  return (
    <div className="mt-10 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-16">
      <div className="border-t border-border">
        {creators.map((creator, i) => {
          const isFocused = hasHover ? creator.id === focusedId : creator.id === expandedId;
          return (
            <div key={creator.id} className="border-b border-border">
              <div
                onMouseEnter={hasHover ? () => setHoveredId(creator.id) : undefined}
                onMouseLeave={hasHover ? () => setHoveredId(null) : undefined}
                onClick={() => handleRowClick(creator)}
                className="flex cursor-pointer items-center gap-4 py-5 sm:gap-6 sm:py-6"
              >
                <span className="w-8 shrink-0 text-sm text-muted sm:w-10">{String(i + 1).padStart(2, "0")}</span>
                <motion.h3
                  animate={{ opacity: isFocused ? 1 : 0.35 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-1 items-center gap-3 font-display text-2xl uppercase tracking-wide text-foreground sm:text-4xl lg:text-5xl"
                >
                  {creator.inGameName}
                  {isFocused && (
                    <span className="text-lg text-accent sm:text-2xl" aria-hidden>
                      ↗
                    </span>
                  )}
                </motion.h3>
                <motion.span
                  animate={{ opacity: isFocused ? 1 : 0.35 }}
                  transition={{ duration: 0.3 }}
                  className="hidden shrink-0 text-right text-xs uppercase tracking-widest text-accent sm:block"
                >
                  {creator.games.map((g) => g.name).join(" · ")}
                </motion.span>
              </div>

              {/* Mobile / touch: tap reveals the photo inline instead of a hover panel */}
              <div className="lg:hidden">
                <AnimatePresence>
                  {!hasHover && expandedId === creator.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-xs pb-6">
                        <Photo creator={creator} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalCreator(creator);
                          }}
                          className="mt-3 text-sm uppercase tracking-widest text-accent"
                        >
                          View Profile ↗
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: sticky preview panel for whichever row is hovered */}
      <div className="sticky top-28 hidden lg:block">
        <AnimatePresence mode="wait">
          {hasHover && focusedCreator && (
            <motion.div
              key={focusedCreator.id}
              initial={{ opacity: 0, x: 24, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Photo creator={focusedCreator} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modalCreator && <ProfileModal creator={modalCreator} onClose={() => setModalCreator(null)} />}
      </AnimatePresence>
    </div>
  );
}
