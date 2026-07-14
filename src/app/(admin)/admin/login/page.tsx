"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setPending(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-sm border border-border bg-surface/40 p-8">
        <p className="text-center font-display text-2xl tracking-wide">
          TEAM <span className="text-accent">TG</span>
        </p>
        <p className="mt-1 text-center text-xs uppercase tracking-widest text-muted">Admin Login</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-sm bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
