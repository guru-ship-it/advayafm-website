// D Advaya FM NaipuNya - Service Worker
// Provides offline fallback + faster repeat visits via caching

const VERSION = 'v1.0.0-2026-04-18';
const STATIC_CACHE = `advaya-static-${VERSION}`;
const RUNTIME_CACHE = `advaya-runtime-${VERSION}`;

// Resources to precache on install (shell of the app)
const PRECACHE_URLS = [
  '/',
  '/about',
  '/solutions',
  '/partners',
  '/contact',
  '/download',
  '/privacy-policy',
  '/data-deletion',
  '/terms',
  '/logos/advaya-fm.png',
  '/logos/fm-naipunya.jpg',
  '/logos/pragati.jpg',
  '/manifest.json',
];

// Install: precache the shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('advaya-') && key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - API calls: network only (never cache Pragati chat or auth)
// - Static assets: cache-first
// - HTML pages: network-first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Never cache API routes (dynamic, sensitive data)
  if (url.pathname.startsWith('/api/')) {
    return; // Let browser handle it normally
  }

  // Method filter: only cache GETs
  if (request.method !== 'GET') return;

  // Static assets: cache-first
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/logos/') ||
    /\.(js|css|woff2?|png|jpg|jpeg|svg|ico)$/i.test(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // HTML pages: network-first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((cached) => {
          if (cached) return cached;
          return caches.match('/');
        })
      )
  );
});
