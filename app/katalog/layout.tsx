import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Katalog Perangkat & Komponen | BurnoTech",
  description:
    "Katalog perangkat dan komponen pilihan, lengkap dengan spesifikasi dan tautan ke marketplace.",
};

export default function KatalogLayout({ children }: { children: ReactNode }) {
  return children;
}
