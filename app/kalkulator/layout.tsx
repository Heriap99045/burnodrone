import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Kalkulator Setup Drone | BurnoTech",
  description:
    "Hitung kebutuhan setup drone: bobot, daya, dan rekomendasi komponen yang sesuai.",
};

export default function KalkulatorLayout({ children }: { children: ReactNode }) {
  return children;
}
