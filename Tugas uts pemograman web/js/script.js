// Menjalankan skrip saat DOM (halaman web) selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
  // === FUNGSI GLOBAL: THEME TOGGLE (VERSI IKON) ===
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // 1. Cek localStorage saat halaman dimuat
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ikon matahari
  } else {
    body.setAttribute("data-theme", "light");
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ikon bulan
  }

  // 2. Tambah event listener ke tombol (jika ada)
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (body.getAttribute("data-theme") === "dark") {
        // Ganti ke Light Mode
        body.setAttribute("data-theme", "light");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem("theme", "light");
      } else {
        // Ganti ke Dark Mode
        body.setAttribute("data-theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem("theme", "dark");
      }
    });
  }
  // === AKHIR DARI FUNGSI THEME TOGGLE ===

  // === FUNGSI GLOBAL: LOGOUT (WARNA INFO) ===
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("namaUser");

      showToast("Anda telah berhasil logout.", "info");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    });
  }

  const pageId = document.body.id;

  if (pageId === "page-login") {
    initLoginPage();
  } else if (pageId === "page-dashboard") {
    initDashboardPage();
  } else if (pageId === "page-stok") {
    initStokPage();
  } else if (pageId === "page-checkout") {
    initCheckoutPage();
  } else if (pageId === "page-tracking") {
    initTrackingPage();
  } else if (pageId === "page-history") {
    // <-- LOGIKA HISTORY
    initHistoryPage();
  }

  const namaUser = localStorage.getItem("namaUser");
  if (namaUser) {
    const userProfileName = document.getElementById("user-profile-name");
    if (userProfileName) {
      userProfileName.textContent = namaUser;
    }
  }
});

function initLoginPage() {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah form refresh halaman

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validasi Form: Cari pengguna di array dataPengguna (dari data.js)
    const userFound = dataPengguna.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      showToast(`Login Berhasil! Selamat datang, ${userFound.nama}`, "success");

      localStorage.setItem("namaUser", userFound.nama);

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500); // Tunda 1.5 detik
    } else {
      showToast("Email atau password yang Anda masukkan salah!", "error");
    }
  });

  const btnForgot = document.getElementById("btn-forgot-password");
  const btnRegister = document.getElementById("btn-register");
  const modals = document.querySelectorAll(".modal-overlay");
  const closeButtons = document.querySelectorAll(".modal-close");

  btnForgot.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modal-forgot").classList.remove("hidden");
  });
  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modal-register").classList.remove("hidden");
  });

  function closeModal() {
    modals.forEach((modal) => modal.classList.add("hidden"));
  }

  closeButtons.forEach((btn) => btn.addEventListener("click", closeModal));
}

// === FUNGSI HALAMAN DASHBOARD ===
function initDashboardPage() {
  const greetingElement = document.getElementById("greeting-text");
  const jam = new Date().getHours();
  // Ambil nama user dari localStorage, beri default "User" jika tidak ada
  const namaUser = localStorage.getItem("namaUser") || "User";

  let greeting;
  if (jam < 11) {
    greeting = `Selamat Pagi, ${namaUser}!`;
  } else if (jam < 15) {
    greeting = `Selamat Siang, ${namaUser}!`;
  } else if (jam < 18) {
    greeting = `Selamat Sore, ${namaUser}!`;
  } else {
    greeting = `Selamat Malam, ${namaUser}!`;
  }
  greetingElement.textContent = greeting;
}

// === FUNGSI HALAMAN STOK ===
function initStokPage() {
  const stockTableBody = document.getElementById("stock-table-body");
  const addStockForm = document.getElementById("add-stock-form");

  // 1. Fungsi untuk me-render tabel dari data
  function renderTable() {
    stockTableBody.innerHTML = ""; // Kosongkan tabel dulu

    dataKatalogBuku.forEach((buku) => {
      const tr = document.createElement("tr"); // Buat <tr>

      // Isi <td> dengan data dari object buku
      tr.innerHTML = `
                <td><img src="${buku.cover}" alt="${buku.namaBarang}"></td>
                <td>${buku.kodeBarang}</td>
                <td>${buku.namaBarang}</td>
                <td>${buku.jenisBarang} (Edisi ${buku.edisi})</td>
                <td>${buku.harga}</td>
                <td>${buku.stok}</td>
            `;
      stockTableBody.appendChild(tr); // Tambahkan baris ke tabel
    });
  }

  // 2. Event listener untuk form tambah stok
  addStockForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil nilai dari form
    const newBuku = {
      kodeBarang: document.getElementById("kodeBarang").value,
      namaBarang: document.getElementById("namaBarang").value,
      jenisBarang: document.getElementById("jenisBarang").value,
      edisi: document.getElementById("edisi").value,
      stok: document.getElementById("stok").value,
      harga: document.getElementById("harga").value,
      cover: "img/default.png", // Asumsi gambar default
    };

    // Tambahkan data baru ke array (simulasi)
    dataKatalogBuku.push(newBuku);

    // Render ulang tabel untuk menampilkan data baru
    renderTable();

    // Reset form
    addStockForm.reset();

    // Beri notifikasi (toast)
    showToast("Buku baru berhasil ditambahkan!", "success");
  });

  // Panggil renderTable() saat halaman pertama kali dimuat
  renderTable();
}

