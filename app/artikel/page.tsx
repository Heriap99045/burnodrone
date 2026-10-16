import type { Metadata } from "next";
import { ArticleGrid } from "@/components/article-grid";
import { CategoryTabs } from "@/components/category-tabs";
import { SiteHeader } from "@/components/site-header";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Semua Artikel | BurnoTech",
  description:
    "Tutorial, panduan, dan wawasan seputar teknologi: drone dan UAV, elektronik, perangkat cerdas, hingga inovasi digital.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader active="teknologi" />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h1 className="mb-3 text-3xl font-extrabold">
            Artikel & Panduan Teknologi
          </h1>
          <p className="text-slate-400">
            Tutorial, panduan, dan wawasan seputar teknologi: drone dan UAV,
            elektronik, perangkat cerdas, hingga inovasi digital.
          </p>
        </div>

        <CategoryTabs />
        <ArticleGrid articles={articles} />
      </main>
    </div>
  );
}
