import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { articles as staticArticles } from "@/data/articles";

export interface PublicArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string; // Markdown
}

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
  published_at: string | null;
  created_at: string;
};

const dateFormat = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

function readTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min baca`;
}

// Cadangan: artikel lama di data/articles.ts, dipakai jika database kosong atau tidak terjangkau.
function fromStatic(): PublicArticle[] {
  return staticArticles.map((a) => ({ ...a, content: a.content.join("\n\n") }));
}

// Dipanggil saat build (server). Halaman publik dibuat statis, jadi artikel baru
// tampil setelah situs di-build ulang (otomatis lewat Vercel Deploy Hook dari API admin).
export const getArticles = cache(async (): Promise<PublicArticle[]> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return fromStatic();

  try {
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase
      .from("articles")
      .select(
        "id, slug, title, excerpt, category, image, content, published_at, created_at",
      )
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return fromStatic();

    return (data as Row[]).map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      category: r.category,
      date: dateFormat.format(new Date(r.published_at ?? r.created_at)),
      readTime: readTime(r.content),
      image: r.image,
      content: r.content,
    }));
  } catch (err) {
    console.warn("Gagal mengambil artikel dari Supabase, memakai data cadangan:", err);
    return fromStatic();
  }
});

export async function getArticleBySlug(
  slug: string,
): Promise<PublicArticle | undefined> {
  return (await getArticles()).find((a) => a.slug === slug);
}
