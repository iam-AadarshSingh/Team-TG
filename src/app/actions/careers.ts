"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
  department: z.string().trim().min(1, "Required"),
  applyLink: z.string().trim().optional(),
  order: z.coerce.number().int().default(0),
  isOpen: z.coerce.boolean().default(true),
});

function parseForm(formData: FormData) {
  return schema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    department: formData.get("department"),
    applyLink: formData.get("applyLink") || undefined,
    order: formData.get("order") || 0,
    isOpen: formData.get("isOpen") === "on",
  });
}

function revalidateCareerPaths() {
  revalidatePath("/career");
  revalidatePath("/admin/careers");
}

export async function createCareerOpening(formData: FormData) {
  const data = parseForm(formData);
  await prisma.careerOpening.create({ data });
  revalidateCareerPaths();
  redirect("/admin/careers");
}

export async function updateCareerOpening(id: string, formData: FormData) {
  const data = parseForm(formData);
  await prisma.careerOpening.update({ where: { id }, data });
  revalidateCareerPaths();
  redirect("/admin/careers");
}

export async function deleteCareerOpening(id: string) {
  await prisma.careerOpening.delete({ where: { id } });
  revalidateCareerPaths();
}
