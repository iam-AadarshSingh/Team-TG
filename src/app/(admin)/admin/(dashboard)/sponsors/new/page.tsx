import { createSponsor } from "@/app/actions/sponsors";
import { SponsorForm } from "@/components/admin/sponsor-form";

export default function NewSponsorPage() {
  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">New Sponsor</h1>
      <div className="mt-8">
        <SponsorForm action={createSponsor} />
      </div>
    </div>
  );
}
