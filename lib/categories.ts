// Kategori yang tampil di menu "Teknologi". Nama harus persis sama dengan kategori artikel di admin.
export const TOPIC_CATEGORIES = [
  "Drone & UAV",
  "Elektronik & IoT",
  "Perangkat Cerdas",
  "Inovasi Digital",
] as const;

export const TUTORIAL_CATEGORY = "Tutorial & Panduan";

export const NAV_CATEGORIES: string[] = [...TOPIC_CATEGORIES, TUTORIAL_CATEGORY];

// "Drone & UAV" -> "drone-dan-uav"
export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryHref(name: string): string {
  return `/artikel/kategori/${categorySlug(name)}`;
}
