import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCareerOpening } from "@/app/actions/careers";
import { CareerForm } from "@/components/admin/career-form";

export default async function EditCareerOpeningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const opening = await prisma.careerOpening.findUnique({ where: { id } });
  if (!opening) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">Edit Opening</h1>
      <div className="mt-8">
        <CareerForm action={updateCareerOpening.bind(null, id)} opening={opening} />
      </div>
    </div>
  );
}
