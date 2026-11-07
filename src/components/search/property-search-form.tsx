import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Select, fieldControlClass } from "@/components/ui/field";
import {
  budgetBandsPkr,
  listingPurposes,
  propertyCategories,
} from "@/config/brand";
import { LocationFields } from "@/components/search/location-fields";
import { punjabPlaceCount } from "@/data/punjab-locations";
import { cn } from "@/lib/cn";
import type { SearchFilters } from "@/lib/search";

export function PropertySearchForm({
  filters,
  compact = false,
}: {
  filters?: Partial<SearchFilters>;
  compact?: boolean;
}) {
  const purpose = filters?.purpose ?? "sale";

  return (
    <form
      key={[purpose, filters?.city, filters?.district, filters?.type, filters?.budget, filters?.q].join("|")}
      action="/properties"
      method="get"
      className={cn(
        "rounded-[1.6rem] border border-white/25 bg-white/95 p-5 shadow-2xl shadow-brand/20 backdrop-blur sm:p-6",
        compact && "border-brand/10 shadow-md",
      )}
    >
      <fieldset className="mb-4 grid grid-cols-3 gap-1 rounded-full bg-cream p-1">
        <legend className="sr-only">Listing purpose</legend>
        {listingPurposes.map((item) => (
          <label
            key={item.value}
            className="relative flex cursor-pointer items-center justify-center"
          >
            <input
              type="radio"
              name="purpose"
              value={item.value}
              defaultChecked={purpose === item.value}
              className="peer sr-only"
            />
            <span className="w-full rounded-full px-2 py-2 text-center text-sm font-semibold text-ink-muted transition-colors peer-checked:bg-brand peer-checked:text-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold">
              {item.label}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <LocationFields city={filters?.city} district={filters?.district} />
        <Field label="Property type" name="type">
          <Select name="type" defaultValue={filters?.type ?? ""}>
            <option value="">Any type</option>
            {propertyCategories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Budget (PKR)" name="budget">
          <Select name="budget" defaultValue={filters?.budget ?? ""}>
            {budgetBandsPkr.map((item) => (
              <option key={item.value || "any"} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Keyword" name="q">
          <input
            id="q"
            name="q"
            defaultValue={filters?.q}
            placeholder="Society, area, or title"
            className={fieldControlClass}
            autoComplete="off"
          />
        </Field>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-muted">
          {punjabPlaceCount} Punjab cities and towns in the directory. Results stay
          empty until approved listings exist.
        </p>
        <Button type="submit" variant="gold" className="sm:min-w-44">
          <Search className="h-4 w-4" />
          Search properties
        </Button>
      </div>
    </form>
  );
}
