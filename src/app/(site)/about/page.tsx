import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSiteSettings, getTeamMembers } from "@/lib/queries";
import { TeamCard } from "@/components/about/team-card";
import { StatCounter } from "@/components/home/stat-counter";
import { Parallax } from "@/components/ui/parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

export const metadata = { title: "About — Team TG" };

const VALUES = [
  {
    icon: "⚡",
    title: "Excellence",
    body: "We don't settle for average. Every match, every video — we bring our absolute best. Excellence is not a goal; it's our standard.",
  },
  {
    icon: "🤝",
    title: "Brotherhood",
    body: "Team TG is a family. We grow together, fail together, and win together. The strength of our team lies in every bond.",
  },
  {
    icon: "🎯",
    title: "Focus",
    body: "Clear goals. Sharp minds. We stay locked in on what matters — improving every single day.",
  },
  {
    icon: "🔥",
    title: "Passion",
    body: "Gaming is not just a career — it's a calling. Every member of Team TG plays with a fire that cannot be extinguished.",
  },
  {
    icon: "🌐",
    title: "Community",
    body: "Our audience is our foundation. The fans, viewers, Discord members — without community, Team TG is nothing.",
  },
  {
    icon: "🏆",
    title: "Victory",
    body: "We compete to win. Whether ranked, tournament, or creative — Team TG always plays for the top spot.",
  },
];

export default async function AboutPage() {
  const [team, settings, gameCount, creatorCount] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
    prisma.game.count(),
    prisma.creator.count({ where: { active: true } }),
  ]);

  const storyStats = [
    { label: "Active Games", value: String(gameCount) },
    { label: "Top Creators", value: `${creatorCount}+` },
    { label: "Community", value: settings.statCommunity },
    { label: "Founded", value: "2023" },
  ];

  const connections = [
    {
      icon: "💬",
      label: "Discord",
      handle: settings.discordInvite?.replace(/^https?:\/\//, "") ?? null,
      cta: "Join Server →",
      href: settings.discordInvite,
    },
    {
      icon: "▶️",
      label: "YouTube",
      handle: "@TeamTG",
      cta: "Subscribe →",
      href: settings.youtubeUrl,
    },
    {
      icon: "📸",
      label: "Instagram",
      handle: "@TeamTG",
      cta: "Follow →",
      href: settings.instagramUrl,
    },
    {
      icon: "🟣",
      label: "Twitch",
      handle: "@TeamTG",
      cta: "Watch Live →",
      href: settings.twitchUrl,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Intro */}
      <section className="relative px-6 py-28 sm:py-36">
        <Parallax strength={80} className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <span className="select-none font-display text-[22vw] uppercase leading-none text-white/[0.03] sm:text-[16vw]">
            TG
          </span>
        </Parallax>

        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">// Who We Are</p>
          </Reveal>

          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-wide sm:text-7xl lg:text-8xl">
            <Reveal delay={0.1}>
              <span>WE ARE</span>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="text-accent text-glow">TEAM TG</span>
            </Reveal>
          </h1>

          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-lg text-foreground/80">
              A movement, not just an organization. We unite passionate players, creators, and fans
              under one elite banner — competing and creating across the games our community loves
              most.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">// The Story</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">Who Is Team TG?</h2>
        </Reveal>

        <RevealGroup className="mt-8 space-y-5 text-foreground/80">
          <RevealItem>
            <p>
              Team TG was born from a simple idea: Indian gamers deserve a professional home. A place
              where talent is nurtured, competition is fierce, and the community is family.
            </p>
          </RevealItem>
          <RevealItem>
            <p>
              We are not just players. We are creators, strategists, entertainers, and pioneers. Team
              TG operates at the intersection of competitive gaming and content creation.
            </p>
          </RevealItem>
          <RevealItem>
            <p>
              From our beginnings to becoming a recognized name across Valorant, BGMI, and Minecraft —
              every step has been fueled by passion and community loyalty.
            </p>
          </RevealItem>
          <RevealItem>
            <p>
              Our mission is clear: to put Indian gaming on the global map — one victory, one video,
              one moment at a time.
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal delay={0.1}>
          <blockquote className="mt-10 border-l-2 border-accent pl-6">
            <p className="font-display text-2xl uppercase leading-snug tracking-wide sm:text-3xl">
              &ldquo;We don&apos;t just play the game. We change it.&rdquo;
            </p>
            <cite className="mt-2 block text-xs uppercase not-italic tracking-widest text-muted">
              — Team TG Motto
            </cite>
          </blockquote>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
            {storyStats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-3xl text-accent sm:text-4xl">
                  <StatCounter value={stat.value} />
                </dd>
                <dt className="mt-1 text-xs uppercase tracking-widest text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* The Name — full-bleed statement */}
      <section className="relative border-y border-border bg-surface/30 px-6 py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(255,107,0,0.1),transparent)]" />
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">// The Name</p>
          <p className="mt-6 font-display text-3xl uppercase leading-tight tracking-wide sm:text-5xl">
            TG stands for <span className="text-accent">Tickling Geeks</span>
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-foreground/80">
            A name born from a simple idea: gaming should be fun, sharp, and a little irreverent.
            Tickling Geeks is the spirit behind everything Team TG builds — competitive at heart,
            playful at core.
          </p>
        </Reveal>
      </section>

      {/* Our Values */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">// What We Stand For</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">Our Values</h2>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value) => (
            <RevealItem key={value.title}>
              <div className="relative h-full overflow-hidden rounded-sm border border-border bg-surface/40 p-8 transition-colors duration-300 hover:border-accent">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
                <span className="text-3xl">{value.icon}</span>
                <h3 className="mt-4 font-display text-xl uppercase tracking-wide">{value.title}</h3>
                <p className="mt-3 text-sm text-foreground/80">{value.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">// Behind The Banner</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">Our Team</h2>
        </Reveal>

        {team.length > 0 ? (
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <RevealItem key={member.id}>
                <TeamCard member={member} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-10 text-muted">Team roster coming soon.</p>
        )}
      </section>

      {/* Connect */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">// Find Us</p>
          <h2 className="mt-2 font-display text-4xl uppercase tracking-wide sm:text-5xl">Connect With TG</h2>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {connections.map((c) => (
            <RevealItem key={c.label}>
              <div className="flex h-full flex-col items-center rounded-sm border border-border bg-surface/40 p-8 text-center transition-colors duration-300 hover:border-accent">
                <span className="text-3xl">{c.icon}</span>
                <h3 className="mt-3 font-display text-lg uppercase tracking-wide">{c.label}</h3>
                <p className="mt-1 text-sm text-muted">{c.handle ?? "Not set"}</p>
                {c.href ? (
                  <Link
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm uppercase tracking-widest text-accent transition-opacity hover:opacity-80"
                  >
                    {c.cta}
                  </Link>
                ) : (
                  <p className="mt-4 text-xs uppercase tracking-widest text-muted">Update via admin panel</p>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}
