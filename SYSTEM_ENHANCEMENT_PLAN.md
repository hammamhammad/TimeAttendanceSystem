# Time Attendance System - Complete Enhancement Plan

**Created**: December 14, 2025
**Last Updated**: January 30, 2026
**Version**: 1.3
**Status**: In Progress - Mobile ESS Platform Development

---

## Executive Summary

Transform the Time Attendance System into a complete enterprise-ready standalone solution with:
1. Dynamic configurable approval workflows
2. Missing essential features
3. Advanced enterprise features
4. Best practices implementation

---

## Current Progress Summary

### Phase 1: Workflow Foundation ✅ COMPLETE (December 14-15, 2025)

**What's Been Implemented:**
- ✅ Complete workflow domain model (6 entities)
- ✅ Database schema and migrations applied
- ✅ Backend API endpoints for workflow management
- ✅ Admin UI for workflow configuration
- ✅ Workflow list, create, edit, and view pages
- ✅ Navigation menu integration
- ✅ Permission-based access control
- ✅ Bilingual support (English & Arabic translations)
- ✅ Workflow definitions support for 6 entity types
- ✅ Multi-step sequential approval chains
- ✅ 4 approver types (DirectManager, DepartmentHead, Role, SpecificUser)
- ✅ Branch-specific and organization-wide workflows

**Files Created:**
- **Backend (18 files):**
  - Domain: WorkflowDefinition, WorkflowStep, WorkflowInstance, WorkflowStepExecution, ApprovalDelegation + 5 enums
  - Application: 10+ CQRS commands/queries
  - API: WorkflowsController, ApprovalsController
  - Infrastructure: 5 EF configurations + migration

- **Frontend (6 files):**
  - workflow-list.component (ts/html/css)
  - workflow-form.component (ts/html/css)
  - workflows.service.ts
  - Updated: app.routes.ts, menu.service.ts, en.json, ar.json

**API Endpoints Available:**
- `GET/POST/PUT/DELETE /api/v1/workflows` - CRUD operations
- `POST /api/v1/workflows/{id}/activate` - Activate workflow
- `POST /api/v1/workflows/{id}/deactivate` - Deactivate workflow
- `GET /api/v1/approvals` - Approvals endpoints (structure ready)

---

### Phase 2: Leave Balance System 🔄 IN PROGRESS (December 20-21, 2025)

**What's Been Implemented:**
- ✅ Leave management domain entities (LeaveEntitlement, LeaveBalance, LeaveTransaction, LeaveAccrualPolicy)
- ✅ Database schema and migrations applied (AddLeaveManagementTables, AddLeaveBalancePermissions)
- ✅ Backend API endpoints for leave balance management (LeaveBalancesController)
- ✅ Leave accrual service implementation
- ✅ Monthly leave accrual background job (Coravel)
- ✅ Leave Entitlements list page (admin UI)
- ✅ Leave Entitlement create/edit form (admin UI)
- ✅ Bilingual translations for Leave Balance module (English & Arabic)
- ✅ Navigation menu integration (Settings > Leave Entitlements)
- ✅ Permission-based access control (leave_balance.read, create, update, delete)
- ✅ Reusable components integration (PageHeaderComponent, FormHeaderComponent, FormSectionComponent)
- ✅ Full form styling matching system standards (two-column layout, card wrapper)

**Files Created/Modified:**
- **Backend:**
  - Domain: LeaveEntitlement.cs, LeaveBalance.cs, LeaveTransaction.cs, LeaveAccrualPolicy.cs
  - Application: LeaveManagement commands/queries, ILeaveAccrualService.cs, LeaveAccrualService.cs
  - API: LeaveBalancesController.cs
  - Infrastructure: 5 EF configurations + 2 migrations, MonthlyLeaveAccrualJob.cs

- **Frontend:**
  - leave-entitlements-list.component (ts/html/css)
  - leave-entitlement-form.component (ts/html/css)
  - leave-balance.service.ts
  - leave-balance.model.ts
  - Updated: app.routes.ts, menu.service.ts, en.json (35+ new translations), ar.json (35+ new translations)

**API Endpoints Available:**
- `GET /api/v1/leave-balances/entitlements` - List entitlements
- `GET /api/v1/leave-balances/entitlements/{id}` - Get entitlement
- `POST /api/v1/leave-balances/entitlements` - Create entitlement
- `PUT /api/v1/leave-balances/entitlements/{id}` - Update entitlement
- `DELETE /api/v1/leave-balances/entitlements/{id}` - Delete entitlement
- `GET /api/v1/leave-balances/employee/{employeeId}` - Get employee balances
- `POST /api/v1/leave-balances/adjust` - Adjust balance
- `POST /api/v1/leave-balances/process-monthly-accrual` - Process accrual

**Next Steps:**
1. Create Leave Balance summary/dashboard component
2. Add Leave Balance tab to Employee detail view
3. Update vacation request form to show current balance
4. Validate vacation requests against available balance
5. Implement bulk entitlement upload feature

---

### Phase 3: Mobile ESS Platform 🔄 IN PROGRESS (January 30, 2026)

**What's Been Implemented:**

#### Flutter Project Setup
- ✅ Flutter SDK installed locally (`flutter/` directory)
- ✅ Project initialized with Android, iOS, Windows, Web platforms
- ✅ Dependencies configured (Riverpod, Dio, Retrofit, Freezed, GoRouter, etc.)
- ✅ Code generation setup (build_runner, json_serializable)
- ✅ Analysis options and linting rules

#### Core Architecture
- ✅ Multi-tenant API client with dynamic base URL
- ✅ JWT authentication with secure token storage
- ✅ Auth interceptor for automatic token refresh
- ✅ Riverpod state management setup
- ✅ GoRouter navigation with auth guards
- ✅ Material 3 theme (light/dark modes)
- ✅ Bilingual localization (English/Arabic)

