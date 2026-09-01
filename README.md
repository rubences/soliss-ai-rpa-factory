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

- Construcción P0 F0–F4: **105.786,20 €**.
- Servicio co-gestionado M3–M24: **77.000 €**.
- Total Keedio M1–M24: **182.786,20 €**.
- Año opcional M25–M36: **42.000 €**.
- Infraestructura Soliss: escenarios orientativos, compra directa y cierre tras sizing G2.

La web no suma de nuevo 20.000 € de activación sobre 105.786,20 €, porque F0 ya forma parte del total de construcción Final Cerrado.

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
