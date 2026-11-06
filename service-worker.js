const CACHE_NAME = "daily-english-v20";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js?v=20",
  "./core.js?v=20",
  "./speech.js?v=20",
  "./story.js?v=20",
  "./stories-data.js?v=20",
  "./words.js?v=20",
  "./second-examples.js?v=20",
  "./phonetics.js?v=20",
  "./curriculum.js?v=20",
  "./monthly-2026-10.js?v=20",
  "./monthly-2026-11.js?v=20",
  "./matilda-assets.js?v=20",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isAudio = isSameOrigin && url.pathname.endsWith(".mp3");

  if (isAudio) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      }))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && isSameOrigin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => (
        cached || (event.request.mode === "navigate" ? caches.match("./index.html") : undefined)
      )))
  );
});