#### Feature Screens
- ✅ Tenant Discovery screen (company URL entry)
- ✅ Login screen (email/password + biometric)
- ✅ Home dashboard (employee summary)
- ✅ Attendance screen (GPS + NFC dual verification)
- ✅ Leave list screen (view/create requests)
- ✅ Notifications screen
- ✅ Profile screen (settings, language, logout)
- ✅ Excuse list screen (late arrival/early departure)

#### Providers & State Management
- ✅ Auth provider (login, logout, token management)
- ✅ Attendance provider (GPS/NFC verification flow)
- ✅ Leave provider (balance, requests, create)
- ✅ Notification provider (list, read/unread)
- ✅ Dashboard provider (home screen data)
- ✅ Excuse provider (request management)
- ✅ Locale provider (language switching)

#### Models (Freezed)
- ✅ User model & AuthResponse
- ✅ Attendance models (CheckLocation, Transaction)
- ✅ Leave models (Request, Balance, Type)
- ✅ Notification model
- ✅ Excuse model

#### Common Widgets
- ✅ Loading indicators (full, small, shimmer)
- ✅ Error states (full, banner, empty)
- ✅ Button components (primary, outlined, FAB)
- ✅ Form inputs (text, password, dropdown, date)
- ✅ Stats cards (dashboard widgets)
- ✅ Main shell with bottom navigation

#### Services
- ✅ Secure storage service (tokens, tenant config)
- ✅ Device info service (device ID, model, OS)
- ✅ Push notification service (Firebase FCM ready)

**Project Structure:**
```
ess_mobile_app/
├── lib/
│   ├── main.dart
│   ├── app/                    # App config & routing
│   ├── core/                   # Config, network, storage, theme, l10n
│   ├── shared/                 # Models, providers, widgets, services
│   └── features/               # Screens by feature
├── android/                    # Android project
├── ios/                        # iOS project
├── windows/                    # Windows desktop project
└── web/                        # Web project
```

**How to Run:**
```powershell
cd ess_mobile_app
../flutter/bin/flutter run -d windows   # Windows desktop
../flutter/bin/flutter run              # Android/iOS
```

**Remaining Tasks:**
- [ ] Attendance history screen with calendar view
- [ ] Leave balance visualization
- [ ] Remote work request feature
- [ ] Manager approval screens (for team leads)
- [ ] Shift schedule display
- [ ] Push notification integration (Firebase config)
- [ ] Offline mode with SQLite caching
- [ ] Unit and widget tests
- [ ] App icons and splash screens
- [ ] Release builds (APK, IPA)

---

### Pending Work: Workflow Execution Engine

**Remaining Tasks:**
1. Implement workflow execution engine
2. Create pending approvals UI (backend integration)
3. Integrate existing entities (EmployeeVacation, EmployeeExcuse, RemoteWorkRequest)
4. Add workflow instance tracking
5. Implement approval actions (approve/reject/delegate)

### How to Access Workflow Management

**System URLs:**
- Frontend (Admin): http://localhost:4200
- Backend API: http://localhost:5099

**Navigation Path:**
1. Login to admin panel at http://localhost:4200
2. Navigate to: **Settings > Workflows**
3. Create/Edit workflow definitions
4. View **Approvals** menu for pending approvals and history

**Required Permissions:**
- `workflow.read` - View workflows
- `workflow.create` - Create workflows
- `workflow.update` - Edit workflows
- `workflow.delete` - Delete workflows
- `approval.read` - View approvals
- `leave_balance.read` - View leave entitlements and balances
- `leave_balance.create` - Create leave entitlements
- `leave_balance.update` - Edit leave entitlements
- `leave_balance.delete` - Delete leave entitlements

**Available Routes:**
- `/settings/workflows` - Workflow list
- `/settings/workflows/create` - Create new workflow
- `/settings/workflows/:id/view` - View workflow details
- `/settings/workflows/:id/edit` - Edit workflow
- `/settings/leave-entitlements` - Leave entitlements list
- `/settings/leave-entitlements/create` - Create leave entitlement
- `/settings/leave-entitlements/:id/edit` - Edit leave entitlement
- `/approvals` - Pending approvals (menu visible)
- `/approvals/history` - Approval history (menu visible)

---

## Part 1: Current System Analysis

### What Exists

#### Admin Panel Features (time-attendance-frontend)
| Module | Create | Read | Update | Delete | Notes |
|--------|--------|------|--------|--------|-------|
| Users | ✅ | ✅ | ✅ | ✅ | Full CRUD with role assignment |
| Employees | ✅ | ✅ | ✅ | ✅ | With manager hierarchy |
| Roles | ✅ | ✅ | ✅ | ✅ | 150+ permissions |
| Branches | - | ✅ | ✅ | - | Multi-tenant support |
| Departments | ✅ | ✅ | ✅ | - | Hierarchical |
| Shifts | ✅ | ✅ | ✅ | ✅ | Multi-period, night shifts |
| Shift Assignments | ✅ | ✅ | ✅ | - | Employee/Dept/Branch level |
| Attendance | - | ✅ | ✅ | - | Daily, Monthly reports |
| Vacations | ✅ | ✅ | ✅ | ✅ | Bulk assignment |
| Vacation Types | - | ✅ | - | - | Read only in admin |
| Excuses | ✅ | ✅ | ✅ | ✅ | With approval |
| Remote Work | ✅ | ✅ | ✅ | - | Requests & Policies |
| Overtime Config | ✅ | ✅ | ✅ | - | Rate multipliers |
| Public Holidays | ✅ | ✅ | ✅ | - | Calendar |
| Excuse Policies | ✅ | ✅ | ✅ | - | Limits & rules |
| Audit Logs | - | ✅ | - | - | Admin only |
| Sessions | - | ✅ | - | - | Active sessions |

