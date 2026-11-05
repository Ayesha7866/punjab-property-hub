"use client";

import { useMemo, useState } from "react";
import { Field, fieldControlClass } from "@/components/ui/field";
import { punjabPlaces } from "@/data/punjab-locations";

export function PunjabCitySelect({
  name,
  label,
  defaultValue = "",
  allowEmpty = false,
  emptyLabel = "All Punjab cities",
}: {
  name: string;
  label: string;
  defaultValue?: string;
  allowEmpty?: boolean;
  emptyLabel?: string;
}) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const matches = useMemo(() => {
    const filtered = !needle
      ? punjabPlaces
      : punjabPlaces.filter(
          (place) =>
            place.name.toLowerCase().includes(needle) ||
            place.district.toLowerCase().includes(needle),
        );
    if (defaultValue && !filtered.some((place) => place.slug === defaultValue)) {
      const selected = punjabPlaces.find((place) => place.slug === defaultValue);
      if (selected) return [selected, ...filtered];
    }
    return filtered;
  }, [needle, defaultValue]);

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Find city
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type Jhang, Toba, Okara, Murree…"
          className={fieldControlClass}
          autoComplete="off"
        />
      </label>
      <Field label={label} name={name}>
        <select
          id={name}
          name={name}
          required={!allowEmpty}
          defaultValue={defaultValue}
          className={fieldControlClass}
        >
          {allowEmpty ? <option value="">{emptyLabel}</option> : <option value="">Select a Punjab city</option>}
          {matches.map((place) => (
            <option key={place.slug} value={place.slug}>
              {place.name} — {place.district}
            </option>
          ))}
        </select>
      </Field>
      <p className="text-xs text-ink-muted">{matches.length} cities/towns shown</p>
    </div>
  );
}
