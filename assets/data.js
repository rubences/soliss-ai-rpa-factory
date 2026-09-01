window.P0 = {
  meta: {
    title: "Soliss AI/RPA Factory · P0 Decision Room",
    proponent: "Keedio",
    client: "Soliss / Grupo Soliss",
    horizon: "24 meses base + 12 meses opcionales",
    baseline: "Final Cerrado",
    statement: "Keedio propone, diseña e integra P0; Soliss decide, adquiere la infraestructura, valida los gates y opera con transferencia progresiva."
  },
  economics: {"build":0,"service":0,"base24":0,"optional":0,"adjustment":0,"phases":[{"id":"F0","name":"Activación P0 y cierre de alcance","period":"M1","hours":0,"rate":0,"cost":0,"owner":"Keedio + Soliss","outcome":"Discovery, gobierno inicial, alcance, backlog UC y plan director definitivo."},{"id":"F1","name":"Blueprint on-premise y sizing","period":"M1–M2","hours":0,"rate":0,"cost":0,"owner":"Keedio diseña · Soliss valida","outcome":"Rancher/RKE2, clústeres, red, almacenamiento, backup, seguridad y sizing."},{"id":"F2","name":"Gobierno, DORA, Data Mesh e identidad","period":"M2","hours":0,"rate":0,"cost":0,"owner":"Keedio + Soliss","outcome":"Dominios, Keycloak, RBAC/ABAC, metadatos, evidencias y controles."},{"id":"F3","name":"Sandbox, Model Gateway, RAG y Gravitino PoC","period":"M2–M3","hours":0,"rate":0,"cost":0,"owner":"Keedio","outcome":"Validación no bloqueante, local-first, trazabilidad, fuentes y control de acceso."},{"id":"F4","name":"Pruebas, UAT, documentación y transferencia","period":"M3","hours":0,"rate":0,"cost":0,"owner":"Keedio entrega · Soliss acepta","outcome":"Pruebas, manuales, runbooks, formación y aceptación ejecutiva."}],"scenarios":[{"id":"minimum","label":"Mínimo","low":0,"high":0,"note":"Infraestructura básica ajustada a requisitos iniciales."},{"id":"recommended","label":"Recomendado","low":0,"high":0,"note":"Configuración robusta e industrializada para crecimiento."},{"id":"ha","label":"Alta disponibilidad","low":0,"high":0,"note":"Redundancia y capacidad superior para criticidad/madurez."}],"infraBlocks":[["Clúster gestión Rancher/RKE2","3 nodos control plane, quórum etcd, HA, TLS/CA interna",0,0,0],["Clúster de grupo","Keycloak, Gravitino PoC, PostgreSQL/CloudNativePG y gobierno",0,0,0],["Clúster empresa piloto","Plano de datos, conectores, pipelines y aislamiento por dominio",0,0,0],["GPU / IA local","LLM local-first, embeddings, OCR/visión y Model Gateway",0,0,0],["Almacenamiento / backup","MinIO/Ceph, snapshots, restore y retención",0,0,0],["Red / seguridad / observabilidad","VPN, segmentación, logging, monitorización y hardening",0,0,0],["Soporte / licencias opcionales","Rancher Prime, fabricante, garantía extendida",0,0,0]]},
  benchmark: {
    eiopa: [
      {value:65, suffix:"%", label:"Aseguradoras que ya usan GenAI", detail:"Adopción activa declarada."},
      {value:64, suffix:"%", label:"Casos aún en PoC/experimentación", detail:"La industrialización sigue siendo el cuello de botella."},
      {value:32, suffix:"%", label:"Casos que han llegado a producción", detail:"El salto PoC → producción es la oportunidad de P0."},
      {value:64, suffix:"%", label:"Casos orientados a back-office", detail:"Encaje directo con Document Intelligence, administración, IT y soporte."},
      {value:49, suffix:"%", label:"Entidades con política específica de IA", detail:"Gobierno y riesgo ya forman parte de la agenda aseguradora."},
      {value:30, suffix:"%", label:"Consumidores que confiarían en recomendaciones de agentes IA", detail:"59% expresan reservas: la supervisión humana sigue siendo clave."}
    ],
    soliss: [
      {value:"1933", label:"Origen en Toledo", detail:"Mutua con una trayectoria histórica profundamente vinculada al territorio."},
      {value:"90", label:"Oficinas", detail:"Implantación territorial comunicada públicamente por Soliss."},
      {value:"HITL", label:"Principio de experiencia", detail:"Propuesta Keedio: IA que amplifica la cercanía y el juicio humano, no que los sustituye."}
    ]
  },
  decisions: [],
  useCases: [
    {id:"UC1", name:"Agentes conversacionales corporativos", enabled:"Arquitectura, permisos, RAG gobernado y criterios de arranque.", later:"Agentes finales por área y despliegue masivo.", regulation:"Evaluar por rol, datos y uso; mantener supervisión humana en contextos sensibles.", hypothesis:{value:8,data:7,risk:5,effort:6,ttv:8}},
    {id:"UC2", name:"Document Intelligence e imagen", enabled:"Patrón de ingesta, OCR/visión, metadatos y validación.", later:"Automatización productiva por tipología documental.", regulation:"Privacidad, minimización, provenance y permisos sobre documentos.", hypothesis:{value:9,data:8,risk:4,effort:5,ttv:9}},
    {id:"UC3", name:"Producción, siniestros y fraude", enabled:"Seguridad, datos, explicabilidad y scoring asistido.", later:"Motor/scoring productivo y reglas finales por ramo.", regulation:"Claims/fraud requieren análisis del uso concreto; HITL y trazabilidad son controles clave.", hypothesis:{value:9,data:6,risk:8,effort:8,ttv:6}},
    {id:"UC4", name:"Analítica, actuarial y gestión", enabled:"Data Mesh, catálogo, acceso y base analítica.", later:"Modelos actuariales productivos, tarificación y cuadros finales.", regulation:"Si evalúa riesgo/precio de personas en vida/salud puede entrar en Annex III 5(c) del AI Act.", hypothesis:{value:8,data:7,risk:8,effort:8,ttv:6}},
    {id:"UC5", name:"Administración, contabilidad e inversiones", enabled:"Integración y gobierno documental/contable.", later:"Flujos ERP, compras, facturas e inversiones completos.", regulation:"Control de excepciones, autorizaciones y auditabilidad de automatizaciones.", hypothesis:{value:8,data:8,risk:5,effort:6,ttv:8}},
    {id:"UC6", name:"IT, ciberseguridad y soporte técnico", enabled:"Observabilidad, logs, soporte y patrón de agente IT.", later:"Agente/SOC definitivo y automatizaciones productivas.", regulation:"Principio de mínimo privilegio, approvals y límites de agencia.", hypothesis:{value:7,data:8,risk:5,effort:5,ttv:8}},
    {id:"UC7", name:"Extensión Grupo Soliss", enabled:"Multitenancy, identidad y separación por empresa.", later:"Despliegue funcional por entidad bajo Go/No-Go.", regulation:"Segregación de datos, responsabilidades y onboarding por entidad.", hypothesis:{value:6,data:5,risk:5,effort:8,ttv:5}}
  ],
  architecture: {
    nodes: [
      {id:"users", label:"Usuarios / canales", layer:"Acceso", owner:"Soliss", detail:"Empleados, agentes, IT, Dirección y RRHH acceden según rol y dominio.", security:"Prompt injection, identidad del usuario y autorización de acciones.", data:"El contexto debe limitarse a los datos autorizados para rol/empresa.", dora:"Trazabilidad de uso y continuidad del canal.", aiAct:"Transparencia y supervisión humana según el caso de uso."},
      {id:"identity", label:"Identidad", layer:"Gobierno", owner:"Soliss + Keedio", detail:"Keycloak, OIDC y potencial integración LDAP/AD con RBAC/ABAC.", security:"Autenticación, segregación, mínimo privilegio y control de acceso.", data:"Permisos basados en dominio, sensibilidad y ownership.", dora:"Control de acceso y evidencias de cambios.", aiAct:"Responsabilidad y atribución de cada interacción."},
      {id:"gateway", label:"Model Gateway", layer:"IA", owner:"Keedio diseña · Soliss opera", detail:"Modelos, cuotas, coste, latencia, logs, caché, fallback y políticas.", security:"Control frente a Shadow AI, consumo no acotado y herramientas no autorizadas.", data:"Decide qué modelos pueden tratar qué clases de datos.", dora:"Logging, observabilidad, resiliencia y proveedores/modelos autorizados.", aiAct:"Registro de uso, modelo, prompt/respuesta y supervisión."},
      {id:"governance", label:"Gobierno", layer:"GRC", owner:"Soliss Compliance + Keedio", detail:"DORA, AI Act, auditoría, evidencias, clasificación de casos y HITL.", security:"Políticas, risk acceptance y evidencia de controles.", data:"Sensibilidad, ownership, retención y calidad.", dora:"ICT risk, terceros, resiliencia, pruebas y exit plan.", aiAct:"Clasificación previa de usos sensibles y controles aplicables."},
      {id:"management", label:"Clúster gestión", layer:"Kubernetes", owner:"Soliss infra · Keedio integración", detail:"RKE2 dedicado + Rancher para ciclo de vida y gestión de flota.", security:"Hardening, RBAC, secretos, políticas y plano de control aislado.", data:"No debe mezclar planos de datos de los dominios.", dora:"HA, cambios controlados y recuperación del control plane.", aiAct:"Infraestructura habilitadora, no determina por sí sola clasificación."},
      {id:"group", label:"Clúster de grupo", layer:"Servicios transversales", owner:"Soliss infra · Keedio arquitectura", detail:"Keycloak, CloudNativePG, Gravitino PoC, catálogo, metadatos y servicios comunes.", security:"Segregación, secrets y resistencia a fallo transversal.", data:"Catálogo, metadata, lineage y reglas de acceso.", dora:"HA, backup, restore y monitorización obligatorios para producción.", aiAct:"Soporta trazabilidad y gobernanza de evidencias."},
      {id:"ai", label:"Servicios IA/RPA", layer:"Aplicación", owner:"Keedio + Soliss", detail:"RAG, Document Intelligence, n8n, APIs, conectores y orquestación.", security:"Output handling, tool permissions, prompt injection y approvals.", data:"Grounding con fuentes autorizadas y trazables.", dora:"Continuidad y observabilidad del servicio.", aiAct:"Control del grado de autonomía y human-in-the-loop."},
      {id:"observability", label:"Observabilidad", layer:"Operación", owner:"Keedio + Soliss", detail:"Métricas, logs, coste, auditoría, paneles y evidencias.", security:"Detección, forense y alertas sobre comportamiento anómalo.", data:"Audita accesos, fuentes, respuestas y costes.", dora:"Evidencia para resiliencia, incidentes y testing.", aiAct:"Outcomes monitoring y trazabilidad de inferencia."},
      {id:"domainA", label:"RKE2 Empresa A", layer:"Dominio", owner:"Soliss", detail:"Datos, conectores y pipelines del dominio/empresa A.", security:"Aislamiento y política de red/identidad del dominio.", data:"Ownership y calidad propios.", dora:"Continuidad y recovery del dominio.", aiAct:"Clasificación depende del caso que se despliegue."},
      {id:"domainB", label:"RKE2 Empresa B", layer:"Dominio", owner:"Soliss", detail:"Datos, conectores y pipelines del dominio/empresa B.", security:"Aislamiento y política de red/identidad del dominio.", data:"Ownership y calidad propios.", dora:"Continuidad y recovery del dominio.", aiAct:"Clasificación depende del caso que se despliegue."},
      {id:"domainC", label:"RKE2 Empresa C", layer:"Dominio", owner:"Soliss", detail:"Datos, conectores y pipelines del dominio/empresa C.", security:"Aislamiento y política de red/identidad del dominio.", data:"Ownership y calidad propios.", dora:"Continuidad y recovery del dominio.", aiAct:"Clasificación depende del caso que se despliegue."},
      {id:"data", label:"Data Mesh + lago", layer:"Datos", owner:"Soliss Data Owners + IT", detail:"Separación por empresa, ownership, sensibilidad, trazabilidad y acceso controlado.", security:"Exfiltración, poisoning y exposición entre dominios.", data:"Source of truth, provenance, catálogo y retención.", dora:"Backup, recuperación y criticidad de datos.", aiAct:"Calidad, trazabilidad y documentación de fuentes."},
      {id:"infra", label:"Infraestructura Soliss", layer:"CPD", owner:"Soliss", detail:"Servidores, red, GPU, almacenamiento, backup y soporte adquiridos directamente por Soliss.", security:"Segmentación, hardening, cifrado, red y supply chain.", data:"Ubicación y resiliencia de datos/modelos.", dora:"HA, backup, DR, capacidad y soporte.", aiAct:"Base técnica; requisitos AI Act recaen en sistemas/casos concretos."}
    ],
    scenarios: [
      {id:"normal", label:"Operación normal", status:{}, message:"Flujo nominal. Todos los componentes operan dentro del patrón objetivo.", outcome:"Operación nominal", gate:"G4 valida con UAT, resiliencia y transferencia."},
      {id:"gravitino", label:"Gravitino no supera PoC", status:{group:"degraded",data:"degraded"}, message:"Gravitino queda fuera de la ruta crítica. Se activa el fallback de catálogo/metastore desacoplado.", outcome:"P0 continúa con fallback", gate:"Go/No-Go documentado en G3."},
      {id:"gpu", label:"Retraso de GPU", status:{infra:"degraded",ai:"degraded"}, message:"El hardware definitivo se retrasa. El sandbox de G3 puede continuar en entorno provisional; producción queda bloqueada hasta aceptación de infraestructura/HA/backup/DR.", outcome:"G3 puede seguir · producción no", gate:"Sizing y compras se activan en F0/F1; validación en G2."},
      {id:"node", label:"Fallo de nodo", status:{management:"degraded",group:"degraded"}, message:"La arquitectura debe degradar sin perder control ni evidencias. El comportamiento real se demuestra en pruebas de resiliencia, no se presume.", outcome:"Resultado pendiente de prueba", gate:"Evidencia de HA/restore en G4."},
      {id:"shadow", label:"Intento de Shadow AI", status:{users:"attack",gateway:"blocked"}, message:"Un usuario intenta saltar el Model Gateway hacia un modelo no autorizado. El patrón objetivo lo bloquea y registra el intento.", outcome:"BLOCK conceptual", gate:"Políticas y logging se validan en G3/G4."},
      {id:"cross", label:"Acceso entre dominios", status:{domainA:"attack",domainB:"blocked",identity:"blocked",data:"blocked"}, message:"Una identidad del dominio A intenta acceder a información del dominio B. RBAC/ABAC, segregación y Data Mesh deben denegar y auditar.", outcome:"DENY conceptual", gate:"Pruebas de seguridad e integración en F4."}
    ]
  },
  gates: [],
  evidence: [],
  passports: [
    {id:"llm", title:"LLM local principal", purpose:"Generación / razonamiento general", status:"A seleccionar y validar en F3", fields:{Proveedor:"Por seleccionar",Versión:"Por seleccionar",Licencia:"Por validar",Hosting:"On-premise / local-first",Datos:"Según clasificación y policy",Owner:"Soliss opera · Keedio diseña",Benchmark:"Pendiente G3",Seguridad:"Prompt injection / leakage / tools",Fallback:"Modelo alternativo aprobado"}},
    {id:"emb", title:"Modelo de embeddings", purpose:"Indexación y recuperación RAG", status:"A seleccionar y validar en F3", fields:{Proveedor:"Por seleccionar",Versión:"Por seleccionar",Licencia:"Por validar",Hosting:"Preferente local",Datos:"Documentos autorizados",Owner:"Soliss + Keedio",Benchmark:"Recall / latencia / coste",Seguridad:"Vector poisoning / access control",Fallback:"Índice compatible alternativo"}},
    {id:"ocr", title:"OCR / visión", purpose:"Document Intelligence", status:"A seleccionar por UC2", fields:{Proveedor:"Por seleccionar",Versión:"Por seleccionar",Licencia:"Por validar",Hosting:"Local-first según sensibilidad",Datos:"Imágenes/documentos autorizados",Owner:"Soliss + Keedio",Benchmark:"Exactitud por tipología",Seguridad:"PII / malware / ingestión",Fallback:"Pipeline OCR alternativo"}}
  ],
  risks: [],
  sources: [
    {title:"EIOPA · Generative AI Market Survey", note:"347 entidades · 25 países · publicado 2 feb 2026", url:"https://www.eiopa.europa.eu/publications/generative-ai-market-survey-outlook-use-cases-and-risk-management_en"},
    {title:"EIOPA · Supervisory priorities 2026", note:"DORA como Focus Area 2026", url:"https://www.eiopa.europa.eu/publications/union-wide-strategic-supervisory-priorities-focus-areas-2026_en"},
    {title:"EU AI Act Service Desk · Annex III", note:"Vida/salud: risk assessment & pricing de personas en 5(c)", url:"https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3"},
    {title:"EUR-Lex · DORA 2022/2554", note:"Resiliencia digital, backup/restoration y terceros TIC", url:"https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2022.333.01.0001.01.ENG"},
    {title:"Soliss · Historia", note:"Toledo 1933 y red actual de 90 oficinas", url:"https://www.soliss.es/historia/"}
  ]
};


