import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/ui/parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const BULLETS = [
  "Professional teams across our top gaming titles",
  "Content creators with a combined loyal fanbase",
  "Active Discord community of passionate gamers",
  "Regular events, tournaments & giveaways",
];

export function AboutPreview() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
      <Reveal y={48}>
        <Parallax strength={30} className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
          <div className="absolute -inset-x-4 -top-4 h-24 bg-gradient-to-b from-accent/20 to-transparent blur-2xl" />
          <Image
            src="/about-placeholder.svg"
            alt="Team TG"
            fill
            loading="lazy"
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <span className="absolute inset-0 border border-accent/20" />
        </Parallax>
      </Reveal>

      <RevealGroup>
        <RevealItem>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">// Who We Are</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">About Us</h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-6 text-foreground/80">
            Team TG is not just a gaming organization — it&apos;s a movement. We unite passionate players,
            creators, and fans under one elite banner.
          </p>
          <p className="mt-4 text-foreground/80">
            From competitive tournaments to viral content, Team TG is redefining Indian gaming on the
            global stage.
          </p>
        </RevealItem>

        <RevealItem>
          <ul className="mt-8 space-y-3">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                {bullet}
              </li>
            ))}
          </ul>
        </RevealItem>

        <RevealItem>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-accent"
          >
            Our Story
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
