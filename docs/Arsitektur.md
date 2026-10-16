# Arsitektur dan Rencana Implementasi

## 1. Keputusan Arsitektur

Gunakan **modular monolith**: satu backend Express dengan modul yang terorganisasi, satu database PostgreSQL, dan satu aplikasi React. Ini lebih mudah dipahami dan di-deploy oleh pemula daripada microservices.

### Tech stack

| Area | Teknologi | Alasan |
|---|---|---|
| Frontend | React + Vite | Sudah pernah dipelajari dan cepat untuk development |
| Styling | Tailwind CSS atau CSS Modules | Pilih satu; hindari menghabiskan waktu mencoba banyak library |
| Routing FE | React Router | Navigasi antarhalaman |
| API client | `fetch` bawaan atau Axios | Pilih satu |
| Backend | Node.js + Express | Jalur belajar utama |
| Database | PostgreSQL | Relasi, constraint, dan transaksi |
| Database access | `pg` (node-postgres) untuk awal | Membantu memahami SQL sebelum ORM |
| Validation | Zod atau Joi | Pilih satu untuk validasi server |
| Authentication | `bcrypt`/`bcryptjs` + JWT atau session | Pilih strategi dan dokumentasikan; jangan menyimpan password plaintext |
| Testing backend | Vitest/Jest + Supertest | Test service dan endpoint |
| API docs | Swagger UI + OpenAPI | Dokumentasi endpoint yang bisa dicoba |
| API manual testing | Postman atau Bruno | Menguji request selama pengembangan |
| Version control | Git + GitHub | Riwayat kerja dan portfolio |
| Deployment | Penyedia yang mendukung Node.js, React static hosting, dan PostgreSQL | Pilih berdasarkan kuota, biaya, dan region yang tersedia |
| Container (tahap akhir) | Docker Compose | Opsional setelah aplikasi lokal stabil |

**Jangan menambahkan TypeScript, Prisma, Redux, Redis, atau Docker sejak hari pertama.** Tambahkan hanya jika fondasi aplikasi berjalan dan kamu memahami kebutuhan yang diselesaikannya.

## 2. Gambaran Arsitektur

```text
Browser
  |
  v
React + Vite
  | HTTP/JSON
  v
Express API
  |
  +--> Routes
  +--> Middleware (auth, role, validation, error)
  +--> Controllers (HTTP request/response)
  +--> Services (business rules)
  +--> Repositories / SQL queries
  |
  v
PostgreSQL
  +--> users
  +--> products
  +--> stock_transactions
```

### Alur permintaan

1. Pengguna melakukan aksi dari React.
2. Frontend mengirim HTTP request ke endpoint API.
3. Middleware memeriksa autentikasi, role, dan input sesuai kebutuhan.
4. Controller meneruskan pekerjaan ke service.
5. Service menjalankan aturan bisnis dan memanggil akses database.
6. Database menyimpan atau mengambil data.
7. API mengirim status HTTP dan JSON yang konsisten.
8. React memperbarui tampilan serta menampilkan loading/error/success.

## 3. Rencana Implementasi Bertahap

### Fase 0 — Setup dan pemahaman 
- Buat repository GitHub.
- Buat folder `client` dan `server`.
- Buat `.gitignore` dan `.env.example`.
- Pastikan frontend dan backend dapat berjalan lokal.
- Tulis keputusan awal di README.

**Selesai jika:** aplikasi React tampil dan endpoint `GET /api/health` mengembalikan status sehat.

### Fase 1 — Produk + database 
- Buat database dan tabel `products`.
- Pelajari SQL: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, constraint, parameterized query.
- Buat endpoint daftar, detail, create, update, delete/archive.
- Validasi SKU unik, harga, stok, dan input wajib.
- Tes endpoint melalui Postman/Bruno.

**Selesai jika:** CRUD memakai PostgreSQL dan data bertahan setelah server restart.

### Fase 2 — React terhubung API 
- Buat halaman dashboard, daftar produk, detail/form produk.
- Buat reusable component untuk input, tabel, status, dan dialog konfirmasi.
- Sambungkan API client.
- Tangani loading, error, empty state, dan submit berulang.
- Tambahkan pencarian dan pagination di API serta UI.

**Selesai jika:** perubahan dari UI tersimpan di database dan dapat dilihat kembali.

### Fase 3 — Authentication dan role 
- Buat login dan seed admin awal yang aman.
- Hash password.
- Implementasikan middleware autentikasi.
- Implementasikan pemeriksaan role admin/staff di backend.
- Lindungi route frontend untuk UX, tetapi tetap andalkan backend sebagai otoritas.

**Selesai jika:** request tanpa autentikasi ditolak dan role yang tidak berhak tidak dapat menjalankan aksi terlarang.

