import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCreator } from "@/app/actions/creators";
import { DeleteButton } from "@/components/admin/delete-button";
import { buttonClass } from "@/components/admin/ui";

export default async function AdminCreatorsPage() {
  const creators = await prisma.creator.findMany({
    orderBy: { order: "asc" },
    include: { games: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl uppercase tracking-wide">Creators</h1>
        <Link href="/admin/creators/new" className={buttonClass}>
          + New Creator
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface/60 text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="px-4 py-3">In-Game Name</th>
              <th className="px-4 py-3">Real Name</th>
              <th className="px-4 py-3">Games</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {creators.map((creator) => (
              <tr key={creator.id} className="border-t border-border">
                <td className="px-4 py-3">{creator.inGameName}</td>
                <td className="px-4 py-3 text-muted">{creator.realName}</td>
                <td className="px-4 py-3">{creator.games.map((g) => g.name).join(", ") || "—"}</td>
                <td className="px-4 py-3">{creator.order}</td>
                <td className="px-4 py-3">
                  <span className={creator.active ? "text-accent" : "text-muted"}>
                    {creator.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/creators/${creator.id}`} className="text-accent hover:opacity-80">
                      Edit
                    </Link>
                    <DeleteButton action={deleteCreator.bind(null, creator.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {creators.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No creators yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
