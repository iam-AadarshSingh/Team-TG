import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSponsor } from "@/app/actions/sponsors";
import { DeleteButton } from "@/components/admin/delete-button";
import { buttonClass } from "@/components/admin/ui";

export default async function AdminSponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-wide">Sponsors</h1>
        <Link href="/admin/sponsors/new" className={buttonClass}>
          + New Sponsor
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface/60 text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {sponsors.map((sponsor) => (
              <tr key={sponsor.id} className="border-t border-border">
                <td className="px-4 py-3">{sponsor.name}</td>
                <td className="px-4 py-3 text-accent">{sponsor.tier}</td>
                <td className="px-4 py-3">{sponsor.order}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/sponsors/${sponsor.id}`} className="text-accent hover:opacity-80">
                      Edit
                    </Link>
                    <DeleteButton action={deleteSponsor.bind(null, sponsor.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {sponsors.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted">
                  No sponsors yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
