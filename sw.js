const CACHE='soliss-p0-v3-1-doccenter';
const CORE=['./','./index.html','./assets/styles.css','./assets/data.js','./assets/documents.js','./assets/app.js','./assets/figures/arquitectura-onpremise.png','./assets/figures/journey-economics.png','./assets/figures/to-be.png','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==location.origin) return;
  e.respondWith((async()=>{
    const cached=await caches.match(e.request);
    if(cached) return cached;
    try{
      const response=await fetch(e.request);
      if(response && response.ok){
        const cache=await caches.open(CACHE);
        cache.put(e.request,response.clone()).catch(()=>{});
      }
      return response;
    }catch(err){
      if(e.request.mode==='navigate') return (await caches.match('./index.html')) || new Response('Offline',{status:503});
      return new Response('Este recurso todavía no se ha almacenado para uso offline.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
    }
  })());
});