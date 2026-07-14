import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [creatorCount, sponsorCount, openRoleCount, recentSubmissions] = await Promise.all([
    prisma.creator.count(),
    prisma.sponsor.count(),
    prisma.careerOpening.count({ where: { isOpen: true } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Total Creators", value: creatorCount, href: "/admin/creators" },
    { label: "Total Sponsors", value: sponsorCount, href: "/admin/sponsors" },
    { label: "Open Roles", value: openRoleCount, href: "/admin/careers" },
    { label: "Recent Messages", value: recentSubmissions.length, href: "/admin/submissions" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-sm border border-border bg-surface/40 p-6 transition-colors hover:border-accent"
          >
            <p className="font-display text-3xl text-accent">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-xl uppercase tracking-wide">Recent Submissions</h2>
        {recentSubmissions.length === 0 ? (
          <p className="mt-4 text-muted">No contact submissions yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {recentSubmissions.map((s) => (
              <div key={s.id} className="rounded-sm border border-border bg-surface/40 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">
                    {s.name} <span className="font-normal text-muted">— {s.email}</span>
                  </p>
                  <p className="text-xs text-muted">{s.createdAt.toLocaleString()}</p>
                </div>
                <p className="mt-1 text-sm text-accent">{s.subject}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
