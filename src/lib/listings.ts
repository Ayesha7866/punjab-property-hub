import type { ListingStatus, Prisma } from "@prisma/client";
import { connection } from "next/server";
import { prisma } from "@/lib/db";
import type { SearchFilters } from "@/lib/search";

const publicInclude = {
  location: true,
  images: { orderBy: { sortOrder: "asc" as const } },
  owner: { select: { id: true, name: true, role: true } },
} satisfies Prisma.PropertyInclude;

export type PublicProperty = Prisma.PropertyGetPayload<{ include: typeof publicInclude }>;

function budgetRange(band: string): { min?: number; max?: number } {
  if (!band) return {};
  const [min, max] = band.split("-");
  return {
    min: min ? Number(min) : undefined,
    max: max ? Number(max) : undefined,
  };
}

export function publicWhere(filters?: SearchFilters): Prisma.PropertyWhereInput {
  const where: Prisma.PropertyWhereInput = { status: "APPROVED" };
  if (!filters) return where;
  if (filters.purpose === "rent") where.purpose = "RENT";
  else if (filters.purpose === "commercial") where.purpose = "COMMERCIAL";
  else if (filters.purpose === "sale") where.purpose = "SALE";
  if (filters.type) where.category = filters.type;
  if (filters.city) where.location = { slug: filters.city, active: true };
  else if (filters.district) {
    where.location = { districtSlug: filters.district, active: true };
  }
  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q } },
      { description: { contains: filters.q } },
      { societyName: { contains: filters.q } },
      { areaName: { contains: filters.q } },
    ];
  }
  const range = budgetRange(filters.budget);
  if (range.min || range.max) {
    where.pricePkr = {
      gte: range.min || undefined,
      lte: range.max || undefined,
    };
  }
  if (filters.minBeds) {
    where.bedrooms = { gte: Number(filters.minBeds) };
  }
  return where;
}

export async function searchPublished(filters: SearchFilters): Promise<PublicProperty[]> {
  await connection();
  const orderBy: Prisma.PropertyOrderByWithRelationInput =
    filters.sort === "price-asc"
      ? { pricePkr: "asc" }
      : filters.sort === "price-desc"
        ? { pricePkr: "desc" }
        : { publishedAt: "desc" };
  return prisma.property.findMany({
    where: publicWhere(filters),
    include: publicInclude,
    orderBy,
    take: 24,
  });
}

export async function getPublishedListings(): Promise<PublicProperty[]> {
  await connection();
  return prisma.property.findMany({
    where: { status: "APPROVED" },
    include: publicInclude,
    orderBy: { publishedAt: "desc" },
    take: 8,
  });
}

export async function getFeaturedListings(): Promise<PublicProperty[]> {
  await connection();
  return prisma.property.findMany({
    where: { status: "APPROVED", featuredUntil: { gt: new Date() } },
    include: publicInclude,
    orderBy: { publishedAt: "desc" },
    take: 6,
  });
}

export async function getRecentListings(): Promise<PublicProperty[]> {
  return getPublishedListings();
}

export async function getPublishedBySlug(slug: string): Promise<PublicProperty | null> {
  await connection();
  return prisma.property.findFirst({
    where: { slug, status: "APPROVED" },
    include: publicInclude,
  });
}

export async function getOwnerProperty(id: string, ownerId: string) {
  return prisma.property.findFirst({
    where: { id, ownerId },
    include: publicInclude,
  });
}

export async function countByStatus(ownerId: string) {
  const groups = await prisma.property.groupBy({
    by: ["status"],
    where: { ownerId },
    _count: true,
  });
  const counts = Object.fromEntries(groups.map((row) => [row.status, row._count])) as Record<
    ListingStatus,
    number
  >;
  return counts;
}
