import type { Product } from "@/data/products";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("products")
    .select("id, name, category, specs, price, image, affiliate_url")
    .order("name");

  if (error) {
    console.error("Gagal mengambil katalog:", error.message);
    throw new Error("Katalog belum dapat dimuat. Silakan muat ulang halaman.");
  }

  return data.map(({ affiliate_url, ...product }) => ({
    ...product,
    affiliateUrl: affiliate_url,
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await getSupabaseBrowserClient()
    .from("products")
    .select("id, name, category, specs, price, image, affiliate_url")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Gagal mengambil produk:", error.message);
    throw new Error("Produk belum dapat dimuat. Silakan muat ulang halaman.");
  }

  if (!data) {
    return null;
  }

  const { affiliate_url, ...product } = data;
  return { ...product, affiliateUrl: affiliate_url };
}
