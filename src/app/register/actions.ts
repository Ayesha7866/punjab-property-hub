"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { registerSchema } from "@/lib/auth-schema";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp, createSession, setSessionCookie } from "@/lib/session";

export type FormState = {
  status: "idle" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

const roleMap = {
  buyer: "BUYER",
  owner: "OWNER",
  dealer: "DEALER",
} as const;

export async function registerAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const limited = rateLimit(`register:${await clientIp()}`, 8, 60 * 60 * 1000);
  if (!limited.ok) {
    return { status: "error", message: "Too many registration attempts. Try later." };
  }

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { status: "error", message: "An account with this email already exists." };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      phone: parsed.data.phone,
      passwordHash: await bcrypt.hash(parsed.data.password, 12),
      role: roleMap[parsed.data.role],
    },
  });

  const token = await createSession(user.id);
  await setSessionCookie(token);
  redirect(user.role === "BUYER" ? "/dashboard" : "/list-property");
}
