import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTeamMember } from "@/app/actions/team";
import { DeleteButton } from "@/components/admin/delete-button";
import { buttonClass } from "@/components/admin/ui";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-wide">Team Members</h1>
        <Link href="/admin/team/new" className={buttonClass}>
          + New Member
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface/60 text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3">In-Game Name</th>
              <th className="px-4 py-3">Real Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t border-border">
                <td className="px-4 py-3">{member.inGameName}</td>
                <td className="px-4 py-3 text-muted">{member.realName}</td>
                <td className="px-4 py-3">{member.role}</td>
                <td className="px-4 py-3">{member.order}</td>
                <td className="px-4 py-3">
                  <span className={member.active ? "text-accent" : "text-muted"}>
                    {member.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/team/${member.id}`} className="text-accent hover:opacity-80">
                      Edit
                    </Link>
                    <DeleteButton action={deleteTeamMember.bind(null, member.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No team members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