// V4 research layer — public-source enrichment, current at 2026-09-01.
window.P0.research = {
  asOf:"2 septiembre 2026",
  brand:{
    primary:"#FF006A",
    note:"Magenta dominante muestreado del logotipo SOLISS incluido en la presentación suministrada."
  },
  solissDNA:[
    {value:"1933",label:"Fundada en Toledo",detail:"Historia y arraigo territorial como parte central de la identidad Soliss."},
    {value:"90",label:"Oficinas",detail:"Red comunicada actualmente por Soliss en Castilla-La Mancha y localidades próximas."},
    {value:">95%",label:"Clientes satisfechos",detail:"Indicador comunicado por Soliss en su web corporativa; no es una medición de Keedio."},
    {value:"100%",label:"Riqueza generada en su región",detail:"Compromiso territorial comunicado públicamente por Soliss."}
  ],
  supervisoryRadar:[
    {tag:"DORA · 2026",title:"El Consejo entra en el radar supervisor",detail:"EIOPA pide foco en implicación del órgano de administración, framework ICT, incidentes, terceros y programa de pruebas de resiliencia.",source:"EIOPA Supervisory Priorities 2026"},
    {tag:"CLAIMS · 2026",title:"Digitalizar sin degradar el trato al cliente",detail:"Claims management, incluida su digitalización, es Area for Attention 2026. Solo 62% de consumidores UE declara satisfacción con la gestión de siniestros.",source:"EIOPA Focus Areas 2026"},
    {tag:"AI ACT · AHORA",title:"Transparencia ya aplicable",detail:"Desde agosto de 2026 aplican las obligaciones de transparencia de Art. 50 para ciertos sistemas: un chatbot debe informar de que el usuario interactúa con IA.",source:"Comisión Europea · Art. 50"},
    {tag:"EIOPA AI",title:"Seis pilares de assurance asegurador",detail:"Data governance, record-keeping, fairness, cyber security, explainability y human oversight estructuran las expectativas supervisoras sectoriales.",source:"EIOPA Opinion · 6 Aug 2025"}
  ],
  aiTimeline:[
    {date:"02 FEB 2025",title:"AI literacy + prohibiciones",detail:"Art. 4 entra en aplicación; Soliss/Keedio deben sostener medidas de alfabetización para quienes usen u operen IA."},
    {date:"02 AUG 2025",title:"Gobierno + GPAI",detail:"Empiezan a aplicar reglas de gobierno y obligaciones para modelos de propósito general."},
    {date:"02 AUG 2026",title:"Enforcement + transparencia",detail:"Autoridades empiezan a hacer cumplir el AI Act; Art. 50 exige transparencia en ciertos sistemas interactivos y contenido sintético."},
    {date:"02 DEC 2027",title:"Annex III high-risk",detail:"Calendario vigente tras simplificación: aplicación de reglas para casos high-risk de Annex III."},
    {date:"02 AUG 2028",title:"Annex I",detail:"Aplicación extendida para high-risk embebido en productos regulados del Annex I."}
  ],
  assurancePillars:[
    {id:"data",title:"Data governance",question:"¿Qué datos puede usar el sistema y quién es su owner?",p0:"Data Mesh, sensibilidad, RBAC/ABAC, provenance y catálogo."},
    {id:"records",title:"Record-keeping",question:"¿Podemos reconstruir qué ocurrió?",p0:"Model Gateway, logs, Evidence Registry, versiones y retención."},
    {id:"fairness",title:"Fairness",question:"¿Puede la automatización generar un resultado injusto?",p0:"HITL, validación por caso, métricas y revisión de consumer outcomes."},
    {id:"cyber",title:"Cyber security",question:"¿Qué ocurre ante prompt injection, poisoning o excessive agency?",p0:"Gateway, least privilege, sandbox, segregación y pruebas adversariales."},
    {id:"explain",title:"Explainability",question:"¿Puede el profesional justificar una recomendación?",p0:"RAG trazable, fuentes, Model Passport y evidence trail."},
    {id:"human",title:"Human oversight",question:"¿Quién conserva la capacidad efectiva de intervenir?",p0:"Profesional Soliss, approvals, escalado y límites de autonomía."}
  ],
  doraBoard:[
    {title:"Board engagement",detail:"Decisiones, risk appetite y supervisión del ICT risk management framework."},
    {title:"ICT framework",detail:"Adecuación de resiliencia digital a estrategia y criticidad de negocio."},
    {title:"Major incidents",detail:"Proceso de detección, escalado, reporting y aprendizaje."},
    {title:"Third parties",detail:"Registro de terceros, dependencias, contratos, salida y concentración."},
    {title:"Resilience testing",detail:"Programa demostrable de backup/restore, HA, fallo de nodo y DR."}
  ],
  assuranceStack:[
    {name:"DORA",role:"Resiliencia ICT",status:"Regulatorio",detail:"Continuidad, terceros, pruebas, incidentes y gobierno."},
    {name:"EU AI Act",role:"Riesgo y transparencia",status:"Regulatorio",detail:"Clasificación, transparencia, literacy y obligaciones según uso."},
    {name:"EIOPA AI Opinion",role:"Sector asegurador",status:"Supervisión",detail:"Data, registros, fairness, cyber, explainability y oversight."},
    {name:"ISO/IEC 42001",role:"Sistema de gestión",status:"Alineamiento",detail:"PDCA para gobernar riesgos y oportunidades de IA. P0 puede preparar evidencias; no se afirma certificación."},
    {name:"OWASP GenAI / Agentic",role:"AppSec IA",status:"Referencia técnica",detail:"Prompt injection, información sensible, poisoning, agency, vectores y consumo."},
    {name:"NIST AI RMF GenAI",role:"Risk engineering",status:"Referencia voluntaria",detail:"Perfil GenAI del AI RMF para diseño, evaluación y gestión del riesgo."}
  ],
  isoPDCA:[
    {stage:"PLAN",title:"Contexto, política y riesgo",detail:"Inventario, ownership, clasificación de casos, objetivos, risk appetite y controles."},
    {stage:"DO",title:"Construir y operar",detail:"P0, Model Gateway, datos, seguridad, documentación, literacy y change management."},
    {stage:"CHECK",title:"Medir y auditar",detail:"Gates, pruebas, KPI, evidencias, incidentes, drift, consumer outcomes y auditoría."},
    {stage:"ACT",title:"Corregir y mejorar",detail:"Fallback, remediación, revisión de modelos, backlog UC y mejora continua S1/S2."}
  ],
  literacy:[
    {id:"board",role:"Consejo / Sponsor",topics:["Responsabilidad y decisiones","Riesgo IA y DORA","Límites de automatización","Escalado e incidentes"]},
    {id:"business",role:"Negocio / Key Users",topics:["Capacidades y límites","HITL y escalado","Uso seguro de prompts","Comprobación de fuentes"]},
    {id:"it",role:"IT / Data / Sec",topics:["Gateway y modelos","Clasificación de datos","Prompt/RAG security","Observabilidad y resiliencia"]},
    {id:"compliance",role:"Legal / Compliance",topics:["AI Act por caso","DORA / terceros","Record keeping","Fairness / explainability"]}
  ],
  agenticGate:[
    {rule:"Least privilege",detail:"El agente solo recibe las herramientas y permisos mínimos del caso."},
    {rule:"Human approval",detail:"Acciones de impacto financiero, contractual o sensible requieren aprobación explícita salvo autorización formal posterior."},
    {rule:"Tool allowlist",detail:"Nada de herramientas dinámicas o destinos no registrados en el control plane."},
    {rule:"Dry-run + rollback",detail:"Cuando sea viable, simular antes de ejecutar y conservar una vía de reversión."},
    {rule:"Bounded loops",detail:"Límites de iteraciones, tiempo, consumo, coste y llamadas para evitar runaway agents."},
    {rule:"Evidence trail",detail:"Cada acción debe poder atribuirse a usuario, agente, modelo, herramienta, policy y resultado."}
  ],
  sovereignty:[
    {workload:"LLM inference",default:"On-premise / local-first",external:"Solo fallback/modelo externo aprobado",control:"Model Gateway + policy + logging"},
    {workload:"Embeddings",default:"Local preferente",external:"Solo si sensibilidad y contrato lo permiten",control:"Data policy + Model Passport"},
    {workload:"OCR / visión",default:"Local-first según documento",external:"Excepción aprobada",control:"Clasificación + minimización"},
    {workload:"Datos / RAG",default:"Lago y dominios Soliss",external:"No por defecto",control:"RBAC/ABAC + provenance"},
    {workload:"Metadatos",default:"Clúster de grupo",external:"No requerido",control:"Catálogo + backup/fallback"},
    {workload:"APIs externas",default:"Deny by default",external:"Allowlist contractual",control:"Egress + auditoría + terceros"}
  ],
  kpiBlueprint:[
    {uc:"UC1",name:"Agentes corporativos",kpis:["Tiempo hasta respuesta útil","% respuestas con fuente trazable","Escalado a humano","Tiempo ahorrado por consulta"]},
    {uc:"UC2",name:"Document Intelligence",kpis:["Exactitud de extracción","Tiempo manual/documento","% excepciones","Straight-through processing"]},
    {uc:"UC3",name:"Siniestros y fraude",kpis:["Cycle time de siniestro","False positives de señales","% overrides humanos","Tiempo de revisión"]},
    {uc:"UC4",name:"Analítica / actuarial",kpis:["Tiempo preparación de datos","Reproducibilidad","Tiempo de revisión","Cobertura de lineage"]},
    {uc:"UC5",name:"Administración",kpis:["Tiempo de ciclo","Touchless rate","% excepciones","Reprocesos"]},
    {uc:"UC6",name:"IT / ciber",kpis:["MTTR","% runbooks asistidos","Escalados N2","Acciones bloqueadas por policy"]},
    {uc:"UC7",name:"Grupo Soliss",kpis:["Tiempo onboarding entidad","Reutilización de servicios","Incidentes de segregación","Coste incremental por dominio"]}
  ],
  gateDeliverables:[
    {gate:"G1",title:"Alcance controlado",items:["Acta de alcance y exclusiones","Inventario AS-IS","Backlog UC1–UC7","RACI inicial","Registro de riesgos","Calendario de sizing"]},
    {gate:"G2",title:"Blueprint e inversión",items:["Arquitectura objetivo","Sizing CPU/RAM/GPU","Red y segmentación","Diseño backup/DR","Rango CAPEX Soliss","Enfoque DORA/AI Act"]},
    {gate:"G3",title:"Sandbox validado",items:["Keycloak/RBAC","Model Gateway","RAG trazable","Gravitino PoC","Fallback documentado","Observabilidad / benchmark"]},
    {gate:"G4",title:"Aceptación y transferencia",items:["UAT","Runbooks e IaC","Pruebas HA/restore","Manuales","Formación","Roadmap UC + plan S1"]}
  ],
  responsibilities:{
    roles:["Keedio PM/Arquitectura","Keedio Data/AI","Keedio Infra/Sec","Soliss Sponsor","Soliss IT","Soliss Data Owners","Soliss Compliance","Soliss Key Users"],
    rows:[
      ["Plan y gobierno","A/R","C","C","A","C","C","C","I"],
      ["Arquitectura P0","A/R","R","R","C","A","C","C","I"],
      ["Sizing / compra HW","C","I","R","A","A/R","I","C","I"],
      ["Data Mesh / ownership","C","R","C","I","C","A/R","C","C"],
      ["Model Gateway / RAG","A","R","C","I","C","C","C","C"],
      ["DORA / AI Act","C","C","R","A","C","C","A/R","I"],
      ["UAT / aceptación","C","C","C","A","C","C","C","R"],
      ["Operación N1","C","I","C","I","A/R","C","C","I"],
      ["Soporte N2","A","R","R","I","C","I","I","I"]
    ]
  },
  faqs:[
    {q:"¿Qué compra Soliss exactamente?",a:"Soliss contrata P0 como capacidad crítica y los servicios Keedio asociados. La infraestructura productiva la adquiere Soliss directamente tras sizing; UC1–UC7 se activan posteriormente.",target:"#decision"},
    {q:"¿Por qué no desplegar ya los siete casos?",a:"Porque compartir una base de identidad, datos, seguridad, modelos, observabilidad y operación reduce duplicación y permite gates de valor/riesgo antes de cada vertical.",target:"#factory"},
    {q:"¿Qué ocurre si Gravitino no cumple?",a:"No bloquea P0: se evalúa como PoC en G3 y se activa el fallback de catálogo/metastore desacoplado.",target:"#twin"},
    {q:"¿Puede salir información de Soliss a modelos externos?",a:"El patrón es local-first. Toda excepción externa requiere modelo/proveedor aprobado, clasificación de datos, policy y logging mediante Model Gateway.",target:"#twin"},
    {q:"¿Cómo evitamos Shadow AI?",a:"Centralizando acceso a modelos, cuotas, logs y políticas en Model Gateway, combinado con egress control y catálogo de modelos autorizados.",target:"#twin"},
    {q:"¿Quién responde después de la entrega?",a:"Soliss desarrolla autonomía N1 mediante transferencia y runbooks; Keedio presta soporte N2 especializado y fabricantes/comunidad cubren N3 según contrato.",target:"#delivery"},
    {q:"¿Cómo demostramos cumplimiento?",a:"Con Evidence Registry, Model Passports, trazabilidad de fuentes, logs, pruebas y artefactos de gate; no mediante un porcentaje arbitrario de compliance.",target:"#governance"},
    {q:"¿Todo uso de IA en seguros es high-risk?",a:"No. La clasificación depende del uso. Annex III incluye risk assessment/pricing de personas en vida/salud; claims management no entra automáticamente en ese supuesto.",target:"#assurance"},
    {q:"¿Qué cambia desde agosto de 2026?",a:"El AI Act entra en una fase de enforcement más amplia y Art. 50 aplica obligaciones de transparencia para determinados sistemas interactivos y contenido generado/manipulado.",target:"#assurance"},
    {q:"¿Cómo mediremos valor y no solo actividad?",a:"Cada UC debe arrancar con baseline, KPI, target, owner y fuente de evidencia. La web incluye un Measurement Blueprint sin inventar resultados.",target:"#factory"}
  ],
  changelog:[
    {version:"V6.0",date:"02 Sep 2026",items:["Bundle público/privado físico","Keycloak OIDC + PKCE","P0 Copilot local","Command Palette","Live Decision Board","Decision Readiness","Universal Provenance","Source Freshness","Control Traceability Graph","P0 Capability Contracts","UC→KPI→Evidence","Presentation & Accessibility","QR público","One Page Executive Brief","Version Compare"]},
    {version:"V5.0",date:"02 Sep 2026",items:["Access Hub único","Visión pública + Boardroom en una sola web","Navegación y copy por modo","Story público 6 min + Boardroom 9 min","Consentimiento Boardroom","URLs compartibles por vista","Cambio de acceso persistente por sesión","Modelo de despliegue seguro documentado"]},
    {version:"V4.4",date:"01 Sep 2026",items:["Executive Story Mode","9 escenas Consejo","Autoplay y cronómetros","Notas del presentador","Pausa Q&A","Deep dive + reanudación"]},
    {version:"V4.3",date:"01 Sep 2026",items:["Factory Effect","Antes/Después de P0","Onboarding futuros UC8/UC9","Canvas descargable"]},
    {version:"V4.2",date:"01 Sep 2026",items:["Historias visuales","Siniestro","Empleado","Factura","Matriz de reutilización P0"]},
    {version:"V4.1",date:"01 Sep 2026",items:["P0 en 60 segundos","Lenguaje claro / técnico","Explorador UC1–UC7","Glosario"]},
    {version:"V4.0",date:"01 Sep 2026",items:["Identidad visual Soliss","Supervisory Radar 2026","AI Act timeline","EIOPA Assurance","ISO 42001 alignment","AI literacy","Agentic Safety Gate","Sovereignty Matrix","KPI Blueprint","Gate Deliverables","Responsibility Explorer","FAQ/Objection Navigator","Boardroom + Public builds"]},
    {version:"V3.1",date:"01 Sep 2026",items:["Document Center","SHA-256 manifest","Acta preliminar","Decision snapshot","Offline document cache"]},
    {version:"V3.0",date:"01 Sep 2026",items:["Audience modes","Decision Room","Digital Twin","Use Case Factory","Economics Lab","Evidence Cockpit","Model Passport"]},
    {version:"V2",date:"01 Sep 2026",items:["Arquitectura interactiva","Economics por escenarios","Roadmap y operación"]}
  ]
};

