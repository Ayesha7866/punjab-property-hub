export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  try {
    const { execSync } = await import("node:child_process");
    execSync("prisma migrate deploy", {
      stdio: "inherit",
      env: process.env,
    });
  } catch (error) {
    console.error("prisma migrate deploy failed", error);
  }
}
