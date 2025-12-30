# Self-Service Portal Implementation Plan (Unified Backend)

## Executive Summary

This document outlines the implementation plan for completing the self-service portal with a **unified backend architecture**. Instead of maintaining separate backends, all selfservice features will be added to the main project (`src/`), with the frontend (`time-attendance-selfservice-frontend`) connecting directly to the main API.

### Architecture Decision
- **Unified Backend**: Add selfservice endpoints to existing controllers in main project
- **Single API Port**: Frontend connects to main backend (port 5099)
- **Cleanup**: Delete `src-selfservice` folder after migration complete

### Key Requirements
1. **Workflow Integration** - Already available in main project
2. **Full Hierarchy** - Managers see all employees in their reporting chain (recursive)
3. **Auto-Approval** - When manager submits on behalf of team member and they're in the approval chain, auto-approve their step

---

## Implementation Progress

| Phase | Description | Status |
|-------|-------------|--------|
| Phase 0 | Backend Configuration & Portal Controller | **COMPLETED** |
| Phase 1 | Add Fingerprint Requests to Main Project | **COMPLETED** |
| Phase 2 | Enhance Existing Controllers for On-Behalf-Of | **COMPLETED** |
| Phase 3 | Selfservice Frontend Updates | Pending |
| Phase 4 | Navigation & Role-Based Access | Pending |
| Phase 5 | Translations & Polish | Pending |
| Phase 6 | Cleanup (Delete src-selfservice) | Pending |

---

## Current Implementation Status

### Main Backend (src/) - WHAT EXISTS

| Feature | Status | Notes |
|---------|--------|-------|
| Employee Vacations | Complete | Full CRUD, workflow integration |
| Employee Excuses | Complete | Full CRUD, workflow integration, policy validation |
| Remote Work Requests | Complete | Full CRUD, workflow integration |
| Fingerprint Requests | **Complete** | Full CRUD added in Phase 1 |
| Portal Controller | **Complete** | Employee/Manager dashboards, team members |
| Workflow Engine | Complete | Full multi-level approval system |
| Authentication | Complete | JWT, 2FA, password management |
| Attendance | Complete | Full attendance management |

### Frontend (time-attendance-selfservice-frontend) - WHAT EXISTS

| Feature | Status | Notes |
|---------|--------|-------|
| Login/Authentication | Complete | JWT with refresh tokens |
| Employee Dashboard | Complete | Stats cards, activity, quick actions |
| My Attendance | Complete | Date range filtering, summary |
| My Profile | Complete | View and edit profile |
| Vacation Requests List | Complete | View, edit, delete own requests |
| Vacation Request Form | Missing | Routes exist but no component |
| Vacation Request Details | Missing | Routes exist but no component |
| Excuse Requests | Complete | Full CRUD |
| Remote Work Requests | Complete | Full CRUD |
| Fingerprint Requests | **Complete** | Full CRUD (backend now in main project) |
| Manager Dashboard | Missing | To be added in Phase 3 |
| Team Members | Missing | To be added in Phase 3 |
| Pending Approvals | Missing | To be added in Phase 3 |

---

## IMPLEMENTATION PLAN

### Phase 0: Backend Configuration & Portal Controller - COMPLETED

#### 0.1 Add Portal Controller to Main Project
**File created:** `src/Api/TimeAttendanceSystem.Api/Controllers/PortalController.cs`

**Endpoints implemented:**
- `GET /api/v1/portal/employee-dashboard` - Employee dashboard with stats, activity, attendance
- `GET /api/v1/portal/manager-dashboard` - Manager dashboard with team stats, pending approvals
- `GET /api/v1/portal/team-members` - Team members list with recursive hierarchy
- `GET /api/v1/portal/team-members/{id}` - Individual team member details