### Fase 4 — Stock transactions 
- Tambahkan endpoint stock-in dan stock-out.
- Simpan transaksi dan perubahan stok secara atomik.
- Cegah stok negatif, termasuk ketika beberapa request berjalan bersamaan.
- Buat halaman riwayat transaksi.

**Selesai jika:** jumlah stok dan histori selalu sesuai dalam test yang relevan.

### Fase 5 — Dashboard dan hardening 
- Buat summary dari data nyata.
- Tambahkan filter stok rendah, pagination, dan sorting allowlist.
- Samakan format error.
- Tambahkan validasi, CORS yang dibatasi, dan rate limit pada login.
- Periksa akses data dan input tidak tepercaya.

### Fase 6 — Testing dan dokumentasi 
- Unit test service stok.
- Integration test untuk auth, products, dan transaksi stok.
- Test akses admin/staff dan kasus stok tidak cukup.
- Dokumentasikan endpoint dengan OpenAPI/Swagger.
- Tambahkan ERD dan contoh request/response di README.

### Fase 7 — Deployment dan portfolio 
- Deploy database, API, dan frontend.
- Atur environment variables di dashboard hosting.
- Atur CORS berdasarkan domain frontend.
- Uji alur utama di deployment.
- Tambahkan screenshot, demo URL, dan instruksi lokal di README.

### Fase 8 — Buffer, perbaikan, dan melamar 
- Perbaiki bug berdasarkan testing.
- Pastikan repository bersih dan mudah dijalankan.
- Latih penjelasan arsitektur dan keputusan teknis.
- Mulai melamar sejak MVP cukup berfungsi; jangan menunggu semua fitur selesai.

## 4. Struktur Folder yang Disarankan

```text
inventory-management/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── http.js
│   │   │   ├── auth.api.js
│   │   │   ├── products.api.js
│   │   │   └── transactions.api.js
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   └── products/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   └── stock-transactions/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   └── database.js
│   │   ├── middleware/
│   │   │   ├── authenticate.js
│   │   │   ├── authorize.js
│   │   │   ├── validate.js
│   │   │   └── error-handler.js
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── auth.controller.js
│   │   │   │   └── auth.service.js
│   │   │   ├── products/
│   │   │   │   ├── products.routes.js
│   │   │   │   ├── products.controller.js
│   │   │   │   ├── products.service.js
│   │   │   │   ├── products.repository.js
│   │   │   │   └── products.schema.js
│   │   │   ├── transactions/
│   │   │   │   ├── transactions.routes.js
│   │   │   │   ├── transactions.controller.js
│   │   │   │   ├── transactions.service.js
│   │   │   │   └── transactions.repository.js
│   │   │   └── dashboard/
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   ├── docs/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── products.test.js
│   │   └── transactions.test.js
│   ├── .env.example
│   └── package.json
├── docs/
│   ├── PRD.md
│   ├── Arsitektur.md
│   └── Workflow.md
├── .gitignore
└── README.md
```

### Tanggung jawab folder backend
- `routes`: deklarasi endpoint dan middleware yang dipasang.
- `controllers`: membaca request, memanggil service, menentukan response.
- `services`: aturan bisnis; misalnya memastikan stok cukup.
- `repositories`: query SQL dan interaksi database.
- `middleware`: autentikasi, otorisasi, validasi, dan error handler.
- `db/migrations`: perubahan skema database yang bisa dilacak.
- `db/seeds`: data awal untuk development.
- `tests`: pengujian otomatis.

Struktur ini adalah tujuan akhir yang dapat dicapai bertahap. Tidak perlu membuat semua file kosong pada hari pertama; buat folder ketika mulai membutuhkan tanggung jawab tersebut.

## 5. Konvensi API

- Prefix API: `/api`.
- JSON untuk request dan response.
- Gunakan status HTTP secara konsisten.
- Gunakan parameterized SQL; jangan menyusun SQL dengan menyambungkan input pengguna.
- Gunakan sorting allowlist, bukan menerima nama kolom sembarang.
- Pagination memakai `page` dan `limit`, dengan batas maksimum `limit`.
- Simpan rahasia hanya di environment variables.

Contoh response sukses:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "KB-001",
    "name": "Keyboard Mechanical",
    "stock": 20
  }
}
```

Contoh response error:

```json
{
  "success": false,
  "message": "SKU already exists",
  "code": "DUPLICATE_SKU"
}
```

## 6. Risiko Teknis yang Harus Diingat

1. Jangan mempercayai validasi frontend sebagai satu-satunya perlindungan.
2. Jangan menyimpan password plaintext.
3. Jangan menghapus histori transaksi ketika produk dihapus; gunakan arsip/soft delete atau tolak penghapusan.
4. Perubahan stok dan histori harus terjadi dalam satu transaksi database.
5. Jangan menaruh rahasia di repository.
6. Jangan menambah library hanya karena populer; pahami masalah yang diselesaikannya.
