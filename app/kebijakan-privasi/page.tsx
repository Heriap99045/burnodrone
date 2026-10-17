import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | BurnoTech",
  description:
    "Kebijakan privasi BurnoTech: data yang dikumpulkan, penggunaan cookie dan iklan Google AdSense, serta tautan afiliasi.",
  alternates: { canonical: absoluteUrl("/kebijakan-privasi") },
};

const h2 = "mt-10 mb-3 text-xl font-bold text-white";
const link = "text-blue-400 underline hover:text-blue-300";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-2 text-3xl font-extrabold">Kebijakan Privasi</h1>
        <p className="mb-8 text-xs text-slate-500">
          Terakhir diperbarui: 17 Oktober 2026
        </p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-300 md:text-base">
          <p>
            Kebijakan ini menjelaskan bagaimana BurnoTech (burnotech.com)
            mengelola informasi pengunjung. Dengan menggunakan situs ini, Anda
            menyetujui kebijakan yang diuraikan di sini.
          </p>

          <h2 className={h2}>Informasi yang kami kumpulkan</h2>
          <p>
            Kami tidak meminta Anda mendaftar atau membuat akun untuk membaca
            artikel dan katalog. Seperti kebanyakan situs web, server kami dan
            layanan pihak ketiga dapat mencatat data teknis kunjungan, misalnya
            alamat IP, jenis peramban dan perangkat, halaman yang dibuka, serta
            waktu kunjungan. Jika Anda menghubungi kami lewat email, kami
            menyimpan alamat email dan isi pesan Anda untuk membalasnya.
          </p>

          <h2 className={h2}>Cookie</h2>
          <p>
            Cookie adalah berkas kecil yang disimpan peramban Anda. Kami dan
            mitra iklan kami memakai cookie untuk menampilkan iklan dan menjaga
            situs berfungsi. Anda dapat menolak atau menghapus cookie melalui
            pengaturan peramban. Sebagian fitur situs mungkin tidak berjalan
            baik tanpa cookie.
          </p>

          <h2 className={h2}>Iklan Google AdSense</h2>
          <p>
            Kami menggunakan Google AdSense untuk menampilkan iklan. Google,
            sebagai pihak ketiga, menggunakan cookie untuk menayangkan iklan
            berdasarkan kunjungan Anda ke situs ini dan situs lain di internet.
            Dengan cookie iklan, Google dan mitranya dapat menayangkan iklan
            kepada Anda berdasarkan kunjungan ke situs kami dan/atau situs
            lain.
          </p>
          <p>
            Anda dapat memilih untuk tidak menerima iklan yang dipersonalisasi
            lewat{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              Setelan Iklan Google
            </a>
            . Anda juga dapat mengunjungi{" "}
            <a
              href="https://www.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              aboutads.info
            </a>{" "}
            untuk menonaktifkan penggunaan cookie oleh vendor pihak ketiga
            lainnya untuk iklan yang dipersonalisasi.
          </p>

          <h2 className={h2}>Tautan afiliasi</h2>
          <p>
            Sebagian tautan di situs ini adalah tautan afiliasi, misalnya ke
            marketplace. Jika Anda membeli melalui tautan tersebut, kami dapat
            menerima komisi kecil tanpa biaya tambahan bagi Anda. Tautan
            afiliasi tidak memengaruhi isi artikel kami.
          </p>

          <h2 className={h2}>Tautan ke situs lain</h2>
          <p>
            Situs kami memuat tautan ke situs pihak ketiga. Kami tidak
            mengendalikan dan tidak bertanggung jawab atas kebijakan privasi
            atau isi situs tersebut. Kami menyarankan Anda membaca kebijakan
            privasi masing-masing situs yang Anda kunjungi.
          </p>

          <h2 className={h2}>Anak-anak</h2>
          <p>
            Situs ini tidak ditujukan bagi anak-anak, dan kami tidak dengan
            sengaja mengumpulkan data pribadi dari anak-anak.
          </p>

          <h2 className={h2}>Perubahan kebijakan</h2>
          <p>
            Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Perubahan
            berlaku sejak dipublikasikan di halaman ini, dan tanggal pembaruan
            di bagian atas akan diubah.
          </p>

          <h2 className={h2}>Hubungi kami</h2>
          <p>
            Pertanyaan tentang kebijakan ini dapat dikirim ke{" "}
            <a href="mailto:support@burnodrone.com" className={link}>
              support@burnodrone.com
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
