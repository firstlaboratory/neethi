const CACHE = 'neethi-v4';
const FILES = [
  "./",
  "index.html",
  "manifest.json",
  "icon.svg",
  "icon-192.png",
  "icon-512.png",
  "data/catalog.json",
  "data/acts/adoption.json",
  "data/acts/arms.json",
  "data/acts/bns.json",
  "data/acts/bnss.json",
  "data/acts/bsa.json",
  "data/acts/cgst.json",
  "data/acts/christian.json",
  "data/acts/companies.json",
  "data/acts/constitution.json",
  "data/acts/contract.json",
  "data/acts/cpa.json",
  "data/acts/cpc.json",
  "data/acts/dowry.json",
  "data/acts/dpdp.json",
  "data/acts/dv.json",
  "data/acts/gaming.json",
  "data/acts/hma.json",
  "data/acts/hsa.json",
  "data/acts/incometax.json",
  "data/acts/ir.json",
  "data/acts/itact.json",
  "data/acts/limitation.json",
  "data/acts/lsa.json",
  "data/acts/muslim.json",
  "data/acts/mva.json",
  "data/acts/ndps.json",
  "data/acts/niact.json",
  "data/acts/osh.json",
  "data/acts/pca.json",
  "data/acts/pocso.json",
  "data/acts/posh.json",
  "data/acts/registration.json",
  "data/acts/rera.json",
  "data/acts/rte.json",
  "data/acts/rti.json",
  "data/acts/scst.json",
  "data/acts/senior.json",
  "data/acts/sma.json",
  "data/acts/socsec.json",
  "data/acts/succession.json",
  "data/acts/tn-depositors.json",
  "data/acts/tn-harassment.json",
  "data/acts/tn-prohibition.json",
  "data/acts/tn-ragging.json",
  "data/acts/tn-shops.json",
  "data/acts/tn-tenancy.json",
  "data/acts/tpa.json",
  "data/acts/wages.json"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network-first for data so updates show up; cache fallback for offline.
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('index.html')))
  );
});
