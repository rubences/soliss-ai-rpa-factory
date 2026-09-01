(() => {
  const D = window.SOLISS_DATA;
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const eur = v => new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:2}).format(v);
  const eur0 = v => new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(v);
  const compactEur = v => `${new Intl.NumberFormat("es-ES",{maximumFractionDigits:1}).format(v/1000)} k€`;

  function renderUseCases(){
    $("#useCases").innerHTML = D.useCases.map(u => `
      <article class="usecase">
        <b>${u.id}</b><h3>${u.name}</h3><p>${u.enable}</p>
      </article>`).join("");
  }

  function renderTobe(view="asis"){
    const labels = {asis:"Capacidad existente",transition:"Habilitador P0",tobe:"Resultado TO-BE"};
    $("#tobeExplorer").innerHTML = D.tobe[view].map(([title,text],i)=>`
      <article class="tobe-item">
        <span>${String(i+1).padStart(2,"0")} · ${labels[view]}</span>
        <h3>${title}</h3><p>${text}</p>
      </article>`).join("");
  }

  function renderDomains(){
    $("#domainClusters").innerHTML = D.domains.map(d=>`<div class="domain-card"><b>${d.name}</b><small>${d.sub}</small></div>`).join("");
  }

  function inspectArchitecture(key){
    const a=D.architecture[key] || D.architecture.group;
    $$(".arch-node,.data-lake").forEach(n=>n.classList.toggle("active",n.dataset.arch===key));
    $("#archInspector").innerHTML=`
      <span class="inspector-kicker">${a.layer}</span>
      <h3>${a.title}</h3>
      <p>${a.detail}</p>
      <div class="inspector-meta">
        <div><span>Responsabilidad</span><b>${a.owner}</b></div>
        <div><span>Decisión de cierre</span><b>${a.decision}</b></div>
      </div>`;
  }

  function renderTech(){
    $("#techDecisions").innerHTML=D.techDecisions.map(t=>`
      <article class="tech-card">
        <span>${t.tag}</span><h3>${t.title}</h3><p>${t.text}</p>
      </article>`).join("");
  }

  function renderJourney(){
    $("#journeySteps").innerHTML=D.journey.map(j=>`
      <article class="journey-card">
        <span class="n">${j.n}</span><h3>${j.title}</h3><span class="period">${j.period}</span>
        <strong class="amount">${j.amount}</strong><span class="type">${j.type}</span><p>${j.text}</p>
      </article>`).join("");
  }

  function renderScenarios(){
    $("#scenarioButtons").innerHTML=D.scenarios.map(s=>`<button data-scenario="${s.id}" class="${s.id==="recommended"?"active":""}">${s.label}</button>`).join("");
    updateTco("recommended");
  }

  let scenarioId="recommended";
  function updateTco(id=scenarioId){
    scenarioId=id;
    const s=D.scenarios.find(x=>x.id===id);
    const optional=$("#s2Toggle")?.checked ? D.baseline.optionalS2 : 0;
    const low=D.baseline.keedio24+s.low+optional;
    const high=D.baseline.keedio24+s.high+optional;
    const mid=D.baseline.keedio24+(s.low+s.high)/2+optional;
    $("#scenarioLabel").textContent=`${s.label} · ${s.description}`;
    $("#tcoRange").textContent=`${compactEur(low)} – ${compactEur(high)}`;
    $("#tcoMid").textContent=`Punto central orientativo: ${eur0(mid)}`;
    $$("#scenarioButtons button").forEach(b=>b.classList.toggle("active",b.dataset.scenario===id));
  }

  function renderInfraTable(){
    $("#infraTable").innerHTML=`
      <thead><tr><th>Bloque</th><th>Mínimo</th><th>Base</th><th>Escalable</th></tr></thead>
      <tbody>${D.infraBlocks.map(r=>`
        <tr><td><b>${r.name}</b><small>${r.detail}</small></td><td>${eur0(r.min)}</td><td>${eur0(r.base)}</td><td>${eur0(r.max)}</td></tr>`).join("")}</tbody>`;
  }

  function renderGates(){
    $("#gateRail").innerHTML=D.gates.map(g=>`
      <article class="gate-card">
        <span>${g.id} · ${g.when}</span><h3>${g.title}</h3><p>${g.criteria}</p>
        <div class="gate-meta"><b>${g.phase}</b><span>Go / No-Go</span></div>
      </article>`).join("");
  }

  function renderRoadmap(filter="all"){
    const rows=D.roadmap.filter(r=>filter==="all"||r.type===filter);
    $("#roadmapRows").innerHTML=rows.map(r=>{
      const left=((r.start-1)/36)*100;
      const width=((r.end-r.start+1)/36)*100;
      return `<div class="roadmap-row" data-type="${r.type}">
        <div class="roadmap-label"><b>${r.name}</b><small>${r.owner}</small></div>
        <div class="month-track"><span class="month-bar" style="left:${left}%;width:${width}%"></span></div>
        <div class="roadmap-dates">M${r.start}–M${r.end}</div>
      </div>`;
    }).join("");
  }

  function supportPanel(){
    return `<div class="support-grid">${D.support.map(s=>`
      <article class="support-card"><span class="support-level">${s.level}</span><h3>${s.title}</h3>
      <small>${s.owner}</small><p>${s.scope}</p><b>${s.result}</b></article>`).join("")}</div>`;
  }
  function changePanel(){
    return `<div class="change-grid">${D.change.map(c=>`
      <article class="change-card"><small>${c.dedication}</small><h3>${c.profile}</h3><p>${c.responsibility}</p></article>`).join("")}</div>`;
  }
  function raciPanel(){
    const headers=["Actividad","Soliss líder","Keedio PM/Arq","Negocio","IT Soliss","Seguridad"];
    return `<div class="table-scroll"><table class="raci-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>
      ${D.raci.map(r=>`<tr>${r.map((v,i)=>`<td>${i===0?v:`<span class="raci-badge">${v}</span>`}</td>`).join("")}</tr>`).join("")}
      </tbody></table></div>`;
  }
  function testingPanel(){
    return `<div class="test-grid">${D.tests.map(t=>`<article class="test-card"><small>${t.evidence}</small><h3>${t.type}</h3><p>${t.coverage}</p></article>`).join("")}</div>`;
  }
  function deliverablesPanel(){
    return `<div class="deliverable-grid">${D.deliverables.map(d=>`<article class="deliverable-card"><small>${d.type}</small><h3>${d.name}</h3><p>${d.content}</p></article>`).join("")}</div>`;
  }
  const opPanels={support:supportPanel,change:changePanel,raci:raciPanel,testing:testingPanel,deliverables:deliverablesPanel};
  function renderOperation(key="support"){
    $("#operationPanel").innerHTML=opPanels[key]();
    $$(".op-tab").forEach(b=>b.classList.toggle("active",b.dataset.op===key));
  }

  function renderRisks(filter="all"){
    const list=D.risks.filter(r=>filter==="all"||r.severity===filter);
    $("#riskGrid").innerHTML=list.map(r=>`
      <article class="risk-card" data-severity="${r.severity}">
        <div class="risk-top"><b>${r.id}</b><span class="severity">${r.severity}</span></div>
        <h3>${r.risk}</h3><p>${r.control}</p><div class="risk-owner">${r.owner}</div>
      </article>`).join("");
    $("#riskCount").textContent=`${list.length} riesgos mostrados`;
  }

  function charts(){
    if(!window.Chart) return;
    Chart.defaults.font.family='Inter,system-ui,-apple-system,"Segoe UI",sans-serif';
    Chart.defaults.color=getComputedStyle(document.documentElement).getPropertyValue("--muted").trim() || "#647483";
    Chart.defaults.borderColor=getComputedStyle(document.documentElement).getPropertyValue("--line").trim() || "#dce6eb";

    const phaseRows=[...D.phases,{id:"Ajuste",name:"Ajuste comercial de consolidación",period:"—",hours:0,rate:0,cost:D.adjustment}];
    new Chart($("#phaseChart"),{
      type:"bar",
      data:{
        labels:phaseRows.map(p=>p.id),
        datasets:[
          {label:"Horas",data:phaseRows.map(p=>p.hours),backgroundColor:"#145bcc",yAxisID:"y"},
          {label:"Importe (€)",data:phaseRows.map(p=>p.cost),backgroundColor:phaseRows.map(p=>p.cost<0?"#d80b60":"#0ca596"),yAxisID:"y1"}
        ]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"bottom",labels:{usePointStyle:true,boxWidth:9,font:{size:10}}},tooltip:{callbacks:{afterLabel:c=>{const p=phaseRows[c.dataIndex];return p.id==="Ajuste"?`${p.name}: ${eur(p.cost)}`:`${p.name}\n${p.period} · ${eur(p.rate)}/h`;}}}},scales:{y:{position:"left",title:{display:true,text:"Horas"}},y1:{position:"right",grid:{drawOnChartArea:false},ticks:{callback:v=>`${v/1000}k€`},title:{display:true,text:"Importe"}}}}
    });

    new Chart($("#infraChart"),{
      type:"bar",
      data:{
        labels:D.scenarios.map(s=>s.label),
        datasets:[
          {label:"Desde",data:D.scenarios.map(s=>s.low),backgroundColor:"#1197b8"},
          {label:"Hasta",data:D.scenarios.map(s=>s.high),backgroundColor:"#6034a5"}
        ]
      },
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"bottom",labels:{usePointStyle:true,boxWidth:9,font:{size:10}}}},scales:{y:{ticks:{callback:v=>`${v/1000}k€`}}}}
    });
  }

  function counters(){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target; const target=Number(el.dataset.counter); let start=null;
      const step=t=>{if(!start)start=t;const p=Math.min((t-start)/900,1);const value=target*(1-Math.pow(1-p,3));el.textContent=el.dataset.format==="eur"?eur(value):Math.round(value).toLocaleString("es-ES");if(p<1)requestAnimationFrame(step)};
      requestAnimationFrame(step);io.unobserve(el);
    }),{threshold:.4});
    $$("[data-counter]").forEach(el=>io.observe(el));
  }

  function reveal(){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.08});
    $$(".reveal").forEach(el=>io.observe(el));
  }

  function navSpy(){
    const links=$$("#primaryNav a");
    const sections=links.map(a=>$(a.getAttribute("href"))).filter(Boolean);
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){
        links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id));
      }
    }),{rootMargin:"-25% 0px -65% 0px",threshold:0});
    sections.forEach(s=>io.observe(s));
  }

  function theme(){
    const saved=localStorage.getItem("soliss-theme");
    if(saved)document.documentElement.dataset.theme=saved;
    $("#themeToggle").addEventListener("click",()=>{
      const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
      document.documentElement.dataset.theme=next;localStorage.setItem("soliss-theme",next);
    });
  }

  function lightbox(){
    const dialog=$("#lightbox"), img=$("#lightboxImage");
    $$("[data-lightbox]").forEach(b=>b.addEventListener("click",()=>{img.src=b.dataset.lightbox;dialog.showModal()}));
    $("#lightboxClose").addEventListener("click",()=>dialog.close());
    dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
  }

  function interactions(){
    $$(".tab-button").forEach(b=>b.addEventListener("click",()=>{$$(".tab-button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderTobe(b.dataset.view)}));
    $$(".arch-node,.data-lake").forEach(b=>b.addEventListener("click",()=>inspectArchitecture(b.dataset.arch)));
    $("#scenarioButtons").addEventListener("click",e=>{const b=e.target.closest("[data-scenario]");if(b)updateTco(b.dataset.scenario)});
    $("#s2Toggle").addEventListener("change",()=>updateTco());
    $$(".roadmap-filter").forEach(b=>b.addEventListener("click",()=>{$$(".roadmap-filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderRoadmap(b.dataset.roadmap)}));
    $$(".op-tab").forEach(b=>b.addEventListener("click",()=>renderOperation(b.dataset.op)));
    $$(".risk-filter").forEach(b=>b.addEventListener("click",()=>{$$(".risk-filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderRisks(b.dataset.risk)}));
    $("#menuToggle").addEventListener("click",()=>{const nav=$("#primaryNav");const open=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open))});
    $$("#primaryNav a").forEach(a=>a.addEventListener("click",()=>$("#primaryNav").classList.remove("open")));
    addEventListener("scroll",()=>{
      const p=(scrollY/(document.documentElement.scrollHeight-innerHeight))*100;$("#scrollProgress").style.width=`${Math.max(0,Math.min(100,p))}%`;
    },{passive:true});
  }

  renderUseCases();renderTobe();renderDomains();inspectArchitecture("group");renderTech();renderJourney();renderScenarios();renderInfraTable();renderGates();renderRoadmap();renderOperation();renderRisks();
  charts();counters();reveal();navSpy();theme();lightbox();interactions();
})();