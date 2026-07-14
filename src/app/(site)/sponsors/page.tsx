import Link from "next/link";
import { getSponsors } from "@/lib/queries";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PerspectiveMarquee } from "@/components/ui/perspective-marquee";
import { SponsorCard } from "@/components/sponsors/sponsor-card";

export const metadata = { title: "Sponsors — Team TG" };

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <PageHeader eyebrow="// Our Partners" title="Sponsors" />

      {sponsors.length === 0 ? (
        <p className="mt-10 text-muted">No sponsors listed yet.</p>
      ) : (
        <>
          <Reveal delay={0.1}>
            <div className="mt-12 border-y border-border py-8">
              <p className="mb-6 text-center text-xs uppercase tracking-widest text-muted">Trusted By</p>
              <PerspectiveMarquee
                items={sponsors.map((s) => ({ name: s.name, logoUrl: s.logoUrl ?? undefined }))}
              />
            </div>
          </Reveal>

          <RevealGroup className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((sponsor) => (
              <RevealItem key={sponsor.id}>
                <SponsorCard sponsor={sponsor} />
              </RevealItem>
            ))}

            <RevealItem>
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-sm border border-dashed border-border p-6 text-center transition-colors hover:border-accent">
                <span className="text-3xl">🤝</span>
                <h2 className="mt-3 font-display text-xl uppercase tracking-wide">Your Brand</h2>
                <p className="mt-2 text-sm text-muted">
                  Join Team TG as a partner. Reach India&apos;s growing gaming community.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 text-sm uppercase tracking-widest text-accent transition-opacity hover:opacity-80"
                >
                  Get In Touch →
                </Link>
              </div>
            </RevealItem>
          </RevealGroup>
        </>
      )}
    </div>
  );
}
