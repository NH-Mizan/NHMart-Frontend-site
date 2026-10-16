# Frontend deployment

## Render setup

The default `render.yaml` now uses the free web-service plan for a demo. The earlier paid setup is preserved in `render.paid.yaml`. Free services sleep when idle and share the workspace's free-hour allowance; backend free Postgres expires after 30 days. Use the actual backend HTTPS origin as `API_INTERNAL_URL`, then set backend `FRONTEND_URL` to this storefront's actual HTTPS origin.

The following paid-plan description applies to `render.paid.yaml`:

The committed `render.yaml` defines one paid Next.js web service in Singapore. After the latest source is pushed, connect this GitHub repo in Render and create a Blueprint from this file. Review estimated charges before deploying. Set the prompted `API_INTERNAL_URL` to the backend's actual HTTPS origin. After deployment, set backend `FRONTEND_URL` to the generated storefront origin. Custom domains can be added later; update the backend origin allowlist accordingly.

This file has not been deployed or validated against an authenticated Render account. Verify the host's proxy/client-IP behavior and the checks below before opening checkout to customers.

## General setup

This repository deploys independently of the backend and the local parent workspace. Use Node.js 22 and run commands from this repository's root.

1. Install dependencies with `npm ci`.
2. Configure environment variables before building:

   ```dotenv
   NEXT_PUBLIC_API_URL=/api/v1
   API_INTERNAL_URL=https://YOUR-BACKEND-HOST
   ```

   `API_INTERNAL_URL` is the backend origin, without `/api/v1` or a trailing slash. The backend must be reachable from the frontend hosting service. Do not use localhost for separate hosting services.
3. Build with `npm run build`. On a Node server, start with `npm start -- --port 3000`; on managed hosting, use its Next.js runtime.
4. Serve the public storefront over HTTPS. Set the backend's `FRONTEND_URL` to this exact storefront origin.

The `/api/v1` rewrite keeps browser API traffic and refresh cookies on the storefront origin. `/store-icon` also uses `API_INTERNAL_URL`. This application needs a Next.js server runtime; a static export is insufficient.

The backend database and uploaded media are separate deployment requirements. Existing local catalogue images will not appear merely by deploying GitHub source. See the backend deployment instructions. Never commit `.env.local` or production secrets.

Verify storefront images, admin login and refresh after reload, product uploads, variants and a test COD order after deployment.
