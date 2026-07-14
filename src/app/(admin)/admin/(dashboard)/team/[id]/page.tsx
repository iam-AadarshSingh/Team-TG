import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTeamMember } from "@/app/actions/team";
import { TeamForm } from "@/components/admin/team-form";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">Edit Team Member</h1>
      <div className="mt-8">
        <TeamForm action={updateTeamMember.bind(null, id)} member={member} />
      </div>
    </div>
  );
}
