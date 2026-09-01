# Keedio → Soliss · P0 Decision Room v3

Microsite ejecutivo/técnico construido por **Keedio** para presentar a **Soliss / Grupo Soliss** el proyecto P0 de Soliss AI/RPA Factory.

## Posicionamiento de marca y responsabilidades

- **Keedio**: proponente y socio tecnológico; arquitectura, integración, gobierno técnico, sandbox, IaC, soporte especializado y transferencia.
- **Soliss**: cliente; decisión, adquisición/propiedad de infraestructura, ownership de datos, validación de gates y operación interna con transferencia progresiva.

La web evita el lenguaje ambiguo de “Keedio × Soliss” como si ambas partes fueran el mismo proponente.

## Funciones v3

- Vistas **Consejo / Tecnología / Compliance / Completa**.
- Decision Room con seis decisiones ejecutivas.
- Benchmark asegurador EIOPA 2026 y contexto público Soliss.
- Digital Twin conceptual con escenarios: normal, Gravitino no-go, retraso GPU, fallo de nodo, Shadow AI y acceso cross-domain.
- Lenses de Arquitectura, Security, Data, DORA y AI Act.
- Use Case Factory UC1–UC7 con hipótesis editables; se guardan solo en `localStorage`.
- Economics Lab con escenarios de infraestructura y opción M25–M36.
- Evidence Registry con estados de propuesta/evidencia, sin afirmar porcentajes de cumplimiento.
- Model Passport y Data Provenance Explorer.
- Gate Simulator G1–G4 y Risk Register.
- Modo presentación fullscreen.
- PWA/offline mediante Service Worker.
- **0 dependencias runtime externas**: sin CDN, Google Fonts, analytics, cookies ni tracking.

## Baseline económico usado

Se adopta el baseline **Final Cerrado**:

- Construcción P0 F0–F4: **detalle protegido en Boardroom**.
- Servicio co-gestionado M3–M24: **detalle protegido en Boardroom**.
- Total Keedio M1–M24: **detalle protegido en Boardroom**.
- Año opcional M25–M36: **detalle protegido en Boardroom**.
- Infraestructura Soliss: escenarios orientativos, compra directa y cierre tras sizing G2.

La reconciliación exacta del baseline económico se mantiene exclusivamente en el bundle privado Boardroom.

## Fuentes públicas incorporadas

La web enlaza, sin realizar llamadas en tiempo de ejecución, a:

- EIOPA · Generative AI Market Survey, publicado el 2 de febrero de 2026.
- EIOPA · Supervisory Priorities 2026: DORA como Focus Area.
- EU AI Act Service Desk · Annex III y ejemplos de insurance risk assessment/pricing.
- EUR-Lex · DORA Regulation (EU) 2022/2554.
- Soliss · Historia / implantación territorial.

## Ejecutar localmente

```bash
python -m http.server 8000
```

Abrir `http://localhost:8000`.

> El Service Worker solo se registra sobre HTTP/HTTPS, no al abrir `file://` directamente.

## GitHub Pages

El sitio no requiere compilación. Técnicamente puede publicarse desde `main` → `/ (root)`.

**Importante:** esta versión contiene importes, arquitectura, riesgos y responsabilidades y debe considerarse **boardroom/confidencial** hasta autorización de Keedio y Soliss. El `robots.txt` incluido bloquea indexación de crawlers, pero eso **no convierte un hosting público en privado**.


## V3.1 — Document Center y Committee Toolkit

Esta build añade:

- Centro Documental **Keedio → Soliss** con 6 familias documentales y 8 archivos.
- Descarga individual por formato y pack completo.
- Etiquetas para distinguir baseline, Consejo, técnico y económico.
- Manifest SHA‑256 en JSON/TXT.
- Exportación local de **acta preliminar** Markdown.
- Exportación local de **snapshot de decisión** JSON con economics, UC ranking, gates y Evidence Registry.
- Impresión/guardado a PDF desde el navegador.
- Reset explícito de los datos locales de la sesión.
- Service Worker mejorado: los documentos descargados se cachean bajo demanda.

### Confidencialidad

Esta es una **Boardroom build**. Si se publica esta carpeta en un hosting público, los documentos incluidos en `/documents` serán también públicos y descargables. `robots.txt` evita indexación cooperativa, pero **no es control de acceso**.

Para una URL pública se recomienda generar una build separada sin documentación confidencial ni importes sensibles.


## V4.0 · Soliss Corporate + Insurance AI Assurance

- Identidad visual reforzada con magenta SOLISS `#FF006A` muestreado del wordmark suministrado.
- Logotipos Soliss y Keedio integrados localmente.
- Soliss DNA y narrativa de transformación alineada con cercanía y territorio.
- Supervisory Radar 2026: DORA, claims digitalisation, AI Act transparency y EIOPA AI Opinion.
- AI Act operational timeline.
- EIOPA six-pillar Insurance AI Assurance.
- DORA Board Lens 2026.
- Claims Assurance Pack concept.
- ISO/IEC 42001 PDCA alignment (sin afirmar certificación).
- AI Literacy Passport por rol.
- Agentic Safety Gate basado en referencias OWASP.
- Data Sovereignty Matrix.
- Value Measurement Blueprint + descarga CSV.
- Gate Deliverable Matrix.
- Responsibility Explorer RACI.
- Executive Q&A / objection navigator.
- Changelog versionado.
- Working templates descargables en Document Center.
- Build Boardroom + generador de build Public sanitizada.


