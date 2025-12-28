Production deployment instructions

Prerequisites

- Docker & Docker Compose installed on the server
- DNS entry pointing to the server's IP (optional for HTTPS)
- Environment variables for backend (see below)

1) Environment variables

Create a `.env.prod` file (outside git) with at least:

```
MONGO_URL=mongodb://mongo:27017/mstatili_db
ALLOWED_ORIGINS=http://your-domain.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your-smtp-password
NOTIFICATION_EMAIL=notify@example.com
```

2) Build and run with Docker Compose

From repository root:

```bash
cp .env.prod .env
docker-compose -f docker-compose.prod.yml up -d --build
```

- `frontend` served on port 80 (nginx) with SPA routing
- `backend` served on port 8000 (Gunicorn + Uvicorn workers)
- `mongo` runs locally as a service

3) Reverse proxy & TLS (recommended)

For production, terminate TLS with a reverse proxy (Nginx or Caddy) or use a cloud load balancer. Example nginx config (server block) should forward HTTP/HTTPS to port 80 on the server.

Alternatively, deploy behind a load balancer / CDN (Cloudflare, AWS ALB, etc.) and enable HTTPS there.

4) Health checks & scaling

- Use `docker-compose scale backend=3` or a container orchestrator (Kubernetes) for horizontal scaling.
- Monitor logs with `docker-compose -f docker-compose.prod.yml logs -f` or use a logging driver.

5) Backup & persistence

- Mongo data is stored in Docker volume `mongo_data`. Configure scheduled backups or snapshotting for production.

6) Alternative static hosting

If you prefer to host static frontend on a CDN/Static hosting (Netlify, Vercel, S3+CloudFront):

- Run `npm run build` in `frontend` locally
- Upload `build/` contents to your static host
- Configure the host to proxy `/api/*` to the backend endpoint (e.g., `https://api.your-domain.com`)

7) Environment & secrets

- Keep secrets out of git. Use your cloud provider's secret manager or `docker secret` / `env` files with restricted permissions.

8) Local test commands

- Build locally:

```bash
# frontend
cd frontend && npm ci && npm run build
# backend
pip install -r backend/requirements.txt
uvicorn backend.server:app --host 0.0.0.0 --port 8000
```

9) Notes & troubleshooting

- If images fail to load, verify `public/images` was copied during build and paths are correct (`/images/...`).
- Check CORS via `ALLOWED_ORIGINS` if frontend and backend are on different domains.
- Ensure `MONGO_URL` uses correct credentials when using managed MongoDB.

Contact

If you want, I can also:
- Add an nginx reverse-proxy service with automatic Let's Encrypt (using `nginx-proxy` + `acme-companion` or `traefik`) in `docker-compose.prod.yml`.
- Create a minimal Kubernetes manifest for a cluster-based deployment.
