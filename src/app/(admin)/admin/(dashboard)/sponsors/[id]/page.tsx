import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSponsor } from "@/app/actions/sponsors";
import { SponsorForm } from "@/components/admin/sponsor-form";

export default async function EditSponsorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sponsor = await prisma.sponsor.findUnique({ where: { id } });
  if (!sponsor) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">Edit Sponsor</h1>
      <div className="mt-8">
        <SponsorForm action={updateSponsor.bind(null, id)} sponsor={sponsor} />
      </div>
    </div>
  );
}
