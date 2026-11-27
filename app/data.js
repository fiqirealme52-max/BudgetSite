// Lumbung — data: semua angka Keluarga Hartono, November dan Oktober 2026.
// Satu sumber kebenaran: total halaman dihitung dari transaksi di bawah ini,
// jadi jumlah kategori selalu sama dengan total pengeluaran, dan jumlah
// amplop + tabungan + cadangan selalu sama dengan pemasukan. Jangan ubah satu
// angka tanpa menghitung ulang turunannya (cek: node --check + verify.js).

export const FAMILY = {
  name: 'Keluarga Hartono',
  city: 'Jakarta',
  members: 4,
  currency: 'Rp',
};

export function fmt(n) {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

export function fmtDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.getDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'][d.getMonth()];
}

// 10 kategori pengeluaran. Warna donat: keluarga terakota / slate / amber.
export const CATEGORIES = [
  { name: 'Belanja harian', color: '#C2410C' },
  { name: 'Listrik & Air', color: '#9A3412' },
  { name: 'Sekolah', color: '#334155' },
  { name: 'Transport', color: '#B45309' },
  { name: 'Makan di luar', color: '#7C2D12' },
  { name: 'Kesehatan', color: '#78716C' },
  { name: 'Hiburan', color: '#D97706' },
  { name: 'Pakaian', color: '#57534E' },
  { name: 'Komunikasi', color: '#1E293B' },
  { name: 'Lain-lain', color: '#A16207' },
];

// 6 amplop zero-based. Tiap amplop memetakan ke 1-2 kategori; "terpakai"
// DIHITUNG dari transaksi kategori itu, bukan diketik manual.
export const ENVELOPES = [
  { name: 'Belanja', budget: 3100000, cats: ['Belanja harian'] },
  { name: 'Listrik & Air', budget: 650000, cats: ['Listrik & Air'] },
  { name: 'Sekolah', budget: 1700000, cats: ['Sekolah'] },
  { name: 'Transport', budget: 900000, cats: ['Transport'] },
  { name: 'Darurat', budget: 600000, cats: ['Kesehatan'] },
  { name: 'Hiburan', budget: 650000, cats: ['Makan di luar', 'Hiburan'] },
];

// Kategori di luar amplop, tetap punya budget bulanan.
export const OTHERS = [
  { name: 'Pakaian', budget: 350000 },
  { name: 'Komunikasi', budget: 500000 },
  { name: 'Lain-lain', budget: 250000 },
];

export const MONTH_ORDER = ['2026-11', '2026-10'];

