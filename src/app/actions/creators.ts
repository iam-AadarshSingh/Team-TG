"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteImage, uploadImage } from "@/lib/supabase";

const schema = z.object({
  inGameName: z.string().trim().min(1, "Required"),
  realName: z.string().trim().min(1, "Required"),
  bio: z.string().trim().optional(),
  gameIds: z.array(z.string().trim().min(1)).min(1, "Select at least one game"),
  order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
  youtube: z.string().trim().optional(),
  instagram: z.string().trim().optional(),
  twitch: z.string().trim().optional(),
  discord: z.string().trim().optional(),
  x: z.string().trim().optional(),
});

function parseForm(formData: FormData) {
  return schema.parse({
    inGameName: formData.get("inGameName"),
    realName: formData.get("realName"),
    bio: formData.get("bio") || undefined,
    gameIds: formData.getAll("gameIds"),
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
    youtube: formData.get("youtube") || undefined,
    instagram: formData.get("instagram") || undefined,
    twitch: formData.get("twitch") || undefined,
    discord: formData.get("discord") || undefined,
    x: formData.get("x") || undefined,
  });
}

function revalidateCreatorPaths() {
  revalidatePath("/");
  revalidatePath("/games");
  revalidatePath("/creators");
  revalidatePath("/admin/creators");
}

export async function createCreator(formData: FormData) {
  const { gameIds, ...data } = parseForm(formData);
  const photo = formData.get("photo") as File | null;
  const photoUrl = photo && photo.size > 0 ? await uploadImage(photo, "creators") : null;

  await prisma.creator.create({
    data: { ...data, photoUrl, games: { connect: gameIds.map((id) => ({ id })) } },
  });
  revalidateCreatorPaths();
  redirect("/admin/creators");
}

export async function updateCreator(id: string, formData: FormData) {
  const { gameIds, ...data } = parseForm(formData);
  const photo = formData.get("photo") as File | null;

  let photoUrl: string | undefined;
  if (photo && photo.size > 0) {
    const existing = await prisma.creator.findUnique({ where: { id } });
    if (existing?.photoUrl) await deleteImage(existing.photoUrl);
    photoUrl = await uploadImage(photo, "creators");
  }

  await prisma.creator.update({
    where: { id },
    data: {
      ...data,
      ...(photoUrl ? { photoUrl } : {}),
      games: { set: gameIds.map((gid) => ({ id: gid })) },
    },
  });
  revalidateCreatorPaths();
  redirect("/admin/creators");
}

export async function deleteCreator(id: string) {
  const existing = await prisma.creator.findUnique({ where: { id } });
  if (existing?.photoUrl) await deleteImage(existing.photoUrl);
  await prisma.creator.delete({ where: { id } });
  revalidateCreatorPaths();
}
