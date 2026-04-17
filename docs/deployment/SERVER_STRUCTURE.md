# TecAxle HRMS — Production Server Structure

> **Snapshot:** April 2026 — initial deployment to `187.124.217.81`
>
> This document describes the actual state of the production server at the time of writing. When anything changes (containers added/removed, paths renamed, sudo rules modified), update this file in the same PR.

## Server info

| Attribute | Value |
|---|---|
| Provider | (Hostinger VPS) |
| Host | `187.124.217.81` |
| SSH port | `2222` |
| Hostname | `srv1570875` |
| OS | Ubuntu 24.04.4 LTS (Noble) |
| Docker Engine | 29.4.0 (pre-installed by provider) |
| Docker Compose | v5.1.2 (plugin) |
| SSH host key | `SHA256:WSyws/iulPz72+WewKcX/31GwzxjUWZ6hl2ZpfK4Nf8` (ssh-ed25519) |
| Public URLs | `hrms.tecaxle.com`, `hrmsportal.tecaxle.com`, `hrmsapi.tecaxle.com` |
| DNS provider | Hostinger (`hpanel.hostinger.com` → Domains → tecaxle.com → DNS) |

## Users

| User | Sudo rights | Used for |
|---|---|---|
| `hhammad` | `(ALL : ALL) ALL` — full sudo | Human admin. Ad-hoc ops, bootstrap, file edits in `/root/`, anything that isn't rsync/docker. |
| `deploy` | `(root) NOPASSWD: /usr/bin/rsync, /usr/bin/docker` | Automated deploys only. Cannot read/write arbitrary files in `/root/` — only touches them via `sudo rsync` or `sudo docker`. |

Both users share the same password `Tec@axle2026`. Both SSH on port `2222`.

The sudoers rule for `deploy` lives at `/etc/sudoers.d/deploy-hrms` and was installed by [`scripts/server-bootstrap.sh`](../../scripts/server-bootstrap.sh) when run once as `hhammad`.

**Recommended:** install an SSH public key into `/home/deploy/.ssh/authorized_keys` so the redeploy script doesn't need the password on every run:

```
ssh-copy-id -p 2222 deploy@187.124.217.81
```

## Directory layout

```
/root/                                    [root-owned, mode 700]
│
├── reverse-proxy/                        shared edge proxy (not HRMS-owned)
│   ├── docker-compose.yml                caddy:2-alpine + ports 80/443
│   └── Caddyfile                         sites for ALL systems behind Caddy
│
└── applications/                         all business apps (lowercase 'a')
    ├── hrms/
    │   ├── compose/
    │   │   ├── docker-compose.yml        HRMS stack (postgres, api, admin, portal)
    │   │   ├── nginx-spa.conf            shared SPA config for admin + portal
    │   │   └── .env                      secrets (mode 0600, root-owned, never committed)
    │   └── artifacts/                    build outputs bind-mounted into containers
    │       ├── api/                      dotnet publish output (TecAxle.Hrms.Api.dll + DLLs)
    │       │   └── uploads/              [volume mount point — backed by hrms-uploads volume]
    │       ├── admin/                    ng build /browser output (index.html, JS, assets)
    │       └── portal/                   ng build /browser output (index.html, JS, assets)
    │
    └── erp/                              future: TecAxle ERP stack (empty)
        └── (same compose/ + artifacts/ shape when populated)
```

**Note on casing:** the folder is `/root/applications/` (lowercase `a`). Linux filesystems are case-sensitive — `/root/Applications` is a different path and does not exist.

**Note on bind mounts:** the `api/` bind mount in the compose file is **read-write** (not `:ro`). This is required so Docker can create the `/app/uploads` mount point for the `hrms-uploads` volume inside the bind-mounted parent. The admin and portal binds are `:ro`.

## Docker resources

Two compose projects running on this server:

### Project `reverse-proxy` (at `/root/reverse-proxy`)

| Resource | Name | Notes |
|---|---|---|
| Container | `caddy` | `caddy:2-alpine`, publishes `0.0.0.0:80`, `0.0.0.0:443`, `0.0.0.0:443/udp` |
| Volume | `reverse-proxy_caddy_data` | persists Let's Encrypt certs across restarts — **never delete** |
| Volume | `reverse-proxy_caddy_config` | persists runtime config |
| Network | `edge-net` (external) | external network, attached by this project and by HRMS |

### Project `compose` (at `/root/applications/hrms/compose`)

The project name defaults to the folder name (`compose`). Docker prefixes resources with it.

| Resource | Name | Notes |
|---|---|---|
| Container | `hrms-postgres` | `postgres:18-alpine` (bumped from 16 in v14.7). Only on `hrms-net`. Volume `compose_hrms-pgdata`. Healthy. |
| Container | `hrms-api` | `mcr.microsoft.com/dotnet/aspnet:9.0`. On both `hrms-net` and `edge-net`. Bind `../artifacts/api:/app` RW, volume `compose_hrms-uploads:/app/uploads`. Listens container-internal `:8080`. |
| Container | `hrms-admin` | `nginx:1.27-alpine`. Only on `edge-net`. Bind `../artifacts/admin:/usr/share/nginx/html:ro`, config `./nginx-spa.conf:/etc/nginx/conf.d/default.conf:ro`. |
| Container | `hrms-portal` | `nginx:1.27-alpine`. Only on `edge-net`. Same shape as hrms-admin with `../artifacts/portal`. |
| Volume | `compose_hrms-pgdata` | postgres data dir — **never delete** |
| Volume | `compose_hrms-uploads` | file attachments — **never delete** |
| Network | `compose_hrms-net` | internal, bridge |
| Network | `edge-net` | external (declared by reverse-proxy) |

### Request flow