export const MONTHS = {
  '2026-11': {
    id: '2026-11',
    label: 'November 2026',
    short: 'Nov 2026',
    snapshot: '26 Nov 2026',
    daysLeft: 4,
    income: [
      { source: 'Gaji Budi Hartono', amount: 7400000 },
      { source: 'Gaji Sari Hartono', amount: 3600000 },
      { source: 'Freelance desain (Sari)', amount: 800000 },
    ],
    saved: 2200000,
    reserve: 900000,
    transactions: [
      { id: 'nov-01', date: '2026-11-01', desc: 'Gaji Budi Hartono', cat: 'Pemasukan', amount: 7400000, kind: 'in' },
      { id: 'nov-02', date: '2026-11-01', desc: 'Gaji Sari Hartono', cat: 'Pemasukan', amount: 3600000, kind: 'in' },
      { id: 'nov-03', date: '2026-11-01', desc: 'Langganan streaming', cat: 'Hiburan', amount: 120000, kind: 'out' },
      { id: 'nov-04', date: '2026-11-01', desc: 'IndiHome', cat: 'Komunikasi', amount: 350000, kind: 'out' },
      { id: 'nov-05', date: '2026-11-02', desc: 'Token PLN', cat: 'Listrik & Air', amount: 250000, kind: 'out' },
      { id: 'nov-06', date: '2026-11-03', desc: 'Beras 10 kg', cat: 'Belanja harian', amount: 140000, kind: 'out' },
      { id: 'nov-07', date: '2026-11-04', desc: 'Bensin', cat: 'Transport', amount: 150000, kind: 'out' },
      { id: 'nov-08', date: '2026-11-05', desc: 'SPP November', cat: 'Sekolah', amount: 1200000, kind: 'out' },
      { id: 'nov-09', date: '2026-11-05', desc: 'Pasar Minggu', cat: 'Belanja harian', amount: 410000, kind: 'out' },
      { id: 'nov-10', date: '2026-11-06', desc: 'Warung makan', cat: 'Makan di luar', amount: 95000, kind: 'out' },
      { id: 'nov-11', date: '2026-11-07', desc: 'Ojek online', cat: 'Transport', amount: 85000, kind: 'out' },
      { id: 'nov-12', date: '2026-11-08', desc: 'Supermarket', cat: 'Belanja harian', amount: 520000, kind: 'out' },
      { id: 'nov-13', date: '2026-11-08', desc: 'Pulsa Sari', cat: 'Komunikasi', amount: 75000, kind: 'out' },
      { id: 'nov-14', date: '2026-11-09', desc: 'Buku + alat tulis', cat: 'Sekolah', amount: 150000, kind: 'out' },
      { id: 'nov-15', date: '2026-11-09', desc: 'Potong rambut', cat: 'Lain-lain', amount: 65000, kind: 'out' },
      { id: 'nov-16', date: '2026-11-10', desc: 'BPJS Kesehatan', cat: 'Kesehatan', amount: 105000, kind: 'out' },
      { id: 'nov-17', date: '2026-11-10', desc: 'Baju anak', cat: 'Pakaian', amount: 180000, kind: 'out' },
      { id: 'nov-18', date: '2026-11-11', desc: 'Bensin', cat: 'Transport', amount: 170000, kind: 'out' },
      { id: 'nov-19', date: '2026-11-12', desc: 'Pasar Minggu', cat: 'Belanja harian', amount: 420000, kind: 'out' },
      { id: 'nov-20', date: '2026-11-12', desc: 'Les Matematika', cat: 'Sekolah', amount: 300000, kind: 'out' },
      { id: 'nov-21', date: '2026-11-13', desc: 'Warung makan', cat: 'Makan di luar', amount: 110000, kind: 'out' },
      { id: 'nov-22', date: '2026-11-14', desc: 'Minyak goreng + telur', cat: 'Belanja harian', amount: 130000, kind: 'out' },
      { id: 'nov-23', date: '2026-11-14', desc: 'Sabun + perawatan', cat: 'Lain-lain', amount: 90000, kind: 'out' },
      { id: 'nov-24', date: '2026-11-15', desc: 'Warung sayur', cat: 'Belanja harian', amount: 185000, kind: 'out' },
      { id: 'nov-25', date: '2026-11-15', desc: 'Obat apotek', cat: 'Kesehatan', amount: 145000, kind: 'out' },
      { id: 'nov-26', date: '2026-11-16', desc: 'Ojek online', cat: 'Transport', amount: 115000, kind: 'out' },
      { id: 'nov-27', date: '2026-11-16', desc: 'Bioskop', cat: 'Hiburan', amount: 140000, kind: 'out' },
      { id: 'nov-28', date: '2026-11-17', desc: 'Bakso keluarga', cat: 'Makan di luar', amount: 125000, kind: 'out' },
      { id: 'nov-29', date: '2026-11-18', desc: 'Token PLN', cat: 'Listrik & Air', amount: 170000, kind: 'out' },
      { id: 'nov-30', date: '2026-11-18', desc: 'Kaos + sandal', cat: 'Pakaian', amount: 120000, kind: 'out' },
      { id: 'nov-31', date: '2026-11-19', desc: 'Pasar Minggu', cat: 'Belanja harian', amount: 385000, kind: 'out' },
      { id: 'nov-32', date: '2026-11-20', desc: 'Freelance desain (Sari)', cat: 'Pemasukan', amount: 800000, kind: 'in' },
      { id: 'nov-33', date: '2026-11-20', desc: 'Tagihan PAM', cat: 'Listrik & Air', amount: 200000, kind: 'out' },
      { id: 'nov-34', date: '2026-11-20', desc: 'Bensin', cat: 'Transport', amount: 170000, kind: 'out' },
      { id: 'nov-35', date: '2026-11-21', desc: 'Daging ayam', cat: 'Belanja harian', amount: 130000, kind: 'out' },
      { id: 'nov-36', date: '2026-11-21', desc: 'Dokter anak', cat: 'Kesehatan', amount: 130000, kind: 'out' },
      { id: 'nov-37', date: '2026-11-22', desc: 'Supermarket', cat: 'Belanja harian', amount: 480000, kind: 'out' },
      { id: 'nov-38', date: '2026-11-22', desc: 'Pulsa Budi', cat: 'Komunikasi', amount: 60000, kind: 'out' },
      { id: 'nov-39', date: '2026-11-23', desc: 'Kopi + camilan', cat: 'Makan di luar', amount: 80000, kind: 'out' },
      { id: 'nov-40', date: '2026-11-24', desc: 'Parkir + tol', cat: 'Transport', amount: 150000, kind: 'out' },
      { id: 'nov-41', date: '2026-11-25', desc: 'Fotokopi + ATK', cat: 'Lain-lain', amount: 60000, kind: 'out' },
      { id: 'nov-42', date: '2026-11-26', desc: 'Warung sayur', cat: 'Belanja harian', amount: 150000, kind: 'out' },
    ],
  },
  '2026-10': {
    id: '2026-10',
    label: 'Oktober 2026',
    short: 'Okt 2026',
    snapshot: '31 Okt 2026',
    daysLeft: 0,
    income: [
      { source: 'Gaji Budi Hartono', amount: 7400000 },
      { source: 'Gaji Sari Hartono', amount: 3600000 },
      { source: 'Freelance desain (Sari)', amount: 800000 },
    ],
    saved: 2000000,
    reserve: 1100000,
    transactions: [
      { id: 'okt-01', date: '2026-10-01', desc: 'Gaji Budi Hartono', cat: 'Pemasukan', amount: 7400000, kind: 'in' },
      { id: 'okt-02', date: '2026-10-01', desc: 'Gaji Sari Hartono', cat: 'Pemasukan', amount: 3600000, kind: 'in' },
      { id: 'okt-03', date: '2026-10-01', desc: 'Langganan streaming', cat: 'Hiburan', amount: 120000, kind: 'out' },
      { id: 'okt-04', date: '2026-10-01', desc: 'IndiHome', cat: 'Komunikasi', amount: 350000, kind: 'out' },
      { id: 'okt-05', date: '2026-10-02', desc: 'Token PLN', cat: 'Listrik & Air', amount: 250000, kind: 'out' },
      { id: 'okt-06', date: '2026-10-03', desc: 'Pasar Minggu', cat: 'Belanja harian', amount: 450000, kind: 'out' },
      { id: 'okt-07', date: '2026-10-04', desc: 'Bensin', cat: 'Transport', amount: 160000, kind: 'out' },
      { id: 'okt-08', date: '2026-10-05', desc: 'SPP Oktober', cat: 'Sekolah', amount: 1200000, kind: 'out' },
      { id: 'okt-09', date: '2026-10-06', desc: 'Warung makan', cat: 'Makan di luar', amount: 120000, kind: 'out' },
      { id: 'okt-10', date: '2026-10-07', desc: 'Supermarket', cat: 'Belanja harian', amount: 520000, kind: 'out' },
      { id: 'okt-11', date: '2026-10-08', desc: 'Ojek online', cat: 'Transport', amount: 95000, kind: 'out' },
      { id: 'okt-12', date: '2026-10-09', desc: 'Buku + alat tulis', cat: 'Sekolah', amount: 200000, kind: 'out' },
      { id: 'okt-13', date: '2026-10-09', desc: 'Potong rambut', cat: 'Lain-lain', amount: 100000, kind: 'out' },
      { id: 'okt-14', date: '2026-10-09', desc: 'Pulsa Sari', cat: 'Komunikasi', amount: 75000, kind: 'out' },
      { id: 'okt-15', date: '2026-10-10', desc: 'BPJS Kesehatan', cat: 'Kesehatan', amount: 105000, kind: 'out' },
      { id: 'okt-16', date: '2026-10-10', desc: 'Pasar Minggu', cat: 'Belanja harian', amount: 430000, kind: 'out' },
      { id: 'okt-17', date: '2026-10-11', desc: 'Baju anak', cat: 'Pakaian', amount: 150000, kind: 'out' },
      { id: 'okt-18', date: '2026-10-11', desc: 'Bensin', cat: 'Transport', amount: 170000, kind: 'out' },
      { id: 'okt-19', date: '2026-10-12', desc: 'Les Matematika', cat: 'Sekolah', amount: 300000, kind: 'out' },
      { id: 'okt-20', date: '2026-10-13', desc: 'Warung makan', cat: 'Makan di luar', amount: 110000, kind: 'out' },
      { id: 'okt-21', date: '2026-10-14', desc: 'Obat apotek', cat: 'Kesehatan', amount: 120000, kind: 'out' },
      { id: 'okt-22', date: '2026-10-15', desc: 'Supermarket', cat: 'Belanja harian', amount: 480000, kind: 'out' },
      { id: 'okt-23', date: '2026-10-15', desc: 'Sabun + perawatan', cat: 'Lain-lain', amount: 90000, kind: 'out' },
      { id: 'okt-24', date: '2026-10-16', desc: 'Ojek online', cat: 'Transport', amount: 115000, kind: 'out' },
      { id: 'okt-25', date: '2026-10-17', desc: 'Token PLN', cat: 'Listrik & Air', amount: 190000, kind: 'out' },
      { id: 'okt-26', date: '2026-10-17', desc: 'Bioskop', cat: 'Hiburan', amount: 200000, kind: 'out' },
      { id: 'okt-27', date: '2026-10-18', desc: 'Freelance desain (Sari)', cat: 'Pemasukan', amount: 800000, kind: 'in' },
      { id: 'okt-28', date: '2026-10-18', desc: 'Warung sayur', cat: 'Belanja harian', amount: 390000, kind: 'out' },
      { id: 'okt-29', date: '2026-10-18', desc: 'Bakso keluarga', cat: 'Makan di luar', amount: 130000, kind: 'out' },
      { id: 'okt-30', date: '2026-10-19', desc: 'Kaos', cat: 'Pakaian', amount: 110000, kind: 'out' },
      { id: 'okt-31', date: '2026-10-20', desc: 'Tagihan PAM', cat: 'Listrik & Air', amount: 200000, kind: 'out' },
      { id: 'okt-32', date: '2026-10-20', desc: 'Bensin', cat: 'Transport', amount: 180000, kind: 'out' },
      { id: 'okt-33', date: '2026-10-21', desc: 'Pulsa Budi', cat: 'Komunikasi', amount: 60000, kind: 'out' },
      { id: 'okt-34', date: '2026-10-22', desc: 'Dokter anak', cat: 'Kesehatan', amount: 85000, kind: 'out' },
      { id: 'okt-35', date: '2026-10-24', desc: 'Pasar Minggu', cat: 'Belanja harian', amount: 410000, kind: 'out' },
      { id: 'okt-36', date: '2026-10-24', desc: 'Kopi + camilan', cat: 'Makan di luar', amount: 120000, kind: 'out' },
      { id: 'okt-37', date: '2026-10-25', desc: 'Parkir + tol', cat: 'Transport', amount: 170000, kind: 'out' },
      { id: 'okt-38', date: '2026-10-26', desc: 'Fotokopi + ATK', cat: 'Lain-lain', amount: 115000, kind: 'out' },
      { id: 'okt-39', date: '2026-10-28', desc: 'Supermarket', cat: 'Belanja harian', amount: 470000, kind: 'out' },
    ],
  },
};

