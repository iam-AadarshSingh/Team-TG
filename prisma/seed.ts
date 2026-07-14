import { config } from "dotenv";
config({ path: ".env" });
config({ path: ".env.local", override: true });

import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const valorant = await prisma.game.upsert({
    where: { slug: "valorant" },
    update: {},
    create: {
      name: "Valorant",
      slug: "valorant",
      icon: "🎯",
      tagline: "Tactical 5v5 FPS. Precision, strategy, and dominance.",
      status: "Active",
      order: 0,
    },
  });

  const bgmi = await prisma.game.upsert({
    where: { slug: "bgmi" },
    update: {},
    create: {
      name: "BGMI",
      slug: "bgmi",
      icon: "🔫",
      tagline: "Battlegrounds Mobile India. The ultimate mobile battle royale.",
      status: "Active",
      order: 1,
    },
  });

  const minecraftServerData = {
    serverName: "DemonCore MC",
    serverIp: "play.demoncoremc.fun",
    serverPort: "25577",
    serverIpBedrock: "play.demoncoremc.fun",
    serverPortBedrock: "19176",
  };
  const minecraft = await prisma.game.upsert({
    where: { slug: "minecraft" },
    update: minecraftServerData,
    create: {
      name: "Minecraft",
      slug: "minecraft",
      icon: "⛏️",
      tagline: "Official TG server, creative battles, and survival excellence.",
      status: "Active",
      order: 2,
      ...minecraftServerData,
    },
  });

  const mobileLegends = await prisma.game.upsert({
    where: { slug: "mobile-legends" },
    update: {},
    create: {
      name: "Mobile Legends",
      slug: "mobile-legends",
      icon: "⚔️",
      tagline: "5v5 MOBA mastery. Outplay, outsmart, outlast.",
      status: "Active",
      order: 3,
    },
  });

  const freeFire = await prisma.game.upsert({
    where: { slug: "free-fire" },
    update: {},
    create: {
      name: "Free Fire",
      slug: "free-fire",
      icon: "🔥",
      tagline: "Fast-paced battle royale. Survive, squad up, win.",
      status: "Active",
      order: 4,
    },
  });

  const creators = [
    {
      inGameName: "Martian Is Live",
      realName: "Aadarsh Singh",
      bio: "The alien who landed to dominate. Elite content creator across BGMI, Valorant & Minecraft.",
      gameIds: [bgmi.id, valorant.id, minecraft.id],
      youtube: "https://youtube.com/@martianislive0666",
      instagram: "https://www.instagram.com/martianislive/",
      twitch: "https://www.twitch.tv/martianislive",
      discord: "https://discord.gg/ZKr66hgzwY",
      order: 0,
    },
    {
      inGameName: "Meui Is Live",
      realName: "Sarthak Kumar Sahoo",
      bio: "BGMI specialist with raw gameplay and unmatched energy. Pure skill, peak entertainment.",
      gameIds: [bgmi.id],
      youtube: "https://www.youtube.com/@meui_official",
      instagram: "https://www.instagram.com/meui_official_/",
      twitch: "https://www.twitch.tv/meui_official",
      discord: "https://discord.gg/ZKr66hgzwY",
      order: 1,
    },
    {
      inGameName: "TS Danger",
      realName: "Heet Joshi",
      bio: "Valorant precision at its finest. Elite tactical gameplay and highlights every video.",
      gameIds: [valorant.id],
      youtube: "https://www.youtube.com/@YTDANGEROP",
      instagram: "https://www.instagram.com/tsdanger._/",
      twitch: "https://www.twitch.tv/tsdanger",
      discord: "https://discord.gg/ZKr66hgzwY",
      order: 0,
    },
    {
      inGameName: "Modak Gaming",
      realName: "Kalpesh Mhatre",
      bio: "Minecraft mastery and creative storytelling. Every Modak video is a new adventure.",
      gameIds: [minecraft.id],
      youtube: "https://www.youtube.com/@modakgaming6300",
      twitch: "https://www.twitch.tv/modakgaming",
      discord: "https://discord.gg/ZKr66hgzwY",
      order: 0,
    },
  ];

  for (const { gameIds, ...c } of creators) {
    const existing = await prisma.creator.findFirst({ where: { inGameName: c.inGameName } });
    const games = { set: gameIds.map((id) => ({ id })) };
    if (existing) {
      await prisma.creator.update({ where: { id: existing.id }, data: { games } });
    } else {
      await prisma.creator.create({ data: { ...c, games: { connect: gameIds.map((id) => ({ id })) } } });
    }
  }

  const sponsors = [
    {
      name: "TakeUforward",
      tier: "Gaming Partner",
      description: "Empowering Team TG to compete and create at the highest level.",
      subtitle: "// Leveling Up Indian Gaming",
      perks: [
        "Featured partner across all official Team TG content",
        "Co-branded campaigns and social media integrations",
        "Priority partner for all major Team TG events",
      ],
      link: "https://takeuforward.org",
      order: 0,
    },
    {
      name: "Drago Host",
      tier: "Hosting Provider",
      description: "Powering Team TG's online presence with fast, reliable hosting.",
      subtitle: "// Powering Our Digital World",
      perks: [
        "Hosts Team TG's official Minecraft server",
        "Web hosting and domain support",
        "99.9% uptime guarantee for all TG services",
      ],
      link: "https://dragohost.com",
      order: 1,
    },
    {
      name: "Morado Solution",
      tier: "Hosting Provider",
      description: "The infrastructure backbone of Team TG's digital ecosystem.",
      subtitle: "// Infrastructure Behind The Scenes",
      perks: [
        "Backend infrastructure for Team TG platforms",
        "Technical support and server management",
        "Scalable solutions for TG's growing community",
      ],
      link: "https://morado.solutions",
      order: 2,
    },
  ];

  for (const s of sponsors) {
    const existing = await prisma.sponsor.findFirst({ where: { name: s.name } });
    if (existing) {
      await prisma.sponsor.update({ where: { id: existing.id }, data: s });
    } else {
      await prisma.sponsor.create({ data: s });
    }
  }

  const teamMembers = [
    { inGameName: "Founder", realName: "Edit me in /admin", role: "Founder & CEO", order: 0 },
    { inGameName: "Co-Founder", realName: "Edit me in /admin", role: "Community Manager", order: 1 },
  ];

  for (const t of teamMembers) {
    const existing = await prisma.teamMember.findFirst({ where: { inGameName: t.inGameName } });
    if (!existing) await prisma.teamMember.create({ data: t });
  }

  const openings = [
    { title: "Content Creator — BGMI", description: "Create highlight reels and livestream BGMI under the Team TG banner.", department: "Content", isOpen: true, order: 0 },
    { title: "Community Manager", description: "Run our Discord, moderate events, and keep the community engaged.", department: "Operations", isOpen: true, order: 1 },
  ];

  for (const o of openings) {
    const existing = await prisma.careerOpening.findFirst({ where: { title: o.title } });
    if (!existing) await prisma.careerOpening.create({ data: o });
  }

  const settingsExisting = await prisma.siteSettings.findFirst();
  if (!settingsExisting) {
    await prisma.siteSettings.create({
      data: {
        twitterUrl: "https://x.com/teamtg",
        instagramUrl: "https://instagram.com/teamtg",
        youtubeUrl: "https://youtube.com/@teamtg",
        twitchUrl: "https://twitch.tv/teamtg",
        discordInvite: "https://discord.gg/ZKr66hgzwY",
        statGames: "3",
        statCreators: "50+",
        statCommunity: "5000+",
        statHoursLive: "1000+",
        statSponsors: "10+",
      },
    });
  } else if (!settingsExisting.twitchUrl) {
    // Backfill the newly-added field only — never overwrite existing,
    // possibly admin-edited settings.
    await prisma.siteSettings.update({
      where: { id: settingsExisting.id },
      data: { twitchUrl: "https://twitch.tv/teamtg" },
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@teamtg.gg";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, name: "Admin" },
  });

  console.log("Seed complete. Admin login:", adminEmail, "/", adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
