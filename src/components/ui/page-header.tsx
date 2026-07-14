import { Reveal } from "@/components/ui/reveal";

export function PageHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-16 -top-16 -z-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
      <Reveal>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">{title}</h1>
        <span className="mt-5 block h-[3px] w-16 bg-accent" />
      </Reveal>
    </div>
  );
}
