import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/properties",
    "/cities",
    "/about",
    "/how-it-works",
    "/list-property",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: `${brand.url}${path || "/"}`,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.6,
  }));
}
