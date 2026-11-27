// Lumbung — tagihan: daftar rutin dengan jatuh tempo dan toggle lunas.
// Toggle menyimpan status ke localStorage lewat main.js.

import { fmt } from './data.js';

export function billsTable(bills, paidOverrides) {
  const rows = bills.map((b, i) => {
    const paid = paidOverrides && b.name in paidOverrides ? paidOverrides[b.name] : b.paid;
    const dueSoon = !paid && b.due >= '2026-11-26' && b.due <= '2026-12-03';
    return `<tr class="${!paid ? 'hl' : ''}">
      <td><strong>${b.name}</strong><br><span class="small muted">${b.note}</span></td>
      <td class="r num">${fmt(b.amount)}</td>
      <td>${b.dueLabel}${dueSoon ? ' <span class="pill pill-due">≤ 7 HARI</span>' : ''}</td>
      <td><span class="pill ${paid ? 'pill-paid' : 'pill-over'}">${paid ? '✓ Lunas' : 'Belum lunas'}</span></td>
      <td><button class="ghost small-btn" data-action="toggle-bill" data-name="${b.name}">${paid ? 'Tandai belum' : 'Tandai lunas'}</button></td>
    </tr>`;
  }).join('');
  const total = bills.reduce((s, b) => s + b.amount, 0);
  const unpaid = bills.filter((b) => !(paidOverrides && b.name in paidOverrides ? paidOverrides[b.name] : b.paid));
  const unpaidTotal = unpaid.reduce((s, b) => s + b.amount, 0);
  return `<table>
    <thead><tr><th>Tagihan</th><th class="r">Jumlah</th><th>Jatuh tempo</th><th>Status</th><th>Aksi</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr class="total"><td>Total tagihan bulan ini</td><td class="r">${fmt(total)}</td><td colspan="3">${unpaid.length ? `Belum lunas: ${unpaid.length} tagihan (${fmt(unpaidTotal)})` : 'Semua lunas.'}</td></tr></tfoot>
  </table>`;
}

export function upcomingBills() {
  return `<div class="kv"><span>IndiHome — 1 Des 2026</span><b>Rp 350.000</b></div>
  <div class="kv"><span>SPP Sekolah — 5 Des 2026</span><b>Rp 1.200.000</b></div>
  <div class="kv"><span>BPJS Kesehatan — 10 Des 2026</span><b>Rp 105.000</b></div>
  <div class="kv"><span>PLN + PAM — 20 Des 2026</span><b>Rp 620.000</b></div>
  <p class="small muted">Jadwal Desember memakai nominal yang sama dengan November,
  kecuali token PLN yang menyesuaikan pemakaian.</p>`;
}
