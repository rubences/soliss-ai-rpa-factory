(() => {
  const D = window.P0;
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
  const fmt = new Intl.NumberFormat('es-ES',{maximumFractionDigits:0});
  const eur = v => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(v);
  const compact = v => `${new Intl.NumberFormat('es-ES',{maximumFractionDigits:1}).format(v/1000)} k€`;
  const safe = s => String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  // Benchmark + public sources
  $('#benchmarkGrid').innerHTML = D.benchmark.eiopa.map(x=>`<article class="benchmark"><strong>${x.value}${x.suffix}</strong><h3>${safe(x.label)}</h3><p>${safe(x.detail)}</p><small>EIOPA · GenAI Market Survey 2026</small></article>`).join('');
  $('#publicSources').className='source-list';
  $('#publicSources').innerHTML=D.sources.map(s=>`<a class="source-link" href="${s.url}" target="_blank" rel="noopener"><b>${safe(s.title)}</b><small>${safe(s.note)}</small></a>`).join('');

  // Decision Room
  $('#decisionGrid').innerHTML=D.decisions.map(d=>`<article class="decision-card"><div class="decision-top"><b>${d.id}</b><span>${safe(d.when)}</span></div><h3>${safe(d.title)}</h3><p>${safe(d.why)}</p><dl><dt>Decide</dt><dd>${safe(d.owner)}</dd><dt>Si no</dt><dd>${safe(d.risk)}</dd></dl></article>`).join('');

  // Digital twin
  const nodeById=id=>D.architecture.nodes.find(n=>n.id===id);
  let currentLens='detail', currentScenario='normal', currentNode='group';
  $('#scenarioButtons').innerHTML=D.architecture.scenarios.map((s,i)=>`<button class="${i===0?'active':''}" data-scenario="${s.id}">${safe(s.label)}</button>`).join('');
  function inspectNode(id=currentNode){
    currentNode=id;
    const n=nodeById(id); if(!n)return;
    $$('.node').forEach(b=>b.classList.toggle('selected',b.dataset.node===id));
    const lensLabel={detail:'Arquitectura',security:'Security lens',data:'Data lens',dora:'DORA lens',aiAct:'AI Act lens'}[currentLens];
    const lensText=currentLens==='detail'?n.detail:n[currentLens];
    $('#nodeInspector').innerHTML=`<div class="node-inspect"><span>${safe(n.layer)} · ${lensLabel}</span><h3>${safe(n.label)}</h3><p>${safe(lensText)}</p><dl><div><dt>Responsabilidad</dt><dd>${safe(n.owner)}</dd></div><div><dt>Principio</dt><dd>Keedio diseña el patrón; Soliss valida y opera según el reparto acordado.</dd></div></dl></div>`;
  }
  function runScenario(id=currentScenario){
    currentScenario=id;
    const s=D.architecture.scenarios.find(x=>x.id===id);
    $$('#scenarioButtons button').forEach(b=>b.classList.toggle('active',b.dataset.scenario===id));
    $$('.node').forEach(n=>n.classList.remove('degraded','blocked','attack'));
    Object.entries(s.status).forEach(([node,status])=>{const el=$(`.node[data-node="${node}"]`);if(el)el.classList.add(status)});
    $('#scenarioState').innerHTML=`<span>Escenario activo</span><b>${safe(s.label)}</b>`;
    $('#simOutcome').textContent=s.outcome; $('#simMessage').textContent=s.message; $('#simGate').textContent=s.gate;
  }
  $$('.node').forEach(b=>b.addEventListener('click',()=>inspectNode(b.dataset.node)));
  $('#scenarioButtons').addEventListener('click',e=>{const b=e.target.closest('[data-scenario]');if(b)runScenario(b.dataset.scenario)});
  $('#lensButtons').addEventListener('click',e=>{const b=e.target.closest('[data-lens]');if(!b)return;currentLens=b.dataset.lens;$$('#lensButtons button').forEach(x=>x.classList.toggle('active',x===b));inspectNode()});
  runScenario(); inspectNode();

  // Use Case Factory
  const ucKey='soliss-p0-uc-hypotheses-v3';
  let ucValues={};
  try{ucValues=JSON.parse(localStorage.getItem(ucKey)||'{}')}catch{}
  D.useCases.forEach(u=>{if(!ucValues[u.id])ucValues[u.id]={...u.hypothesis}});
  let selectedUC='UC2';
  const score = v => Math.round((v.value*.35+v.data*.20+v.ttv*.20+(11-v.risk)*.15+(11-v.effort)*.10)*10);
  function renderRanking(){
    const ranked=D.useCases.map(u=>({u,s:score(ucValues[u.id])})).sort((a,b)=>b.s-a.s);
    $('#ucRanking').innerHTML=ranked.map((r,i)=>`<div class="rank-row ${r.u.id===selectedUC?'active':''}" data-uc="${r.u.id}"><span class="rank-n">${i+1}</span><div><b>${r.u.id} · ${safe(r.u.name)}</b><small>Hipótesis Keedio · pendiente workshop Soliss</small></div><span class="rank-score">${r.s}</span></div>`).join('');
    $$('.rank-row').forEach(r=>r.addEventListener('click',()=>{selectedUC=r.dataset.uc;renderRanking();renderEditor()}));
  }
  const sliderMeta=[['value','Valor negocio'],['data','Data readiness'],['risk','Riesgo / fricción'],['effort','Esfuerzo'],['ttv','Time-to-value']];
  function renderEditor(){
    const u=D.useCases.find(x=>x.id===selectedUC), v=ucValues[u.id];
    $('#ucEditor').innerHTML=`<header><div><span>${u.id} · HIPÓTESIS EDITABLE</span><h3>${safe(u.name)}</h3></div><small>Score = valor 35% + datos 20% + TTV 20% + riesgo inverso 15% + esfuerzo inverso 10%.</small></header><div class="sliders">${sliderMeta.map(([k,l])=>`<div class="slider-row"><label>${l}</label><input type="range" min="1" max="10" value="${v[k]}" data-field="${k}"><output>${v[k]}</output></div>`).join('')}</div><div class="uc-notes"><div><b>P0 habilita</b><p>${safe(u.enabled)}</p></div><div><b>Vertical posterior</b><p>${safe(u.later)}</p></div><div><b>Regulatory lens</b><p>${safe(u.regulation)}</p></div><div><b>Prioridad actual</b><p>Score de hipótesis: <strong>${score(v)}/100</strong>. Debe validarse con Soliss.</p></div></div>`;
    $$('#ucEditor input[type=range]').forEach(inp=>inp.addEventListener('input',()=>{v[inp.dataset.field]=+inp.value;inp.nextElementSibling.value=inp.value;localStorage.setItem(ucKey,JSON.stringify(ucValues));renderRanking();const strong=$('#ucEditor .uc-notes div:last-child strong');if(strong)strong.textContent=`${score(v)}/100`}));
  }
  $('#resetHypotheses').addEventListener('click',()=>{ucValues={};D.useCases.forEach(u=>ucValues[u.id]={...u.hypothesis});localStorage.removeItem(ucKey);renderRanking();renderEditor()});
  renderRanking();renderEditor();

  // Economics Lab
  let econScenario='recommended';
  $('#econScenarios').innerHTML=D.economics.scenarios.map(s=>`<button class="${s.id==='recommended'?'active':''}" data-econ="${s.id}">${s.label}</button>`).join('');
  function updateEconomics(){
    const s=D.economics.scenarios.find(x=>x.id===econScenario), optional=$('#optionalToggle').checked?D.economics.optional:0;
    const low=D.economics.base24+s.low+optional, high=D.economics.base24+s.high+optional, mid=(low+high)/2;
    $('#infraRange').textContent=`${compact(s.low)} – ${compact(s.high)}`; $('#tcoRange').textContent=`${compact(low)} – ${compact(high)}`; $('#tcoMid').textContent=`Punto central orientativo: ${eur(mid)}`;
    $$('#econScenarios button').forEach(b=>b.classList.toggle('active',b.dataset.econ===econScenario));
  }
  $('#econScenarios').addEventListener('click',e=>{const b=e.target.closest('[data-econ]');if(b){econScenario=b.dataset.econ;updateEconomics()}}); $('#optionalToggle').addEventListener('change',updateEconomics); updateEconomics();
  const maxCost=Math.max(...D.economics.phases.map(p=>p.cost));
  $('#phaseBars').innerHTML=D.economics.phases.map(p=>`<div class="phase-row"><b>${p.id}</b><div class="bar-track"><div class="bar-fill" style="width:${Math.max(7,p.cost/maxCost*100)}%">${p.hours} h</div></div><span>${eur(p.cost)}</span><small>${p.period}</small></div>`).join('');
  $('#infraTable').innerHTML=`<thead><tr><th>Bloque</th><th>Mínimo</th><th>Base</th><th>Escalable</th></tr></thead><tbody>${D.economics.infraBlocks.map(r=>`<tr><td><b>${safe(r[0])}</b><small>${safe(r[1])}</small></td><td>${eur(r[2])}</td><td>${eur(r[3])}</td><td>${eur(r[4])}</td></tr>`).join('')}</tbody>`;

  // Evidence Cockpit
  const evidenceKey='soliss-p0-evidence-v3';
  let evidenceState={};try{evidenceState=JSON.parse(localStorage.getItem(evidenceKey)||'{}')}catch{}
  const statusLabels={proposal:'Diseñado en propuesta',evidence:'Pendiente evidencia',soliss:'Pendiente Soliss / Legal',validated:'Validado'};
  function renderEvidence(){
    $('#evidenceGrid').innerHTML=D.evidence.map(e=>{const value=evidenceState[e.id]||e.default;return `<div class="evidence-row"><span>${safe(e.area)}</span><div><b>${safe(e.control)}</b><small>${safe(e.owner)}</small></div><small>${safe(e.evidence)}</small><select data-eid="${e.id}">${Object.entries(statusLabels).map(([k,l])=>`<option value="${k}" ${k===value?'selected':''}>${l}</option>`).join('')}</select></div>`}).join('');
    $$('#evidenceGrid select').forEach(s=>s.addEventListener('change',()=>{evidenceState[s.dataset.eid]=s.value;localStorage.setItem(evidenceKey,JSON.stringify(evidenceState))}));
  }renderEvidence();

  // Model Passport
  let passport='llm';
  $('#passportTabs').innerHTML=D.passports.map(p=>`<button data-passport="${p.id}" class="${p.id==='llm'?'active':''}">${safe(p.title.replace('Modelo ','').replace(' principal',''))}</button>`).join('');
  function renderPassport(){const p=D.passports.find(x=>x.id===passport);$('#passportCard').className='passport-card';$('#passportCard').innerHTML=`<div class="passport-summary"><span>ESTADO</span><h4>${safe(p.title)}</h4><p>${safe(p.purpose)}</p><b>${safe(p.status)}</b></div><div class="passport-fields">${Object.entries(p.fields).map(([k,v])=>`<div class="passport-field"><small>${safe(k)}</small><b>${safe(v)}</b></div>`).join('')}</div>`;$$('#passportTabs button').forEach(b=>b.classList.toggle('active',b.dataset.passport===passport))}
  $('#passportTabs').addEventListener('click',e=>{const b=e.target.closest('[data-passport]');if(b){passport=b.dataset.passport;renderPassport()}});renderPassport();

  // Provenance explorer
  const trace={request:'Petición: usuario, canal, caso y contexto declarado.',identity:'Identidad: rol, empresa/dominio y permisos resueltos antes del retrieval.',retrieval:'Retrieval: consulta solo índices y fuentes autorizadas por policy.',source:'Fuente: documento, versión, dominio, clasificación, owner y timestamp.',answer:'Respuesta: modelo/versión, grounding, referencias y política HITL.',audit:'Auditoría: usuario, modelo, fuente, latencia, coste, decisión y evidencia retenida según política.'};
  $$('.trace button').forEach(b=>b.addEventListener('click',()=>{$$('.trace button').forEach(x=>x.classList.toggle('active',x===b));$('#traceDetail').textContent=trace[b.dataset.trace]}));

  // Gate simulator
  const gateKey='soliss-p0-gates-v3'; let gateState={};try{gateState=JSON.parse(localStorage.getItem(gateKey)||'{}')}catch{}
  function renderGates(){
    $('#gateSimulator').innerHTML=D.gates.map(g=>{const done=g.checks.filter((_,i)=>gateState[`${g.id}-${i}`]).length,ready=done===g.checks.length;return `<article class="gate"><header><b>${g.id}</b><span>${g.when} · ${g.phase}</span></header><h3>${safe(g.title)}</h3><div class="gate-status ${ready?'ready':''}">${ready?'READY FOR DECISION':`${g.checks.length-done} evidencias pendientes`}</div><div class="gate-checks">${g.checks.map((c,i)=>`<label><input type="checkbox" data-gate="${g.id}-${i}" ${gateState[`${g.id}-${i}`]?'checked':''}><span>${safe(c)}</span></label>`).join('')}</div></article>`}).join('');
    $$('#gateSimulator input').forEach(c=>c.addEventListener('change',()=>{gateState[c.dataset.gate]=c.checked;localStorage.setItem(gateKey,JSON.stringify(gateState));renderGates()}));
  }renderGates();

  // Risks
  function renderRisks(filter='all'){$('#riskGrid').innerHTML=D.risks.filter(r=>filter==='all'||r.severity===filter).map(r=>`<article class="risk" data-severity="${r.severity}"><header><b>${r.id}</b><span>${r.severity}</span></header><h3>${safe(r.risk)}</h3><p>${safe(r.control)}</p><small>${safe(r.owner)}</small></article>`).join('')}
  $$('.risk-filter').forEach(b=>b.addEventListener('click',()=>{$$('.risk-filter').forEach(x=>x.classList.toggle('active',x===b));renderRisks(b.dataset.risk)}));renderRisks();

  // Audience modes
  function setAudience(a){document.body.dataset.audience=a;$$('.aud').forEach(b=>b.classList.toggle('active',b.dataset.audience===a));$$('#nav a').forEach(link=>{const target=$(link.getAttribute('href'));link.style.display=(a==='all'||!target?.dataset.show||target.dataset.show.split(' ').includes(a))?'':'none'});setTimeout(navSpyUpdate,30)}
  $$('.aud').forEach(b=>b.addEventListener('click',()=>setAudience(b.dataset.audience)));

  // Theme, menu, progress, reveal, nav spy
  const savedTheme=localStorage.getItem('soliss-p0-theme');if(savedTheme)document.documentElement.dataset.theme=savedTheme;
  $('#themeBtn').addEventListener('click',()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;localStorage.setItem('soliss-p0-theme',t)});
  $('#menuBtn').addEventListener('click',()=>$('#nav').classList.toggle('open'));$$('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
  addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=`${h?scrollY/h*100:0}%`},{passive:true});
  const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');rio.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach(el=>rio.observe(el));
  let spyObserver;
  function navSpyUpdate(){if(spyObserver)spyObserver.disconnect();const links=$$('#nav a').filter(a=>a.style.display!=='none');const sections=links.map(a=>$(a.getAttribute('href'))).filter(s=>s&&getComputedStyle(s).display!=='none');spyObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`))}),{rootMargin:'-28% 0px -62% 0px'});sections.forEach(s=>spyObserver.observe(s))}navSpyUpdate();

  // Lightbox
  const dialog=$('#lightbox'),lightImg=$('#lightboxImg');$$('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>{lightImg.src=b.dataset.lightbox;dialog.showModal()}));$('#closeLightbox').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

  // Presentation mode
  let presentIndex=0,steps=[];
  function refreshSteps(){steps=$$('.present-step').filter(s=>getComputedStyle(s).display!=='none')}
  function goStep(i){refreshSteps();if(!steps.length)return;presentIndex=Math.max(0,Math.min(i,steps.length-1));steps[presentIndex].scrollIntoView({behavior:'smooth',block:'start'});$('#stepCounter').textContent=`${presentIndex+1}/${steps.length}`}
  async function enterPresent(){document.body.classList.add('presentation-mode');$('#presentationHUD').hidden=false;refreshSteps();presentIndex=0;goStep(0);try{await document.documentElement.requestFullscreen?.()}catch{}}
  function exitPresent(){document.body.classList.remove('presentation-mode');$('#presentationHUD').hidden=true;if(document.fullscreenElement)document.exitFullscreen?.()}
  $('#presentBtn').addEventListener('click',enterPresent);$('#exitPresent').addEventListener('click',exitPresent);$('#prevStep').addEventListener('click',()=>goStep(presentIndex-1));$('#nextStep').addEventListener('click',()=>goStep(presentIndex+1));addEventListener('keydown',e=>{if(!document.body.classList.contains('presentation-mode'))return;if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();goStep(presentIndex+1)}if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();goStep(presentIndex-1)}if(e.key==='Escape')exitPresent()});

  // Service worker. No external runtime dependencies.
  if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});
  setAudience('board');
})();
