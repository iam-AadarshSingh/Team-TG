import Image from "next/image";
import { IconDiscord, IconInstagram, IconTwitch, IconX, IconYoutube } from "@/components/icons/social";

type CreatorCardProps = {
  creator: {
    id: string;
    photoUrl: string | null;
    inGameName: string;
    realName: string;
    bio: string | null;
    youtube: string | null;
    instagram: string | null;
    twitch: string | null;
    discord: string | null;
    x: string | null;
    games: { id: string; name: string; icon: string }[];
  };
  rank?: number;
  showGameBadge?: boolean;
};

const SOCIALS = [
  { key: "youtube", Icon: IconYoutube, label: "YouTube" },
  { key: "instagram", Icon: IconInstagram, label: "Instagram" },
  { key: "twitch", Icon: IconTwitch, label: "Twitch" },
  { key: "discord", Icon: IconDiscord, label: "Discord" },
  { key: "x", Icon: IconX, label: "X" },
] as const;

export function CreatorCard({ creator, rank, showGameBadge = true }: CreatorCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-sm border border-border bg-surface/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_20px_50px_-20px_rgba(255,107,0,0.45)]">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      <div className="relative aspect-square w-full overflow-hidden bg-black/40">
        {creator.photoUrl ? (
          <Image
            src={creator.photoUrl}
            alt={creator.inGameName}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-5xl text-border">
            {creator.inGameName.slice(0, 2).toUpperCase()}
          </div>
        )}
        {showGameBadge && creator.games.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {creator.games.map((game) => (
              <span
                key={game.id}
                className="rounded-full bg-black/60 px-2.5 py-1 text-xs uppercase tracking-widest text-accent backdrop-blur"
              >
                {game.icon} {game.name}
              </span>
            ))}
          </div>
        )}
        {rank !== undefined && (
          <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-accent font-display text-sm text-black">
            #{rank}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl uppercase tracking-wide">{creator.inGameName}</h3>
        <p className="text-xs uppercase tracking-widest text-muted">{creator.realName}</p>
        {creator.bio && <p className="mt-3 text-sm text-foreground/80">{creator.bio}</p>}

        <div className="mt-4 flex gap-3">
          {SOCIALS.filter(({ key }) => creator[key]).map(({ key, Icon, label }) => (
            <a
              key={key}
              href={creator[key]!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${creator.inGameName} on ${label}`}
              className="flex size-8 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="size-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
