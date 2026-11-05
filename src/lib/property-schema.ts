import { z } from "zod";
import { areaUnits, propertyCategories } from "@/config/brand";

const categoryValues = propertyCategories.map((item) => item.value) as [string, ...string[]];
const unitValues = areaUnits.map((item) => item.value) as [string, ...string[]];

export const propertyInputSchema = z.object({
  title: z.string().trim().min(8, "Title must be at least 8 characters").max(120),
  description: z.string().trim().min(30, "Describe the property in at least 30 characters").max(4000),
  purpose: z.enum(["SALE", "RENT", "COMMERCIAL"]),
  category: z.enum(categoryValues),
  pricePkr: z.coerce.number().int().min(1000, "Enter a price in PKR").max(2_000_000_000),
  negotiable: z.boolean().optional(),
  locationSlug: z.string().min(1, "Choose a city"),
  areaName: z.string().trim().max(80).optional(),
  societyName: z.string().trim().max(80).optional(),
  sizeValue: z.coerce.number().positive("Enter the property size"),
  sizeUnit: z.enum(unitValues),
  bedrooms: z.coerce.number().int().min(0).max(30).optional(),
  bathrooms: z.coerce.number().int().min(0).max(30).optional(),
  coveredArea: z.coerce.number().positive().optional(),
  amenities: z.array(z.string()).max(20).optional(),
  contactPhone: z
    .string()
    .trim()
    .regex(/^(\+92|0)3[0-9]{9}$/, "Use a Pakistani mobile number"),
  whatsappPhone: z
    .string()
    .trim()
    .refine((value) => value === "" || /^(\+92|0)3[0-9]{9}$/.test(value), {
      message: "Use a Pakistani mobile number for WhatsApp",
    }),
  showPhone: z.boolean().optional(),
  showWhatsapp: z.boolean().optional(),
  intent: z.enum(["draft", "submit"]),
});

export const amenitiesCatalog = [
  "Parking",
  "Corner plot",
  "Park facing",
  "Boundary wall",
  "Electricity",
  "Gas",
  "Water",
  "Sewerage",
  "Security",
  "Garden",
  "Servant quarter",
  "Furnished",
  "Generator",
  "Lift",
];
