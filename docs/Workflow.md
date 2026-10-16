# Workflow Pengembangan

Dokumen ini menjelaskan cara mengerjakan Inventory Management System secara bertahap, menjaga perubahan tetap kecil, dan memastikan setiap fitur bisa diuji.

## 1. Siklus Kerja untuk Setiap Fitur

```text
Pilih satu requirement
        |
        v
Tulis acceptance criteria
        |
        v
Rancang endpoint + data
        |
        v
Implementasikan backend
        |
        v
Tes API secara manual/otomatis
        |
        v
Implementasikan integrasi React
        |
        v
Tes alur end-to-end
        |
        v
Perbarui README/dokumentasi
        |
        v
Commit perubahan
```

Untuk fitur yang tidak membutuhkan UI, seperti validasi service atau migration, langkah frontend boleh dilewati. Untuk fitur yang tidak membutuhkan backend, tetap pastikan kebutuhan dan batasannya jelas.

## 2. Urutan Backlog

### Epic A — Project setup
- [ ] Buat repository GitHub.
- [ ] Setup `client` React + Vite.
- [ ] Setup `server` Node.js + Express.
- [ ] Buat endpoint `GET /api/health`.
- [ ] Tambahkan `.gitignore` dan `.env.example`.
- [ ] Tulis instruksi menjalankan project lokal.

### Epic B — Database dan produk
- [ ] Buat PostgreSQL database.
- [ ] Buat migration tabel `products`.
- [ ] Implementasikan repository/query SQL produk.
- [ ] Implementasikan `GET /api/products`.
- [ ] Implementasikan `GET /api/products/:id`.
- [ ] Implementasikan `POST /api/products`.
- [ ] Implementasikan `PATCH /api/products/:id`.
- [ ] Implementasikan pengarsipan/penghapusan aman.
- [ ] Validasi SKU unik, nama, harga, stok, dan threshold.
- [ ] Tambahkan tests endpoint dan aturan validasi.

### Epic C — React product management
- [ ] Buat layout dashboard dan navigasi.
- [ ] Buat tabel produk.
- [ ] Buat form tambah/edit.
- [ ] Hubungkan React dengan API.
- [ ] Tampilkan loading, error, success, dan empty state.
- [ ] Tambahkan pencarian, filter, dan pagination.
- [ ] Uji bahwa data tetap tersimpan setelah refresh.

### Epic D — Authentication dan authorization
- [ ] Buat seed admin development yang aman.
- [ ] Implementasikan login.
- [ ] Hash password.
- [ ] Implementasikan middleware autentikasi.
- [ ] Implementasikan role `admin` dan `staff`.
- [ ] Uji akses tanpa login dan akses role terlarang.
- [ ] Tentukan strategi token/session dan dokumentasikan risikonya.

### Epic E — Stock transactions
- [ ] Buat migration tabel `stock_transactions`.
- [ ] Implementasikan stock-in.
- [ ] Implementasikan stock-out.
- [ ] Pastikan perubahan stok dan histori atomik.
- [ ] Cegah stok negatif dan SKU/produk yang tidak valid.
- [ ] Uji permintaan bersamaan untuk perubahan stok.
- [ ] Buat halaman riwayat transaksi.

### Epic F — Dashboard
- [ ] Buat endpoint summary.
- [ ] Tampilkan total produk.
- [ ] Tampilkan total unit stok.
- [ ] Tampilkan produk stok rendah.
- [ ] Tampilkan transaksi terbaru.
- [ ] Pastikan semua metrik berasal dari database.

### Epic G — Kualitas dan rilis
- [ ] Tambahkan integration tests.
- [ ] Tambahkan OpenAPI/Swagger.
- [ ] Tambahkan ERD dan contoh API di README.
- [ ] Pastikan `.env` tidak terlacak Git.
- [ ] Deploy database, backend, dan frontend.
- [ ] Tes alur utama pada versi deployment.
- [ ] Tambahkan screenshot dan demo URL.
- [ ] Periksa issue yang diketahui dan batasan demo.

## 3. Definition of Done

Sebuah task dianggap selesai jika:
- Acceptance criteria terpenuhi.
- Kasus sukses dan gagal telah diuji.
- Tidak ada rahasia di kode atau commit.
- Tidak ada error console/server yang diketahui dan diabaikan.
- Dokumentasi diperbarui jika perilaku API berubah.
- Perubahan di-commit dengan pesan yang menjelaskan tujuan.