function initCheckoutPage() {
  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama-pemesan").value;

    // Validasi sederhana
    if (nama) {
      showToast(`Pemesanan atas nama ${nama} berhasil diproses!`, "success");
      checkoutForm.reset();
    } else {
      showToast("Harap isi semua data pemesan.", "error");
    }
  });
}

function initTrackingPage() {
  const trackingForm = document.getElementById("tracking-form");
  const resultContainer = document.getElementById("tracking-result");

  trackingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const doNumber = document.getElementById("do-input").value;

    // Cari data di dataTracking (dari data.js)
    const data = dataTracking[doNumber];

    if (data) {
      // Data ditemukan, tampilkan container
      resultContainer.classList.remove("hidden");

      // Buat HTML untuk timeline perjalanan (Kreatif)
      let timelineHTML = "";
      data.perjalanan.reverse().forEach((item) => {
        timelineHTML += `
                    <div class="timeline-item">
                        <div class="timeline-time">${item.waktu}</div>
                        <div class="timeline-desc">${item.keterangan}</div>
                    </div>
                `;
      });

      // Tampilkan semua hasil (TYPO DIPERBAIKI DI SINI)
      resultContainer.innerHTML = `
                <h3>Hasil Lacak: ${data.nomorDO}</h3>
                <div class="tracking-details">
                    <div>
                        <p><strong>Nama Pemesan:</strong> ${data.nama}</p>
                        <p><strong>Status Terkini:</strong> ${data.status}</p>
                    </div>
                    <div>
                        <p><strong>Ekspedisi:</strong> ${data.ekspedisi} (${data.paket})</p>
                        <p><strong>Tanggal Kirim:</strong> ${data.tanggalKirim}</p>
                    </div>
                </div>
                <p><strong>Total:</strong> ${data.total}</p>
                
                <hr>
                <h4>Riwayat Perjalanan:</h4>
                <div class="timeline-container">
                    ${timelineHTML}
                </div>
            `;
    } else {
      // Data tidak ditemukan
      resultContainer.classList.remove("hidden");
      resultContainer.innerHTML = `
                <h3>Hasil Lacak</h3>
                <p>Nomor Delivery Order "${doNumber}" tidak ditemukan. Harap periksa kembali.</p>
            `;
    }
  });
}

// (Harus ada di file ini agar bisa dipanggil)
function showToast(message, type = "info") {
  const toast = document.getElementById("toast-notification");
  const toastMessage = document.getElementById("toast-message");

  if (!toast || !toastMessage) {
    // Pengaman jika HTML di halaman lain belum ada toast
    // Kita fallback ke alert() jika di halaman (misal) checkout belum di-update
    console.warn("Toast HTML element not found. Fallback to alert().");
    alert(message);
    return;
  }

  // Set pesan dan tipe (untuk warna CSS)
  toastMessage.textContent = message;
  toast.className = "toast"; // Reset class
  toast.classList.add(type); // Tambah class 'success' or 'error'
  toast.classList.add("show"); // Tampilkan toast

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function initHistoryPage() {
  const tableBody = document.getElementById("history-table-body");

  // Pengaman jika data tidak ada
  if (!tableBody || typeof dataHistory === "undefined") {
    console.warn("History table body or dataHistory not found.");
    return;
  }

  tableBody.innerHTML = ""; // Kosongkan tabel

  // Loop dataHistory dan buat baris tabel (DOM Manipulation)
  dataHistory.forEach((trx) => {
    const tr = document.createElement("tr");

    // Menambahkan '?' jika data tidak ada (contoh: trx-003 tdk ada nomorDO)
    tr.innerHTML = `
      <td>${trx.id}</td>
      <td>${trx.tanggal}</td>
      <td>${trx.namaBarang}</td>
      <td>${trx.nomorDO || "?"}</td> 
      <td>${trx.total}</td>
      <td>${trx.status}</td>
    `;
    tableBody.appendChild(tr);
  });
}
