# Soliss AI/RPA Factory · P0 — Web técnica ejecutiva v2

Web estática consolidada y actualizada a partir del **Plan Director Final Cerrado**, los Excel de presupuesto/cronograma, la propuesta post-reunión y las figuras técnicas suministradas.

## Qué cambia frente a la primera versión

- Baseline económico corregido y centralizado en `assets/data.js`.
- P0 claramente separado de UC1–UC7.
- Fases F0–F4 del **Presupuesto/Cronograma Final Cerrado**.
- Arquitectura interactiva: Rancher/RKE2, clúster de grupo, dominios, identidad, Model Gateway, Data Mesh y observabilidad.
- Simulador de TCO por escenarios y opción S2.
- Gates G1–G4 y roadmap M1–M36.
- Soporte N0–N3, gestión del cambio, RACI, pruebas y entregables.
- Matriz de riesgos filtrable.
- Lightbox para las figuras técnicas.
- Tema claro/oscuro, animaciones discretas, contador de KPIs, navegación activa y responsive.
- Sin framework ni proceso de build.

## Baseline de cifras

La web usa como referencia principal:
- Construcción P0: **105.786,20 €**.
- Servicio co-gestionado M3–M24: **77.000 €**.
- Total Keedio 24M: **182.786,20 €**.
- Opción M25–M36: **42.000 €**.
- Infraestructura Soliss recomendada: **180.000–280.000 €**, sujeta a sizing G2 y proveedores.

### Nota de consistencia

Una figura `Journey + Economics` suministrada muestra **125.786,20 €** como CAPEX Keedio al sumar `20.000 € activación + 105.786,20 € construcción`. El **Plan Director Final Cerrado** y el **Excel Final Cerrado** definen `105.786,20 €` como el total de construcción P0 incluyendo F0/activación. La web evita por tanto la doble contabilización de F0.

## Estructura

```text
.
├── index.html
├── 404.html
├── .nojekyll
├── robots.txt
├── README.md
└── assets/
    ├── data.js
    ├── app.js
    ├── styles.css
    └── figures/
        ├── arquitectura-onpremise.png
        ├── journey-economics.png
        └── to-be.png
```

## Ejecutar localmente

```bash
python -m http.server 8000
```

Abrir `http://localhost:8000`.

## GitHub Pages

No requiere compilación. Subir el contenido a la raíz de `main` y activar:

**Settings → Pages → Deploy from a branch → main → /(root)**

## Nota de publicación

El sitio contiene información económica, técnica y de riesgos del proyecto. Validar su autorización de difusión antes de publicar un repositorio/Pages público.
