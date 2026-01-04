# Antariks Inventory System 🚀

Project ini dibuat untuk memenuhi tugas Technical Test Fullstack Developer. Selain fitur dasar CRUD yang diminta, saya menambahkan beberapa fitur tambahan  seperti validasi berlapis, pencarian real-time, dan pagination untuk meningkatkan kualitas dan keamanan aplikasi.

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
- [PostgreSQL](https://www.postgresql.org/) (Database)
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
git clone [https://github.com/USERNAME_GITHUB_KAMU/NAMA_REPO_KAMU.git](https://github.com/USERNAME_GITHUB_KAMU/NAMA_REPO_KAMU.git)
cd NAMA_REPO_KAMU
```
## Cara Menjalankan (Local)

### 1. Setup Backend
Masuk ke folder backend, install dependency, dan setup database.

```bash
cd antariks-backend
npm install
```

Konfigurasi .env: Pastikan file .env sudah diisi dengan kredensial PostgreSQL :

```bash
DATABASE_URL="postgresql://postgres:PASSWORD_ANDA@localhost:5432/antariks_db?schema=public"

PORT=5000
```

Migrasi Database:

```bash
npx prisma migrate dev --name init
```

Jalankan Server:

```bash
npm run dev
```
Server berjalan di http://localhost:5000

### 2. Setup Frontend
Buka terminal baru, masuk ke folder frontend.

```bash
cd antariks-frontend
npm install
```

Jalankan Frontend:
```bash
npm run dev
```
Buka browser di http://localhost:5173

Catatan: Pastikan PostgreSQL sudah menyala sebelum menjalankan backend.

---