window.P0.sources.push(
  {title:"Soliss · web corporativa",note:"1933, compromiso territorial, >95% satisfacción y claims corporativos publicados por Soliss",url:"https://www.soliss.es/"},
  {title:"EIOPA · Opinion on AI governance and risk management",note:"Data governance, record-keeping, fairness, cyber security, explainability y human oversight",url:"https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en"},
  {title:"EIOPA · Focus Areas 2026",note:"DORA y claims management/digitalisation; 62% satisfacción UE con claims handling",url:"https://www.eiopa.europa.eu/publications/union-wide-strategic-supervisory-priorities-focus-areas-2026_en"},
  {title:"European Commission · AI Act enforcement",note:"Enforcement y transparencia desde agosto de 2026; calendario de aplicación actualizado",url:"https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act"},
  {title:"European Commission · AI literacy",note:"Article 4 aplica desde febrero de 2025; medidas de literacy para providers/deployers",url:"https://digital-strategy.ec.europa.eu/en/policies/ai-talent-skills-and-literacy"},
  {title:"AI Act Service Desk · Essential services",note:"Vida/salud pricing in scope; claims management mostrado como ejemplo fuera de 5(c)",url:"https://ai-act-service-desk.ec.europa.eu/en/essential-services"},
  {title:"ISO/IEC 42001:2023",note:"AI management system y ciclo de mejora continua",url:"https://www.iso.org/standard/42001"},
  {title:"OWASP GenAI Security Project · LLM Top 10",note:"Prompt injection, sensitive information, poisoning, agency, vectors y unbounded consumption",url:"https://genai.owasp.org/llm-top-10/"},
  {title:"OWASP · Top 10 for Agentic Applications",note:"Referencia 2025 para riesgos de aplicaciones agentic",url:"https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/"},
  {title:"NIST AI RMF · GenAI Profile",note:"Perfil voluntario de gestión de riesgo para IA generativa",url:"https://airc.nist.gov/technical-reports/"}
);


