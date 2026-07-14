"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { CreatorCard } from "@/components/creators/creator-card";
import { GamePlacardTab } from "@/components/games/game-placard-tab";
import { MinecraftStatusSkeleton } from "@/components/games/minecraft-status";
import { MinecraftStatusResolved } from "@/components/games/minecraft-status-resolved";
import type { MinecraftStatus } from "@/lib/minecraft";

type Creator = Parameters<typeof CreatorCard>[0]["creator"];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

type Game = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  imageUrl: string | null;
  tagline: string;
  status: string;
  serverName: string | null;
  serverIp: string | null;
  serverPort: string | null;
  serverIpBedrock: string | null;
  serverPortBedrock: string | null;
};

export function GamesTabs({
  games,
  creatorsByGame,
  minecraftJavaPromise,
  minecraftBedrockPromise,
}: {
  games: Game[];
  creatorsByGame: Record<string, Creator[]>;
  minecraftJavaPromise: Promise<MinecraftStatus> | null;
  minecraftBedrockPromise: Promise<MinecraftStatus> | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("game");
  const [activeSlug, setActiveSlug] = useState(
    games.find((g) => g.slug === initial)?.slug ?? games[0]?.slug
  );

  const active = games.find((g) => g.slug === activeSlug) ?? games[0];
  const creators = active ? creatorsByGame[active.id] ?? [] : [];

  function selectGame(slug: string) {
    setActiveSlug(slug);
    router.replace(`/games?game=${slug}`, { scroll: false });
  }

  if (!active) {
    return <p className="text-muted">No games configured yet.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 border-b border-border pb-8 sm:grid-cols-3 md:grid-cols-5">
        {games.map((game) => (
          <GamePlacardTab
            key={game.id}
            label={game.name}
            icon={game.icon}
            imageUrl={game.imageUrl}
            isActive={game.slug === active.slug}
            onClick={() => selectGame(game.slug)}
          />
        ))}
      </div>

      <motion.div
        key={active.slug}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pt-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-wide">
              {active.icon} {active.name}
            </h2>
            <p className="mt-1 text-muted">{active.tagline}</p>
          </div>
          <span className="rounded-full border border-accent/40 px-3 py-1 text-xs uppercase tracking-widest text-accent">
            {active.status}
          </span>
        </div>

        {active.slug === "minecraft" && active.serverIp && minecraftJavaPromise && (
          <div className="mt-8">
            <Suspense fallback={<MinecraftStatusSkeleton />}>
              <MinecraftStatusResolved
                serverName={active.serverName ?? active.name}
                javaIp={active.serverIp}
                javaPort={active.serverPort}
                javaPromise={minecraftJavaPromise}
                bedrockIp={active.serverIpBedrock}
                bedrockPort={active.serverPortBedrock}
                bedrockPromise={minecraftBedrockPromise}
              />
            </Suspense>
          </div>
        )}

        {creators.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {creators.map((creator, i) => (
              <motion.div key={creator.id} variants={item}>
                <CreatorCard creator={creator} rank={i + 1} showGameBadge={false} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="mt-10 text-muted">No creators added for this game yet.</p>
        )}
      </motion.div>
    </div>
  );
}