#### Backend Capabilities (src/)
- 30+ Domain Entities
- 24 API Controllers with 100+ endpoints
- CQRS pattern with MediatR
- JWT authentication with refresh tokens
- Two-factor authentication
- Password history (last 5)
- Progressive lockout (5/10/15+ attempts)
- Comprehensive audit logging
- Multi-tenant architecture

---

## Part 2: Missing Features Inventory

### Priority 1 - Critical Missing Features

#### 1.1 Dynamic Approval Workflow Engine ✅
**Status:** COMPLETE (Backend + Frontend)
**Implementation Date:** December 14-15, 2025

**Implemented Features:**
- ✅ Configurable multi-level approval chains
- ✅ Workflow definitions for entity types (Vacation, Excuse, RemoteWork, Overtime, Timesheet, Correction)
- ✅ Sequential approval paths with step management
- ✅ Multiple approver types (DirectManager, DepartmentHead, Role, SpecificUser)
- ✅ Branch-specific or organization-wide workflows
- ✅ Active/inactive status management
- ✅ Default workflow designation
- ✅ Workflow UI (list, create, edit, view)
- ✅ Approval navigation menu (Pending & History views)
- ⏳ Conditional routing (planned for Phase 2)
- ⏳ Auto-approval rules (planned for Phase 2)
- ⏳ Escalation on timeout (planned for Phase 2)
- ⏳ Delegation during absence (planned for Phase 2)

**Backend Implementation:**
- Domain entities: WorkflowDefinition, WorkflowStep, WorkflowInstance, WorkflowStepExecution, ApprovalDelegation
- Database migrations applied
- API endpoints: /api/v1/workflows, /api/v1/approvals
- Controllers: WorkflowsController, ApprovalsController

**Frontend Implementation:**
- Admin UI: Settings > Workflows
- Components: workflow-list, workflow-form
- Routes: /settings/workflows, /settings/workflows/create, /settings/workflows/:id/edit
- Translations: English and Arabic (complete)
- Permissions: workflow.read, workflow.create, workflow.update, workflow.delete, approval.read

#### 1.2 Leave Accrual Management 🔄 IN PROGRESS
**Current State:** Core implementation complete, UI in progress
**Implemented:**
- ✅ Annual allocation (calendar days per year per employee)
- ✅ Monthly accrual calculation (annual ÷ 12)
- ✅ Carry-over rules (max carry-over days, expires at year end)
- ✅ Leave balance tracking (accrued, used, pending, available)
- ✅ Leave entitlement CRUD (backend + frontend)
- ✅ Leave accrual background job
- ✅ Balance adjustment API

**Remaining:**
- ⏳ Proration for new hires
- ⏳ Balance summary dashboard
- ⏳ Employee detail leave tab
- ⏳ Vacation request balance validation

#### 1.3 Vacation Type Full CRUD ⚠️
**Current State:** Read-only in admin
**Required:**
- Create/Update/Delete vacation types
- Configure accrual rules per type
- Set approval requirements per type
- Color coding for calendar

#### 1.4 Branch Full CRUD ⚠️
**Current State:** No create/delete
**Required:**
- Create new branches
- Delete inactive branches
- Configure timezone per branch
- Branch-specific policies

#### 1.5 Department Delete ⚠️
**Current State:** No delete option
**Required:**
- Soft delete with employee reassignment
- Cascade handling

### Priority 2 - High Value Features

#### 2.1 Attendance Corrections/Adjustments ❌
**Current State:** Only edit existing records
**Required:**
- Manual attendance entry for missing days
- Correction requests with approval workflow
- Bulk corrections
- Adjustment reasons and audit trail

#### 2.2 Timesheet Approval ❌
**Current State:** No weekly/monthly timesheet concept
**Required:**
- Weekly/bi-weekly/monthly timesheets
- Employee submission workflow
- Manager review and approval
- Lock periods after approval
- Payroll export integration

#### 2.3 Overtime Requests ❌
**Current State:** Overtime calculated automatically, no pre-approval
**Required:**
- Pre-approval for planned overtime
- Post-facto overtime justification
- Overtime request workflow
- Budget tracking

#### 2.4 Compensatory Time Off (Comp Time) ❌
**Current State:** Not supported
**Required:**
- Convert overtime to time off
- Comp time balance tracking
- Usage and expiration rules

#### 2.5 On-Call/Standby Management ❌
**Current State:** Not supported
**Required:**
- On-call schedule definition
- Standby pay configuration
- Call-out tracking
- On-call rotation

#### 2.6 Project/Task Time Tracking ❌
**Current State:** Not supported
**Required:**
- Project definition
- Task-level time allocation
- Billable vs non-billable hours
- Project budgets and tracking

### Priority 3 - Advanced Enterprise Features

#### 3.1 GPS & Location Services ❌
- Geofencing for mobile clock-ins
- Location history tracking
- GPS spoofing detection
- Photo capture at clock events

#### 3.2 Biometric Device Integration ⚠️
**Current State:** FingerprintRequest entity exists but no integration
**Required:**
- Device registration and management
- Real-time sync with attendance
- Multi-device support
- Liveness detection

#### 3.3 Workforce Analytics & Forecasting ❌
- Predictive analytics
- Attendance pattern analysis
- Labor cost forecasting
- Anomaly detection

#### 3.4 Advanced Scheduling ❌
- AI-driven schedule optimization
- Demand-based staffing
- Skill-based scheduling
- Open shift posting
- Shift swapping

#### 3.5 Compliance Automation ❌
- Labor law rule engine
- Automatic violation detection
- Compliance reporting templates
- Regional regulation support

