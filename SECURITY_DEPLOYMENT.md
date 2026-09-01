# V5 · Modelo de acceso y despliegue seguro

## Qué hace V5

V5 unifica la experiencia **Public** y **Boardroom** en una sola aplicación y permite al usuario elegir la vista al entrar.

El selector de la interfaz:
- reduce ruido;
- evita mostrar economics/documentación al usuario público;
- crea URLs por vista (`?view=public` y `?view=boardroom`);
- mantiene una única base de código y contenido compartido.

## Qué NO hace

El selector **no es autenticación**.

Si esta carpeta completa se publica en un hosting estático abierto, una persona técnicamente capaz podría inspeccionar los assets o intentar acceder directamente a recursos Boardroom aunque la interfaz los oculte.

`robots.txt` ayuda a evitar indexación cooperativa, pero tampoco es un control de seguridad.

## Recomendación para producción

Para una publicación externa real:

1. Mantener la experiencia Public accesible sin autenticación.
2. Proteger el Boardroom en el hosting mediante SSO / Identity-Aware Proxy / reverse proxy.
3. Proteger específicamente `/documents/` y cualquier futuro bundle `/private/`.
4. No confiar en contraseñas JavaScript, hashes embebidos o simples `display:none`.
5. Registrar accesos al Boardroom si Soliss/Keedio lo requieren.
6. Mantener HTTPS y headers de seguridad.

### Arquitectura recomendada a futuro

```text
soliss-ai-rpa.example
│
├── Public experience
│      └── acceso abierto
│
└── Boardroom
       ├── autenticación edge / SSO
       ├── economics
       ├── decision tools
       └── documents/
```

La V5 entregada implementa la **separación de experiencia**. El control de acceso fuerte debe configurarse en la capa de hosting.
