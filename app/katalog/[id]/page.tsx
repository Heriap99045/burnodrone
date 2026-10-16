import { seededProductIds } from "@/data/product-ids";
import ProductDetail from "@/app/katalog/ProductDetail";
import { SiteHeader } from "@/components/site-header";

export function generateStaticParams() {
  return seededProductIds.map((id) => ({ id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader active="katalog" />
      <ProductDetail productId={id} />
    </div>
  );
}
