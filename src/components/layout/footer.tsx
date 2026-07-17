import Link from "next/link";
import { getSiteSettings } from "@/lib/queries";
import { IconInstagram, IconX, IconYoutube } from "@/components/icons/social";
import { BackgroundBoxes } from "@/components/footer/background-boxes";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/career", label: "Career" },
  { href: "/admin", label: "Admin Panel" },
];

export async function Footer() {
  const settings = await getSiteSettings();

  const socials = [
    { href: settings.twitterUrl, Icon: IconX, label: "X" },
    { href: settings.instagramUrl, Icon: IconInstagram, label: "Instagram" },
    { href: settings.youtubeUrl, Icon: IconYoutube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer className="relative z-10 overflow-hidden border-t border-border bg-surface/40">
      <BackgroundBoxes />

      <div className="pointer-events-none relative z-10 h-px w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="pointer-events-none relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-wide">
            TEAM <span className="text-accent">TG</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">Dominate · Unite · Conquer</p>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-widest text-muted">Navigate</p>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group pointer-events-auto inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  <span className="h-px w-0 bg-accent transition-all duration-200 group-hover:w-3" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-widest text-muted">Follow</p>
          <div className="flex gap-4">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_8px_20px_-8px_rgba(255,107,0,0.6)]"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-10 border-t border-border px-6 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Team TG. All rights reserved.
      </div>
    </footer>
  );
}
