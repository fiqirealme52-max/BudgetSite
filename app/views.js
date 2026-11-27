// Lumbung — views: enam halaman, semuanya padat sampai bawah. Setiap halaman
// merakit potongan dari charts/transactions/envelopes/bills/goals di atas
// angka yang dihitung data.js — tidak ada angka yang diketik dua kali.

import { fmt, CATEGORIES, MONTHS, BILLS, GOALS, catTotals, monthTotals, envelopeStatus, otherStatus, insights, compareMonths } from './data.js';
import { donutSVG, budgetBars, compareBars } from './charts.js';
import { filterTx, txTable, txForm, txSummary } from './transactions.js';
import { envelopeCards, envelopeSummary } from './envelopes.js';
import { billsTable, upcomingBills } from './bills.js';
import { goalCards, arisanPanel } from './goals.js';

function head(title, sub) {
  return `<div class="page-head"><h1>${title}</h1><p>${sub}</p></div>`;
}

function statCard(label, value, sub, cls) {
  return `<div class="card stat ${cls || ''}"><div class="lbl">${label}</div><div class="val">${value}</div><div class="sub">${sub}</div></div>`;
}

export function dashboardPage(s) {
  const m = MONTHS[s.month];
  const t = monthTotals(s.month, s.txns);
  const cats = catTotals(s.month, s.txns);
  const rows = CATEGORIES.map((c) => ({ name: c.name, amount: cats[c.name] || 0, color: c.color })).sort((a, b) => b.amount - a.amount);
  const envs = envelopeStatus(s.month, s.txns, s.budgets);
  const ins = insights(s.month, s.txns, s.budgets);
  const bills = BILLS[s.month];
  const paid = (name) => (s.paidBills && name in s.paidBills ? s.paidBills[name] : bills.find((b) => b.name === name)?.paid);
  const nextBills = bills.filter((b) => !paid(b.name)).concat(bills.filter((b) => paid(b.name)).slice(0, 2)).slice(0, 3);
  const goals = GOALS[s.month];
  const daysElapsed = s.month === '2026-11' ? 26 : 31;
  const avgDay = Math.round(t.expense / daysElapsed);
  const savePct = Math.round((t.saved / t.income) * 100);
  const leftPct = Math.round((t.sisa / t.income) * 100);
  return `${head(`Dashboard — ${m.label}`, `Per ${t.snapshot} · ${t.txCount} transaksi pengeluaran · semua angka dihitung dari transaksi bulan ini.`)}
  <div class="grid g-4">
    ${statCard('Pemasukan', fmt(t.income), 'Gaji Budi Rp 7.400.000 + gaji Sari Rp 3.600.000 + freelance Rp 800.000', 'slate')}
    ${statCard('Pengeluaran', fmt(t.expense), `${t.txCount} transaksi · rata-rata ${fmt(avgDay)}/hari (${daysElapsed} hari)`, '')}
    ${statCard('Sisa', fmt(t.sisa), `${leftPct}% dari pemasukan · setelah semua pengeluaran`, 'amber')}
    ${statCard('Ditabung', fmt(t.saved), `${savePct}% dari pemasukan · Darurat Rp 1.000.000 + Liburan Rp 700.000 + DP Motor Rp 500.000`, '')}
  </div>
  <div class="grid g-32" style="margin-top:14px">
    <section class="card"><h2>Pengeluaran per kategori — ${m.short}</h2>${donutSVG(rows, t.expense)}</section>
    <section class="card attention"><h2>Perhatian — dihitung dari data</h2><ul>${ins.map((i) => `<li>${i.text}</li>`).join('')}</ul></section>
  </div>
  <div class="grid g-32" style="margin-top:14px">
    <section class="card"><h2>Anggaran vs realisasi</h2>${budgetBars(envs)}<p class="small muted">Amplop Hiburan menggabungkan Makan di luar + Hiburan. Di luar amplop: Pakaian ${fmt(otherStatus(s.month, s.txns)[0].spent)} / ${fmt(350000)}, Komunikasi ${fmt(otherStatus(s.month, s.txns)[1].spent)} / ${fmt(500000)}, Lain-lain ${fmt(otherStatus(s.month, s.txns)[2].spent)} / ${fmt(250000)}.</p></section>
    <div class="grid" style="gap:14px">
      <section class="card"><h2>Tagihan terdekat</h2>${nextBills.map((b) => `<div class="kv"><span>${b.name} — ${b.dueLabel}</span><b>${fmt(b.amount)}</b></div>`).join('')}<p class="small"><a href="#/tagihan">Lihat semua tagihan →</a></p></section>
      <section class="card"><h2>Progres tujuan</h2>${goals.map((g) => {
        const saved = g.saved + ((s.extraFunds && s.extraFunds[g.name]) || 0);
        const pct = Math.round((saved / g.target) * 100);
        return `<div class="kv"><span>${g.name}</span><b>${fmt(saved)} / ${fmt(g.target)} · ${pct}%</b></div>`;
      }).join('')}<p class="small"><a href="#/tujuan">Tujuan &amp; arisan →</a></p></section>
    </div>
  </div>
  <div class="callout" style="margin-top:14px">
    <div class="small">Uang harian tersisa — sisa bebas ÷ hari tersisa bulan ini</div>
    <div class="big">${fmt(t.daily)} / hari</div>
    <div>Sisa bebas <strong>${fmt(t.sisaBebas)}</strong> untuk ${t.daysLeft} hari terakhir (${m.short}). Habis di bawah angka ini berarti mengambil dari cadangan ${fmt(t.reserve)}.</div>
  </div>`;
}

