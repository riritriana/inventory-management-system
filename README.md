# Antariks Inventory System 🚀

Project ini dibuat untuk memenuhi tugas Technical Test Fullstack Developer. Selain fitur dasar CRUD yang diminta, saya menambahkan beberapa fitur tambahan  seperti validasi berlapis, pencarian real-time, dan pagination untuk meningkatkan kualitas dan keamanan aplikasi.

**Project Status:**
- **Frontend & Backend:** Run Locally (Localhost).
- **Database:** **Live on Cloud (Neon Tech PostgreSQL).** ✅

> **Deployment Note:**
> Aplikasi ini dikonfigurasi menggunakan **Hybrid Setup**. Database sudah **Online (Cloud)** menggunakan Neon Tech, sedangkan aplikasi berjalan di Local Environment.
> *Alasan: Full deployment ke Render tertunda dikarenakan kendala teknis verifikasi pembayaran (Payment Gateway) pada penyedia layanan Cloud. Namun, integrasi Database Cloud dipastikan berjalan 100% lancar.*


## Penjelasan Fitur
Aplikasi ini bukan sekadar CRUD biasa. Berikut fitur-fitur advanced yang telah diimplementasikan:

### 1. Dashboard & Statistik
- **Summary Cards:** Menampilkan ringkasan total jenis produk, total stok fisik, dan estimasi nilai aset (Rupiah) secara real-time.
- **Visual Indicators:** Stok barang diberi label warna (Hijau = Aman, Merah = Stok Menipis < 5).

### 2.  Manajemen Data (Advanced CRUD)
- **Create:** Input produk dengan validasi ketat.
- **Read:** Tampilan tabel yang rapi dengan format mata uang Rupiah (IDR).
- **Update:** Edit data produk tanpa reload halaman.
- **Delete:** Hapus data dengan konfirmasi keamanan.

### 3.  Smart Features (UX)
- **Real-time Search:** Pencarian produk instan tanpa reload.
- **Pagination:** Data dipisah per 5 item per halaman agar aplikasi tetap ringan.
- **Auto-Capitalize:** Nama produk otomatis diubah huruf depannya menjadi kapital saat diketik (misal: "laptop" -> "Laptop").
- **Responsive Design:** Tampilan tetap rapi di layar Desktop maupun Tablet.

### 4.  Double-Layer Security & Validation
Aplikasi menerapkan **Defense in Depth** (Pertahanan Berlapis):
- **Frontend Validation:** Memberi feedback instan ke user (misal: Harga tidak boleh minus, Nama minimal 3 huruf).
- **Backend Validation (Zod):** Sanitasi data di server menggunakan library **Zod** (Trim spasi otomatis, tolak data negatif) untuk mencegah data sampah masuk ke database.

---

**Frontend:**
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Cepat & Ringan)
- [TypeScript](https://www.typescriptlang.org/) (Type-safe code)
- [Tailwind CSS](https://tailwindcss.com/) (Styling modern)
- [React Router DOM](https://reactrouter.com/) (Manajemen Halaman & Layout)
- [Axios](https://axios-http.com/) (HTTP Client)

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/) (Database Management)
- [PostgreSQL](https://www.postgresql.org/) (via Neon Tech)
- [Zod](https://zod.dev/) (Schema Validation)

---

## Prasyarat (Requirement)
Sebelum menjalankan, pastikan di komputer Anda sudah terinstall:
- [Node.js](https://nodejs.org/) (Minimal v18)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

---
## Cara Instalasi & Menjalankan

### 1. Clone Repository
Download source code ke komputer Anda:
```bash
git clone https://github.com/riritriana/inventory-management-system.git
cd NAMA_REPO
```

### 2. Setup Backend
Masuk ke folder backend dan install dependency:
```bash
cd antariks-backend
npm install
```

PENTING: Konfigurasi .env Buat file .env baru di dalam folder antariks-backend, lalu isi dengan kode di bawah ini (Database URL ini mengarah ke Cloud Database yang sudah saya siapkan):

```bash
DATABASE_URL="postgresql://neondb_owner:npg_Ykq1jfPd2aMD@ep-holy-sun-a145a2kf-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

PORT=5000
```

Jalankan Server:

```bash
npm run dev
```
Server berjalan di http://localhost:5000

### 2. Setup Frontend
Buka terminal baru, masuk ke folder frontend.

```bash
cd ../antariks-frontend
npm install
```

Jalankan Frontend:
```bash
npm run dev
```
Buka browser di http://localhost:5173

---

**Author:** Riri Triana

