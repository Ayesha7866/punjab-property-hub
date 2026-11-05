const blocked = new Set(["/login", "/register", "/logout", "/forgot-password"]);

export function safeNextPath(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("://") || path.includes("\\")) {
    return fallback;
  }
  const pathname = path.split("?")[0] ?? path;
  if (blocked.has(pathname)) return fallback;
  return path;
}