// V4.1 pedagogical layer — grounded in the Final Closed Plan Director and post-meeting technical proposal.
window.P0.explainer = {
  p0:{
    headline:"P0 no es un chatbot ni una aplicación departamental: es la base común para industrializar IA y RPA en Soliss.",
    plain:"En lenguaje sencillo, P0 construye una única 'fábrica' corporativa: prepara la infraestructura, los accesos, los datos, la puerta de entrada a los modelos, la seguridad, los registros, las pruebas y la forma de operar. Después, cada caso UC1–UC7 utiliza esa base sin tener que volver a construirla desde cero.",
    technical:"P0 entrega la arquitectura on-premise federada, Rancher/RKE2, gobierno e identidad, Data Mesh y catálogo, Gravitino como PoC no bloqueante, Model Gateway, patrón RAG, observabilidad, seguridad, IaC, pruebas, runbooks, documentación, transferencia y backlog para activar UC1–UC7 mediante gates posteriores.",
    analogy:"Analogía: P0 es la cimentación, instalaciones comunes, seguridad y cuadro eléctrico de un edificio. UC1–UC7 son las estancias de negocio que se habilitan después sobre esa base.",
    objective:"El objetivo no es sustituir las capacidades que Soliss ya tiene, sino industrializarlas bajo un patrón común, trazable, escalable y gobernado.",
    notIncluded:[
      "La compra de servidores, GPU, almacenamiento o red: la realiza Soliss tras el sizing.",
      "Un agente final completo para cada departamento.",
      "Un motor productivo definitivo de fraude o scoring por ramo.",
      "Una solución actuarial completa o tarificación productiva.",
      "Cuadros de mando finales y automatizaciones completas de cada proceso de negocio."
    ]
  },
  blocks:[
    {id:"platform",title:"1. Plataforma y clústeres",plain:"Una base común donde desplegar y administrar los servicios de IA/RPA sin crear servidores aislados para cada proyecto.",technical:"Rancher + RKE2 para gestión de flota, clúster de gestión, clúster de grupo y clústeres por empresa/dominio."},
    {id:"identity",title:"2. Identidad y permisos",plain:"Cada persona y servicio accede solo a lo que le corresponde según su rol y empresa.",technical:"Keycloak, OIDC y posible integración LDAP/AD con RBAC/ABAC, segregación y trazabilidad de acceso."},
    {id:"data",title:"3. Datos gobernados",plain:"Los casos de IA saben de dónde viene cada dato, quién es su responsable y quién puede utilizarlo.",technical:"Data Mesh federado, lago de datos, ownership, sensibilidad, lineage, catálogo y Gravitino PoC con fallback."},
    {id:"models",title:"4. Model Gateway + RAG",plain:"Una única puerta controla qué modelos se pueden usar y permite responder apoyándose en fuentes corporativas autorizadas.",technical:"Model Gateway para cuotas, políticas, logging, coste, latencia y fallback; RAG para grounding con fuentes trazables."},
    {id:"services",title:"5. Servicios IA/RPA reutilizables",plain:"Piezas comunes que después pueden utilizar varios casos de negocio en lugar de duplicarlas.",technical:"RAG, Document Intelligence, n8n, APIs, conectores, OCR/visión y patrones de orquestación."},
    {id:"observe",title:"6. Observabilidad y auditoría",plain:"Soliss puede saber quién usó qué, cuándo, con qué modelo, sobre qué fuente y qué ocurrió.",technical:"Métricas, logs, coste, trazabilidad, paneles, alertas, evidencias y registro de inferencias/operación."},
    {id:"resilience",title:"7. Seguridad y resiliencia",plain:"La plataforma se diseña para limitar accesos, recuperarse de fallos y demostrar los controles aplicados.",technical:"Hardening, segmentación, secrets, backup/restore, HA, DR, pruebas de resiliencia y controles DORA/AI Act."},
    {id:"operate",title:"8. Operación y transferencia",plain:"P0 no termina con una instalación: deja manuales, runbooks, formación y un reparto claro entre Soliss y Keedio.",technical:"IaC, repositorios, UAT, manual técnico/usuario, soporte N0–N3, RACI, gestión del cambio y transferencia a operación."}
  ],
  commonFlow:[
    {n:"01",title:"Persona o sistema solicita",plain:"Un empleado, agente o proceso inicia una consulta o tarea.",technical:"Petición autenticada desde un canal o integración autorizada."},
    {n:"02",title:"Se comprueba identidad",plain:"La plataforma verifica quién es y qué puede hacer.",technical:"Keycloak + RBAC/ABAC aplican identidad, rol, dominio y policy."},
    {n:"03",title:"Se accede solo a datos autorizados",plain:"El caso obtiene únicamente información permitida para ese usuario y contexto.",technical:"Data Mesh, catálogo, clasificación, ownership y controles de acceso limitan las fuentes."},
    {n:"04",title:"Model Gateway controla la IA",plain:"Soliss decide qué modelo se usa y bajo qué reglas.",technical:"Gateway selecciona modelo, cuotas, políticas, logs, coste, caché y fallback."},
    {n:"05",title:"El servicio ejecuta",plain:"RAG, OCR, automatización o analítica realiza la tarea concreta.",technical:"Servicio IA/RPA consume fuentes y herramientas aprobadas dentro del patrón P0."},
    {n:"06",title:"La persona interviene cuando procede",plain:"En procesos sensibles, el profesional Soliss revisa o valida antes de ejecutar una decisión.",technical:"Human-in-the-loop, approvals y límites de autonomía según riesgo y clasificación del UC."},
    {n:"07",title:"Todo queda trazado",plain:"La operación deja registros para soporte, auditoría y mejora.",technical:"Observabilidad y evidence trail registran identidad, servicio/modelo, fuentes, resultado, latencia y eventos relevantes."}
  ],
  glossary:[
    {term:"RKE2 / Kubernetes",plain:"La plataforma donde viven y se administran los servicios.",technical:"Distribución Kubernetes orientada a operación segura; Rancher gestiona la flota de clústeres."},
    {term:"Model Gateway",plain:"La puerta corporativa para usar modelos de IA de forma controlada.",technical:"Centraliza modelos, policies, cuotas, logging, coste, latencia, caché y fallback."},
    {term:"RAG",plain:"Hace que la IA responda utilizando documentos y datos autorizados en vez de depender solo de lo aprendido por el modelo.",technical:"Retrieval-Augmented Generation con recuperación, grounding, permisos y provenance de fuentes."},
    {term:"Data Mesh",plain:"Organiza los datos por dominios con responsables claros, en vez de mezclarlos sin control.",technical:"Modelo federado de ownership, acceso, calidad, sensibilidad y productos de datos por dominio/empresa."},
    {term:"Gravitino PoC",plain:"Un catálogo experimental para ordenar y federar metadatos; si no funciona como se espera, P0 continúa con una alternativa.",technical:"PoC de metadata lake/catalog federation sometida a Go/No-Go G3 y fallback desacoplado."},
    {term:"HITL",plain:"Human-in-the-loop: una persona conserva la capacidad de revisar, aprobar o detener una acción.",technical:"Control de supervisión humana aplicado según el riesgo y autonomía del caso de uso."},
    {term:"Observabilidad",plain:"La capacidad de saber qué está pasando y reconstruir qué pasó.",technical:"Métricas, logs, traces, costes, alertas, auditoría y evidencias operativas."}
  ],
  useCases:{
    UC1:{plain:"Asistentes corporativos que ayudan a empleados, agentes y áreas internas a encontrar y utilizar conocimiento autorizado de Soliss.",question:"¿Cómo puedo obtener una respuesta útil y trazable sin buscar manualmente entre múltiples documentos y fuentes?",p0:"P0 deja preparados identidad/permisos, Model Gateway, patrón RAG, fuentes gobernadas, logging y arquitectura de agentes.",later:"El caso derivado construye los agentes finales por área, integra sus fuentes concretas, define conversaciones, entrenamiento operativo y despliegue a usuarios.",users:"Empleados, agentes y áreas internas, según el agente que se priorice.",example:"Ejemplo ilustrativo: un empleado consulta un procedimiento interno; el asistente recupera únicamente fuentes autorizadas y muestra la respuesta con trazabilidad.",human:"El asistente apoya; las decisiones sensibles permanecen bajo el profesional/rol responsable.",out:"P0 no entrega todos los agentes departamentales productivos ni su despliegue masivo."},
    UC2:{plain:"Document Intelligence convierte documentos e imágenes en información estructurada que puede validarse y utilizarse en procesos posteriores.",question:"¿Cómo reducimos lectura, clasificación y captura manual de documentos manteniendo control sobre errores y excepciones?",p0:"P0 valida el patrón de ingesta, OCR/visión, metadatos, permisos, validación, trazabilidad y conexión con servicios comunes.",later:"El caso derivado configura cada tipología documental, reglas de validación, integración con el proceso real y explotación a escala productiva.",users:"Áreas con carga documental, como siniestros, administración y backoffice, según el alcance que Soliss priorice.",example:"Ejemplo ilustrativo: llega un documento, se clasifica, se extraen campos y las excepciones se envían a revisión humana antes de continuar.",human:"Las excepciones, baja confianza o documentos sensibles pueden escalarse a validación humana.",out:"P0 no automatiza de extremo a extremo todas las tipologías documentales de Soliss."},
    UC3:{plain:"Capacidad para asistir en producción, tramitación de siniestros y detección de señales de fraude con datos, trazabilidad y supervisión humana.",question:"¿Cómo damos al tramitador mejores señales y contexto sin convertir un score en una decisión automática opaca?",p0:"P0 define el marco de datos, seguridad, explicabilidad, logging, scoring asistido, human-in-the-loop y observabilidad necesarios para el caso.",later:"El caso derivado desarrolla y valida el modelo/scoring productivo, reglas por ramo/canal, umbrales, integración con la operativa y métricas de resultado.",users:"Tramitación de siniestros y especialistas que revisen señales de riesgo/fraude, según el diseño funcional posterior.",example:"Ejemplo ilustrativo: el sistema presenta señales y evidencias de un siniestro; el profesional Soliss decide cómo continuar y la decisión queda trazada.",human:"El profesional revisa señales, contexto y posibles falsos positivos; P0 no presupone decisión automática ciega.",out:"P0 no entrega el motor definitivo de fraude ni reglas finales productivas por ramo/canal."},
    UC4:{plain:"Base gobernada para analítica, actuarial y gestión, con datos localizables, accesibles y trazables.",question:"¿Cómo evitamos que cada análisis vuelva a reconstruir datos, permisos y definiciones desde cero?",p0:"P0 habilita Data Mesh, catálogo, ownership, acceso, metadatos, lineage y una base común para analítica/reporting.",later:"El caso derivado construye cuadros de mando, modelos actuariales productivos y, si procede, tarificación/suscripción con su validación específica.",users:"Equipos de analítica, actuarial, riesgos y gestión según el caso concreto que se active.",example:"Ejemplo ilustrativo: un analista accede a un conjunto gobernado con owner, versión y lineage claros para producir un análisis reproducible.",human:"Los especialistas interpretan resultados y validan el uso del modelo; la regulación se evalúa por finalidad concreta.",out:"P0 no entrega modelos actuariales productivos, tarificación final ni cuadros de mando completos."},
    UC5:{plain:"Automatización asistida de administración, contabilidad, compras e inversiones utilizando integraciones y controles comunes.",question:"¿Cómo automatizamos tareas repetitivas sin perder autorizaciones, trazabilidad ni tratamiento de excepciones?",p0:"P0 define integración, gobierno documental/contable, identidad, logging y patrones IA/RPA reutilizables.",later:"El caso derivado implementa flujos específicos de facturas, compras, inversiones, conciliaciones o ERP según la prioridad de Soliss.",users:"Administración, finanzas, contabilidad y otras áreas de backoffice según el proceso seleccionado.",example:"Ejemplo ilustrativo: una tarea administrativa se procesa automáticamente cuando cumple reglas y se deriva a una persona cuando aparece una excepción.",human:"Los controles y autorizaciones de negocio se mantienen donde sean necesarios; la automatización no elimina la segregación de funciones.",out:"P0 no entrega todos los flujos financieros/ERP completos ni las reglas particulares de cada proceso."},
    UC6:{plain:"Asistencia a IT y ciberseguridad para observar la plataforma, consultar conocimiento técnico y ejecutar tareas controladas con runbooks.",question:"¿Cómo reducimos tiempo de diagnóstico y operación sin otorgar a un agente permisos ilimitados?",p0:"P0 aporta observabilidad, logs, runbooks, identidad, seguridad, Model Gateway y el patrón de agente IT local con límites de agencia.",later:"El caso derivado implementa el agente/SOC o automatizaciones técnicas concretas, con herramientas, permisos, approvals y pruebas definidas.",users:"Equipos IT, plataforma, soporte y ciberseguridad según el alcance posterior.",example:"Ejemplo ilustrativo: un operador consulta una incidencia, el agente correlaciona logs y propone un runbook; una acción privilegiada requiere aprobación.",human:"Las acciones de alto impacto se diseñan con mínimo privilegio y aprobación humana cuando corresponda.",out:"P0 no entrega un SOC/agente definitivo ni todas las automatizaciones productivas de ciberseguridad."},
    UC7:{plain:"Extender la misma Factory a otras empresas del Grupo Soliss manteniendo separación de datos, identidades y responsabilidades.",question:"¿Cómo incorporamos nuevas entidades sin copiar una plataforma completa ni mezclar sus datos?",p0:"P0 prepara multiclúster/multiempresa, dominios, identidad, segregación, servicios comunes y un patrón de onboarding progresivo.",later:"Cada caso derivado despliega las funciones necesarias para la entidad concreta, integra sus datos y valida su Go/No-Go operativo.",users:"Entidades del Grupo Soliss y sus equipos, cuando se priorice su incorporación.",example:"Ejemplo ilustrativo: una nueva entidad reutiliza identidad, Gateway, observabilidad y gobierno, pero mantiene su propio dominio de datos y clúster según el diseño.",human:"Cada entidad debe tener responsables y ownership claros; la expansión no elimina accountability local.",out:"P0 no incluye el despliegue funcional completo de todas las empresas del grupo."}
  }
};


