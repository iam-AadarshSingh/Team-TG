"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email"),
  subject: z.string().trim().min(3, "Subject is too short").max(150),
  message: z.string().trim().min(10, "Message is too short").max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContact(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const { name, email, subject, message } = parsed.data;

  await prisma.contactSubmission.create({ data: { name, email, subject, message } });

  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (toEmail && process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: "Team TG Contact <onboarding@resend.dev>",
        to: toEmail,
        replyTo: email,
        subject: `[Contact] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
    } catch {
      // The submission is already saved — email delivery failing shouldn't fail the form.
    }
  }

  return { status: "success", message: "Message sent — we'll get back to you soon." };
}
