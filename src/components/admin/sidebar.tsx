"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/creators", label: "Creators" },
  { href: "/admin/team", label: "Team Members" },
  { href: "/admin/games", label: "Games" },
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/careers", label: "Career Openings" },
  { href: "/admin/submissions", label: "Contact Submissions" },
  { href: "/admin/settings", label: "Site Settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface/40">
      <div className="border-b border-border px-6 py-5">
        <Link href="/admin" className="font-display text-xl tracking-wide">
          TEAM <span className="text-accent">TG</span>
        </Link>
        <p className="mt-0.5 text-xs uppercase tracking-widest text-muted">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-sm px-3 py-2 text-sm uppercase tracking-wide transition-colors ${
                active ? "bg-accent text-black" : "text-muted hover:bg-black/30 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          target="_blank"
          className="block rounded-sm px-3 py-2 text-sm uppercase tracking-wide text-muted transition-colors hover:bg-black/30 hover:text-foreground"
        >
          View Site ↗
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="mt-1 block w-full rounded-sm px-3 py-2 text-left text-sm uppercase tracking-wide text-muted transition-colors hover:bg-black/30 hover:text-red-400"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
