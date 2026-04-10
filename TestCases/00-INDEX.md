# TecAxle HRMS — Master Test Case Index

## Overview

This document serves as the master index for all QA test cases covering the TecAxle HRMS system. Test cases cover every page, form field, validation rule, calculation formula, error path, and permission check across the Admin Portal and Self-Service Portal.

**Total Test Cases**: ~1,315+
**Documents**: 35 test case files + this index
**Last Updated**: April 10, 2026

---

## Test Environment

### Application URLs

| Application | Development | Production |
|-------------|------------|------------|
| Backend API | http://localhost:5099 | https://api.clockn.net |
| Admin Portal | http://localhost:4200 | https://www.clockn.net |
| Self-Service Portal | http://localhost:4201 | https://portal.clockn.net |
| Swagger Docs | http://localhost:5099/swagger | N/A |

### Test User Credentials

| Role | Email/Username | Password | Employee ID | Notes |
|------|---------------|----------|-------------|-------|
| Platform Admin | (from master seed) | (from master seed) | N/A | Cross-tenant management |
| System Admin (Tenant) | systemadmin@{domain} | TecAxle@Sys2026! | N/A | IsSystemUser=true, all permissions |
| TecAxle Admin (Tenant) | tecaxleadmin@{domain} | TecAxle@Sys2026! | N/A | IsSystemUser=true, all permissions |
| Branch Manager | ahmed.rashid@company.com | Emp@123! | 1001 | Headquarters - Riyadh |
| Dept Manager | sara.fahad@company.com | Emp@123! | 1006 | HR Department |
| Employee | salma.khaldi@company.com | Emp@123! | 1026 | Regular employee |

> **Note**: All sample employee accounts have `MustChangePassword=true`. Change password on first login before testing.

### Test Data (from sample-data-with-users.sql)

| Entity | Count | ID Range | Details |
|--------|-------|----------|---------|
| Branches | 5 | 101-105 | Headquarters-Riyadh, Jeddah, Dammam, Madinah, Makkah |
| Departments | 20 | 101-120 | 4 per branch: HR, IT, Finance, Operations |
| Employees | 50 | 1001-1050 | 1 Branch Mgr + 4 Dept Mgrs + 5 Regular per branch |
| Users | 50 | — | One per employee, email-based login |

### Subscription Plan Tiers

| Plan | Modules | Employee Limit |
|------|---------|---------------|
| Starter | 5 modules | 50 |
| Professional | 13 modules | 500 |
| Enterprise | All 26 modules | Unlimited |

---

## Priority Definitions

| Priority | Definition | Examples |
|----------|-----------|----------|
| **P0** | Auth/data blocker — system unusable if broken | Login, tenant resolution, data isolation, CRUD save |
| **P1** | Core business logic — incorrect behavior | Calculations, balance formulas, workflow rules, validations |
| **P2** | Important secondary — degraded experience | Filters, exports, notifications, read-only mode |
| **P3** | Edge case/cosmetic — minor impact | Boundary values, RTL edge cases, cache timing |

---

## Test Case Documents

### Phase 1: Authentication, Platform & Core Access Control

| # | File | Module Code | Est. Cases | P0 | P1 | P2 | P3 | Coverage |
|---|------|------------|-----------|----|----|----|----|----------|
| 01 | [01-AUTH-authentication.md](01-AUTH-authentication.md) | AUTH | ~55 | 15 | 25 | 10 | 5 | Login, JWT, 2FA, password, lockout, sessions |
| 02 | [02-PLAT-platform-management.md](02-PLAT-platform-management.md) | PLAT | ~50 | 10 | 25 | 10 | 5 | Tenant CRUD, provisioning, subscriptions, plans |
| 03 | [03-ENT-entitlements-modules.md](03-ENT-entitlements-modules.md) | ENT | ~40 | 8 | 20 | 8 | 4 | Module enforcement, guards, freeze/unfreeze |
| 04 | [04-ORG-organization.md](04-ORG-organization.md) | ORG | ~60 | 10 | 30 | 15 | 5 | Branches, departments, employees |
| 05 | [05-USR-users-roles.md](05-USR-users-roles.md) | USR | ~50 | 10 | 25 | 10 | 5 | Users, roles, permissions, system user protection |

