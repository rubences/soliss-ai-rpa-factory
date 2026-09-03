/* V6 · Operational features */
(() => {
  const D=window.P0,V=window.V6_DATA||{},$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
  const safe=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ');
  const eur=v=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(Number(v)||0);
  const compact=v=>`${new Intl.NumberFormat('es-ES',{maximumFractionDigits:0}).format((Number(v)||0)/1000)} k€`;
  const download=(name,text,type='text/plain;charset=utf-8')=>{const u=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)};
  const openLayer=id=>{const el=$(`#${id}`);if(!el)return;el.hidden=false;el.setAttribute('aria-hidden','false')};
  const closeLayer=id=>{const el=$(`#${id}`);if(!el)return;el.hidden=true;el.setAttribute('aria-hidden','true')};
  $$('[data-close-v6]').forEach(b=>b.addEventListener('click',()=>closeLayer(b.dataset.closeV6)));

  /* ---------- Auth status + private bundle refresh ---------- */
  function updateAuthUi(){
    if(!window.V6Auth)return;
    const st=V6Auth.status(),r=$('#authReadiness'),chip=$('#authStatusChip'),logout=$('#logoutBoardroom');
    if(r)r.textContent=V6Auth.readinessText();
    if(chip){
      chip.hidden=!['boardroom','tender'].includes(document.body.dataset.access);
      chip.textContent=st.label;
      chip.className=`auth-status-chip ${st.mode==='oidc'?'sso':st.mode==='simple'?'demo':st.mode==='local-demo'?'demo':''}`;
    }
    if(logout)logout.hidden=!['boardroom','tender'].includes(document.body.dataset.access)||!st.authenticated;
  }
  function rebuildEconomics(){
    const e=D.economics;if(!e?.base24)return;
    $('#heroBuildValue') && ($('#heroBuildValue').textContent='No publicado');
    $('#heroServiceValue') && ($('#heroServiceValue').textContent='No publicado');
    $('#heroBase24Value') && ($('#heroBase24Value').textContent='No publicado');
    $('#heroInfraValue') && ($('#heroInfraValue').textContent='Pendiente de sizing');
    $('#econBuildValue') && ($('#econBuildValue').textContent='No publicado');
    $('#econServiceValue') && ($('#econServiceValue').textContent='No publicado');
    const phase=$('#phaseBars');
    if(phase&&e.phases?.length){
      phase.innerHTML=e.phases.map(p=>`<div class="phase-row"><b>${safe(p.id)}</b><div class="bar-track"><div class="bar-fill" style="width:35%">Reservado</div></div><span>Reservado</span><small>Según alcance aprobado</small></div>`).join('');
    }
    const infra=$('#infraTable');
    if(infra&&e.infraBlocks?.length)infra.innerHTML=`<thead><tr><th>Bloque</th><th>Descripción</th><th>Estado</th></tr></thead><tbody>${e.infraBlocks.map(r=>`<tr><td><b>${safe(r[0])}</b></td><td>${safe(r[1])}</td><td>Según sizing aprobado</td></tr>`).join('')}</tbody>`;
    try{window.V6Hooks?.updateEconomics?.()}catch{}
    tagProvenance();
  }
  document.addEventListener('v6:private-ready',()=>{
    rebuildEconomics();
    try{window.V6Hooks?.renderDocuments?.()}catch{}
    updateAuthUi();
    hydrateDecisionState();renderDecisionBoard();
    $('#decisionGrid') && ($('#decisionGrid').innerHTML=D.decisions.map(d=>`<article class="decision-card"><div class="decision-top"><b>${d.id}</b><span>${safe(d.when)}</span></div><h3>${safe(d.title)}</h3><p>${safe(d.why)}</p><dl><dt>Decide</dt><dd>${safe(d.owner)}</dd><dt>Si no</dt><dd>${safe(d.risk)}</dd></dl></article>`).join(''));
    try{window.V6Hooks?.renderEvidence?.();window.V6Hooks?.renderGates?.();window.V6Hooks?.renderRisks?.()}catch{}
    renderTrace();buildKnowledge();buildCommands();
  });
  $('#logoutBoardroom')?.addEventListener('click',()=>V6Auth.logout());
  const observer=new MutationObserver(()=>updateAuthUi());observer.observe(document.body,{attributes:true,attributeFilter:['data-access']});
  updateAuthUi();

  // Private document links use authenticated fetch rather than unprotected direct anchors.
  $('#documents')?.addEventListener('click',async e=>{
    const a=e.target.closest('a[href^="private/"]');if(!a||!window.V6Auth)return;
    e.preventDefault();const path=a.getAttribute('href'),name=path.split('/').pop();
    a.closest('.doc-format')?.classList.add('private-loading');
    try{
      const r=await V6Auth.fetchPrivate(path);
      if(!r.ok)throw new Error(`HTTP ${r.status}`);
      const blob=await r.blob(),u=URL.createObjectURL(blob);
      if(a.target==='_blank')window.open(u,'_blank','noopener');
      else{const d=document.createElement('a');d.href=u;d.download=name;document.body.appendChild(d);d.click();d.remove()}
      setTimeout(()=>URL.revokeObjectURL(u),30000);
    }catch(err){alert(`No se pudo abrir el documento protegido: ${err.message}`)}
    finally{a.closest('.doc-format')?.classList.remove('private-loading')}
  },true);

  /* ---------- P0 Copilot: deterministic local knowledge navigator ---------- */
  let KNOW=[];
  const quick=[
    '¿Qué incluye exactamente P0?',
    '¿Quién compra las GPU?',
    '¿Qué pasa si Gravitino no supera la PoC?',
    '¿P0 incluye el motor de fraude?',
    '¿Qué recibe Soliss en G3?',
    '¿Quién opera después de Keedio?'
  ];
  function buildKnowledge(){
    KNOW=[
      {title:'Qué es P0',body:'P0 es la base corporativa común de AI/RPA Factory: plataforma, identidad, datos gobernados, Model Gateway, patrones RAG/OCR/RPA, seguridad, observabilidad, evidencia y transferencia. No es un chatbot ni una aplicación departamental final.',target:'#factory',type:'contractual'},
      {title:'Compra de infraestructura y GPU',body:'Soliss adquiere y posee la infraestructura productiva. Keedio realiza sizing, blueprint, integración y validación. La compra se condiciona al Gate G2.',target:document.body.dataset.access==='boardroom'?'#economics':'#factory',type:'contractual'},
      {title:'Fallback de Gravitino',body:'Gravitino permanece como PoC no bloqueante. Si no supera G3, P0 continúa mediante el fallback de catálogo/metastore desacoplado.',target:document.body.dataset.access==='boardroom'?'#twin':'#factory',type:'contractual'},
      {title:'Motor productivo de fraude',body:'No está incluido en P0. P0 habilita seguridad, datos, explicabilidad, Model Gateway, HITL y entorno de ejecución; UC3 posterior desarrolla modelo/scoring, features, reglas, thresholds e integración productiva.',target:'#factory',type:'contractual'},
      {title:'Qué recibe Soliss en G3',body:'Sandbox validado con identidad/RBAC, Model Gateway, RAG/fuentes trazables, Gravitino PoC evaluado, fallback documentado, observabilidad y logging según el checklist de Gate.',target:document.body.dataset.access==='boardroom'?'#delivery':'#assurance',type:'contractual'},
      {title:'Operación después de Keedio',body:'P0 incluye IaC, runbooks, documentación, formación y transferencia. Soliss asume operación según el RACI; Keedio presta soporte N2/especializado en el modelo acordado.',target:document.body.dataset.access==='boardroom'?'#delivery':'#factory',type:'contractual'},
      ...D.useCases.map(u=>({title:`${u.id} · ${u.name}`,body:`P0 habilita: ${u.enabled} Después: ${u.later} Consideración: ${u.regulation}`,target:'#factory',type:'contractual'})),
      ...(document.body.dataset.access==='boardroom'?D.decisions.map(d=>({title:`${d.id} · ${d.title}`,body:`Decide: ${d.owner}. Momento: ${d.when}. Razón: ${d.why}. Riesgo si se difiere: ${d.risk}`,target:'#decision',type:'contractual'})):[]),
      ...(document.body.dataset.access==='boardroom'?D.risks.map(r=>({title:`${r.id} · ${r.risk}`,body:`Control: ${r.control}. Owner: ${r.owner}. Severidad: ${r.severity}.`,target:'#delivery',type:'contractual'})):[]),
      ...(V.sources||[]).map(s=>({title:s.title,body:s.supports,target:'#assurance',type:'external'}))
    ];
    if(V6Auth?.isPrivateLoaded?.()&&D.economics.base24){
      KNOW.push({title:'Economics P0 · baseline Boardroom',body:`Construcción P0: ${eur(D.economics.build)}. Servicio M3-M24: ${eur(D.economics.service)}. Total servicios Keedio 24M: ${eur(D.economics.base24)}. Infraestructura: inversión directa Soliss, sujeta a sizing G2 y cotización.`,target:'#economics',type:'contractual'});
    }
  }
  function searchKnowledge(q){
    const nq=norm(q),terms=nq.split(/\s+/).filter(x=>x.length>1);
    return KNOW.map(k=>{const t=norm(k.title),b=norm(k.body);let score=t.includes(nq)?20:b.includes(nq)?12:0;for(const x of terms){if(t.includes(x))score+=5;if(b.includes(x))score+=2}return {...k,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5);
  }
  function renderCopilot(q){
    const out=$('#copilotAnswer');if(!q){out.innerHTML='<div class="copilot-result"><p>Selecciona una pregunta rápida o escribe una consulta. La respuesta se obtiene por búsqueda local sobre fuentes estructuradas de esta propuesta.</p></div>';return}
    const res=searchKnowledge(q);
    out.innerHTML=res.length?res.map((x,i)=>`<article class="copilot-result"><header><span class="prov ${x.type}">${x.type.toUpperCase()}</span><small>${i===0?'Mejor coincidencia':'Relacionado'}</small></header><h3>${safe(x.title)}</h3><p>${safe(x.body)}</p><a href="${x.target}" data-copilot-nav>Ir a la sección →</a></article>`).join(''):'<article class="copilot-result"><h3>No encuentro una respuesta suficientemente apoyada</h3><p>Prueba con P0, GPU, Gravitino, fraude, G3, operación, DORA o un identificador UC/R/Gate.</p></article>';
    $$('[data-copilot-nav]',out).forEach(a=>a.addEventListener('click',()=>closeLayer('copilotDrawer')));
  }
  buildKnowledge();
  $('#copilotQuick').innerHTML=quick.map(q=>`<button type="button">${safe(q)}</button>`).join('');
  $$('#copilotQuick button').forEach(b=>b.addEventListener('click',()=>{$('#copilotInput').value=b.textContent;renderCopilot(b.textContent)}));
  $('#askP0Btn')?.addEventListener('click',()=>{openLayer('copilotDrawer');setTimeout(()=>$('#copilotInput').focus(),50);renderCopilot($('#copilotInput').value)});
  $('#copilotAsk')?.addEventListener('click',()=>renderCopilot($('#copilotInput').value));
  $('#copilotInput')?.addEventListener('keydown',e=>{if(e.key==='Enter')renderCopilot(e.target.value)});

  /* ---------- Command palette ---------- */
  let COMMANDS=[],cmdIndex=0,cmdVisible=[];
  function buildCommands(){
    COMMANDS=[
      ['Contexto / Why now','#why','Sección'],
      ['P0 + Casos de uso','#factory','Sección'],
      ['Insurance AI Assurance','#assurance','Sección'],
      ...D.useCases.map(u=>[`${u.id} · ${u.name}`,'#factory','Caso de uso']),
      ...(document.body.dataset.access==='boardroom'?D.risks.map(r=>[`${r.id} · ${r.risk}`,'#delivery','Riesgo']):[]),
      ...(document.body.dataset.access==='boardroom'?D.gates.map(g=>[`${g.id} · ${g.title}`,'#delivery','Gate']):[])
    ];
    if(document.body.dataset.access==='boardroom')COMMANDS.push(
      ['Decision Room','#decision','Boardroom'],['Digital Twin','#twin','Boardroom'],['Economics','#economics','Boardroom'],['Governance','#governance','Boardroom'],['Delivery','#delivery','Boardroom'],['Document Center','#documents','Boardroom'],
      ...((window.P0_DOCUMENTS?.groups)||[]).map(g=>[g.title,'#documents','Documento'])
    );
    if(document.body.dataset.access==='tender')COMMANDS.push(
      ['Ficha contractual','#tender-summary','Licitación'],['Condiciones técnicas','#tender-technical','Licitación'],['Condiciones económicas','#tender-economic','Licitación'],['Cumplimiento PPT','#tender-compliance','Licitación'],['Valoración propuesta','#tender-evaluation','Licitación'],['Entrega y aceptación','#tender-delivery','Licitación'],['Tender Readiness','#tender-readiness','Licitación']
    );
  }
  function renderCommands(q=''){
    buildCommands();const nq=norm(q);
    cmdVisible=COMMANDS.filter(c=>!nq||norm(c[0]+' '+c[2]).includes(nq)).slice(0,12);cmdIndex=Math.min(cmdIndex,Math.max(0,cmdVisible.length-1));
    $('#commandResults').innerHTML=cmdVisible.map((c,i)=>`<div class="command-result ${i===cmdIndex?'active':''}" data-cmd="${i}"><b>${safe(c[0])}</b><small>${safe(c[2])}</small></div>`).join('')||'<div class="command-result"><small>Sin resultados</small></div>';
    $$('#commandResults [data-cmd]').forEach(el=>el.addEventListener('click',()=>runCommand(+el.dataset.cmd)));
  }
  function runCommand(i){const c=cmdVisible[i];if(!c)return;closeLayer('commandPalette');$(c[1])?.scrollIntoView({behavior:'smooth',block:'start'})}
  function openCommands(){openLayer('commandPalette');$('#commandInput').value='';cmdIndex=0;renderCommands();setTimeout(()=>$('#commandInput').focus(),30)}
  $('#commandBtn')?.addEventListener('click',openCommands);
  $('#commandInput')?.addEventListener('input',e=>{cmdIndex=0;renderCommands(e.target.value)});
  $('#commandInput')?.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();cmdIndex=Math.min(cmdIndex+1,cmdVisible.length-1);renderCommands(e.target.value)}if(e.key==='ArrowUp'){e.preventDefault();cmdIndex=Math.max(0,cmdIndex-1);renderCommands(e.target.value)}if(e.key==='Enter'){e.preventDefault();runCommand(cmdIndex)}});
  addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommands()}if(e.key==='Escape'){['commandPalette','copilotDrawer','shareModal','briefModal','displayPanel'].forEach(closeLayer)}});

  /* ---------- Display / accessibility ---------- */
  const displayKey='soliss-v6-display';
  let displayState={density:'normal',font:1,contrast:false,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches};
  try{displayState={...displayState,...JSON.parse(localStorage.getItem(displayKey)||'{}')}}catch{}
  function applyDisplay(){
    document.body.dataset.density=displayState.density;
    document.documentElement.style.setProperty('--v6-scale',displayState.font);
    document.body.classList.toggle('v6-high-contrast',displayState.contrast);
    document.body.classList.toggle('v6-reduced-motion',displayState.reduced);
    $$('[data-density]').forEach(b=>b.classList.toggle('active',b.dataset.density===displayState.density));
    $('#highContrastToggle').checked=displayState.contrast;$('#reducedMotionToggle').checked=displayState.reduced;
    localStorage.setItem(displayKey,JSON.stringify(displayState));
  }
  $('#displayBtn')?.addEventListener('click',()=>{const p=$('#displayPanel');p.hidden=!p.hidden});
  $$('[data-density]').forEach(b=>b.addEventListener('click',()=>{displayState.density=b.dataset.density;applyDisplay()}));
  $$('[data-font-step]').forEach(b=>b.addEventListener('click',()=>{displayState.font=Math.max(.9,Math.min(1.3,+(displayState.font+(+b.dataset.fontStep*.05)).toFixed(2)));applyDisplay()}));
  $('[data-font-reset]')?.addEventListener('click',()=>{displayState.font=1;applyDisplay()});
  $('#highContrastToggle')?.addEventListener('change',e=>{displayState.contrast=e.target.checked;applyDisplay()});
  $('#reducedMotionToggle')?.addEventListener('change',e=>{displayState.reduced=e.target.checked;applyDisplay()});
  applyDisplay();

  /* ---------- Live Decision Board + Readiness ---------- */
  const decKey='soliss-v6-live-decisions';
  let decState={};try{decState=JSON.parse(localStorage.getItem(decKey)||'{}')}catch{}
  const decLabels={pending:'Pendiente',info:'Necesita información',approved:'Aprobado',deferred:'Diferido',gate:'Gobernado por Gate'};
  function hydrateDecisionState(){D.decisions.forEach(d=>decState[d.id]??={status:d.when==='Inicio'?'pending':'gate',owner:d.owner,comment:'',target:''});localStorage.setItem(decKey,JSON.stringify(decState))}
  hydrateDecisionState();
  function renderDecisionBoard(){
    $('#liveDecisionGrid').innerHTML=D.decisions.map(d=>{const s=decState[d.id];return `<article class="live-decision-card" data-did="${d.id}"><header><b>${d.id} · ${safe(d.title)}</b><span>${safe(d.when)}</span></header><select data-field="status">${Object.entries(decLabels).map(([k,v])=>`<option value="${k}" ${s.status===k?'selected':''}>${v}</option>`).join('')}</select><div class="decision-fields"><input data-field="owner" value="${safe(s.owner)}" aria-label="Responsable ${d.id}"><input data-field="target" type="date" value="${safe(s.target)}" aria-label="Fecha objetivo ${d.id}"></div><textarea data-field="comment" placeholder="Comentario / próxima acción">${safe(s.comment)}</textarea></article>`}).join('');
    $$('#liveDecisionGrid [data-field]').forEach(el=>el.addEventListener('input',()=>{const card=el.closest('[data-did]'),id=card.dataset.did;decState[id][el.dataset.field]=el.value;localStorage.setItem(decKey,JSON.stringify(decState));renderReadiness()}));
    renderReadiness();
  }
  function readinessData(){
    const active=D.decisions.map(d=>decState[d.id]).filter(Boolean);const resolved=active.filter(x=>['approved','deferred','gate'].includes(x.status)).length;
    const owners=active.filter(x=>String(x.owner||'').trim()).length;
    let gs={};try{gs=JSON.parse(localStorage.getItem('soliss-p0-gates-v3')||'{}')}catch{}
    const gateTotal=D.gates.reduce((a,g)=>a+g.checks.length,0),gateDone=Object.values(gs).filter(Boolean).length;
    let es={};try{es=JSON.parse(localStorage.getItem('soliss-p0-evidence-v3')||'{}')}catch{}
    const evidenceValidated=D.evidence.filter(e=>(es[e.id]||e.default)==='validated').length;
    return {resolved,owners,gateDone,gateTotal,evidenceValidated,evidenceTotal:D.evidence.length};
  }
  function renderReadiness(){const r=readinessData();$('#readinessMetrics').innerHTML=[
    ['Decisiones resueltas',`${r.resolved}/${D.decisions.length}`,'aprobada, diferida o gobernada por Gate'],
    ['Owners asignados',`${r.owners}/${D.decisions.length}`,'responsable registrado'],
    ['Evidencias de Gate',`${r.gateDone}/${r.gateTotal}`,'checklist local G1–G4'],
    ['Evidence Registry',`${r.evidenceValidated}/${r.evidenceTotal}`,'marcadas como validadas']
  ].map(x=>`<div class="readiness-metric"><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}
  renderDecisionBoard();
  document.addEventListener('change',e=>{if(e.target.closest('#gateSimulator')||e.target.closest('#evidenceGrid'))setTimeout(renderReadiness,20)});
  $('#exportDecisionBoard')?.addEventListener('click',()=>{const r=readinessData(),lines=['# P0 Live Decision Board','',`Generado: ${new Date().toLocaleString('es-ES')}`,'','> Estado de preparación de comité. No constituye aprobación contractual.','',`Readiness: decisiones ${r.resolved}/${D.decisions.length}; owners ${r.owners}/${D.decisions.length}; gates ${r.gateDone}/${r.gateTotal}; evidence ${r.evidenceValidated}/${r.evidenceTotal}.`,'',...D.decisions.map(d=>{const s=decState[d.id];return `## ${d.id} · ${d.title}\n- Estado: ${decLabels[s.status]}\n- Responsable: ${s.owner}\n- Fecha objetivo: ${s.target||'N/D'}\n- Comentario: ${s.comment||'—'}\n`})];download(`Soliss_P0_Live_Decision_Board_${new Date().toISOString().slice(0,10)}.md`,lines.join('\n'),'text/markdown;charset=utf-8')});

  /* ---------- P0 Architecture Contract ---------- */
  let contractUC='UC1';
  const contractMeaning={required:'Necesario para este patrón',optional:'No requerido por defecto',depends:'Depende de diseño/datos'};
  function renderContract(){
    $('#ucContractTabs').innerHTML=D.useCases.map(u=>`<button class="${u.id===contractUC?'active':''}" data-contract-uc="${u.id}">${u.id}</button>`).join('');
    $$('[data-contract-uc]').forEach(b=>b.addEventListener('click',()=>{contractUC=b.dataset.contractUc;renderContract()}));
    const u=D.useCases.find(x=>x.id===contractUC),c=V.ucContracts[contractUC];
    $('#ucContractCard').innerHTML=`<article class="contract-summary"><span>${u.id}</span><h4>${safe(u.name)}</h4><p>${safe(u.enabled)}</p><small>La lógica funcional final sigue perteneciendo al vertical derivado.</small></article><div class="contract-grid">${Object.entries(V.capabilityLabels).map(([k,label])=>{const state=c[k]||'optional';return `<div class="contract-cap"><b>${safe(label)}</b><span class="${state}">${state.toUpperCase()}</span><small class="provenance-detail">${contractMeaning[state]}</small></div>`}).join('')}</div>`;
  }
  renderContract();

  /* ---------- UC → KPI → Evidence ---------- */
  $('#ucEvidenceGrid').innerHTML=D.useCases.map(u=>`<article class="uc-evidence-card"><header><b>${u.id}</b><span>HIPÓTESIS DE MEDICIÓN</span></header><ul>${(V.kpiEvidence[u.id]||[]).map(k=>`<li>${safe(k)}</li>`).join('')}</ul><div class="measure-line"><div><small>BASELINE</small><b>N/D</b></div><div><small>TARGET</small><b>Workshop</b></div><div><small>ACTUAL</small><b>Piloto</b></div></div><p class="provenance-detail">Evidencia candidata: logs, dataset de evaluación, workflow metrics y validación de key users según el UC.</p></article>`).join('');

  /* ---------- Risk → Control → Evidence → Gate → Decision ---------- */
  let traceRisk='R1';
  function renderTrace(){
    const ids=Object.keys(V.traces||{});if(!ids.length){$('#traceabilityTabs').innerHTML='';$('#traceabilityGraph').innerHTML='<div class="trace-node"><span>BOARDROOM</span><b>La trazabilidad Risk→Control→Evidence→Gate se carga desde el bundle privado.</b></div>';return}if(!V.traces[traceRisk])traceRisk=ids[0];
    $('#traceabilityTabs').innerHTML=ids.map(id=>`<button class="${id===traceRisk?'active':''}" data-trace-risk="${id}">${id}</button>`).join('');
    $$('[data-trace-risk]').forEach(b=>b.addEventListener('click',()=>{traceRisk=b.dataset.traceRisk;renderTrace()}));
    const t=V.traces[traceRisk];
    const nodes=[['RIESGO',t.risk],['CONTROL',t.control],['EVIDENCIA',t.evidence],['GATE',t.gate],['DECISIÓN',t.decision]];
    $('#traceabilityGraph').innerHTML=nodes.map((n,i)=>`${i?'<div class="trace-arrow">→</div>':''}<div class="trace-node"><span>${n[0]}</span><b>${safe(n[1])}</b></div>`).join('');
  }
  renderTrace();

  /* ---------- Source freshness + universal provenance ---------- */
  function dayDiff(a,b){return Math.floor((new Date(b+'T00:00:00Z')-new Date(a+'T00:00:00Z'))/86400000)}
  function renderSourceRegistry(){
    const today=new Date().toISOString().slice(0,10);
    $('#sourceRegistry').innerHTML=(V.sources||[]).map(s=>{const age=dayDiff(s.verified,today),review=age>s.reviewDays;return `<article class="source-reg-card"><header><a href="${s.url}" target="_blank" rel="noopener">${safe(s.title)}</a><span class="freshness ${review?'review':'ok'}">${review?'REVISAR':'VERIFICADA'}</span></header><p>${safe(s.supports)}</p><small>Verificada ${s.verified} · ${age} días · revisar cada ${s.reviewDays} días</small></article>`}).join('');
  }
  function addProv(el,type,text){
    if(!el||el.querySelector(':scope > .prov-chip'))return;
    el.dataset.provWrap='1';const chip=document.createElement('span');chip.className=`prov-chip ${type}`;chip.textContent=text;el.appendChild(chip);
  }
  function tagProvenance(){
    $$('.benchmark').forEach(x=>addProv(x,'external','EXTERNO'));
    $$('#supervisoryRadar > *').forEach(x=>addProv(x,'external','EXTERNO'));
    const k=$$('.kpis > div');k.forEach((x,i)=>addProv(x,i===3?'estimate':'contractual',i===3?'ESTIMACIÓN':'CONTRACTUAL'));
    const ec=$$('.econ-card');ec.forEach((x,i)=>addProv(x,i<2?'contractual':'estimate',i<2?'CONTRACTUAL':'ESTIMACIÓN'));
    addProv($('.advanced-priority'),'hypothesis','HIPÓTESIS');
    $$('.claims-number').forEach(x=>addProv(x,'external','EXTERNO'));
  }
  renderSourceRegistry();tagProvenance();
  $('#toggleProvenance')?.addEventListener('click',()=>{const on=document.body.dataset.provenance!=='on';document.body.dataset.provenance=on?'on':'off';$('#toggleProvenance').textContent=on?'◉ Ocultar provenance':'◉ Mostrar provenance'});

  /* ---------- Version compare ---------- */
  const changes=D.research?.changelog||[];
  function initVersionCompare(){
    if(!$('#versionFrom'))return;
    const opts=changes.map((x,i)=>`<option value="${i}">${safe(x.version)}</option>`).join('');
    $('#versionFrom').innerHTML=opts;$('#versionTo').innerHTML=opts;
    $('#versionFrom').value=Math.min(changes.length-1,1);$('#versionTo').value=0;
    renderVersionDiff();
  }
  function renderVersionDiff(){
    const a=changes[+$('#versionFrom').value],b=changes[+$('#versionTo').value];if(!a||!b)return;
    const added=b.items.filter(x=>!a.items.includes(x)),removed=a.items.filter(x=>!b.items.includes(x));
    $('#versionDiff').innerHTML=`<div><b>+ En ${safe(b.version)}</b><ul>${(added.length?added:['Sin diferencias textuales directas en el changelog']).map(x=>`<li>${safe(x)}</li>`).join('')}</ul></div><div><b>− Ya no listado desde ${safe(a.version)}</b><ul>${(removed.length?removed:['Nada eliminado del listado comparado']).map(x=>`<li>${safe(x)}</li>`).join('')}</ul></div>`;
  }
  $('#compareVersions')?.addEventListener('click',renderVersionDiff);initVersionCompare();

  /* ---------- Public QR sharing ---------- */
  function publicUrl(){const u=new URL(location.href);u.searchParams.set('view','public');u.hash='';return u.toString()}
  $('#shareBtn')?.addEventListener('click',()=>{openLayer('shareModal');$('#publicShareUrl').value=publicUrl();$('#publicQr').innerHTML='<p>El QR se genera bajo demanda y contiene únicamente esta URL pública.</p>'});
  $('#copyPublicUrl')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(publicUrl());$('#copyPublicUrl').textContent='Copiado ✓';setTimeout(()=>$('#copyPublicUrl').textContent='Copiar enlace',1200)}catch{}});
  $('#generateQr')?.addEventListener('click',()=>{const u=publicUrl(),src=`https://api.qrserver.com/v1/create-qr-code/?size=240x240&format=png&data=${encodeURIComponent(u)}`;$('#publicQr').innerHTML=`<img src="${src}" alt="QR para abrir la visión pública de Soliss AI/RPA Factory"><p class="provenance-detail">Recurso externo solicitado únicamente al pulsar Generar QR.</p>`});

  /* ---------- One Page Executive Brief ---------- */
  const briefHtml=()=>`<h1>Soliss AI/RPA Factory · P0</h1><p><b>Keedio → Soliss</b> · Executive Brief V6</p><div class="brief-columns"><div><h2>¿Por qué P0?</h2><p>Una base común evita que cada caso reconstruya identidad, gobierno de datos, acceso a modelos, seguridad, observabilidad y operación.</p><h2>¿Qué construye?</h2><ul><li>Rancher/RKE2 y patrón federado</li><li>Identidad y segregación</li><li>Data Mesh / fuentes gobernadas</li><li>Model Gateway + RAG</li><li>Servicios IA/RPA comunes</li><li>Evidence + operación</li></ul></div><div><h2>¿Qué habilita?</h2><p>UC1 agentes · UC2 documentos · UC3 siniestros/fraude · UC4 analítica/actuarial · UC5 administración · UC6 IT/cyber · UC7 Grupo.</p><h2>Principio de gobierno</h2><p>Keedio diseña e integra. Soliss decide, valida, posee su infraestructura y conserva accountability.</p><h2>Próximo paso</h2><p>Aprobar P0/F0 y gobernar el avance mediante G1–G4 antes de activar verticales por business case.</p></div></div>`;
  $('#briefBtn')?.addEventListener('click',()=>{openLayer('briefModal');$('#briefPreview').innerHTML=briefHtml()});
  $('#printBrief')?.addEventListener('click',()=>window.open('public/Soliss_AI_RPA_Factory_V6_Executive_Brief.html','_blank','noopener'));

  /* ---------- Accessibility semantics ---------- */
  $$('.segmented').forEach(x=>x.setAttribute('role','group'));
  $$('button').forEach(b=>{if(!b.getAttribute('type'))b.setAttribute('type','button')});
  document.documentElement.lang='es';
  document.addEventListener('keydown',()=>document.body.classList.add('keyboard-user'),{once:true});

  /* ---------- Refresh auth + knowledge when access changes ---------- */
  const accessObs=new MutationObserver(()=>{updateAuthUi();buildKnowledge();buildCommands()});accessObs.observe(document.body,{attributes:true,attributeFilter:['data-access']});
})();
