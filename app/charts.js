// Lumbung — charts: donat dan batang digambar sebagai SVG murni, tanpa
// pustaka dan tanpa gambar raster. Semua angka datang dari data.js.

import { fmt } from './data.js';

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
}

// Donat 10 kategori + legenda dengan nominal dan persen.
export function donutSVG(rows, total) {
  const cx = 110, cy = 110, r = 96, hole = 58;
  let angle = 0;
  let slices = '';
  for (const row of rows) {
    if (!row.amount) continue;
    const sweep = (row.amount / total) * 360;
    slices += `<path d="${arcPath(cx, cy, r, angle, angle + sweep)}" fill="${row.color}" stroke="#FAF6EF" stroke-width="1.5"><title>${row.name}: ${fmt(row.amount)}</title></path>`;
    angle += sweep;
  }
  const top = rows[0];
  const legend = rows.map((row) => {
    const pct = total ? Math.round((row.amount / total) * 1000) / 10 : 0;
    return `<span><i style="background:${row.color}"></i>${row.name} <b>${fmt(row.amount)}</b> · ${pct}%</span>`;
  }).join('');
  return `<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
    <svg viewBox="0 0 220 220" width="210" height="210" role="img" aria-label="Donat pengeluaran per kategori">${slices}
      <circle cx="${cx}" cy="${cy}" r="${hole}" fill="#fff"></circle>
      <text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="12" fill="#78716C">Pengeluaran</text>
      <text x="${cx}" y="${cy + 14}" text-anchor="middle" font-size="15" font-weight="700" fill="#1E293B">${fmt(total)}</text>
      <text x="${cx}" y="${cy + 31}" text-anchor="middle" font-size="10" fill="#78716C">${top ? top.name : ''}</text>
    </svg>
    <div class="legend" style="flex:1;min-width:220px">${legend}</div>
  </div>`;
}

// Batang Anggaran vs realisasi: satu baris per amplop/kategori.
export function budgetBars(rows) {
  const max = Math.max(...rows.map((r) => Math.max(r.budget, r.spent)), 1);
  return rows.map((r) => {
    const pct = Math.round((r.spent / r.budget) * 100);
    const over = r.spent > r.budget;
    const w = Math.min(100, Math.round((r.spent / max) * 100));
    return `<div class="bar-row">
      <span>${r.name}</span>
      <span class="bar" title="Budget ${fmt(r.budget)}, terpakai ${fmt(r.spent)}"><i class="${over ? 'over' : ''}" style="width:${w}%"></i></span>
      <span class="v ${over ? 'over' : ''}">${fmt(r.spent)} <span class="muted">/ ${fmt(r.budget)}</span>${over ? ' · +' + pct + '%' : ' · ' + pct + '%'}</span>
    </div>`;
  }).join('');
}

// Batang vertikal sederhana untuk Laporan (perbandingan 2 bulan).
export function compareBars(rows) {
  const max = Math.max(...rows.flatMap((r) => [r.nov, r.okt]), 1);
  const h = 120;
  const bars = rows.map((r) => {
    const hNov = Math.max(2, Math.round((r.nov / max) * h));
    const hOkt = Math.max(2, Math.round((r.okt / max) * h));
    return `<div style="flex:1;min-width:0;text-align:center">
      <div style="display:flex;gap:3px;align-items:flex-end;justify-content:center;height:${h}px">
        <div style="width:26px;height:${hOkt}px;background:#94A3B8;border-radius:3px 3px 0 0" title="Okt ${fmt(r.okt)}"></div>
        <div style="width:26px;height:${hNov}px;background:${r.diff > 0 ? '#B91C1C' : '#C2410C'};border-radius:3px 3px 0 0" title="Nov ${fmt(r.nov)}"></div>
      </div>
      <div style="font-size:11px;color:#78716C;margin-top:4px">${r.name}</div>
    </div>`;
  }).join('');
  return `<div style="display:flex;gap:6px;align-items:flex-end">${bars}</div>
  <div class="legend"><span><i style="background:#94A3B8"></i>Okt 2026</span><span><i style="background:#C2410C"></i>Nov 2026 (merah = naik)</span></div>`;
}
