# Team TG

Full-stack site for the **Team TG** gaming organization — dark/orange esports branding, animated
public pages, and an admin panel for managing everything without touching code.

## Stack

- **Next.js 16** (App Router, TypeScript, `src/`), React 19
- **Tailwind CSS v4** for styling, **Framer Motion** + **GSAP/ScrollTrigger** for animation, **Lenis** for smooth scroll
- **Three.js** raw shader hero background, custom arc-curtain preloader
- **Prisma 6** + **PostgreSQL** (built for Supabase)
- **NextAuth v4** (credentials provider, JWT sessions) for the single admin login
- **Supabase Storage** for creator photos / sponsor logos
- **Resend** for the contact form

## Project layout

```
src/app/(site)/      public pages — own root layout (navbar, footer, preloader, Lenis)
src/app/(admin)/     /admin panel — own root layout (no site chrome), auth-gated
src/app/api/auth/    NextAuth route handler
src/app/actions/     server actions (contact form + all admin CRUD)
src/components/      grouped by feature (home, games, creators, about, admin, layout, icons)
src/lib/             prisma client, supabase client, resend client, minecraft status, DB queries
prisma/schema.prisma all 8 models: AdminUser, Game, Creator, TeamMember, Sponsor, CareerOpening,
                      ContactSubmission, SiteSettings
prisma/seed.ts        seeds sample games/creators/sponsors/careers + the first admin login
```

`Creator.game` is a real relation to `Game`, so every game/category tab on the Games and Creators
pages is 100% database-driven — adding a game in `/admin/games` immediately gives you a new
Creators filter tab, no code changes.

## Running locally

1. **Install dependencies**
   ```
   npm install
   ```

2. **Set environment variables.** `.env` holds the Postgres URLs (read by both the Prisma CLI and
   Next.js); `.env.local` holds everything else. See [Environment variables](#environment-variables) below.

3. **Push the schema and seed sample data**
   ```
   npx prisma db push
   npx prisma db seed
   ```
   This creates the tables and seeds sample games/creators/sponsors/careers, plus the first admin
   login (`ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`, defaults to
   `admin@teamtg.gg` / `ChangeMe123!` — **change the password after your first login**).

   No Postgres yet? `npx prisma dev` spins up a local throwaway Postgres in the terminal — handy for
   trying the app before you've created a Supabase project. Swap `DATABASE_URL`/`DIRECT_URL` for your
   real Supabase connection strings when you're ready to deploy.

4. **Run the dev server**
   ```
   npm run dev
   ```
   Visit `http://localhost:3000`, and `http://localhost:3000/admin/login` for the admin panel.

## Environment variables

| Variable | Used by | Notes |
|---|---|---|
| `DATABASE_URL` | Prisma (runtime) | Supabase **pooled** connection (port 6543). Append `&pgbouncer=true` — Prisma needs this to disable prepared-statement caching, which poolers don't support. |
| `DIRECT_URL` | Prisma (migrations) | Supabase **direct** connection (port 5432). Only used by `prisma migrate`/`db push`. |
| `NEXTAUTH_SECRET` | NextAuth | Generate with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | NextAuth | `http://localhost:3000` locally; your production URL on Vercel. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Storage | Project Settings → API. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Storage (browser) | Project Settings → API. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Storage (server, uploads) | Project Settings → API. **Never expose client-side.** |
| `RESEND_API_KEY` | Contact form | resend.com/api-keys. |
| `CONTACT_TO_EMAIL` | Contact form | Where contact submissions get emailed. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seed script only | Creates the first admin login. Not read at runtime. |

## Supabase setup

1. Create a Supabase project → copy the pooled + direct Postgres connection strings into `DATABASE_URL`/`DIRECT_URL`.
2. **Storage** → create a bucket named `team-tg-media` and mark it **Public** (the admin panel
   uploads via the service-role key server-side; public read access is what lets `next/image` and
   plain `<img>` display the photos on the site).
3. Copy the project URL + anon key + service role key into `.env.local`.

## Resend setup

Contact form submissions are always saved to the database regardless of email delivery. To also get
them emailed:

1. Get an API key from resend.com and set `RESEND_API_KEY` + `CONTACT_TO_EMAIL`.
2. The default `from` address (`onboarding@resend.dev`) works out of the box but can only deliver to
   the email your Resend account is registered with. **Verify your own domain in Resend** and update
   the `from` address in `src/app/actions/contact.ts` before relying on this for real inbound leads.

## Deploying to Vercel

1. Push to a Git repo, import it into Vercel.
2. Add all the environment variables above in Project Settings → Environment Variables.
3. `npm run build` runs `prisma generate` automatically via the `postinstall` script — no extra build
   config needed.
4. Run `npx prisma db push` (or `migrate deploy` if you generate migrations) against your Supabase
   database once before your first deploy so the tables exist.

## Known non-blocking notes

- Next 16 deprecated the `middleware.ts` convention in favor of `proxy.ts`; `src/middleware.ts` still
  works (verified end-to-end: login, session, and route protection all function correctly) but shows
  a build-time deprecation warning. Worth migrating next time NextAuth's docs cover the new convention.
- `/about` and `/contact` use a generated placeholder graphic (`public/about-placeholder.svg`) instead
  of a real photo — drop a real image at that path (or wire a new admin-editable field) whenever you
  have one.
