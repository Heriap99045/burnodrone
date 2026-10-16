import Link from "next/link";
import { LatestArticles } from "@/components/latest-articles";
import { SiteHeader } from "@/components/site-header";
import { NAV_CATEGORIES, categoryHref } from "@/lib/categories";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
          Portal Artikel & Informasi <br />
          <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Teknologi
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400">
          Tutorial, panduan, dan wawasan seputar teknologi: dari drone dan UAV,
          elektronik, hingga inovasi digital.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/artikel"
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Baca Artikel
          </Link>
          <Link
            href="/katalog"
            className="rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            Jelajahi Katalog
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {NAV_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={categoryHref(c)}
              className="rounded-full border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-blue-500/60 hover:text-blue-300"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Artikel Terbaru */}
      <section id="artikel" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 border-l-4 border-emerald-500 pl-3 text-2xl font-bold">
          Artikel Terbaru
        </h2>
        <LatestArticles />
      </section>

      {/* Katalog */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl border border-blue-500/30 bg-linear-to-r from-slate-800 to-slate-900 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-white">Katalog</h2>
          <p className="mb-5 text-sm text-slate-400">
            Perangkat dan komponen pilihan.
          </p>
          <Link
            href="/katalog"
            className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Jelajahi Katalog &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
