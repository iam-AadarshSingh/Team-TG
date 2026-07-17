import { getActiveGames, getCreators, getSiteSettings, getSponsors } from "@/lib/queries";
import { Hero } from "@/components/home/hero";
import { OurGames } from "@/components/home/our-games";
import { TheSquad } from "@/components/home/the-squad";
import { AboutPreview } from "@/components/home/about-preview";
import { OurPartners } from "@/components/home/our-partners";

export default async function Home() {
  const [settings, games, creators, sponsors] = await Promise.all([
    getSiteSettings(),
    getActiveGames(),
    getCreators(),
    getSponsors(),
  ]);

  const stats = [
    { label: "Games", value: String(games.length) },
    { label: "Creators", value: settings.statCreators },
    { label: "Community", value: settings.statCommunity },
    { label: "Hours Live", value: settings.statHoursLive },
    { label: "Trusted By", value: String(sponsors.length) },
  ];

  return (
    <>
      <Hero stats={stats} />
      <AboutPreview />
      <OurGames games={games} />
      <TheSquad creators={creators} />
      <OurPartners sponsors={sponsors} />
    </>
  );
}