#### 3.6 Employee Engagement ❌
- Gamification (attendance badges)
- Punctuality rewards
- Team challenges
- Feedback collection

#### 3.7 Integration Framework ❌
- REST API documentation (Swagger/OpenAPI)
- Webhook support
- SSO integration (SAML, OIDC)
- Calendar sync (Google, Outlook)
- Third-party payroll connectors

#### 3.8 Mobile Application ❌
- Native mobile app (iOS/Android)
- Offline mode
- Push notifications
- Mobile clock-in with GPS

---

## Part 3: Dynamic Approval Workflow System Design

### 3.1 Domain Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW CONFIGURATION                        │
├─────────────────────────────────────────────────────────────────┤
│  WorkflowDefinition                                              │
│  ├── Id, Name, Description                                       │
│  ├── EntityType (Vacation, Excuse, Overtime, RemoteWork, etc.)   │
│  ├── Version, IsActive, IsDefault                                │
│  ├── BranchId (nullable = org-wide)                              │
│  └── WorkflowSteps[]                                             │
│                                                                  │
│  WorkflowStep                                                    │
│  ├── Id, StepOrder, Name                                         │
│  ├── StepType (Approval, Notification, Validation, Condition)    │
│  ├── ApproverType (DirectManager, Role, SpecificUser, Self)      │
│  ├── ApproverRoleId / ApproverUserId (based on type)             │
│  ├── Condition (JSON: {"field": "days", "op": ">", "value": 5})  │
│  ├── TimeoutHours, EscalationStepId                              │
│  ├── OnApproveNextStepId, OnRejectNextStepId                     │
│  └── AllowDelegation, NotifyOnAction                             │
│                                                                  │
│  ApprovalRule (Reusable conditions)                              │
│  ├── Id, Name, EntityType                                        │
│  ├── Condition (JSON expression)                                 │
│  └── Action (AutoApprove, RequireApproval, Escalate)             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW RUNTIME                              │
├─────────────────────────────────────────────────────────────────┤
│  WorkflowInstance                                                │
│  ├── Id, WorkflowDefinitionId                                    │
│  ├── EntityType, EntityId                                        │
│  ├── CurrentStepId, Status (Pending, InProgress, Completed)      │
│  ├── RequestedById, RequestedAt                                  │
│  ├── CompletedAt, FinalOutcome (Approved, Rejected, Cancelled)   │
│  └── Context (JSON: runtime variables)                           │
│                                                                  │
│  WorkflowStepExecution                                           │
│  ├── Id, WorkflowInstanceId, StepId                              │
│  ├── AssignedToUserId, AssignedAt                                │
│  ├── ActionTakenById, ActionTakenAt                              │
│  ├── Action (Approved, Rejected, Delegated, Skipped, TimedOut)   │
│  ├── Comments, DelegatedToUserId                                 │
│  └── DueAt (for timeout tracking)                                │
│                                                                  │
│  ApprovalDelegation                                              │
│  ├── Id, DelegatorUserId, DelegateUserId                         │
│  ├── EntityTypes[] (which request types)                         │
│  ├── StartDate, EndDate                                          │
│  └── IsActive                                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Pre-Built Workflow Templates

#### Template 1: Simple Direct Manager Approval
```
Employee Submit → Direct Manager Approve → Complete
```

#### Template 2: Two-Level Approval
```
Employee Submit → Direct Manager → Department Head → Complete
```

#### Template 3: Conditional Approval (Leave)
```
Employee Submit → [IF days <= 3] → Direct Manager → Complete
                → [IF days > 3 AND days <= 7] → Direct Manager → HR → Complete
                → [IF days > 7] → Direct Manager → HR → Director → Complete
```

#### Template 4: HR-First Validation
```
Employee Submit → HR Validation → Direct Manager → Complete
```

#### Template 5: Auto-Approve with Notification
```
Employee Submit → [IF balance sufficient AND no conflicts] → Auto-Approve (notify manager)
                → [ELSE] → Direct Manager → Complete
```

### 3.3 Approval Workflow API Endpoints

```
POST   /api/v1/workflows                     - Create workflow definition
GET    /api/v1/workflows                     - List workflow definitions
GET    /api/v1/workflows/{id}                - Get workflow definition
PUT    /api/v1/workflows/{id}                - Update workflow definition
DELETE /api/v1/workflows/{id}                - Delete workflow definition
POST   /api/v1/workflows/{id}/activate       - Activate workflow
POST   /api/v1/workflows/{id}/deactivate     - Deactivate workflow
GET    /api/v1/workflows/templates           - Get pre-built templates

POST   /api/v1/workflow-instances            - Start workflow for entity
GET    /api/v1/workflow-instances/{id}       - Get workflow instance status
POST   /api/v1/workflow-instances/{id}/approve - Approve current step
POST   /api/v1/workflow-instances/{id}/reject  - Reject current step
POST   /api/v1/workflow-instances/{id}/delegate - Delegate to another user
POST   /api/v1/workflow-instances/{id}/cancel  - Cancel workflow

GET    /api/v1/approvals/pending             - Get my pending approvals
GET    /api/v1/approvals/history             - Get my approval history
GET    /api/v1/approvals/delegations         - Get my delegations
POST   /api/v1/approvals/delegations         - Create delegation
DELETE /api/v1/approvals/delegations/{id}    - Remove delegation
```

### 3.4 Admin UI for Workflow Configuration

