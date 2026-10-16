export const SITE_NAME = "BurnoTech";

// Alamat utama situs. Bisa diganti lewat NEXT_PUBLIC_SITE_URL (tanpa garis miring di akhir).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.burnotech.com"
).replace(/\/$/, "");

// Situs memakai trailingSlash, jadi alamat kanonik juga diakhiri "/".
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean.endsWith("/") ? clean : `${clean}/`}`;
}
