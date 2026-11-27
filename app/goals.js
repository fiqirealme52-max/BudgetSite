// Lumbung — tujuan tabungan + arisan. "Tambah dana" menyimpan ke
// localStorage lewat main.js; arisan memakai data tetap dari data.js.

import { fmt, ARISAN } from './data.js';

export function goalCards(goals, extraFunds) {
  return goals.map((g) => {
    const extra = (extraFunds && extraFunds[g.name]) || 0;
    const saved = g.saved + extra;
    const pct = Math.min(100, Math.round((saved / g.target) * 100));
    const left = g.target - saved;
    return `<article class="card goal">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <strong style="color:#1E293B">${g.name}</strong>
        <span class="pct">${pct}%</span>
      </div>
      <div class="small muted">${g.note}</div>
      <div class="bar" style="margin:10px 0 6px"><i style="width:${pct}%"></i></div>
      <div class="nums" style="display:flex;justify-content:space-between;font-size:13px;color:#78716C">
        <span>Terkumpul <b style="color:#1C1917">${fmt(saved)}</b></span>
        <span>Target <b style="color:#1C1917">${fmt(g.target)}</b></span>
      </div>
      <p class="small">Kurang <b class="num">${fmt(left)}</b>. Bulan ini ditabung <b class="num">${fmt(g.add)}</b>${extra ? ` + tambahan ${fmt(extra)}` : ''}.</p>
      <form class="edit" data-goal="${g.name}" style="display:flex;gap:6px;margin-top:8px">
        <input type="number" name="amount" min="10000" step="10000" placeholder="Tambah dana (Rp)" aria-label="Tambah dana ${g.name}" style="flex:1">
        <button type="submit" class="ghost small-btn">Tambah dana</button>
      </form>
    </article>`;
  }).join('');
}

export function arisanPanel() {
  const members = ARISAN.paid.map((m) => `<div class="member"><span>${m}${m === ARISAN.turn ? ' — <b>giliran bulan ini</b>' : ''}</span><span class="pill pill-paid">✓ Bayar</span></div>`).join('')
    + ARISAN.unpaid.map((m) => `<div class="member"><span>${m}</span><span class="pill pill-due">Belum bayar</span></div>`).join('');
  return `<div class="kv"><span>Iuran per anggota / bulan</span><b>${fmt(ARISAN.iuran)}</b></div>
  <div class="kv"><span>Anggota</span><b>${ARISAN.members} orang</b></div>
  <div class="kv"><span>Giliran ${ARISAN.turnMonth}</span><b>${ARISAN.turn}</b></div>
  <div class="kv"><span>Pot bulan ini</span><b>${fmt(ARISAN.pot)}</b></div>
  <div class="kv"><span>Terkumpul (${ARISAN.paid.length} dari ${ARISAN.members} bayar)</span><b>${fmt(ARISAN.iuran * ARISAN.paid.length)}</b></div>
  <div class="kv"><span>Batas bayar</span><b>${ARISAN.deadline}</b></div>
  <h3>Anggota — sudah / belum bayar</h3>
  ${members}
  <p class="small muted">Yang belum bayar diingatkan lewat grup RT sebelum ${ARISAN.deadline}.
  Pot diserahkan ke ${ARISAN.turn} setelah semua iuran masuk.</p>`;
}
