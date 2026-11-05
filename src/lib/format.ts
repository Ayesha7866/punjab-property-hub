import { propertyCategories } from "@/config/brand";

export function formatPkr(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function categoryLabel(value: string) {
  return propertyCategories.find((item) => item.value === value)?.label ?? value;
}

export function statusLabel(status: string) {
  const map: Record<string, string> = {
    DRAFT: "Draft",
    PENDING: "Pending review",
    APPROVED: "Published",
    REJECTED: "Rejected",
    SOLD: "Sold",
    RENTED: "Rented",
    ARCHIVED: "Archived",
  };
  return map[status] ?? status;
}
