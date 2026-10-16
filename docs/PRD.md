# Product Requirements Document (PRD)
## Inventory Management System

**Status:** Draft v1.0  
**Product type:** Portfolio project — Full-stack web application  
**Primary goal:** Demonstrate practical frontend and backend engineering skills for internship applications.

---

## 1. Ringkasan Produk

Inventory Management System adalah aplikasi web untuk membantu pengguna mengelola data produk, memantau jumlah stok, mencatat barang masuk dan keluar, serta melihat riwayat perubahan stok.

Aplikasi dibuat sebagai satu proyek full-stack: React untuk dashboard, Node.js + Express untuk REST API, dan PostgreSQL untuk penyimpanan data.

## 2. Masalah yang Ingin Diselesaikan

Pencatatan stok secara manual dapat membuat data sulit dicari, riwayat perubahan tidak jelas, dan risiko stok menjadi tidak konsisten. Aplikasi ini menyediakan sumber data terpusat dan jejak transaksi untuk setiap perubahan stok.

## 3. Tujuan dan Ukuran Keberhasilan

### Tujuan
- Pengguna dapat mengelola produk melalui antarmuka web.
- Pengguna yang berwenang dapat mencatat barang masuk dan keluar.
- Sistem menolak transaksi yang akan membuat stok negatif.
- Perubahan stok memiliki catatan transaksi.
- Aplikasi dapat dijalankan secara lokal dan diakses melalui deployment demo.

### Kriteria keberhasilan MVP
- CRUD produk tersimpan di PostgreSQL, bukan hanya di state frontend.
- Data tetap tersedia setelah server dimulai ulang.
- Pengguna dapat login dan endpoint terlindungi menolak permintaan tanpa autentikasi.
- Barang masuk/keluar memperbarui stok dan mencatat riwayat dalam satu transaksi database.
- Pencarian, filter, dan pagination berfungsi.
- README menjelaskan instalasi, konfigurasi, endpoint, dan cara menjalankan test.
- Demo memiliki URL frontend dan backend yang dapat diakses, jika layanan deployment yang dipilih mendukungnya.

## 4. Pengguna dan Hak Akses

### Admin
- Login dan melihat dashboard.
- Membuat, melihat, mengubah, dan menghapus produk.
- Mencatat barang masuk dan keluar.
- Melihat riwayat transaksi stok.
- Mengelola akun pengguna jika fitur ini selesai di tahap lanjutan.

### Staff
- Login dan melihat dashboard.
- Melihat daftar dan detail produk.
- Mencatat barang masuk dan keluar.
- Melihat riwayat transaksi.
- Tidak boleh menghapus produk atau mengelola akun pengguna.

**Catatan:** Hak akses harus ditegakkan di backend. Menyembunyikan tombol di React saja tidak cukup.

## 5. Ruang Lingkup

### MVP — wajib
1. Autentikasi: register awal/admin seed, login, logout sisi klien, endpoint profil saat ini.
2. Otorisasi role `admin` dan `staff`.
3. CRUD produk.
4. SKU unik.
5. Validasi input dan format error yang konsisten.
6. Transaksi stok masuk dan keluar.
7. Riwayat transaksi stok.
8. Pencarian, filter, sorting terbatas, dan pagination produk.
9. Dashboard ringkas: jumlah produk, total unit stok, produk stok rendah, transaksi terbaru.
10. Automated tests untuk logika penting dan endpoint utama.
11. Dokumentasi API dengan OpenAPI/Swagger.
12. README, ERD, contoh environment file, dan instruksi setup.

### Di luar ruang lingkup MVP
- Multi-gudang dan transfer antar-gudang.
- Barcode/QR scanning.
- Integrasi akuntansi atau marketplace.
- Prediksi permintaan dengan machine learning.
- Pembayaran dan checkout e-commerce.
- Notifikasi email/SMS.
- Aplikasi mobile.
- Microservices atau Kubernetes.

## 6. Fitur dan Persyaratan Fungsional

### F-01 — Autentikasi
- Pengguna dapat login dengan email dan password.
- Password disimpan dalam bentuk hash menggunakan library yang sesuai, bukan plaintext.
- Endpoint privat memerlukan autentikasi.
- Respons tidak boleh membocorkan password hash atau token rahasia.
- Strategi token (misalnya JWT) dan penyimpanannya didokumentasikan.

### F-02 — Produk
Setiap produk minimal memiliki:
- `id`
- `sku` (unik)
- `name`
- `description` (opsional)
- `price` (nilai non-negatif; gunakan tipe numerik yang sesuai)
- `stock` (bilangan bulat non-negatif)
- `low_stock_threshold`
- `created_at`
- `updated_at`

Pengguna berwenang dapat membuat, melihat, dan mengubah produk. Penghapusan produk yang sudah memiliki riwayat transaksi sebaiknya dibatasi; gunakan soft delete atau penolakan penghapusan agar histori tidak rusak.

### F-03 — Transaksi Stok
Setiap transaksi minimal mencatat:
- `id`
- `product_id`
- `user_id`
- `type`: `IN` atau `OUT`
- `quantity`: bilangan bulat positif
- `note` (opsional)
- `created_at`

Aturan:
- Kuantitas harus lebih besar dari nol.
- Transaksi `IN` menambah stok.
- Transaksi `OUT` mengurangi stok.
- Stok tidak boleh menjadi negatif.
- Perubahan stok dan penyimpanan histori harus atomik dalam satu transaksi database.
- Riwayat transaksi tidak boleh diedit atau dihapus melalui API biasa.