```
Settings → Approval Workflows
├── Workflow List
│   ├── Filter by entity type
│   ├── Active/Inactive status
│   └── Default workflow indicator
│
├── Workflow Editor (Visual Builder)
│   ├── Drag-and-drop step builder
│   ├── Step configuration panel
│   ├── Condition builder (visual)
│   ├── Preview workflow diagram
│   └── Test workflow simulation
│
├── Approval Rules
│   ├── Rule list by entity type
│   ├── Rule condition builder
│   └── Rule priority ordering
│
└── Delegation Management
    ├── Active delegations
    ├── Create delegation wizard
    └── Delegation history
```

---

## Part 4: User Requirements (Confirmed)

1. **Workflow Complexity**: Sequential approval only (no parallel paths)
2. **Leave Accrual**:
   - Annual allocation (calendar days per year per employee)
   - Monthly accrual calculation
3. **Implementation Order**: By criticality (Priority 1 → 2 → 3)

---

## Part 5: Implementation Plan by Criticality

### CRITICAL (Priority 1) - Must Have for Standalone System

#### C1. Dynamic Approval Workflow Engine
**Why Critical**: Core functionality for all request types
**Duration**: 2-3 weeks

**Backend Implementation:**
```
src/Domain/TimeAttendanceSystem.Domain/Workflows/
├── WorkflowDefinition.cs
├── WorkflowStep.cs
├── WorkflowInstance.cs
├── WorkflowStepExecution.cs
├── ApprovalDelegation.cs
└── Enums/
    ├── WorkflowStepType.cs (Approval, Notification, Validation, Condition)
    ├── ApproverType.cs (DirectManager, Role, SpecificUser)
    ├── WorkflowStatus.cs (Pending, InProgress, Completed, Cancelled)
    └── ApprovalAction.cs (Approved, Rejected, Delegated, TimedOut)

src/Application/TimeAttendanceSystem.Application/Workflows/
├── Commands/
│   ├── CreateWorkflowDefinition/
│   ├── UpdateWorkflowDefinition/
│   ├── StartWorkflow/
│   ├── ApproveStep/
│   ├── RejectStep/
│   └── DelegateApproval/
├── Queries/
│   ├── GetWorkflowDefinitions/
│   ├── GetPendingApprovals/
│   └── GetApprovalHistory/
└── Services/
    ├── IWorkflowEngine.cs
    └── WorkflowEngine.cs

src/Api/Controllers/
├── WorkflowsController.cs
└── ApprovalsController.cs
```

**Frontend Implementation:**
```
time-attendance-frontend/src/app/pages/
├── settings/workflows/
│   ├── workflow-list.component.ts/html/css
│   ├── workflow-form.component.ts/html/css
│   ├── workflow-step-editor.component.ts/html/css
│   └── workflows.service.ts
└── approvals/
    ├── pending-approvals.component.ts/html/css
    ├── approval-detail.component.ts/html/css
    ├── delegation-form.component.ts/html/css
    └── approvals.service.ts
```

**Tasks:**
1. Create workflow domain entities
2. Create EF configurations and migration
3. Implement WorkflowEngine service
4. Create CQRS commands/queries
5. Create API controllers
6. Integrate with EmployeeVacation, EmployeeExcuse, RemoteWorkRequest
7. Create admin workflow configuration UI
8. Create pending approvals page
9. Update self-service portal for approval status display

---

#### C2. Leave Balance & Accrual System
**Why Critical**: Required for vacation request validation
**Duration**: 2 weeks

**Leave Balance Model:**
- Annual entitlement (calendar days per year)
- Monthly accrual (entitlement / 12 per month)
- Carry-over rules (optional)
- Current balance = Accrued - Used - Pending

**Backend Implementation:**
```
src/Domain/TimeAttendanceSystem.Domain/LeaveManagement/
├── LeaveEntitlement.cs        # Annual allocation per employee per vacation type
├── LeaveBalance.cs            # Current balance tracking
├── LeaveTransaction.cs        # Accrual/Usage/Adjustment transactions
└── LeaveAccrualPolicy.cs      # Accrual rules configuration

src/Application/LeaveManagement/
├── Commands/
│   ├── SetLeaveEntitlement/
│   ├── ProcessMonthlyAccrual/
│   ├── AdjustLeaveBalance/
│   └── ResetYearlyBalances/
├── Queries/
│   ├── GetEmployeeLeaveBalance/
│   ├── GetLeaveBalanceSummary/
│   └── GetLeaveTransactionHistory/
└── Services/
    ├── ILeaveAccrualService.cs
    └── LeaveAccrualService.cs

src/Infrastructure/Jobs/
└── MonthlyLeaveAccrualJob.cs   # Coravel scheduled job
```

**Frontend Implementation:**
```
time-attendance-frontend/src/app/pages/
├── leave-management/
│   ├── leave-entitlements/
│   │   ├── entitlement-list.component.ts/html/css
│   │   └── entitlement-form.component.ts/html/css
│   ├── leave-balances/
│   │   ├── balance-list.component.ts/html/css
│   │   └── balance-detail.component.ts/html/css
│   └── leave-management.service.ts
└── employees/
    └── employee-leave-tab.component.ts  # Add to employee detail view
```

**Tasks:**
1. Create leave domain entities
2. Create EF configurations and migration
3. Implement LeaveAccrualService
4. Create Coravel monthly accrual job
5. Create CQRS commands/queries
6. Create API controllers
7. Update vacation request to validate against balance
8. Create entitlement management UI
9. Create balance dashboard
10. Add leave balance tab to employee detail

---

#### C3. Vacation Types Full CRUD
**Why Critical**: Required for leave management configuration
**Duration**: 3 days

**Backend:**
- Add CreateVacationType command
- Add UpdateVacationType command
- Add DeleteVacationType command
- Add accrual configuration fields to VacationType

**Frontend:**
```
time-attendance-frontend/src/app/pages/vacation-types/
├── vacation-type-list.component.ts/html/css
├── vacation-type-form.component.ts/html/css
├── vacation-type-detail.component.ts/html/css
└── vacation-types.service.ts (update)
```

