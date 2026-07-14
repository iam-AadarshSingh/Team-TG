import { getActiveGames, getCreators } from "@/lib/queries";
import { CreatorsTabs } from "@/components/creators/creators-tabs";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = { title: "Creators — Team TG" };

export default async function CreatorsPage() {
  const [games, creators] = await Promise.all([getActiveGames(), getCreators()]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <PageHeader eyebrow="// The Squad" title="Our Creators" />

      <div className="mt-12">
        <CreatorsTabs games={games} creators={creators} />
      </div>
    </div>
  );
}
