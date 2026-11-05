import {
  getDistrictBySlug,
  getPlaceBySlug,
  punjabPlaces,
  type PunjabPlace,
} from "@/data/punjab-locations";

export function resolveLocationLabel(filters: {
  city?: string;
  district?: string;
}): string | null {
  if (filters.city) {
    const place = getPlaceBySlug(filters.city);
    if (place) return `${place.name}, ${place.district}`;
  }
  if (filters.district) {
    const district = getDistrictBySlug(filters.district);
    if (district) return `${district.name} district`;
  }
  return null;
}

export function isKnownCitySlug(slug: string): boolean {
  return Boolean(getPlaceBySlug(slug));
}

export function searchPlaces(query: string): PunjabPlace[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return punjabPlaces;
  return punjabPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(needle) ||
      place.district.toLowerCase().includes(needle) ||
      place.slug.includes(needle.replace(/\s+/g, "-")),
  );
}
