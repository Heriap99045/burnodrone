import { getProductsForBuild } from "@/lib/products-server";
import { CatalogView } from "./catalog-content";

export default async function CatalogPage() {
  const initialProducts = await getProductsForBuild();
  return <CatalogView initialProducts={initialProducts} />;
}
