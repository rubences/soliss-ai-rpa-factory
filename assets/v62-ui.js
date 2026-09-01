/* V6.2 · UX/UI refinement layer */
(() => {
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  let toolsReturnFocus=null, modalReturnFocus=new WeakMap();

  // Tools menu keeps the top bar intentionally small.
  const tools=$('#toolsPanel'), toolsBtn=$('#toolsBtn');
  function closeTools(){if(!tools||tools.hidden)return;tools.hidden=true;toolsBtn?.setAttribute('aria-expanded','false');toolsReturnFocus?.focus?.()}
  function openTools(){if(!tools)return;toolsReturnFocus=document.activeElement;tools.hidden=false;toolsBtn?.setAttribute('aria-expanded','true');setTimeout(()=>tools.querySelector('button')?.focus(),0)}
  toolsBtn?.addEventListener('click',()=>tools.hidden?openTools():closeTools());
  $('#toolsClose')?.addEventListener('click',closeTools);
  tools?.addEventListener('click',e=>{if(e.target.closest('button')&&!e.target.closest('#toolsClose'))setTimeout(closeTools,20)});
  document.addEventListener('click',e=>{if(!tools?.hidden && !e.target.closest('#toolsPanel') && !e.target.closest('#toolsBtn')) closeTools()});

  // Password usability.
  $('#toggleBoardroomPassword')?.addEventListener('click',()=>{const i=$('#boardroomPassword');if(!i)return;const show=i.type==='password';i.type=show?'text':'password';$('#toggleBoardroomPassword').textContent=show?'🙈':'👁';$('#toggleBoardroomPassword').setAttribute('aria-label',show?'Ocultar contraseña':'Mostrar contraseña')});
  $('#boardroomPassword')?.addEventListener('keydown',e=>{if(e.key==='Enter')$('#boardroomEnter')?.click()});
  $('#boardroomUser')?.addEventListener('keydown',e=>{if(e.key==='Enter')$('#boardroomPassword')?.focus()});

  // Sidebar active state.
  const sideLinks=$$('#boardroomSideNav a');
  function updateSideNav(){
    if(document.body.dataset.access!=='boardroom')return;
    let current='#hero', best=-Infinity;
    sideLinks.forEach(a=>{const el=$(a.getAttribute('href'));if(!el)return;const top=el.getBoundingClientRect().top;if(top<=180 && top>best){best=top;current=a.getAttribute('href')}});
    sideLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===current));
  }
  addEventListener('scroll',updateSideNav,{passive:true});updateSideNav();
  sideLinks.forEach(a=>a.addEventListener('click',()=>setTimeout(updateSideNav,300)));

  // Accessible focus management for custom dialogs/drawers.
  const layers=['copilotDrawer','commandPalette','shareModal','briefModal','displayPanel'];
  const focusables=el=>$$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',el).filter(x=>!x.hidden && x.offsetParent!==null);
  function onLayerOpen(el){modalReturnFocus.set(el,document.activeElement);const fs=focusables(el);setTimeout(()=>fs[0]?.focus(),0)}
  function onLayerClose(el){modalReturnFocus.get(el)?.focus?.()}
  layers.forEach(id=>{const el=$('#'+id);if(!el)return;let was=!el.hidden;new MutationObserver(()=>{const now=!el.hidden;if(now&&!was)onLayerOpen(el);if(!now&&was)onLayerClose(el);was=now}).observe(el,{attributes:true,attributeFilter:['hidden']});el.addEventListener('keydown',e=>{if(e.key!=='Tab'||el.hidden)return;const fs=focusables(el);if(!fs.length)return;const first=fs[0],last=fs.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}})});

  // Boardroom audience is a real information filter: labels explain what is happening.
  const audienceCopy={board:'Consejo · decisión y visión ejecutiva',tech:'Tecnología · arquitectura y operación',compliance:'Compliance · controles y evidencia',all:'Completa · todo el contenido'};
  const audienceEm=$('.audience-row em');
  $$('.aud').forEach(b=>b.addEventListener('click',()=>{if(audienceEm)audienceEm.textContent=audienceCopy[b.dataset.audience]||''}));

  // Public depth-note Boardroom buttons use the existing access hub.
  $$('[data-access-choice="boardroom"]',document).forEach(b=>{if(b.closest('#accessPortal'))return;b.addEventListener('click',()=>$('#accessRibbonSwitch')?.click())});

  // Add labels to details for progressive disclosure.
  $$('details').forEach(d=>{const s=d.querySelector(':scope>summary');if(s&&!s.querySelector('.detail-hint')){const hint=document.createElement('span');hint.className='detail-hint';hint.textContent='Ver detalle';s.appendChild(hint)}});

  // Keep top bar and sidebar coherent after mode changes.
  new MutationObserver(()=>{if(document.body.dataset.access==='boardroom')setTimeout(updateSideNav,50);else closeTools()}).observe(document.body,{attributes:true,attributeFilter:['data-access','data-audience']});
})();
