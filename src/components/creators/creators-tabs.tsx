"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GamePlacardTab } from "@/components/games/game-placard-tab";
import { KineticList, type KineticCreator } from "@/components/creators/kinetic-list";

type Game = { id: string; name: string; icon: string; imageUrl?: string | null };

export function CreatorsTabs({ games, creators }: { games: Game[]; creators: KineticCreator[] }) {
  const [activeId, setActiveId] = useState<string | "all">("all");

  const filtered =
    activeId === "all" ? creators : creators.filter((c) => c.games.some((g) => g.id === activeId));

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        <GamePlacardTab label="All" icon="🎮" isActive={activeId === "all"} onClick={() => setActiveId("all")} />
        {games.map((game) => (
          <GamePlacardTab
            key={game.id}
            label={game.name}
            icon={game.icon}
            imageUrl={game.imageUrl}
            isActive={activeId === game.id}
            onClick={() => setActiveId(game.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <KineticList creators={filtered} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