// V4.2 — Visual user journeys. These are illustrative narratives, not additional contractual scope.
window.P0.explainer.userStories = [
  {
    id:"claim", short:"Siniestro",
    title:"Historia 1 · Un siniestro entra en Soliss",
    subtitle:"Cómo P0, Document Intelligence y el caso de siniestros/fraude pueden colaborar sin convertir la IA en una decisión automática.",
    actors:["Cliente / canal","Tramitador Soliss","UC2 Document Intelligence","UC3 Siniestros / fraude"],
    ucs:["UC2","UC3"], person:"Tramitador / especialista Soliss",
    outcome:"El profesional recibe información estructurada, señales y evidencias; conserva la decisión sobre cómo continuar.",
    p0Reuse:["Identidad y permisos","Data Mesh / fuentes","Model Gateway","Observabilidad","Seguridad","Evidence trail"],
    p0Boundary:"P0 proporciona la plataforma, los controles, los patrones documentales/RAG, la trazabilidad y el entorno de ejecución. No entrega en sí mismo el motor productivo definitivo de fraude ni las reglas finales por ramo.",
    derivedBoundary:"UC2 configura documentos y extracción para tipologías reales; UC3 construye y valida señales, scoring asistido, reglas, umbrales e integración operativa.",
    steps:[
      {n:"01",kind:"business",title:"Entra el siniestro",who:"Cliente / canal Soliss",plain:"Llega una comunicación de siniestro con datos y, potencialmente, documentos o imágenes.",technical:"El canal o sistema core origina la transacción y referencia los artefactos documentales asociados.",p0:"P0 todavía no decide nada: recibe una petición desde un canal autorizado.",uc:"El proceso funcional pertenece al caso derivado de siniestros.",human:"El proceso de negocio sigue siendo responsabilidad de Soliss.",evidence:"Identificador de transacción, canal, timestamp."},
      {n:"02",kind:"p0",title:"P0 identifica y protege",who:"P0 común",plain:"La plataforma comprueba quién o qué sistema solicita acceso y limita los datos disponibles.",technical:"Keycloak/RBAC/ABAC, segregación de dominio y policies controlan identidad y autorización.",p0:"Identidad, permisos y segregación son capacidades comunes de P0 reutilizadas por cualquier UC.",uc:"El UC declara qué roles y permisos concretos necesita.",human:"Soliss valida roles, owners y accesos.",evidence:"Usuario/servicio, rol, dominio, policy aplicada."},
      {n:"03",kind:"uc",title:"UC2 entiende los documentos",who:"UC2 · Document Intelligence",plain:"Los documentos se clasifican y se extraen campos útiles. Si la confianza no es suficiente, se deriva a revisión.",technical:"Pipeline OCR/visión, clasificación, extracción, metadatos, confidence thresholds y validación.",p0:"P0 aporta el patrón de ingesta, servicios comunes, seguridad, logging y acceso al dato.",uc:"UC2 configura cada tipología documental, campos, reglas y conexión al proceso real.",human:"Baja confianza o excepciones pueden requerir validación humana.",evidence:"Documento, versión, extracción, confidence, validación."},
      {n:"04",kind:"p0",title:"P0 reúne contexto autorizado",who:"P0 común",plain:"El caso recupera únicamente los datos e información que tiene permiso para utilizar.",technical:"Data Mesh, catálogo, ownership, clasificación y retrieval gobernado limitan las fuentes.",p0:"La gobernanza y provenance de datos pertenecen a la base P0.",uc:"El caso define qué fuentes necesita para su finalidad concreta.",human:"Data Owners Soliss autorizan las fuentes.",evidence:"Fuente, owner, clasificación, versión, permisos."},
      {n:"05",kind:"uc",title:"UC3 genera señales asistidas",who:"UC3 · Siniestros / fraude",plain:"El sistema puede presentar señales, contexto o una priorización para ayudar al tramitador.",technical:"Modelo/scoring asistido, reglas, features, RAG/contexto y umbrales definidos en el proyecto derivado.",p0:"Model Gateway controla modelos autorizados, logging, políticas, coste y fallback.",uc:"UC3 debe desarrollar y validar modelo, features, reglas y métricas productivas.",human:"El score no se presenta como decisión automática ciega.",evidence:"Modelo/versión, inputs autorizados, señales, explicación, latencia."},
      {n:"06",kind:"human",title:"Profesional Soliss decide",who:"Tramitador / especialista",plain:"La persona revisa la información, corrige si es necesario y decide cómo continuar el expediente.",technical:"Human-in-the-loop con permisos, reason codes/observaciones y posible override del resultado asistido.",p0:"P0 permite registrar la interacción y aplicar controles de acceso.",uc:"UC3 define cómo se integra la asistencia en el workflow real.",human:"La accountability permanece en Soliss según el proceso y la regulación aplicable.",evidence:"Decisión, override, usuario, motivo, fecha."},
      {n:"07",kind:"evidence",title:"Todo queda trazado",who:"P0 · Observabilidad",plain:"La operación deja un rastro que permite investigar incidencias, medir resultados y auditar.",technical:"Logs, métricas, provenance, decisiones, modelos, fuentes y eventos relevantes se correlacionan.",p0:"Observabilidad y evidence trail son capacidades transversales P0.",uc:"El caso añade sus KPI, outcomes y controles funcionales.",human:"Soliss puede revisar resultados y alimentar mejora continua.",evidence:"Trail completo desde entrada hasta decisión humana."}
    ]
  },
  {
    id:"employee", short:"Empleado",
    title:"Historia 2 · Un empleado consulta un procedimiento",
    subtitle:"Cómo UC1 reutiliza identidad, RAG, Model Gateway y trazabilidad de P0 para responder con fuentes autorizadas.",
    actors:["Empleado Soliss","UC1 Agente corporativo","Fuentes autorizadas","Responsable del proceso"],
    ucs:["UC1"], person:"Empleado / responsable funcional",
    outcome:"El empleado obtiene una respuesta contextual y trazable; las decisiones o excepciones sensibles se escalan al responsable.",
    p0Reuse:["Identidad y permisos","RAG gobernado","Model Gateway","Catálogo / fuentes","Logging","Human oversight"],
    p0Boundary:"P0 deja preparado el patrón de agentes, identidad, fuentes, Gateway, RAG, logging y seguridad. No entrega todos los asistentes finales por área.",
    derivedBoundary:"UC1 diseña cada agente concreto, sus fuentes, instrucciones, conversaciones, límites, UAT y despliegue a usuarios.",
    steps:[
      {n:"01",kind:"business",title:"El empleado pregunta",who:"Empleado Soliss",plain:"Una persona plantea una duda operativa en un canal corporativo.",technical:"El frontend autorizado envía la consulta junto al contexto de identidad y sesión.",p0:"P0 ofrece el canal técnico y controlado de acceso al servicio.",uc:"UC1 define la experiencia del agente y el propósito de la conversación.",human:"El usuario conoce que interactúa con un sistema de IA cuando aplique.",evidence:"Usuario, canal, timestamp, sesión."},
      {n:"02",kind:"p0",title:"P0 comprueba quién pregunta",who:"Identidad P0",plain:"La plataforma verifica el rol para impedir que una respuesta revele información que ese usuario no debería ver.",technical:"Keycloak/OIDC + RBAC/ABAC generan el contexto de autorización.",p0:"Identidad y autorización son comunes a todos los agentes y casos.",uc:"UC1 define permisos funcionales adicionales si fueran necesarios.",human:"Soliss valida roles y grupos.",evidence:"Identidad, rol, claims, policy."},
      {n:"03",kind:"p0",title:"RAG busca solo en fuentes autorizadas",who:"Datos + RAG P0",plain:"La consulta se apoya en documentos y datos corporativos permitidos para ese usuario.",technical:"Retrieval filtrado por permisos y metadatos devuelve fragmentos con provenance.",p0:"P0 aporta catálogo, retrieval gobernado, seguridad y trazabilidad de fuentes.",uc:"UC1 selecciona las fuentes concretas del agente.",human:"Owners mantienen documentos y vigencia.",evidence:"Documento, versión, fragmento, owner, fecha."},
      {n:"04",kind:"p0",title:"Gateway controla el modelo",who:"Model Gateway P0",plain:"La petición pasa por una puerta que decide qué modelo puede responder y registra el uso.",technical:"Policies, model allowlist, cuotas, logging, caché, coste, latencia y fallback.",p0:"El Gateway es un habilitador transversal P0.",uc:"UC1 configura comportamiento del agente sobre el Gateway autorizado.",human:"Soliss aprueba modelos/proveedores según gobierno.",evidence:"Modelo, versión, policy, latencia, consumo."},
      {n:"05",kind:"uc",title:"UC1 genera una respuesta con contexto",who:"UC1 · Agente corporativo",plain:"El asistente redacta una respuesta apoyándose en las fuentes recuperadas y puede mostrar de dónde procede.",technical:"Prompt/orchestration del agente combina instrucciones, contexto RAG y controles de salida.",p0:"P0 proporciona las capacidades comunes.",uc:"UC1 construye las instrucciones, conversación, límites y UAT del agente final.",human:"El agente no debe inventar una autorización o decisión que no le corresponda.",evidence:"Respuesta, citas/fuentes, policy, versión del agente."},
      {n:"06",kind:"human",title:"Se escala si la consulta exige decisión",who:"Responsable Soliss",plain:"Si la pregunta requiere una excepción, aprobación o juicio profesional, el asistente deriva a la persona responsable.",technical:"Escalation path y human-in-the-loop definidos por proceso.",p0:"P0 soporta identidad, routing y trazabilidad.",uc:"UC1 implementa reglas de escalado del agente concreto.",human:"La persona responsable adopta la decisión.",evidence:"Escalado, responsable, resolución."},
      {n:"07",kind:"evidence",title:"La interacción se puede revisar",who:"Observabilidad P0",plain:"Soliss puede analizar calidad, tiempos, escalados y problemas sin depender de memoria informal.",technical:"Telemetría de consultas, retrieval, modelos, respuestas, errores y escalados.",p0:"Observabilidad transversal.",uc:"UC1 aporta KPI de utilidad, trazabilidad y escalado.",human:"Los resultados alimentan mejora y formación.",evidence:"Logs + KPI + feedback."}
    ]
  },
  {
    id:"invoice", short:"Factura",
    title:"Historia 3 · Una factura llega a Administración",
    subtitle:"Cómo UC2 y UC5 pueden automatizar trabajo repetitivo manteniendo autorizaciones, excepciones y segregación de funciones.",
    actors:["Proveedor / entrada","UC2 Document Intelligence","UC5 Administración","Responsable Soliss"],
    ucs:["UC2","UC5"], person:"Administración / Finanzas Soliss",
    outcome:"El caso normal puede avanzar de forma asistida; discrepancias, baja confianza o autorizaciones quedan en manos del responsable.",
    p0Reuse:["Identidad","Document pattern","Integraciones","Model Gateway","Observabilidad","Auditoría"],
    p0Boundary:"P0 aporta patrones de integración, OCR/documental, identidad, seguridad, Gateway, logging y operación. No implementa todos los workflows ERP o reglas contables de Soliss.",
    derivedBoundary:"UC2 configura la lectura documental; UC5 implementa reglas, conciliaciones, excepciones, autorizaciones e integración con los sistemas administrativos.",
    steps:[
      {n:"01",kind:"business",title:"Llega la factura",who:"Proveedor / canal",plain:"Una factura entra por el canal definido y debe incorporarse al proceso administrativo.",technical:"Documento recibido por integración, bandeja o canal autorizado con identificador de proceso.",p0:"P0 proporciona patrones de integración y recepción segura.",uc:"El caso derivado concreta el canal real y la integración.",human:"Soliss define el proceso administrativo objetivo.",evidence:"Documento original, canal, timestamp."},
      {n:"02",kind:"uc",title:"UC2 clasifica y extrae",who:"UC2 · Document Intelligence",plain:"Se identifican datos como proveedor, fecha, concepto e importes, siempre sujetos a validación.",technical:"OCR/visión + extracción estructurada + confidence thresholds.",p0:"P0 ofrece servicios documentales reutilizables, permisos y logging.",uc:"UC2 configura campos y tipología factura.",human:"Errores/baja confianza se revisan.",evidence:"Campos extraídos, confidence, versión del documento."},
      {n:"03",kind:"p0",title:"P0 aplica contexto y permisos",who:"P0 común",plain:"Solo los servicios y personas autorizados acceden a la información financiera necesaria.",technical:"RBAC/ABAC, dominio, clasificación y service identities limitan acceso.",p0:"Identidad y segregación son comunes.",uc:"UC5 declara las operaciones permitidas.",human:"Soliss valida segregación de funciones.",evidence:"Identidad, policy, operación solicitada."},
      {n:"04",kind:"uc",title:"UC5 contrasta reglas e información",who:"UC5 · Administración / Finanzas",plain:"El flujo puede comprobar datos, relacionarlos con órdenes o contratos y detectar discrepancias.",technical:"Reglas, integraciones, automatización RPA/IA y lógica de excepción definida en el vertical.",p0:"P0 aporta conectividad, observabilidad y servicios IA/RPA comunes.",uc:"UC5 implementa reglas reales, integraciones ERP y controles administrativos.",human:"Las reglas proceden del proceso de Soliss.",evidence:"Reglas aplicadas, sistemas consultados, resultado."},
      {n:"05",kind:"uc",title:"Caso normal o excepción",who:"UC5",plain:"Si todo cuadra, el flujo puede continuar dentro de los límites aprobados; si no, se detiene y escala.",technical:"Decision table/workflow con thresholds, exception routing y approval gates.",p0:"P0 permite aplicar policies y registrar el flujo.",uc:"UC5 define exactamente qué puede automatizarse y qué requiere aprobación.",human:"La automatización no elimina controles ni segregation of duties.",evidence:"Ruta seguida, excepción, policy."},
      {n:"06",kind:"human",title:"Responsable valida cuando corresponde",who:"Administración / Finanzas",plain:"Una persona revisa discrepancias, excepciones o autorizaciones antes de continuar.",technical:"Approval task con identidad, motivo, timestamps y control de permisos.",p0:"P0 autentica y registra.",uc:"UC5 integra la aprobación en el proceso concreto.",human:"La aprobación permanece en el rol definido por Soliss.",evidence:"Aprobador, decisión, motivo, fecha."},
      {n:"07",kind:"evidence",title:"Auditoría y mejora",who:"P0 · Observabilidad",plain:"Soliss puede medir cuánto trabajo se automatiza, dónde aparecen excepciones y qué errores deben corregirse.",technical:"Event/log correlation, KPI de STP, excepciones, errores y tiempos.",p0:"Evidence trail y observabilidad transversales.",uc:"UC5 aporta KPI funcionales y outcomes administrativos.",human:"Los equipos revisan resultados y ajustan reglas.",evidence:"Trail + KPI + excepciones."}
    ]
  }
];