// Tagihan rutin. Semua nominalnya ada di transaksi bulan itu (SPP di Sekolah,
// BPJS di Kesehatan, PLN+PAM di Listrik & Air, IndiHome di Komunikasi).
export const BILLS = {
  '2026-11': [
    { name: 'IndiHome', amount: 350000, due: '2026-12-01', dueLabel: '1 Des 2026', paid: false, note: 'Internet rumah' },
    { name: 'SPP Sekolah', amount: 1200000, due: '2026-11-05', dueLabel: '5 Nov 2026', paid: true, note: 'Sekolah anak' },
    { name: 'BPJS Kesehatan', amount: 105000, due: '2026-11-10', dueLabel: '10 Nov 2026', paid: true, note: 'Iuran bulanan' },
    { name: 'PLN (token)', amount: 420000, due: '2026-11-20', dueLabel: '20 Nov 2026', paid: true, note: 'Token 2 & 18 Nov' },
    { name: 'PAM (air)', amount: 200000, due: '2026-11-20', dueLabel: '20 Nov 2026', paid: true, note: 'Tagihan air' },
  ],
  '2026-10': [
    { name: 'IndiHome', amount: 350000, due: '2026-10-01', dueLabel: '1 Okt 2026', paid: true, note: 'Internet rumah' },
    { name: 'SPP Sekolah', amount: 1200000, due: '2026-10-05', dueLabel: '5 Okt 2026', paid: true, note: 'Sekolah anak' },
    { name: 'BPJS Kesehatan', amount: 105000, due: '2026-10-10', dueLabel: '10 Okt 2026', paid: true, note: 'Iuran bulanan' },
    { name: 'PLN (token)', amount: 440000, due: '2026-10-20', dueLabel: '20 Okt 2026', paid: true, note: 'Token 2 & 17 Okt' },
    { name: 'PAM (air)', amount: 200000, due: '2026-10-20', dueLabel: '20 Okt 2026', paid: true, note: 'Tagihan air' },
  ],
};