#### 0.2 Add Portal Features to Application Layer
**Files created:**
- `src/Application/.../Features/Portal/EmployeeDashboard/Queries/EmployeeDashboardDto.cs`
- `src/Application/.../Features/Portal/EmployeeDashboard/Queries/GetEmployeeDashboardQuery.cs`
- `src/Application/.../Features/Portal/ManagerDashboard/Queries/ManagerDashboardDto.cs`
- `src/Application/.../Features/Portal/ManagerDashboard/Queries/GetManagerDashboardQuery.cs`
- `src/Application/.../Features/Portal/Team/Queries/TeamMemberDto.cs`
- `src/Application/.../Features/Portal/Team/Queries/GetTeamMembersQuery.cs`

**Key features implemented:**
- Recursive team hierarchy using queue-based BFS
- Integration with IWorkflowEngine for pending approvals
- Pagination and filtering support for team members

#### 0.3 ManagerAccess Policy
Policy already exists in `DependencyInjection.cs` - no changes needed.

---

### Phase 1: Add Fingerprint Requests to Main Project - COMPLETED

#### 1.1 Add Fingerprint Domain Entity
**File created:** `src/Domain/TimeAttendanceSystem.Domain/FingerprintRequests/FingerprintRequest.cs`

**Entity includes:**
- FingerprintRequestType enum (NewEnrollment, ReEnrollment, UpdateFingers, TechnicalIssue)
- FingerprintRequestStatus enum (Pending, Scheduled, Completed, Cancelled)
- Full audit trail support

#### 1.2 Add Fingerprint CRUD Features
**Files created:**
- `src/Application/.../Features/Portal/FingerprintRequests/Queries/FingerprintRequestDto.cs`
- `src/Application/.../Features/Portal/FingerprintRequests/Queries/GetFingerprintRequestsQuery.cs`
- `src/Application/.../Features/Portal/FingerprintRequests/Queries/GetFingerprintRequestByIdQuery.cs`
- `src/Application/.../Features/Portal/FingerprintRequests/Commands/CreateFingerprintRequestCommand.cs`
- `src/Application/.../Features/Portal/FingerprintRequests/Commands/UpdateFingerprintRequestCommand.cs`
- `src/Application/.../Features/Portal/FingerprintRequests/Commands/CompleteFingerprintRequestCommand.cs`

#### 1.3 Add Fingerprint Controller
**File created:** `src/Api/TimeAttendanceSystem.Api/Controllers/FingerprintRequestsController.cs`

**Endpoints:**
- `GET /api/v1/fingerprint-requests` - List with filtering and pagination
- `GET /api/v1/fingerprint-requests/{id}` - Get by ID
- `POST /api/v1/fingerprint-requests` - Create new request
- `PUT /api/v1/fingerprint-requests/{id}` - Update (owner only, pending status)
- `POST /api/v1/fingerprint-requests/{id}/complete` - Mark complete (admin only)

#### 1.4 Add Database Configuration
**File created:** `src/Infrastructure/.../Persistence/PostgreSql/Configurations/FingerprintRequestConfiguration.cs`

**Files modified:**
- `IApplicationDbContext.cs` - Added FingerprintRequests DbSet
- `TimeAttendanceDbContext.cs` - Added FingerprintRequests DbSet
- `ApplicationDbContextAdapter.cs` - Added FingerprintRequests DbSet

---

### Phase 2: Enhance Existing Controllers for Selfservice - COMPLETED

#### 2.1 Add "On Behalf Of" Support to Vacations
**Files modified:**
- `src/Application/.../EmployeeVacations/Commands/CreateEmployeeVacation/CreateEmployeeVacationCommand.cs`
- `src/Application/.../EmployeeVacations/Commands/CreateEmployeeVacation/CreateEmployeeVacationCommandHandler.cs`
- `src/Domain/.../Vacations/EmployeeVacation.cs` - Added `SubmittedByUserId` property

**Features implemented:**
- Added `OnBehalfOfEmployeeId` parameter to command
- Added `IsInManagementChainAsync()` method for recursive manager chain validation
- Auto-approval when manager is in approval chain after workflow starts

