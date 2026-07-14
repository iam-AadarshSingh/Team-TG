import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteGame } from "@/app/actions/games";
import { DeleteButton } from "@/components/admin/delete-button";
import { buttonClass } from "@/components/admin/ui";

export default async function AdminGamesPage() {
  const games = await prisma.game.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-wide">Games</h1>
        <Link href="/admin/games/new" className={buttonClass}>
          + New Game
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface/60 text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3">Game</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="border-t border-border">
                <td className="px-4 py-3">
                  {game.icon} {game.name}
                </td>
                <td className="px-4 py-3 text-muted">{game.slug}</td>
                <td className="px-4 py-3 text-accent">{game.status}</td>
                <td className="px-4 py-3">{game.order}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/games/${game.id}`} className="text-accent hover:opacity-80">
                      Edit
                    </Link>
                    <DeleteButton
                      action={deleteGame.bind(null, game.id)}
                      confirmMessage="Delete this game? It will be removed from any creators linked to it — their profiles stay intact."
                    />
                  </div>
                </td>
              </tr>
            ))}
            {games.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No games yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
