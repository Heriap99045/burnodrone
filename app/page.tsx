import { Suspense } from "react";
import { io } from "next/cache";
import Image from "next/image";
import { products } from "@/data/products";

async function CurrentYear() {
  await io();
  return <>{new Date().getFullYear()}</>;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              BurnoDrone
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
            <a href="#katalog" className="hover:text-blue-400 transition">
              Katalog Component
            </a>
            <a href="#panduan" className="hover:text-blue-400 transition">
              Panduan Rakit
            </a>
            <a href="#about" className="hover:text-blue-400 transition">
              Tentang Kami
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Portal Rekomendasi Component <br />
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Drone & UAV Technology
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8">
          Direktori terlengkap komponen Flight Controller, Telemetry, RTK GPS,
          hingga Actuator untuk kebutuhan custom drone FPV, Agricultural
          Sprayer, maupun VTOL.
        </p>
      </section>

      {/* Catalog Grid Section */}
      <section id="katalog" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-blue-500 pl-3">
          Rekomendasi Component & Parts Pilihan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 border border-slate-700/60 rounded-xl overflow-hidden hover:border-blue-500/50 transition duration-300 flex flex-col"
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
                  <div className="text-emerald-400 font-bold text-lg mb-4">
                    {item.price}
                  </div>
                  <a
                    href={item.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition text-sm"
                  >
                    Cek Detail / Beli di Marketplace
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guide/Edukasi Section (Memberikan nilai tambah untuk reviewer Affiliate) */}
      <section
        id="panduan"
        className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-800"
      >
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-emerald-500 pl-3">
          Panduan & Artikel Integrasi System
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-slate-300">
          <div className="bg-slate-800/30 border border-slate-700/40 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-slate-100 mb-2">
              Panduan Konfigurasi RTK GNSS untuk Mapping
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Langkah-langkah integrasi Emlid Reach M2 dengan Flight Controller
              ArduPilot untuk akurasi posisi tingkat sentimeter pada misi
              pemetaan udara.
            </p>
            <span className="text-xs text-blue-400">
              Teknikal & Setup Tutorial &rarr;
            </span>
          </div>
          <div className="bg-slate-800/30 border border-slate-700/40 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-slate-100 mb-2">
              Pemilihan ESC & Motor untuk Frame Heavy Lift
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Menghitung efisiensi dorongan (thrust ratio) dan kalkulasi daya
              baterai 12S untuk drone pertanian / sprayer payload besar.
            </p>
            <span className="text-xs text-blue-400">
              Kalkulasi Power & System &rarr;
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            © <Suspense fallback={null}><CurrentYear /></Suspense> DroneTech
            Hub. Platform Rekomendasi & Review Komponen Drone Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}
