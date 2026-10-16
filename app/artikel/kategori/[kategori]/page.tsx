import type { Metadata } from "next";
import { ArticleGrid } from "@/components/article-grid";
import { CategoryTabs } from "@/components/category-tabs";
import { SiteHeader } from "@/components/site-header";
import { getArticles } from "@/lib/articles";
import { NAV_CATEGORIES, categorySlug } from "@/lib/categories";

type Props = { params: Promise<{ kategori: string }> };

// Halaman dibuat untuk kategori menu + setiap kategori yang dipakai artikel.
export async function generateStaticParams() {
  const articles = await getArticles();
  const slugs = new Set(
    [...NAV_CATEGORIES, ...articles.map((a) => a.category)]
      .map(categorySlug)
      .filter(Boolean),
  );
  return Array.from(slugs).map((kategori) => ({ kategori }));
}

async function load(slug: string) {
  const articles = (await getArticles()).filter(
    (a) => categorySlug(a.category) === slug,
  );
  const name =
    articles[0]?.category ??
    NAV_CATEGORIES.find((c) => categorySlug(c) === slug) ??
    slug.replace(/-/g, " ");
  return { name, articles };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params;
  const { name } = await load(kategori);
  return {
    title: `${name} | BurnoTech`,
    description: `Artikel, tutorial, dan panduan kategori ${name} di BurnoTech.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { kategori } = await params;
  const { name, articles } = await load(kategori);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader active="teknologi" />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="mb-3 text-3xl font-extrabold">{name}</h1>
          <p className="text-slate-400">
            Artikel dan panduan dalam kategori {name}.
          </p>
        </div>

        <CategoryTabs activeSlug={kategori} />
        <ArticleGrid
          articles={articles}
          emptyText="Belum ada artikel di kategori ini."
        />
      </main>
    </div>
  );
}
