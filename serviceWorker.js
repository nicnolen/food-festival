const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  './index.html',
  './events.html',
  './tickets.html',
  './schedule.html',
  './assets/css/style.css',
  './assets/css/bootstrap.css',
  './assets/css/tickets.css',
  './dist/app.bundle.js',
  './dist/events.bundle.js',
  './dist/tickets.bundle.js',
  './dist/schedule.bundle.js',
];

// Cache resources
self.addEventListener('install', function (e) {
  // wait until the work is complete before terminating the service worker.
  e.waitUntil(
      // find specific cache by name
      caches.open(CACHE_NAME).then(function (cache) {
          console.log('installing cache : ' + CACHE_NAME)
          // add every file from FTC array to the cache
          return cache.addAll(FILES_TO_CACHE)
      })
  )
}); // service workers run before the window object is created so we use the self keyword to instantiate listeners on the service worker
