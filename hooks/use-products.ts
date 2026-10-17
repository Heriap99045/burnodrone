"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { getProducts } from "@/lib/products";

type ProductsState =
  | { status: "loading"; products: Product[]; error: null }
  | { status: "success"; products: Product[]; error: null }
  | { status: "error"; products: Product[]; error: string };

// initialProducts: data yang sudah diambil saat build. Jika ada, halaman langsung tampil
// tanpa status "memuat", lalu diperbarui diam-diam dengan data terbaru dari database.
export function useProducts(initialProducts: Product[] = []) {
  const [state, setState] = useState<ProductsState>(() =>
    initialProducts.length > 0
      ? { status: "success", products: initialProducts, error: null }
      : { status: "loading", products: [], error: null },
  );

  useEffect(() => {
    let active = true;

    getProducts()
      .then((products) => {
        if (active) {
          setState({ status: "success", products, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!active) return;
        // Data awal sudah tampil: jangan ganti dengan pesan galat.
        if (initialProducts.length > 0) return;
        setState({
          status: "error",
          products: [],
          error:
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat memuat katalog.",
        });
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
