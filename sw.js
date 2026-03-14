const V='ist-v2';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(clients.claim());});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('anthropic.com'))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    if(res.status===200){const c=res.clone();caches.open(V).then(ca=>ca.put(e.request,c));}
    return res;
  })));
});