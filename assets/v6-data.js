window.V6_DATA={
  "verifiedOn": "2026-09-02",
  "sources": [
    {
      "id": "EIOPA-GENAI",
      "title": "EIOPA · Generative AI Market Survey",
      "url": "https://www.eiopa.europa.eu/publications/generative-ai-market-survey-outlook-use-cases-and-risk-management_en",
      "type": "external",
      "verified": "2026-09-02",
      "reviewDays": 90,
      "supports": "347 aseguradoras / 25 países; adopción GenAI y madurez PoC→producción."
    },
    {
      "id": "EIOPA-2026",
      "title": "EIOPA · Supervisory priorities 2026",
      "url": "https://www.eiopa.europa.eu/publications/union-wide-strategic-supervisory-priorities-focus-areas-2026_en",
      "type": "external",
      "verified": "2026-09-02",
      "reviewDays": 90,
      "supports": "DORA como Focus Area y claims management/digitalisation como Area for Attention."
    },
    {
      "id": "EU-ACT50",
      "title": "Comisión Europea · AI Act Article 50 transparency guidelines",
      "url": "https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems",
      "type": "external",
      "verified": "2026-09-02",
      "reviewDays": 60,
      "supports": "Obligaciones de transparencia aplicables desde 2 agosto 2026."
    },
    {
      "id": "ISO-42001",
      "title": "ISO · ISO/IEC 42001:2023",
      "url": "https://www.iso.org/es/norma/42001",
      "type": "external",
      "verified": "2026-09-02",
      "reviewDays": 180,
      "supports": "AIMS y ciclo de mejora continua para gestión responsable de IA."
    },
    {
      "id": "OWASP-PI",
      "title": "OWASP GenAI · LLM01 Prompt Injection",
      "url": "https://genai.owasp.org/llmrisk/llm01-prompt-injection/",
      "type": "external",
      "verified": "2026-09-02",
      "reviewDays": 90,
      "supports": "Prompt injection, least privilege, HITL y testing adversarial."
    },
    {
      "id": "OWASP-EA",
      "title": "OWASP GenAI · LLM06 Excessive Agency",
      "url": "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/",
      "type": "external",
      "verified": "2026-09-02",
      "reviewDays": 90,
      "supports": "Riesgo de agencia excesiva en sistemas con herramientas/acciones."
    },
    {
      "id": "EIOPA-CONSUMER-2025",
      "title": "EIOPA · Eurobarometer 2025 consumer trends",
      "url": "https://www.eiopa.europa.eu/tools-and-data/eurobarometer-2025-consumer-trends-insurance-and-pension-services_en",
      "type": "external",
      "verified": "2026-09-02",
      "reviewDays": 120,
      "supports": "62% satisfacción con claims handling y 30% confianza en recomendaciones de agentes IA."
    },
    {
      "id": "EU-AIACT-TIMELINE",
      "title": "Comisión Europea · AI Act implementation timeline",
      "url": "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
      "type": "external",
      "verified": "2026-09-02",
      "reviewDays": 60,
      "supports": "Aplicación general 2 Aug 2026; Annex III 2 Dec 2027; Annex I 2 Aug 2028 tras AI Omnibus."
    }
  ],
  "ucContracts": {
    "UC1": {
      "identity": "required",
      "data": "required",
      "gateway": "required",
      "rag": "required",
      "documentAI": "optional",
      "rpa": "optional",
      "gpu": "depends",
      "hitl": "required",
      "audit": "required",
      "integration": "depends"
    },
    "UC2": {
      "identity": "required",
      "data": "required",
      "gateway": "depends",
      "rag": "optional",
      "documentAI": "required",
      "rpa": "depends",
      "gpu": "depends",
      "hitl": "required",
      "audit": "required",
      "integration": "required"
    },
    "UC3": {
      "identity": "required",
      "data": "required",
      "gateway": "required",
      "rag": "depends",
      "documentAI": "depends",
      "rpa": "optional",
      "gpu": "depends",
      "hitl": "required",
      "audit": "required",
      "integration": "required"
    },
    "UC4": {
      "identity": "required",
      "data": "required",
      "gateway": "depends",
      "rag": "optional",
      "documentAI": "optional",
      "rpa": "optional",
      "gpu": "depends",
      "hitl": "required",
      "audit": "required",
      "integration": "required"
    },
    "UC5": {
      "identity": "required",
      "data": "required",
      "gateway": "depends",
      "rag": "optional",
      "documentAI": "required",
      "rpa": "required",
      "gpu": "optional",
      "hitl": "required",
      "audit": "required",
      "integration": "required"
    },
    "UC6": {
      "identity": "required",
      "data": "required",
      "gateway": "required",
      "rag": "required",
      "documentAI": "optional",
      "rpa": "depends",
      "gpu": "optional",
      "hitl": "required",
      "audit": "required",
      "integration": "required"
    },
    "UC7": {
      "identity": "required",
      "data": "required",
      "gateway": "required",
      "rag": "depends",
      "documentAI": "depends",
      "rpa": "depends",
      "gpu": "depends",
      "hitl": "required",
      "audit": "required",
      "integration": "required"
    }
  },
  "capabilityLabels": {
    "identity": "Identidad",
    "data": "Datos gobernados",
    "gateway": "Model Gateway",
    "rag": "RAG",
    "documentAI": "Document AI",
    "rpa": "RPA/workflow",
    "gpu": "GPU local",
    "hitl": "Human-in-the-loop",
    "audit": "Audit trail",
    "integration": "Integraciones"
  },
  "kpiEvidence": {
    "UC1": [
      "Utilidad percibida",
      "Tasa de respuestas con fuente",
      "Escalados humanos",
      "Groundedness / calidad RAG"
    ],
    "UC2": [
      "Exactitud de extracción",
      "Tiempo manual/documento",
      "% excepciones",
      "Straight-through processing"
    ],
    "UC3": [
      "Cycle time",
      "False positives",
      "Overrides humanos",
      "Tiempo de revisión"
    ],
    "UC4": [
      "Tiempo de preparación de dataset",
      "Cobertura lineage",
      "Reutilización de dominio",
      "Calidad de datos"
    ],
    "UC5": [
      "% automatización asistida",
      "Excepciones",
      "Tiempo de ciclo",
      "Errores de conciliación"
    ],
    "UC6": [
      "MTTR",
      "% runbooks asistidos",
      "Escalados N2",
      "Acciones bloqueadas por policy"
    ],
    "UC7": [
      "Tiempo onboarding entidad",
      "Controles reutilizados",
      "Incidencias segregación",
      "Capacidades compartidas"
    ]
  },
  "traces": {}
};