// Tujuan tabungan. "saved" = terkumpul sampai akhir bulan itu; "add" = yang
// ditabung bulan itu. Jumlah "add" satu bulan = "saved" bulan itu (Nov:
// 1.000.000 + 700.000 + 500.000 = 2.200.000).
export const GOALS = {
  '2026-11': [
    { name: 'Dana Darurat', target: 10000000, saved: 6400000, add: 1000000, note: 'Target 6 bulan pengeluaran pokok' },
    { name: 'Liburan Keluarga', target: 3000000, saved: 1850000, add: 700000, note: 'Yogyakarta, libur sekolah Desember' },
    { name: 'DP Motor', target: 5000000, saved: 2300000, add: 500000, note: 'Ganti motor lama, target Juni 2027' },
  ],
  '2026-10': [
    { name: 'Dana Darurat', target: 10000000, saved: 5400000, add: 900000, note: 'Target 6 bulan pengeluaran pokok' },
    { name: 'Liburan Keluarga', target: 3000000, saved: 1150000, add: 600000, note: 'Yogyakarta, libur sekolah Desember' },
    { name: 'DP Motor', target: 5000000, saved: 1800000, add: 500000, note: 'Ganti motor lama, target Juni 2027' },
  ],
};

// Arisan RT: iuran Rp 500.000/bulan, 10 anggota, pot Rp 5.000.000.
export const ARISAN = {
  iuran: 500000,
  members: 10,
  pot: 5000000,
  turn: 'Ratna Wijaya',
  turnMonth: 'November 2026',
  paid: ['Ratna Wijaya', 'Budi Hartono', 'Sari Hartono', 'Agus Prasetyo', 'Dewi Lestari', 'Joko Susilo', 'Rina Marlina', 'Bambang Riyanto'],
  unpaid: ['Dedi Santoso', 'Maya Putri'],
  deadline: '30 Nov 2026',
};

