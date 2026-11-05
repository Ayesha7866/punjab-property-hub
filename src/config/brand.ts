/**
 * Brand and contact details live in one place so they can be changed later
 * without hunting through templates.
 */
export const brand = {
  name: "Punjab Property Hub",
  shortName: "PPH",
  legalName: "Punjab Property Hub",
  tagline: "Buy, rent, and list property across Punjab — with honest listings.",
  description:
    "Punjab Property Hub is a property marketplace for Punjab, Pakistan. Owners, dealers, and agents can publish homes, plots, and commercial space. Buyers and tenants can search by city, district, society, price, and size.",
  locale: "en-PK",
  currency: "PKR",
  province: "Punjab",
  country: "Pakistan",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:45218",
  contact: {
    email: "hello@punjabpropertyhub.example",
    phoneDisplay: "+92 300 0000000",
    phoneE164: "+923000000000",
    whatsappE164: "923000000000",
    addressLine: "Punjab, Pakistan",
  },
} as const;

export const listingPurposes = [
  { value: "sale", label: "Buy", searchHint: "Properties for sale" },
  { value: "rent", label: "Rent", searchHint: "Properties for rent" },
  { value: "commercial", label: "Commercial", searchHint: "Shops, offices, and commercial buildings" },
] as const;

export const propertyCategories = [
  { value: "house", label: "House" },
  { value: "plot", label: "Plot" },
  { value: "flat", label: "Flat / Apartment" },
  { value: "shop", label: "Shop" },
  { value: "office", label: "Office" },
  { value: "commercial_building", label: "Commercial Building" },
  { value: "warehouse", label: "Warehouse" },
  { value: "agricultural_land", label: "Agricultural Land" },
  { value: "other", label: "Other" },
] as const;

export const areaUnits = [
  { value: "marla", label: "Marla" },
  { value: "kanal", label: "Kanal" },
  { value: "sqft", label: "Square Feet" },
  { value: "sqyd", label: "Square Yards" },
  { value: "acre", label: "Acre" },
] as const;

export const budgetBandsPkr = [
  { value: "", label: "Any budget" },
  { value: "0-2500000", label: "Under 25 lakh" },
  { value: "2500000-5000000", label: "25 lakh – 50 lakh" },
  { value: "5000000-10000000", label: "50 lakh – 1 crore" },
  { value: "10000000-25000000", label: "1 – 2.5 crore" },
  { value: "25000000-50000000", label: "2.5 – 5 crore" },
  { value: "50000000-", label: "Above 5 crore" },
] as const;
