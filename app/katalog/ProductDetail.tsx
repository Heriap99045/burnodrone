"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { getProductById } from "@/lib/products";

export default function ProductDetail({ productId }: { productId: string }) {
  const [result, setResult] = useState<{
    productId: string;
    product: Product | null;
    status: "loading" | "success" | "error";
    error: string;
  }>({ productId, product: null, status: "loading", error: "" });

  useEffect(() => {
    let active = true;
    getProductById(productId)
      .then((result) => {
        if (active) {
          setResult({
            productId,
            product: result,
            status: "success",
            error: "",
          });
        }
      })
      .catch((reason: unknown) => {
        if (active) {
          setResult({
            productId,
            product: null,
            status: "error",
            error:
              reason instanceof Error
                ? reason.message
                : "Terjadi kesalahan saat memuat produk.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [productId]);

  const isCurrentProduct = result.productId === productId;
  const status = isCurrentProduct ? result.status : "loading";
  const product = isCurrentProduct ? result.product : null;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/katalog"
        className="text-sm text-slate-400 hover:text-blue-400 mb-6 inline-block"
      >
        &larr; Kembali ke Katalog
      </Link>

      {status === "loading" && (
        <p className="text-slate-400" role="status">
          Memuat produk...
        </p>
      )}

      {status === "error" && (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200" role="alert">
          {result.error}
        </p>
      )}

      {status === "success" && !product && (
        <p className="text-slate-300">Produk tidak ditemukan di katalog.</p>
      )}

      {status === "success" && product && (
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
                <h2 className="text-xs uppercase tracking-wider text-slate-400 mb-2">
                  Estimasi Harga Marketplace
                </h2>
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
      )}
    </main>
  );
}