#### 2.2 Add "On Behalf Of" Support to Excuses
**Files modified:**
- `src/Application/.../Excuses/Commands/CreateEmployeeExcuse/CreateEmployeeExcuseCommand.cs`
- `src/Application/.../Excuses/Commands/CreateEmployeeExcuse/CreateEmployeeExcuseCommandHandler.cs`
- `src/Domain/.../Excuses/EmployeeExcuse.cs` - Added `SubmittedByUserId` property

**Same features as vacations.**

#### 2.3 Add "On Behalf Of" Support to Remote Work
**Files modified:**
- `src/Application/.../Features/RemoteWorkRequests/Commands/CreateRemoteWorkRequest/CreateRemoteWorkRequestCommand.cs`
- `src/Application/.../Features/RemoteWorkRequests/Commands/CreateRemoteWorkRequest/CreateRemoteWorkRequestCommandHandler.cs`
- `src/Domain/.../RemoteWork/RemoteWorkRequest.cs` - Added `SubmittedByUserId` property

**Same features as vacations.**

**Key Implementation Details:**
- Each handler validates manager is in employee's management chain (recursive)
- `SubmittedByUserId` tracks who submitted the request (for audit)
- Auto-approval calls `CanUserApproveAsync()` then `ApproveAsync()` after workflow starts
- Notes are appended with "Submitted on behalf by user ID: X"

---

### Phase 3: Selfservice Frontend Updates

#### 3.1 Update API Base URL
**File to modify:**
- `time-attendance-selfservice-frontend/src/environments/environment.ts`
- `time-attendance-selfservice-frontend/src/environments/environment.development.ts`

