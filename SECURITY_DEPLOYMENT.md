# V7 · Public + Boardroom + Licitación security model

## Implemented in V6

V6 no longer stores the Boardroom economics or document catalogue in the public application bundle.

Public assets contain the public experience. Boardroom data is under `/private/`:

```text
/private/
  boardroom-data.json
  documents.json
  documents/...
```

The browser implements OIDC **Authorization Code + PKCE** for a public SPA client. `config/runtime-config.js` contains the deployment-specific issuer and client ID.

## Critical boundary

Front-end authentication does **not** by itself protect a static file path.

In production `/private/` MUST also be protected at the hosting/reverse-proxy layer. V6 sends the OIDC Bearer token when requesting the private JSON bundle. A compatible reverse proxy/resource server must validate it.

## Local review

For local review only:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/`.

With `auth.enabled=false` and `allowLocalDemo=true`, V6 allows a clearly labelled **Demo local** Boardroom. This mode is intentionally not accepted on ordinary external hostnames.

## Keycloak SPA client

Recommended client characteristics:

- OpenID Connect.
- Client authentication OFF (public client).
- Standard Flow ON.
- PKCE method S256.
- Exact production redirect URI(s).
- Exact Web Origins.
- HTTPS in production.
- Short access-token lifetime appropriate to the environment.

## Reverse proxy

A practical pattern is Keycloak + oauth2-proxy/reverse proxy. The proxy should protect `/private/` and validate the Bearer JWT sent by V6. oauth2-proxy exposes `skip_jwt_bearer_tokens` for accepting verified JWT bearer tokens whose audience matches the configured client.

See `deployment/`.

## Do not use

- password hard-coded in JavaScript;
- `display:none` as access control;
- secrets embedded in the SPA;
- public URLs to `/private/documents`;
- robots.txt as security.

## Optional hardening

- CSP and security headers;
- HSTS;
- restrictive CORS;
- short token lifetime;
- Keycloak groups/roles for Boardroom;
- audit logging at the proxy;
- rate limiting;
- DPoP/client policies if the target architecture requires it and the complete chain supports it.


## V7 · Tender workspace

El nuevo acceso `?view=tender` utiliza la misma sesión reservada que Boardroom. Sus datos económicos, prescripciones, criterios de valoración y documento fuente se mantienen bajo `/private/`. En producción, proteger `/private/` sigue siendo obligatorio.