---

#### C4. Branch Full CRUD
**Why Critical**: Multi-tenant management
**Duration**: 2 days

**Backend:**
- Add CreateBranch command
- Add DeleteBranch command (soft delete with validation)

**Frontend:**
- Add create branch form
- Add delete with confirmation

---

#### C5. Department Delete
**Why Critical**: Organization structure management
**Duration**: 1 day

**Backend:**
- Add DeleteDepartment command with employee reassignment

**Frontend:**
- Add delete option with cascade warning

---

### HIGH PRIORITY (Priority 2) - Important for Complete System

#### H1. Attendance Corrections with Workflow
**Duration**: 1 week

**Backend:**
```
src/Domain/Corrections/
├── AttendanceCorrection.cs
└── CorrectionType.cs (MissingCheckIn, MissingCheckOut, WrongTime, etc.)
```

**Features:**
- Employee requests correction
- Uses approval workflow
- Updates attendance record on approval

---

#### H2. Overtime Request & Pre-Approval
**Duration**: 1 week

**Backend:**
```
src/Domain/Overtime/
├── OvertimeRequest.cs
└── OvertimeRequestStatus.cs
```

**Features:**
- Pre-approval for planned overtime
- Post-facto justification for unplanned
- Budget tracking per department
- Uses approval workflow

---

#### H3. Timesheet Weekly Submission
**Duration**: 1.5 weeks

**Backend:**
```
src/Domain/Timesheets/
├── Timesheet.cs
├── TimesheetEntry.cs
└── TimesheetStatus.cs
```

**Features:**
- Weekly timesheet generation
- Employee review and submit
- Manager approval
- Lock period after approval
- Uses approval workflow

---

#### H4. Compensatory Time Off
**Duration**: 1 week

**Features:**
- Convert overtime hours to comp time
- Comp time balance tracking
- Expiration rules
- Usage requests

---

### NICE TO HAVE (Priority 3) - Advanced Features

#### N1. GPS & Location Services (2 weeks)
- Geofencing for mobile clock-in
- Location verification
- Photo capture

#### N2. Biometric Device Integration (2 weeks)
- Device management
- Real-time sync
- Multi-device support

#### N3. Workforce Analytics (2 weeks)
- Attendance pattern analysis
- Labor cost forecasting
- Anomaly detection

#### N4. Advanced Scheduling (2 weeks)
- Open shift posting
- Shift swapping
- Coverage optimization

#### N5. Employee Engagement (1 week)
- Attendance badges
- Punctuality rewards

#### N6. Integration Framework (2 weeks)
- Webhook support
- SSO integration
- API documentation

#### N7. Mobile Application (4 weeks)
- Native iOS/Android
- Offline mode
- Push notifications

---

## Part 6: Detailed Implementation Schedule

### Week 1-2: Workflow Engine Core ✅ COMPLETE (December 14-15, 2025)
- [x] Create workflow domain entities
- [x] Create database migration
- [x] Implement WorkflowEngine service (Phase 1)
- [x] Create workflow CQRS commands/queries
- [x] Create WorkflowsController
- [x] Create ApprovalsController

### Week 3: Workflow UI ✅ COMPLETE (December 15, 2025)
- [x] Create workflow list/form components (admin)
- [x] Create approval navigation menu
- [x] Add workflow translations (EN/AR)

### Week 4-5: Leave Balance System ✅ COMPLETE (December 20-21, 2025)
- [x] Create leave domain entities (LeaveEntitlement, LeaveBalance, LeaveTransaction, LeaveAccrualPolicy)
- [x] Create database migrations (AddLeaveManagementTables, AddLeaveBalancePermissions)
- [x] Implement LeaveAccrualService
- [x] Create monthly accrual Coravel job
- [x] Create leave CQRS commands/queries
- [x] Create LeaveBalancesController
- [x] Create entitlement management UI (list + form)
- [x] Add bilingual translations (35+ keys in EN/AR)
- [x] Navigation menu integration

### Week 6: Leave Balance UI 🔄 IN PROGRESS
- [x] Create entitlement list page
- [x] Create entitlement form (create/edit)
- [x] Form styling matching system standards
- [ ] Create balance summary/dashboard component
- [ ] Add leave tab to employee detail
- [ ] Update vacation request form to show balance
- [ ] Update vacation request validation against balance

### Week 7: Workflow Execution Engine ⏳ PENDING
- [ ] Create pending approvals page (backend integration)
- [ ] Integrate EmployeeVacation with workflow
- [ ] Integrate EmployeeExcuse with workflow
- [ ] Integrate RemoteWorkRequest with workflow
- [ ] Implement workflow execution engine
- [ ] Add workflow step execution tracking
- [ ] Update self-service portal to show approval status

### Week 7: Complete CRUD + Testing
- [ ] Vacation Types full CRUD
- [ ] Branch create/delete
- [ ] Department delete
- [ ] End-to-end testing
- [ ] Bug fixes

### Week 8-9: Priority 2 Features
- [ ] Attendance corrections with workflow
- [ ] Overtime requests with workflow

### Week 10-11: Priority 2 Continued
- [ ] Timesheet weekly submission
- [ ] Compensatory time off

### Week 12+: Priority 3 Features
- As needed based on requirements

---

## Part 7: Database Schema Summary

### New Tables (Priority 1)