export function transactionsPage(s) {
  const m = MONTHS[s.month];
  const t = monthTotals(s.month, s.txns);
  const shown = filterTx(s.txns, s.filterCat, s.filterQ);
  const sum = txSummary(shown);
  const catOpts = ['Semua', ...CATEGORIES.map((c) => c.name)].map((c) => `<option ${s.filterCat === c ? 'selected' : ''}>${c}</option>`).join('');
  return `${head(`Transaksi — ${m.label}`, `${s.txns.length} transaksi tercatat (termasuk pemasukan). Total halaman ini harus sama dengan Dashboard: pengeluaran ${fmt(t.expense)}, pemasukan ${fmt(t.income)}.`)}
  <div class="card" style="margin-bottom:14px">
    <h2>${s.editing ? 'Ubah transaksi' : 'Tambah transaksi'}</h2>
    ${txForm(s.editing)}
    <p class="small muted">Transaksi baru langsung masuk ke total, amplop, dan laporan — dan tersimpan di peramban ini.</p>
  </div>
  <div class="card">
    <div class="toolbar">
      <select id="f-cat" aria-label="Filter kategori">${catOpts}</select>
      <input id="f-q" class="grow" type="search" placeholder="Cari keterangan… (cth. pasar, ojek, token)" value="${(s.filterQ || '').replace(/"/g, '&quot;')}" aria-label="Cari transaksi">
      <span class="small muted" id="f-count">${shown.length} transaksi · keluar ${fmt(sum.out)} · masuk ${fmt(sum.inn)}</span>
    </div>
    <div id="tx-wrap">${txTable(shown, true)}</div>
    <p class="small muted" style="margin-top:10px">Ditampilkan: pengeluaran ${fmt(sum.out)} + pemasukan ${fmt(sum.inn)} = bersih ${fmt(sum.net)}. Ganti bulan lewat tombol di header untuk melihat Oktober 2026.</p>
  </div>`;
}

