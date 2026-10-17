import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { ADSENSE_CLIENT, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BurnoTech | Artikel & Informasi Teknologi",
  description:
    "Tutorial, panduan, dan wawasan seputar teknologi: drone dan UAV, elektronik, perangkat cerdas, hingga inovasi digital.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
  },
  // Penanda kepemilikan situs untuk Google AdSense.
  other: { "google-adsense-account": ADSENSE_CLIENT },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Kode AdSense memakai tag script biasa agar terbaca saat Google memeriksa situs. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
