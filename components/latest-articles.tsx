/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getArticles, type PublicArticle } from "@/lib/articles";

function Cover({ article, className }: { article: PublicArticle; className: string }) {
  return (
    <div className={`relative bg-slate-900 ${className}`}>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      )}
      <span className="absolute left-3 top-3 rounded-md bg-blue-600/90 px-2.5 py-1 text-xs font-medium text-white">
        {article.category}
      </span>
    </div>
  );
}

// Komponen server: dirender saat build, mengambil artikel terbaru dari Supabase.
export async function LatestArticles() {
  const [featured, ...rest] = (await getArticles()).slice(0, 4);

  if (!featured) {
    return <p className="text-sm text-slate-400">Belum ada artikel.</p>;
  }

  return (
    <>
      <article className="grid overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40 transition hover:border-blue-500/50 md:grid-cols-2">
        <Cover article={featured} className="h-56 md:h-full md:min-h-72" />
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="mb-3 flex items-center gap-3 text-xs text-slate-400">
            <span>{featured.date}</span>
            <span>•</span>
            <span>{featured.readTime}</span>
          </div>
          <h3 className="mb-3 text-2xl font-extrabold leading-snug text-slate-100">
            <Link
              href={`/artikel/${featured.slug}`}
              className="transition hover:text-blue-400"
            >
              {featured.title}
            </Link>
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-slate-400">
            {featured.excerpt}
          </p>
          <Link
            href={`/artikel/${featured.slug}`}
            className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Baca selengkapnya &rarr;
          </Link>
        </div>
      </article>

      {rest.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((a) => (
            <article
              key={a.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40 transition hover:border-blue-500/50"
            >
              <Cover article={a} className="h-40" />
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="mb-2 flex items-center gap-3 text-xs text-slate-400">
                    <span>{a.date}</span>
                    <span>•</span>
                    <span>{a.readTime}</span>
                  </div>
                  <h3 className="mb-2 font-bold text-slate-100">
                    <Link
                      href={`/artikel/${a.slug}`}
                      className="transition hover:text-blue-400"
                    >
                      {a.title}
                    </Link>
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-slate-400">
                    {a.excerpt}
                  </p>
                </div>
                <Link
                  href={`/artikel/${a.slug}`}
                  className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  Baca selengkapnya &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/artikel"
          className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
        >
          Lihat semua artikel &rarr;
        </Link>
      </div>
    </>
  );
}