### Phase 2: Time & Attendance, Shifts, Overtime

| # | File | Module Code | Est. Cases | P0 | P1 | P2 | P3 | Coverage |
|---|------|------------|-----------|----|----|----|----|----------|
| 06 | [06-SHIFT-shifts.md](06-SHIFT-shifts.md) | SHIFT | ~50 | 5 | 30 | 10 | 5 | Shift types, periods, assignments, priority |
| 07 | [07-ATT-attendance.md](07-ATT-attendance.md) | ATT | ~70 | 15 | 35 | 15 | 5 | Status rules, calculations, reports, GPS+NFC |
| 08 | [08-OT-overtime-config.md](08-OT-overtime-config.md) | OT | ~30 | 3 | 20 | 5 | 2 | OT config, calculation formulas, rates |

### Phase 3: Leave, Excuses, Remote Work, Workflows

| # | File | Module Code | Est. Cases | P0 | P1 | P2 | P3 | Coverage |
|---|------|------------|-----------|----|----|----|----|----------|
| 09 | [09-LEAVE-leave-management.md](09-LEAVE-leave-management.md) | LEAVE | ~55 | 12 | 28 | 10 | 5 | Vacation types, balances, accrual, carryover |
| 10 | [10-EXCUSE-excuse-management.md](10-EXCUSE-excuse-management.md) | EXCUSE | ~40 | 5 | 22 | 8 | 5 | Excuse policies, requests, balance tracking |
| 11 | [11-RW-remote-work.md](11-RW-remote-work.md) | RW | ~30 | 3 | 18 | 6 | 3 | Remote work policies, requests, blackouts |
| 12 | [12-WF-approval-workflows.md](12-WF-approval-workflows.md) | WF | ~55 | 10 | 30 | 10 | 5 | Workflow engine, delegation, escalation, timeout |

### Phase 4: Settings, NFC, Reports, Dashboards

| # | File | Module Code | Est. Cases | P0 | P1 | P2 | P3 | Coverage |
|---|------|------------|-----------|----|----|----|----|----------|
| 13 | [13-SET-settings-configuration.md](13-SET-settings-configuration.md) | SET | ~45 | 5 | 25 | 10 | 5 | Inheritance chain, tenant config, templates |
| 14 | [14-NFC-nfc-notifications.md](14-NFC-nfc-notifications.md) | NFC | ~25 | 3 | 12 | 7 | 3 | NFC tags, notifications, SignalR |
| 15 | [15-RPT-reports.md](15-RPT-reports.md) | RPT | ~30 | 3 | 15 | 8 | 4 | All reports, audit logs, sessions, export |
| 16 | [16-DASH-dashboards.md](16-DASH-dashboards.md) | DASH | ~25 | 3 | 10 | 8 | 4 | Admin, employee, manager, analytics dashboards |

### Phase 5: HR Modules

| # | File | Module Code | Est. Cases | P0 | P1 | P2 | P3 | Coverage |
|---|------|------------|-----------|----|----|----|----|----------|
| 17 | [17-LC-employee-lifecycle.md](17-LC-employee-lifecycle.md) | LC | ~40 | 5 | 22 | 8 | 5 | Contracts, promotions, transfers, salary adj |
| 18 | [18-PAY-payroll.md](18-PAY-payroll.md) | PAY | ~30 | 5 | 15 | 7 | 3 | Salary structures, payroll periods, EOS |
| 19 | [19-ALW-allowances.md](19-ALW-allowances.md) | ALW | ~30 | 3 | 17 | 7 | 3 | Types, policies, assignments, requests |
| 20 | [20-REC-recruitment.md](20-REC-recruitment.md) | REC | ~45 | 5 | 25 | 10 | 5 | Full recruitment pipeline |
| 21 | [21-ONB-onboarding.md](21-ONB-onboarding.md) | ONB | ~25 | 3 | 13 | 6 | 3 | Templates, processes, tasks, dashboard |
| 22 | [22-PERF-performance.md](22-PERF-performance.md) | PERF | ~40 | 3 | 22 | 10 | 5 | Reviews, goals, competencies, PIPs, 360 |
| 23 | [23-OFF-offboarding.md](23-OFF-offboarding.md) | OFF | ~35 | 5 | 18 | 8 | 4 | Resignations, terminations, settlements |
| 24 | [24-BEN-benefits.md](24-BEN-benefits.md) | BEN | ~25 | 3 | 13 | 6 | 3 | Plans, enrollment, claims |

