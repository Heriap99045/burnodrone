import type { Metadata } from "next";
import Link from "next/link";
import { getArticleBySlug, getArticles } from "@/lib/articles";
import { Markdown } from "@/lib/markdown";
import { hasAffiliateLinks } from "@/lib/markdown-parse";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel tidak ditemukan | BurnoDrone" };

  return {
    title: `${article.title} | BurnoDrone`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
          >
            BurnoDrone
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-300">
            <Link href="/katalog" className="hover:text-blue-400">
              Katalog
            </Link>
            <Link href="/artikel" className="text-blue-400">
              Artikel & Tutorial
            </Link>
            <Link href="/about" className="hover:text-blue-400">
              Tentang Kami
            </Link>
          </nav>
        </div>
      </header>

      {/* Article Body */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/artikel"
          className="text-xs text-slate-400 hover:text-blue-400 mb-6 inline-block"
        >
          &larr; Kembali ke Semua Artikel
        </Link>

        <div className="mb-6">
          <span className="inline-block bg-blue-600/80 text-xs px-2.5 py-1 rounded text-white font-medium mb-3">
            {article.category}
          </span>
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
    </div>
  );
}
