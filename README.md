## BurnoDrone

Direktori rekomendasi komponen dan panduan untuk drone dan UAV, dibuat dengan Next.js.

### Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

### Deploy ke GitHub Pages

Proyek ini mengekspor situs statis ke folder `out/`. Workflow GitHub Actions di `.github/workflows/deploy.yml` akan membangun dan menerbitkan situs setiap kali ada push ke branch `main`.

Di pengaturan repository, buka **Settings → Pages** dan pilih **GitHub Actions** sebagai sumber deployment. Situs kemudian tersedia di `https://heriap99045.github.io/burnodrone/`.