Untuk task UI, periksa juga loading, error, empty state, validasi form, keyboard dasar, dan tampilan mobile.

## 4. Git Workflow untuk Pemula

Untuk proyek individu, gunakan `main` sebagai branch stabil dan branch fitur untuk perubahan yang cukup besar.

Contoh:

```bash
git checkout -b feat/products-crud
# implementasikan fitur
git status
git add .
git commit -m "feat: add product CRUD endpoints"
git checkout main
git merge feat/products-crud
```

Contoh konvensi commit:
- `feat: add product search`
- `fix: prevent negative stock`
- `test: cover stock-out validation`
- `docs: update API setup instructions`
- `refactor: separate product service`

Jangan commit `.env`, password, token, atau kredensial database. Gunakan `.env.example` dengan nilai placeholder.

## 5. Testing Checklist

### Produk
- [ ] Membuat produk valid berhasil.
- [ ] SKU duplikat ditolak.
- [ ] ID tidak ada menghasilkan 404.
- [ ] Harga atau stok negatif ditolak.
- [ ] Pagination dan pencarian menghasilkan hasil benar.

### Autentikasi dan role
- [ ] Login valid berhasil.
- [ ] Password salah ditolak.
- [ ] Endpoint privat menolak request tanpa autentikasi.
- [ ] Staff tidak dapat melakukan aksi khusus admin.
- [ ] Password hash tidak pernah dikirim di response.

### Transaksi stok
- [ ] Stock-in menambah stok.
- [ ] Stock-out mengurangi stok.
- [ ] Kuantitas nol/negatif ditolak.
- [ ] Stock-out melebihi stok ditolak.
- [ ] Histori tersimpan untuk setiap perubahan.
- [ ] Kegagalan transaksi tidak meninggalkan stok dan histori dalam keadaan berbeda.
- [ ] Perubahan stok bersamaan tidak membuat stok negatif.

## 6. Rencana 12 Minggu

| Minggu | Fokus | Output |
|---|---|---|
| 1 | Setup, Node.js, Express dasar | Server dan health endpoint |
| 2 | SQL, PostgreSQL, CRUD API | Endpoint produk |
| 3 | React product table/form | FE terhubung API |
| 4 | Search, pagination, validasi | Product management MVP |
| 5 | Login, password hash, role | Endpoint terlindungi |
| 6 | Stock-in/out dan history | Business logic inti |
| 7 | Dashboard summary dan hardening | Alur utama lengkap |
| 8 | Testing dan API docs | Tests + Swagger |
| 9 | README, ERD, review keamanan | Repository siap demo |
| 10 | Deployment | Demo online |
| 11 | Bug fixing dan latihan interview | Project lebih stabil |
| 12 | Polishing dan aplikasi magang | Portfolio dan lamaran |

Ini rencana target, bukan jaminan bahwa setiap fase pasti selesai dalam satu minggu. Jika ada keterlambatan, prioritaskan alur inti: produk → database → transaksi stok → autentikasi → testing. Kurangi fitur tambahan, bukan kualitas dasar.

## 7. Rutinitas Belajar Harian

Jika punya 2 jam per hari:
- 20 menit: baca konsep yang dibutuhkan untuk task hari itu.
- 70 menit: implementasikan sendiri.
- 20 menit: uji kasus normal dan kasus gagal.
- 10 menit: catat apa yang dipahami, pertanyaan yang tersisa, dan commit.

Hindari menyalin tutorial tanpa bisa menjelaskan hasilnya. Setelah mengikuti contoh, tutup tutorial dan coba implementasikan ulang dari pemahaman sendiri.

## 8. Persiapan Interview

Latih penjelasan singkat tentang:
- Alur request dari React ke PostgreSQL.
- Perbedaan route, controller, dan service.
- Primary key, foreign key, unique constraint, dan JOIN.
- Mengapa query SQL harus memakai parameter.
- Authentication vs authorization.
- Bagaimana mencegah stok negatif dan menangani transaksi bersamaan.
- Test apa yang ditulis dan bug apa yang ditemukan.
- Trade-off atau kekurangan yang masih ada pada project.

Jangan mengklaim fitur production-ready jika belum diuji. Jelaskan apa yang sudah dibuat, apa yang belum, dan keputusan teknis yang kamu ambil.
