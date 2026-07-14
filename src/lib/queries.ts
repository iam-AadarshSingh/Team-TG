import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findFirst();
  return (
    settings ?? {
      twitterUrl: null,
      instagramUrl: null,
      youtubeUrl: null,
      twitchUrl: null,
      discordInvite: null,
      statGames: "0",
      statCreators: "0",
      statCommunity: "0",
      statHoursLive: "0",
      statSponsors: "0",
    }
  );
}

export function getGames() {
  return prisma.game.findMany({ orderBy: { order: "asc" } });
}

export function getActiveGames() {
  return prisma.game.findMany({ where: { status: "Active" }, orderBy: { order: "asc" } });
}

export function getGameBySlug(slug: string) {
  return prisma.game.findUnique({ where: { slug } });
}

export function getCreators() {
  return prisma.creator.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    include: { games: true },
  });
}

export function getTeamMembers() {
  return prisma.teamMember.findMany({ where: { active: true }, orderBy: { order: "asc" } });
}

export function getSponsors() {
  return prisma.sponsor.findMany({ orderBy: { order: "asc" } });
}

export function getOpenCareers() {
  return prisma.careerOpening.findMany({ where: { isOpen: true }, orderBy: { order: "asc" } });
}
