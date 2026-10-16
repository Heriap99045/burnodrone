import Link from "next/link";
import { NAV_CATEGORIES, categoryHref, categorySlug } from "@/lib/categories";

export function CategoryTabs({ activeSlug }: { activeSlug?: string }) {
  const tabs = [
    { label: "Semua", href: "/artikel", slug: undefined as string | undefined },
    ...NAV_CATEGORIES.map((c) => ({
      label: c,
      href: categoryHref(c),
      slug: categorySlug(c) as string | undefined,
    })),
  ];

  return (
    <nav
      aria-label="Kategori artikel"
      className="mb-10 flex flex-wrap justify-center gap-2"
    >
      {tabs.map((t) => {
        const on = t.slug === activeSlug;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={on ? "page" : undefined}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              on
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-slate-700 bg-slate-800 text-slate-300 hover:border-blue-500/60 hover:text-blue-300"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
