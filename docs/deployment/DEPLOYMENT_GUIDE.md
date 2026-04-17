# TecAxle HRMS — Deployment Guide

This guide covers two scenarios:

1. **New deployment / fresh rebuild** — setting up HRMS on a fresh server, or rebuilding from scratch (e.g. staging reset).
2. **Update deployment** — pushing new code (backend and/or frontend) to an already-running server.

The model is **build-on-laptop, run-on-server**. The server never needs a .NET SDK or Node.js — only Docker. All artifacts are built locally, packaged, rsynced over, and bind-mounted into stock runtime containers.

**Version baseline:** v14.7 (single-company architecture). For server layout, networks, volumes, and credentials, see [SERVER_STRUCTURE.md](SERVER_STRUCTURE.md).

---

## 0. Prerequisites on the developer laptop

- .NET 9 SDK (`dotnet --version` → 9.x or 10.x — 10 targets net9.0 cleanly)
- Node.js 20+ and npm
- Git Bash (Windows) or bash (Linux/macOS)
- `rsync` in PATH (Git Bash ships it under `/usr/bin/rsync`)
- SSH client — native `ssh.exe` on Windows works; for password-only auth without a key, use [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/) (`plink.exe`, `pscp.exe`) via the `scripts/r.sh` helper
- PuTTY installed at `C:\Program Files\PuTTY\` (Windows only, if you haven't set up an SSH key yet)

**Strongly recommended:** install your SSH public key on the server for the `deploy` user. One-time:

```bash
ssh-copy-id -p 2222 deploy@187.124.217.81
# enter Tec@axle2026 once
```

After that, `scripts/deploy-artifacts.sh` runs without any password prompt.

---

## 1. New deployment (first time, or full rebuild / staging reset)

### Phase A — Build artifacts locally

```bash
./scripts/build-artifacts.sh
```

This runs:
1. `dotnet publish` for the backend → `publish/api/`
2. `npm install --no-audit --no-fund && ng build --configuration production` for the admin frontend → `publish/admin/`
3. Same for the self-service frontend → `publish/portal/`

Verify the three entry points exist:

```bash
ls publish/api/TecAxle.Hrms.Api.dll publish/admin/index.html publish/portal/index.html
```

Expect ~50 MB for api, ~7 MB for admin, ~3 MB for portal.

**Known gotchas:**
- On Windows Git Bash, `dotnet publish /p:...` gets its `/p:` argument mangled by MSYS path conversion. The build script uses `-p:UseAppHost=false` which is immune.
- `npm ci` fails on Windows when `esbuild.exe` is held by any other process (IDE language server, stray dev server, antivirus). The build script uses `npm install --no-audit --no-fund` which is incremental and tolerant.

### Phase B — Server bootstrap (once, via `hhammad`)

The `deploy` user has **no sudo rights** until the bootstrap script runs. You must do this step as `hhammad` (who has full sudo).

```bash
# Upload the bootstrap script
./scripts/r.sh put scripts/server-bootstrap.sh /tmp/server-bootstrap.sh

# Run it with sudo (expects hhammad's password)
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash /tmp/server-bootstrap.sh"
```

What the script does:
1. Installs `/etc/sudoers.d/deploy-hrms` granting `deploy` NOPASSWD sudo for `/usr/bin/rsync` and `/usr/bin/docker` only
2. Installs Docker if missing (usually already present on Hostinger VPS)
3. Creates `/root/reverse-proxy/` and `/root/applications/hrms/{compose,artifacts/{api,admin,portal}}` (idempotent)
4. Creates the shared `edge-net` docker network
5. Opens UFW for 2222/tcp, 80/tcp, 443/tcp

Verify:

```bash
HRMS_SSH_USER=deploy ./scripts/r.sh exec "sudo -l"
# expect:
# User deploy may run the following commands on srv1570875:
#     (root) NOPASSWD: /usr/bin/rsync, /usr/bin/docker
```

### Phase B.1 — Upload config files

The compose files, Caddyfile, and nginx config live on the server in `/root/`, which is root-only. Upload via `/tmp` staging, then `sudo mv` into place.

```bash
# Reverse-proxy config (lives on server only — not committed to repo)
./scripts/r.sh put reverse-proxy/docker-compose.yml /tmp/caddy-compose.yml
./scripts/r.sh put reverse-proxy/Caddyfile /tmp/Caddyfile

# HRMS compose config (committed to repo at compose/)
./scripts/r.sh put compose/docker-compose.yml /tmp/hrms-compose.yml
./scripts/r.sh put compose/nginx-spa.conf /tmp/nginx-spa.conf

