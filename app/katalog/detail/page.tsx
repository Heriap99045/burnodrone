import { Suspense } from "react";
import ProductDetailByQuery from "./ProductDetailByQuery";
import { SiteHeader } from "@/components/site-header";

export default function ProductDetailByQueryPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader active="katalog" />
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
