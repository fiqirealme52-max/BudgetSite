// Lumbung — transaksi: filter, cari, dan form tambah/ubah. Semua render di
// sini murni dari daftar transaksi yang diberikan; state (bulan, filter,
// perubahan pengguna) dipegang main.js.

import { fmt, fmtDate, CATEGORIES } from './data.js';

export function filterTx(txns, cat, q) {
  const query = (q || '').trim().toLowerCase();
  return txns
    .filter((t) => (cat === 'Semua' || t.cat === cat))
    .filter((t) => !query || t.desc.toLowerCase().includes(query) || t.cat.toLowerCase().includes(query))
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function txTable(txns, editable) {
  if (!txns.length) {
    return '<p class="muted">Tidak ada transaksi yang cocok dengan filter ini. Ubah kategori atau kata kunci pencarian.</p>';
  }
  const rows = txns.map((t) => {
    const sign = t.kind === 'in' ? '+' : '−';
    const cls = t.kind === 'in' ? '' : 'over';
    const actions = editable
      ? `<td><button class="ghost small-btn" data-action="edit-tx" data-id="${t.id}">Ubah</button> <button class="danger small-btn" data-action="del-tx" data-id="${t.id}">Hapus</button></td>`
      : '';
    return `<tr>
      <td>${fmtDate(t.date)}</td>
      <td>${t.desc}</td>
      <td>${t.cat}</td>
      <td class="r num ${cls}">${sign} ${fmt(t.amount)}</td>
      ${actions}
    </tr>`;
  }).join('');
  return `<table>
    <thead><tr><th>Tanggal</th><th>Keterangan</th><th>Kategori</th><th class="r">Jumlah</th>${editable ? '<th>Aksi</th>' : ''}</tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
}

export function txForm(editing) {
  const cats = ['Pemasukan', ...CATEGORIES.map((c) => c.name)];
  const opts = cats.map((c) => `<option value="${c}" ${editing && editing.cat === c ? 'selected' : ''}>${c}</option>`).join('');
  return `<form class="inline" id="tx-form">
    <input type="hidden" name="tx-id" value="${editing ? editing.id : ''}">
    <label class="f">Tanggal<input type="date" name="tx-date" value="${editing ? editing.date : '2026-11-26'}" required></label>
    <label class="f">Keterangan<input type="text" name="tx-desc" value="${editing ? editing.desc.replace(/"/g, '&quot;') : ''}" placeholder="cth. Pasar Minggu" required style="min-width:180px"></label>
    <label class="f">Kategori<select name="tx-cat">${opts}</select></label>
    <label class="f">Jumlah (Rp)<input type="number" name="tx-amount" min="1000" step="500" value="${editing ? editing.amount : ''}" placeholder="150000" required></label>
    <label class="f">Jenis<select name="tx-kind">
      <option value="out" ${!editing || editing.kind === 'out' ? 'selected' : ''}>Pengeluaran</option>
      <option value="in" ${editing && editing.kind === 'in' ? 'selected' : ''}>Pemasukan</option>
    </select></label>
    <button type="submit">${editing ? 'Simpan perubahan' : 'Tambah transaksi'}</button>
    ${editing ? '<button type="button" class="ghost" data-action="cancel-edit">Batal</button>' : ''}
  </form>`;
}

export function txSummary(txns) {
  const inn = txns.filter((t) => t.kind === 'in').reduce((s, t) => s + t.amount, 0);
  const out = txns.filter((t) => t.kind === 'out').reduce((s, t) => s + t.amount, 0);
  return { inn, out, net: inn - out, count: txns.length };
}
