import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

type Game = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  imageUrl: string | null;
  tagline: string;
  status: string;
};

export function OurGames({ games }: { games: Game[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">// Our Arena</p>
        <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">Our Games</h2>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game, i) => (
          <RevealItem key={game.id}>
            <Link
              href={`/games?game=${game.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-sm border border-border transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_50px_-20px_rgba(255,107,0,0.45)]"
            >
              {game.imageUrl ? (
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              ) : (
                <div className="absolute inset-0 bg-surface/40" />
              )}

              {/* Placard fade — text sits on this gradient at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />

              <span className="absolute right-4 top-4 font-display text-4xl text-white/30">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{game.icon}</span>
                <h3 className="mt-2 font-display text-2xl uppercase tracking-wide text-white">{game.name}</h3>
                <p className="mt-1 text-sm text-white/70">{game.tagline}</p>
                <span className="mt-4 inline-block rounded-full border border-accent/40 px-3 py-1 text-xs uppercase tracking-widest text-accent">
                  {game.status}
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
