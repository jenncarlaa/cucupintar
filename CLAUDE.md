# CLAUDE.md — CucuPintar prototype

Konteks untuk Claude saat bekerja di repo ini.

## Apa ini
Prototype klik-able (HTML/CSS/JS tanpa framework, tanpa build) aplikasi CucuPintar untuk lansia Indonesia.
Tampil sebagai satu HP berukuran desain 440×956 px yang diskalakan, plus panel demo di samping (`.rail`).
Semua teks antarmuka Bahasa Indonesia, sapaan "Oma"/"Opa", anak bernama "Budi".

## Aturan
- **Jangan ubah isi/alur fitur** tanpa diminta: daftar fitur, kalimat panduan, dan alur sudah disetujui tim.
- Desain acuan ada di Figma "Cucu Digital - Venture Creation" (Onboarding 1–3, v2 · Beranda, panel maskot, mode edit).
- Ramah lansia: teks ≥ 15px, target sentuh ≥ 44px, kontras tinggi, satu tujuan per layar, warna merah hanya untuk bahaya/SOS.
- Palet: hijau `#1B6E45` (brand), hijau tua `#0F4A2C`, oranye `#C2410C` (aksen/PLUS), latar krem `#F4F3EF`.
- Font: Helvetica Neue / Helvetica / Arial (var `--font`).
- Gambar di `assets/`; jangan menyisipkan base64 baru ke HTML/CSS/JS.
- Jalankan lewat server lokal (`npx serve .`), bukan file://.

## Arsitektur singkat (js/app.js)
- `S` = state aplikasi (nama, Plus, kuota baca, widget, pengingat, log keluarga).
- `go(id, opts)` / `back()` berpindah antar `<section class="scr">`; `enter[id]` dipanggil saat layar dibuka.
- `say(text)` → suara Cucu (Web Speech API); `lafal()` merapikan cara baca angka/jam/rupiah/singkatan.
- Layar utama dirender `renderHome()`; panel maskot `openPanel()`; tutorial `G` (guide).
- `window.__cp` = hook untuk pengujian (Playwright/konsol).

## Mengecek perubahan
Buka di browser lewat server lokal, klik alur dari panel demo "Lompat ke alur". Pastikan tidak ada error di konsol.
