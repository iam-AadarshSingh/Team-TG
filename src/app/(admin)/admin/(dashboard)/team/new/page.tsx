import { createTeamMember } from "@/app/actions/team";
import { TeamForm } from "@/components/admin/team-form";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">New Team Member</h1>
      <div className="mt-8">
        <TeamForm action={createTeamMember} />
      </div>
    </div>
  );
}
