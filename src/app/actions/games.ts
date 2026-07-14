"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteImage, uploadImage } from "@/lib/supabase";

const schema = z.object({
  name: z.string().trim().min(1, "Required"),
  slug: z
    .string()
    .trim()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only"),
  icon: z.string().trim().min(1, "Required"),
  tagline: z.string().trim().min(1, "Required"),
  status: z.string().trim().min(1, "Required"),
  serverName: z.string().trim().optional(),
  serverIp: z.string().trim().optional(),
  serverPort: z.string().trim().optional(),
  serverIpBedrock: z.string().trim().optional(),
  serverPortBedrock: z.string().trim().optional(),
  order: z.coerce.number().int().default(0),
});

function parseForm(formData: FormData) {
  return schema.parse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    icon: formData.get("icon"),
    tagline: formData.get("tagline"),
    status: formData.get("status"),
    serverName: formData.get("serverName") || undefined,
    serverIp: formData.get("serverIp") || undefined,
    serverPort: formData.get("serverPort") || undefined,
    serverIpBedrock: formData.get("serverIpBedrock") || undefined,
    serverPortBedrock: formData.get("serverPortBedrock") || undefined,
    order: formData.get("order") || 0,
  });
}

function revalidateGamePaths() {
  revalidatePath("/");
  revalidatePath("/games");
  revalidatePath("/creators");
  revalidatePath("/admin/games");
  revalidatePath("/admin/creators");
}

export async function createGame(formData: FormData) {
  const data = parseForm(formData);
  const image = formData.get("image") as File | null;
  const imageUrl = image && image.size > 0 ? await uploadImage(image, "games") : null;

  await prisma.game.create({ data: { ...data, imageUrl } });
  revalidateGamePaths();
  redirect("/admin/games");
}

export async function updateGame(id: string, formData: FormData) {
  const data = parseForm(formData);
  const image = formData.get("image") as File | null;

  let imageUrl: string | undefined;
  if (image && image.size > 0) {
    const existing = await prisma.game.findUnique({ where: { id } });
    if (existing?.imageUrl) await deleteImage(existing.imageUrl);
    imageUrl = await uploadImage(image, "games");
  }

  await prisma.game.update({ where: { id }, data: { ...data, ...(imageUrl ? { imageUrl } : {}) } });
  revalidateGamePaths();
  redirect("/admin/games");
}

export async function deleteGame(id: string) {
  const existing = await prisma.game.findUnique({ where: { id } });
  if (existing?.imageUrl) await deleteImage(existing.imageUrl);
  await prisma.game.delete({ where: { id } });
  revalidateGamePaths();
}
