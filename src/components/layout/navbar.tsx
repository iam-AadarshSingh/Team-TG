"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconClose, IconMenu } from "@/components/icons/social";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Games" },
  { href: "/creators", label: "Creators" },
  { href: "/about", label: "About" },
  { href: "/sponsors", label: "Trusted By" },
  { href: "/contact", label: "Contact" },
  { href: "/career", label: "Career" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-foreground transition-transform hover:scale-105"
        >
          TEAM <span className="text-accent">TG</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={`font-sans text-sm uppercase tracking-wider transition-colors ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent/60 transition-all duration-200 group-hover:w-full" />
                )}
              </li>
            );
          })}
        </ul>

        <button
          aria-label="Toggle menu"
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.85, 0, 0.15, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3 font-sans text-sm uppercase tracking-wider ${
                    pathname === link.href ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
