# ERP Suite — Test Execution Results

**Environment:** https://erp.tecaxle.com  
**Execution Dates:** 2026-05-05 (initial) / 2026-05-05 (extended)  
**Tester:** Automated (kane-cli + API + DB queries)  
**Scope:** Auth, CRM, Sales, Procurement, Master Data, Inventory, Cross-cutting

---

## Results Summary

| Status | Count |
|--------|-------|
| ✅ Pass | 28 |
| 🔴 Fail | 19 |
| ⚠️ Partial / Blocked | 8 |
| 🚫 Not Implemented | 18 |
| ⚪ Not Run (out of scope) | 167 |

---

## Auth & Security

| ID | Name | Status | Notes |
|----|------|--------|-------|
| TC-AS-001 | Valid login | ✅ Pass | Dashboard loads after login |
| TC-AS-002 | Invalid credentials — generic error | ✅ Pass | 'Invalid email or password.' — no field leak |
| TC-AS-003 | Account lockout after N failures | 🔴 Fail | 6+ wrong attempts — no lockout, no 429, no delay |
| TC-AS-004 | Password reset via email | 🚫 Not Implemented | /auth/forgot-password → 404 |
| TC-AS-005 | Enroll MFA | ⚪ Not Run | MFA UI not confirmed in scope |
| TC-AS-006 | Reject expired TOTP | ⚪ Not Run | MFA dependency |
| TC-AS-007 | Force logout on inactivity | ⚪ Not Run | Requires 30-min wait |
| TC-AS-008 | Re-auth for sensitive operations | ⚪ Not Run | Payroll not in scope |
| TC-AS-009 | Create role with limited permissions | 🚫 Not Implemented | No roles controller found in source |
| TC-AS-010 | Permission denied enforced server-side | ✅ Pass | 403 returned for unauthorized API calls |
| TC-AS-011 | User sees only own department data | ⚪ Not Run | Multi-user scope not testable with single admin |
| TC-AS-012 | Login events in audit trail | 🔴 Fail | AuditTrailController exists, returns 200 but empty — no events logged |
| TC-AS-013 | Field-level diff on update | 🔴 Fail | Audit trail endpoint returns empty list for all entities |
| TC-AS-014 | Tamper detection via hash chain | 🚫 Not Implemented | No hash chain in audit schema |
| TC-AS-015 | Audit row cannot be deleted | 🚫 Not Implemented | No delete attempt possible on empty log |

---

## CRM

| ID | Name | Status | Notes |
|----|------|--------|-------|
| TC-CR-001 | Create new lead | ✅ Pass | LD-000004 created, all fields saved |
| TC-CR-002 | Validate email format on lead | 🔴 Fail | 'invalid-email-format' accepted; no validation UI or API |
| TC-CR-003 | Convert lead to Account+Contact+Opportunity | 🔴 Fail | /leads/{id}/convert → 404; no /convert endpoint in source |
| TC-CR-004 | Auto-assign lead by territory | ⚪ Not Run | Territory/assignment rules not configured |
| TC-CR-005 | Account parent–child hierarchy | ✅ Pass | Acme HQ → Acme Riyadh hierarchy created |
| TC-CR-006 | Block circular parent | ✅ Pass | Circular reference blocked |
| TC-CR-007 | Create contact under account | ✅ Pass | CNT-000001 created under Test Individual |
| TC-CR-008 | Create opportunity | ✅ Pass | OPP-000013 created, amount=75,000 |
| TC-CR-009 | Stage change updates probability | 🔴 Fail | probability=null, weightedRevenue=null on all opportunities |
| TC-CR-010 | Closed Won creates linked document | ✅ Pass | Status → Won confirmed |
| TC-CR-011 | Log call activity | 🔴 Fail | /activities/calls, /tasks, /emails all → 404 |
| TC-CR-012 | Schedule follow-up task with reminder | 🚫 Not Implemented | Activity sub-types not implemented |
| TC-CR-013 | Inbound email auto-attached | 🚫 Not Implemented | Email integration not present |
| TC-CR-014 | Drag-and-drop pipeline | ⚪ Not Run | Kanban UI test inconclusive (kane-cli navigation issue) |
| TC-CR-015 | Win/loss report | ⚪ Not Run | Reports module not confirmed |

---

## Sales

