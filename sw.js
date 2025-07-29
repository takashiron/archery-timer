const CACHE_NAME = 'archery-timer-cache-v1';
const urlsToCache = [
  '.', // index.html or archery_time.html
  'archery_time.html',
  'tailwind.css',
  'tone.js',
  'manifest.json',
  'icon-192x192.png'
  // Google Fontsはオフライン化が少し複雑なため、今回はキャッシュ対象外。
  // 接続があれば表示され、なければデフォルトフォントで表示。
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // キャッシュがあればそれを返す。
        }
        return fetch(event.request); // なければネットワークに取りに行く。
      })
  );
});
