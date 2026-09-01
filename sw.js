const CACHE='soliss-p0-v3-1';
const ASSETS=['./','./index.html','./assets/styles.css','./assets/data.js','./assets/app.js','./assets/figures/arquitectura-onpremise.png','./assets/figures/journey-economics.png','./assets/figures/to-be.png','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>caches.match('./index.html'))))});
