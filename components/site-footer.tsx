import Link from "next/link";
import { NAV_CATEGORIES, categoryHref } from "@/lib/categories";

const headingClass =
  "text-xs font-semibold uppercase tracking-wider text-slate-200";
const linkClass = "transition hover:text-blue-400";

// Footer bersama, dipasang sekali di app/layout.tsx untuk semua halaman.
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-sm text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-8 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            href="/"
            className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-xl font-extrabold text-transparent"
          >
            BurnoTech
          </Link>
          <p className="mt-3 text-[13px] leading-relaxed">
            Portal artikel dan informasi teknologi: tutorial, panduan, dan
            wawasan seputar drone, elektronik, hingga inovasi digital.
          </p>
        </div>

        <nav aria-label="Jelajahi" className="flex flex-col gap-2.5">
          <span className={headingClass}>Jelajahi</span>
          <Link href="/katalog" className={linkClass}>
            Katalog
          </Link>
          <Link href="/kalkulator" className={linkClass}>
            Kalkulator Drone
          </Link>
          <Link href="/artikel" className={linkClass}>
            Semua Artikel
          </Link>
          <Link href="/about" className={linkClass}>
            Tentang Kami
          </Link>
        </nav>

        <nav aria-label="Kategori teknologi" className="flex flex-col gap-2.5">
          <span className={headingClass}>Teknologi</span>
          {NAV_CATEGORIES.map((c) => (
            <Link key={c} href={categoryHref(c)} className={linkClass}>
              {c}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5">
          <span className={headingClass}>Hubungi Kami</span>
          <a href="mailto:support@burnodrone.com" className={linkClass}>
            support@burnodrone.com
          </a>
          <span>Indonesia</span>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-x-6 gap-y-2 px-4 py-5 text-xs text-slate-500">
          <span>
            © {new Date().getFullYear()} BurnoTech. Seluruh hak cipta
            dilindungi.
          </span>
          <span>Sebagian tautan di situs ini adalah tautan afiliasi.</span>
        </div>
      </div>
    </footer>
  );
}
