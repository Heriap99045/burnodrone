import Link from "next/link";
import { NavDropdown } from "@/components/nav-dropdown";
import {
  PRODUCT_CATEGORIES,
  TOPIC_CATEGORIES,
  TUTORIAL_CATEGORY,
  categoryHref,
  productCategoryHref,
} from "@/lib/categories";

type Active = "katalog" | "teknologi" | "about";

// Header bersama untuk semua halaman.
export function SiteHeader({ active }: { active?: Active }) {
  const linkClass = (on: boolean) =>
    on ? "font-semibold text-blue-400" : "transition hover:text-blue-400";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4">
        <Link
          href="/"
          className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-2xl font-bold text-transparent"
        >
          BurnoTech
        </Link>
        <nav
          aria-label="Navigasi utama"
          className="flex items-center gap-x-5 text-sm font-medium text-slate-300"
        >
          <NavDropdown
            label="Katalog"
            active={active === "katalog"}
            allLabel="Semua Produk"
            allHref="/katalog"
            items={PRODUCT_CATEGORIES.map((c) => ({
              label: c,
              href: productCategoryHref(c),
            }))}
          />
          <NavDropdown
            label="Teknologi"
            active={active === "teknologi"}
            allLabel="Semua Artikel"
            allHref="/artikel"
            items={TOPIC_CATEGORIES.map((c) => ({
              label: c,
              href: categoryHref(c),
            }))}
            extraItems={[
              { label: TUTORIAL_CATEGORY, href: categoryHref(TUTORIAL_CATEGORY) },
            ]}
          />
          <Link href="/about" className={linkClass(active === "about")}>
            Tentang Kami
          </Link>
        </nav>
      </div>
    </header>
  );
}
