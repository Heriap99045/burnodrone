"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { useProducts } from "@/hooks/use-products";

type MissionType = "fpv" | "mapping" | "agri" | "vtol";

export default function CalculatorPage() {
  const { products, status, error } = useProducts();
  const [mission, setMission] = useState<MissionType>("agri");
  const [weight, setWeight] = useState(4.8);
  const [payload, setPayload] = useState(1.8);
  const [flightTime, setFlightTime] = useState(18);
  const [batteryVoltage, setBatteryVoltage] = useState(12);
  const [motorCount, setMotorCount] = useState(6);
  const [propDiameter, setPropDiameter] = useState(15);

  const results = useMemo(() => {
    const totalWeightKg = weight + payload;
    const safetyFactor = 2.1;
    const totalThrustN = totalWeightKg * 9.81 * safetyFactor;
    const thrustPerMotorN = totalThrustN / motorCount;
    const thrustPerMotorKg = thrustPerMotorN / 9.81;
    const estimatedPowerW =
      totalWeightKg * 250 + payload * 120 + motorCount * 140;
    const requiredWh = estimatedPowerW * (flightTime / 60) * 1.15;
    const nominalPackVoltage = batteryVoltage * 3.7;
    const batteryCapacityAh = requiredWh / nominalPackVoltage;
    const escAmp = Math.max(35, thrustPerMotorKg * 30);

    return {
      totalWeightKg,
      totalThrustN,
      thrustPerMotorN,
      thrustPerMotorKg,
      requiredWh,
      batteryCapacityAh,
      escAmp,
    };
  }, [batteryVoltage, flightTime, motorCount, payload, weight]);

  const recommendedProducts = useMemo(() => {
    const categoryPreferences: Record<MissionType, string[]> = {
      fpv: ["Camera & Gimbal", "Flight Controller", "Actuators"],
      mapping: ["GPS & Navigation", "Flight Controller", "Camera & Gimbal"],
      agri: ["Actuators", "Flight Controller", "GPS & Navigation"],
      vtol: ["Actuators", "Flight Controller", "GPS & Navigation"],
    };
    const matches = categoryPreferences[mission]
      .map((category) => products.find((product) => product.category === category))
      .filter((product): product is Product => product !== undefined);

    return matches.length > 0 ? matches : products.slice(0, 3);
  }, [mission, products]);

  const missionLabel: Record<MissionType, string> = {
    fpv: "FPV / Cine",
    mapping: "Mapping / Survey",
    agri: "Agricultural Sprayer",
    vtol: "VTOL / Hybrid",
  };

  const recommendationText: Record<MissionType, string> = {
    fpv: "Prioritaskan thrust cepat, akselerasi responsif, dan sistem kamera stabil.",
    mapping: "Gunakan GPS/RTK yang akurat dan FC yang stabil untuk kontrol navigasi.",
    agri: "Fokus pada daya angkat payload besar dan efisiensi durasi terbang yang konsisten.",
    vtol: "Butuh motor high-torque, ESC dengan headroom cukup, dan konfigurasi avionics yang stabil.",
  };

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
            <Link href="/katalog" className="hover:text-blue-400 transition">
              Katalog
            </Link>
            <Link href="/kalkulator" className="text-blue-400 font-semibold">
              Kalkulator Drone
            </Link>
            <Link href="/artikel" className="hover:text-blue-400 transition">
              Artikel & Tutorial
            </Link>
            <Link href="/about" className="hover:text-blue-400 transition">
              Tentang Kami
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Calculator
          </p>
          <h1 className="text-4xl font-extrabold mt-2 mb-3">
            Kalkulator Desain Drone
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Hitung kebutuhan thrust, kapasitas baterai, dan rekomendasi komponen
            yang cocok untuk build drone custom Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <section className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
            <div className="grid md:grid-cols-2 gap-5">
              <label className="block">
                <span className="text-sm text-slate-300 mb-2 block">Jenis misi</span>
                <select
                  value={mission}
                  onChange={(e) => setMission(e.target.value as MissionType)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-slate-100 focus:border-blue-500 outline-none"
                >
                  <option value="fpv">FPV / Cine</option>
                  <option value="mapping">Mapping / Survey</option>
                  <option value="agri">Agricultural Sprayer</option>
                  <option value="vtol">VTOL / Hybrid</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300 mb-2 block">Berat drone (kg)</span>
                <input
                  type="number"
                  min="0.5"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value || 0))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-slate-100 focus:border-blue-500 outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm text-slate-300 mb-2 block">Payload (kg)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={payload}
                  onChange={(e) => setPayload(Number(e.target.value || 0))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-slate-100 focus:border-blue-500 outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm text-slate-300 mb-2 block">Waktu terbang target (menit)</span>
                <input
                  type="number"
                  min="5"
                  step="1"
                  value={flightTime}
                  onChange={(e) => setFlightTime(Number(e.target.value || 0))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-slate-100 focus:border-blue-500 outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm text-slate-300 mb-2 block">Tegangan baterai (S)</span>
                <select
                  value={batteryVoltage}
                  onChange={(e) => setBatteryVoltage(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-slate-100 focus:border-blue-500 outline-none"
                >
                  <option value={6}>6S</option>
                  <option value={12}>12S</option>
                  <option value={14}>14S</option>
                  <option value={22}>22S</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300 mb-2 block">Jumlah motor</span>
                <select
                  value={motorCount}
                  onChange={(e) => setMotorCount(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-slate-100 focus:border-blue-500 outline-none"
                >
                  <option value={4}>4 Motor</option>
                  <option value={6}>6 Motor</option>
                  <option value={8}>8 Motor</option>
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm text-slate-300 mb-2 block">Ukuran propeller (inci)</span>
                <input
                  type="range"
                  min="8"
                  max="24"
                  step="1"
                  value={propDiameter}
                  onChange={(e) => setPropDiameter(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>8&quot;</span>
                  <span className="font-semibold text-slate-200">{propDiameter}&quot;</span>
                  <span>24&quot;</span>
                </div>
              </label>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-emerald-500/10 border border-blue-500/40 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-300">Profil</p>
              <h2 className="text-2xl font-bold mt-2 mb-3">{missionLabel[mission]}</h2>
              <p className="text-sm text-slate-300">{recommendationText[mission]}</p>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Ringkasan desain</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total berat</span>
                  <strong>{results.totalWeightKg.toFixed(1)} kg</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Thrust total</span>
                  <strong>{results.totalThrustN.toFixed(0)} N</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Thrust/motor</span>
                  <strong>{results.thrustPerMotorN.toFixed(0)} N</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Kapasitas baterai</span>
                  <strong>{results.batteryCapacityAh.toFixed(1)} Ah</strong>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Motor</p>
            <h3 className="mt-3 text-xl font-bold text-emerald-300">
              {results.thrustPerMotorKg > 3 ? "T-Motor 5008/700" : "T-Motor 3510/400"}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Rekomendasi thrust per motor {results.thrustPerMotorKg.toFixed(1)} kgf.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Propeller</p>
            <h3 className="mt-3 text-xl font-bold text-cyan-300">
              {propDiameter >= 18 ? "18-20 inch" : propDiameter >= 13 ? "13-15 inch" : "10-12 inch"}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Cocok untuk kompromi antara lift dan efisiensi.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">ESC</p>
            <h3 className="mt-3 text-xl font-bold text-violet-300">
              {results.escAmp.toFixed(0)}A
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Pilih ESC dengan headroom 20-30% dari kebutuhan arus puncak.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Battery</p>
            <h3 className="mt-3 text-xl font-bold text-amber-300">
              {batteryVoltage}S {Math.max(6, results.batteryCapacityAh).toFixed(0)}Ah
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Rekomendasi kapasitas berdasarkan target durasi dan berat payload.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Rekomendasi komponen</h2>
            <Link
              href="/katalog"
              className="text-sm font-semibold text-blue-400 hover:text-blue-300"
            >
              Lihat semua katalog →
            </Link>
          </div>

          {status === "loading" && (
            <p className="text-slate-400" role="status">
              Memuat rekomendasi dari Supabase...
            </p>
          )}
          {status === "error" && (
            <p className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200" role="alert">
              {error}
            </p>
          )}
          {status === "success" && products.length === 0 && (
            <p className="text-slate-400">
              Belum ada produk di katalog Supabase.
            </p>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {recommendedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-blue-500/50 transition"
              >
                <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-blue-300">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-slate-100">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.specs}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-400">{item.price}</span>
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500"
                    >
                      Beli
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