**Change:**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5099'  // Changed from 5084/5100 to main API port
};
```

#### 3.2 Complete Vacation Request Components
**Files to create:**
- `time-attendance-selfservice-frontend/src/app/pages/portal/vacation-requests/vacation-request-form.component.ts/.html/.css`
- `time-attendance-selfservice-frontend/src/app/pages/portal/vacation-requests/vacation-request-details.component.ts/.html/.css`

#### 3.3 Add Manager Dashboard
**Files to create:**
- `time-attendance-selfservice-frontend/src/app/pages/portal/manager-dashboard/manager-dashboard.component.ts/.html/.css`

**Implementation:**
- Stats cards: team size, present/absent/late today, pending approvals
- Pending approvals widget
- Team members list widget
- Quick actions for manager tasks

#### 3.4 Add Team Members Page
**Files to create:**
- `time-attendance-selfservice-frontend/src/app/pages/portal/team/team-members.component.ts/.html/.css`

**Implementation:**
- DataTable of team members (full hierarchy)
- Actions: view details, create request on behalf
- Filter by status, department

#### 3.5 Add Pending Approvals Page
**Files to create:**
- `time-attendance-selfservice-frontend/src/app/pages/portal/approvals/pending-approvals.component.ts/.html/.css`
- `time-attendance-selfservice-frontend/src/app/pages/portal/approvals/approval-detail-modal.component.ts/.html/.css`

**Implementation:**
- Tabbed view by request type
- DataTable with employee name, request details, dates
- Approve/Reject with comments
- Delegate functionality

#### 3.6 Update Request Forms for "On Behalf Of"
**Files to modify:**
- `time-attendance-selfservice-frontend/src/app/pages/portal/vacation-requests/vacation-request-form.component.ts`
- `time-attendance-selfservice-frontend/src/app/pages/portal/excuse-requests/excuse-request-form.component.ts`
- `time-attendance-selfservice-frontend/src/app/pages/portal/remote-work-requests/remote-work-request-form.component.ts`

**Changes:**
- Add team member selector (visible to managers only)
- Pass `onBehalfOfEmployeeId` to API when submitting for team member

---

### Phase 4: Navigation & Role-Based Access

#### 4.1 Update Menu Service
**File to modify:**
- `time-attendance-selfservice-frontend/src/app/core/menu/menu.service.ts`

**Add manager menu items:**
```typescript
// Manager-only items
{
  path: '/manager-dashboard',
  titleKey: 'portal.manager_dashboard',
  icon: 'bi bi-people',
  permission: 'manager'
},
{
  path: '/team',
  titleKey: 'portal.my_team',
  icon: 'bi bi-person-lines-fill',
  permission: 'manager'
},
{
  path: '/approvals',
  titleKey: 'portal.pending_approvals',
  icon: 'bi bi-check-circle',
  permission: 'manager'
}
```

#### 4.2 Update Routes
**File to modify:**
- `time-attendance-selfservice-frontend/src/app/app.routes.ts`

**Add routes:**
```typescript
{
  path: 'manager-dashboard',
  loadComponent: () => import('./pages/portal/manager-dashboard/manager-dashboard.component')
    .then(m => m.ManagerDashboardComponent),
  canMatch: [authGuard, managerGuard]
},
{
  path: 'team',
  loadComponent: () => import('./pages/portal/team/team-members.component')
    .then(m => m.TeamMembersComponent),
  canMatch: [authGuard, managerGuard]
},
{
  path: 'approvals',
  loadComponent: () => import('./pages/portal/approvals/pending-approvals.component')
    .then(m => m.PendingApprovalsComponent),
  canMatch: [authGuard, managerGuard]
}
```

#### 4.3 Create Manager Guard
**File to create:**
- `time-attendance-selfservice-frontend/src/app/core/guards/manager.guard.ts`

---

### Phase 5: Translations & Polish

#### 5.1 Add Translation Keys
**Files to modify:**
- `time-attendance-selfservice-frontend/src/app/core/i18n/translations/en.json`
- `time-attendance-selfservice-frontend/src/app/core/i18n/translations/ar.json`

**Add keys for:**
- Manager dashboard labels
- Team member labels
- Approval actions
- On-behalf-of messages

---

### Phase 6: Cleanup

#### 6.1 Delete src-selfservice
After all features are migrated and tested:
```
Delete: src-selfservice/ (entire folder)
```

#### 6.2 Update Documentation
- Update any documentation referencing src-selfservice
- Update deployment scripts if any

---

## Implementation Priority Order

1. **Phase 0** - Portal Controller & Features (backend foundation)
2. **Phase 1** - Add Fingerprint Requests to main project
3. **Phase 2** - Enhance existing controllers for on-behalf-of
4. **Phase 3** - Frontend updates (vacation forms, manager dashboard, team, approvals)
5. **Phase 4** - Navigation and guards
6. **Phase 5** - Translations
7. **Phase 6** - Cleanup (delete src-selfservice)

---

## Key Files Summary

### Backend Files to Create (in src/)
```
src/Api/TimeAttendanceSystem.Api/Controllers/
  - PortalController.cs
  - FingerprintRequestsController.cs

src/Application/TimeAttendanceSystem.Application/Features/Portal/
  EmployeeDashboard/Queries/
    - GetEmployeeDashboardQuery.cs
    - GetEmployeeDashboardQueryHandler.cs
    - EmployeeDashboardDto.cs
  ManagerDashboard/Queries/
    - GetManagerDashboardQuery.cs
    - GetManagerDashboardQueryHandler.cs
    - ManagerDashboardDto.cs
  Team/Queries/
    - GetTeamMembersQuery.cs
    - GetTeamMembersQueryHandler.cs
    - TeamMemberDto.cs
  Approvals/Queries/
    - GetPendingApprovalsQuery.cs
    - GetPendingApprovalsQueryHandler.cs
    - PendingApprovalDto.cs

src/Application/TimeAttendanceSystem.Application/Features/FingerprintRequests/
  - Commands/ (Create, Update, Complete, Cancel)
  - Queries/ (GetById, GetList)

src/Domain/TimeAttendanceSystem.Domain/FingerprintRequests/
  - FingerprintRequest.cs

src/Infrastructure/.../Configurations/
  - FingerprintRequestConfiguration.cs
