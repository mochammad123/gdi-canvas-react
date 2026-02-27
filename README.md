<div align="center">
	<img src="https://s3.knitto.co.id/web/knitto.png" width="150"/>
	<h1>Template React Knitto Website</h1>
	<div>Repository ini merupakan template atau boilerplate untuk frontend knitto (website), menggunakan react sebagai library, vite sebagai builder website dan tailwind sebagai pembangun css</div>
</div>

# Struktur Projek

```
/ root directory
├─ public
|  ├─ fonts                        # Font yang digunakan
|  └─ svg                          # Svg yang digunakan untuk diluar src
├─ src                             # Source aplikasi
|  ├─ assets                       # Assets yang digunakan untuk aplikasi
|  ├─ components                   # Component yang di share
|  |  ├─ [nama-component]          # Folder component yang di share
|  |  ├─ [...]
|  |  └─ ui                        # Component ui kit yang sering digunakan
|  |     ├─ [nama-component-kit]   # Folder component ui kit
|  |     └─ [...]
|  ├─ lib                          # Kumpulan lib
|  |  ├─ utils                     # Folder util atau function (folder)
|  |  ├─ hooks                     # Function (logic) state, state global yang di share (folder)
|  |  ├─ variabels                 # Kelompok variabel global atau konstan
|  |  └─ [...]
|  ├─ pages                        # Kumpulan page dan sub-page (folder)
|  |  ├─ [nama-page]               # Folder page sesuai dengan path (folder)
|  |  |  ├─ components             # Component yang digunakan oleh page (folder)
|  |  |  ├─ hooks                  # Hook atau function yang digunakan untuk page (folder)
|  |  |  ├─ index.tsx              # Index pages atau sub page menggunakan router dom
|  |  |  └─ [nama-sub-page]        # Kumpulan sub-page (folder) sesuai dengan path
|  |  |     ├─ components          # Component yang digunakan oleh sub-page (folder)
|  |  |     ├─ hooks               # Hook atau function yang digunakan untuk sub-page (folder)
|  |  |     ├─ index.tsx           # Index sub page
|  |  |     └─ [...]
|  |  └─ [...]
|  ├─ redux                        # Kumpulan page dan sub-page (folder)
|  |  ├─ api                       # Kumpulan useQuery dan mutation beserta base query (folder)
|  |  ├─ slice                     # Kumpulan slice untuk redux
|  |  └─ store.ts                  # Definisi redux
|  ├─ styles                       # Kumpulan style dan font yang di custome (folder)
|  ├─ test                         # Kumpulan file test (folder)
|  └─ types                        # Kumpulan types atau interface (folder)
|
└─ plugins                         # Kumpulan plugins atau style yang khusus untuk design system knitto

```

**`Keterangan`**

- Penggunaan nama file atau folder ketika ada spasi menggunakan `kebab case`.
- Penggunaan variabel menggunakan `camel case` dan untuk global menggunakan `upper case`.
- Masukan ke dalam folder jika component tersebut mempunyai tujuan yang sama.
- Pastikan untuk mengaktifkan eslint dan prettier pada vscode atau IDE yang digunakan.

# Requirements (Tech Stack)

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Tool Kit](https://redux-toolkit.js.org/)
- [PNPM](https://pnpm.io/)
- [Tailwind](https://tailwindcss.com/)

**Versi minimum:**

- Node.js: >= 20
- pnpm: >= 9.15

### Penggunaan NPM github

Repository ini menggunakan library khusus [**`Knitto UI`**](https://github.com/knittotextile/knitto-desgin-system/pkgs/npm/react-ui) secara private, gunakan panduan berikut untuk cara install library [**`Working with the npm registry`**](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

# Dokumentasi Penggunaan

- [Knitto Table](https://github.com/knittotextile/knitto-react-template/blob/feat/virtual-table-base-tanstack/src/components/ui/knitto-table/README.md)
- [Big Calendar](https://github.com/knittotextile/knitto-react-template/blob/feat/big-calendar/src/components/ui/big-calendar/README.md)

---

# Penggunaan dan Pengisian `entrypoint.sh` untuk Environment Variable

Untuk deployment (misal pada Docker), environment variable yang digunakan aplikasi akan digenerate ke file JS saat build. Proses ini dapat menggunakan script `entrypoint.sh` yang akan membuat file env JS sesuai dengan environment yang diberikan.

Contoh isi `entrypoint.sh`:

```sh
#!/bin/sh

cat <<EOF >/usr/share/nginx/html/generated-env.js
window.__ENV__ = {
  VITE_APP_NAME:"${VITE_APP_NAME}",
  VITE_BASE_API_URL:"${VITE_BASE_API_URL}",
  VITE_ENVIRONTMENT:"${VITE_ENVIRONTMENT}",
  VITE_DOCUMENTATION_URL:"${VITE_DOCUMENTATION_URL}",
};
EOF

exec "$@"
```

**Langkah Penggunaan:**

1. Pastikan environment variable (`VITE_APP_NAME`, `VITE_BASE_API_URL`, dll) sudah di-set pada environment container/server Anda.
2. Saat container dijalankan, script `entrypoint.sh` akan membuat file JS env di direktori web server (misal: `/usr/share/nginx/html/`).
3. File JS ini akan di-load oleh aplikasi frontend secara otomatis.
4. Nama file JS env yang dihasilkan adalah `generated-env.js` (sudah fixed), sehingga konsisten antara plugin build dan script deployment.

**Catatan:**

- File env JS akan digenerate secara otomatis saat proses build menggunakan plugin custom (lihat `generate-env-plugin.ts`).
- Pastikan penamaan dan lokasi file sesuai dengan yang diharapkan aplikasi (lihat juga konfigurasi plugin dan Dockerfile).

---

# Cara Menjalankan Project (Development)

Untuk menjalankan project pada mode development:

```sh
pnpm install
pnpm dev
```

Secara default, environment variable akan di-load dari file `.env` atau `.env.local` pada root project. Tidak perlu menggunakan `entrypoint.sh` pada mode development, cukup pastikan file env sudah terisi sesuai kebutuhan.

Jika ingin menambah/mengubah variable, edit file `.env` lalu restart dev server.
