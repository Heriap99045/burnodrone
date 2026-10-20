"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/data/products";
import { useProducts } from "@/hooks/use-products";
import { SiteHeader } from "@/components/site-header";
import { categorySlug } from "@/lib/categories";

function ProductSkeletons() {
  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/50"
        >
          <div className="h-48 bg-slate-800" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 rounded bg-slate-700" />
            <div className="h-3 w-full rounded bg-slate-700/70" />
            <div className="h-3 w-1/2 rounded bg-slate-700/70" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CatalogInner({ initialProducts }: { initialProducts: Product[] }) {
  const [search, setSearch] = useState("");
  const selectedSlug = useSearchParams().get("kategori") ?? "";
  const { products, status, error } = useProducts(initialProducts);

  // Tab kategori mengikuti produk yang ada di database.
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products],
  );
  // Produk yang sudah ada saat situs dibangun punya halaman detail sendiri (/katalog/ID).
  // Produk yang baru ditambah di admin memakai halaman detail berbasis query sampai situs dibangun ulang.
  const knownIds = useMemo(
    () => new Set(initialProducts.map((p) => p.id)),
    [initialProducts],
  );
  const detailHref = (id: string) =>
    knownIds.has(id)
      ? `/katalog/${encodeURIComponent(id)}/`
      : `/katalog/detail/?id=${encodeURIComponent(id)}`;

  const tabs = [
    { label: "Semua", slug: "" },
    ...categories.map((c) => ({ label: c, slug: categorySlug(c) })),
  ];

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.specs.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedSlug === "" || categorySlug(item.category) === selectedSlug;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader active="katalog" />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2">
            Katalog Perangkat & Komponen
          </h1>
          <p className="text-slate-400">
            Cari dan temukan perangkat dan komponen pilihan dengan spesifikasi
            lengkap.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari produk (misal: CUAV, RTK, Gimbal, Servo)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {tabs.map((tab) => (
              <Link
                key={tab.slug || "semua"}
                href={tab.slug ? `/katalog?kategori=${tab.slug}` : "/katalog"}
                aria-current={selectedSlug === tab.slug ? "page" : undefined}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  selectedSlug === tab.slug
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>

        {status === "loading" && (
          <>
            <span className="sr-only" role="status">
              Memuat katalog
            </span>
            <ProductSkeletons />
          </>
        )}
        {status === "error" && (
          <p
            className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200"
            role="alert"
          >
            {error}
          </p>
        )}
        {status === "success" && filteredProducts.length === 0 && (
          <p className="text-slate-300">Produk tidak ditemukan di katalog.</p>
        )}
        {status === "success" && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => {
              const href = detailHref(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-slate-800/50 border border-slate-700/60 rounded-xl overflow-hidden hover:border-blue-500/50 transition flex flex-col"
                >
                  <Link
                    href={href}
                    className="relative block h-48 w-full bg-slate-900"
                    aria-label={`Lihat detail ${item.name}`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600/90 text-xs px-2 py-1 rounded text-white font-semibold">
                      {item.category}
                    </span>
                  </Link>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-slate-100 transition hover:text-blue-400">
                        <Link href={href}>{item.name}</Link>
                      </h3>
                      <p className="text-xs text-slate-400 mb-3">{item.specs}</p>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-bold text-lg mb-3">
                        {item.price}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={href}
                          className="flex-1 text-center border border-slate-600 hover:border-blue-500 text-slate-200 font-medium py-2 rounded-lg transition text-xs"
                        >
                          Lihat Detail
                        </Link>
                        <a
                          href={item.affiliateUrl}
                          target="_blank"
                          rel="sponsored nofollow noopener noreferrer"
                          className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition text-xs"
                        >
                          Beli
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export function CatalogView({ initialProducts }: { initialProducts: Product[] }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 text-slate-100">
          <SiteHeader active="katalog" />
          <main className="mx-auto max-w-7xl px-4 py-12">
            <ProductSkeletons />
          </main>
        </div>
      }
    >
      <CatalogInner initialProducts={initialProducts} />
    </Suspense>
  );
}
