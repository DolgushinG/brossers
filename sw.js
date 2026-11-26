/* Service worker: bypass the HTTP cache for navigations so the latest
   index.html is served immediately after every deploy (GitHub Pages sends
   Cache-Control: max-age=600, which this works around). */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method === 'GET' && r.mode === 'navigate') {
    e.respondWith(fetch(r, { cache: 'no-store' }));
  }
});
