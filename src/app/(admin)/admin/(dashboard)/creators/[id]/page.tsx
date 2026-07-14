import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCreator } from "@/app/actions/creators";
import { CreatorForm } from "@/components/admin/creator-form";

export default async function EditCreatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [creator, games] = await Promise.all([
    prisma.creator.findUnique({ where: { id }, include: { games: true } }),
    prisma.game.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!creator) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">Edit Creator</h1>
      <div className="mt-8">
        <CreatorForm action={updateCreator.bind(null, id)} games={games} creator={creator} />
      </div>
    </div>
  );
}
