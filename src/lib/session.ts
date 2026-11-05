import { cookies, headers } from "next/headers";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { randomToken, sha256 } from "@/lib/crypto";

export const SESSION_COOKIE = "pph_session";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
};

export async function createSession(userId: string) {
  const token = randomToken();
  await prisma.session.create({
    data: {
      userId,
      tokenHash: sha256(token),
      expiresAt: new Date(Date.now() + THIRTY_DAYS_MS),
    },
  });
  return token;
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  const h = await headers();
  const proto = (h.get("x-forwarded-proto") || "").split(",")[0]?.trim().toLowerCase();
  const host = h.get("x-forwarded-host") || h.get("host") || "";
  const secure =
    process.env.NODE_ENV === "production" ||
    proto === "https" ||
    host.includes("trycloudflare.com");
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: sha256(token) } });
  }
  store.delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: sha256(token) },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined);
    }
    return null;
  }
  if (session.user.status !== "ACTIVE") return null;
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    phone: session.user.phone,
    role: session.user.role,
  };
}

export async function requireUser() {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Sign in required.");
  }
  return user;
}

export function canListProperties(role: Role) {
  return role === "OWNER" || role === "DEALER" || role === "ADMIN";
}

export async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}
