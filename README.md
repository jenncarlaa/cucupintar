# CucuPintar — Prototype

**Coba langsung di browser:** https://jenncarlaa.github.io/cucupintar/
(otomatis diperbarui 1–2 menit setelah ada `git push` ke `main`)

Prototype aplikasi pendamping digital untuk lansia: widget di layar utama, maskot Cucu di tepi layar,
Tanya Cucu (panduan suara), SOS, baca tulisan, peringatan penipuan, pengingat obat, CucuPintar Plus,
dan halaman pemantauan untuk keluarga.

## Menjalankan

Prototype ini HTML, CSS, dan JavaScript biasa, tanpa build. Jalankan lewat server lokal (jangan dibuka
langsung dengan dobel-klik, karena efek kilau logo di layar pembuka butuh server):

```bash
# pilih salah satu
npx serve .
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000` (atau alamat yang ditampilkan `serve`).
Untuk suara Cucu paling natural, buka di **Microsoft Edge** (suara "Gadis Natural").

## Struktur

```
index.html                      semua layar (<section class="scr" id="...">) dan lapisan global
css/00-dasar.css                reset dasar
css/10-aplikasi.css             gaya utama: token warna (:root), layar utama, widget, semua layar fitur
css/20-onboarding-beranda.css   layar pembuka + onboarding (desain Figma) + penyesuaian beranda/panel
css/30-panel-suara.css          pilihan suara di panel demo samping
js/app.js                       semua logika: navigasi, state, widget, Tanya Cucu, SOS, pengingat, suara
assets/                         logo, maskot, ilustrasi onboarding, foto contoh (struk, galeri)
```

## Tempat mengubah yang sering dicari

| Mau mengubah | Lokasi |
|---|---|
| Warna brand | `css/10-aplikasi.css` → `:root` (`--brand`, `--brand-d`, `--brand-l`, `--bg`); oranye PLUS di `.plus-tag` |
| Teks/urutan layar | `index.html`, cari `id="nama-layar"` (mis. `id="home"`, `id="plus"`) |
| Pindah layar | `go('id-layar')` di `js/app.js`; tombol HTML cukup diberi `data-go="id-layar"` |
| Widget layar utama | `js/app.js` → fungsi yang membuat HTML widget (`'rem'`, `'ask'`, `'sos'`, ...) |
| Ikon aplikasi di layar utama | `js/app.js` → `const APPS=[...]` |
| Data pengingat awal | `js/app.js` → `REM0` |
| Suara Cucu | `js/app.js` → `say()`, `lafal()` (cara baca jam/rupiah/singkatan), `vStyle` (remaja/lembut) |
| Kalimat struk yang dibacakan | `js/app.js` → `SENT` |
| Layar pembuka & onboarding | `index.html` (`#ob1`–`#ob3`, `.ob-intro`) + `css/20-onboarding-beranda.css` |
| Gambar | ganti file di `assets/` dengan nama yang sama |

## Untuk pengujian

`window.__cp` tersedia di konsol browser: `__cp.go('home')`, `__cp.enterEdit()`, `__cp.setPlus(true)`,
`__cp.state()`.

## Catatan produk

- Desain mengikuti file Figma "Cucu Digital - Venture Creation" (frame Onboarding 1–3 dan v2 · Beranda).
- Fungsi HP (telepon, kirim pesan, lokasi, kamera) masih disimulasikan.
- Versi aplikasi nyata: Android (AccessibilityService untuk tombol mengambang dan panduan di aplikasi lain),
  suara dari layanan TTS (mis. Google Cloud TTS / ElevenLabs), tanpa fitur pembayaran.

## Kerja bareng lewat GitHub

Repo: https://github.com/jenncarlaa/cucupintar

**Pertama kali (sekali saja):**

```bash
git clone https://github.com/jenncarlaa/cucupintar.git
cd cucupintar
```

Tanpa terminal? Pakai [GitHub Desktop](https://desktop.github.com): *File → Clone repository* → pilih `cucupintar`.

**Setiap kali mulai kerja:** ambil perubahan terbaru dulu (`git pull`, atau tombol *Fetch/Pull origin* di GitHub Desktop).

**Setelah mengubah:**

```bash
git add .
git commit -m "Jelaskan singkat apa yang diubah"
git push
```

Supaya tidak saling menimpa: kabari tim file/layar mana yang sedang kamu ubah, dan sering-sering `pull`.
Untuk perubahan besar, buat branch sendiri lalu ajukan Pull Request agar dicek teman dulu.
