import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateGame } from "@/app/actions/games";
import { GameForm } from "@/components/admin/game-form";

export default async function EditGamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = await prisma.game.findUnique({ where: { id } });
  if (!game) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl uppercase tracking-wide">Edit Game</h1>
      <div className="mt-8">
        <GameForm action={updateGame.bind(null, id)} game={game} />
      </div>
    </div>
  );
}
