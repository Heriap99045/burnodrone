/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { PublicArticle } from "@/lib/articles";

export function ArticleGrid({
  articles,
  emptyText = "Belum ada artikel.",
}: {
  articles: PublicArticle[];
  emptyText?: string;
}) {
  if (articles.length === 0) {
    return <p className="text-center text-slate-400">{emptyText}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {articles.map((item) => (
        <article
          key={item.id}
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40 transition hover:border-blue-500/50"
        >
          <div className="relative h-48 w-full bg-slate-900">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute left-3 top-3 rounded-md bg-blue-600/90 px-2.5 py-1 text-xs font-medium text-white">
              {item.category}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="mb-2 flex items-center gap-3 text-xs text-slate-400">
                <span>{item.date}</span>
                <span>•</span>
                <span>{item.readTime}</span>
              </div>
              <h2 className="mb-3 text-lg font-bold text-slate-100 transition hover:text-blue-400">
                <Link href={`/artikel/${item.slug}`}>{item.title}</Link>
              </h2>
              <p className="mb-4 text-xs leading-relaxed text-slate-400">
                {item.excerpt}
              </p>
            </div>
            <Link
              href={`/artikel/${item.slug}`}
              className="inline-flex items-center text-xs font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Baca Selengkapnya &rarr;
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
