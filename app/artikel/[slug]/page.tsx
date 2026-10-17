import type { Metadata } from "next";
import Link from "next/link";
import { ArticleGrid } from "@/components/article-grid";
import {
  getArticleBySlug,
  getArticles,
  getRelatedArticles,
} from "@/lib/articles";
import { SiteHeader } from "@/components/site-header";
import { categoryHref } from "@/lib/categories";
import { Markdown } from "@/lib/markdown";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { hasAffiliateLinks } from "@/lib/markdown-parse";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel tidak ditemukan | BurnoTech" };

  return {
    title: `${article.title} | BurnoTech`,
    description: article.excerpt,
    alternates: { canonical: absoluteUrl(`/artikel/${article.slug}`) },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: absoluteUrl(`/artikel/${article.slug}`),
      siteName: SITE_NAME,
      locale: "id_ID",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artikel tidak ditemukan</h1>
          <Link href="/artikel" className="text-blue-400 hover:underline">
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  const affiliate = hasAffiliateLinks(article.content);
  const related = await getRelatedArticles(article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image ? [article.image] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: absoluteUrl(`/artikel/${article.slug}`),
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader active="teknologi" />

      {/* Article Body */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/artikel"
          className="text-xs text-slate-400 hover:text-blue-400 mb-6 inline-block"
        >
          &larr; Kembali ke Semua Artikel
        </Link>

        <div className="mb-6">
          <Link
            href={categoryHref(article.category)}
            className="inline-block bg-blue-600/80 text-xs px-2.5 py-1 rounded text-white font-medium mb-3 hover:bg-blue-500"
          >
            {article.category}
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-xs text-slate-400 border-b border-slate-800 pb-6">
            <span>Dipublikasikan pada {article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {article.image && (
          <div className="relative h-80 w-full bg-slate-950 rounded-2xl overflow-hidden mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {affiliate && (
          <p className="mb-6 rounded-xl border border-slate-700/60 bg-slate-800/40 p-3 text-xs text-slate-400">
            Artikel ini memuat link afiliasi. Jika Anda membeli lewat link
            tersebut, kami dapat menerima komisi tanpa biaya tambahan bagi Anda.
          </p>
        )}

        <Markdown source={article.content} />

        {/* Recommended CTA Box */}
        <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 border border-blue-500/30 p-6 rounded-2xl text-center">
          <h3 className="text-lg font-bold text-white mb-2">
            Butuh Komponen Hardware Relevan?
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Temukan komponen autopilot, GPS RTK, dan actuator bergaransi di
            katalog kami.
          </p>
          <Link
            href="/katalog"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Lihat Katalog Component &rarr;
          </Link>
        </div>
      </main>

      {related.length > 0 && (
        <section
          aria-labelledby="artikel-terkait"
          className="mx-auto max-w-7xl px-4 pb-16"
        >
          <h2
            id="artikel-terkait"
            className="mb-6 border-l-4 border-emerald-500 pl-3 text-2xl font-bold"
          >
            Artikel Terkait
          </h2>
          <ArticleGrid articles={related} />
        </section>
      )}
    </div>
  );
}
