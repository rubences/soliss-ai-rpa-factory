/* V7 · Tender Workspace */
(() => {
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const safe=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const eur=v=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(Number(v)||0);
  let T=null,filter='all';
  const csv=(rows)=>rows.map(r=>r.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\n');
  const download=(name,text)=>{const u=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),500)};

  async function load(){
    if(T)return T;
    const r=window.V6Auth?await V6Auth.fetchPrivate('tender-data.json'):await fetch('private/tender-data.json',{cache:'no-store'});
    if(!r.ok)throw new Error(`No se pudo cargar el espacio de licitación (${r.status})`);
    T=await r.json();render();return T;
  }
  function readiness(){const a=T.readiness,ready=a.filter(x=>x[1]==='ready').length,warning=a.filter(x=>x[1]==='warning').length,missing=a.filter(x=>x[1]==='missing').length;return {ready,warning,missing,total:a.length,pct:Math.round(ready/a.length*100)}}
  function render(){
    const r=readiness();$('#tenderReadinessHero').textContent=`${r.ready}/${r.total} bloques cerrados`;$('#tenderReadinessHeroText').textContent=`${r.warning} requieren reconciliación y ${r.missing} necesitan clausulado/decisión antes de un pliego formal.`;
    const E=T.economics;
    $('#tenderSummaryCards').innerHTML=[['Objeto','P0 · infraestructura crítica y plataforma IA/RPA'],['Alcance contractual','P0 + S1'],['Duración','24 meses base + 12 opcionales'],['Servicios Keedio',eur(E.base24)],['Infra Soliss','180–280 k€ orientativos'],['UC1–UC7','Derivados · partidas adicionales']].map(x=>`<article><span>${x[0]}</span><b>${x[1]}</b></article>`).join('');
    const boardHours=(window.P0?.economics?.phases||[]).reduce((a,x)=>a+(+x.hours||0),0);
    $('#tenderReconciliation').innerHTML=`<div><span>CONTROL DE COHERENCIA ECONÓMICA</span><h3>Reconciliar horas antes de publicar el pliego.</h3><p>El documento fuente de licitación distribuye F0–F4 en <b>${T.economics.phases.find(x=>x[0].startsWith('Subtotal'))?.[2]||'—'} h</b> y mantiene ${eur(E.construction)}. El Boardroom Final Cerrado cargado en V7 distribuye F0–F4 en <b>${boardHours||'—'} h</b> y mantiene el mismo total económico. V7 conserva ambas fuentes y no elige una silenciosamente.</p></div><strong>REQUIERE DECISIÓN</strong>`;
    $('#tenderIncluded').innerHTML=T.included.map(x=>`<li>${safe(x)}</li>`).join('');$('#tenderExcluded').innerHTML=T.excluded.map(x=>`<li>${safe(x)}</li>`).join('');
    $('#technicalConditionCards').innerHTML=T.technicalConditions.map(x=>`<article><header><span>${x.id}</span><h3>${safe(x.title)}</h3></header><p>${safe(x.requirement)}</p><small><b>Aceptación:</b> ${safe(x.acceptance)}</small></article>`).join('');
    $('#technicalPptTable').innerHTML=`<thead><tr><th>ID</th><th>Prescripción</th><th>Respuesta Keedio</th><th>Entregable / aceptación</th><th>Condición</th></tr></thead><tbody>${T.ppt.map(x=>`<tr><td><b>${x[0]}</b></td><td>${safe(x[1])}</td><td>${safe(x[2])}</td><td>${safe(x[3])}</td><td><span class="tender-status ${x[4]}">${x[4]==='cumple'?'CUMPLE':x[4]==='gate'?'GATE / POC':'CONDICIONADO'}</span><small>${safe(x[5])}</small></td></tr>`).join('')}</tbody>`;
    $('#economicSummary').innerHTML=[['Construcción P0',eur(E.construction),'Servicios Keedio F0–F4'],['S1 M3–M24',eur(E.service),'Servicio co-gestionado'],['Total Keedio 24M',eur(E.base24),'Contrato base P0 + S1'],['Infraestructura Soliss','180–280 k€','Compra directa · sizing G2'],['TCO orientativo',eur(E.tcoMid),'Usa 230 k€ de infraestructura'],['S2 opcional',eur(E.optional),'M25–M36']].map(x=>`<article><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></article>`).join('');
    $('#tenderPhaseTable').innerHTML=`<thead><tr><th>Bloque</th><th>Periodo</th><th>Horas</th><th>Importe</th><th>€/h</th><th>Objeto</th></tr></thead><tbody>${E.phases.map(x=>`<tr><td><b>${safe(x[0])}</b></td><td>${x[1]}</td><td>${x[2]}</td><td>${eur(x[3])}</td><td>${eur(x[4])}</td><td>${safe(x[5])}</td></tr>`).join('')}</tbody>`;
    $('#commercialConditions').innerHTML=E.commercial.map(x=>`<div><span class="commercial-state ${x[2]}">${x[2]==='defined'?'DEFINIDA':'PENDIENTE'}</span><b>${safe(x[0])}</b><p>${safe(x[1])}</p></div>`).join('');
    $('#tenderInfraTable').innerHTML=`<thead><tr><th>Bloque</th><th>Descripción</th><th>Rango orientativo</th></tr></thead><tbody>${E.infra.map(x=>`<tr><td><b>${safe(x[0])}</b></td><td>${safe(x[1])}</td><td>${safe(x[2])}</td></tr>`).join('')}</tbody>`;
    renderCompliance();
    $('#tenderEvaluationGrid').innerHTML=T.evaluation.map(x=>`<article data-eval="${x.id}"><header><span>${x.group}</span><b>${x.max} pt</b></header><p>${safe(x.criterion)}</p><label>Puntuación <input type="number" min="0" max="${x.max}" step="0.5" value="0" data-eval-score="${x.id}"> / ${x.max}</label></article>`).join('');
    $$('[data-eval-score]').forEach(i=>i.addEventListener('input',calcEval));calcEval();
    $('#tenderGates').innerHTML=T.gates.map(x=>`<article><span>${x[0]} · ${x[1]}</span><b>${safe(x[2])}</b><p><strong>Go:</strong> ${safe(x[3])}</p><small><strong>Contingencia:</strong> ${safe(x[4])}</small></article>`).join('');
    $('#tenderSolissEffort').innerHTML=T.solissEffort.map(x=>`<article><b>${safe(x[0])}</b><span>${safe(x[1])}</span><p>${safe(x[2])}</p></article>`).join('');
    $('#tenderDeliverables').innerHTML=`<thead><tr><th>Entregable</th><th>Tipo</th><th>Fase</th><th>Contenido mínimo</th><th>Aceptación</th></tr></thead><tbody>${T.deliverables.map(x=>`<tr><td><b>${safe(x[0])}</b></td><td>${x[1]}</td><td>${x[2]}</td><td>${safe(x[3])}</td><td>${safe(x[4])}</td></tr>`).join('')}</tbody>`;
    $('#tenderReadinessGrid').innerHTML=T.readiness.map(x=>`<article class="${x[1]}"><span>${x[1]==='ready'?'LISTO':x[1]==='warning'?'RECONCILIAR':'PENDIENTE'}</span><b>${safe(x[0])}</b><p>${safe(x[2])}</p></article>`).join('');
  }
  function renderCompliance(){const q=($('#tenderComplianceSearch')?.value||'').toLowerCase();const rows=T.ppt.filter(x=>(filter==='all'||x[4]===filter)&&(!q||x.join(' ').toLowerCase().includes(q)));$('#tenderComplianceGrid').innerHTML=rows.map(x=>`<article><header><b>${x[0]} · ${safe(x[1])}</b><span class="tender-status ${x[4]}">${x[4]==='cumple'?'CUMPLE':x[4]==='gate'?'GATE / POC':'CONDICIONADO'}</span></header><p>${safe(x[2])}</p><dl><dt>Aceptación</dt><dd>${safe(x[3])}</dd><dt>Dependencia</dt><dd>${safe(x[5])}</dd></dl></article>`).join('')||'<p class="empty-state">Sin prescripciones para este filtro.</p>'}
  function calcEval(){let v=0;$$('[data-eval-score]').forEach(i=>{const max=+i.max,n=Math.max(0,Math.min(max,+i.value||0));if(+i.value!==n)i.value=n;v+=n});$('#evaluationTotal').textContent=`${v.toLocaleString('es-ES',{maximumFractionDigits:1})} / 100`}
  $('#tenderComplianceSearch')?.addEventListener('input',renderCompliance);$$('[data-tender-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.tenderFilter;$$('[data-tender-filter]').forEach(x=>x.classList.toggle('active',x===b));renderCompliance()}));
  $('#downloadTenderTech')?.addEventListener('click',()=>download('V7_Condiciones_Tecnicas_P0.csv',csv([['ID','Condición','Requisito','Aceptación'],...T.technicalConditions.map(x=>[x.id,x.title,x.requirement,x.acceptance])])));
  $('#downloadTenderEconomic')?.addEventListener('click',()=>download('V7_Condiciones_Economicas_P0.csv',csv([['Condición','Regla','Estado'],...T.economics.commercial])));
  $('#downloadTenderReadiness')?.addEventListener('click',()=>download('V7_Tender_Readiness.csv',csv([['Elemento','Estado','Observación'],...T.readiness])));
  document.addEventListener('click',async e=>{const a=e.target.closest('[data-private-tender-doc]');if(!a||!window.V6Auth)return;e.preventDefault();try{const r=await V6Auth.fetchPrivate(a.getAttribute('href'));if(!r.ok)throw new Error(`HTTP ${r.status}`);const blob=await r.blob(),u=URL.createObjectURL(blob),d=document.createElement('a');d.href=u;d.download=a.getAttribute('href').split('/').pop();document.body.appendChild(d);d.click();d.remove();setTimeout(()=>URL.revokeObjectURL(u),1000)}catch(err){alert(`No se pudo descargar: ${err.message}`)}});
  const tenderSideLinks=$$('#tenderSidebar .side-nav a');
  function updateTenderSide(){if(document.body.dataset.access!=='tender')return;let current='#tender-summary',best=-Infinity;tenderSideLinks.forEach(a=>{const el=$(a.getAttribute('href'));if(!el)return;const top=el.getBoundingClientRect().top;if(top<=170&&top>best){best=top;current=a.getAttribute('href')}});tenderSideLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===current));}
  addEventListener('scroll',updateTenderSide,{passive:true});tenderSideLinks.forEach(a=>a.addEventListener('click',()=>setTimeout(updateTenderSide,250)));
  window.V7Tender={load,isLoaded:()=>!!T};
})();
