"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Flight Controller",
    "Camera & Gimbal",
    "GPS & Navigation",
    "Actuators",
  ];

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.specs.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <Link href="/katalog" className="text-blue-400 font-semibold">
              Katalog
            </Link>
            <Link href="/panduan" className="hover:text-blue-400 transition">
              Panduan Rakit
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition">
              Tentang Kami
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero & Search */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2">
            Katalog Komponen Drone & UAV
          </h1>
          <p className="text-slate-400">
            Cari dan temukan komponen custom drone terbaik dengan spesifikasi
            terlengkap.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Cari part (misal: CUAV, RTK, Gimbal, Servo)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 border border-slate-700/60 rounded-xl overflow-hidden hover:border-blue-500/50 transition flex flex-col"
            >
              <div className="relative h-48 w-full bg-slate-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-blue-600/90 text-xs px-2 py-1 rounded text-white font-semibold">
                  {item.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-1 text-slate-100">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">{item.specs}</p>
                </div>
                <div>
                  <div className="text-emerald-400 font-bold text-lg mb-3">
                    {item.price}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/katalog/${item.id}`}
                      className="flex-1 text-center bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-lg transition text-xs"
                    >
                      Detail Specs
                    </Link>
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition text-xs"
                    >
                      Beli
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            Komponen yang Anda cari tidak ditemukan. Coba gunakan kata kunci
            lain.
          </div>
        )}
      </main>
    </div>
  );
}