```

### Backend Files to Modify (in src/)
```
src/Infrastructure/TimeAttendanceSystem.Infrastructure/DependencyInjection.cs (add ManagerAccess policy)
src/Application/TimeAttendanceSystem.Application/Abstractions/IApplicationDbContext.cs (add FingerprintRequests DbSet)
src/Infrastructure/.../TimeAttendanceDbContext.cs (add FingerprintRequests DbSet)
src/Application/.../EmployeeVacations/Commands/CreateEmployeeVacation/*.cs (on-behalf + auto-approve)
src/Application/.../Excuses/Commands/CreateEmployeeExcuse/*.cs (on-behalf + auto-approve)
src/Application/.../RemoteWorkRequests/Commands/CreateRemoteWorkRequest/*.cs (on-behalf + auto-approve)
```

### Frontend Files to Create
```
time-attendance-selfservice-frontend/src/app/pages/portal/
  vacation-requests/
    - vacation-request-form.component.ts/.html/.css
    - vacation-request-details.component.ts/.html/.css
  manager-dashboard/
    - manager-dashboard.component.ts/.html/.css
  team/
    - team-members.component.ts/.html/.css
  approvals/
    - pending-approvals.component.ts/.html/.css
    - approval-detail-modal.component.ts/.html/.css

time-attendance-selfservice-frontend/src/app/core/guards/
  - manager.guard.ts
```

### Frontend Files to Modify
```
time-attendance-selfservice-frontend/src/environments/environment.ts (API URL)
time-attendance-selfservice-frontend/src/environments/environment.development.ts (API URL)
time-attendance-selfservice-frontend/src/app/app.routes.ts
time-attendance-selfservice-frontend/src/app/core/menu/menu.service.ts
time-attendance-selfservice-frontend/src/app/core/i18n/translations/en.json
time-attendance-selfservice-frontend/src/app/core/i18n/translations/ar.json
time-attendance-selfservice-frontend/src/app/pages/portal/services/portal.service.ts
time-attendance-selfservice-frontend/src/app/pages/portal/excuse-requests/excuse-request-form.component.ts
time-attendance-selfservice-frontend/src/app/pages/portal/remote-work-requests/remote-work-request-form.component.ts
```

### Files to Delete (Phase 6)
```
src-selfservice/ (entire folder after migration complete)
```

---

## Benefits of Unified Backend

1. **No Code Duplication** - Workflow engine, entities, services all shared
2. **Single Database Context** - One DbContext, one migration path
3. **Easier Maintenance** - Bug fixes apply everywhere automatically
4. **Simpler Deployment** - One backend to deploy and monitor
5. **Shared Authentication** - Same auth system, same tokens
6. **Existing Tests** - Leverage existing test coverage

---

## Testing Checklist

### Employee Self-Service
- [ ] Frontend connects to main backend (port 5099)
- [ ] Employee can view/create/edit/delete vacation requests
- [ ] Employee can view/create/edit/delete excuse requests
- [ ] Employee can view/create/edit/delete remote work requests
- [ ] Employee can view/create fingerprint requests
- [ ] Requests trigger workflow and show workflow status

### Manager Dashboard & Team
- [ ] Manager can view their dashboard with team stats
- [ ] Manager can see list of all team members (full hierarchy)
- [ ] Dashboard shows accurate pending approval counts

### Workflow-Based Approvals
- [ ] Manager can view pending approvals assigned to them
- [ ] Manager can approve/reject workflow steps
- [ ] Manager can delegate approval to another user
- [ ] Multi-level workflows work correctly

### Submit on Behalf of Team
- [ ] Manager can submit vacation on behalf of team member
- [ ] Manager can submit excuse on behalf of team member
- [ ] Manager can submit remote work on behalf of team member
- [ ] Auto-approval works when manager is in approval chain
- [ ] Manager can only submit for employees in their hierarchy

### Access Control
- [ ] Non-managers cannot access manager features
- [ ] Employees can only see their own requests
- [ ] Existing admin functionality still works

### Cleanup
- [ ] src-selfservice deleted after migration complete
- [ ] No references to old selfservice API remain

---

**Last Updated**: December 27, 2025
