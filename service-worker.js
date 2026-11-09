const CACHE_NAME = "daily-english-v24";
const LEGACY_AUDIO_CACHES = new Set(["daily-english-v21", "daily-english-v22", "daily-english-v23"]);
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=24",
  "./app.js?v=24",
  "./core.js?v=22",
  "./speech.js?v=23",
  "./story.js?v=22",
  "./stories-data.js?v=21",
  "./words.js?v=21",
  "./second-examples.js?v=21",
  "./phonetics.js?v=21",
  "./curriculum.js?v=21",
  "./monthly-2026-10.js?v=21",
  "./monthly-2026-11.js?v=21",
  "./matilda-assets.js?v=21",
  "./voice-assets.js?v=22",
  "./teacher-assets.js?v=23",
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
      // Earlier caches contain still-valid recordings, including offline Matilda audio.
      .then((keys) => Promise.all(keys
        .filter((key) => /^daily-english-v\d+$/.test(key) && key !== CACHE_NAME && !LEGACY_AUDIO_CACHES.has(key))
        .map((key) => caches.delete(key))))
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
      .catch(() => caches.match(event.request, { cacheName: CACHE_NAME }).then((cached) => (
        cached || (event.request.mode === "navigate" ? caches.match("./index.html", { cacheName: CACHE_NAME }) : undefined)
      )))
  );
});