window.P0.explainer.storyReuse = [
  {capability:"Identidad y permisos",claim:true,employee:true,invoice:true,why:"El acceso controlado es común a cualquier caso."},
  {capability:"Datos / fuentes gobernadas",claim:true,employee:true,invoice:true,why:"Cada UC necesita conocer origen, permisos y ownership."},
  {capability:"Model Gateway",claim:true,employee:true,invoice:true,why:"Centraliza modelos, policies, logging y fallback."},
  {capability:"Servicios IA/RPA comunes",claim:true,employee:true,invoice:true,why:"RAG, OCR, conectores y automatización se reutilizan."},
  {capability:"Observabilidad / auditoría",claim:true,employee:true,invoice:true,why:"Todos los casos necesitan evidence trail."},
  {capability:"Human-in-the-loop",claim:true,employee:true,invoice:true,why:"El nivel de intervención cambia, pero el patrón es reutilizable."},
  {capability:"Lógica funcional del vertical",claim:false,employee:false,invoice:false,why:"Esto pertenece al UC derivado, no a P0."}
];


// V4.3 — Factory Effect: isolated vertical vs. P0-enabled onboarding.
// This comparison is qualitative. It does not claim measured current-state deficiencies or quantified savings.
window.P0.explainer.factoryEffect = {
  disclaimer:"Comparación conceptual: 'aislado' representa el patrón típico de resolver un nuevo vertical sin una base corporativa común. No afirma que todos estos problemas existan hoy en Soliss ni cuantifica ahorros.",
  cases:[
    {
      id:"agent", label:"Nuevo agente interno", uc:"UC1",
      goal:"Desplegar un asistente para un área corporativa usando conocimiento autorizado.",
      stillBuild:["Propósito y conversación del agente","Fuentes concretas del área","Reglas de escalado y límites","UAT, KPI y adopción"],
      reuse:["Identidad","RAG / fuentes","Model Gateway","Logging","Seguridad","Observabilidad"]
    },
    {
      id:"claim", label:"Nuevo flujo de siniestros", uc:"UC2 + UC3",
      goal:"Añadir inteligencia documental y asistencia al tramitador en un proceso concreto.",
      stillBuild:["Tipologías documentales","Modelo/reglas/señales del caso","Integración con proceso/core","UAT, assurance y KPI"],
      reuse:["Identidad","Data Mesh","Document pattern","Model Gateway","HITL","Evidence trail"]
    },
    {
      id:"admin", label:"Nueva automatización administrativa", uc:"UC2 + UC5",
      goal:"Automatizar un flujo documental/administrativo manteniendo autorizaciones y excepciones.",
      stillBuild:["Reglas reales del proceso","Integraciones ERP/sistemas","Matriz de excepciones/aprobaciones","UAT y KPI operativo"],
      reuse:["Identidad","OCR/patrón documental","Integraciones comunes","Policies","Logging","Observabilidad"]
    },
    {
      id:"future", label:"Futuro UC8 / UC9", uc:"NUEVO",
      goal:"Incorporar un caso no previsto hoy sin volver a diseñar la plataforma corporativa.",
      stillBuild:["Business case","Datos y proceso específicos","Lógica/modelo/automatización","UAT, riesgo y KPI"],
      reuse:["Clústeres","Identidad","Gobierno de datos","Gateway","Seguridad","Operación"]
    }
  ],
  stages:[
    {
      id:"ownership", title:"1 · Alcance y ownership",
      isolated:{headline:"Se vuelve a definir el marco del proyecto",plain:"Cada vertical necesita cerrar de nuevo responsables, criterios de aceptación y dependencias.",technical:"Scope, owners, RACI, controles y acceptance criteria pueden terminar definidos ad hoc por proyecto.",risk:"Mayor heterogeneidad entre verticales."},
      p0:{headline:"El UC entra por un patrón de gobierno común",plain:"El caso sigue necesitando owner y business case, pero parte de reglas y responsabilidades ya conocidas.",technical:"Plantillas de onboarding, RACI, gates, catálogo de controles y ownership P0 reducen decisiones repetidas.",benefit:"Gobierno consistente desde el inicio."}
    },
    {
      id:"identity", title:"2 · Identidad y permisos",
      isolated:{headline:"Permisos diseñados para el vertical",plain:"El proyecto debe resolver cómo autentica usuarios/servicios y qué puede ver cada uno.",technical:"Riesgo de cuentas, roles o políticas específicas por solución si no existe un plano corporativo común.",risk:"Duplicación y políticas heterogéneas."},
      p0:{headline:"Se reutiliza identidad corporativa P0",plain:"El UC declara qué roles necesita sobre un mecanismo común.",technical:"Keycloak/OIDC + RBAC/ABAC + segregación por dominio se reutilizan; el UC añade permisos funcionales.",benefit:"Una misma lógica de acceso para múltiples casos."}
    },
    {
      id:"data", title:"3 · Datos y fuentes",
      isolated:{headline:"Integraciones y copias por proyecto",plain:"Cada solución puede acabar construyendo sus propias conexiones y lógica para localizar datos.",technical:"Point-to-point integrations, copias y provenance específico elevan acoplamiento y coste operativo.",risk:"Más silos de datos e integraciones."},
      p0:{headline:"Se conectan fuentes gobernadas",plain:"El caso pide acceso a dominios/fuentes ya catalogados y con owner.",technical:"Data Mesh, clasificación, catálogo/provenance y patrones de conectores forman el plano común.",benefit:"Reutilización sin perder ownership ni trazabilidad."}
    },
    {
      id:"ai", title:"4 · Modelos y automatización",
      isolated:{headline:"Cada solución integra su IA o herramienta",plain:"El proyecto debe decidir proveedor/modelo, logging, límites, coste y fallback.",technical:"Integraciones directas a modelos/tools pueden crear Shadow AI y políticas diferentes.",risk:"Control de modelos disperso."},
      p0:{headline:"El UC consume servicios a través de P0",plain:"Los modelos y automatizaciones pasan por una puerta corporativa con reglas.",technical:"Model Gateway, allowlist, cuotas, logging, caché, fallback, RAG y servicios IA/RPA comunes.",benefit:"Control central con libertad funcional en el vertical."}
    },
    {
      id:"assurance", title:"5 · Seguridad, riesgo y compliance",
      isolated:{headline:"Los controles se vuelven a interpretar por proyecto",plain:"Cada equipo debe decidir qué pruebas y evidencias necesita.",technical:"Threat model, privacy, AI governance, HITL, auditability y third-party checks pueden variar si no hay baseline.",risk:"Evidencia difícil de comparar."},
      p0:{headline:"Se parte de controles y evidencias predefinidos",plain:"El caso hereda una base y añade lo específico según sus riesgos.",technical:"Security lenses, Evidence Registry, DORA/AI Act assessment, model passport y HITL patterns.",benefit:"Assurance-by-design en vez de añadirlo al final."}
    },
    {
      id:"operations", title:"6 · Operación y soporte",
      isolated:{headline:"Runbooks y monitorización propios",plain:"Cada solución necesita diseñar cómo se observa, mantiene y escala una incidencia.",technical:"Dashboards, logs, backup, support model y operational ownership pueden fragmentarse.",risk:"Mayor esfuerzo de operación multi-solución."},
      p0:{headline:"El vertical entra en un modelo operativo común",plain:"El UC añade sus métricas funcionales sobre una operación ya definida.",technical:"Observabilidad, evidence trail, N0–N3, IaC, runbooks, backup/restore y transfer patterns reutilizados.",benefit:"Operabilidad comparable entre casos."}
    }
  ]
};