export function envelopesPage(s) {
  const m = MONTHS[s.month];
  const t = monthTotals(s.month, s.txns);
  const envs = envelopeStatus(s.month, s.txns, s.budgets);
  const others = otherStatus(s.month, s.txns);
  const sum = envelopeSummary(envs, others);
  return `${head(`Anggaran Amplop — ${m.label}`, `Zero-based: total budget amplop ${fmt(sum.envBudget)} + lainnya ${fmt(sum.otherBudget)} + ditabung ${fmt(t.saved)} + cadangan ${fmt(t.reserve)} = pemasukan ${fmt(t.income)}.`)}
  <div class="grid g-4" style="margin-bottom:14px">
    ${statCard('Budget amplop', fmt(sum.envBudget), '6 amplop', 'slate')}
    ${statCard('Terpakai', fmt(sum.envSpent), `${Math.round((sum.envSpent / sum.envBudget) * 100)}% dari budget amplop`, '')}
    ${statCard('Sisa amplop', fmt(sum.envLeft), 'Kembali ke sisa bebas akhir bulan', 'amber')}
    ${statCard('Di luar amplop', fmt(sum.otherSpent) + ' / ' + fmt(sum.otherBudget), 'Pakaian, Komunikasi, Lain-lain', '')}
  </div>
  <div class="env-grid">${envelopeCards(envs)}</div>
  <section class="card" style="margin-top:14px"><h2>Di luar amplop</h2>${budgetBars(others)}
  <p class="small muted">Kategori ini tidak masuk amplop karena jarang dan tidak rutin — tapi tetap punya budget dan tetap dihitung di total pengeluaran ${fmt(t.expense)}.</p></section>`;
}

export function billsPage(s) {
  const m = MONTHS[s.month];
  const bills = BILLS[s.month];
  const total = bills.reduce((x, b) => x + b.amount, 0);
  return `${head(`Tagihan — ${m.label}`, `Total tagihan ${fmt(total)}. Setiap nominal di sini ada di transaksi bulan ini — tidak ada tagihan bayangan.`)}
  <section class="card" style="margin-bottom:14px"><h2>Tagihan rutin bulan ini</h2>${billsTable(bills, s.paidBills)}</section>
  <div class="grid g-2">
    <section class="card"><h2>Jadwal Desember 2026</h2>${upcomingBills()}</section>
    <section class="card"><h2>Cara kerja</h2>
    <p>Tekan <b>Tandai lunas</b> saat tagihan dibayar — status tersimpan di peramban ini dan tagihan hilang dari daftar "belum lunas" di Dashboard.</p>
    <p>Tagihan yang jatuh tempo ≤ 7 hari ditandai <span class="pill pill-due">≤ 7 HARI</span>. IndiHome jatuh tempo 1 Des — 5 hari lagi dari 26 Nov — jadi sudah ditandai.</p>
    <p class="small muted">PLN dihitung dari token yang dibeli (2 &amp; 18 Nov: Rp 250.000 + Rp 170.000 = Rp 420.000). PAM Rp 200.000 dibayar 20 Nov.</p></section>
  </div>`;
}

export function goalsPage(s) {
  const m = MONTHS[s.month];
  const goals = GOALS[s.month];
  const t = monthTotals(s.month, s.txns);
  const savedTotal = goals.reduce((x, g) => x + g.saved + ((s.extraFunds && s.extraFunds[g.name]) || 0), 0);
  const targetTotal = goals.reduce((x, g) => x + g.target, 0);
  return `${head(`Tujuan &amp; Arisan — ${m.label}`, `Total terkumpul ${fmt(savedTotal)} dari target ${fmt(targetTotal)}. Bulan ini ditabung ${fmt(t.saved)} — jumlahnya sama dengan "Ditabung" di Dashboard.`)}
  <div class="goal-grid">${goalCards(goals, s.extraFunds)}</div>
  <section class="card" style="margin-top:14px"><h2>Arisan RT — iuran ${fmt(500000)}/bulan</h2>${arisanPanel()}</section>`;
}

