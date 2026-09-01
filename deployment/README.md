# V6 deployment templates

These files are reference templates, not a production-ready secret bundle.

1. Configure the Keycloak public SPA client.
2. Set `auth.enabled=true`, `issuer` and `clientId` in `config/runtime-config.js`.
3. Protect `/private/` in the reverse proxy.
4. Validate the JWT audience and issuer.
5. Keep all secrets outside this repository.

Official implementation details should be reconciled with the deployed Keycloak and proxy versions.
