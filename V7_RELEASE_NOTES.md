# Soliss AI/RPA Factory · V7 Release Notes

**Fecha:** 2 septiembre 2026  
**Proponente:** Keedio  
**Cliente:** Soliss

## Nuevo tercer espacio: Licitación / Pliego P0

V7 mantiene Public y Boardroom y añade una tercera experiencia reservada para dimensionar P0 como licitación.

### Estructura
- Ficha contractual.
- Condiciones técnicas.
- Condiciones económicas.
- Matriz PPT-01 → PPT-18.
- Modelo de valoración propuesto (working draft).
- Gates, entregables y dedicaciones Soliss.
- Tender Readiness.
- Descargables CSV y documento fuente.

### Control de coherencia económico
El documento `Redacción proyecto(2).docx` y el baseline Boardroom Final Cerrado utilizan distribuciones de horas por fase diferentes para el mismo total de construcción. V7 no reconcilia automáticamente esta discrepancia: la eleva como decisión previa a la emisión del pliego.

### Seguridad
Licitación utiliza el mismo acceso reservado que Boardroom (`soliss / soliss` en demo). Los datos de licitación se mantienen bajo `/private/tender-data.json`.
