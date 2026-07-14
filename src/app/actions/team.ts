"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteImage, uploadImage } from "@/lib/supabase";

const schema = z.object({
  inGameName: z.string().trim().min(1, "Required"),
  realName: z.string().trim().min(1, "Required"),
  role: z.string().trim().min(1, "Required"),
  order: z.coerce.number().int().default(0),
  active: z.coerce.boolean().default(true),
});

function parseForm(formData: FormData) {
  return schema.parse({
    inGameName: formData.get("inGameName"),
    realName: formData.get("realName"),
    role: formData.get("role"),
    order: formData.get("order") || 0,
    active: formData.get("active") === "on",
  });
}

function revalidateTeamPaths() {
  revalidatePath("/about");
  revalidatePath("/admin/team");
}

export async function createTeamMember(formData: FormData) {
  const data = parseForm(formData);
  const photo = formData.get("photo") as File | null;
  const photoUrl = photo && photo.size > 0 ? await uploadImage(photo, "team") : null;

  await prisma.teamMember.create({ data: { ...data, photoUrl } });
  revalidateTeamPaths();
  redirect("/admin/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const data = parseForm(formData);
  const photo = formData.get("photo") as File | null;

  let photoUrl: string | undefined;
  if (photo && photo.size > 0) {
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (existing?.photoUrl) await deleteImage(existing.photoUrl);
    photoUrl = await uploadImage(photo, "team");
  }

  await prisma.teamMember.update({ where: { id }, data: { ...data, ...(photoUrl ? { photoUrl } : {}) } });
  revalidateTeamPaths();
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (existing?.photoUrl) await deleteImage(existing.photoUrl);
  await prisma.teamMember.delete({ where: { id } });
  revalidateTeamPaths();
}