```
Browser
  ↓  HTTPS :443 (public)
caddy  [reverse-proxy project, attached to edge-net]
  ↓   route by Host header via edge-net, HTTP container-internal
  ├─ hrmsapi.tecaxle.com   → hrms-api:8080
  ├─ hrms.tecaxle.com      → hrms-admin:80
  └─ hrmsportal.tecaxle.com → hrms-portal:80

hrms-api
  ↓  via hrms-net (internal)
hrms-postgres:5432
  ↳  single DB: tecaxle_hrms (v14.0+ single-company architecture)
```

`hrms-postgres` is **never** attached to `edge-net` and its port 5432 is never published to the host. DB admin from outside requires SSH + `docker exec -it hrms-postgres psql ...`.

## Networks

- `edge-net` — external, shared across multiple app stacks. Created once by `scripts/server-bootstrap.sh` via `docker network create edge-net`. The HRMS compose file declares it as `external: true`.
- `compose_hrms-net` — internal bridge, owned by the HRMS compose project. Only `hrms-postgres` and `hrms-api` live on it.

To add a new app stack, the new compose project just declares `edge-net` as external and attaches any containers that need public access. No changes to the reverse-proxy project.

## Firewall (UFW)

```
Status: active

2222/tcp   ALLOW IN  Anywhere
80/tcp     ALLOW IN  Anywhere
443/tcp    ALLOW IN  Anywhere
(mirrored v6)
```

Nothing else is open. Postgres (5432) is not exposed — it's only reachable via the internal docker network.

## TLS certificates

- **Issuer:** Let's Encrypt
- **Managed by:** Caddy (automatic)
- **Challenge:** `tls-alpn-01` (no http-01 redirects needed)
- **Storage:** `reverse-proxy_caddy_data` docker volume
- **Renewal:** automatic on a rolling window; Caddy handles it without restarts

To force a renewal attempt (for testing): `sudo docker compose -f /root/reverse-proxy/docker-compose.yml restart caddy` — Caddy will check all certs against Let's Encrypt's renewal info on startup and refresh any in the renewal window.

## Secrets

Live in `/root/applications/hrms/compose/.env` (mode `0600`, owner `root:root`). Generated at deploy time via `openssl rand -base64 ...` (or the python `secrets` module). **Never committed to git.** Post-v14.0 single-company architecture uses **three** keys (the legacy `TENANT_ENCRYPTION_KEY` was retired with multi-tenancy):

| Key | Used by | Purpose |
|---|---|---|
| `POSTGRES_PASSWORD` | compose + api env var | Postgres superuser password, used in `DefaultConnection` |
| `JWT_SECRET` | api `Jwt__Secret` | Signs JWT access tokens |
| `NFC_SECRET_KEY` | api `NfcEncryption__SecretKey` | HMAC-SHA256 signing key for NFC tag payloads |

Rotating any of these requires restarting `hrms-api`.

## System admin seed credentials

Seeded automatically on first startup of `hrms-api` by [`SeedData.cs`](../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Common/SeedData.cs) (v14.0+ single-company). Two SystemAdmin users are created:

| Email | Username | Password | Notes |
|---|---|---|---|
| `tecaxleadmin@system.local` | `tecaxleadmin` | `TempP@ssw0rd123!` | `IsSystemUser=true`, SystemAdmin role |
| `systemadmin@system.local` | `systemadmin` | `TempP@ssw0rd123!` | `IsSystemUser=true`, SystemAdmin role |

Used for the first login to `https://hrms.tecaxle.com`. `MustChangePassword` is true on first login. Change these after first login — the passwords are hardcoded in `SeedData.cs`.

## Volumes that must never be deleted

These hold persistent state. Deleting them loses data:

- `reverse-proxy_caddy_data` — Let's Encrypt certificate material. If lost, you need to re-issue (subject to Let's Encrypt rate limits).
- `compose_hrms-pgdata` — the `tecaxle_hrms` database. Irrecoverable without backups.
- `compose_hrms-uploads` — every file uploaded via the UI (employee photos, contract PDFs, etc.).

**Never run `docker compose down -v`** on either project. Use `docker compose down` (without `-v`) if you need to stop containers while preserving state.

## Backups (TODO)

No automated backup is configured at the time of writing. Manual backup procedure:

```bash
# postgres (single DB)
sudo docker exec hrms-postgres pg_dump -U postgres -d tecaxle_hrms > /tmp/pg-$(date +%F).sql

# uploads volume
sudo docker run --rm -v compose_hrms-uploads:/src -v /tmp:/dest alpine \
    tar czf /dest/uploads-$(date +%F).tar.gz -C /src .

# download to laptop
scp -P 2222 hhammad@187.124.217.81:/tmp/pg-*.sql ./backups/
scp -P 2222 hhammad@187.124.217.81:/tmp/uploads-*.tar.gz ./backups/
```

Schedule this via cron / systemd timer as a follow-up task.

## Common admin commands

```bash
# Shell in as deploy for routine checks (NOPASSWD sudo for rsync + docker)
ssh -p 2222 deploy@187.124.217.81

# Check all containers across both projects
sudo docker compose -f /root/reverse-proxy/docker-compose.yml ps
sudo docker compose -f /root/applications/hrms/compose/docker-compose.yml ps

# Stream API logs
sudo docker logs -f hrms-api

# Stream Caddy logs (watch for ACME activity)
sudo docker logs -f caddy

# List databases (should show `tecaxle_hrms` + templates only)
sudo docker exec hrms-postgres psql -U postgres -c "\l"

# Shell into postgres
sudo docker exec -it hrms-postgres psql -U postgres tecaxle_hrms

# Restart a single container (e.g. after an artifact redeploy)
sudo docker compose -f /root/applications/hrms/compose/docker-compose.yml restart hrms-api
```
