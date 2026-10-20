/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import ProductDetail from "@/app/katalog/ProductDetail";
import { SiteHeader } from "@/components/site-header";
import { seededProductIds } from "@/data/product-ids";
import { categorySlug } from "@/lib/categories";
import { getProductsForBuild } from "@/lib/products-server";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProductsForBuild();
  const ids = new Set([...seededProductIds, ...products.map((p) => p.id)]);
  return Array.from(ids).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = (await getProductsForBuild()).find((p) => p.id === id);
  if (!product) return { title: `Produk | Katalog ${SITE_NAME}` };

  const description = `${product.specs}. Estimasi harga ${product.price}.`.slice(0, 160);
  return {
    title: `${product.name} | Katalog ${SITE_NAME}`,
    description,
    alternates: { canonical: absoluteUrl(`/katalog/${encodeURIComponent(id)}`) },
    openGraph: {
      title: product.name,
      description,
      type: "website",
      url: absoluteUrl(`/katalog/${encodeURIComponent(id)}`),
      siteName: SITE_NAME,
      locale: "id_ID",
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const products = await getProductsForBuild();
  const product = products.find((p) => p.id === id);

  // Data belum tersedia saat build: tampilkan versi yang memuat produk dari browser.
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <SiteHeader active="katalog" />
        <ProductDetail productId={id} />
      </div>
    );
  }

  const sameCategory = products.filter(
    (p) => p.id !== id && p.category === product.category,
  );
  const others = products.filter(
    (p) => p.id !== id && p.category !== product.category,
  );
  const related = [...sameCategory, ...others].slice(0, 4);
  const catHref = `/katalog?kategori=${categorySlug(product.category)}`;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <SiteHeader active="katalog" />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <nav aria-label="Jejak halaman" className="mb-6 text-sm text-slate-400">
          <Link href="/katalog" className="transition hover:text-blue-400">
            Katalog
          </Link>
          <span className="mx-2">/</span>
          <Link href={catHref} className="transition hover:text-blue-400">
            {product.category}
          </Link>
        </nav>

        <div className="grid gap-8 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 md:grid-cols-2 md:p-8">
          <div className="relative h-80 w-full overflow-hidden rounded-xl bg-slate-900">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <Link
                href={catHref}
                className="mb-3 inline-block rounded bg-blue-600/90 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-500"
              >
                {product.category}
              </Link>
              <h1 className="mb-2 text-3xl font-extrabold">{product.name}</h1>
              <p className="mb-6 text-sm text-slate-300">{product.specs}</p>

              <div className="mb-6 border-t border-slate-700/60 py-4">
                <h2 className="mb-2 text-xs uppercase tracking-wider text-slate-400">
                  Estimasi Harga Marketplace
                </h2>
                <div className="text-3xl font-extrabold text-emerald-400">
                  {product.price}
                </div>
              </div>
            </div>

            <div>
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="block w-full rounded-xl bg-emerald-600 px-6 py-3 text-center font-bold text-white transition hover:bg-emerald-500"
              >
                Cek Stok & Beli di Marketplace &rarr;
              </a>
            
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="produk-terkait" className="mt-14">
            <h2
              id="produk-terkait"
              className="mb-6 border-l-4 border-emerald-500 pl-3 text-2xl font-bold"
            >
              Produk Lainnya
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/katalog/${encodeURIComponent(p.id)}/`}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/50 transition hover:border-blue-500/50"
                >
                  <div className="h-36 w-full bg-slate-900">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="mb-1 line-clamp-2 text-sm font-bold text-slate-100">
                      {p.name}
                    </p>
                    <p className="text-sm font-semibold text-emerald-400">{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
