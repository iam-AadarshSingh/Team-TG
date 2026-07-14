"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteImage, uploadImage } from "@/lib/supabase";

const schema = z.object({
  name: z.string().trim().min(1, "Required"),
  tier: z.string().trim().min(1, "Required"),
  description: z.string().trim().optional(),
  subtitle: z.string().trim().optional(),
  perks: z.array(z.string()),
  link: z.string().trim().optional(),
  order: z.coerce.number().int().default(0),
});

function parseForm(formData: FormData) {
  const perks = String(formData.get("perks") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return schema.parse({
    name: formData.get("name"),
    tier: formData.get("tier"),
    description: formData.get("description") || undefined,
    subtitle: formData.get("subtitle") || undefined,
    perks,
    link: formData.get("link") || undefined,
    order: formData.get("order") || 0,
  });
}

function revalidateSponsorPaths() {
  revalidatePath("/");
  revalidatePath("/sponsors");
  revalidatePath("/admin/sponsors");
}

export async function createSponsor(formData: FormData) {
  const data = parseForm(formData);
  const logo = formData.get("logo") as File | null;
  const logoUrl = logo && logo.size > 0 ? await uploadImage(logo, "sponsors") : null;

  await prisma.sponsor.create({ data: { ...data, logoUrl } });
  revalidateSponsorPaths();
  redirect("/admin/sponsors");
}

export async function updateSponsor(id: string, formData: FormData) {
  const data = parseForm(formData);
  const logo = formData.get("logo") as File | null;

  let logoUrl: string | undefined;
  if (logo && logo.size > 0) {
    const existing = await prisma.sponsor.findUnique({ where: { id } });
    if (existing?.logoUrl) await deleteImage(existing.logoUrl);
    logoUrl = await uploadImage(logo, "sponsors");
  }

  await prisma.sponsor.update({ where: { id }, data: { ...data, ...(logoUrl ? { logoUrl } : {}) } });
  revalidateSponsorPaths();
  redirect("/admin/sponsors");
}

export async function deleteSponsor(id: string) {
  const existing = await prisma.sponsor.findUnique({ where: { id } });
  if (existing?.logoUrl) await deleteImage(existing.logoUrl);
  await prisma.sponsor.delete({ where: { id } });
  revalidateSponsorPaths();
}
