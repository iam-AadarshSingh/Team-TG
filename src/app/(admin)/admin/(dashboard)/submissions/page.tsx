import { prisma } from "@/lib/prisma";
import { deleteContactSubmission } from "@/app/actions/contact";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">Contact Submissions</h1>

      <div className="mt-8 space-y-4">
        {submissions.length === 0 ? (
          <p className="text-muted">No submissions yet.</p>
        ) : (
          submissions.map((s) => (
            <div key={s.id} className="rounded-sm border border-border bg-surface/40 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">
                  {s.name}{" "}
                  <span className="font-normal text-muted">
                    — {s.email}
                    {s.phone ? ` · ${s.phone}` : ""}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-muted">{s.createdAt.toLocaleString()}</p>
                  <DeleteButton
                    action={deleteContactSubmission.bind(null, s.id)}
                    confirmMessage="Delete this submission? This cannot be undone."
                  />
                </div>
              </div>
              <p className="mt-1 text-sm text-accent">{s.subject}</p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/80">{s.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
