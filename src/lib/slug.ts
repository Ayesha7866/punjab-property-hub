export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function uniqueSlug(title: string) {
  const base = slugify(title) || "property";
  const suffix = Math.random().toString(16).slice(2, 8);
  return `${base}-${suffix}`;
}
