# V6.2 · UX/UI Refinement

## Objetivo

La V6.2 reorganiza la experiencia sin ampliar el alcance funcional. El principio es **menos elementos visibles a la vez, más profundidad bajo demanda**.

## Cambios de experiencia

### Entrada
- Access Hub reducido a dos decisiones claras.
- Public = entender la propuesta.
- Boardroom = revisar y decidir P0.
- Login Boardroom simplificado; mantiene `soliss / soliss`.

### Public
- Recorrido más corto: contexto → P0/casos → confianza.
- Se ocultan módulos técnicos avanzados, Source Freshness detallado, contratos de capacidades, KPI evidence y tooling interno.
- Se mantiene acceso al Story público, compartir y Executive Brief.

### Boardroom
- Workspace con sidebar de nueve áreas en desktop.
- Perfil Consejo reduce detalle técnico y compliance.
- Perfil Tecnología prioriza arquitectura, operación y delivery.
- Perfil Compliance prioriza gobierno, assurance y evidencia.
- Vista Completa mantiene el contenido íntegro.

### Cabecera
- Solo tres acciones permanentes: Buscar, Acceso, Herramientas.
- Ask P0, Story, Presentación, Apariencia, Tema, Compartir y Brief pasan a Herramientas.

### Legibilidad
- Ningún `font-size` en rem queda por debajo de 0.75rem / 12px.
- Muted y teal se oscurecen para mejorar contraste en fondos claros.
- Body y microcopy aumentados.
- Controles ≥40px desktop y ≥44px mobile.

### Accesibilidad
- Roles `dialog`/`aria-modal` añadidos a overlays custom.
- Focus trap y retorno de foco al invocador.
- Mostrar/ocultar contraseña.
- Herramientas secundarias siguen disponibles en móvil.
- `focus-visible` existente se conserva.

### Design system
- Radios y controles convergen hacia 8 / 12 / 16 / 24px.
- Se reduce el número de estilos visibles simultáneos.
- Terminología principal pasa a español.
