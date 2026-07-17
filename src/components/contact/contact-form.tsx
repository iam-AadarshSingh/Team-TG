"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { IconAlert, IconCheck, IconMail, IconMessage, IconPhone, IconTag, IconUser } from "@/components/icons/ui";

const initialState: ContactState = { status: "idle", message: "" };

const fieldWrapClass = "group relative";
const fieldClass =
  "peer w-full rounded-sm border border-border bg-surface/40 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted transition-colors focus:border-accent focus:outline-none";
const iconClass =
  "pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted transition-colors peer-focus:text-accent";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center rounded-sm border border-accent/30 bg-surface/40 px-8 py-16 text-center backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 18 }}
          className="flex size-16 items-center justify-center rounded-full bg-accent/10 text-accent"
        >
          <IconCheck className="size-8" />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl uppercase tracking-wide">Message Sent</h3>
        <p className="mt-2 max-w-sm text-sm text-muted">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form
      action={formAction}
      className="relative space-y-5 rounded-sm border border-border bg-surface/40 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="pointer-events-none absolute -inset-x-6 -top-6 h-24 bg-gradient-to-b from-accent/10 to-transparent blur-2xl" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={fieldWrapClass}>
          <IconUser className={iconClass} />
          <input name="name" placeholder="Your Name" required className={fieldClass} />
        </div>
        <div className={fieldWrapClass}>
          <IconMail className={iconClass} />
          <input name="email" type="email" placeholder="Email Address" required className={fieldClass} />
        </div>
      </div>

      <div className={fieldWrapClass}>
        <IconPhone className={iconClass} />
        <input name="phone" type="tel" placeholder="Phone Number (optional)" className={fieldClass} />
      </div>

      <div className={fieldWrapClass}>
        <IconTag className={iconClass} />
        <input name="subject" placeholder="Subject" required className={fieldClass} />
      </div>

      <div className={fieldWrapClass}>
        <IconMessage className={`${iconClass} top-4`} />
        <textarea name="message" placeholder="Your Message" required rows={6} className={fieldClass} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="border-glow group relative w-full overflow-hidden rounded-sm bg-accent px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>

      <AnimatePresence mode="wait">
        {state.status === "error" && (
          <motion.p
            key={state.message}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-sm text-red-400"
          >
            <IconAlert className="size-4 shrink-0" />
            {state.message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