### Phase 6: Extended Modules

| # | File | Module Code | Est. Cases | P0 | P1 | P2 | P3 | Coverage |
|---|------|------------|-----------|----|----|----|----|----------|
| 25 | [25-DOC-documents.md](25-DOC-documents.md) | DOC | ~30 | 3 | 15 | 8 | 4 | Categories, docs, policies, letters |
| 26 | [26-EXP-expenses-loans.md](26-EXP-expenses-loans.md) | EXP | ~35 | 3 | 18 | 10 | 4 | Expenses, loans, salary advances |
| 27 | [27-SUC-succession-planning.md](27-SUC-succession-planning.md) | SUC | ~30 | 2 | 15 | 8 | 5 | Key positions, talent, career paths |
| 28 | [28-TRN-training.md](28-TRN-training.md) | TRN | ~30 | 2 | 15 | 8 | 5 | Programs, courses, certifications |
| 29 | [29-ENG-engagement.md](29-ENG-engagement.md) | ENG | ~35 | 3 | 18 | 9 | 5 | Announcements, surveys, relations |
| 30 | [30-MISC-timesheets-assets.md](30-MISC-timesheets-assets.md) | MISC | ~30 | 2 | 15 | 8 | 5 | Timesheets, assets |
| 31 | [31-SWAP-shiftswaps-oncall-compensatory.md](31-SWAP-shiftswaps-oncall-compensatory.md) | SWAP | ~25 | 2 | 13 | 7 | 3 | Shift swaps, on-call, comp-off, encashment |

### Phase 7: Self-Service, Cross-Module, i18n

| # | File | Module Code | Est. Cases | P0 | P1 | P2 | P3 | Coverage |
|---|------|------------|-----------|----|----|----|----|----------|
| 32 | [32-SS-self-service-portal.md](32-SS-self-service-portal.md) | SS | ~60 | 10 | 25 | 15 | 10 | All 37+ self-service pages |
| 33 | [33-E2E-cross-module-workflows.md](33-E2E-cross-module-workflows.md) | E2E | ~35 | 8 | 20 | 5 | 2 | End-to-end business process flows |
| 34 | [34-I18N-navigation-a11y.md](34-I18N-navigation-a11y.md) | I18N | ~25 | 2 | 10 | 8 | 5 | EN/AR, RTL, navigation, responsive |

---

## Coverage Summary

| Category | Test Cases | Description |
|----------|-----------|-------------|
| UI (Page Render & Navigation) | ~200 | Every page loads, routes work, components render |
| Form Validation | ~250 | Every field, every rule, boundary values, error messages |
| Business Rules | ~300 | Calculations, formulas, status determination, policies |
| Authorization | ~100 | Permissions, guards, role-based access, system user protection |
| Integration/Workflow | ~150 | Multi-step processes, approval flows, cross-module |
| Negative/Error | ~150 | Invalid inputs, insufficient balance, locked accounts |
| Edge Cases | ~100 | Boundary values, concurrent operations, cache timing |
| Calculation Verification | ~65 | Attendance, overtime, leave balance, settlement formulas |

---

## Existing Automated Test Cross-Reference

| Area | Existing Tests | Location |
|------|---------------|----------|
| Backend Unit Tests | 10 files (xUnit) | `src/Tests/` |
| Playwright E2E | 61 spec files | `e2e/tests/` (16 categories) |
| E2E Page Objects | 30+ admin, portal POs | `e2e/pages/` |
| E2E Fixtures | Test data, API helpers | `e2e/fixtures/` |

---

## Execution Prerequisites

Before executing test cases:

- [ ] PostgreSQL running with master database (`tecaxle_master`)
- [ ] Backend API started on port 5099
- [ ] Admin frontend started on port 4200
- [ ] Self-service frontend started on port 4201
- [ ] At least one tenant provisioned with sample data loaded
- [ ] Test user passwords changed (MustChangePassword on first login)
- [ ] Swagger accessible at http://localhost:5099/swagger
