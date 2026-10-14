import Link from "next/link";
import { Suspense } from "react";
import ProductDetailByQuery from "./ProductDetailByQuery";

export default function ProductDetailByQueryPage() {
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
          <Link
            href="/katalog"
            className="text-sm text-slate-300 hover:text-blue-400"
          >
            Katalog
          </Link>
        </div>
      </header>
      <Suspense
        fallback={
          <main className="max-w-5xl mx-auto px-4 py-12 text-slate-400">
            Memuat tautan produk...
          </main>
        }
      >
        <ProductDetailByQuery />
      </Suspense>
    </div>
  );
}
