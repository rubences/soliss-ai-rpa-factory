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


  // P0 explained + simple UC explorer
  const E=D.explainer;
  let explainMode='plain';
  let simpleUC='UC1';
  const explainText=(obj)=>obj[explainMode]||obj.plain||'';
  function renderP0Explainer(){
    $('#p0Headline').textContent=E.p0.headline;
    $('#p0Definition').textContent=explainMode==='plain'?E.p0.plain:E.p0.technical;
    $('#p0Analogy').textContent=E.p0.analogy;
    $('#p0Objective').textContent=E.p0.objective;
    $('#p0Blocks').innerHTML=E.blocks.map(b=>`<article class="p0-block"><h3>${safe(b.title)}</h3><p>${safe(explainText(b))}</p><small>${explainMode==='plain'?'Qué significa':'Qué incluye'}</small></article>`).join('');
    $('#p0Flow').innerHTML=E.commonFlow.map(x=>`<article class="p0-step"><span>${x.n}</span><b>${safe(x.title)}</b><p>${safe(explainText(x))}</p></article>`).join('');
    $('#p0NotIncluded').innerHTML=E.p0.notIncluded.map(x=>`<li>${safe(x)}</li>`).join('');
    $('#glossaryGrid').innerHTML=E.glossary.map(x=>`<article class="glossary-item"><b>${safe(x.term)}</b><p>${safe(explainText(x))}</p></article>`).join('');
  }
  function renderSimpleTabs(){
    $('#ucSimpleTabs').innerHTML=D.useCases.map(u=>`<button class="uc-simple-tab ${u.id===simpleUC?'active':''}" data-simple-uc="${u.id}"><b>${u.id}</b><span>${safe(u.name)}</span></button>`).join('');
    $$('#ucSimpleTabs [data-simple-uc]').forEach(b=>b.addEventListener('click',()=>{simpleUC=b.dataset.simpleUc;renderSimpleTabs();renderSimpleUC()}));
  }
  function renderSimpleUC(){
    const base=D.useCases.find(x=>x.id===simpleUC),u=E.useCases[simpleUC];
    $('#ucSimpleDetail').innerHTML=`<header><div><span>${base.id} · CASO DERIVADO</span><h3>${safe(base.name)}</h3><p class="one-line">${safe(u.plain)}</p></div><span class="badge">P0 → UC</span></header>
      <div class="uc-detail-grid">
        <div class="uc-detail-box"><b>Pregunta que responde</b><p>${safe(u.question)}</p></div>
        <div class="uc-detail-box"><b>Qué deja preparado P0</b><p>${safe(u.p0)}</p></div>
        <div class="uc-detail-box"><b>Qué se construye después</b><p>${safe(u.later)}</p></div>
        <div class="uc-detail-box"><b>Quién lo utilizaría</b><p>${safe(u.users)}</p></div>
        <div class="uc-detail-box example"><b>Ejemplo ilustrativo</b><p>${safe(u.example)}</p></div>
        <div class="uc-detail-box boundary"><b>Qué NO está incluido en P0</b><p>${safe(u.out)}</p></div>
      </div><div class="uc-role-line"><b>Papel humano</b><p>${safe(u.human)}</p></div>`;
  }
  $('#explainMode').addEventListener('click',e=>{const b=e.target.closest('[data-explain]');if(!b)return;explainMode=b.dataset.explain;$$('#explainMode button').forEach(x=>x.classList.toggle('active',x===b));renderP0Explainer();if(typeof renderStory==='function'&&STORIES.length)renderStory();if(typeof renderFactoryEffect==='function'&&FX)renderFactoryEffect()});
  renderP0Explainer();renderSimpleTabs();renderSimpleUC();



  // V4.2 · Visual User Story Lab
  const STORIES=E.userStories||[];
  let storyId=STORIES[0]?.id||'claim',storyStep=0,storyTimer=null;
  const storyById=id=>STORIES.find(s=>s.id===id)||STORIES[0];
  const storyKindLabel={business:'Negocio',p0:'P0 común',uc:'Caso derivado',human:'Profesional Soliss',evidence:'Evidencia / control'};
  function stopStoryPlayback(){if(storyTimer){clearInterval(storyTimer);storyTimer=null}const b=$('#storyPlay');if(b)b.textContent='▶ Reproducir historia'}
  function renderStoryTabs(){$('#storyTabs').innerHTML=STORIES.map(s=>`<button class="story-tab ${s.id===storyId?'active':''}" data-story="${s.id}"><b>${safe(s.title.replace(/^Historia \d+ · /,''))}</b><small>${safe(s.ucs.join(' + '))}</small></button>`).join('');$$('#storyTabs [data-story]').forEach(b=>b.addEventListener('click',()=>{stopStoryPlayback();storyId=b.dataset.story;storyStep=0;renderStory()}))}
  function renderStory(){const s=storyById(storyId),st=s.steps[storyStep];renderStoryTabs();$('#storyUcs').textContent=s.ucs.join(' + ');$('#storyTitle').textContent=s.title;$('#storySubtitle').textContent=s.subtitle;$('#storyOutcome').textContent=s.outcome;$('#storyActors').innerHTML=s.actors.map(a=>`<span class="story-actor">${safe(a)}</span>`).join('');$('#storyProgress').innerHTML=`<i style="width:${((storyStep+1)/s.steps.length)*100}%"></i>`;$('#storySteps').innerHTML=s.steps.map((x,i)=>`<button class="story-step ${i===storyStep?'active':''}" data-story-step="${i}" data-kind="${x.kind}"><span class="step-num">${x.n}</span><b>${safe(x.title)}</b><small>${safe(x.who)}</small></button>`).join('');$$('#storySteps [data-story-step]').forEach(b=>b.addEventListener('click',()=>{stopStoryPlayback();storyStep=+b.dataset.storyStep;renderStory()}));$('#storyPosition').textContent=`Paso ${storyStep+1} de ${s.steps.length}`;$('#storyPrev').disabled=storyStep===0;$('#storyNext').disabled=storyStep===s.steps.length-1;$('#storyInspector').innerHTML=`<span class="kind">${storyKindLabel[st.kind]}</span><h4>${safe(st.title)}</h4><div class="who">${safe(st.who)}</div><p class="desc">${safe(explainMode==='plain'?st.plain:st.technical)}</p><div class="story-inspector-grid"><div><span>Qué hace P0 aquí</span><p>${safe(st.p0)}</p></div><div><span>Qué aporta el UC</span><p>${safe(st.uc)}</p></div><div><span>Papel de Soliss / persona</span><p>${safe(st.human)}</p></div><div><span>Evidencia que debería quedar</span><p>${safe(st.evidence)}</p></div></div>`;$('#storyReuseChips').innerHTML=s.p0Reuse.map(x=>`<span class="story-reuse-chip">${safe(x)}</span>`).join('');$('#storyP0Boundary').textContent=s.p0Boundary;$('#storyUcBoundary').textContent=s.derivedBoundary;$('#storyHuman').textContent=`Interviene: ${s.person}. ${s.outcome}`}
  $('#storyPrev')?.addEventListener('click',()=>{stopStoryPlayback();if(storyStep>0){storyStep--;renderStory()}});$('#storyNext')?.addEventListener('click',()=>{stopStoryPlayback();const s=storyById(storyId);if(storyStep<s.steps.length-1){storyStep++;renderStory()}});
  $('#storyPlay')?.addEventListener('click',()=>{if(storyTimer){stopStoryPlayback();return}$('#storyPlay').textContent='■ Detener';storyTimer=setInterval(()=>{const s=storyById(storyId);if(storyStep>=s.steps.length-1){stopStoryPlayback();return}storyStep++;renderStory();if(storyTimer)$('#storyPlay').textContent='■ Detener'},1800)});
  function renderStoryReuse(){const rows=E.storyReuse||[];$('#storyReuseTable').innerHTML=`<thead><tr><th>Capacidad</th><th>Siniestro</th><th>Empleado</th><th>Factura</th><th>Lectura</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${safe(r.capability)}</b></td><td>${r.claim?'<span class="reuse-yes">✓</span>':'<span class="reuse-vertical">UC</span>'}</td><td>${r.employee?'<span class="reuse-yes">✓</span>':'<span class="reuse-vertical">UC</span>'}</td><td>${r.invoice?'<span class="reuse-yes">✓</span>':'<span class="reuse-vertical">UC</span>'}</td><td class="reuse-why">${safe(r.why)}</td></tr>`).join('')}</tbody>`}
  if(STORIES.length){renderStory();renderStoryReuse()}



  // V4.3 · Factory Effect + future UC onboarding
  const FX=E.factoryEffect, ONB=E.ucOnboarding;
  let effectCaseId=FX?.cases?.[0]?.id||'agent', onboardingStep=0;
  const effectCase=()=>FX.cases.find(x=>x.id===effectCaseId)||FX.cases[0];
  function renderEffectTabs(){
    $('#effectCaseTabs').innerHTML=FX.cases.map(c=>`<button class="effect-case-tab ${c.id===effectCaseId?'active':''}" data-effect-case="${c.id}"><b>${safe(c.label)}</b><small>${safe(c.uc)}</small></button>`).join('');
    $$('#effectCaseTabs [data-effect-case]').forEach(b=>b.addEventListener('click',()=>{effectCaseId=b.dataset.effectCase;renderFactoryEffect()}));
  }
  function renderFactoryEffect(){
    const c=effectCase();renderEffectTabs();
    $('#effectCaseUc').textContent=c.uc;$('#effectCaseLabel').textContent=c.label;$('#effectCaseGoal').textContent=c.goal;
    $('#effectReuseCount').textContent=`${c.reuse.length} capacidades`;
    $('#effectStages').innerHTML=FX.stages.map(s=>`<article class="effect-stage">
      <div class="effect-stage-title">${safe(s.title)}</div>
      <div class="effect-side before"><b>${safe(s.isolated.headline)}</b><p>${safe(explainMode==='plain'?s.isolated.plain:s.isolated.technical)}</p><small>Riesgo típico · ${safe(s.isolated.risk)}</small></div>
      <div class="effect-arrow">→</div>
      <div class="effect-side after"><b>${safe(s.p0.headline)}</b><p>${safe(explainMode==='plain'?s.p0.plain:s.p0.technical)}</p><small>Efecto P0 · ${safe(s.p0.benefit)}</small></div>
    </article>`).join('');
    $('#effectReuseChips').innerHTML=c.reuse.map(x=>`<span class="effect-chip">${safe(x)}</span>`).join('');
    $('#effectStillChips').innerHTML=c.stillBuild.map(x=>`<span class="effect-chip">${safe(x)}</span>`).join('');
  }
  function renderOnboarding(){
    $('#onboardingStatement').textContent=ONB.statement;
    $('#onboardingRail').innerHTML=ONB.steps.map((s,i)=>`<button class="onboarding-step ${i===onboardingStep?'active':''}" data-onboarding="${i}"><i>${s.n}</i><b>${safe(s.title)}</b><small>${safe(s.owner)}</small></button>`).join('');
    $$('#onboardingRail [data-onboarding]').forEach(b=>b.addEventListener('click',()=>{onboardingStep=+b.dataset.onboarding;renderOnboarding()}));
    const s=ONB.steps[onboardingStep];
    $('#onboardingInspector').innerHTML=`<span>PASO ${s.n}</span><h4>${safe(s.title)}</h4><p>${safe(s.question)}</p><dl><div><dt>Responsable principal</dt><dd>${safe(s.owner)}</dd></div><div><dt>Salida esperada</dt><dd>${safe(s.output)}</dd></div></dl>`;
    $('#onboardingReusable').innerHTML=ONB.reusable.map(x=>`<div class="onboarding-capability">${safe(x)}</div>`).join('');
    $('#onboardingVertical').innerHTML=ONB.vertical.map(x=>`<div class="onboarding-capability">${safe(x)}</div>`).join('');
  }
  function onboardingCsv(){
    const rows=[['Paso','Nombre','Responsable','Pregunta de cierre','Salida esperada'],...ONB.steps.map(s=>[s.n,s.title,s.owner,s.question,s.output])];
    return rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
  }
  $('#downloadOnboardingCanvas')?.addEventListener('click',()=>saveBlob(`Soliss_P0_UC_Onboarding_Canvas_${new Date().toISOString().slice(0,10)}.csv`,onboardingCsv(),'text/csv;charset=utf-8'));
  if(FX&&ONB){renderFactoryEffect();renderOnboarding()}

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



  // V4 research + Soliss corporate modules
  const R=D.research;
  $('#solissDnaGrid').innerHTML=R.solissDNA.map(x=>`<article class="dna-card"><strong>${safe(x.value)}</strong><b>${safe(x.label)}</b><p>${safe(x.detail)}</p></article>`).join('');
  $('#supervisoryRadar').innerHTML=R.supervisoryRadar.map(x=>`<article class="radar-card"><span>${safe(x.tag)}</span><h4>${safe(x.title)}</h4><p>${safe(x.detail)}</p><small>${safe(x.source)}</small></article>`).join('');
  $('#sovereigntyTable').innerHTML=`<thead><tr><th>Workload</th><th>Default</th><th>Excepción externa</th><th>Control</th></tr></thead><tbody>${R.sovereignty.map(x=>`<tr><td><b>${safe(x.workload)}</b></td><td>${safe(x.default)}</td><td>${safe(x.external)}</td><td>${safe(x.control)}</td></tr>`).join('')}</tbody>`;
  $('#kpiGrid').innerHTML=R.kpiBlueprint.map(x=>`<article class="kpi-card"><header><span>${x.uc}</span><b>N/D → target en workshop</b></header><h4>${safe(x.name)}</h4><div class="kpi-tags">${x.kpis.map(k=>`<span>${safe(k)}</span>`).join('')}</div><small>Baseline, target, actual, owner y evidencia se completan con Soliss antes del caso productivo.</small></article>`).join('');
  $('#downloadKpiPlan').addEventListener('click',()=>{const rows=[['UC','Caso','KPI','Baseline','Target','Actual','Owner','Evidence source']];R.kpiBlueprint.forEach(x=>x.kpis.forEach(k=>rows.push([x.uc,x.name,k,'N/D','N/D','N/D','Por asignar','Por definir'])));const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(';')).join('\n');saveBlob('Soliss_P0_Value_Measurement_Blueprint.csv','\ufeff'+csv,'text/csv;charset=utf-8')});
  $('#aiTimeline').innerHTML=R.aiTimeline.map(x=>`<article class="timeline-event"><span>${safe(x.date)}</span><b>${safe(x.title)}</b><p>${safe(x.detail)}</p></article>`).join('');
  $('#assurancePillars').innerHTML=R.assurancePillars.map(x=>`<article class="pillar"><b>${safe(x.title)}</b><p>${safe(x.question)}</p><small>${safe(x.p0)}</small></article>`).join('');
  $('#doraBoard').innerHTML=R.doraBoard.map((x,i)=>`<article class="dora-item"><span>${i+1}</span><div><b>${safe(x.title)}</b><p>${safe(x.detail)}</p></div></article>`).join('');
  $('#assuranceStack').innerHTML=R.assuranceStack.map(x=>`<article class="stack-card"><span>${safe(x.status)}</span><h4>${safe(x.name)} · ${safe(x.role)}</h4><p>${safe(x.detail)}</p></article>`).join('');
  $('#isoPdca').innerHTML=R.isoPDCA.map(x=>`<article class="pdca-step"><span>${safe(x.stage)}</span><b>${safe(x.title)}</b><p>${safe(x.detail)}</p></article>`).join('');
  const literacyKey='soliss-p0-literacy-v4';let literacyState={};try{literacyState=JSON.parse(localStorage.getItem(literacyKey)||'{}')}catch{}
  function renderLiteracy(){
    $('#literacyGrid').innerHTML=R.literacy.map(x=>`<article class="literacy-card"><h4>${safe(x.role)}</h4>${x.topics.map((t,i)=>`<label class="literacy-topic"><input type="checkbox" data-lit="${x.id}-${i}" ${literacyState[`${x.id}-${i}`]?'checked':''}><span>${safe(t)}</span></label>`).join('')}</article>`).join('');
    $$('#literacyGrid input').forEach(inp=>inp.addEventListener('change',()=>{literacyState[inp.dataset.lit]=inp.checked;localStorage.setItem(literacyKey,JSON.stringify(literacyState))}));
  }renderLiteracy();
  $('#agenticRules').innerHTML=R.agenticGate.map(x=>`<article class="agentic-rule"><b>${safe(x.rule)}</b><p>${safe(x.detail)}</p></article>`).join('');
  $('#gateDeliverables').innerHTML=R.gateDeliverables.map(g=>`<article class="gate-delivery"><span>${g.gate}</span><h4>${safe(g.title)}</h4><ul>${g.items.map(i=>`<li>${safe(i)}</li>`).join('')}</ul></article>`).join('');
  const resp=R.responsibilities;$('#responsibilityTable').innerHTML=`<thead><tr><th>Actividad</th>${resp.roles.map(r=>`<th>${safe(r)}</th>`).join('')}</tr></thead><tbody>${resp.rows.map(row=>`<tr><td><b>${safe(row[0])}</b></td>${row.slice(1).map(v=>`<td><span class="raci">${safe(v)}</span></td>`).join('')}</tr>`).join('')}</tbody>`;
  const normFaq=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let faqQuery='';function renderFaq(){const q=normFaq(faqQuery),list=R.faqs.filter(x=>!q||normFaq(x.q+' '+x.a).includes(q));$('#faqCount').textContent=`${list.length}/${R.faqs.length}`;$('#faqGrid').innerHTML=list.map(x=>`<details class="faq-item"><summary>${safe(x.q)}</summary><div><p>${safe(x.a)}</p><a href="${x.target}">Ir a la evidencia →</a></div></details>`).join('')||'<div class="no-docs">Sin coincidencias.</div>'}$('#faqSearch').addEventListener('input',e=>{faqQuery=e.target.value;renderFaq()});renderFaq();
  $('#changelogGrid').innerHTML=R.changelog.map(x=>`<article class="change-version"><header><b>${safe(x.version)}</b><span>${safe(x.date)}</span></header><ul>${x.items.map(i=>`<li>${safe(i)}</li>`).join('')}</ul></article>`).join('');

  // Document Center
  const DOCS=window.P0_DOCUMENTS;
  let docFilter='all', docQuery='';
  const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function renderDocuments(){
    const q=normalize(docQuery);
    const groups=DOCS.groups.filter(g=>{
      const filterOk=docFilter==='all'||g.tags.includes(docFilter);
      const hay=normalize([g.title,g.description,g.status,...g.tags,...g.formats.map(f=>f.type)].join(' '));
      return filterOk && (!q||hay.includes(q));
    });
    $('#documentGrid').innerHTML=groups.length?groups.map(g=>`
      <article class="document-card">
        <header><span class="doc-status ${g.tags.includes('baseline')?'baseline':''}">${safe(g.status)}</span><small>${g.formats.length} formato${g.formats.length>1?'s':''}</small></header>
        <h3>${safe(g.title)}</h3><p>${safe(g.description)}</p>
        <div class="doc-tags">${g.tags.map(t=>`<span>${safe(t)}</span>`).join('')}</div>
        <div class="doc-formats">${g.formats.map(f=>`
          <div class="doc-format">
            <span class="doc-type">${f.type}</span>
            <div><b>${safe(f.size)}</b><small>SHA‑256</small><code title="${f.sha256}">${f.sha256.slice(0,12)}…</code></div>
            <div class="doc-actions">${f.preview?`<a href="${f.path}" target="_blank" rel="noopener" title="Abrir">↗</a>`:''}<a href="${f.path}" download title="Descargar">↓</a></div>
          </div>`).join('')}</div>
      </article>`).join(''):`<div class="no-docs">No hay documentos que coincidan con este filtro.</div>`;
  }
  $('#downloadPack').href=DOCS.pack.path;
  $('#packMeta').textContent=`${DOCS.pack.fileCount} archivos · ${DOCS.pack.size} · SHA ${DOCS.pack.sha256.slice(0,12)}…`;
  $('#manifestJsonLink').href=DOCS.manifest.json; $('#manifestTxtLink').href=DOCS.manifest.txt;
  $$('.doc-filter').forEach(b=>b.addEventListener('click',()=>{docFilter=b.dataset.docFilter;$$('.doc-filter').forEach(x=>x.classList.toggle('active',x===b));renderDocuments()}));
  $('#documentSearch').addEventListener('input',e=>{docQuery=e.target.value;renderDocuments()});
  renderDocuments();

  // Committee toolkit: local-only export of the current working session
  const isoStamp=()=>new Date().toISOString();
  function currentEconomics(){
    const s=D.economics.scenarios.find(x=>x.id===econScenario), optional=$('#optionalToggle').checked?D.economics.optional:0;
    const low=D.economics.base24+s.low+optional, high=D.economics.base24+s.high+optional;
    return {scenario:s.label,infra:{low:s.low,high:s.high},includeS2:Boolean($('#optionalToggle').checked),keedio24:D.economics.base24,tco:{low,high,mid:(low+high)/2}};
  }
  function ucSnapshot(){
    return D.useCases.map(u=>({id:u.id,name:u.name,score:score(ucValues[u.id]),values:{...ucValues[u.id]}})).sort((a,b)=>b.score-a.score);
  }
  function gateSnapshot(){
    return D.gates.map(g=>{const done=g.checks.filter((_,i)=>gateState[`${g.id}-${i}`]).length;return {id:g.id,title:g.title,when:g.when,done,total:g.checks.length,ready:done===g.checks.length,checks:g.checks.map((c,i)=>({label:c,done:Boolean(gateState[`${g.id}-${i}`])}))}});
  }
  function evidenceSnapshot(){
    return D.evidence.map(e=>({id:e.id,area:e.area,control:e.control,owner:e.owner,status:evidenceState[e.id]||e.default,statusLabel:statusLabels[evidenceState[e.id]||e.default]}));
  }
  function sessionSnapshot(){
    return {
      meta:{generatedAt:isoStamp(),product:'Soliss AI/RPA Factory · P0 Decision Room',proponent:'Keedio',client:'Soliss',audience:document.body.dataset.audience,notice:'Snapshot local de trabajo. No constituye aprobación, acta firmada ni evidencia de ejecución.'},
      economics:currentEconomics(),
      digitalTwin:{scenario:currentScenario,lens:currentLens,node:currentNode},
      useCaseRanking:ucSnapshot(),
      gates:gateSnapshot(),
      evidence:evidenceSnapshot(),
      aiLiteracy:{...literacyState}
    };
  }
  function saveBlob(name,content,type){
    const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function meetingMinutes(){
    const s=sessionSnapshot(), e=s.economics;
    const gateLines=s.gates.map(g=>`- ${g.id} · ${g.title}: ${g.done}/${g.total} · ${g.ready?'READY FOR DECISION':'pendiente'}`).join('\n');
    const evidenceLines=s.evidence.map(x=>`- ${x.area} · ${x.control}: ${x.statusLabel} · ${x.owner}`).join('\n');
    const ucLines=s.useCaseRanking.map((u,i)=>`${i+1}. ${u.id} · ${u.name}: ${u.score}/100`).join('\n');
    return `# Acta preliminar de sesión · Soliss AI/RPA Factory P0

