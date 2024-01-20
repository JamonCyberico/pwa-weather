const CACHE_NAME = 'weather-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/css/main.chunk.css',
        '/static/js/bundle.js',
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the request is in the cache, return it
      if (response) {
        return response;
      }

      // If the request is for the weather API, cache it dynamically
      if (event.request.url.startsWith('http://api.weatherbit.io/v2.0')) {
        return caches.open(CACHE_NAME).then((cache) => {
          return fetch(event.request)
            .then((response) => {
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => {
              // Handle fetch errors (offline)
            });
        });
      }

      // If the request is not in the cache and not for the weather API, fetch from the network
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
