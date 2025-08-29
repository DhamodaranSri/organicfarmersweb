
function toggleMenu(){ const m=document.getElementById('mnav'); m.style.display=(m && m.style.display==='flex'?'none':'flex'); }
function filterCards(qId, sel){ const q=(document.getElementById(qId).value||'').toLowerCase(); document.querySelectorAll(sel).forEach(c=>{ c.style.display=(c.innerText.toLowerCase().includes(q)?'':'none'); }); }
function openLightbox(src){ const lb=document.getElementById('lightbox'); if(!lb) return; lb.querySelector('img').src=src; lb.classList.add('show'); }
function closeLightbox(){ const lb=document.getElementById('lightbox'); if(!lb) return; lb.classList.remove('show'); }
// DETAIL PAGE RENDER
function byId(id){ return document.getElementById(id); }
function renderDetail(){
  if(!window.DATA) return;
  const p = new URLSearchParams(location.search);
  const kind = p.get('type'); // 'stays' or 'treks'
  const slug = p.get('slug');
  if(!slug || !DATA[slug]){
    byId('detail-root').innerHTML = '<p class="muted">Not found. Go back to <a href="index.html">Home</a>.</p>';
    return;
  }
  const item1 = DATA[slug];
  // const item = DATA[kind][slug];
  // Breadcrumb and header
  byId('crumb').innerHTML = '<a href="index.html">Home</a> • '+item1.title;
  byId('title').textContent = item1.title;
  byId('subtitle').textContent = item1.subtitle || '';
  // byId('price').textContent = item1.price;
  // Gallery
  const g = byId('gallery');
  g.innerHTML = (item1.gallery||[]).map(src => '<img src="'+src+'" alt="gallery" onclick="openLightbox(\''+src+'\')">').join('');
  // About
  byId('about').textContent = item1.about || '';
  // Amenities
  byId('amenities').innerHTML = (item1.amenities||[]).map(a => '<li>'+a+'</li>').join('');
  // Enquiry link
  byId('enquireBtn').href = 'contact.html';
}
document.addEventListener('DOMContentLoaded', function(){
  if(document.body.dataset.page === 'detail'){ renderDetail(); }
});