## V4.1 — P0 explicado para audiencias no técnicas

Se añade una capa pedagógica basada en el alcance del Plan Director Final Cerrado:

- P0 en 60 segundos: definición, objetivo, analogía y límites.
- 8 bloques de P0 explicados en lenguaje claro y detalle técnico.
- Flujo común de 7 pasos: identidad → datos → Gateway → servicio → HITL → evidencia.
- Glosario sin jerga para RKE2, Model Gateway, RAG, Data Mesh, Gravitino PoC, HITL y observabilidad.
- Explorador UC1–UC7 con: pregunta de negocio, qué deja P0, qué se desarrolla después, usuarios, ejemplo ilustrativo, papel humano y exclusiones.
- La priorización cuantitativa queda como vista avanzada para workshop.

Los ejemplos se presentan expresamente como ilustrativos y no amplían el alcance contractual.


## V4.2 — Historias visuales P0 / UC
Tres historias interactivas: siniestro (UC2+UC3), empleado (UC1) y factura (UC2+UC5). Cada paso separa P0 común, UC derivado, papel humano Soliss y evidencia. Incluye reproducción automática y matriz de reutilización.


## V4.3 — Factory Effect y onboarding de futuros UC

- Comparador cualitativo **vertical aislado vs. P0 operativo**.
- Selector para agente interno, siniestros, administración y futuro UC8/UC9.
- Seis dimensiones: ownership, identidad, datos, modelos, assurance y operación.
- Recuento explícito de capacidades P0 reutilizadas, sin convertirlo en una métrica ficticia de ahorro.
- Onboarding de 7 pasos para futuros casos: business case → clasificación → datos → patrón P0 → sandbox → UAT/assurance → go-live.
- Descarga del `UC Onboarding Canvas` en CSV.
- Materiales explicativos incorporados al Document Pack.

La comparación no describe de forma categórica el AS-IS de Soliss: representa el patrón típico de construir verticales sin una base común.


## V4.4 — Executive Story Mode
Recorrido guiado de ~9 minutos con 9 escenas, autoplay, cronómetros, notas, pausa Q&A, deep dive y reanudación. Incluye guion y Run of Show en Document Center.


## V5.0 — Unified Public + Boardroom

V5 reemplaza las dos builds independientes por **una única aplicación**.

Al acceder, el usuario elige:

- **Visión pública**: contenido explicativo, casos de uso, historias, Factory Effect y assurance.
- **Boardroom**: Decision Room completa con economics, arquitectura detallada, governance, delivery y documentos.

### Ventajas
- una única base de código;
- no hay divergencia funcional entre dos webs;
- navegación mucho más limpia;
- Story Mode adaptativo: ~6 min Public / ~9 min Boardroom;
- URLs compartibles por vista;
- cambio de acceso desde la cabecera;
- selección recordada durante la sesión.

### Importante
La selección Public/Boardroom es una separación de UX, no autenticación. Consulte `SECURITY_DEPLOYMENT.md` antes de publicar externamente.


## V6.0 — Operational Product Layer

V6 convierte la propuesta digital en un portal operativo:

- bundle público y bundle Boardroom físicamente separados;
- OIDC Authorization Code + PKCE preparado para Keycloak;
- `/private` diseñado para protección adicional en reverse proxy/hosting;
- P0 Copilot local sin LLM externo;
- Command Palette `Ctrl/Cmd + K`;
- Live Decision Board y Decision Readiness (no compliance);
- provenance universal: CONTRACTUAL / ESTIMACIÓN / HIPÓTESIS / EXTERNO;
- Source Freshness con fecha de verificación;
- Control Traceability Graph;
- contratos de capacidades P0 por UC;
- UC → KPI → Evidence;
- modo Presentación, escala tipográfica, alto contraste y reduced motion;
- QR público bajo demanda;
- One Page Executive Brief PDF/HTML;
- comparador de versiones.

### Prueba local Boardroom

Para que `fetch()` pueda leer el bundle privado, sirva la carpeta por HTTP:

```bash
python -m http.server 8000
```

y abra `http://localhost:8000/`.

En localhost, `allowLocalDemo=true` permite revisar Boardroom sin fingir un SSO productivo. Fuera de localhost, si `auth.enabled=false`, V6 bloquea el acceso Boardroom.


## V6.1 — Acceso directo Boardroom

Para simplificar la demo/reunión se ha activado un login directo:

- Usuario: `soliss`
- Contraseña: `soliss`

La sesión se guarda únicamente en `sessionStorage`.

Este mecanismo es una barrera de acceso de interfaz, no autenticación fuerte. Para producción real sigue disponible la integración Keycloak/OIDC preparada en V6.
