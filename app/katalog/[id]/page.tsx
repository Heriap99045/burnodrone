import Link from "next/link";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
          <Link href="/katalog" className="text-blue-400 hover:underline">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href="/katalog" className="text-blue-400">
              Katalog
            </Link>
            <Link href="/panduan" className="hover:text-blue-400">
              Panduan Rakit
            </Link>
            <Link href="/about" className="hover:text-blue-400">
              Tentang Kami
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <Link
          href="/katalog"
          className="text-sm text-slate-400 hover:text-blue-400 mb-6 inline-block"
        >
          &larr; Kembali ke Katalog
        </Link>

        <div className="grid md:grid-cols-2 gap-8 bg-slate-800/40 border border-slate-700/60 p-6 md:p-8 rounded-2xl">
          <div className="relative h-80 w-full bg-slate-900 rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-block bg-blue-600/90 text-xs px-2.5 py-1 rounded text-white font-semibold mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-extrabold mb-2">{product.name}</h1>
              <p className="text-slate-300 text-sm mb-6">{product.specs}</p>

              <div className="border-t border-slate-700/60 py-4 mb-6">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Estimasi Harga Marketplace
                </h3>
                <div className="text-3xl font-extrabold text-emerald-400">
                  {product.price}
                </div>
              </div>
            </div>

            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition"
            >
              Cek Stok & Beli di Marketplace Resmi &rarr;
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
