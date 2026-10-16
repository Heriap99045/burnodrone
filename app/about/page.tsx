import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader active="about" />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-4">Tentang BurnoTech</h1>
        <div className="prose prose-invert text-slate-300 space-y-4 text-sm leading-relaxed">
          <p>
            <strong>BurnoTech</strong> adalah portal artikel dan informasi
            teknologi: tutorial, panduan, dan wawasan seputar drone dan UAV,
            elektronik, perangkat cerdas, hingga inovasi digital di Indonesia.
          </p>
          <p>
            Kami menulis untuk para pegiat hobi, engineer, dan perekayasa yang
            ingin memahami teknologi lebih dalam. Katalog kami membantu
            menemukan perangkat dan komponen, lengkap dengan spesifikasi dan
            rujukan toko di marketplace lokal.
          </p>
          <p>
            Sebagian tautan di situs ini adalah tautan afiliasi. Anda tidak
            membayar lebih, dan kami dapat menerima komisi kecil jika Anda
            membeli lewat tautan tersebut.
          </p>
          <div className="border-t border-slate-800 pt-6 mt-8">
            <h2 className="text-lg font-bold text-white mb-2">Hubungi Kami</h2>
            <p className="text-slate-400">
              Email: support@burnodrone.com <br />
              Lokasi: Indonesia
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