window.P0.explainer.ucOnboarding = {
  statement:"Un nuevo caso de uso no entra directamente en producción. Entra en la Factory, reutiliza capacidades P0 y completa las decisiones/evidencias que son específicas de su finalidad.",
  steps:[
    {n:"01",title:"Idea + business case",owner:"Soliss negocio · Keedio acompaña",question:"¿Qué problema resuelve y cómo mediremos valor?",output:"Owner, objetivo, usuarios, KPI candidatos, alcance inicial."},
    {n:"02",title:"Clasificación y riesgo",owner:"Soliss + Keedio + Compliance",question:"¿Qué datos, autonomía, impacto y regulación aplican?",output:"Clasificación de datos, AI Act/DORA/privacy, HITL y risk tier."},
    {n:"03",title:"Datos y ownership",owner:"Data Owners Soliss",question:"¿Qué fuentes puede utilizar y quién responde por ellas?",output:"Fuentes, owner, permisos, calidad, sensibilidad y provenance."},
    {n:"04",title:"Patrón P0 reutilizable",owner:"Keedio arquitectura",question:"¿Qué capacidades existentes puede consumir?",output:"Identidad, Gateway, RAG/OCR/RPA, conectores, observabilidad, seguridad."},
    {n:"05",title:"Sandbox del UC",owner:"Keedio + equipo Soliss",question:"¿Funciona técnicamente con datos/control representativos?",output:"Prototipo, métricas técnicas, costes, fallos, límites y backlog."},
    {n:"06",title:"UAT + Assurance",owner:"Key users + IT + Compliance",question:"¿Es útil, seguro, explicable y operable?",output:"UAT, security tests, evidence pack, model passport, runbooks."},
    {n:"07",title:"Go-Live + monitorización",owner:"Soliss opera · Keedio N2",question:"¿Podemos operar y medir outcomes de forma continua?",output:"Release aprobado, KPI, alertas, support model y revisión periódica."}
  ],
  reusable:["Clústeres/infraestructura","Identidad y acceso","Data governance","Model Gateway","Servicios IA/RPA","Seguridad y evidencia","Observabilidad/operación"],
  vertical:["Business case","Datos/fuentes concretas","Reglas/modelo del proceso","Integraciones específicas","UX/canales","UAT y KPI de negocio","Aprobación productiva"]
};


