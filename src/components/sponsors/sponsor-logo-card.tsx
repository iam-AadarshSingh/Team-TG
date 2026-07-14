import Image from "next/image";
import Link from "next/link";

type Sponsor = {
  id: string;
  logoUrl: string | null;
  name: string;
  tier: string;
  link: string | null;
};

export function SponsorLogoCard({ sponsor }: { sponsor: Sponsor }) {
  const content = (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/0 via-accent/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:from-accent/10 group-hover:opacity-100" />
      {sponsor.logoUrl && (
        <div className="relative h-14 w-full grayscale transition-all duration-300 group-hover:grayscale-0">
          <Image src={sponsor.logoUrl} alt={sponsor.name} fill loading="lazy" className="object-contain" sizes="240px" />
        </div>
      )}
      <span className="font-display text-lg uppercase tracking-wide leading-tight break-words">{sponsor.name}</span>
      <span className="text-xs uppercase tracking-widest text-muted">{sponsor.tier}</span>
    </>
  );

  const className =
    "group relative flex min-h-[180px] flex-col items-center justify-center gap-3 overflow-hidden rounded-sm border border-border bg-surface/40 px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_50px_-20px_rgba(255,107,0,0.45)]";

  return sponsor.link ? (
    <Link href={sponsor.link} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
