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