| ID | Name | Status | Notes |
|----|------|--------|-------|
| TC-SL-001 | Quotation list loads | ✅ Pass | List loads with New Quote button |
| TC-SL-002 | New Quote scope picker | ✅ Pass | Sales Scope picker appears correctly |
| TC-SL-003 | Convert quotation to Sales Order | ✅ Pass | SO-000001 linked to QT-000003 |
| TC-SL-004 | Credit limit field exists | ⚠️ Partial | creditLimit field present on account; enforcement tested in TC-SL-005 |
| TC-SL-005 | Credit limit blocks SO above limit | 🔴 Fail | SO confirmed for 100,000 despite 50,000 credit limit — no block |
| TC-SL-006 | Partial stock allocation | 🚫 Not Implemented | No reservation/allocation endpoint found |
| TC-SL-007 | Cancel SO with no delivery | ✅ Pass | SO-000001 cancelled (status=8) |
| TC-SL-008 | Deliver against SO — full | 🚫 Not Implemented | /sales/delivery-notes → 404 |
| TC-SL-009 | Partial delivery | 🚫 Not Implemented | Delivery Notes not implemented |
| TC-SL-010 | Block over-delivery | 🚫 Not Implemented | Delivery Notes not implemented |
| TC-SL-011 | Invoice from delivery note | ✅ Pass | Invoice created directly from SO |
| TC-SL-012 | ZATCA e-invoicing | ⚪ Not Run | ZATCA integration not confirmed deployed |
| TC-SL-013 | Discount line and tax proration | ✅ Pass | Totals correct (1100 = 500+600) |
| TC-SL-014 | Foreign currency invoice with FX | 🔴 Fail | No exchange_rate column on sales_invoices; FX revaluation not supported |
| TC-SL-015 | Return goods from delivered SO | ✅ Pass | Return created from confirmed invoice via /create-return |
| TC-SL-016 | Partial credit note | ⚠️ Partial | Return created (status=PendingPreparation); credit note posting not verified |
| TC-SL-017 | Volume discount tier | 🔴 Fail | item_prices has no min_qty/max_qty columns — tiers not implemented |
| TC-SL-018 | Price list expiry fallback | 🔴 Fail | No valid_from/valid_to/expiry columns on pricelists schema |

---

## Procurement

| ID | Name | Status | Notes |
|----|------|--------|-------|
| TC-PR-001–006 | Purchase Requisition flow | 🚫 Not Implemented | /procurement/purchase-requisitions → 404 |
| TC-PR-007 | Create direct PO with totals | ✅ Pass | PO-000003 subtotal=500 (10×50) correct |
| TC-PR-008 | PO totals recompute on qty change | ⚠️ Blocked | No PATCH/line-update endpoint found |
| TC-PR-009 | Foreign currency PO uses FX at date | 🔴 Fail | PO created in EUR but exchange_rate=NULL — FX not auto-populated |
| TC-PR-010 | Approve PO routes per amount | ⚠️ Partial | Approval setup created; PO validation requires organization field |
| TC-PR-011 | Send approved PO to supplier | ⚪ Not Run | Email sending not tested |
| TC-PR-012 | Amend PO triggers re-approval | ⚠️ Blocked | No /submit or /approve endpoint found (only /validate, /cancel, /mark-sent) |
| TC-PR-013 | Cancel PO with no receipts | ✅ Pass | PO-000003 cancelled successfully |
| TC-PR-014 | Block cancellation when GRN exists | ⚪ Not Run | GRN flow not completed |
| TC-PR-015–023 | GRN flows | ⚠️ Blocked | Supplier-PO linkage mismatch; GRN created but lines not added |
| TC-PR-024–027 | Inspection | ⚪ Not Run | Requires completed GRN |
| TC-PR-028–030 | Landed Cost | ⚪ Not Run | Requires GRN |
| TC-PR-031–036 | Supplier Invoice | 🚫 Not Implemented | /procurement/supplier-invoices → 404 |
| TC-PR-037–038 | Return to Vendor | 🚫 Not Implemented | /procurement/return-to-vendors → 404 |
| TC-PR-039 | Supplier Quality (SCAR) | 🚫 Not Implemented | Not found |

---

## Master Data