// ---- turunan: semua dihitung dari transaksi, bukan diketik ----

export function sumTx(txns, kind) {
  return txns.filter((t) => t.kind === kind).reduce((s, t) => s + t.amount, 0);
}

export function catTotals(monthId, txns) {
  const tx = txns ?? MONTHS[monthId].transactions;
  const out = {};
  for (const c of CATEGORIES) out[c.name] = 0;
  for (const t of tx) {
    if (t.kind === 'out' && t.cat in out) out[t.cat] += t.amount;
    if (t.kind === 'out' && !(t.cat in out)) out[t.cat] = t.amount;
  }
  return out;
}

export function monthTotals(monthId, txns) {
  const m = MONTHS[monthId];
  const tx = txns ?? m.transactions;
  const income = sumTx(tx, 'in');
  const expense = sumTx(tx, 'out');
  const sisa = income - expense;
  const sisaBebas = sisa - m.saved;
  return {
    income, expense, sisa,
    saved: m.saved, reserve: m.reserve, sisaBebas,
    daily: m.daysLeft > 0 ? Math.round(sisaBebas / m.daysLeft) : 0,
    daysLeft: m.daysLeft, snapshot: m.snapshot,
    txCount: tx.filter((t) => t.kind === 'out').length,
  };
}

export function envelopeStatus(monthId, txns, budgetOverrides) {
  const cats = catTotals(monthId, txns);
  return ENVELOPES.map((e) => {
    const spent = e.cats.reduce((s, c) => s + (cats[c] || 0), 0);
    const budget = budgetOverrides && budgetOverrides[e.name] != null ? budgetOverrides[e.name] : e.budget;
    return { name: e.name, budget, spent, left: budget - spent, pct: budget ? spent / budget : 0, cats: e.cats };
  });
}

