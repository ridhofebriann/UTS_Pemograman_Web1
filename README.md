# UTS_Pemograman_Web1

# 📚 Proyek UTS Pemrograman Web 1: "BookHaven"

Halo, perkenalkan, saya [Isi Nama Lengkap Kamu] (NIM: [Isi NIM Kamu]).

Ini adalah dokumentasi submission untuk Proyek UTS Pemrograman Web 1. Dokumentasi ini disusun untuk menjelaskan **sistematika, alur berpikir, dan argumentasi** saya dalam merancang dan membangun aplikasi front-end "BookHaven" sesuai dengan 7 kriteria penilaian yang diberikan.

**Aplikasi ini di-deploy dan dapat dilihat live di:**
[https://nama-kamu.github.io/uts-pemrograman-web-1/](https://nama-kamu.github.io/uts-pemrograman-web-1/)

---

## 📸 Tampilan Aplikasi (Screenshots)

Berikut adalah tampilan dari halaman-halaman utama yang telah dibuat.

### 1. Halaman Login (`index.html`)
<img src="img/preview-login.png" width="700">

### 2. Halaman Dashboard (`dashboard.html`)
<img src="img/preview-dashboard.png" width="700">

### 3. Halaman Pemesanan  (`checkout.html`)
<img src="img/preview-history.png" width="700">

### 4. Halaman Stok & Manipulasi DOM (`stok.html`)
<img src="img/preview-stok.png" width="700">

### 5. Halaman Tracking & Timeline (`tracking.html`)
<img src="img/preview-tracking.png" width="700">

### 6. Halaman History Transaksi (`history.html`)
<img src="img/preview-history.png" width="700">

---

## 🏛️ Penjelasan Sesuai Kriteria Penilaian

Berikut adalah penjabaran dari setiap kriteria yang telah saya implementasikan dalam proyek ini.

### (e) Modularitas File dan Struktur File

Sistematika pengerjaan saya dimulai dari fondasi: **struktur file yang bersih dan modular**.

**Argumentasi:** Saya memisahkan secara ketat antara struktur (HTML), *style* (CSS), dan logika (JavaScript). Alur berpikir ini adalah *best practice* "Separation of Concerns" yang krusial untuk membuat kode mudah dibaca, dikelola, dan di-debug.

```markdown
tugas-uts-web1/
│
├── 📁 css/
│   └── style.css           Eksternal CSS
│
├── 📁 img/
│   └── (Semua gambar cover buku & screenshots)
│
├── 📁 js/
│   ├── data.js            (Data dummy terpisah)
│   └── script.js          (Semua logika DOM & interaktivitas)
│
├── index.html              Halaman Login)
├── dashboard.html          Halaman Dashboard)
├── stok.html               Halaman Stok)
├── checkout.html           Halaman Pemesanan)
├── tracking.html           Halaman Tracking)
├── history.html           ( Halaman Tambahan)
└── README.md
```
---

### (a) Struktur HTML yang Semantik, Valid, dan Lengkap

Saya tidak menggunakan 'div-soup'. Setiap halaman (Total 6 halaman) dibangun menggunakan tag HTML5 semantik untuk memastikan struktur yang valid dan aksesibel.

* **`<header>`:** Untuk bagian atas halaman yang berisi logo dan navigasi utama.
* **`<nav>`:** Untuk membungkus menu navigasi utama, memberikan konteks bagi *screen reader*.
* **`<main>`:** Membungkus semua konten inti yang unik di setiap halaman.
* **`<section>`:** Memisahkan setiap bagian logis di dalam `<main>`, seperti "Greeting Box" dan "Dashboard Menu".
* **`<footer>`:** Untuk bagian *copyright* di bagian bawah.

**Argumentasi:** Struktur semantik ini tidak hanya membuat kode lebih mudah dibaca, tapi juga krusial untuk aksesibilitas (a11y) dan SEO.

---

### (b) Desain CSS & (f) Kreativitas UI (Sebagian)

Desain aplikasi ini dirancang secara modular menggunakan **CSS Variables** (Custom Properties) yang terpusat di `:root`.

**Alur Berpikir:**
1.  **Tema Terpusat:** Saya mendefinisikan palet warna "Green Forest" (misal: `--primary-color: #2a9d8f`) di satu tempat.
2.  **Modularitas:** Semua komponen (tombol, *card*, *header*) menggunakan variabel ini. Jika saya ingin mengganti tema, saya hanya perlu mengubah 10 baris di `:root`.
3.  **Kreativitas (Dark Mode):**
    **Argumentasi:** Penggunaan CSS Variables ini memungkinkan saya mengimplementasikan **fitur kreatif Dark/Light Mode** dengan sangat efisien. JavaScript hanya perlu menambahkan atribut `data-theme="dark"` ke `<body>`, dan CSS akan otomatis mengganti semua nilai variabel tersebut.

Untuk *layouting*, saya menggunakan **Flexbox** (untuk *header* dan komponen kecil) dan **CSS Grid** (untuk *layout* menu *dashboard* dan *form* yang kompleks).

---

### (c) JavaScript DOM & Manipulasi Data

Ini adalah inti dari interaktivitas aplikasi.

**Alur Berpikir (Modularitas JS):**
Logika JavaScript saya tidak ditulis di *scope* global. Saya menggunakan *event listener* `DOMContentLoaded` dan "Router" sederhana yang mendeteksi `document.body.id` (`page-login`, `page-dashboard`, dll.). Ini memastikan **hanya skrip yang relevan** yang berjalan untuk halaman tersebut, sehingga mencegah *error* dan lebih efisien.

**Contoh Implementasi Manipulasi DOM & Data:**
1.  **Rendering Dinamis (Stok & History):**
    * Halaman `stok.html` dan `history.html` awalnya kosong.
    * **Argumentasi:** Skrip mengambil *array* (`dataKatalogBuku` atau `dataHistory`) dari `data.js`. Kemudian, skrip me-*looping* *array* tersebut, membuat elemen HTML (`<tr>` dan `<td>`) baru menggunakan `document.createElement()`, mengisinya dengan data, lalu menyisipkannya ke tabel menggunakan `appendChild()`.
2.  **Manipulasi Interaktif (Tambah Stok):**
    * Saat form 'Tambah Stok' diisi, skrip menggunakan `event.preventDefault()` untuk mencegah *refresh*.
    * Data baru di-`push()` ke *array* `dataKatalogBuku`.
    * Fungsi `renderTable()` dipanggil kembali untuk menggambar ulang tabel dengan data baru. Ini memberikan ilusi interaktivitas *real-time*.
3.  **DOM Sederhana (Greeting):**
    * Di *dashboard*, skrip mengambil jam (`new Date().getHours()`) dan data dari `localStorage` untuk memanipulasi `textContent` dari elemen `<h1>` untuk menampilkan "Selamat Pagi/Siang/Sore".

---

### (d) Validasi Form & Alert

*Feedback* pengguna adalah kriteria penting.

1.  **Validasi Form:** Di `index.html`, saat form login di-*submit*, skrip memvalidasi input `email` dan `password` dengan data di `dataPengguna` menggunakan method `.find()`.
2.  **Alert / Feedback:**
    * **Argumentasi:** Saya **menghindari** `alert()` bawaan browser karena terlihat tidak profesional.
    * Saya membuat fungsi **Toast Notification** kustom (`showToast()`).
    * Jika login gagal, `showToast("...salah!", "error")` akan dipanggil, memunculkan *pop-up* merah.
    * Jika login sukses, `showToast("...berhasil!", "success")` akan dipanggil, memunculkan *pop-up* hijau.
    * Jika *logout*, `showToast("...logout.", "info")` akan dipanggil, memunculkan *pop-up* kuning.

---

### (f) Kreativitas Tambahan (Fitur & UI)


Untuk mendapatkan nilai tambah, saya mengimplementasikan beberapa fitur kreatif di luar permintaan minimum:

1.  **Dark Mode / Light Mode:** Tombol *toggle* tema yang fungsional dan mengingat pilihan pengguna menggunakan `localStorage`.
2.  **Halaman History:** Halaman ke-6 yang sepenuhnya dinamis (dijelaskan di poin C).
3.  **Toast Notifications:** Mengganti `alert()` dengan notifikasi modern.
4.  **Ikon Font Awesome:** Menggunakan ikon profesional di semua tombol dan menu untuk UI yang lebih baik.
5.  **Fitur Logout:** Fungsi *logout* yang membersihkan `localStorage` dan mengarahkan pengguna kembali ke `index.html`.
6.  **Timeline Tracking:** Di halaman `tracking.html`, skrip tidak hanya menampilkan status, tapi me-render *array* `perjalanan` menjadi *timeline* HTML yang dinamis.

---

### (g) Sistematika, Alur Berpikir, dan Argumentasi

**Alur Berpikir (Kesimpulan):**
Seluruh proyek ini dibangun dengan **alur berpikir berlapis (layered approach)**:

1.  **LAPIS 1 (Struktur):** Fondasi menggunakan **HTML Semantik** dan **Struktur File Modular**.
2.  **LAPIS 2 (Desain):** Desain dibangun di atasnya menggunakan **CSS Eksternal** yang modular (CSS Variables) untuk *theming* yang mudah.
3.  **LAPIS 3 (Logika):** Aplikasi "dihidupkan" dengan **JavaScript DOM** yang terpisah, fokus pada manipulasi data dinamis dan *feedback* pengguna yang jelas.

Argumentasi saya adalah bahwa dengan pendekatan ini, aplikasi yang dihasilkan tidak hanya memenuhi semua kriteria fungsional, tetapi juga bersih, mudah dikelola (maintenance), dan profesional.

---

## 🚀 Cara Menjalankan

1.  Clone atau unduh repositori ini.
2.  Buka file `index.html` di browser (Disarankan Chrome atau Firefox).
3.  Login menggunakan salah satu data dari `js/data.js` (Contoh: `rina@gmail.com` / `rina123`).
