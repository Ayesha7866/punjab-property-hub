import { propertyCategories } from "@/config/brand";
import { getDistrictBySlug, getPlaceBySlug } from "@/data/punjab-locations";

export type SearchFilters = {
  purpose: string;
  q: string;
  city: string;
  district: string;
  area: string;
  type: string;
  budget: string;
  minPrice: string;
  maxPrice: string;
  minBeds: string;
  minSize: string;
  sizeUnit: string;
  sort: string;
};

const categoryValues = new Set(propertyCategories.map((item) => item.value));

export function firstParam(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function parseSearchFilters(
  params: Record<string, string | string[] | undefined>,
): SearchFilters {
  const purposeRaw = firstParam(params.purpose);
  const purpose =
    purposeRaw === "rent" || purposeRaw === "sale" || purposeRaw === "commercial"
      ? purposeRaw
      : "sale";
  const typeRaw = firstParam(params.type);
  const type = categoryValues.has(typeRaw as (typeof propertyCategories)[number]["value"])
    ? typeRaw
    : "";

  return {
    purpose,
    q: firstParam(params.q).trim().slice(0, 120),
    city: firstParam(params.city).trim().slice(0, 80),
    district: firstParam(params.district).trim().slice(0, 80),
    area: firstParam(params.area).trim().slice(0, 80),
    type,
    budget: firstParam(params.budget),
    minPrice: firstParam(params.minPrice),
    maxPrice: firstParam(params.maxPrice),
    minBeds: firstParam(params.minBeds),
    minSize: firstParam(params.minSize),
    sizeUnit: firstParam(params.sizeUnit),
    sort: firstParam(params.sort) || "newest",
  };
}

export function filtersToQuery(filters: Partial<SearchFilters>): string {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  const text = query.toString();
  return text ? `?${text}` : "";
}

export function describeFilters(filters: SearchFilters): string {
  const parts: string[] = [];
  if (filters.purpose === "rent") parts.push("for rent");
  else if (filters.purpose === "commercial") parts.push("commercial");
  else parts.push("for sale");
  const place = filters.city ? getPlaceBySlug(filters.city) : undefined;
  const district = filters.district ? getDistrictBySlug(filters.district) : undefined;
  if (place) parts.push(`in ${place.name}`);
  else if (district) parts.push(`in ${district.name} district`);
  else if (filters.city) parts.push(`in ${titleCase(filters.city)}`);
  else if (filters.district) parts.push(`in ${titleCase(filters.district)} district`);
  if (filters.type) {
    const match = propertyCategories.find((item) => item.value === filters.type);
    if (match) parts.push(match.label.toLowerCase());
  }
  if (filters.q) parts.push(`matching “${filters.q}”`);
  return parts.join(" ");
}

function titleCase(value: string) {
  return value
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
