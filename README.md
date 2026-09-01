# Keedio × Soliss — AI/RPA Factory · Plan Director P0

Sitio estático consolidado a partir de tres infografías HTML de la propuesta. La información repetida se ha unificado y las cifras contractuales se separan de las proyecciones.

## Contenido

- Resumen ejecutivo y KPIs.
- TCO base, fases, horas, escenarios de hardware y tramos de pago.
- Roadmap M1–M36 y Gates G1–G4.
- Arquitectura Rancher/RKE2, gobierno, Model Gateway/RAG, Gravitino y sizing GPU.
- Catálogo UC1–UC7 con riesgos de adopción.
- DORA, EU AI Act, gobierno y matriz de riesgos.
- Proyección de ROI, ahorro y madurez.
- Seis condiciones para aprobación ejecutiva.

## Estructura

```text
.
├── index.html
├── 404.html
├── .nojekyll
├── robots.txt
└── assets
    ├── styles.css
    └── app.js
```

No existe paso de compilación: es HTML/CSS/JS estático.

## Ejecutar en local

Puedes abrir `index.html` directamente o lanzar un servidor:

```bash
python -m http.server 8000
```

y visitar `http://localhost:8000`.

## Publicar gratis con GitHub Pages

1. Crea un repositorio (por ejemplo `soliss-ai-rpa-factory`).
2. Sube estos archivos a la rama `main`.
3. En GitHub: **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona `main` y `/ (root)`.
6. Guarda. GitHub mostrará la URL pública, normalmente:
   `https://<usuario>.github.io/soliss-ai-rpa-factory/`

> Importante: un repositorio público y GitHub Pages harán públicas las cifras económicas, arquitectura, riesgos y condiciones de la propuesta. Si el contenido es confidencial, no lo publiques sin autorización.

## Notas

- Chart.js se carga desde jsDelivr; no hay framework ni backend.
- Los bloques de ROI, ahorro y madurez son proyecciones del material de propuesta.
- La sección legal consolida lo indicado en los materiales originales y no sustituye revisión de Legal/Compliance.
- No se ha añadido una licencia open-source: el contenido de negocio debe tratarse según los derechos y acuerdos de las partes.
