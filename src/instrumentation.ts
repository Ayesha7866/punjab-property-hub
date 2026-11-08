export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { prisma } = await import("@/lib/db");
  const { readdirSync, readFileSync } = await import("node:fs");
  const { join } = await import("node:path");

  let ready = false;
  try {
    await prisma.$queryRawUnsafe("SELECT 1 FROM Property LIMIT 1");
    ready = true;
  } catch {
    ready = false;
  }

  if (!ready) {
    const root = join(process.cwd(), "prisma/migrations");
    try {
      const dirs = readdirSync(root)
        .filter((name) => /^\d/.test(name))
        .sort();
      for (const name of dirs) {
        const sql = readFileSync(join(root, name, "migration.sql"), "utf8");
        for (const stmt of sql.split(";")) {
          const trimmed = stmt.trim();
          if (!trimmed || trimmed.startsWith("--")) continue;
          await prisma.$executeRawUnsafe(trimmed);
        }
      }
    } catch (error) {
      console.error("Applying Prisma SQL migrations failed", error);
    }
  }

  try {
    const existing = await prisma.location.count();
    if (existing === 0) {
      const { punjabPlaces } = await import("@/data/punjab-locations");
      await prisma.location.createMany({
        data: punjabPlaces.map((place) => ({
          slug: place.slug,
          name: place.name,
          district: place.district,
          districtSlug: place.districtSlug,
          active: true,
        })),
      });
    }
  } catch (error) {
    console.error("Seeding Punjab locations failed", error);
  }
}
