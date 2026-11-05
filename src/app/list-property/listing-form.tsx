"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Select, fieldControlClass } from "@/components/ui/field";
import { StatusBanner } from "@/components/forms/status-banner";
import { PunjabCitySelect } from "@/components/search/punjab-city-select";
import { areaUnits, propertyCategories } from "@/config/brand";
import { ListingMediaThumb } from "@/components/properties/listing-media";
import { amenitiesCatalog } from "@/lib/property-schema";
import { MEDIA_LIMITS } from "@/lib/media";
import { createPropertyAction, type FormState } from "./actions";

const initial: FormState = { status: "idle", message: "" };

export type ListingFormValues = {
  id?: string;
  title?: string;
  description?: string;
  purpose?: string;
  category?: string;
  pricePkr?: number;
  negotiable?: boolean;
  locationSlug?: string;
  areaName?: string | null;
  societyName?: string | null;
  sizeValue?: number;
  sizeUnit?: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  coveredArea?: number | null;
  amenities?: string[];
  contactPhone?: string;
  whatsappPhone?: string | null;
  showPhone?: boolean;
  showWhatsapp?: boolean;
  photos?: { id: string; mimeType?: string }[];
};

export function ListingForm({
  defaultPhone,
  existing,
}: {
  defaultPhone: string;
  existing?: ListingFormValues;
}) {
  const [state, formAction, pending] = useActionState(createPropertyAction, initial);
  const selectedAmenities = new Set(existing?.amenities ?? []);
  return (
    <form action={formAction} className="space-y-5" encType="multipart/form-data">
      {existing?.id ? <input type="hidden" name="propertyId" value={existing.id} /> : null}
      {state.status === "error" ? <StatusBanner status="error" message={state.message} /> : null}

      <Field label="Title" name="title">
        <input
          id="title"
          name="title"
          required
          minLength={8}
          defaultValue={existing?.title}
          className={fieldControlClass}
          placeholder="5 marla house in a residential society"
        />
        {state.fieldErrors?.title ? <span className="mt-1 block text-xs text-red-700">{state.fieldErrors.title[0]}</span> : null}
      </Field>
      <Field label="Description" name="description">
        <textarea
          id="description"
          name="description"
          required
          minLength={30}
          rows={6}
          defaultValue={existing?.description}
          className={`${fieldControlClass} h-auto py-2`}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Purpose" name="purpose">
          <Select name="purpose" defaultValue={existing?.purpose ?? "SALE"}>
            <option value="SALE">For sale</option>
            <option value="RENT">For rent</option>
            <option value="COMMERCIAL">Commercial</option>
          </Select>
        </Field>
        <Field label="Category" name="category">
          <Select name="category" defaultValue={existing?.category ?? "house"}>
            {propertyCategories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Price (PKR)" name="pricePkr">
          <input
            id="pricePkr"
            name="pricePkr"
            type="number"
            min={1000}
            required
            defaultValue={existing?.pricePkr}
            className={fieldControlClass}
          />
        </Field>
        <label className="flex items-end gap-2 pb-2 text-sm text-ink-muted">
          <input type="checkbox" name="negotiable" defaultChecked={existing?.negotiable} />
          Price is negotiable
        </label>
        <div className="sm:col-span-2">
          <PunjabCitySelect name="locationSlug" label="City / town" defaultValue={existing?.locationSlug ?? ""} />
        </div>
        <Field label="Area / mohalla" name="areaName">
          <input id="areaName" name="areaName" defaultValue={existing?.areaName ?? ""} className={fieldControlClass} />
        </Field>
        <Field label="Housing society (optional)" name="societyName">
          <input
            id="societyName"
            name="societyName"
            defaultValue={existing?.societyName ?? ""}
            className={fieldControlClass}
          />
        </Field>
        <Field label="Size" name="sizeValue">
          <input
            id="sizeValue"
            name="sizeValue"
            type="number"
            step="0.01"
            min={0.01}
            required
            defaultValue={existing?.sizeValue}
            className={fieldControlClass}
          />
        </Field>
        <Field label="Size unit" name="sizeUnit">
          <Select name="sizeUnit" defaultValue={existing?.sizeUnit ?? "marla"}>
            {areaUnits.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Bedrooms" name="bedrooms">
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min={0}
            defaultValue={existing?.bedrooms ?? undefined}
            className={fieldControlClass}
          />
        </Field>
        <Field label="Bathrooms" name="bathrooms">
          <input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min={0}
            defaultValue={existing?.bathrooms ?? undefined}
            className={fieldControlClass}
          />
        </Field>
        <Field label="Covered area (optional)" name="coveredArea">
          <input
            id="coveredArea"
            name="coveredArea"
            type="number"
            step="0.01"
            min={0.01}
            defaultValue={existing?.coveredArea ?? undefined}
            className={fieldControlClass}
          />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Amenities
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {amenitiesCatalog.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm text-ink-muted">
              <input type="checkbox" name="amenities" value={item} defaultChecked={selectedAmenities.has(item)} />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
      {existing?.photos?.length ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {existing.photos.map((photo) => (
            <ListingMediaThumb key={photo.id} item={photo} />
          ))}
        </div>
      ) : null}
      <Field
        label="Photos"
        name="photos"
        hint={`JPEG, PNG or WebP. Up to ${MEDIA_LIMITS.maxPhotos} photos, 5 MB each. At least one photo is required to submit.`}
      >
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="block w-full text-sm"
        />
      </Field>
      <Field
        label="Property video (optional)"
        name="videos"
        hint={`MP4 or WebM. Up to ${MEDIA_LIMITS.maxVideos} videos, 32 MB each. A walk-through of the house or plot.`}
      >
        <input
          id="videos"
          name="videos"
          type="file"
          accept="video/mp4,video/webm"
          multiple
          className="block w-full text-sm"
        />
      </Field>
      <p className="rounded-md bg-cream px-3 py-2 text-sm text-ink-muted">
        After approval, buyers see Call and WhatsApp on your listing. They contact you
        directly — this site does not take payment.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Contact mobile" name="contactPhone">
          <input
            id="contactPhone"
            name="contactPhone"
            defaultValue={existing?.contactPhone ?? defaultPhone}
            required
            className={fieldControlClass}
          />
        </Field>
        <Field label="WhatsApp number" name="whatsappPhone" hint="Leave empty to use the same mobile number.">
          <input
            id="whatsappPhone"
            name="whatsappPhone"
            defaultValue={existing?.whatsappPhone ?? ""}
            className={fieldControlClass}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input type="checkbox" name="showPhone" defaultChecked={existing?.showPhone ?? true} />
          Show Call seller on the public listing
        </label>
        <label className="flex items-center gap-2 text-sm text-ink-muted">
          <input type="checkbox" name="showWhatsapp" defaultChecked={existing?.showWhatsapp ?? true} />
          Show WhatsApp seller on the public listing
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="submit" name="intent" value="submit" disabled={pending} variant="gold">
          {pending ? "Saving…" : "Submit for review"}
        </Button>
        <Button type="submit" name="intent" value="draft" disabled={pending} variant="outline">
          Save draft
        </Button>
      </div>
    </form>
  );
}