// V4.4 — Executive Story Mode · guided Board narrative for Keedio → Soliss.
window.P0.executiveStory = {
  title:"P0 Executive Story · Consejo Soliss", totalSeconds:540, audience:"Consejo / Sponsor",
  statement:"Recorrido guiado de aproximadamente 9 minutos. Keedio presenta la lógica de P0; Soliss mantiene la decisión, validación y accountability.",
  scenes:[
    {id:"opening",duration:40,deepLink:"#hero",visual:"opening",kicker:"ESCENA 1 · TESIS",title:"No proponemos siete islas tecnológicas.",message:"Keedio propone construir una única base corporativa —P0— desde la que Soliss pueda desplegar IA y RPA con identidad, datos, modelos, seguridad, evidencia y operación bajo un mismo gobierno.",cue:"Frase a recordar",cueText:"P0 construye la capacidad. Los UC capturan el valor.",notes:["Abrir con el problema de arquitectura, no con Kubernetes.","Recalcar que Soliss conserva propiedad de infraestructura, decisiones y operación.","P0 es el único proyecto base; UC1–UC7 son desarrollos derivados."]},
    {id:"why",duration:55,deepLink:"#why",visual:"market",kicker:"ESCENA 2 · POR QUÉ AHORA",title:"El reto del sector ya no es probar GenAI. Es llevarla a producción con control.",message:"La adopción aseguradora ya es material, pero una gran parte de los casos continúa en experimentación. P0 responde precisamente al salto entre PoC y operación gobernada.",cue:"Lectura ejecutiva",cueText:"Industrializar con control es distinto de acumular pilotos.",notes:["Usar los datos EIOPA ya incluidos en la Decision Room.","No vender FOMO: presentar madurez, gobierno y control.","Conectar el principio Soliss con IA que amplifica la cercanía y el juicio humano."]},
    {id:"p0",duration:60,deepLink:"#factory",visual:"p0",kicker:"ESCENA 3 · QUÉ ES P0",title:"P0 es la base común que evita reconstruir la misma infraestructura en cada caso.",message:"Antes de hablar de agentes, fraude o facturas, P0 resuelve una vez las capacidades transversales: plataforma, identidad, datos gobernados, Model Gateway, servicios IA/RPA, seguridad, observabilidad y transferencia.",cue:"Analogía",cueText:"P0 es la cimentación y las instalaciones comunes; los UC son las estancias de negocio.",notes:["Explicarlo en lenguaje claro antes de entrar en componentes técnicos.","P0 no es un chatbot, ni un motor de fraude, ni un dashboard final.","El valor de P0 es la reutilización gobernada."]},
    {id:"stories",duration:80,deepLink:"#factory",visual:"stories",kicker:"ESCENA 4 · P0 EN ACCIÓN",title:"Tres situaciones distintas reutilizan la misma base.",message:"Un siniestro, una consulta de empleado y una factura necesitan lógica funcional diferente, pero comparten identidad, datos/fuentes, Gateway, seguridad, observabilidad y evidencia.",cue:"Demostración",cueText:"Lo repetido en las tres historias es exactamente lo que debe vivir en P0.",notes:["Usar 20–25 segundos por historia.","Siniestro: IA asiste; profesional Soliss decide.","Empleado: RAG con fuentes autorizadas y escalado.","Factura: automatización con excepciones y segregación de funciones."]},
    {id:"factory",duration:60,deepLink:"#factory",visual:"effect",kicker:"ESCENA 5 · FACTORY EFFECT",title:"Con P0, el siguiente UC se concentra en lo diferencial.",message:"La Factory no elimina el trabajo del vertical. Evita que el caso tenga que volver a diseñar identidad, gobierno, acceso a modelos, seguridad, observabilidad y operación.",cue:"Idea económica/técnica",cueText:"El esfuerzo se desplaza hacia proceso, datos, reglas, integraciones, UX y UAT.",notes:["No usar porcentajes de ahorro no medidos.","Hablar de capacidades reutilizadas y decisiones evitadas.","Introducir el futuro UC8/UC9 para demostrar que P0 no se diseña solo para la lista actual."]},
    {id:"architecture",duration:70,deepLink:"#twin",visual:"architecture",kicker:"ESCENA 6 · ARQUITECTURA Y RESILIENCIA",title:"Federación horizontal, servicios comunes verticales y fallback explícito.",message:"Rancher/RKE2 gestiona la flota; el clúster de grupo concentra servicios transversales; cada empresa/dominio conserva aislamiento. Gravitino permanece como PoC no bloqueante y el Model Gateway controla el acceso a IA.",cue:"Prueba de robustez",cueText:"La arquitectura debe seguir teniendo una respuesta cuando falla un componente.",notes:["Mostrar un fallo conceptual: Gravitino → fallback; retraso GPU → sandbox provisional.","Destacar local-first, no local-only.","Soliss compra/posee la infraestructura; Keedio diseña, integra y transfiere."]},
    {id:"economics",duration:55,deepLink:"#economics",visual:"economics",kicker:"ESCENA 7 · ECONOMICS",title:"Separar servicios Keedio de infraestructura Soliss evita confundir el TCO.",message:"La construcción y el servicio co-gestionado tienen un baseline contractual; la infraestructura productiva es una inversión directa de Soliss que se cierra tras sizing y cotización.",cue:"Mensaje financiero",cueText:"P0 se aprueba como programa de capacidad, no como una suma de siete presupuestos independientes.",notes:["Boardroom: mostrar cifras exactas del baseline Final Cerrado.","Recordar que los rangos de hardware siguen sujetos a G2 y proveedor.","No presentar el punto central de TCO como oferta cerrada."]},
    {id:"governance",duration:70,deepLink:"#governance",visual:"governance",kicker:"ESCENA 8 · GOBIERNO",title:"Una demo que funciona no equivale a un sistema listo para producción.",message:"Cada UC debe pasar por ownership, clasificación, datos, sandbox, UAT, assurance y operación. G1–G4 protegen alcance, inversión, validación técnica y transferencia.",cue:"Control",cueText:"Ready for production = valor + datos autorizados + seguridad + UAT + evidencia + operación.",notes:["Conectar DORA, AI Act, Evidence Registry y Model Passport.","Evitar afirmaciones de compliance porcentual.","Mostrar que la accountability permanece en Soliss."]},
    {id:"decision",duration:50,deepLink:"#decision",visual:"decision",kicker:"ESCENA 9 · DECISIÓN",title:"La decisión de hoy es aprobar la base y el modelo de gobierno.",message:"Keedio propone iniciar P0, cerrar F0, nombrar responsables, aprobar el sizing en G2, validar la PoC/fallback en G3 y aceptar transferencia en G4. Los UC se activan después mediante business case.",cue:"Cierre",cueText:"P0 construye la capacidad. Soliss conserva el control. Los casos de uso capturan el valor.",notes:["Cerrar con decisiones concretas, no con tecnología.","Preguntar qué condición necesita Soliss para autorizar F0.","Si surge una pregunta, usar 'Profundizar' y volver después al Story Mode."]}
  ]
};


// V5 · Public Executive Story. No economics or internal committee content.
window.P0.executiveStory.publicScenes = [
  window.P0.executiveStory.scenes[0],
  window.P0.executiveStory.scenes[1],
  window.P0.executiveStory.scenes[2],
  window.P0.executiveStory.scenes[3],
  window.P0.executiveStory.scenes[4],
  {
    id:"public-trust", duration:55, deepLink:"#assurance", visual:"publicTrust",
    kicker:"ESCENA 6 · CONFIANZA",
    title:"Industrializar IA también significa poder explicar, limitar y auditar su uso.",
    message:"La visión pública cierra con el principio de gobierno: datos autorizados, modelos controlados, trazabilidad, human oversight y una evolución por gates antes de producción.",
    cue:"Cierre público",
    cueText:"P0 crea una base reutilizable para innovar sin perder control.",
    notes:[
      "No entrar en economics ni documentación interna.",
      "Explicar que Boardroom contiene el detalle de decisión y evidencias.",
      "Cerrar ofreciendo profundizar en P0, casos de uso o assurance."
    ]
  }
];
