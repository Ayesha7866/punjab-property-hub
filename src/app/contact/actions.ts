"use server";

import { contactSchema } from "@/lib/auth-schema";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/session";

export type FormState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function contactAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const limited = rateLimit(`contact:${await clientIp()}`, 8, 60 * 60 * 1000);
  if (!limited.ok) {
    return { status: "error", message: "Too many messages. Try later." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      message: parsed.data.message,
    },
  });

  return {
    status: "success",
    message: "Message received. An administrator can read it in the admin inbox.",
  };
}