```sql
-- Workflow Configuration
CREATE TABLE workflow_definitions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    entity_type VARCHAR(50) NOT NULL, -- Vacation, Excuse, RemoteWork, Overtime, Timesheet
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    branch_id BIGINT REFERENCES branches(id), -- NULL = org-wide
    version INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(255),
    modified_at TIMESTAMP,
    modified_by VARCHAR(255)
);

CREATE TABLE workflow_steps (
    id BIGSERIAL PRIMARY KEY,
    workflow_definition_id BIGINT REFERENCES workflow_definitions(id),
    step_order INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    step_type VARCHAR(50) NOT NULL, -- Approval, Notification, Validation, Condition
    approver_type VARCHAR(50), -- DirectManager, Role, SpecificUser
    approver_role_id BIGINT REFERENCES roles(id),
    approver_user_id BIGINT REFERENCES users(id),
    condition_json JSONB, -- {"field": "days", "operator": ">", "value": 5}
    timeout_hours INT,
    escalation_step_id BIGINT,
    on_approve_next_step_id BIGINT,
    on_reject_next_step_id BIGINT,
    allow_delegation BOOLEAN DEFAULT true,
    notify_on_action BOOLEAN DEFAULT true
);

-- Workflow Runtime
CREATE TABLE workflow_instances (
    id BIGSERIAL PRIMARY KEY,
    workflow_definition_id BIGINT REFERENCES workflow_definitions(id),
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    current_step_id BIGINT REFERENCES workflow_steps(id),
    status VARCHAR(50) NOT NULL, -- Pending, InProgress, Completed, Cancelled
    requested_by_id BIGINT REFERENCES users(id),
    requested_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    final_outcome VARCHAR(50), -- Approved, Rejected, Cancelled
    context_json JSONB
);

CREATE TABLE workflow_step_executions (
    id BIGSERIAL PRIMARY KEY,
    workflow_instance_id BIGINT REFERENCES workflow_instances(id),
    step_id BIGINT REFERENCES workflow_steps(id),
    assigned_to_user_id BIGINT REFERENCES users(id),
    assigned_at TIMESTAMP DEFAULT NOW(),
    action_taken_by_id BIGINT REFERENCES users(id),
    action_taken_at TIMESTAMP,
    action VARCHAR(50), -- Approved, Rejected, Delegated, Skipped, TimedOut
    comments TEXT,
    delegated_to_user_id BIGINT REFERENCES users(id),
    due_at TIMESTAMP
);

CREATE TABLE approval_delegations (
    id BIGSERIAL PRIMARY KEY,
    delegator_user_id BIGINT REFERENCES users(id),
    delegate_user_id BIGINT REFERENCES users(id),
    entity_types VARCHAR(255)[], -- Array of entity types
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Leave Management
CREATE TABLE leave_entitlements (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT REFERENCES employees(id),
    vacation_type_id BIGINT REFERENCES vacation_types(id),
    year INT NOT NULL,
    annual_days DECIMAL(5,2) NOT NULL, -- Calendar days per year
    carry_over_days DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(255),
    modified_at TIMESTAMP,
    modified_by VARCHAR(255),
    UNIQUE(employee_id, vacation_type_id, year)
);

CREATE TABLE leave_balances (
    id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT REFERENCES employees(id),
    vacation_type_id BIGINT REFERENCES vacation_types(id),
    year INT NOT NULL,
    entitled_days DECIMAL(5,2) NOT NULL,
    accrued_days DECIMAL(5,2) DEFAULT 0,
    used_days DECIMAL(5,2) DEFAULT 0,
    pending_days DECIMAL(5,2) DEFAULT 0,
    adjusted_days DECIMAL(5,2) DEFAULT 0,
    current_balance AS (accrued_days + adjusted_days - used_days - pending_days),
    last_accrual_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP,
    UNIQUE(employee_id, vacation_type_id, year)
);

CREATE TABLE leave_transactions (
    id BIGSERIAL PRIMARY KEY,
    leave_balance_id BIGINT REFERENCES leave_balances(id),
    transaction_type VARCHAR(50) NOT NULL, -- Accrual, Usage, Adjustment, CarryOver, Reset
    days DECIMAL(5,2) NOT NULL,
    reference_type VARCHAR(50), -- Vacation, Adjustment
    reference_id BIGINT,
    notes TEXT,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by VARCHAR(255)
);
```

---

## Part 8: API Endpoints Summary

### Workflow Management
```
POST   /api/v1/workflows                     - Create workflow
GET    /api/v1/workflows                     - List workflows
GET    /api/v1/workflows/{id}                - Get workflow
PUT    /api/v1/workflows/{id}                - Update workflow
DELETE /api/v1/workflows/{id}                - Delete workflow
POST   /api/v1/workflows/{id}/activate       - Activate
POST   /api/v1/workflows/{id}/deactivate     - Deactivate

GET    /api/v1/approvals/pending             - My pending approvals
GET    /api/v1/approvals/history             - My approval history
POST   /api/v1/approvals/{instanceId}/approve - Approve step
POST   /api/v1/approvals/{instanceId}/reject  - Reject step
POST   /api/v1/approvals/{instanceId}/delegate - Delegate

GET    /api/v1/delegations                   - My delegations
POST   /api/v1/delegations                   - Create delegation
DELETE /api/v1/delegations/{id}              - Remove delegation
```

### Leave Management
```
GET    /api/v1/leave-entitlements            - List entitlements
POST   /api/v1/leave-entitlements            - Set entitlement
PUT    /api/v1/leave-entitlements/{id}       - Update entitlement
DELETE /api/v1/leave-entitlements/{id}       - Delete entitlement

GET    /api/v1/leave-balances                - List balances
GET    /api/v1/leave-balances/employee/{id}  - Employee balances
GET    /api/v1/leave-balances/summary        - Balance summary
POST   /api/v1/leave-balances/adjust         - Manual adjustment
POST   /api/v1/leave-balances/process-accrual - Process monthly accrual
```

