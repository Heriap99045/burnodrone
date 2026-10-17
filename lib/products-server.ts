import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/data/products";

type Row = Omit<Product, "affiliateUrl"> & { affiliate_url: string };

// Dipanggil saat build (server) agar halaman langsung berisi produk tanpa menunggu jaringan.
// Jika gagal, kembali ke daftar kosong dan halaman memuat data dari browser seperti biasa.
export const getProductsForBuild = cache(async (): Promise<Product[]> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return [];

  try {
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("products")
      .select("id, name, category, specs, price, image, affiliate_url")
      .order("name");
    if (error) throw error;

    return (data as Row[]).map(({ affiliate_url, ...product }) => ({
      ...product,
      affiliateUrl: affiliate_url,
    }));
  } catch (err) {
    console.warn("Gagal mengambil produk saat build:", err);
    return [];
  }
});
