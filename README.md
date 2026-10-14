## BurnoDrone

Direktori rekomendasi komponen dan panduan untuk drone dan UAV, dibuat dengan Next.js.

### Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

### Koneksi katalog ke Supabase

1. Buat project Supabase.
2. Buka **SQL Editor**, lalu jalankan isi [`supabase/schema.sql`](./supabase/schema.sql).
   Skrip ini membuat tabel `products`, mengaktifkan Row Level Security (RLS),
   memberi akses baca publik saja, dan memasukkan empat produk awal.
3. Salin `.env.example` menjadi `.env.local`, lalu isi nilai **Project URL**
   dan **anon/public key** dari **Project Settings → API Keys**:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Jalankan ulang `npm run dev`. Katalog, halaman utama, detail produk, dan
   rekomendasi pada kalkulator akan membaca data langsung dari tabel tersebut.
5. Untuk GitHub Pages, tambahkan repository **Actions variables**
   `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`, lalu jalankan
   ulang workflow deployment agar nilainya masuk ke build statis.

Browser hanya menggunakan anon/public key dan kebijakan database hanya
mengizinkan pembacaan. **Jangan gunakan atau publikasikan `service_role` key.**
Jika konfigurasi belum diisi atau query gagal, halaman menampilkan pesan error
dan tidak mengganti data dengan katalog statis.

### Deploy ke GitHub Pages

Proyek ini mengekspor situs statis ke folder `out/`. Workflow GitHub Actions di `.github/workflows/deploy.yml` akan membangun dan menerbitkan situs setiap kali ada push ke branch `main`.

Di pengaturan repository, buka **Settings → Pages** dan pilih **GitHub Actions** sebagai sumber deployment. Situs kemudian tersedia di `https://heriap99045.github.io/burnodrone/`.
