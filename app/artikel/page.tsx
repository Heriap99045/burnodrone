import type { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel & Tutorial Drone | BurnoDrone",
  description:
    "Dokumentasi teknis, tutorial integrasi ArduPilot, review hardware UAV, dan kalkulasi rakitan custom drone.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header / Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
          >
            BurnoDrone
          </Link>
          <nav className="flex gap-6 text-sm font-medium text-slate-300">
            <Link href="/katalog" className="hover:text-blue-400 transition">
              Katalog
            </Link>
            <Link href="/artikel" className="text-blue-400 font-semibold">
              Artikel & Tutorial
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition">
              Tentang Kami
            </Link>
          </nav>
        </div>
      </header>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-3">
            Artikel & Panduan Teknologi Drone
          </h1>
          <p className="text-slate-400">
            Dokumentasi teknis, tutorial integrasi ArduPilot, review hardware
            UAV, dan kalkulasi rakitan custom drone.
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="text-center text-slate-400">Belum ada artikel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((item) => (
              <article
                key={item.id}
                className="bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-blue-500/50 transition flex flex-col"
              >
                <div className="relative h-48 w-full bg-slate-900">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute top-3 left-3 bg-blue-600/90 text-xs px-2.5 py-1 rounded-md text-white font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h2 className="font-bold text-lg mb-3 text-slate-100 hover:text-blue-400 transition">
                      <Link href={`/artikel/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {item.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/artikel/${item.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
                  >
                    Baca Selengkapnya &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
