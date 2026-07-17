import Link from "next/link";
import { SponsorLogoCard } from "@/components/sponsors/sponsor-logo-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

type Sponsor = Parameters<typeof SponsorLogoCard>[0]["sponsor"];

export function OurPartners({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">// Our Partners</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">Trusted By</h2>
        </div>
        <Link
          href="/sponsors"
          className="text-sm uppercase tracking-widest text-muted transition-colors hover:text-accent"
        >
          View All →
        </Link>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sponsors.map((sponsor) => (
          <RevealItem key={sponsor.id}>
            <SponsorLogoCard sponsor={sponsor} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
