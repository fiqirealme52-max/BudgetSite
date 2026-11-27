// Lumbung — router + state. Hash routes, satu halaman per tampilan:
//   #/            Dashboard
//   #/transaksi   Transaksi
//   #/amplop      Anggaran Amplop
//   #/tagihan     Tagihan
//   #/tujuan      Tujuan & Arisan
//   #/laporan     Laporan
//
// Perubahan pengguna (transaksi, budget amplop, status tagihan, dana tujuan)
// disimpan di localStorage kunci "lumbung-v1", jadi tetap ada setelah reload.
// window.__shotReady false selama render, true sesudahnya, supaya alat
// screenshot tahu kapan halaman siap dipotret.

import { MONTHS, MONTH_ORDER, BILLS, GOALS, fmt } from './data.js';
import { dashboardPage, transactionsPage, envelopesPage, billsPage, goalsPage, reportPage } from './views.js';
import { filterTx, txTable, txSummary } from './transactions.js';

const KEY = 'lumbung-v1';
const NAV = [
  ['#/', 'Dashboard'],
  ['#/transaksi', 'Transaksi'],
  ['#/amplop', 'Anggaran Amplop'],
  ['#/tagihan', 'Tagihan'],
  ['#/tujuan', 'Tujuan & Arisan'],
  ['#/laporan', 'Laporan'],
];

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function saveStore(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // Penyimpanan penuh / privat: site tetap jalan, perubahan tidak tersimpan.
  }
}

const store = loadStore();
const state = {
  month: '2026-11',
  filterCat: 'Semua',
  filterQ: '',
  editing: null,
};

function effectiveTxns(monthId) {
  const base = MONTHS[monthId].transactions;
  const deleted = new Set(store.deleted || []);
  const edited = store.edited || {};
  const added = (store.added && store.added[monthId]) || [];
  const out = base.filter((t) => !deleted.has(t.id)).map((t) => (edited[t.id] ? { ...t, ...edited[t.id] } : t));
  return out.concat(added);
}

function viewState() {
  return {
    month: state.month,
    txns: effectiveTxns(state.month),
    budgets: (store.budgets && store.budgets[state.month]) || {},
    paidBills: (store.paid && store.paid[state.month]) || {},
    extraFunds: (store.extra && store.extra[state.month]) || {},
    filterCat: state.filterCat,
    filterQ: state.filterQ,
    editing: state.editing,
  };
}

const app = document.getElementById('app');
const navEl = document.getElementById('mainnav');
const monthEl = document.getElementById('month-switch');

function renderNav() {
  const hash = location.hash || '#/';
  navEl.innerHTML = NAV.map(([href, label]) =>
    `<a href="${href}" class="${hash === href || (href === '#/' && (hash === '' || hash === '#')) ? 'on' : ''}">${label}</a>`).join('');
  monthEl.innerHTML = MONTH_ORDER.map((id) =>
    `<button type="button" data-action="switch-month" data-month="${id}" class="${state.month === id ? 'on' : ''}">${MONTHS[id].short}</button>`).join('');
}

