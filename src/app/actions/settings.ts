"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  twitterUrl: z.string().trim().optional(),
  instagramUrl: z.string().trim().optional(),
  youtubeUrl: z.string().trim().optional(),
  twitchUrl: z.string().trim().optional(),
  discordInvite: z.string().trim().optional(),
  statCreators: z.string().trim().min(1, "Required"),
  statCommunity: z.string().trim().min(1, "Required"),
  statHoursLive: z.string().trim().min(1, "Required"),
});

export type SettingsState = { message: string };

export async function updateSiteSettings(_prevState: SettingsState, formData: FormData): Promise<SettingsState> {
  const data = schema.parse({
    twitterUrl: formData.get("twitterUrl") || undefined,
    instagramUrl: formData.get("instagramUrl") || undefined,
    youtubeUrl: formData.get("youtubeUrl") || undefined,
    twitchUrl: formData.get("twitchUrl") || undefined,
    discordInvite: formData.get("discordInvite") || undefined,
    statCreators: formData.get("statCreators"),
    statCommunity: formData.get("statCommunity"),
    statHoursLive: formData.get("statHoursLive"),
  });

  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    await prisma.siteSettings.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteSettings.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { message: "Saved." };
}
