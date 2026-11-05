"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/auth-schema";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { safeNextPath } from "@/lib/safe-path";
import { clientIp, createSession, setSessionCookie } from "@/lib/session";

export type FormState = {
  status: "idle" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const limited = rateLimit(`login:${await clientIp()}`, 12, 15 * 60 * 1000);
  if (!limited.ok) {
    return { status: "error", message: "Too many sign-in attempts. Try later." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  if (!user || user.status !== "ACTIVE") {
    return { status: "error", message: "Email or password is incorrect." };
  }
  const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!ok) {
    return { status: "error", message: "Email or password is incorrect." };
  }

  const token = await createSession(user.id);
  await setSessionCookie(token);
  const fallback = user.role === "ADMIN" ? "/admin" : "/dashboard";
  redirect(safeNextPath(formData.get("next"), fallback));
}
