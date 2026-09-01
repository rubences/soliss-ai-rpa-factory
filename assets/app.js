
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  menuButton?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }));

  if (!window.Chart) return;
  Chart.defaults.font.family = 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
  Chart.defaults.color = "#667085";
  Chart.defaults.borderColor = "#e6ebf2";

  const money = v => new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(v);
  const common = {
    responsive:true, maintainAspectRatio:false,
    plugins:{legend:{position:"bottom",labels:{boxWidth:11,usePointStyle:true,padding:16,font:{size:10}}}}
  };

  new Chart(document.getElementById("tcoChart"),{
    type:"doughnut",
    data:{
      labels:["Construcción F0–F4","Soporte S1","Hardware Soliss"],
      datasets:[{data:[105786.2,77000,230000],backgroundColor:["#2563eb","#06b6d4","#0f172a"],borderColor:"#fff",borderWidth:3}]
    },
    options:{...common,cutout:"66%",plugins:{...common.plugins,tooltip:{callbacks:{label:c=>`${c.label}: ${money(c.raw)}`}}}}
  });

  new Chart(document.getElementById("phaseChart"),{
    type:"bar",
    data:{
      labels:["F0","F1","F2","F3","F4","S1","S2"],
      datasets:[
        {label:"Importe (€)",data:[20000,25500,21900,25886.2,12500,77000,42000],backgroundColor:"#2563eb",yAxisID:"y"},
        {label:"Horas",data:[223,285,240,279,145,880,480],backgroundColor:"#10b981",yAxisID:"y1"}
      ]
    },
    options:{...common,scales:{
      y:{position:"left",ticks:{callback:v=>`${v/1000}k€`}},
      y1:{position:"right",grid:{drawOnChartArea:false},ticks:{callback:v=>`${v} h`}}
    }}
  });

  new Chart(document.getElementById("ucMatrixChart"),{
    type:"bubble",
    data:{datasets:[
      {label:"UC1 Conversacionales",data:[{x:7,y:4,r:10}],backgroundColor:"#2563eb"},
      {label:"UC2 Doc Intelligence",data:[{x:9,y:3,r:12}],backgroundColor:"#06b6d4"},
      {label:"UC3 Fraude",data:[{x:9,y:8,r:15}],backgroundColor:"#ef4444"},
      {label:"UC4 Actuarial",data:[{x:8,y:7,r:14}],backgroundColor:"#f59e0b"},
      {label:"UC5 Administración",data:[{x:8,y:3,r:11}],backgroundColor:"#10b981"},
      {label:"UC6 IT Local",data:[{x:6,y:4,r:9}],backgroundColor:"#6366f1"},
      {label:"UC7 Grupo",data:[{x:5,y:6,r:13}],backgroundColor:"#8b5cf6"}
    ]},
    options:{...common,scales:{
      x:{min:3,max:10,title:{display:true,text:"Valor e impacto (1–10)"}},
      y:{min:1,max:10,title:{display:true,text:"Fricción operativa / adopción (1–10)"}}
    }}
  });

  new Chart(document.getElementById("coverageChart"),{
    type:"radar",
    data:{
      labels:["Siniestros","Actuarial","Financiero / compras","IT / infra","Atención / asistentes","Filiales"],
      datasets:[{label:"Cobertura P0 habilitada (%)",data:[90,85,95,80,90,75],backgroundColor:"rgba(37,99,235,.16)",borderColor:"#2563eb",pointBackgroundColor:"#2563eb"}]
    },
    options:{...common,scales:{r:{suggestedMin:0,suggestedMax:100,ticks:{stepSize:20}}}}
  });

  new Chart(document.getElementById("governanceChart"),{
    type:"doughnut",
    data:{
      labels:["DORA: trazabilidad / logs","AI Act: auditabilidad","Aislamiento multi-tenant","RBAC / Keycloak"],
      datasets:[{data:[35,30,20,15],backgroundColor:["#2563eb","#06b6d4","#10b981","#f59e0b"],borderColor:"#fff",borderWidth:3}]
    },
    options:{...common,cutout:"64%"}
  });

  new Chart(document.getElementById("riskChart"),{
    type:"bar",
    data:{
      labels:["Financiero / TCO","Logística hardware","DORA","Estabilidad Gravitino","VRAM GPU","AI Act","Adopción"],
      datasets:[{label:"Severidad (1–5)",data:[4.5,4.0,4.2,4.8,3.8,4.3,3.5],backgroundColor:["#ef4444","#f59e0b","#ef4444","#dc2626","#f59e0b","#ef4444","#3b82f6"]}]
    },
    options:{...common,indexAxis:"y",plugins:{...common.plugins,legend:{display:false}},scales:{x:{min:0,max:5}}}
  });

  new Chart(document.getElementById("roiChart"),{
    type:"line",
    data:{
      labels:["M1","M3","M6","M12","M18","M24"],
      datasets:[
        {label:"Desembolso acumulado",data:[25000,150000,335000,375000,412786,412786],borderColor:"#f59e0b",backgroundColor:"rgba(245,158,11,.07)",fill:true,tension:.3},
        {label:"Valor / ahorro acumulado",data:[0,0,35000,160000,420000,780000],borderColor:"#10b981",backgroundColor:"rgba(16,185,129,.08)",fill:true,tension:.3}
      ]
    },
    options:{...common,scales:{y:{ticks:{callback:v=>`${Math.round(v/1000)}k€`}}}}
  });

  new Chart(document.getElementById("savingsChart"),{
    type:"bar",
    data:{
      labels:["Siniestros","Administración financiera","Suscripción / actuarial","IT / soporte","Atención al cliente"],
      datasets:[{label:"Ahorro anual proyectado",data:[65000,45000,38000,22000,18000],backgroundColor:["#10b981","#2563eb","#06b6d4","#f59e0b","#6366f1"]}]
    },
    options:{...common,indexAxis:"y",plugins:{...common.plugins,legend:{display:false}},scales:{x:{ticks:{callback:v=>`${v/1000}k€`}}}}
  });
});
