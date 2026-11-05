import { PunjabCitySelect } from "@/components/search/punjab-city-select";
import { Field, Select } from "@/components/ui/field";
import { punjabDistricts } from "@/data/punjab-locations";

export function LocationFields({
  city,
  district,
}: {
  city?: string;
  district?: string;
}) {
  return (
    <>
      <PunjabCitySelect
        name="city"
        label="City / town"
        defaultValue={city ?? ""}
        allowEmpty
        emptyLabel="All Punjab cities"
      />
      <Field label="District" name="district">
        <Select name="district" defaultValue={district ?? ""}>
          <option value="">All districts</option>
          {punjabDistricts.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </Select>
      </Field>
    </>
  );
}