### F-04 — Dashboard
Menampilkan:
- Jumlah produk aktif.
- Total unit stok.
- Jumlah produk di bawah atau sama dengan ambang stok rendah.
- Transaksi terbaru.
- Data diambil dari API, bukan angka hard-coded.

### F-05 — Pencarian dan Pagination
- Cari produk berdasarkan nama atau SKU.
- Filter stok rendah.
- Pagination dengan parameter `page` dan `limit`.
- Sorting hanya pada field yang diizinkan.

### F-06 — Validasi dan Error
- Validasi dilakukan di server, meskipun frontend juga memvalidasi.
- SKU duplikat menghasilkan respons konflik yang jelas.
- ID yang tidak ditemukan menghasilkan `404`.
- Input tidak valid menghasilkan `400` atau `422` sesuai konvensi proyek.
- Kesalahan tak terduga ditangani middleware dan tidak mengirim stack trace ke klien pada production.

## 7. Persyaratan Nonfungsional

- **Keamanan:** hash password, validasi input, parameterized SQL, rahasia di environment variables, pembatasan CORS, dan rate limiting login sebagai peningkatan yang disarankan.
- **Konsistensi data:** transaksi stok memakai transaksi database dan strategi concurrency yang sesuai.
- **Maintainability:** pisahkan routes, controllers, services, dan akses database dengan batas tanggung jawab yang jelas.
- **Testability:** logika bisnis penting dapat diuji otomatis.
- **Usability:** status loading, error, sukses, dan empty state jelas.
- **Portability:** tersedia `.env.example`, instruksi setup, dan migrasi/seed database.
- **Accessibility dasar:** label form, navigasi keyboard, kontras yang layak, dan pesan error yang dapat dipahami.

## 8. Rancangan Endpoint Awal

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Profil pengguna aktif |
| GET | `/api/dashboard/summary` | Ringkasan dashboard |
| GET | `/api/products` | Daftar produk + search/filter/pagination |
| POST | `/api/products` | Membuat produk |
| GET | `/api/products/:id` | Detail produk |
| PATCH | `/api/products/:id` | Mengubah field produk |
| DELETE | `/api/products/:id` | Menghapus produk jika aman |
| POST | `/api/products/:id/stock-in` | Mencatat barang masuk |
| POST | `/api/products/:id/stock-out` | Mencatat barang keluar |
| GET | `/api/stock-transactions` | Riwayat transaksi + filter/pagination |

Semua endpoint selain login memerlukan autentikasi, kecuali jika keputusan implementasi mendokumentasikan pengecualian yang jelas. Endpoint perubahan data juga memerlukan pemeriksaan role.

## 9. Model Data Awal

### `users`
- `id` (PK)
- `name`
- `email` (unique)
- `password_hash`
- `role` (`admin` atau `staff`)
- `created_at`
- `updated_at`

### `products`
- `id` (PK)
- `sku` (unique)
- `name`
- `description` (nullable)
- `price`
- `stock` (integer, >= 0)
- `low_stock_threshold` (integer, >= 0)
- `is_active`
- `created_at`
- `updated_at`

### `stock_transactions`
- `id` (PK)
- `product_id` (FK)
- `user_id` (FK)
- `type` (`IN` / `OUT`)
- `quantity` (integer, > 0)
- `note` (nullable)
- `created_at`

Relasi:
- Satu user dapat membuat banyak transaksi.
- Satu produk dapat memiliki banyak transaksi.
- Produk yang memiliki histori transaksi tidak dihapus secara permanen melalui alur normal.

## 10. Kriteria Penerimaan Utama

- [ ] Admin dapat login dan membuka dashboard.
- [ ] Pengguna tanpa token tidak dapat memanggil endpoint privat.
- [ ] Staff tidak dapat menjalankan aksi khusus admin.
- [ ] SKU duplikat ditolak.
- [ ] Produk dapat dibuat, dilihat, diperbarui, dan diarsipkan/dihapus dengan aturan yang aman.
- [ ] Barang masuk memperbarui stok dan menyimpan histori.
- [ ] Barang keluar dengan jumlah melebihi stok ditolak.
- [ ] Dua permintaan stok bersamaan tidak membuat stok negatif.
- [ ] Pencarian dan pagination menghasilkan data yang benar.
- [ ] Test untuk aturan stok dan akses role lulus.
- [ ] Dokumentasi dan instruksi setup dapat diikuti dari clone repository baru.

## 11. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Scope terlalu besar untuk pemula | Selesaikan CRUD dan database dahulu; fitur tambahan bertahap |
| Terlalu banyak belajar framework | Gunakan satu stack utama selama MVP |
| Bug stok akibat request bersamaan | Gunakan transaksi DB dan locking/conditional update yang benar |
| Kredensial bocor ke Git | Commit `.env.example`, abaikan `.env` |
| Deployment gratis tidur/terbatas | Jelaskan keterbatasan demo di README |
| Hanya mengikuti tutorial | Tulis keputusan teknis dan jelaskan kode sendiri |

## 12. Definisi Selesai

Fitur dianggap selesai jika:
1. Berfungsi dari UI atau API sesuai kebutuhan.
2. Validasi dan kasus gagal ditangani.
3. Tes relevan ditulis dan lulus.
4. Dokumentasi diperbarui.
5. Tidak ada rahasia atau kredensial di repository.
6. Perubahan sudah di-commit dengan pesan yang jelas.
