import { prisma } from "@/lib/prisma";
import { createCreator } from "@/app/actions/creators";
import { CreatorForm } from "@/components/admin/creator-form";

export default async function NewCreatorPage() {
  const games = await prisma.game.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">New Creator</h1>
      <div className="mt-8">
        <CreatorForm action={createCreator} games={games} />
      </div>
    </div>
  );
}