# Move them all into place with sudo
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash -c '
    mv /tmp/caddy-compose.yml /root/reverse-proxy/docker-compose.yml
    mv /tmp/Caddyfile /root/reverse-proxy/Caddyfile
    mv /tmp/hrms-compose.yml /root/applications/hrms/compose/docker-compose.yml
    mv /tmp/nginx-spa.conf /root/applications/hrms/compose/nginx-spa.conf
    chown -R root:root /root/reverse-proxy /root/applications
    chmod 644 /root/reverse-proxy/*.yml /root/reverse-proxy/Caddyfile /root/applications/hrms/compose/*.yml /root/applications/hrms/compose/*.conf
'"
```

### Phase B.2 — Generate and install secrets

Generate strong secrets locally and upload as a single `.env` file with mode 0600. Post-v14.0 the single-company HRMS only needs **three** secrets (the old `TENANT_ENCRYPTION_KEY` is gone — multi-tenancy is no longer supported):

```bash
# Generate locally
python -c "
import secrets, base64
def gen(n=32): return base64.b64encode(secrets.token_bytes(n)).decode()
print('POSTGRES_PASSWORD=' + gen(24))
print('JWT_SECRET=' + gen(48))
print('NFC_SECRET_KEY=' + gen(32))
" > /tmp/hrms-env-local.txt

# Review it (verify no weird chars)
cat /tmp/hrms-env-local.txt

# Upload and install with mode 0600, root-owned
./scripts/r.sh put /tmp/hrms-env-local.txt /tmp/hrms.env
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash -c '
    install -m 0600 -o root -g root /tmp/hrms.env /root/applications/hrms/compose/.env
    rm /tmp/hrms.env
'"

# Clean up the local copy — DO NOT commit this file
rm /tmp/hrms-env-local.txt
```

> **Keep a secure offline copy** of the generated secrets. If `/root/applications/hrms/compose/.env` is lost (e.g. host rebuild), you must restore from backup or all JWTs + NFC payloads become invalid.

### Phase C — DNS at Hostinger

Log into [hpanel.hostinger.com](https://hpanel.hostinger.com/) → **Domains** → **Manage** next to `tecaxle.com` → **DNS / Nameservers** → **Manage DNS records** → **Add record** three times:

| Type | Name | Points to | TTL |
|---|---|---|---|
| A | `hrmsapi` | `187.124.217.81` | `300` |
| A | `hrms` | `187.124.217.81` | `300` |
| A | `hrmsportal` | `187.124.217.81` | `300` |

In Hostinger's **Name** field, enter only the subdomain (e.g. `hrmsapi`), not the full FQDN.

Verify propagation before starting Caddy:

```bash
./scripts/r.sh exec "for h in hrmsapi.tecaxle.com hrms.tecaxle.com hrmsportal.tecaxle.com; do
    printf '%-28s ' \"\$h\"
    dig +short @1.1.1.1 \$h
done"
```

All three must return `187.124.217.81`. **Do not start Caddy before DNS resolves** — Caddy will hit Let's Encrypt's ACME endpoint, fail the tls-alpn-01 challenge, and can run into rate limits if you keep retrying.

### Phase D — Start the reverse proxy

```bash
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash -c 'cd /root/reverse-proxy && docker compose up -d'"

# Watch certificate issuance (takes 10-30 seconds)
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' docker logs caddy 2>&1 | grep -iE '(certificate obtained|error)'"
```

Expect three `certificate obtained successfully` lines. If you see errors, verify DNS, verify UFW has `443/tcp` open, and check [Let's Encrypt rate limits](https://letsencrypt.org/docs/rate-limits/).

### Phase E — Upload artifacts + start the HRMS stack

The first artifact upload uses a tarball for speed (18 MB vs hundreds of individual SCP transfers).

```bash
# Tar up all three artifact trees locally
cd publish && tar czf /tmp/hrms-publish.tar.gz api admin portal && cd ..

# Upload
./scripts/r.sh put /tmp/hrms-publish.tar.gz /tmp/hrms-publish.tar.gz

# Extract into place on the server
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash -c '
    rm -rf /root/applications/hrms/artifacts/api /root/applications/hrms/artifacts/admin /root/applications/hrms/artifacts/portal
    mkdir -p /root/applications/hrms/artifacts
    tar xzf /tmp/hrms-publish.tar.gz -C /root/applications/hrms/artifacts/
    chown -R root:root /root/applications/hrms/artifacts
    rm /tmp/hrms-publish.tar.gz
'"

# Start the HRMS stack
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash -c 'cd /root/applications/hrms/compose && docker compose up -d'"

# Watch the API start + DB migrate + seed
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' docker logs hrms-api 2>&1 | tail -80"
```

Expect to see:
- EF migrations applied in order: `20260416163539_Initial`, `20260417121022_RenameTenantSettingsToCompanySettings`, `20260417131611_RemoveLegacyAutoCheckoutSettings`, `20260417152940_RemoveDeductionMonth`.
- Seed messages for two system admin users + default shift + vacation types + Saudi EOS policy.
- `Now listening on: http://[::]:8080`.

Clean up local:

```bash
rm /tmp/hrms-publish.tar.gz
```

### Phase E.1 — Seed sample business data (staging only)

For a staging env we want realistic volumes (5 branches, 20 departments, 50 employees with user accounts, all with password `Emp@123!`). The SQL seed script at [scripts/sample-data-with-users.sql](../../scripts/sample-data-with-users.sql) is idempotent on a fresh DB.

```bash
# Upload the script
./scripts/r.sh put scripts/sample-data-with-users.sql /tmp/sample-data-with-users.sql

# Copy into the postgres container and run it as the postgres superuser
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash -c '
    docker cp /tmp/sample-data-with-users.sql hrms-postgres:/tmp/sample.sql
    docker exec hrms-postgres psql -U postgres -d tecaxle_hrms -f /tmp/sample.sql
    docker exec hrms-postgres rm /tmp/sample.sql
    rm /tmp/sample-data-with-users.sql
'"
```

Sample-data verification:

```bash
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' docker exec hrms-postgres psql -U postgres -d tecaxle_hrms -c '
    SELECT (SELECT COUNT(*) FROM \"Branches\") AS branches,
           (SELECT COUNT(*) FROM \"Departments\") AS departments,
           (SELECT COUNT(*) FROM \"Employees\") AS employees,
           (SELECT COUNT(*) FROM \"Users\") AS users;
'"
```

Expected: 5 branches, 20 departments, 50 employees, 52 users (50 employees + 2 system admins).

**Skip this phase for production.** Staging only.

### Phase F — Smoke tests

From your laptop (not the server — hairpin NAT may block self-connections):

```bash
for u in https://hrms.tecaxle.com/ https://hrmsportal.tecaxle.com/ https://hrmsapi.tecaxle.com/swagger/v1/swagger.json; do
    printf '%-65s ' "$u"
    curl -sk -o /dev/null -w '%{http_code}\n' --connect-timeout 15 "$u"
done

# Expect:
# https://hrms.tecaxle.com/                                         200
# https://hrmsportal.tecaxle.com/                                   200
# https://hrmsapi.tecaxle.com/swagger/v1/swagger.json               200
```

Test login as a system admin (seed credentials from `SeedData.cs`):

```bash
curl -sk -X POST -H "Content-Type: application/json" \
    -d '{"email":"systemadmin@system.local","password":"TempP@ssw0rd123!"}' \
    https://hrmsapi.tecaxle.com/api/v1/auth/login
# Expect: {"accessToken":"...","expiresAt":"...","mustChangePassword":true,"user":{...}}
```

Then log in via the browser at [https://hrms.tecaxle.com/](https://hrms.tecaxle.com/) with the same credentials, verify SignalR connects (devtools → Network → `/hubs/notifications` → 101 Switching Protocols), and after sample-data seed, try a sample employee login (e.g. `ahmed.rashid@company.com` / `Emp@123!`).

---

## 2. Update deployment (ongoing)

Once the server is set up, redeploys are fast. The normal loop is:

```bash
./scripts/build-artifacts.sh          # ~1-3 min
./scripts/deploy-artifacts.sh          # ~5-30 sec
```

`scripts/deploy-artifacts.sh` rsyncs only changed files into `/root/applications/hrms/artifacts/` as the `deploy` user (using `--rsync-path="sudo rsync"`), then runs `sudo docker compose restart hrms-api hrms-admin hrms-portal`.

### Backend-only update (faster)

If you only touched C# code and there's no frontend change, you can skip rebuilding the frontends:

```bash
# Publish just the backend
dotnet publish src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj \
    -c Release -o publish/api -p:UseAppHost=false

# rsync just api, restart just hrms-api
rsync -az --delete -e 'ssh -p 2222' --rsync-path="sudo rsync" \
    publish/api/ \
    deploy@187.124.217.81:/root/applications/hrms/artifacts/api/

ssh -p 2222 deploy@187.124.217.81 "cd /root/applications/hrms/compose && sudo docker compose restart hrms-api"
```

Typical round trip: ~5 seconds on top of the publish time.

### Frontend-only update (very fast — no restart needed)

nginx serves files from disk live, so updating the static files is enough — no container restart needed:

```bash
# Admin only
( cd time-attendance-frontend && npx ng build --configuration production )
rsync -az --delete -e 'ssh -p 2222' --rsync-path="sudo rsync" \
    time-attendance-frontend/dist/time-attendance-frontend/browser/ \
    deploy@187.124.217.81:/root/applications/hrms/artifacts/admin/

# Portal only
( cd time-attendance-selfservice-frontend && npx ng build --configuration production )
rsync -az --delete -e 'ssh -p 2222' --rsync-path="sudo rsync" \
    time-attendance-selfservice-frontend/dist/time-attendance-selfservice-frontend/browser/ \
    deploy@187.124.217.81:/root/applications/hrms/artifacts/portal/
```

No container restart. A browser hard-reload picks up the new `index.html` and new hashed JS/CSS.

### Config file update (compose, nginx-spa, Caddyfile)

Config files live in `/root/`, so upload-via-staging is required. Example for the HRMS compose file:

```bash
./scripts/r.sh put compose/docker-compose.yml /tmp/hrms-compose.yml
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash -c '
    install -m 0644 -o root -g root /tmp/hrms-compose.yml /root/applications/hrms/compose/docker-compose.yml
    rm /tmp/hrms-compose.yml
    cd /root/applications/hrms/compose && docker compose up -d
'"
```

For Caddyfile changes, upload then either `docker compose up -d` (which recreates the container) or `docker exec caddy caddy reload --config /etc/caddy/Caddyfile` (live reload, no downtime).

### Secrets rotation

Rotate any of the three secrets in `/root/applications/hrms/compose/.env` via `sudo` interactive edit, then restart the api:

```bash
ssh -p 2222 hhammad@187.124.217.81
sudo nano /root/applications/hrms/compose/.env
# edit the value
cd /root/applications/hrms/compose && sudo docker compose up -d hrms-api
```

### Database migrations

Backend migrations run automatically on `hrms-api` startup via `dbContext.Database.MigrateAsync()` in `Program.cs`. After deploying a backend update that adds a migration:

```bash
./scripts/deploy-artifacts.sh   # rsync + restart hrms-api
# Migrations apply during startup. Check logs:
ssh -p 2222 deploy@187.124.217.81 "sudo docker logs hrms-api 2>&1 | grep -i migrat"
```

---

## 3. Rollback

### Rolling back artifacts

Keep old `publish/` trees on the laptop. To roll back:

```bash
# Replace the current publish/ tree with an older one (e.g. from a git commit)
rm -rf publish
cp -r /path/to/previous/publish publish

./scripts/deploy-artifacts.sh
```

**No data loss** for artifact rollbacks — `hrms-pgdata` and `hrms-uploads` volumes are untouched. Be aware that **schema migrations don't auto-reverse** when you deploy older code — you would have to manually run `Down` migrations via EF tooling first. For staging this is usually OK; for production, plan carefully.

### Rolling back code in git + rebuild

```bash
git checkout <previous-commit>
./scripts/build-artifacts.sh
./scripts/deploy-artifacts.sh
git checkout main   # return to tip
```

### What NOT to do

- **Never** run `sudo docker compose down -v` (with `-v`) on production — that deletes the named volumes and destroys all data.
- **Never** delete the `reverse-proxy_caddy_data` volume — you'll lose the Let's Encrypt certs and hit rate limits when re-issuing.
- Staging resets MAY use `docker compose down -v` intentionally; only the HRMS pgdata volume and uploads volume are in scope.

---

## 4. Staging reset (fresh DB + re-seed)

Full reset workflow for staging when you need a clean slate:

```bash
./scripts/r.sh exec "echo 'Tec@axle2026' | sudo -S -p '' bash -c '
    cd /root/applications/hrms/compose
    docker compose down
    # Destroy DB + uploads volumes for a clean rebuild. SAFE on staging only.
    docker volume rm compose_hrms-pgdata compose_hrms-uploads 2>/dev/null || true
'"

# Re-upload fresh artifacts + start the stack (see Phase E above).
# Then re-seed sample data (Phase E.1).
```

Never do this on production.

---

## 5. Troubleshooting

### `docker compose ps` shows hrms-api Restarting

```bash
ssh -p 2222 deploy@187.124.217.81
sudo docker logs hrms-api --tail 200
```

Common causes:
- DB connection — check `.env` has a valid `POSTGRES_PASSWORD` and compose `DefaultConnection` matches.
- Migration failure — read the EF Core exception. For staging, a `docker volume rm compose_hrms-pgdata` + restart is the fastest fix (after Phase E artifacts are in place).
- Kestrel bind — look for `Now listening on: http://...`. If it's `http://localhost:5099` instead of `http://[::]:8080`, the `Kestrel__Endpoints__Http__Url` env var override is missing from the compose file.

### 502 Bad Gateway on `hrmsapi.tecaxle.com`

Caddy is reachable but can't reach `hrms-api:8080`. Check:

```bash
ssh -p 2222 deploy@187.124.217.81
sudo docker logs caddy --tail 50
# Look for: "dial tcp ...: connect: connection refused"
sudo docker exec caddy wget -qO- http://hrms-api:8080/swagger/v1/swagger.json
# Should return the Swagger JSON
```

If Caddy can reach hrms-api directly but the public URL still 502s, check that `hrms-api` is attached to the `edge-net` network (`docker inspect hrms-api | grep -A5 Networks`).

### Cert issuance failed

```bash
sudo docker logs caddy --tail 200 | grep -iE 'error|fail|acme'
```

Typical causes:
- DNS not yet propagated → wait, or `dig +short @1.1.1.1 hrmsapi.tecaxle.com`
- UFW blocking 80 or 443 → `sudo ufw status`
- Hit Let's Encrypt rate limit → wait 1 hour, or switch Caddy to staging endpoint temporarily

### SSH password prompt mid-deploy

Happens when no SSH key is installed for `deploy`. Fix once:

```bash
ssh-copy-id -p 2222 deploy@187.124.217.81
```

---

## 6. Quick command reference

```bash
# Build everything locally
./scripts/build-artifacts.sh

# Deploy everything to server (rsync + restart)
./scripts/deploy-artifacts.sh

# Server shell (deploy, limited NOPASSWD sudo)
ssh -p 2222 deploy@187.124.217.81

# Server shell (hhammad, full sudo)
ssh -p 2222 hhammad@187.124.217.81

# Stream API logs
ssh -p 2222 deploy@187.124.217.81 "sudo docker logs -f hrms-api"

# Check container state
ssh -p 2222 deploy@187.124.217.81 "sudo docker compose -f /root/applications/hrms/compose/docker-compose.yml ps"

# Shell into postgres
ssh -p 2222 deploy@187.124.217.81 "sudo docker exec -it hrms-postgres psql -U postgres tecaxle_hrms"

# Caddy reload (after Caddyfile edit, no restart)
ssh -p 2222 hhammad@187.124.217.81 "sudo docker exec caddy caddy reload --config /etc/caddy/Caddyfile"

# Full HRMS stack restart
ssh -p 2222 hhammad@187.124.217.81 "cd /root/applications/hrms/compose && sudo docker compose restart"
```

---

## 7. Files reference

**Committed to repo:**

| Path | Purpose |
|---|---|
| [compose/docker-compose.yml](../../compose/docker-compose.yml) | HRMS stack (postgres, api, admin, portal). Attaches to external `edge-net` |
| [compose/nginx-spa.conf](../../compose/nginx-spa.conf) | Shared nginx config for admin + portal SPAs |
| [scripts/build-artifacts.sh](../../scripts/build-artifacts.sh) | Local build (dotnet publish + 2× ng build) |
| [scripts/deploy-artifacts.sh](../../scripts/deploy-artifacts.sh) | Local → server rsync + compose restart |
| [scripts/server-bootstrap.sh](../../scripts/server-bootstrap.sh) | One-time server bootstrap (sudoers, dirs, edge-net, firewall) |
| [scripts/sample-data-with-users.sql](../../scripts/sample-data-with-users.sql) | Staging seed: 5 branches, 20 departments, 50 employees |
| `.gitignore` includes `publish/`, `compose/.env`, `reverse-proxy/` |

**Server-only, not committed** (see SERVER_STRUCTURE.md for contents):

| Path | Purpose |
|---|---|
| `/root/reverse-proxy/docker-compose.yml` | Caddy compose |
| `/root/reverse-proxy/Caddyfile` | All sites for all systems behind Caddy |
| `/root/applications/hrms/compose/.env` | Secrets (mode 0600): POSTGRES_PASSWORD, JWT_SECRET, NFC_SECRET_KEY |

**Session-local helpers (git-ignored, Windows deploy laptop only):**

| Path | Purpose |
|---|---|
| `scripts/r.sh` | PuTTY plink/pscp wrapper with host key pinned |
