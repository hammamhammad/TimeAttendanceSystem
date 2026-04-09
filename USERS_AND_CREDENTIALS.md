# TecAxle HRMS — Users & Credentials

## System Architecture

| Component | URL | Database |
|-----------|-----|----------|
| Backend API | http://localhost:5099 | Routes dynamically per tenant |
| Admin Portal | http://localhost:4200 | — |
| Self-Service Portal | http://localhost:4201 | — |
| Master Database | — | `tecaxle_master` |
| Tenant 1 Database | — | `ta_tenant_1` |

---

## User Hierarchy

```
TecAxle Platform
├── Platform Admin (admin@tecaxle.com)             ← Manages ALL tenants
│   └── Lives in: tecaxle_master.PlatformUsers
│
├── Tenant: Nadek (email: info@nadek.com)
│   ├── SystemAdmin (systemadmin@nadek.com)        ← Full admin within tenant
│   ├── Branch Managers
│   ├── Department Managers
│   └── Regular Employees
│       └── All live in: ta_tenant_{id}.Users
│
└── Tenant: Default Organization (no company email)
    ├── SystemAdmin (tecaxleadmin@default.clockn.net) ← fallback pattern
    ├── Branch Managers
    └── Employees
        └── All live in: ta_tenant_1.Users
```

---

## Platform Admin

| Field | Value |
|-------|-------|
| **Email** | `admin@tecaxle.com` |
| **Password** | `TecAxle@Admin2026!` |
| **Role** | TecAxleAdmin |
| **Access** | All tenants, subscription plans, platform management |
| **Login Endpoint** | `POST /api/v1/auth/login` |
| **Stored In** | `tecaxle_master` → `PlatformUsers` table |
| **Must Change Password** | No (system account) |
| **After Login** | Redirected to `/tenants` page |
| **Sidebar** | Only shows: Platform (Tenants, Subscription Plans) |

---

## Tenant SystemAdmin (per tenant)

Every tenant gets a SystemAdmin user during provisioning. The email uses the **company's email domain** (not clockn.net). Same password across all tenants.

| Field | Value |
|-------|-------|
| **Email Pattern** | `tecaxleadmin@{company_domain}` |
| **Example** | Company email `info@nadek.com` → admin = `tecaxleadmin@nadek.com` |
| **Fallback** | If no company email → `tecaxleadmin@{subdomain}.clockn.net` |
| **Username** | `tecaxleadmin` |
| **Password** | `TecAxle@Sys2026!` |
| **Role** | SystemAdmin |
| **Access** | Full admin within their tenant, all branches |
| **Login Endpoint** | `POST /api/v1/auth/login` |
| **Stored In** | `ta_tenant_{id}` → `Users` table |
| **Must Change Password** | No (system account) |
| **After Login** | Redirected to `/dashboard` |

### Examples:
| Company | Company Email | SystemAdmin Email |
|---------|--------------|-------------------|
| Nadek | `info@nadek.com` | `tecaxleadmin@nadek.com` |
| Acme Corp | `hr@acme-corp.com` | `tecaxleadmin@acme-corp.com` |
| Default Org (no email set) | — | `tecaxleadmin@default.clockn.net` |

### For Tenant 1 (Default Organization — no company email):
- **Email**: `systemadmin@default.clockn.net`
- **Password**: `TecAxle@Sys2026!`

---

## Sample Employees (Tenant 1)

All sample employees use password: **`Emp@123!`**

Login via: `POST /api/v1/auth/login` with `{ "email": "...", "password": "Emp@123!" }`

### Branch Managers

| Email | Name | Branch |
|-------|------|--------|
| `ahmed.rashid@company.com` | Ahmed Al-Rashid | HQ Riyadh |
| `khalid.otaibi@company.com` | Khalid Al-Otaibi | Jeddah |
| `mohammed.qahtani@company.com` | Mohammed Al-Qahtani | Dammam |
| `salma.khaldi@company.com` | Salma Al-Khaldi | Madinah |
| `fahad.harbi@company.com` | Fahad Al-Harbi | Makkah |

### Department Managers (HQ Riyadh)

| Email | Name | Department |
|-------|------|------------|
| `sara.fahad@company.com` | Sara Al-Fahad | HR |
| `omar.nasser@company.com` | Omar Al-Nasser | IT |
| `fatima.zahrani@company.com` | Fatima Al-Zahrani | Finance |
| `youssef.shamrani@company.com` | Youssef Al-Shamrani | Operations |

### All Users (50 total)
- 5 Branch Managers (1 per branch)
- 20 Department Managers (4 per branch)
- 25 Regular Employees (5 per branch)

---

## Login Flow

```
User enters email + password
    │
    ▼
Backend queries TenantUserEmails (tecaxle_master)
    │
    ├── Found in 1 tenant → Authenticate against that tenant's DB
    │   └── JWT with tenant_id claim
    │
    ├── Found in multiple tenants → Return tenant selection list
    │   └── User picks tenant → Re-authenticate
    │
    └── Not found in tenants → Check PlatformUsers (tecaxle_master)
        ├── Found → Authenticate as Platform Admin
        │   └── JWT with platform_role claim
        └── Not found → "Invalid credentials"
```

---

## Databases

| Database | Purpose | Tables of Interest |
|----------|---------|-------------------|
| `tecaxle_master` | Master/platform DB | `Tenants`, `PlatformUsers`, `TenantUserEmails`, `SubscriptionPlans`, `TenantSubscriptions` |
| `ta_tenant_1` | Tenant 1 business data | `Users`, `Employees`, `Branches`, `Departments`, `AttendanceRecords`, ... |

### When a New Tenant is Provisioned

1. Tenant record created in `tecaxle_master`
2. New PostgreSQL database `ta_tenant_{id}` created
3. All EF Core migrations applied
4. Base data seeded (permissions, roles, default shift, workflows, vacation types)
5. SystemAdmin user created: `tecaxleadmin@{subdomain}.clockn.net` / `TecAxle@Sys2026!`
6. Email mapped in `tecaxle_master.TenantUserEmails`
7. Subscription plan assigned
8. Tenant status set to Active

---

## Subscription Plans (Seeded)

| Plan | Monthly | Annual | Modules | Employee Limit |
|------|---------|--------|---------|---------------|
| **Starter** | $49 | $490 | 5 core modules | 50 |
| **Professional** | $149 | $1,490 | 13 modules | 500 |
| **Enterprise** | $399 | $3,990 | All 26 modules | Unlimited |

Platform Admin can create/edit/delete custom plans via `/subscription-plans`.

---

## Quick Test Commands

```bash
# Platform Admin login
curl -X POST http://localhost:5099/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tecaxle.com","password":"TecAxle@Admin2026!"}'

# Tenant SystemAdmin login
curl -X POST http://localhost:5099/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"tecaxleadmin@default.clockn.net","password":"TecAxle@Sys2026!"}'

# Employee login
curl -X POST http://localhost:5099/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmed.rashid@company.com","password":"Emp@123!"}'
```

---

**Last Updated**: April 8, 2026