**Proponente:** Keedio  
**Cliente:** Soliss  
**Generada:** ${new Date().toLocaleString('es-ES')}  
**Vista utilizada:** ${s.meta.audience}

> Documento generado automáticamente en el navegador para preparación de comité. No sustituye un acta firmada, una aceptación contractual ni evidencia de ejecución.

## Escenario económico
- Escenario de infraestructura: ${e.scenario}
- Infraestructura Soliss: ${eur(e.infra.low)} – ${eur(e.infra.high)}
- Servicios Keedio M1–M24: ${eur(e.keedio24)}
- S2 M25–M36: ${e.includeS2?'Incluido':'No incluido'}
- TCO orientativo: ${eur(e.tco.low)} – ${eur(e.tco.high)}
- Punto central: ${eur(e.tco.mid)}

## Digital Twin
- Escenario: ${D.architecture.scenarios.find(x=>x.id===s.digitalTwin.scenario)?.label||s.digitalTwin.scenario}
- Lens: ${s.digitalTwin.lens}
- Nodo seleccionado: ${nodeById(s.digitalTwin.node)?.label||s.digitalTwin.node}

## Gates
${gateLines}

## Evidence Registry
${evidenceLines}

## Priorización UC
${ucLines}

## Nota de gobierno
Keedio propone, diseña e integra el patrón P0. Soliss decide, valida, adquiere la infraestructura bajo su responsabilidad y asume la operación según el reparto acordado.
`;
  }
  $('#downloadSnapshot').addEventListener('click',()=>saveBlob(`Soliss_P0_Decision_Snapshot_${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(sessionSnapshot(),null,2),'application/json;charset=utf-8'));
  $('#downloadMinutes').addEventListener('click',()=>saveBlob(`Soliss_P0_Acta_Preliminar_${new Date().toISOString().slice(0,10)}.md`,meetingMinutes(),'text/markdown;charset=utf-8'));
  $('#printRoom').addEventListener('click',()=>window.print());
  $('#resetSession').addEventListener('click',()=>{
    if(!confirm('¿Reiniciar los datos locales de esta sesión? No se borrará ningún documento.')) return;
    [ucKey,evidenceKey,gateKey,literacyKey].forEach(k=>localStorage.removeItem(k));
    location.reload();
  });


  // V4.4 · Executive Story Mode
  const EX=window.P0.executiveStory;
  let exIndex=0,exElapsed=0,exSceneElapsed=0,exTimer=null,exAuto=false,exQa=false,exNotesOpen=true;
  const exScenes=()=>document.body.dataset.access==='public'?(EX.publicScenes||EX.scenes):EX.scenes;
  const exTotal=()=>exScenes().reduce((a,x)=>a+x.duration,0);
  const exScene=()=>exScenes()[exIndex];
  const mmss=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.max(0,Math.floor(s%60))).padStart(2,'0')}`;
  const execStoryVisible=()=>!$('#execStory').hidden;

  function exVisual(scene){
    const econ=D.economics;
    if(scene.visual==='opening')return `<div class="exec-visual exec-flow"><div class="exec-flow-card"><span>01 · P0</span><b>Capacidad común</b><p>Infraestructura, identidad, datos, Gateway, seguridad y operación.</p></div><div class="exec-flow-arrow">→</div><div class="exec-flow-card"><span>02 · UC</span><b>Vertical derivado</b><p>Proceso, reglas, datos concretos, UX, UAT y KPI.</p></div><div class="exec-flow-arrow">→</div><div class="exec-flow-card"><span>03 · VALOR</span><b>Resultado de negocio</b><p>Activado por Soliss mediante business case y Go/No-Go.</p></div></div>`;
    if(scene.visual==='market')return `<div class="exec-visual exec-stat-grid"><div class="exec-stat"><b>65%</b><span>aseguradoras ya usan GenAI</span><small>EIOPA · benchmark de la Decision Room</small></div><div class="exec-stat"><b>64%</b><span>casos aún en PoC / experimentación</span><small>El reto es industrializar.</small></div><div class="exec-stat"><b>32%</b><span>casos alcanzan producción</span><small>P0 aborda el salto PoC → operación.</small></div></div>`;
    if(scene.visual==='p0')return `<div class="exec-visual exec-cap-grid">${[['Plataforma','Rancher / RKE2'],['Identidad','Keycloak · RBAC/ABAC'],['Datos','Data Mesh · catálogo'],['IA','Model Gateway · RAG'],['Servicios','OCR · n8n · APIs'],['Seguridad','HA · backup · DR'],['Evidencia','logs · provenance'],['Operación','IaC · runbooks · N0–N3']].map(x=>`<div class="exec-cap"><b>${x[0]}</b><small>${x[1]}</small></div>`).join('')}</div>`;
    if(scene.visual==='stories')return `<div class="exec-visual exec-story-cards"><div class="exec-story-card"><span>UC2 + UC3</span><b>Un siniestro entra</b><p>Documentos → contexto → señales → profesional Soliss → evidencia.</p><div class="reuse"><i>Identidad</i><i>Datos</i><i>Gateway</i><i>HITL</i></div></div><div class="exec-story-card"><span>UC1</span><b>Empleado consulta</b><p>Identidad → RAG → modelo autorizado → respuesta → escalado.</p><div class="reuse"><i>RAG</i><i>Gateway</i><i>Logging</i><i>Fuentes</i></div></div><div class="exec-story-card"><span>UC2 + UC5</span><b>Llega una factura</b><p>Extracción → reglas → excepción → aprobación → auditoría.</p><div class="reuse"><i>OCR</i><i>Policies</i><i>Integración</i><i>Audit</i></div></div></div>`;
    if(scene.visual==='effect')return `<div class="exec-visual exec-compare"><div class="left"><span class="exec-scene-label">VERTICAL AISLADO</span><h3>Reconstruye la base</h3><ul><li>Identidad / permisos</li><li>Integraciones y fuentes</li><li>Acceso a modelos</li><li>Logging y observabilidad</li><li>Controles y soporte</li></ul></div><div class="mid">→</div><div class="right"><span class="exec-scene-label">CON P0</span><h3>Se concentra en el diferencial</h3><ul><li>Business case</li><li>Datos concretos</li><li>Reglas / modelo / workflow</li><li>UX y canales</li><li>UAT + KPI de negocio</li></ul></div></div>`;
    if(scene.visual==='architecture')return `<div class="exec-visual"><div class="exec-arch"><div><span>GESTIÓN</span><b>Rancher / RKE2</b><small>Flota y ciclo de vida.</small></div><div><span>GRUPO</span><b>Servicios transversales</b><small>Identidad, catálogo, PostgreSQL.</small></div><div><span>DOMINIOS</span><b>RKE2 por empresa</b><small>Aislamiento y ownership.</small></div><div><span>IA</span><b>Model Gateway</b><small>Modelos, cuotas, logs y fallback.</small></div></div><div class="exec-fallback">↺ Gravitino = PoC no bloqueante · retraso GPU = sandbox provisional · producción exige HA/backup/DR</div></div>`;
    if(scene.visual==='economics'){const available=econ.base24>0;return `<div class="exec-visual exec-econ-grid"><div class="exec-econ"><span>CONSTRUCCIÓN P0</span><b>${available?eur(econ.build):'Boardroom'}</b><small>Baseline Final Cerrado.</small></div><div class="exec-econ"><span>SERVICIO M3–M24</span><b>${available?eur(econ.service):'Boardroom'}</b><small>Operación co-gestionada.</small></div><div class="exec-econ"><span>INFRA SOLISS</span><b>${available?'180–280 k€':'Sizing G2'}</b><small>Compra directa · sujeto a sizing/cotización.</small></div></div>`}
    if(scene.visual==='governance')return `<div class="exec-visual exec-gate-grid">${D.gates.map(g=>`<div class="exec-gate"><span>${g.id} · ${g.when}</span><b>${safe(g.title)}</b><p>${safe(g.criteria||g.checks?.[0]||'Validación por evidencia.')}</p></div>`).join('')}</div>`;
    if(scene.visual==='publicTrust')return `<div class="exec-visual exec-story-cards"><div class="exec-story-card"><span>DATA</span><b>Fuentes autorizadas</b><p>Ownership, clasificación y provenance antes de utilizar información corporativa.</p><div class="reuse"><i>Data governance</i><i>RAG</i></div></div><div class="exec-story-card"><span>AI</span><b>Modelos controlados</b><p>Gateway, allowlist, logging y fallback como patrón corporativo.</p><div class="reuse"><i>Gateway</i><i>Logging</i></div></div><div class="exec-story-card"><span>HUMAN</span><b>Supervisión efectiva</b><p>La automatización mantiene escalado, revisión y accountability de Soliss.</p><div class="reuse"><i>HITL</i><i>Evidence</i></div></div></div>`;
    if(scene.visual==='decision')return `<div class="exec-visual exec-decision-grid"><div class="exec-decision-card"><span>AHORA</span><b>Aprobar P0 + F0</b></div><div class="exec-decision-card"><span>G2 / G3 / G4</span><b>Validar inversión, PoC/fallback y transferencia</b></div><div class="exec-decision-card"><span>DESPUÉS</span><b>Activar UC por business case</b></div></div>`;
    return '';
  }

  function exRenderSegments(){
    $('#execSegments').innerHTML=exScenes().map((s,i)=>`<button class="exec-segment ${i<exIndex?'done':''} ${i===exIndex?'active':''}" data-ex-scene="${i}" title="${safe(s.title)}"><i></i></button>`).join('');
    $$('#execSegments [data-ex-scene]').forEach(b=>b.addEventListener('click',()=>exGo(+b.dataset.exScene)));
  }
  function exRender(){
    const s=exScene(),remaining=Math.max(0,s.duration-exSceneElapsed);
    $('#execSceneCounter').textContent=`${exIndex+1} / ${exScenes().length}`;
    $('#execElapsed').textContent=mmss(exElapsed);$('#execTotal').textContent=mmss(exTotal());
    $('#execSceneTime').textContent=`${Math.round(s.duration/60*10)/10} min`;$('#execCountdown').textContent=mmss(remaining);
    $('#execProgress').style.width=`${Math.min(100,exElapsed/exTotal()*100)}%`;
    $('#execPrev').disabled=exIndex===0;$('#execNext').disabled=exIndex===exScenes().length-1;
    $('#execPlay').textContent=exAuto?'❚❚ Pausar':'▶ Auto';$('#execQa').textContent=exQa?'▶ Continuar':'❓ Pausa Q&A';
    $('#execStage').innerHTML=`${exQa?'<div class="exec-qa-badge"><i></i> PAUSA Q&A · cronómetro detenido</div>':''}<span class="exec-scene-kicker">${safe(s.kicker)}</span><h1>${safe(s.title)}</h1><p class="exec-message">${safe(s.message)}</p><div class="exec-cue"><span>${safe(s.cue)}</span><b>${safe(s.cueText)}</b></div>${exVisual(s)}`;
    $('#execNotesBody').innerHTML=`<ul>${s.notes.map(n=>`<li>${safe(n)}</li>`).join('')}</ul><div class="exec-if-asked"><span>Si surge una pregunta</span><p>Pulsa <b>Profundizar</b> y después “Reanudar Executive Story”.</p></div>`;
    exRenderSegments();
  }
  function exGo(i){exIndex=Math.max(0,Math.min(i,exScenes().length-1));exElapsed=exScenes().slice(0,exIndex).reduce((a,x)=>a+x.duration,0);exSceneElapsed=0;exQa=false;exRender()}
  function exTick(){if(!exAuto||exQa)return;exElapsed++;exSceneElapsed++;if(exSceneElapsed>=exScene().duration){if(exIndex<exScenes().length-1){exIndex++;exSceneElapsed=0}else{exAuto=false;clearInterval(exTimer);exTimer=null}}exRender()}
  function exToggleAuto(){exAuto=!exAuto;exQa=false;if(exAuto&&!exTimer)exTimer=setInterval(exTick,1000);exRender()}
  function exOpen(){$('#execStory').hidden=false;$('#execStory').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('#execResume').hidden=true;exRender();try{document.documentElement.requestFullscreen?.()}catch{}}
  function exClose(full=true){$('#execStory').hidden=true;$('#execStory').setAttribute('aria-hidden','true');document.body.style.overflow='';exAuto=false;if(exTimer){clearInterval(exTimer);exTimer=null}if(full)$('#execResume').hidden=true;if(full&&document.fullscreenElement)document.exitFullscreen?.()}
  function exRestart(){exIndex=0;exElapsed=0;exSceneElapsed=0;exQa=false;exAuto=false;if(exTimer){clearInterval(exTimer);exTimer=null}exRender()}
  function exToggleNotes(){exNotesOpen=!exNotesOpen;$('#execNotes').classList.toggle('collapsed',!exNotesOpen);$('.exec-story-main').classList.toggle('notes-off',!exNotesOpen)}
  function exDeep(){const link=exScene().deepLink;exAuto=false;if(exTimer){clearInterval(exTimer);exTimer=null}exClose(false);$('#execResume').hidden=false;$(link)?.scrollIntoView({behavior:'smooth',block:'start'})}

  $('#execStoryBtn')?.addEventListener('click',exOpen);$$('[data-open-exec-story]').forEach(b=>b.addEventListener('click',exOpen));
  $('#execExit')?.addEventListener('click',()=>exClose(true));$('#execPrev')?.addEventListener('click',()=>exGo(exIndex-1));$('#execNext')?.addEventListener('click',()=>exGo(exIndex+1));$('#execPlay')?.addEventListener('click',exToggleAuto);$('#execRestart')?.addEventListener('click',exRestart);$('#execNotesToggle')?.addEventListener('click',exToggleNotes);$('#execQa')?.addEventListener('click',()=>{exQa=!exQa;if(exQa)exAuto=false;exRender()});$('#execDeepDive')?.addEventListener('click',exDeep);$('#execResume')?.addEventListener('click',exOpen);
  addEventListener('keydown',e=>{if(!execStoryVisible())return;if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();exGo(exIndex+1)}if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();exGo(exIndex-1)}if(e.key===' '){e.preventDefault();exToggleAuto()}if(e.key.toLowerCase()==='n')exToggleNotes();if(e.key.toLowerCase()==='q'){exQa=!exQa;if(exQa)exAuto=false;exRender()}if(e.key==='Escape')exClose(true)});



  // V5 · Unified Access Hub
  const ACCESS_NAV={
    public:[
      ['Contexto','#why'],
      ['P0 + Casos de uso','#factory'],
      ['Assurance','#assurance']
    ],
    boardroom:[
      ['Contexto','#why'],
      ['Decisiones','#decision'],
      ['Arquitectura','#twin'],
      ['P0 + Casos de uso','#factory'],
      ['Economics','#economics'],
      ['Governance','#governance'],
      ['Assurance','#assurance'],
      ['Delivery','#delivery'],
      ['Docs','#documents']
    ]
  };
  const ACCESS_COPY={
    public:{
      badge:'PUBLIC',
      ribbon:'Visión pública · estrategia, P0, casos de uso y assurance. Sin economics ni documentación interna.',
      brand:'AI/RPA Factory · Visión pública',
      switchLabel:'Public',
      title:'Soliss AI/RPA Factory · Visión pública | Keedio',
      scope:'P0 · AI/RPA Factory',
      status:'VISIÓN PÚBLICA',
      closeTitle:'Una base común para convertir casos de IA/RPA en capacidades gobernadas.',
      closeText:'La visión pública explica el porqué, el modelo P0 y los casos de uso sin exponer economics, herramientas de comité ni documentación interna.',
      closeHref:'#factory',
      closeCta:'Volver a P0'
    },
    boardroom:{
      badge:'BOARDROOM',
      ribbon:'Boardroom Keedio → Soliss · economics, arquitectura, gobierno, delivery, evidencias y documentación de propuesta.',
      brand:'P0 Decision Room · Boardroom',
      switchLabel:'Boardroom',
      title:'Keedio → Soliss · P0 Boardroom V5',
      scope:'P0 · Infraestructura crítica',
      status:'FINAL CERRADO',
      closeTitle:'P0 construye la capacidad. Soliss conserva el control. Los casos de uso capturan el valor.',
      closeText:'La siguiente decisión no es comprar siete soluciones. Es aprobar la base que permite desplegarlas con gobierno, seguridad, trazabilidad y un modelo operativo transferible.',
      closeHref:'#decision',
      closeCta:'Volver a decisiones'
    }
  };

  function buildAccessNav(mode){
    $('#nav').innerHTML=ACCESS_NAV[mode].map(([label,href])=>`<a href="${href}">${label}</a>`).join('');
    $$('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
  }

  function updateExecutiveStoryForAccess(mode){
    exIndex=0;exElapsed=0;exSceneElapsed=0;exAuto=false;exQa=false;
    if(exTimer){clearInterval(exTimer);exTimer=null}
    const mins=Math.ceil(exTotal()/60);
    $('#execStoryBtn').textContent=`● Story ${mins} min`;
    $$('[data-open-exec-story]').forEach(b=>b.textContent=mode==='public'?`▶ Story público · ${mins} min`:`▶ Executive Story · ${mins} min`);
    $('#execTotal').textContent=mmss(exTotal());
  }

  function applyAccessMode(mode,{updateUrl=true,remember=true}={}){
    if(!ACCESS_COPY[mode])return;
    const c=ACCESS_COPY[mode];
    document.body.dataset.access=mode;
    $('#accessPortal').hidden=true;
    $('#accessRibbon').hidden=false;
    $('#accessBadge').textContent=c.badge;
    $('#accessBadge').className=`access-badge ${mode}`;
    $('#accessRibbonText').textContent=c.ribbon;
    $('#brandModeText').textContent=c.brand;
    $('#accessSwitchLabel').textContent=c.switchLabel;
    $('#accessSwitchBtn').className=`access-switch-btn ${mode}`;
    document.title=c.title;
    $('#heroScopeLabel').textContent=c.scope;
    $('#heroStatus').textContent=c.status;
    $('#closingTitle').textContent=c.closeTitle;
    $('#closingText').textContent=c.closeText;
    $('#closingCta').href=c.closeHref;
    $('#closingCta').textContent=c.closeCta;
    buildAccessNav(mode);

    if(mode==='boardroom'){
      const a=['board','tech','compliance'].includes(document.body.dataset.audience)?document.body.dataset.audience:'board';
      setAudience(a);
    }else{
      document.body.dataset.audience='all';
    }
    updateExecutiveStoryForAccess(mode);
    if(remember)sessionStorage.setItem('soliss-p0-access',mode);
    if(updateUrl){
      const u=new URL(location.href);
      u.searchParams.set('view',mode);
      u.hash='';
      history.replaceState(null,'',u);
    }
    scrollTo({top:0,behavior:'auto'});
    setTimeout(()=>{navSpyUpdate();$$('.reveal').forEach(el=>{if(getComputedStyle(el).display!=='none')el.classList.add('visible')})},40);
  }

  function showAccessPortal(preselect=null){
    document.body.dataset.access='portal';
    $('#accessPortal').hidden=false;
    $('#accessRibbon').hidden=true;
    $('#nav').classList.remove('open');
    $('#boardroomConsent').hidden=true;
    $('#boardroomAck').checked=false;
    $('#boardroomEnter').disabled=true;
    if(preselect==='boardroom'){
      $('#boardroomConsent').hidden=false;
      setTimeout(()=>$('#boardroomConsent').scrollIntoView({behavior:'smooth',block:'nearest'}),50);
    }
  }

  function initAccessPortal(){
    const params=new URLSearchParams(location.search);
    const requested=params.get('view');
    const remembered=sessionStorage.getItem('soliss-p0-access');
    if(requested==='public') return applyAccessMode('public',{updateUrl:false});
    if(requested==='boardroom'){
      if(remembered==='boardroom')return applyAccessMode('boardroom',{updateUrl:false});
      return showAccessPortal('boardroom');
    }
    if(remembered==='public'||remembered==='boardroom')return applyAccessMode(remembered,{updateUrl:true,remember:false});
    showAccessPortal();
  }

  $$('[data-access-choice]').forEach(b=>b.addEventListener('click',()=>{
    const mode=b.dataset.accessChoice;
    if(mode==='public')applyAccessMode('public');
    else{
      $('#boardroomConsent').hidden=false;
      setTimeout(()=>$('#boardroomConsent').scrollIntoView({behavior:'smooth',block:'nearest'}),40);
    }
  }));
  $('#boardroomAck').addEventListener('change',e=>$('#boardroomEnter').disabled=!e.target.checked);
  $('#boardroomEnter').addEventListener('click',()=>applyAccessMode('boardroom'));
  $('#boardroomCancel').addEventListener('click',()=>{$('#boardroomConsent').hidden=true;$('#boardroomAck').checked=false;$('#boardroomEnter').disabled=true});
  $('#accessSwitchBtn').addEventListener('click',()=>showAccessPortal());
  $('#accessRibbonSwitch').addEventListener('click',()=>showAccessPortal());
  $('#copyAccessLink').addEventListener('click',async()=>{const u=new URL(location.href);u.searchParams.set('view',document.body.dataset.access);u.hash='';try{await navigator.clipboard.writeText(u.toString());$('#copyAccessLink').textContent='Enlace copiado ✓';setTimeout(()=>$('#copyAccessLink').textContent='Copiar enlace',1400)}catch{$('#copyAccessLink').textContent='No disponible'}});


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
  initAccessPortal();
})();