### Vacation Types (Extended)
```
POST   /api/v1/vacation-types                - Create type
PUT    /api/v1/vacation-types/{id}           - Update type
DELETE /api/v1/vacation-types/{id}           - Delete type
```

### Branches (Extended)
```
POST   /api/v1/branches                      - Create branch
DELETE /api/v1/branches/{id}                 - Delete branch
```

---

## Part 9: Feature Comparison Summary

| Feature | Current | After Enhancement |
|---------|---------|-------------------|
| Approval Workflows | Hardcoded | Dynamic, Configurable |
| Vacation Types | Read-only | Full CRUD |
| Branches | No Create/Delete | Full CRUD |
| Departments | No Delete | Full CRUD with cascade |
| Leave Accruals | None | Full accrual system |
| Leave Balances | None | Real-time tracking |
| Timesheets | None | Weekly/Monthly submission |
| Overtime Requests | None | Pre-approval workflow |
| Attendance Corrections | Basic edit | Request & approval workflow |
| Delegations | None | Full delegation system |
| Escalations | None | Timeout-based escalation |
| Auto-Approvals | None | Rule-based automation |
| Workflow Templates | None | Pre-built templates |

---

## Part 10: Files to Create/Modify

### New Backend Files

#### Domain Layer
```
src/Domain/TimeAttendanceSystem.Domain/
├── Workflows/
│   ├── WorkflowDefinition.cs
│   ├── WorkflowStep.cs
│   ├── WorkflowInstance.cs
│   ├── WorkflowStepExecution.cs
│   ├── ApprovalDelegation.cs
│   ├── ApprovalRule.cs
│   └── Enums/
│       ├── WorkflowStepType.cs
│       ├── ApproverType.cs
│       ├── WorkflowStatus.cs
│       ├── ApprovalAction.cs
│       └── WorkflowEntityType.cs
├── LeaveManagement/
│   ├── LeaveAccrualPolicy.cs
│   ├── LeaveBalance.cs
│   └── LeaveAccrualTransaction.cs
├── Timesheets/
│   ├── Timesheet.cs
│   └── TimesheetEntry.cs
└── Corrections/
    └── AttendanceCorrection.cs
```

#### Application Layer
```
src/Application/TimeAttendanceSystem.Application/
├── Workflows/
│   ├── Commands/
│   │   ├── CreateWorkflowDefinition/
│   │   ├── UpdateWorkflowDefinition/
│   │   ├── DeleteWorkflowDefinition/
│   │   ├── StartWorkflow/
│   │   ├── ApproveStep/
│   │   ├── RejectStep/
│   │   ├── DelegateStep/
│   │   └── CancelWorkflow/
│   ├── Queries/
│   │   ├── GetWorkflowDefinitions/
│   │   ├── GetWorkflowDefinitionById/
│   │   ├── GetPendingApprovals/
│   │   ├── GetApprovalHistory/
│   │   ├── GetWorkflowInstance/
│   │   └── GetWorkflowTemplates/
│   └── Services/
│       ├── IWorkflowEngine.cs
│       ├── WorkflowEngine.cs
│       └── WorkflowConditionEvaluator.cs
├── LeaveManagement/
│   ├── Commands/
│   └── Queries/
└── Timesheets/
    ├── Commands/
    └── Queries/
```

#### API Layer
```
src/Api/TimeAttendanceSystem.Api/Controllers/
├── WorkflowsController.cs
├── ApprovalsController.cs
├── LeaveBalancesController.cs
└── TimesheetsController.cs
```

### New Frontend Files (Admin Panel)

```
time-attendance-frontend/src/app/pages/
├── settings/
│   └── workflows/
│       ├── workflow-list.component.ts/html/css
│       ├── workflow-editor.component.ts/html/css
│       ├── workflow-step-config.component.ts/html/css
│       ├── workflow-condition-builder.component.ts/html/css
│       ├── workflow-preview.component.ts/html/css
│       └── workflows.service.ts
├── approvals/
│   ├── pending-approvals.component.ts/html/css
│   ├── approval-detail.component.ts/html/css
│   ├── approval-history.component.ts/html/css
│   ├── delegation-management.component.ts/html/css
│   └── approvals.service.ts
├── vacation-types/
│   ├── vacation-type-list.component.ts/html/css
│   ├── vacation-type-form.component.ts/html/css
│   └── vacation-types.service.ts (update)
├── leave-balances/
│   ├── leave-balance-list.component.ts/html/css
│   ├── accrual-policy-form.component.ts/html/css
│   └── leave-balances.service.ts
└── timesheets/
    ├── timesheet-list.component.ts/html/css
    ├── timesheet-detail.component.ts/html/css
    ├── timesheet-approval.component.ts/html/css
    └── timesheets.service.ts
```

### Files to Modify

#### Backend
- `src/Domain/Vacations/EmployeeVacation.cs` - Add WorkflowInstanceId
- `src/Domain/Excuses/EmployeeExcuse.cs` - Add WorkflowInstanceId
- `src/Domain/RemoteWork/RemoteWorkRequest.cs` - Add WorkflowInstanceId
- `src/Infrastructure/Persistence/TimeAttendanceDbContext.cs` - Add new DbSets
- `src/Api/Program.cs` - Register new services

#### Frontend
- `time-attendance-frontend/src/app/app.routes.ts` - Add new routes
- Update navigation menus
- Update permission checks

---

## Appendix: Technology Stack

### Backend
- .NET 9.0
- Entity Framework Core
- PostgreSQL
- MediatR (CQRS)
- Coravel (Background Jobs)
- JWT Authentication

### Frontend
- Angular 20
- Angular Signals
- Bootstrap 5
- RxJS

### Architecture
- Clean Architecture
- CQRS Pattern
- Domain-Driven Design
- Multi-tenant by Branch

---

**End of Document**
