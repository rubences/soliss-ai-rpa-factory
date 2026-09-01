window.SOLISS_DATA = {
  baseline: {
    horizonBase: 24,
    horizonOptional: 12,
    keedioBuild: 105786.20,
    keedioService: 77000,
    keedio24: 182786.20,
    optionalS2: 42000
  },
  phases: [
    {id:"F0", name:"Activación P0 y cierre de alcance", period:"M1", hours:160, rate:125, cost:20000, type:"CAPEX", result:"Discovery, gobierno inicial, alcance, backlog UC y plan director definitivo."},
    {id:"F1", name:"Blueprint on-premise y sizing de infraestructura", period:"M1–M2", hours:220, rate:110, cost:24200, type:"CAPEX", result:"Rancher/RKE2, clústeres, red, almacenamiento, backup, seguridad y adquisición Soliss."},
    {id:"F2", name:"Gobierno, DORA, Data Mesh e identidad", period:"M2", hours:180, rate:105, cost:18900, type:"CAPEX", result:"Dominios, Keycloak, RBAC/ABAC, metadatos, evidencias y controles."},
    {id:"F3", name:"Sandbox, Model Gateway, RAG y Gravitino PoC", period:"M2–M3", hours:310, rate:110, cost:34100, type:"CAPEX", result:"Validación técnica no bloqueante, local-first, trazabilidad, fuentes y seguridad de acceso."},
    {id:"F4", name:"Pruebas, UAT, documentación, transferencia y cierre", period:"M3", hours:85, rate:105, cost:8925, type:"CAPEX", result:"Plan de pruebas, manuales, runbooks, formación y aceptación ejecutiva."}
  ],
  adjustment: -338.80,
  scenarios: [
    {id:"minimum", label:"Mínimo", low:125000, high:175000, description:"Infraestructura básica ajustada a requisitos iniciales."},
    {id:"recommended", label:"Recomendado", low:180000, high:280000, description:"Configuración robusta e industrializada para crecimiento."},
    {id:"ha", label:"Alta disponibilidad", low:300000, high:450000, description:"Redundancia y alta capacidad para madurez y criticidad superior."}
  ],
  infraBlocks: [
    {name:"Clúster gestión Rancher/RKE2", detail:"3 nodos control plane, quórum etcd, HA, TLS/CA interna", min:18000, base:30000, max:45000},
    {name:"Clúster de grupo", detail:"Keycloak, Gravitino PoC, PostgreSQL/CloudNativePG y gobierno", min:25000, base:45000, max:70000},
    {name:"Clúster empresa piloto", detail:"Plano de datos, conectores, pipelines y aislamiento por dominio", min:30000, base:55000, max:90000},
    {name:"GPU / IA local", detail:"LLM local-first, embeddings, OCR/visión y Model Gateway", min:20000, base:50000, max:110000},
    {name:"Almacenamiento / backup", detail:"MinIO/Ceph, snapshots, restore y retención", min:15000, base:35000, max:70000},
    {name:"Red / seguridad / observabilidad", detail:"VPN, segmentación, logging, monitorización y hardening", min:12000, base:30000, max:60000},
    {name:"Soporte / licencias opcionales", detail:"Rancher Prime, fabricante, garantía extendida", min:0, base:25000, max:70000}
  ],
  useCases: [
    {id:"UC1", name:"Agentes conversacionales corporativos", enable:"Backlog, arquitectura, permisos y patrón RAG gobernado.", later:"Agentes finales por área y despliegue masivo."},
    {id:"UC2", name:"Document Intelligence e imagen", enable:"Patrón de ingesta, OCR/visión, metadatos y validación.", later:"Automatización productiva por tipología documental."},
    {id:"UC3", name:"Producción, siniestros y fraude", enable:"Seguridad, datos, explicabilidad y scoring asistido.", later:"Scoring/motor productivo y reglas finales por ramo."},
    {id:"UC4", name:"Analítica, actuarial y gestión", enable:"Data Mesh, catálogo, acceso y base analítica.", later:"Modelos actuariales, tarificación y cuadros finales."},
    {id:"UC5", name:"Administración, contabilidad e inversiones", enable:"Integración y gobierno documental/contable.", later:"Flujos completos ERP, compras, facturas e inversiones."},
    {id:"UC6", name:"IT, ciberseguridad y soporte técnico", enable:"Observabilidad, logs, soporte y patrón de agente IT.", later:"SOC/agente definitivo y automatizaciones productivas."},
    {id:"UC7", name:"Extensión Grupo Soliss", enable:"Multitenancy, identidad y separación por empresa.", later:"Despliegue funcional por entidad bajo Go/No-Go."}
  ],
  tobe: {
    asis: [
      ["n8n / RPA","Flujos y automatizaciones existentes."],
      ["Open WebUI / Ollama","Capacidades locales ya operativas."],
      ["Automatizaciones departamentales","Soluciones aisladas por área."],
      ["Conocimiento disperso","Integraciones y datos no gobernados de forma común."],
      ["Gobierno limitado","Escalabilidad, trazabilidad y control heterogéneos."]
    ],
    transition: [
      ["P0 como base","Plataforma crítica on-premise gobernada."],
      ["Rancher / RKE2","Gestión de flota y clústeres por dominio/empresa."],
      ["Keycloak / RBAC / ABAC","Identidad, permisos y segregación."],
      ["Model Gateway","Uso de modelos bajo control corporativo."],
      ["Data Mesh + lago","Gobierno, ownership, sensibilidad y acceso."],
      ["Gravitino PoC","Catalogación/federación no bloqueante."],
      ["HA / Backup / DR","Resiliencia, hardening y recuperación."]
    ],
    tobe: [
      ["Plataforma federada","Escala horizontal sin mezclar dominios."],
      ["Servicios IA/RPA gobernados","RAG, Document Intelligence, n8n y APIs."],
      ["Observabilidad end-to-end","Métricas, logs, coste, SLA y auditoría."],
      ["UC1–UC7 derivados","Activación por business case y valor de negocio."],
      ["Autonomía progresiva","Runbooks, N1 interno y soporte N2/N3 co-gestionado."]
    ]
  },
  architecture: {
    channels:{title:"Usuarios y canales", layer:"Acceso", owner:"Soliss", decision:"Perfiles, canales y casos autorizados definidos antes de UAT.", detail:"Empleados, agentes, IT, Dirección y RRHH consumen servicios según rol y dominio."},
    identity:{title:"Identidad corporativa", layer:"Gobierno", owner:"Soliss + Keedio", decision:"SSO/RBAC/ABAC, segregación y política de acceso validados en G3.", detail:"Keycloak, OIDC y potencial integración LDAP/AD para evitar identidades paralelas."},
    gateway:{title:"Model Gateway", layer:"IA", owner:"Keedio diseña / Soliss opera", decision:"Componente obligatorio para reducir Shadow AI.", detail:"Control de modelos, cuotas, coste, latencia, logs, caché, fallback y aprobación de uso."},
    governance:{title:"Gobierno y cumplimiento", layer:"GRC", owner:"Soliss Compliance + Keedio", decision:"Controles y evidencias se validan en G2–G4.", detail:"DORA, AI Act, auditoría, trazabilidad, human-in-the-loop y clasificación de casos sensibles."},
    management:{title:"Clúster de gestión", layer:"Kubernetes", owner:"Soliss infra / Keedio integración", decision:"Sizing desde F0 y blueprint cerrado en G2.", detail:"RKE2 dedicado + Rancher para gestión de flota, ciclo de vida, políticas y operación central."},
    group:{title:"Clúster de grupo", layer:"Servicios transversales", owner:"Soliss infra / Keedio arquitectura", decision:"Definir HA, backup, restore y fallback.", detail:"Keycloak, CloudNativePG/PostgreSQL, Gravitino PoC, catálogo, metadatos y servicios comunes."},
    solissInfra:{title:"Infraestructura Soliss", layer:"CPD", owner:"Soliss", decision:"Compra directa tras sizing G2 y cotización.", detail:"Servidores, red, GPU, almacenamiento, backup, soporte y potenciales licencias."},
    aiServices:{title:"Servicios IA/RPA", layer:"Aplicación", owner:"Keedio + Soliss", decision:"Patrones habilitadores dentro de P0; verticales productivas fuera de P0.", detail:"RAG gobernado, Document Intelligence, n8n, APIs, conectores y orquestación."},
    observability:{title:"Observabilidad", layer:"Operación", owner:"Keedio + Soliss", decision:"S1 debe incluir transferencia y SLA contractual.", detail:"Métricas, logs, coste, auditoría, paneles, alertas y evidencias."},
    dataMesh:{title:"Data Mesh federado + lago gobernado", layer:"Datos", owner:"Data Owners + IT", decision:"Separación por empresa, ownership y sensibilidad definidos por dominio.", detail:"Catálogo horizontal, trazabilidad, calidad, clasificación y acceso controlado al lago."}
  },
  domains:[
    {name:"RKE2 Empresa A",sub:"dominio de datos propio"},
    {name:"RKE2 Empresa B",sub:"dominio de datos propio"},
    {name:"RKE2 Empresa C",sub:"dominio de datos propio"},
    {name:"RKE2 futuras empresas",sub:"alta progresiva"}
  ],
  techDecisions:[
    {title:"Gravitino = PoC no bloqueante",tag:"G3",text:"No se convierte en dependencia productiva obligatoria hasta superar benchmark, estabilidad y operabilidad.",tone:"purple"},
    {title:"Fallback desacoplado",tag:"Resiliencia",text:"Catálogo/metastore estándar con APIs documentadas y acoplamiento reducido para evitar SPOF tecnológico.",tone:"blue"},
    {title:"Local-first",tag:"Datos",text:"Procesamiento local, control de acceso, sensibilidad y auditabilidad para información corporativa y regulada.",tone:"green"},
    {title:"Model Gateway único",tag:"FinOps IA",text:"Cuotas, logging, caché, coste, latencia, políticas y fallback para reducir Shadow AI.",tone:"amber"},
    {title:"HA + Backup + DR",tag:"Continuidad",text:"Pruebas de restore, fallo de nodo y recuperación antes de considerar producción crítica.",tone:"red"},
    {title:"Repositorios e IaC",tag:"Transferencia",text:"Código, manifiestos, scripts, versiones y documentación como entregables para reducir dependencia.",tone:"cyan"}
  ],
  journey:[
    {n:"1",title:"Construcción P0",period:"M1–M3",amount:"105.786,20 €",type:"CAPEX potencial",text:"Activación, blueprint, gobierno, sandbox, pruebas y transferencia."},
    {n:"2",title:"Servicio co-gestionado",period:"M3–M24",amount:"77.000 €",type:"OPEX",text:"Soporte, gobierno, observabilidad, control económico y evolución."},
    {n:"3",title:"Año opcional",period:"M25–M36",amount:"42.000 €",type:"OPEX opcional",text:"Continuidad, madurez y evolución si Soliss decide activarlo."}
  ],
  gates:[
    {id:"G1",when:"Semana 2",phase:"F0",title:"Alcance y responsables",criteria:"Inventario AS-IS, alcance, exclusiones, backlog UC1–UC7 y responsables aceptados."},
    {id:"G2",when:"Semana 6",phase:"F1–F2",title:"Blueprint + inversión",criteria:"Sizing, arquitectura, inversión Soliss, Data Mesh y enfoque DORA/AI Act aprobados."},
    {id:"G3",when:"Semana 9",phase:"F3",title:"Sandbox técnico",criteria:"Keycloak, Model Gateway, RAG, Gravitino PoC, observabilidad y acceso validados."},
    {id:"G4",when:"Semana 12",phase:"F4",title:"UAT y transferencia",criteria:"Runbooks, manuales, formación, cierre P0 y roadmap UC1–UC7 aceptados."}
  ],
  roadmap:[
    {name:"F0 Activación P0",start:1,end:1,type:"build",owner:"Keedio + Soliss"},
    {name:"F1–F4 Construcción P0",start:1,end:3,type:"build",owner:"Keedio + Soliss"},
    {name:"Infraestructura Soliss",start:1,end:6,type:"build",owner:"Soliss IT / Compras"},
    {name:"Servicio co-gestionado",start:3,end:24,type:"run",owner:"Keedio + Soliss"},
    {name:"Onboarding UC1–UC7",start:4,end:24,type:"run",owner:"Business cases"},
    {name:"Gobierno / DORA / AI Act",start:1,end:24,type:"governance",owner:"Comité"},
    {name:"Año opcional S2",start:25,end:36,type:"run",owner:"Opcional"}
  ],
  support:[
    {level:"N0",title:"Usuario / key user",owner:"Soliss",scope:"Uso funcional, dudas básicas, feedback y validación UAT.",result:"Adopción controlada."},
    {level:"N1",title:"Operación interna",owner:"Soliss con transferencia Keedio",scope:"Incidencias simples, paneles y ejecución de runbooks.",result:"Autonomía progresiva."},
    {level:"N2",title:"Soporte especializado",owner:"Keedio",scope:"Kubernetes, Model Gateway, RAG, metadatos, seguridad y debugging.",result:"Continuidad y reducción de riesgo."},
    {level:"N3",title:"Fabricantes / comunidad",owner:"Soliss/Keedio según contrato",scope:"Rancher/SUSE, hardware, red, almacenamiento y backup.",result:"SLA externo si se contrata."}
  ],
  change:[
    {profile:"Sponsor ejecutivo Soliss",responsibility:"Priorizar, desbloquear decisiones, aceptar gates y comunicar valor.",dedication:"2–4 h/mes"},
    {profile:"Responsable interno AI/RPA Factory",responsibility:"Liderar negocio-tecnología, coordinación y adopción.",dedication:"30–50% M1–M3; 15–25% M4–M24"},
    {profile:"Responsable infraestructura Soliss",responsibility:"CPD, red, servidores, almacenamiento, backup y soporte base.",dedication:"20–40% M1–M3; 10–20% posterior"},
    {profile:"Responsable datos/gobierno",responsibility:"Ownership, sensibilidad, calidad y acceso por dominio.",dedication:"15–30% M1–M3"},
    {profile:"Key users negocio",responsibility:"Necesidades, UAT, manuales y casos derivados.",dedication:"Sesiones por sprint"},
    {profile:"Keedio PM / Arquitecto",responsibility:"Dirección, arquitectura, riesgos, coordinación y entregables.",dedication:"Incluido"},
    {profile:"Keedio Data/AI Engineer",responsibility:"Gateway, RAG, metadatos, pipelines y pruebas.",dedication:"Incluido"},
    {profile:"Keedio Infra/Sec Engineer",responsibility:"RKE2, seguridad, IaC, observabilidad y runbooks.",dedication:"Incluido"}
  ],
  raci:[
    ["Alcance y priorización","A/R","C","C","R","I"],
    ["Sizing infraestructura","A","R","C","R","C"],
    ["Arquitectura Rancher/RKE2","C","A/R","C","R","I"],
    ["Gobierno datos/seguridad","A/R","R","R","C","C"],
    ["RAG / Model Gateway","C","A/R","C","R","C"],
    ["UAT y adopción","A/R","C","R","C","R"],
    ["Operación N1/N2","A/R","R","C","R","I"]
  ],
  tests:[
    {type:"Funcional",coverage:"Roles, empresas, canales, límites de P0 y casos derivados.",evidence:"Casos UAT firmados"},
    {type:"Integración",coverage:"APIs, conectores, n8n, Open WebUI/Ollama, lago, Keycloak y Gateway.",evidence:"Logs, resultados y actas"},
    {type:"Seguridad",coverage:"RBAC/ABAC, segregación, trazabilidad, hardening, TLS, secretos y backup.",evidence:"Checklists y evidencias"},
    {type:"Rendimiento",coverage:"Latencia, concurrencia, GPU, RAG, embeddings, observabilidad y coste/petición.",evidence:"Métricas y umbrales"},
    {type:"Resiliencia",coverage:"Backup/restore, HA, fallo de nodo, recuperación y DR.",evidence:"Pruebas de recuperación"},
    {type:"Aceptación",coverage:"Criterios G1–G4, manuales, runbooks y transferencia.",evidence:"Acta de cierre G4"}
  ],
  deliverables:[
    {type:"General",name:"Plan de proyecto",content:"Cronograma, recursos, riesgos, hitos, metodología, RACI y gates."},
    {type:"General",name:"Informes de avance",content:"Estado, desviaciones, decisiones, dependencias y acciones correctivas."},
    {type:"General",name:"Journey + Economics",content:"CAPEX/OPEX, inversiones, fases, gates y continuidad."},
    {type:"General",name:"Gestión del cambio",content:"Adopción, formación, perfiles, comunicación y soporte usuario."},
    {type:"General",name:"Informe de cierre",content:"Aceptación, lecciones aprendidas y roadmap UC1–UC7."},
    {type:"Técnico",name:"Especificaciones funcionales",content:"Qué debe hacer P0 por perfiles, empresas y dominios."},
    {type:"Técnico",name:"Especificaciones técnicas",content:"Arquitectura, APIs, identidad, datos, modelos, red, seguridad y operación."},
    {type:"Técnico",name:"Diseños de solución",content:"Diagramas, flujos, Kubernetes, Data Mesh y servicios verticales."},
    {type:"Calidad",name:"Plan de pruebas",content:"Casos, cobertura, UAT, regresión, continuidad y evidencias."},
    {type:"Técnico",name:"Código / IaC",content:"Repositorios, manifiestos, scripts, versiones y trazabilidad."},
    {type:"Operación",name:"Manual técnico / runbooks",content:"Instalación, configuración, backup, restore, monitorización y N1/N2."},
    {type:"Usuario",name:"Manual de usuario",content:"Roles, acceso, buenas prácticas, soporte y límites de IA."}
  ],
  risks:[
    {id:"R1",severity:"Alto",risk:"Infraestructura insuficiente o compra no alineada",control:"Sizing formal, opciones por escenario, validación IT y G2 antes de compra.",owner:"Soliss + Keedio"},
    {id:"R2",severity:"Medio",risk:"Gravitino inmaduro para producción regulada",control:"PoC sandbox no bloqueante, Go/No-Go y no dependencia crítica inicial.",owner:"Keedio"},
    {id:"R3",severity:"Alto",risk:"Exposición de datos personales o sensibles",control:"Local-first, RBAC/ABAC, Keycloak, sensibilidad, auditoría y HITL.",owner:"Soliss + Keedio"},
    {id:"R4",severity:"Alto",risk:"Shadow AI y costes no controlados",control:"Model Gateway único, cuotas, logging, caché, fallback y FinOps IA.",owner:"Keedio"},
    {id:"R5",severity:"Medio",risk:"Baja adopción por usuarios o negocio",control:"Gestión del cambio, champions, formación, UAT, manuales y N1/N2.",owner:"Soliss"},
    {id:"R6",severity:"Medio",risk:"Operación difícil tras la entrega",control:"Runbooks, IaC, transferencia, soporte co-gestionado y RACI.",owner:"Keedio + Soliss"},
    {id:"R7",severity:"Alto",risk:"No conformidad DORA / AI Act",control:"Compliance-by-design, registro, controles, logs, pruebas y evidencias.",owner:"Soliss + Keedio"},
    {id:"R8",severity:"Medio",risk:"Dependencia excesiva de proveedor",control:"On-premise, open source, repositorios, documentación y soporte separado.",owner:"Soliss"}
  ]
};