import Link from "next/link";

export default function GuidePage() {
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
            <Link href="/panduan" className="text-blue-400 font-semibold">
              Panduan Rakit
            </Link>
            <Link href="/about" className="hover:text-blue-400">
              Tentang Kami
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-4">
          Panduan Rakit & Integrasi Drone
        </h1>
        <p className="text-slate-400 mb-8">
          Kumpulan dokumentasi teknis, cara wiring, dan panduan ArduPilot untuk
          rakitan custom drone.
        </p>

        <div className="space-y-6">
          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-xl">
            <span className="text-xs font-semibold text-blue-400 uppercase">
              Navigation & Mapping
            </span>
            <h2 className="text-xl font-bold mt-1 mb-2">
              Panduan Setup RTK Emlid Reach M2 di ArduPilot
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Konfigurasi Baud Rate serial port MAVLink, pengaturan injection
              GPS base station via Mission Planner untuk hasil survey ketelitian
              tinggi.
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 p-6 rounded-xl">
            <span className="text-xs font-semibold text-emerald-400 uppercase">
              Payload & Actuator
            </span>
            <h2 className="text-xl font-bold mt-1 mb-2">
              Konfigurasi MKS HV6160 via DroneCAN GUI Tool
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Mengubah Node ID servo CAN bus, kalibrasi batas sudut actuator,
              dan pengujian bus telemetry pada ArduPlane QuadPlane.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