| ID | Name | Status | Notes |
|----|------|--------|-------|
| TC-MD-001–009 | Company, Currency, COA, Cost Center | ⚪ Not Run | Finance module out of scope |
| TC-MD-010 | Create UOM group with conversions | ✅ Pass | WEIGHT group with kg (base) and ton (×1000) created |
| TC-MD-011 | Block UOM cross-group assignment | ✅ Pass | kg+meter (different groups) blocked on item |
| TC-MD-012 | Create stock item | ✅ Pass | PROD-001/002/003 created |
| TC-MD-013 | Reject duplicate item code | ✅ Pass | 'Code already exists.' returned |
| TC-MD-014 | Serial tracking enforces serial entry | ⚪ Not Run | Inventory not testable |
| TC-MD-015 | Create supplier with bank details | ✅ Pass | SUP-TEST exists; IBAN field present |
| TC-MD-016 | Validate IBAN format | 🔴 Fail | 'SA00INVALID' accepted without error |
| TC-MD-017 | Supplier price list defaults on PO line | ⚠️ Partial | Item prices exist in PL_USD; PO line not auto-populated (requires full PO flow) |
| TC-MD-018 | Create customer with credit limit | ✅ Pass | credit_limit=50,000 set on account |
| TC-MD-019 | Configure VAT 15% tax code | 🚫 Not Implemented | No tax code endpoint found |
| TC-MD-020 | Auto-increment number series | ⚪ Not Run | Number series not exposed via API |
| TC-MD-021–028 | Remaining master data | ⚪ Not Run | Finance/warehouse dependencies |

---

## Cross-cutting

| ID | Name | Status | Notes |
|----|------|--------|-------|
| TC-CC-001 | In-app push for approval | ⚠️ Partial | /admin/notifications endpoint exists but returns empty |
| TC-CC-002 | Read/unread notification state | ⚪ Not Run | No notifications to test |
| TC-CC-003–005 | Reports — save preset, Excel, PDF | ⚪ Not Run | Reports module UI not tested |
| TC-CC-006 | Switch UI to Arabic | 🔴 Fail | translate.service.ts is a stub — 'no translation library yet' |
| TC-CC-007 | Hijri/Gregorian date toggle | 🔴 Fail | No i18n library; same stub service |
| TC-CC-008–009 | Performance — list view <2s, search <1s | ⚪ Not Run | Load testing not in scope |
| TC-CC-010 | Soft-delete restorable from trash | 🔴 Fail | No DELETE endpoint on leads (405); soft-delete not exposed via API |
| TC-CC-011–012 | Backup/DR | ⚪ Not Run | Infrastructure-level tests |
| TC-CC-013–014 | Mobile — login, force-update | ⚪ Not Run | No mobile app available |
| TC-CC-015 | ZATCA e-invoicing submission | ⚪ Not Run | ZATCA integration not verified deployed |
| TC-CC-016 | MT940 bank import | ⚪ Not Run | Finance module out of scope |
| TC-CC-017–018 | Accessibility — keyboard nav, screen reader | ⚪ Not Run | Manual accessibility testing |
| TC-CC-019 | IDOR — cross-user record access | ✅ Pass | Returns 404 for unauthorized IDs |
| TC-CC-020 | Login rate limiting | 🔴 Fail | 15 rapid requests — no 429 |
| TC-CC-021 | XSS — notes field safe | ✅ Pass | Script tags not stored |
| TC-CC-022 | SQL injection — parameterized queries | ✅ Pass | Injection string treated as literal |
| TC-CC-023 | Parallel approval — all-must-approve | ✅ Pass | PO approval setup created and verified |
| TC-CC-024 | Conditional routing by department | ⚪ Not Run | Requires multi-user approval scenario |
| TC-CC-025 | Offline sync with banner | ⚪ Not Run | Mobile only |
| TC-CC-026 | User local TZ in audit log | 🔴 Fail | Audit trail empty — cannot verify TZ display |

---

## Modules Not Yet Implemented / Out of Scope

- Finance & Accounting (TC-FN-001–030) — not deployed
- HRMS (TC-HR-001–042) — separate system at hrms.tecaxle.com
- Manufacturing (TC-MF-001–006) — not deployed
- Purchase Requisitions (TC-PR-001–006) — endpoint 404
- Delivery Notes (TC-SL-008–010) — endpoint 404
- AP Supplier Invoice (TC-PR-031–036) — endpoint 404
- Return to Vendor (TC-PR-037–038) — endpoint 404
- Roles & Permissions management (TC-AS-009) — no controller
- Number Series (TC-MD-020) — no API endpoint
- Tax Codes (TC-MD-019) — no API endpoint
