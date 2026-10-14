"use client";

import { useSearchParams } from "next/navigation";
import ProductDetail from "@/app/katalog/ProductDetail";

export default function ProductDetailByQuery() {
  const productId = useSearchParams().get("id");

  if (!productId) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12 text-slate-300">
        ID produk tidak ditemukan pada tautan.
      </main>
    );
  }

  return <ProductDetail key={productId} productId={productId} />;
}
