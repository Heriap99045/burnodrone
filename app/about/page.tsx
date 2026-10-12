import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
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
            <Link href="/panduan" className="hover:text-blue-400">
              Panduan Rakit
            </Link>
            <Link href="/about" className="text-blue-400 font-semibold">
              Tentang Kami
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-4">Tentang BurnoDrone</h1>
        <div className="prose prose-invert text-slate-300 space-y-4 text-sm leading-relaxed">
          <p>
            <strong>BurnoDrone</strong> adalah portal direktori dan rekomendasi
            spesifikasi komponen drone, FPV, sistem pemetaan aerial mapping
            (RTK/PPK), dan UAV pertanian di Indonesia.
          </p>
          <p>
            Tujuan kami adalah mempermudah para pegiat hobi, engineer, dan
            perekayasa drone custom dalam menemukan *hardware* berkualitas,
            membandingkan spesifikasi teknis, serta memberikan rujukan toko
            resmi tepercaya di marketplace lokal.
          </p>
          <div className="border-t border-slate-800 pt-6 mt-8">
            <h2 className="text-lg font-bold text-white mb-2">Hubungi Kami</h2>
            <p className="text-slate-400">
              Email: support@burnodrone.com <br />
              Lokasi: Indonesia
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