export function otherStatus(monthId, txns) {
  const cats = catTotals(monthId, txns);
  return OTHERS.map((o) => {
    const spent = cats[o.name] || 0;
    return { name: o.name, budget: o.budget, spent, left: o.budget - spent, pct: o.budget ? spent / o.budget : 0 };
  });
}

// Insight bernominal, dihitung dari data bulan berjalan — bukan teks statis.
export function insights(monthId, txns, budgetOverrides) {
  const t = monthTotals(monthId, txns);
  const envs = envelopeStatus(monthId, txns, budgetOverrides);
  const cats = catTotals(monthId, txns);
  const out = [];
  for (const e of envs) {
    if (e.spent > e.budget) {
      out.push({ kind: 'over', text: `<b>${e.name} lebih ${fmt(e.spent - e.budget)}</b> dari budget ${fmt(e.budget)} — terpakai ${fmt(e.spent)}. Pangkas jajan dan makan di luar sampai akhir bulan.` });
    }
  }
  for (const e of envs) {
    if (e.spent <= e.budget && e.pct >= 0.95) {
      out.push({ kind: 'warn', text: `<b>${e.name} hampir habis: sisa ${fmt(e.left)}</b> (${Math.round(e.pct * 100)}% terpakai dari ${fmt(e.budget)}).` });
    }
  }
  const biggest = Object.entries(cats).sort((a, b) => b[1] - a[1])[0];
  out.push({ kind: 'info', text: `Pengeluaran terbesar: <b>${biggest[0]} ${fmt(biggest[1])}</b> — ${Math.round((biggest[1] / t.expense) * 100)}% dari total pengeluaran.` });
  if (t.daysLeft > 0) {
    out.push({ kind: 'info', text: `Sisa bebas <b>${fmt(t.sisaBebas)}</b> untuk ${t.daysLeft} hari terakhir bulan ini — <b>${fmt(t.daily)} per hari</b>. Di bawah itu, ambil dari cadangan ${fmt(t.reserve)}.` });
  } else {
    out.push({ kind: 'info', text: `Bulan ditutup dengan sisa bebas <b>${fmt(t.sisaBebas)}</b> setelah menabung ${fmt(t.saved)}.` });
  }
  const envLeft = envs.reduce((s, e) => s + e.left, 0);
  const othLeft = otherStatus(monthId, txns).reduce((s, o) => s + o.left, 0);
  out.push({ kind: 'info', text: `Sisa bebas ${fmt(t.sisaBebas)} itu = sisa amplop ${fmt(envLeft)} + sisa lainnya ${fmt(othLeft)} + cadangan ${fmt(t.reserve)} — klop dengan pemasukan.` });
  return out;
}

export function compareMonths() {
  const a = catTotals('2026-11');
  const b = catTotals('2026-10');
  return CATEGORIES.map((c) => ({
    name: c.name, nov: a[c.name] || 0, okt: b[c.name] || 0,
    diff: (a[c.name] || 0) - (b[c.name] || 0),
  }));
}
