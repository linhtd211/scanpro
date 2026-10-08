const C='scanner-pro-v053albumhq2';
const SHELL=['./style.css?v=053albumhq','./app.js?v=053albumhq','./icon.svg','./manifest.webmanifest?v=053albumhq'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));
});

self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin) return;

  // Navigation/HTML: network first, never deliberately serve stale HTML while online.
  if(req.mode==='navigate'||req.destination==='document'){
    e.respondWith((async()=>{
      try{
        const fresh=await fetch(req,{cache:'no-store'});
        return fresh;
      }catch(_){
        const cached=await caches.match('./index.html');
        return cached||Response.error();
      }
    })());
    return;
  }

  // Versioned static assets: cache first is safe because every release changes the query version.
  e.respondWith((async()=>{
    const cached=await caches.match(req);
    if(cached) return cached;
    try{
      const fresh=await fetch(req);
      if(fresh&&fresh.ok){
        const copy=fresh.clone();
        caches.open(C).then(c=>c.put(req,copy));
      }
      return fresh;
    }catch(_){
      return Response.error();
    }
  })());
});