function render() {
  window.__shotReady = false;
  renderNav();
  const hash = location.hash || '#/';
  const s = viewState();
  let html;
  let title;
  if (hash.startsWith('#/transaksi')) { html = transactionsPage(s); title = 'Transaksi'; }
  else if (hash.startsWith('#/amplop')) { html = envelopesPage(s); title = 'Anggaran Amplop'; }
  else if (hash.startsWith('#/tagihan')) { html = billsPage(s); title = 'Tagihan'; }
  else if (hash.startsWith('#/tujuan')) { html = goalsPage(s); title = 'Tujuan & Arisan'; }
  else if (hash.startsWith('#/laporan')) { html = reportPage(s); title = 'Laporan'; }
  else { html = dashboardPage(s); title = 'Dashboard'; }
  document.title = `${title} | Lumbung — Anggaran Rumah Tangga`;
  app.innerHTML = html;
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function refreshTxList() {
  const wrap = document.getElementById('tx-wrap');
  const count = document.getElementById('f-count');
  if (!wrap) return;
  const s = viewState();
  const shown = filterTx(s.txns, state.filterCat, state.filterQ);
  const sum = txSummary(shown);
  wrap.innerHTML = txTable(shown, true);
  if (count) count.textContent = `${shown.length} transaksi · keluar ${fmt(sum.out)} · masuk ${fmt(sum.inn)}`;
}

function setPaid(name, value) {
  store.paid = store.paid || {};
  store.paid[state.month] = store.paid[state.month] || {};
  store.paid[state.month][name] = value;
  saveStore(store);
}

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  if (action === 'switch-month') {
    state.month = el.dataset.month;
    state.editing = null;
    render();
  } else if (action === 'toggle-bill') {
    const name = el.dataset.name;
    const bills = BILLS[state.month];
    const current = store.paid?.[state.month]?.[name] ?? bills.find((b) => b.name === name)?.paid;
    setPaid(name, !current);
    render();
  } else if (action === 'del-tx') {
    const id = el.dataset.id;
    const tx = effectiveTxns(state.month).find((t) => t.id === id);
    if (tx && confirm(`Hapus transaksi "${tx.desc}" (${fmt(tx.amount)})?`)) {
      store.deleted = [...(store.deleted || []), id];
      saveStore(store);
      render();
    }
  } else if (action === 'edit-tx') {
    state.editing = effectiveTxns(state.month).find((t) => t.id === el.dataset.id) || null;
    render();
    const form = document.getElementById('tx-form');
    if (form) form.scrollIntoView({ block: 'start' });
  } else if (action === 'cancel-edit') {
    state.editing = null;
    render();
  }
});

document.addEventListener('submit', (ev) => {
  const form = ev.target;
  ev.preventDefault();
  if (form.id === 'tx-form') {
    const d = new FormData(form);
    const tx = {
      date: String(d.get('tx-date')),
      desc: String(d.get('tx-desc')).trim(),
      cat: String(d.get('tx-cat')),
      amount: Math.round(Number(d.get('tx-amount'))),
      kind: String(d.get('tx-kind')),
    };
    if (!tx.desc || !tx.amount || tx.amount <= 0) return;
    const id = String(d.get('tx-id'));
    if (id) {
      const base = MONTHS[state.month].transactions.find((t) => t.id === id);
      if (base) {
        store.edited = store.edited || {};
        store.edited[id] = tx;
      } else {
        store.added = store.added || {};
        store.added[state.month] = (store.added[state.month] || []).map((t) => (t.id === id ? { ...t, ...tx } : t));
      }
    } else {
      tx.id = 'u-' + Date.now();
      store.added = store.added || {};
      store.added[state.month] = [...(store.added[state.month] || []), tx];
    }
    store.deleted = (store.deleted || []).filter((x) => x !== id);
    state.editing = null;
    saveStore(store);
    render();
  } else if (form.dataset.envelope) {
    const d = new FormData(form);
    const budget = Math.round(Number(d.get('budget')));
    if (Number.isFinite(budget) && budget >= 0) {
      store.budgets = store.budgets || {};
      store.budgets[state.month] = store.budgets[state.month] || {};
      store.budgets[state.month][form.dataset.envelope] = budget;
      saveStore(store);
      render();
    }
  } else if (form.dataset.goal) {
    const d = new FormData(form);
    const amount = Math.round(Number(d.get('amount')));
    if (Number.isFinite(amount) && amount > 0) {
      store.extra = store.extra || {};
      store.extra[state.month] = store.extra[state.month] || {};
      store.extra[state.month][form.dataset.goal] = ((store.extra[state.month][form.dataset.goal]) || 0) + amount;
      saveStore(store);
      render();
    }
  }
});

document.addEventListener('input', (ev) => {
  if (ev.target.id === 'f-cat') {
    state.filterCat = ev.target.value;
    refreshTxList();
  } else if (ev.target.id === 'f-q') {
    state.filterQ = ev.target.value;
    refreshTxList();
  }
});
document.addEventListener('change', (ev) => {
  if (ev.target.id === 'f-cat') {
    state.filterCat = ev.target.value;
    refreshTxList();
  }
});

window.addEventListener('hashchange', () => {
  state.editing = null;
  render();
});

render();
