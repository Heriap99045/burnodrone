"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  TOPIC_CATEGORIES,
  TUTORIAL_CATEGORY,
  categoryHref,
} from "@/lib/categories";

function canHover(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches
  );
}

// Dropdown "Teknologi": terbuka saat kursor di atasnya (desktop) atau saat diketuk (layar sentuh).
export function TechMenu({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const item =
    "block whitespace-nowrap rounded-md px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-blue-400";
  const divider = <div className="mx-1.5 my-1 h-px bg-slate-700" />;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => canHover() && setOpen(true)}
      onMouseLeave={() => canHover() && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => (canHover() ? setOpen(true) : setOpen((o) => !o))}
        className={`inline-flex items-center gap-1.5 ${
          active ? "font-semibold text-blue-400" : "transition hover:text-blue-400"
        }`}
      >
        Teknologi
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 3.5l3 3 3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 pt-3 md:left-0 md:right-auto">
          <div className="min-w-52 rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl">
            <Link
              href="/artikel"
              onClick={() => setOpen(false)}
              className={`${item} font-bold text-slate-100`}
            >
              Semua Artikel
            </Link>
            {divider}
            {TOPIC_CATEGORIES.map((c) => (
              <Link
                key={c}
                href={categoryHref(c)}
                onClick={() => setOpen(false)}
                className={item}
              >
                {c}
              </Link>
            ))}
            {divider}
            <Link
              href={categoryHref(TUTORIAL_CATEGORY)}
              onClick={() => setOpen(false)}
              className={item}
            >
              {TUTORIAL_CATEGORY}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
