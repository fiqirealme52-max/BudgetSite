# Lumbung — Anggaran Rumah Tangga

[![Lumbung — Anggaran Rumah Tangga](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![Rank](https://make.fun/badge/best-household-budget-site-20261126-1457/fiqirealme52-max/BudgetSite/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![Reward](https://make.fun/badge/best-household-budget-site-20261126-1457/fiqirealme52-max/BudgetSite/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

Site anggaran rumah tangga untuk Keluarga Hartono (Jakarta, November 2026):
pemasukan Rp 11.800.000, pengeluaran Rp 8.110.000, sisa Rp 3.690.000,
ditabung Rp 2.200.000. Semua angka saling klop di semua halaman — jumlah
kategori sama dengan total pengeluaran, jumlah amplop + tabungan + cadangan
sama dengan pemasukan.

## Halaman

- **Dashboard** — ringkasan bulan, donat 10 kategori, Anggaran vs realisasi,
  panel Perhatian berisi insight bernominal yang dihitung dari data, 3 tagihan
  terdekat, progres tujuan, dan uang harian tersisa (sisa bebas ÷ hari tersisa).
- **Transaksi** — 42 transaksi November 2026 yang realistis, tambah / ubah /
  hapus, filter kategori, cari, dan ganti bulan (Oktober vs November).
- **Anggaran Amplop** — 6 amplop zero-based (Belanja, Listrik & Air, Sekolah,
  Transport, Darurat, Hiburan) dengan budget, terpakai, sisa, dan ubah budget.
- **Tagihan** — tagihan rutin, tanggal jatuh tempo, toggle lunas, dan yang
  jatuh tempo ≤ 7 hari ditandai.
- **Tujuan & Arisan** — 3 tujuan tabungan (Dana Darurat, Liburan, DP Motor)
  dengan tambah dana, plus Arisan RT: iuran Rp 500.000/bulan, 10 anggota,
  giliran bulan ini.
- **Laporan** — rekap bulanan, perbandingan Oktober vs November per kategori,
  dan rekonsiliasi pemasukan sampai ke sisa bebas.

## Teknik

Vanilla JS + satu CSS, tanpa framework, font sistem, tanpa gambar raster
(chart digambar sebagai SVG). Data tersimpan di `localStorage` sehingga
transaksi yang ditambah, budget amplop yang diubah, tagihan yang ditandai
lunas, dan dana tujuan tetap tersimpan saat halaman dimuat ulang.

## Menjalankan

```sh
node serve.ts
# buka http://localhost:8080
```

Atau sajikan folder `app/` dengan server statis apa pun. `main.ts` (Node 22,
tanpa dependensi) menyalin `app/` dan `screenshots/` ke `/output` dan menulis
`/output/dossier.json`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Dibuat untuk kompetisi make.fun
[Make the best household budget site](https://make.fun/bounty/best-household-budget-site-20261126-1457).
