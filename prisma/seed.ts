import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { punjabPlaces } from "../src/data/punjab-locations";

const prisma = new PrismaClient();

async function main() {
  for (const place of punjabPlaces) {
    await prisma.location.upsert({
      where: { slug: place.slug },
      update: {
        name: place.name,
        district: place.district,
        districtSlug: place.districtSlug,
        active: true,
      },
      create: {
        slug: place.slug,
        name: place.name,
        district: place.district,
        districtSlug: place.districtSlug,
      },
    });
  }

  const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
  const name = process.env.ADMIN_BOOTSTRAP_NAME || "Site Administrator";
  if (email && password && password.length >= 10) {
    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.upsert({
      where: { email },
      update: { name, passwordHash, role: "ADMIN", status: "ACTIVE" },
      create: {
        name,
        email,
        phone: "03000000000",
        passwordHash,
        role: "ADMIN",
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
