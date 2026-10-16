# Inventory Management System

Aplikasi web full-stack untuk mengelola data produk, inventaris stok, pencatatan transaksi barang masuk (`IN`) & keluar (`OUT`), serta riwayat audit mutasi stok. Proyek ini dibangun sebagai portofolio untuk melamar posisi **Backend Developer Intern** / **Full-Stack Developer Intern**.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite (JavaScript)
- **Backend:** Node.js + Express (JavaScript ES Modules)
- **Database:** PostgreSQL *(direncanakan pada Fase 1)*
- **Testing:** Supertest / Vitest / Jest *(tahap lanjutan)*
- **API Documentation:** OpenAPI / Swagger *(tahap lanjutan)*

---

## 📁 Struktur Direktori

```text
inventory-management-project/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/                # HTTP client & endpoint calls
│   │   ├── components/         # Reusable UI & layout components
│   │   ├── features/           # Modular domain features (auth, products, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page view components
│   │   ├── routes/             # App routing configuration
│   │   ├── utils/              # Helper utilities
│   │   ├── App.jsx             # Root React component
│   │   ├── index.css           # Global stylesheet
│   │   └── main.jsx            # React entry point
│   ├── .env.example            # Template env frontend
│   ├── index.html              # HTML template
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend API (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Config loaders (env, database)
│   │   ├── middleware/         # Auth, validation, & error handlers
│   │   ├── modules/            # Business logic (routes, controllers, services, repositories)
│   │   ├── db/                 # Migrations & seeds
│   │   ├── app.js              # Express app definition & route mounting
│   │   └── server.js           # Server listen & entry point
│   ├── tests/                  # Automated tests
│   ├── .env.example            # Template env backend
│   └── package.json
├── docs/                       # Dokumentasi spesifikasi & perencanaan
│   ├── PRD.md                  # Product Requirements Document
│   ├── Arsitektur.md           # Desain arsitektur, standar API, & modul
│   └── Workflow.md             # Siklus pengerjaan & backlog
├── .gitignore
└── README.md
```

---

## 🚦 Status Implementasi (Fase 0 Selesai)

| Komponen | Status | Catatan |
|---|---|---|
| Client Setup | ✅ Selesai | React + Vite berjalan di port 5173 |
| Server Setup | ✅ Selesai | Express berjalan di port 5000 dengan CORS & JSON parser |
| Health Check | ✅ Selesai | `GET /api/health` mengembalikan status 200 OK |
| Git & Env Config | ✅ Selesai | `.gitignore` dikonfigurasi, `.env.example` tersedia di client & server |
| Database & CRUD | ⏳ Belum Dimulai | Dijadwalkan untuk Fase 1 sesuai PRD & Arsitektur |

---

## 🚀 Panduan Menjalankan Aplikasi Secara Lokal

### Prasyarat
- **Node.js** (versi >= 18, direkomendasikan versi 20 atau 24)
- **npm** (versi >= 9)

### 1. Setup Backend (`server`)

1. Buka terminal dan masuk ke direktori server:
   ```bash
   cd server
   ```

2. Buat file `.env` dari template:
   ```bash
   cp .env.example .env
   ```
   *Isi default `.env.example`:*
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

3. Jalankan server backend dalam mode pengembangan:
   ```bash
   npm run dev
   ```
   Server akan aktif di `http://localhost:5000`.

### 2. Setup Frontend (`client`)

1. Buka tab terminal baru dan masuk ke direktori client:
   ```bash
   cd client
   ```

2. Buat file `.env` dari template:
   ```bash
   cp .env.example .env
   ```
   *Isi default `.env.example`:*
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Jalankan dev server Vite:
   ```bash
   npm run dev
   ```
   Aplikasi frontend dapat diakses melalui browser di `http://localhost:5173`.

---

## 📡 Endpoint yang Tersedia Saat Ini

### `GET /api/health`
Digunakan untuk memverifikasi kesiapan dan ketersediaan backend server.

- **URL:** `http://localhost:5000/api/health`
- **Method:** `GET`
- **Response Headers:** `Content-Type: application/json`
- **Response Status:** `200 OK`
- **Response Body:**
  ```json
  {
    "success": true,
    "message": "Inventory Management API is healthy",
    "data": {
      "status": "healthy",
      "timestamp": "2026-10-15T13:18:21.514Z"
    }
  }
  ```

---

## 📖 Dokumentasi Lengkap

Detail perancangan produk dan arsitektur dapat dibaca pada folder `docs/`:
- [`PRD.md`](docs/PRD.md) — Kebutuhan produk, fungsionalitas admin/staff, model data, dan batasan MVP.
- [`Arsitektur.md`](docs/Arsitektur.md) — Struktur modular monolith, alur request/response, dan konvensi API.
- [`Workflow.md`](docs/Workflow.md) — Roadmap pengerjaan, testing checklist, dan panduan git.
