// service-worker.js
const CACHE = "app-cache-v1";
const ASSETS = [
  "/superhero-oncall/",
  "/superhero-oncall/index.html",
  "/superhero-oncall/manifest.webmanifest",
  "/superhero-oncall/icon-192.png",
  "/superhero-oncall/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      for (const url of ASSETS) {
        try { await cache.add(url); } catch (e) { /* מתעלמים מקובץ חסר */ }
      }
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
