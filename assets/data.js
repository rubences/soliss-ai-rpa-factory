window.P0 = {
  meta: {
    title: "Soliss AI/RPA Factory · P0 Decision Room",
    proponent: "Keedio",
    client: "Soliss / Grupo Soliss",
    horizon: "24 meses base + 12 meses opcionales",
    baseline: "Final Cerrado",
    statement: "Keedio propone, diseña e integra P0; Soliss decide, adquiere la infraestructura, valida los gates y opera con transferencia progresiva."
  },
  economics: {
    build: 105786.20,
    service: 77000,
    base24: 182786.20,
    optional: 42000,
    adjustment: -338.80,
    phases: [
      {id:"F0", name:"Activación P0 y cierre de alcance", period:"M1", hours:160, rate:125, cost:20000, owner:"Keedio + Soliss", outcome:"Discovery, gobierno inicial, alcance, backlog UC y plan director definitivo."},
      {id:"F1", name:"Blueprint on-premise y sizing", period:"M1–M2", hours:220, rate:110, cost:24200, owner:"Keedio diseña · Soliss valida", outcome:"Rancher/RKE2, clústeres, red, almacenamiento, backup, seguridad y sizing."},
      {id:"F2", name:"Gobierno, DORA, Data Mesh e identidad", period:"M2", hours:180, rate:105, cost:18900, owner:"Keedio + Soliss", outcome:"Dominios, Keycloak, RBAC/ABAC, metadatos, evidencias y controles."},
      {id:"F3", name:"Sandbox, Model Gateway, RAG y Gravitino PoC", period:"M2–M3", hours:310, rate:110, cost:34100, owner:"Keedio", outcome:"Validación no bloqueante, local-first, trazabilidad, fuentes y control de acceso."},
      {id:"F4", name:"Pruebas, UAT, documentación y transferencia", period:"M3", hours:85, rate:105, cost:8925, owner:"Keedio entrega · Soliss acepta", outcome:"Pruebas, manuales, runbooks, formación y aceptación ejecutiva."}
    ],
    scenarios: [
      {id:"minimum", label:"Mínimo", low:125000, high:175000, note:"Infraestructura básica ajustada a requisitos iniciales."},
      {id:"recommended", label:"Recomendado", low:180000, high:280000, note:"Configuración robusta e industrializada para crecimiento."},
      {id:"ha", label:"Alta disponibilidad", low:300000, high:450000, note:"Redundancia y capacidad superior para criticidad/madurez."}
    ],
    infraBlocks: [
      ["Clúster gestión Rancher/RKE2","3 nodos control plane, quórum etcd, HA, TLS/CA interna",18000,30000,45000],
      ["Clúster de grupo","Keycloak, Gravitino PoC, PostgreSQL/CloudNativePG y gobierno",25000,45000,70000],
      ["Clúster empresa piloto","Plano de datos, conectores, pipelines y aislamiento por dominio",30000,55000,90000],
      ["GPU / IA local","LLM local-first, embeddings, OCR/visión y Model Gateway",20000,50000,110000],
      ["Almacenamiento / backup","MinIO/Ceph, snapshots, restore y retención",15000,35000,70000],
      ["Red / seguridad / observabilidad","VPN, segmentación, logging, monitorización y hardening",12000,30000,60000],
      ["Soporte / licencias opcionales","Rancher Prime, fabricante, garantía extendida",0,25000,70000]
    ]
  },
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
  decisions: [
    {id:"D1", title:"Aprobar P0", owner:"Consejo / Sponsor Soliss", when:"Inicio", why:"Pasar de iniciativas aisladas a plataforma gobernada.", risk:"Crecimiento por islas, Shadow AI y costes dispersos."},
    {id:"D2", title:"Nombrar responsable transversal", owner:"Soliss", when:"G1", why:"Coordinar negocio, IT, datos, seguridad y adopción.", risk:"Bloqueos de decisión y baja adopción."},
    {id:"D3", title:"Autorizar F0", owner:"Soliss", when:"Inicio", why:"Cerrar alcance, AS-IS, sizing y backlog con datos reales.", risk:"Ambigüedad técnica/económica."},
    {id:"D4", title:"Aprobar sizing e inversión", owner:"Soliss", when:"G2", why:"Activar compra de infraestructura con blueprint validado.", risk:"Infra insuficiente o compra prematura."},
    {id:"D5", title:"Go/No-Go Gravitino", owner:"Soliss + Keedio", when:"G3", why:"Mantener la PoC no bloqueante y activar fallback si procede.", risk:"Dependencia de un componente inmaduro."},
    {id:"D6", title:"Aceptar P0 y transferencia", owner:"Soliss", when:"G4", why:"Pasar a operación co-gestionada con evidencias y runbooks.", risk:"Dependencia operativa y falta de autonomía."}
  ],
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
  gates: [
    {id:"G1", when:"Semana 2", phase:"F0", title:"Alcance y responsables", checks:["Inventario AS-IS validado","Alcance y exclusiones aceptados","Backlog UC1–UC7 priorizado","Sponsor y responsable transversal nombrados","Calendario de sizing/aprovisionamiento acordado"]},
    {id:"G2", when:"Semana 6", phase:"F1–F2", title:"Blueprint e inversión", checks:["Blueprint on-premise aprobado","Sizing CPU/RAM/GPU validado","Red/segmentación definidas","Backup/DR diseñados","Rango de inversión Soliss aprobado","Enfoque DORA/AI Act revisado"]},
    {id:"G3", when:"Semana 9", phase:"F3", title:"Sandbox técnico", checks:["Keycloak/RBAC validados","Model Gateway validado","RAG y fuentes trazables","Gravitino PoC evaluado","Fallback documentado","Observabilidad y logging activos"]},
    {id:"G4", when:"Semana 12", phase:"F4", title:"UAT y transferencia", checks:["UAT firmado","Runbooks entregados","Backup/restore probado","HA/fallo de nodo probado","Formación y transferencia realizadas","Roadmap UC1–UC7 y plan S1 aceptados"]}
  ],
  evidence: [
    {id:"E1", area:"DORA", control:"Contrato TIC y responsabilidades", owner:"Soliss + Keedio + Jurídico", default:"proposal", evidence:"Anexo contractual / matriz de responsabilidades"},
    {id:"E2", area:"DORA", control:"Derecho de auditoría", owner:"Soliss + Keedio", default:"soliss", evidence:"Cláusula + acceso a logs/configuración/cambios"},
    {id:"E3", area:"DORA", control:"Exit plan", owner:"Keedio entrega · Soliss valida", default:"proposal", evidence:"Plan de transición, repositorios, credenciales y continuidad"},
    {id:"E4", area:"DORA", control:"Backup / restore / DR", owner:"Soliss IT + Keedio", default:"evidence", evidence:"Runbooks + pruebas de recuperación + RTO/RPO contractual"},
    {id:"E5", area:"DORA", control:"Pruebas de resiliencia", owner:"Soliss + Keedio", default:"evidence", evidence:"Resultados de fallo de nodo, restore y escenarios"},
    {id:"E6", area:"AI Act", control:"Clasificación del caso de uso", owner:"Soliss Compliance + Keedio", default:"soliss", evidence:"Ficha de clasificación antes de producción"},
    {id:"E7", area:"AI Act", control:"Supervisión humana", owner:"Soliss negocio + Compliance", default:"proposal", evidence:"Workflow HITL, roles y criterio de aprobación"},
    {id:"E8", area:"AI/GRC", control:"Model Gateway logging", owner:"Keedio diseña · Soliss opera", default:"proposal", evidence:"Usuario, modelo, prompt/respuesta, coste, latencia y retención"},
    {id:"E9", area:"Datos", control:"Segregación / sensibilidad / ownership", owner:"Soliss Data Owners", default:"soliss", evidence:"Catálogo de dominios, clasificación y permisos"},
    {id:"E10", area:"Terceros", control:"Registro de proveedores/subcontratas", owner:"Soliss + Jurídico", default:"soliss", evidence:"Registro de terceros TIC y dependencias"}
  ],
  passports: [
    {id:"llm", title:"LLM local principal", purpose:"Generación / razonamiento general", status:"A seleccionar y validar en F3", fields:{Proveedor:"Por seleccionar",Versión:"Por seleccionar",Licencia:"Por validar",Hosting:"On-premise / local-first",Datos:"Según clasificación y policy",Owner:"Soliss opera · Keedio diseña",Benchmark:"Pendiente G3",Seguridad:"Prompt injection / leakage / tools",Fallback:"Modelo alternativo aprobado"}},
    {id:"emb", title:"Modelo de embeddings", purpose:"Indexación y recuperación RAG", status:"A seleccionar y validar en F3", fields:{Proveedor:"Por seleccionar",Versión:"Por seleccionar",Licencia:"Por validar",Hosting:"Preferente local",Datos:"Documentos autorizados",Owner:"Soliss + Keedio",Benchmark:"Recall / latencia / coste",Seguridad:"Vector poisoning / access control",Fallback:"Índice compatible alternativo"}},
    {id:"ocr", title:"OCR / visión", purpose:"Document Intelligence", status:"A seleccionar por UC2", fields:{Proveedor:"Por seleccionar",Versión:"Por seleccionar",Licencia:"Por validar",Hosting:"Local-first según sensibilidad",Datos:"Imágenes/documentos autorizados",Owner:"Soliss + Keedio",Benchmark:"Exactitud por tipología",Seguridad:"PII / malware / ingestión",Fallback:"Pipeline OCR alternativo"}}
  ],
  risks: [
    {id:"R1", severity:"Alto", risk:"Infraestructura insuficiente o compra no alineada", control:"Sizing formal, escenarios, validación IT y G2 antes de compra.", owner:"Soliss + Keedio"},
    {id:"R2", severity:"Medio", risk:"Gravitino inmaduro para producción regulada", control:"PoC sandbox, Go/No-Go y fallback desacoplado.", owner:"Keedio"},
    {id:"R3", severity:"Alto", risk:"Exposición de datos personales o sensibles", control:"Local-first, RBAC/ABAC, sensibilidad, auditoría y HITL.", owner:"Soliss + Keedio"},
    {id:"R4", severity:"Alto", risk:"Shadow AI y costes no controlados", control:"Model Gateway único, cuotas, logging, caché, fallback y FinOps IA.", owner:"Keedio"},
    {id:"R5", severity:"Medio", risk:"Baja adopción por usuarios o áreas", control:"Gestión del cambio, champions, UAT, formación y N1/N2.", owner:"Soliss"},
    {id:"R6", severity:"Medio", risk:"Operación difícil tras la entrega", control:"Runbooks, IaC, transferencia, servicio co-gestionado y RACI.", owner:"Keedio + Soliss"},
    {id:"R7", severity:"Alto", risk:"No conformidad DORA / AI Act", control:"Compliance-by-design, clasificación, controles, logs, pruebas y evidencias.", owner:"Soliss + Keedio"},
    {id:"R8", severity:"Medio", risk:"Dependencia excesiva de proveedor", control:"On-premise, open source, repositorios, documentación y soporte separado.", owner:"Soliss"}
  ],
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
  asOf:"1 septiembre 2026",
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
