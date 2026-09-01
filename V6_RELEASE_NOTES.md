# Soliss AI/RPA Factory · V6 Release Notes

**Proponente:** Keedio  
**Cliente:** Soliss  
**Fecha:** 2 septiembre 2026

## V6 cambia el modelo

V6 deja de ser únicamente una Decision Room interactiva y pasa a comportarse como un portal operativo con una frontera explícita entre experiencia pública y Boardroom.

### Seguridad y datos privados
- Economics, decisiones, gates, Evidence Registry, riesgos, trazabilidad interna y catálogo documental se cargan desde `/private`.
- OIDC Authorization Code + PKCE preparado para Keycloak.
- El Boardroom externo queda bloqueado hasta configurar SSO.
- Localhost permite un modo demo claramente identificado.
- `/private` es network-only en el Service Worker y no entra en Cache Storage.
- El hosting/reverse proxy debe validar el acceso a `/private`.

### Navegación y productividad
- P0 Copilot local y determinista, sin LLM externo.
- Command Palette con Ctrl/Cmd + K.
- Visión Public y Boardroom siguen dentro de una única aplicación.

### Comité y gobierno
- Live Decision Board.
- Decision Readiness basado en estados reales de la sesión; nunca presentado como compliance.
- Exportación de decisiones.
- Control Traceability Graph: Risk → Control → Evidence → Gate → Decision.

### Industrialización de casos de uso
- P0 Architecture Contract por UC.
- UC → KPI → Evidence.
- Baseline y target se mantienen N/D hasta workshop/datos reales.

### Trazabilidad de información
- Provenance: CONTRACTUAL / ESTIMACIÓN / HIPÓTESIS / EXTERNO.
- Source Freshness con fecha de verificación y horizonte de revisión.
- Comparador de versiones.

### Experiencia
- Compacta / Normal / Presentación.
- A− / A / A+.
- Alto contraste.
- Reduced motion.
- Mejora de navegación por teclado y focus visible.
- QR de la vista pública únicamente bajo demanda.
- One Page Executive Brief en HTML y PDF.

## Archivos clave

- `config/runtime-config.js` — configuración OIDC.
- `SECURITY_DEPLOYMENT.md` — modelo de seguridad.
- `deployment/` — plantillas Keycloak / oauth2-proxy / Nginx.
- `private/boardroom-data.json` — bundle de datos Boardroom.
- `private/documents/` — documentación Boardroom.
- `public/` — materiales públicos.
