import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCareerOpening } from "@/app/actions/careers";
import { DeleteButton } from "@/components/admin/delete-button";
import { buttonClass } from "@/components/admin/ui";

export default async function AdminCareersPage() {
  const openings = await prisma.careerOpening.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-wide">Career Openings</h1>
        <Link href="/admin/careers/new" className={buttonClass}>
          + New Opening
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface/60 text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {openings.map((opening) => (
              <tr key={opening.id} className="border-t border-border">
                <td className="px-4 py-3">{opening.title}</td>
                <td className="px-4 py-3 text-muted">{opening.department}</td>
                <td className="px-4 py-3">{opening.order}</td>
                <td className="px-4 py-3">
                  <span className={opening.isOpen ? "text-accent" : "text-muted"}>
                    {opening.isOpen ? "Open" : "Closed"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/careers/${opening.id}`} className="text-accent hover:opacity-80">
                      Edit
                    </Link>
                    <DeleteButton action={deleteCareerOpening.bind(null, opening.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {openings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No openings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
