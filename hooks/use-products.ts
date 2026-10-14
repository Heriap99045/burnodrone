"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { getProducts } from "@/lib/products";

type ProductsState =
  | { status: "loading"; products: Product[]; error: null }
  | { status: "success"; products: Product[]; error: null }
  | { status: "error"; products: Product[]; error: string };

export function useProducts() {
  const [state, setState] = useState<ProductsState>({
    status: "loading",
    products: [],
    error: null,
  });

  useEffect(() => {
    let active = true;

    getProducts()
      .then((products) => {
        if (active) {
          setState({ status: "success", products, error: null });
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            status: "error",
            products: [],
            error:
              error instanceof Error
                ? error.message
                : "Terjadi kesalahan saat memuat katalog.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
