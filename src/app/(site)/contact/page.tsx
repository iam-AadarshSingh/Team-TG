import Link from "next/link";
import { getSiteSettings } from "@/lib/queries";
import { ContactForm } from "@/components/contact/contact-form";
import { VantaBackgroundLoader } from "@/components/contact/vanta-background-loader";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { IconDiscord, IconInstagram, IconX, IconYoutube } from "@/components/icons/social";

export const metadata = { title: "Contact — Team TG" };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const socials = [
    { href: settings.discordInvite, Icon: IconDiscord, label: "Discord" },
    { href: settings.twitterUrl, Icon: IconX, label: "X" },
    { href: settings.instagramUrl, Icon: IconInstagram, label: "Instagram" },
    { href: settings.youtubeUrl, Icon: IconYoutube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <div className="relative overflow-hidden">
      <VantaBackgroundLoader />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <PageHeader eyebrow="// Get In Touch" title="Contact Us" />

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal y={48}>
            <div className="relative overflow-hidden rounded-sm border border-border bg-surface/40 p-8 sm:p-10 backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(255,107,0,0.14),transparent)]" />
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 border border-accent/20"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
              />

              <p className="font-display text-3xl uppercase tracking-wide">
                Let&apos;s <span className="text-accent">Talk</span>
              </p>
              <p className="mt-4 max-w-sm text-foreground/80">
                Sponsorship inquiries, creator applications, press, or just want to say hi — drop us a
                message and we&apos;ll get back to you within 24–48 hours.
              </p>

              {settings.discordInvite && (
                <Link
                  href={settings.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-sm border border-accent px-6 py-2.5 text-sm uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-black"
                >
                  <IconDiscord className="size-4" />
                  Join Our Discord
                </Link>
              )}

              {socials.length > 0 && (
                <div className="mt-10 flex gap-3 border-t border-border pt-6">
                  {socials.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} y={48}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