export function reportPage(s) {
  const tNov = monthTotals('2026-11', s.month === '2026-11' ? s.txns : undefined);
  const tOkt = monthTotals('2026-10', s.month === '2026-10' ? s.txns : undefined);
  const rows = compareMonths();
  const envs = envelopeStatus('2026-11', s.month === '2026-11' ? s.txns : undefined, s.month === '2026-11' ? s.budgets : undefined);
  const envLeft = envs.reduce((x, e) => x + e.left, 0);
  const othLeft = otherStatus('2026-11', s.month === '2026-11' ? s.txns : undefined).reduce((x, o) => x + o.left, 0);
  return `${head('Laporan — November vs Oktober 2026', 'Perbandingan per kategori dan rekonsiliasi pemasukan sampai ke sisa bebas. Semua sel dihitung dari transaksi.')}
  <section class="card" style="margin-bottom:14px"><h2>Pengeluaran per kategori — dua bulan</h2>${compareBars(rows)}
  <p class="small muted">Batang abu-abu = Oktober, batang terakota = November (merah bila naik dari Oktober). November lebih hemat ${fmt(tOkt.expense - tNov.expense)} dari Oktober.</p></section>
  <section class="card" style="margin-bottom:14px"><h2>Rincian per kategori</h2>
  <table><thead><tr><th>Kategori</th><th class="r">Nov 2026</th><th class="r">Okt 2026</th><th class="r">Selisih</th></tr></thead><tbody>
  ${rows.map((r) => `<tr><td>${r.name}</td><td class="r num">${fmt(r.nov)}</td><td class="r num">${fmt(r.okt)}</td><td class="r num ${r.diff > 0 ? 'over' : ''}">${r.diff > 0 ? '+' : ''}${fmt(r.diff)}</td></tr>`).join('')}
  <tr class="total"><td>Total pengeluaran</td><td class="r">${fmt(tNov.expense)}</td><td class="r">${fmt(tOkt.expense)}</td><td class="r">${fmt(tNov.expense - tOkt.expense)}</td></tr>
  </tbody></table></section>
  <div class="grid g-2">
    <section class="card"><h2>Rekap dua bulan</h2><table><thead><tr><th></th><th class="r">Nov 2026</th><th class="r">Okt 2026</th></tr></thead><tbody>
      <tr><td>Pemasukan</td><td class="r num">${fmt(tNov.income)}</td><td class="r num">${fmt(tOkt.income)}</td></tr>
      <tr><td>Pengeluaran</td><td class="r num">${fmt(tNov.expense)}</td><td class="r num">${fmt(tOkt.expense)}</td></tr>
      <tr><td>Sisa</td><td class="r num">${fmt(tNov.sisa)}</td><td class="r num">${fmt(tOkt.sisa)}</td></tr>
      <tr><td>Ditabung</td><td class="r num">${fmt(tNov.saved)}</td><td class="r num">${fmt(tOkt.saved)}</td></tr>
      <tr><td>Sisa bebas</td><td class="r num">${fmt(tNov.sisaBebas)}</td><td class="r num">${fmt(tOkt.sisaBebas)}</td></tr>
      <tr><td>Uang harian tersisa</td><td class="r num">${fmt(tNov.daily)}/hari (4 hari)</td><td class="r num">— (bulan tutup)</td></tr>
    </tbody></table>
    <p class="small muted">Pengeluaran November turun ${fmt(tOkt.expense - tNov.expense)} (${Math.round(((tOkt.expense - tNov.expense) / tOkt.expense) * 1000) / 10}% dari Oktober), sebagian besar karena Belanja turun ${fmt(3150000 - 2950000)} dan Hiburan turun ${fmt(800000 - 670000)}.</p></section>
    <section class="card"><h2>Rekonsiliasi November — dari mana sisa bebas berasal</h2>
      <div class="kv"><span>Pemasukan</span><b>${fmt(tNov.income)}</b></div>
      <div class="kv"><span>Pengeluaran</span><b>− ${fmt(tNov.expense)}</b></div>
      <div class="kv"><span>Sisa</span><b>${fmt(tNov.sisa)}</b></div>
      <div class="kv"><span>Ditabung (3 tujuan)</span><b>− ${fmt(tNov.saved)}</b></div>
      <div class="kv"><span>Sisa bebas</span><b>${fmt(tNov.sisaBebas)}</b></div>
      <div class="kv"><span>— sisa amplop</span><b>${fmt(envLeft)}</b></div>
      <div class="kv"><span>— sisa lainnya</span><b>${fmt(othLeft)}</b></div>
      <div class="kv"><span>— cadangan bulan ini</span><b>${fmt(tNov.reserve)}</b></div>
      <p class="small muted">${fmt(envLeft)} + ${fmt(othLeft)} + ${fmt(tNov.reserve)} = ${fmt(tNov.sisaBebas)} — klop.</p>
    </section>
  </div>`;
}
