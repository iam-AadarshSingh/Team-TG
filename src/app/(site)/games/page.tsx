import { Suspense } from "react";
import { getCreators, getGames } from "@/lib/queries";
import { getMinecraftStatus } from "@/lib/minecraft";
import { GamesTabs } from "@/components/games/games-tabs";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = { title: "Games — Team TG" };

export default async function GamesPage() {
  const [games, creators] = await Promise.all([getGames(), getCreators()]);

  // Not awaited: these promises are handed to a client component that
  // unwraps them with `use()` inside a Suspense boundary, so the external
  // mcsrvstat.us calls stream in separately instead of blocking the page.
  const minecraft = games.find((g) => g.slug === "minecraft");
  const minecraftJavaPromise = minecraft?.serverIp
    ? getMinecraftStatus(minecraft.serverIp, minecraft.serverPort, "java")
    : null;
  const minecraftBedrockPromise = minecraft?.serverIpBedrock
    ? getMinecraftStatus(minecraft.serverIpBedrock, minecraft.serverPortBedrock, "bedrock")
    : null;

  const creatorsByGame = creators.reduce<Record<string, typeof creators>>((acc, creator) => {
    for (const game of creator.games) {
      (acc[game.id] ??= []).push(creator);
    }
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <PageHeader eyebrow="// Our Arena" title="Games" />

      <div className="mt-12">
        <Suspense fallback={null}>
          <GamesTabs
            games={games}
            creatorsByGame={creatorsByGame}
            minecraftJavaPromise={minecraftJavaPromise}
            minecraftBedrockPromise={minecraftBedrockPromise}
          />
        </Suspense>
      </div>
    </div>
  );
}
