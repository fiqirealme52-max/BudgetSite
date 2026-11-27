// Lumbung — amplop: kartu per amplop zero-based dengan progress bar dan
// ubah budget. "Terpakai" dihitung dari transaksi, jadi kartu tidak pernah
// berbohong soal jumlah.

import { fmt } from './data.js';

export function envelopeCards(envs) {
  return envs.map((e) => {
    const over = e.spent > e.budget;
    const pct = Math.min(100, Math.round(e.pct * 100));
    const barCls = over ? 'over' : pct >= 95 ? 'amber' : '';
    const cats = e.cats.join(' + ');
    return `<article class="card env ${over ? 'hot' : ''}">
      <div class="env-top"><strong>${e.name}</strong><span class="pill ${over ? 'pill-over' : 'pill-paid'}">${over ? 'LEBIH BUDGET' : pct + '% terpakai'}</span></div>
      <div class="small muted">${cats}</div>
      <div class="bar" style="margin-top:10px"><i class="${barCls}" style="width:${pct}%"></i></div>
      <div class="nums"><span>Terpakai <b>${fmt(e.spent)}</b></span><span>Budget <b>${fmt(e.budget)}</b></span></div>
      <div class="remain">${over
        ? `<span class="over num">Lebih ${fmt(e.spent - e.budget)}</span> — kurangi sampai akhir bulan.`
        : `Sisa <b class="num">${fmt(e.left)}</b> untuk ${e.name === 'Belanja' ? '4 hari terakhir' : 'sisa bulan ini'}.`}</div>
      <form class="edit" data-envelope="${e.name}">
        <label class="f" style="flex-direction:row;align-items:center;gap:6px">Budget baru
          <input type="number" name="budget" min="0" step="10000" value="${e.budget}" aria-label="Budget baru ${e.name}">
        </label>
        <button type="submit" class="ghost small-btn">Ubah budget</button>
      </form>
    </article>`;
  }).join('');
}

export function envelopeSummary(envs, others) {
  const b = envs.reduce((s, e) => s + e.budget, 0);
  const s = envs.reduce((s, e) => s + e.spent, 0);
  const ob = others.reduce((x, o) => x + o.budget, 0);
  const os = others.reduce((x, o) => x + o.spent, 0);
  return { envBudget: b, envSpent: s, envLeft: b - s, otherBudget: ob, otherSpent: os, otherLeft: ob - os };
}
