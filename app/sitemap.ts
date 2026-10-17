import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { NAV_CATEGORIES, categorySlug } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();

  const pages = ["/", "/katalog", "/kalkulator", "/artikel", "/about", "/kebijakan-privasi"].map(
    (path) => ({ url: absoluteUrl(path) }),
  );

  // Hanya kategori yang punya artikel (kategori kosong tidak diindeks).
  const categories = Array.from(
    new Set(articles.map((a) => categorySlug(a.category)).filter(Boolean)),
  ).map((slug) => ({ url: absoluteUrl(`/artikel/kategori/${slug}`) }));

  const posts = articles.map((a) => ({
    url: absoluteUrl(`/artikel/${a.slug}`),
    lastModified: a.updatedAt ? new Date(a.updatedAt) : undefined,
  }));

  return [...pages, ...categories, ...posts];
}
