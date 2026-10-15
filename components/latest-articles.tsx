import Link from "next/link";
import { getArticles } from "@/lib/articles";

// Komponen server: dirender saat build, mengambil 3 artikel terbaru dari Supabase.
export async function LatestArticles() {
  const latest = (await getArticles()).slice(0, 3);

  if (latest.length === 0) {
    return <p className="text-sm text-slate-400">Belum ada artikel.</p>;
  }

  return (
    <>
      <div className="grid gap-6 text-slate-300 md:grid-cols-3">
        {latest.map((a) => (
          <article
            key={a.id}
            className="flex flex-col justify-between rounded-xl border border-slate-700/40 bg-slate-800/30 p-6"
          >
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-400">
                {a.category}
              </span>
              <h3 className="mb-2 mt-1 text-lg font-bold text-slate-100">
                <Link
                  href={`/artikel/${a.slug}`}
                  className="transition hover:text-blue-400"
                >
                  {a.title}
                </Link>
              </h3>
              <p className="mb-4 text-sm text-slate-400">{a.excerpt}</p>
            </div>
            <Link
              href={`/artikel/${a.slug}`}
              className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Baca selengkapnya &rarr;
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-6">
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
