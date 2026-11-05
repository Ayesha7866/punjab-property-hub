"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { punjabDistricts, punjabPlaces } from "@/data/punjab-locations";
import { fieldControlClass } from "@/components/ui/field";

export function CitiesDirectory() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();

  const groups = useMemo(() => {
    return punjabDistricts
      .map((district) => ({
        district,
        places: punjabPlaces.filter((place) => {
          if (place.districtSlug !== district.slug) return false;
          if (!needle) return true;
          return (
            place.name.toLowerCase().includes(needle) ||
            district.name.toLowerCase().includes(needle)
          );
        }),
      }))
      .filter((group) => group.places.length > 0);
  }, [needle]);

  const matchCount = groups.reduce((sum, group) => sum + group.places.length, 0);

  return (
    <div className="space-y-8">
      <label className="block max-w-md">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Find a city
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Jhang, Toba Tek Singh, Gojra, Murree…"
          className={fieldControlClass}
          autoComplete="off"
        />
      </label>
      <p className="text-sm text-ink-muted">
        Showing {matchCount} {matchCount === 1 ? "place" : "places"}
        {needle ? ` matching “${query.trim()}”` : " across Punjab"}.
      </p>
      {groups.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brand/20 bg-white px-6 py-10 text-center text-sm text-ink-muted">
          No city or district matched that search. Try the district name, or a
          town such as Shorkot or Kamalia.
        </p>
      ) : (
        groups.map((group) => (
          <section key={group.district.slug} id={group.district.slug}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="font-serif text-2xl text-brand">{group.district.name}</h2>
              <Link
                href={`/properties?district=${group.district.slug}`}
                className="text-sm font-medium text-gold-deep hover:text-brand"
              >
                Search district
              </Link>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.places.map((place) => (
                <li key={place.slug}>
                  <Link
                    href={`/properties?city=${place.slug}&district=${place.districtSlug}`}
                    className="block rounded-lg border border-brand/10 bg-white px-4 py-3 text-sm shadow-sm hover:border-gold"
                  >
                    <span className="font-semibold text-brand">{place.name}</span>
                    <span className="mt-1 block text-ink-muted">
                      {place.district} district
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
