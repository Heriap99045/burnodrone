import { getProductsForBuild } from "@/lib/products-server";
import CalculatorClient from "./kalkulator-client";

export default async function CalculatorPage() {
  const initialProducts = await getProductsForBuild();
  return <CalculatorClient initialProducts={initialProducts} />;
}
