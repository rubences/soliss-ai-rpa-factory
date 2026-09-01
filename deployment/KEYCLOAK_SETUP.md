# Keycloak setup · V6 Boardroom

Suggested client:

- Client type: OpenID Connect
- Client ID: `soliss-p0-boardroom`
- Client authentication: OFF
- Standard Flow: ON
- PKCE method: S256
- Implicit Flow: OFF
- Valid redirect URI: exact V6 production URL
- Web Origin: exact V6 production origin

Optional role:
- `p0-boardroom`

The resource layer/reverse proxy should validate tokens before serving `/private/`.
