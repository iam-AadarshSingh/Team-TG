import Link from "next/link";
import { getOpenCareers } from "@/lib/queries";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export const metadata = { title: "Careers — Team TG" };

export default async function CareerPage() {
  const openings = await getOpenCareers();

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <PageHeader eyebrow="// Join Us" title="Careers" />
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-2xl text-foreground/80">
          Team TG is always looking for driven creators, players, and organizers who want to help build
          something bigger. Check our current openings below — if nothing fits, reach out anyway.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 space-y-6">
        {openings.length === 0 ? (
          <p className="text-muted">No open positions right now — check back soon.</p>
        ) : (
          openings.map((opening) => (
            <RevealItem key={opening.id}>
              <div className="group relative flex flex-wrap items-start justify-between gap-4 overflow-hidden rounded-sm border border-border bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_50px_-20px_rgba(255,107,0,0.45)]">
                <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-accent">{opening.department}</span>
                  <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">{opening.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-foreground/80">{opening.description}</p>
                </div>
                <Link
                  href={opening.applyLink ?? "/contact"}
                  target={opening.applyLink ? "_blank" : undefined}
                  rel={opening.applyLink ? "noopener noreferrer" : undefined}
                  className="shrink-0 rounded-sm border border-accent px-6 py-2 text-sm uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-black"
                >
                  Apply →
                </Link>
              </div>
            </RevealItem>
          ))
        )}
      </RevealGroup>
    </div>
  );
}
