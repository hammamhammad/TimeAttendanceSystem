# Employee Self-Service Portal - Implementation Plan

**Project**: Time Attendance System
**Feature**: Employee Self-Service Portal
**Version**: 1.0
**Date**: October 25, 2025
**Status**: Planning Phase

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Portal Overview](#portal-overview)
3. [Architecture & Design](#architecture--design)
4. [Feature Requirements](#feature-requirements)
5. [Implementation Phases](#implementation-phases)
6. [Technical Specifications](#technical-specifications)
7. [Component Structure](#component-structure)
8. [Backend API Requirements](#backend-api-requirements)
9. [Database Schema Updates](#database-schema-updates)
10. [Security & Authorization](#security--authorization)
11. [UI/UX Guidelines](#uiux-guidelines)
12. [Testing Strategy](#testing-strategy)
13. [Timeline & Milestones](#timeline--milestones)
14. [Risk Assessment](#risk-assessment)

---

## Executive Summary

### Purpose
The Employee Self-Service Portal will provide a centralized platform for employees and managers to access and manage their time attendance data, submit requests, and monitor workflows. This portal will reduce administrative overhead and improve employee engagement.

### Key Benefits
- **For Employees**: Self-service access to attendance data, vacation requests, and excuse submissions
- **For Managers**: Streamlined approval workflows and team oversight
- **For HR/Admin**: Reduced manual processing and improved transparency
- **For Organization**: Better data accuracy and compliance tracking

### Success Metrics
- 80% reduction in manual data entry requests
- 50% faster approval processing time
- 90% employee adoption rate within 3 months
- Improved employee satisfaction scores

---

## Portal Overview

### Portal Structure

```
Employee Self-Service Portal
├── Dashboard (Main Landing Page)
│   ├── Quick Stats Overview
│   ├── Recent Activity Timeline
│   ├── Pending Actions/Notifications
│   └── Quick Action Buttons
│
├── My Attendance
│   ├── My Attendance Reports
│   ├── View My Attendance History
│   └── Export My Attendance Data
│
├── My Requests
│   ├── Vacation Requests (List, Create, View, Edit)
│   ├── Excuse Requests (List, Create, View, Edit)
│   ├── Fingerprint Update Requests
│   └── Request Status Tracking
│
├── My Profile
│   ├── Personal Information
│   ├── Employment Details
│   ├── Shift Information
│   └── Contact Information
│
├── Change Password
│   └── Password Update Form
│
└── Manager Dashboard (Manager Role Only)
    ├── Team Overview
    ├── Pending Approvals
    │   ├── Vacation Requests
    │   ├── Excuse Requests
    │   └── Fingerprint Updates
    ├── Team Attendance Reports
    └── Workflow Management
```

### User Roles & Access

| Feature | Employee | Manager | Admin |
|---------|----------|---------|-------|
| View Own Dashboard | ✅ | ✅ | ✅ |
| View Own Attendance | ✅ | ✅ | ✅ |
| Submit Vacation Request | ✅ | ✅ | ✅ |
| Submit Excuse Request | ✅ | ✅ | ✅ |
| Submit Fingerprint Update | ✅ | ✅ | ✅ |
| View Own Profile | ✅ | ✅ | ✅ |
| Change Own Password | ✅ | ✅ | ✅ |
| View Team Dashboard | ❌ | ✅ | ✅ |
| Approve/Reject Requests | ❌ | ✅ | ✅ |
| View Team Attendance | ❌ | ✅ | ✅ |
| Manage Workflows | ❌ | ✅ | ✅ |

---

## Architecture & Design

### Frontend Architecture

```
src/app/pages/portal/
├── dashboard/
│   ├── employee-dashboard/
│   │   ├── employee-dashboard.component.ts
│   │   ├── employee-dashboard.component.html
│   │   └── employee-dashboard.component.css
│   └── manager-dashboard/
│       ├── manager-dashboard.component.ts
│       ├── manager-dashboard.component.html
│       └── manager-dashboard.component.css
│
├── my-attendance/
│   ├── my-attendance-reports/
│   │   ├── my-attendance-reports.component.ts
│   │   ├── my-attendance-reports.component.html
│   │   └── my-attendance-reports.component.css
│   └── my-attendance-history/
│       ├── my-attendance-history.component.ts
│       ├── my-attendance-history.component.html
│       └── my-attendance-history.component.css
│
├── my-requests/
│   ├── request-dashboard/
│   │   ├── request-dashboard.component.ts
│   │   ├── request-dashboard.component.html
│   │   └── request-dashboard.component.css
│   ├── vacation-request/
│   │   ├── vacation-request-form/
│   │   ├── vacation-request-list/
│   │   └── vacation-request-detail/
│   ├── excuse-request/
│   │   ├── excuse-request-form/
│   │   ├── excuse-request-list/
│   │   └── excuse-request-detail/
│   └── fingerprint-update/
│       ├── fingerprint-request-form/
│       ├── fingerprint-request-list/
│       └── fingerprint-request-detail/
│
├── my-profile/
│   ├── profile-view/
│   │   ├── profile-view.component.ts
│   │   ├── profile-view.component.html
│   │   └── profile-view.component.css
│   └── profile-edit/
│       ├── profile-edit.component.ts
│       ├── profile-edit.component.html
│       └── profile-edit.component.css
│
├── manager/
│   ├── approval-dashboard/
│   │   ├── approval-dashboard.component.ts
│   │   ├── approval-dashboard.component.html
│   │   └── approval-dashboard.component.css
│   ├── pending-approvals/
│   │   ├── pending-approvals.component.ts
│   │   ├── pending-approvals.component.html
│   │   └── pending-approvals.component.css
│   ├── team-attendance/
│   │   ├── team-attendance.component.ts
│   │   ├── team-attendance.component.html
│   │   └── team-attendance.component.css
│   └── workflow-management/
│       ├── workflow-management.component.ts
│       ├── workflow-management.component.html
│       └── workflow-management.component.css
│
├── shared/
│   ├── request-status-badge/
│   ├── request-timeline/
│   ├── approval-action-panel/
│   └── activity-feed/
│
└── portal.service.ts
```

### Backend Architecture

```
src/Api/TimeAttendanceSystem.Api/
└── Controllers/
    ├── PortalController.cs
    ├── EmployeePortalController.cs
    ├── ManagerPortalController.cs
    └── RequestsController.cs

src/Application/TimeAttendanceSystem.Application/
├── Features/
│   └── Portal/
│       ├── EmployeeDashboard/
│       │   ├── Queries/
│       │   │   ├── GetEmployeeDashboardQuery.cs
│       │   │   └── GetEmployeeStatsQuery.cs
│       │   └── DTOs/
│       │       └── EmployeeDashboardDto.cs
│       ├── ManagerDashboard/
│       │   ├── Queries/
│       │   │   ├── GetManagerDashboardQuery.cs
│       │   │   ├── GetTeamStatsQuery.cs
│       │   │   └── GetPendingApprovalsQuery.cs
│       │   └── DTOs/
│       │       ├── ManagerDashboardDto.cs
│       │       └── PendingApprovalDto.cs
│       ├── Requests/
│       │   ├── Commands/
│       │   │   ├── CreateVacationRequestCommand.cs
│       │   │   ├── CreateExcuseRequestCommand.cs
│       │   │   ├── CreateFingerprintUpdateRequestCommand.cs
│       │   │   ├── ApproveRequestCommand.cs
│       │   │   └── RejectRequestCommand.cs
│       │   ├── Queries/
│       │   │   ├── GetMyRequestsQuery.cs
│       │   │   ├── GetRequestDetailQuery.cs
│       │   │   └── GetPendingTeamRequestsQuery.cs
│       │   └── DTOs/
│       │       ├── RequestDto.cs
│       │       ├── RequestDetailDto.cs
│       │       └── RequestApprovalDto.cs
│       └── Profile/
│           ├── Queries/
│           │   └── GetMyProfileQuery.cs
│           ├── Commands/
│           │   └── UpdateMyProfileCommand.cs
│           └── DTOs/
│               └── EmployeeProfileDto.cs
│
└── Services/
    ├── PortalService.cs
    ├── RequestWorkflowService.cs
    └── NotificationService.cs

src/Domain/TimeAttendanceSystem.Domain/
└── Entities/
    ├── Request.cs (Base class)
    ├── VacationRequest.cs
    ├── ExcuseRequest.cs
    ├── FingerprintUpdateRequest.cs
    └── RequestApprovalHistory.cs
```

---

## Feature Requirements

### 1. Employee Dashboard

#### 1.1 Quick Stats Overview
**Purpose**: Display key metrics at a glance

**Components to Use**:
- `StatsGridComponent` for metrics grid
- `StatCardComponent` for individual stats
- `LoadingSpinnerComponent` for loading states

**Metrics to Display**:
- Current Month Attendance Rate
- Total Working Hours (Current Month)
- Remaining Vacation Days
- Pending Requests Count
- Late/Early Departures Count
- Overtime Hours (Current Month)

**Technical Details**:
```typescript
// Stats Configuration
stats = computed(() => [
  {
    title: this.i18n.t('portal.stats.attendance_rate'),
    value: `${this.dashboardData()?.attendanceRate ?? 0}%`,
    icon: 'fas fa-chart-line',
    variant: 'primary',
    trend: this.dashboardData()?.attendanceTrend,
    trendUp: (this.dashboardData()?.attendanceTrend ?? 0) > 0
  },
  {
    title: this.i18n.t('portal.stats.working_hours'),
    value: this.dashboardData()?.totalWorkingHours ?? '0h',
    icon: 'fas fa-clock',
    variant: 'success'
  },
  {
    title: this.i18n.t('portal.stats.vacation_days'),
    value: this.dashboardData()?.remainingVacationDays ?? 0,
    icon: 'fas fa-umbrella-beach',
    variant: 'info'
  },
  {
    title: this.i18n.t('portal.stats.pending_requests'),
    value: this.dashboardData()?.pendingRequestsCount ?? 0,
    icon: 'fas fa-hourglass-half',
    variant: 'warning'
  }
]);
```

#### 1.2 Recent Activity Timeline
**Purpose**: Show recent attendance and request activities

**Components to Use**:
- Custom `ActivityFeedComponent` (new shared component)
- `EmptyStateComponent` when no activities
- `StatusBadgeComponent` for status indicators

**Activity Types**:
- Attendance check-in/check-out
- Request submissions
- Request approvals/rejections
- Shift changes
- Policy updates

#### 1.3 Pending Actions/Notifications
**Purpose**: Alert users to items requiring attention

**Components to Use**:
- `InfoAlertComponent` for notifications
- `BadgeListComponent` for action items
- `ActionDropdownComponent` for quick actions

**Notification Types**:
- Pending request responses
- Upcoming shifts
- Missing attendance records
- Policy violations
- Deadline reminders

#### 1.4 Quick Action Buttons
**Purpose**: Provide fast access to common tasks

**Components to Use**:
- `QuickActionsPanelComponent`
- Custom quick action cards

**Actions**:
- Submit Vacation Request
- Submit Excuse Request
- Request Fingerprint Update
- View My Attendance
- View My Profile

---

### 2. My Attendance

#### 2.1 My Attendance Reports
**Purpose**: View personal attendance data with filtering and export

**Components to Use**:
- `DataTableComponent` for attendance records
- `DateRangePickerComponent` for filtering
- `SearchFilterComponent` for search
- `EmptyStateComponent` for no data
- `PaginationComponent` for pagination
- `StatusBadgeComponent` for status display

**Features**:
- Date range filtering
- Status filtering (Present, Absent, Late, etc.)
- Search by date or day
- Export to PDF/Excel
- Detailed daily view

**Table Columns**:
- Date
- Day of Week
- Check-In Time
- Check-Out Time
- Working Hours
- Status
- Overtime
- Notes/Remarks

#### 2.2 My Attendance History
**Purpose**: Visual representation of attendance patterns

**Components to Use**:
- Custom calendar/chart component
- `SectionCardComponent` for grouping
- `DefinitionListComponent` for details

**Visualizations**:
- Monthly calendar view
- Attendance rate chart
- Working hours trend
- Punctuality metrics

---

### 3. My Requests

#### 3.1 Request Dashboard
**Purpose**: Central hub for all request types

**Components to Use**:
- `ContentTabsComponent` for request types
- `DataTableComponent` for request lists
- `StatusBadgeComponent` for status
- `TableActionsComponent` for actions

**Request Status Flow**:
```
Draft → Submitted → Pending Approval → Approved/Rejected → Completed/Cancelled
```

**Common Request Features**:
- Create new request
- View request details
- Edit draft/pending requests
- Cancel submitted requests
- Track approval history
- View rejection reasons
- Export request history

#### 3.2 Vacation Requests

**Create Vacation Request Form**:

**Components to Use**:
- `FormHeaderComponent`
- `FormSectionComponent`
- `FormGroupComponent`
- `DateRangePickerComponent`
- `SearchableSelectComponent` for vacation type
- `LoadingSpinnerComponent`

**Form Fields**:
- Vacation Type (dropdown with available types)
- Start Date
- End Date
- Number of Days (auto-calculated)
- Reason/Description
- Attachment (optional)
- Emergency Contact
- Backup Employee (optional)

**Validation Rules**:
- Start date must be in the future
- End date must be after start date
- Check vacation balance availability
- Check overlapping requests
- Minimum advance notice (configurable)
- Maximum consecutive days (configurable)

**Business Logic**:
```typescript
// Vacation Request Validation
interface VacationRequestValidation {
  hasAvailableBalance: boolean;
  minimumNoticeMet: boolean;
  noOverlappingRequests: boolean;
  withinMaxConsecutiveDays: boolean;
  approverAvailable: boolean;
}

// Auto-calculation
calculateVacationDays(startDate: Date, endDate: Date): number {
  // Exclude weekends and public holidays
  // Consider working days only
}
```

**Vacation Request List**:

**Columns**:
- Request ID
- Vacation Type
- Start Date
- End Date
- Duration (Days)
- Status
- Submission Date
- Approver
- Actions

**Filters**:
- Status filter
- Date range filter
- Vacation type filter

#### 3.3 Excuse Requests

**Create Excuse Request Form**:

**Form Fields**:
- Excuse Type (Late Arrival, Early Departure, Absence)
- Date
- Time Range (for partial day excuses)
- Reason (dropdown + description)
- Reason Description
- Supporting Documents (upload)
- Policy Reference (auto-populated)

**Excuse Types**:
- Late Arrival
- Early Departure
- Partial Day Absence
- Full Day Absence
- Multiple Day Absence

**Validation Rules**:
- Excuse date must be within allowed retroactive period
- Must comply with excuse policy
- Check daily excuse limit
- Verify required documentation

**Excuse Request List**:

**Columns**:
- Request ID
- Excuse Type
- Date/Time
- Duration
- Reason
- Status
- Submission Date
- Approver
- Actions

#### 3.4 Fingerprint Update Requests

**Purpose**: Request fingerprint re-enrollment or updates

**Create Fingerprint Update Request Form**:

**Form Fields**:
- Request Type (New Enrollment, Update, Issue)
- Issue Description
- Affected Finger(s)
- Preferred Date/Time for Re-enrollment
- Reason for Update
- Supporting Documents

**Request Types**:
- Initial Enrollment (new employee)
- Re-enrollment (damaged/changed fingerprint)
- Additional Finger Registration
- Device Issue Report
- Location Change Request

**Validation Rules**:
- One active request per employee
- Required reason description
- Preferred date within business hours

**Fingerprint Request List**:

**Columns**:
- Request ID
- Request Type
- Issue Description
- Status
- Submission Date
- Scheduled Date/Time
- Actions

---

### 4. My Profile

#### 4.1 Profile View
**Purpose**: Display employee's complete profile information

**Components to Use**:
- `FormHeaderComponent` for header
- `SectionCardComponent` for sections
- `DefinitionListComponent` for info display
- `StatusBadgeComponent` for status
- `BadgeListComponent` for roles/tags

**Profile Sections**:

**Personal Information**:
- Full Name
- Employee ID
- Email Address
- Phone Number
- Date of Birth
- National ID
- Profile Photo

**Employment Details**:
- Job Title
- Department
- Branch/Location
- Manager/Supervisor
- Hire Date
- Employment Type
- Employee Status

**Shift Information**:
- Current Shift
- Shift Pattern
- Working Hours
- Break Times
- Flexible Hours Policy
- Remote Work Policy

**Attendance Configuration**:
- Fingerprint Status
- Assigned Devices
- Overtime Policy
- Excuse Policy
- Vacation Balance

**Contact Information**:
- Work Email
- Personal Email
- Work Phone
- Mobile Phone
- Emergency Contact Name
- Emergency Contact Phone
- Address

#### 4.2 Profile Edit
**Purpose**: Allow employees to update editable profile fields

**Editable Fields**:
- Personal Email
- Phone Number
- Mobile Phone
- Emergency Contact Information
- Address
- Profile Photo

**Read-Only Fields**:
- Employee ID
- Name (requires HR approval)
- Department
- Shift
- Employment Details

**Validation**:
- Email format validation
- Phone number format validation
- Required fields enforcement
- Image upload validation (size, format)

---

### 5. Change Password

**Purpose**: Secure password update functionality

**Components to Use**:
- `FormHeaderComponent`
- `FormSectionComponent`
- `FormGroupComponent`
- `ErrorAlertComponent` for errors
- `InfoAlertComponent` for success

**Form Fields**:
- Current Password
- New Password
- Confirm New Password

**Password Requirements**:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character
- Cannot be same as last 5 passwords
- Cannot contain username

**Security Features**:
- Real-time password strength indicator
- Password visibility toggle
- Password requirements checklist
- Session invalidation after change
- Email notification on change

---

### 6. Manager Dashboard

#### 6.1 Team Overview
**Purpose**: High-level view of team attendance and status

**Components to Use**:
- `StatsGridComponent`
- `DataTableComponent`
- `StatusBadgeComponent`
- Custom team status cards

**Team Metrics**:
- Team Size
- Present Today
- Absent Today
- Late Arrivals
- Pending Requests
- Team Attendance Rate
- Team Overtime Hours

**Team Member Status**:
- Real-time presence status
- Today's schedule
- Upcoming absences
- Current requests

#### 6.2 Pending Approvals

**Purpose**: Centralized approval management

**Components to Use**:
- `ContentTabsComponent` for request types
- `DataTableComponent` for lists
- `ModalWrapperComponent` for approval dialog
- Custom `ApprovalActionPanelComponent`

**Approval Dashboard Features**:
- Multi-request selection
- Bulk approval/rejection
- Priority flagging
- Deadline indicators
- Filtering and sorting
- Quick view details

**Approval Actions**:
- Approve Request
- Reject Request (with reason)
- Request More Information
- Escalate to Higher Authority
- Forward to Another Approver

**Approval Form**:

**Components to Use**:
- `ModalWrapperComponent`
- `FormGroupComponent`
- `DefinitionListComponent` for request details
- `StatusBadgeComponent`

**Approval Fields**:
- Approval Decision (Approve/Reject)
- Comments/Notes
- Modified Duration (for partial approvals)
- Conditions/Restrictions
- Priority Level

**Approval Validation**:
- Ensure no conflicts with team schedule
- Verify policy compliance
- Check team coverage requirements
- Validate business rules

**Approval History**:
- Timestamp
- Approver
- Decision
- Comments
- Previous status
- Current status

#### 6.3 Team Attendance Reports

**Purpose**: Comprehensive team attendance analysis

**Components to Use**:
- `DataTableComponent`
- `DateRangePickerComponent`
- `UnifiedFilterComponent`
- Custom attendance charts

**Report Types**:
- Daily Team Attendance
- Monthly Team Summary
- Individual Employee Reports
- Comparative Analysis
- Trend Reports

**Filters**:
- Date range
- Department/Team
- Employee
- Status
- Shift

**Export Options**:
- PDF Report
- Excel Spreadsheet
- CSV Export

#### 6.4 Workflow Management

**Purpose**: Configure and monitor approval workflows

**Components to Use**:
- `SectionCardComponent`
- `DataTableComponent`
- Custom workflow diagram component

**Workflow Features**:
- View current workflows
- Active approvals in progress
- Workflow history
- Escalation rules
- Delegation settings
- Out-of-office configuration

---

## Implementation Phases

### Phase 1: Foundation & Core Setup (Week 1-2)

**Backend Tasks**:
1. Create database entities and migrations
   - `Request` base entity
   - `VacationRequest` entity
   - `ExcuseRequest` entity
   - `FingerprintUpdateRequest` entity
   - `RequestApprovalHistory` entity
   - Migration scripts

2. Create DTOs and mapping profiles
   - Request DTOs
   - Dashboard DTOs
   - Profile DTOs
   - AutoMapper configurations

3. Create base services and repositories
   - `IRequestRepository`
   - `RequestRepository`
   - `PortalService`
   - `RequestWorkflowService`

**Frontend Tasks**:
1. Create folder structure
   - Portal module folders
   - Service files
   - Shared components folder

2. Create base services
   - `PortalService`
   - `RequestService`
   - `ProfileService`

3. Create routing configuration
   - Portal routes
   - Guard configurations
   - Route resolvers

**Deliverables**:
- ✅ Database schema created and migrated
- ✅ Base entities and repositories
- ✅ Folder structure established
- ✅ Routing configured
- ✅ Base services created

---

### Phase 2: Employee Dashboard (Week 3-4)

**Backend Tasks**:
1. Create dashboard queries
   - `GetEmployeeDashboardQuery`
   - `GetEmployeeStatsQuery`
   - `GetRecentActivityQuery`

2. Create dashboard API endpoints
   - `GET /api/portal/employee/dashboard`
   - `GET /api/portal/employee/stats`
   - `GET /api/portal/employee/activity`

3. Implement business logic
   - Stats calculation
   - Activity aggregation
   - Notification generation

**Frontend Tasks**:
1. Create employee dashboard component
   - Stats grid
   - Activity timeline
   - Notifications panel
   - Quick actions

2. Create shared components
   - `ActivityFeedComponent`
   - `RequestStatusBadgeComponent`
   - `ApprovalActionPanelComponent`

3. Integrate with backend API
   - Service methods
   - State management
   - Error handling

**Deliverables**:
- ✅ Employee dashboard UI complete
- ✅ Stats display working
- ✅ Activity feed functioning
- ✅ Quick actions accessible
- ✅ API integration complete

---

### Phase 3: My Attendance (Week 5)

**Backend Tasks**:
1. Create attendance queries
   - `GetMyAttendanceQuery`
   - `GetMyAttendanceHistoryQuery`
   - `GetAttendanceStatsQuery`

2. Create attendance API endpoints
   - `GET /api/portal/employee/attendance`
   - `GET /api/portal/employee/attendance/history`
   - `GET /api/portal/employee/attendance/export`

3. Implement export functionality
   - PDF export service
   - Excel export service

**Frontend Tasks**:
1. Create attendance reports component
   - Data table
   - Filters
   - Search
   - Export buttons

2. Create attendance history component
   - Calendar view
   - Charts/graphs
   - Details panel

3. Integrate with backend API
   - Service methods
   - Export functionality
   - Error handling

**Deliverables**:
- ✅ Attendance reports page complete
- ✅ Attendance history page complete
- ✅ Export functionality working
- ✅ Filters and search working

---

### Phase 4: Vacation Requests (Week 6-7)

**Backend Tasks**:
1. Create vacation request commands
   - `CreateVacationRequestCommand`
   - `UpdateVacationRequestCommand`
   - `CancelVacationRequestCommand`

2. Create vacation request queries
   - `GetMyVacationRequestsQuery`
   - `GetVacationRequestDetailQuery`
   - `GetAvailableVacationBalanceQuery`

3. Create API endpoints
   - `POST /api/portal/employee/vacation-requests`
   - `PUT /api/portal/employee/vacation-requests/{id}`
   - `DELETE /api/portal/employee/vacation-requests/{id}`
   - `GET /api/portal/employee/vacation-requests`
   - `GET /api/portal/employee/vacation-requests/{id}`

4. Implement business rules
   - Vacation balance validation
   - Overlap detection
   - Policy compliance checks

**Frontend Tasks**:
1. Create vacation request form
   - Form with validation
   - Date range picker
   - Balance display
   - Validation feedback

2. Create vacation request list
   - Data table
   - Filters
   - Status badges
   - Actions

3. Create vacation request detail
   - Detail view
   - Approval history
   - Edit/cancel actions

4. Integrate with backend API
   - CRUD operations
   - Validation
   - Error handling

**Deliverables**:
- ✅ Vacation request form complete
- ✅ Vacation request list complete
- ✅ Vacation request detail complete
- ✅ Validation working
- ✅ API integration complete

---

### Phase 5: Excuse Requests (Week 8)

**Backend Tasks**:
1. Create excuse request commands
   - `CreateExcuseRequestCommand`
   - `UpdateExcuseRequestCommand`
   - `CancelExcuseRequestCommand`

2. Create excuse request queries
   - `GetMyExcuseRequestsQuery`
   - `GetExcuseRequestDetailQuery`

3. Create API endpoints
   - `POST /api/portal/employee/excuse-requests`
   - `PUT /api/portal/employee/excuse-requests/{id}`
   - `DELETE /api/portal/employee/excuse-requests/{id}`
   - `GET /api/portal/employee/excuse-requests`
   - `GET /api/portal/employee/excuse-requests/{id}`

4. Implement business rules
   - Policy compliance validation
   - Retroactive date limits
   - Documentation requirements

**Frontend Tasks**:
1. Create excuse request form
   - Form with validation
   - Time range picker
   - Document upload
   - Reason selection

2. Create excuse request list
   - Data table
   - Filters
   - Status tracking

3. Create excuse request detail
   - Detail view
   - Documents display
   - Approval history

4. Integrate with backend API

**Deliverables**:
- ✅ Excuse request functionality complete
- ✅ Document upload working
- ✅ Validation working
- ✅ API integration complete

---

### Phase 6: Fingerprint Update Requests (Week 9)

**Backend Tasks**:
1. Create fingerprint request commands
   - `CreateFingerprintUpdateRequestCommand`
   - `UpdateFingerprintUpdateRequestCommand`
   - `CompleteFingerprintUpdateRequestCommand`

2. Create fingerprint request queries
   - `GetMyFingerprintRequestsQuery`
   - `GetFingerprintRequestDetailQuery`

3. Create API endpoints
   - `POST /api/portal/employee/fingerprint-requests`
   - `PUT /api/portal/employee/fingerprint-requests/{id}`
   - `GET /api/portal/employee/fingerprint-requests`
   - `GET /api/portal/employee/fingerprint-requests/{id}`

4. Implement business rules
   - One active request limit
   - Scheduling logic

**Frontend Tasks**:
1. Create fingerprint request form
   - Request type selection
   - Issue description
   - Date/time scheduling

2. Create fingerprint request list
   - Data table
   - Status tracking

3. Create fingerprint request detail
   - Detail view
   - Scheduled date/time
   - Completion status

4. Integrate with backend API

**Deliverables**:
- ✅ Fingerprint request functionality complete
- ✅ Scheduling working
- ✅ API integration complete

---

### Phase 7: My Profile (Week 10)

**Backend Tasks**:
1. Create profile queries
   - `GetMyProfileQuery`
   - `GetProfileDetailsQuery`

2. Create profile commands
   - `UpdateMyProfileCommand`
   - `UpdateProfilePhotoCommand`

3. Create API endpoints
   - `GET /api/portal/employee/profile`
   - `PUT /api/portal/employee/profile`
   - `POST /api/portal/employee/profile/photo`

**Frontend Tasks**:
1. Create profile view component
   - Profile sections
   - Definition lists
   - Photo display

2. Create profile edit component
   - Edit form
   - Photo upload
   - Validation

3. Integrate with backend API

**Deliverables**:
- ✅ Profile view complete
- ✅ Profile edit complete
- ✅ Photo upload working
- ✅ API integration complete

---

### Phase 8: Manager Dashboard (Week 11-12)

**Backend Tasks**:
1. Create manager dashboard queries
   - `GetManagerDashboardQuery`
   - `GetTeamStatsQuery`
   - `GetPendingApprovalsQuery`
   - `GetTeamAttendanceQuery`

2. Create approval commands
   - `ApproveRequestCommand`
   - `RejectRequestCommand`
   - `BulkApproveRequestsCommand`

3. Create API endpoints
   - `GET /api/portal/manager/dashboard`
   - `GET /api/portal/manager/team-stats`
   - `GET /api/portal/manager/pending-approvals`
   - `POST /api/portal/manager/approve-request`
   - `POST /api/portal/manager/reject-request`
   - `POST /api/portal/manager/bulk-approve`

4. Implement workflow logic
   - Approval validation
   - Team coverage checks
   - Notification triggers

**Frontend Tasks**:
1. Create manager dashboard component
   - Team overview
   - Stats display
   - Pending approvals summary

2. Create pending approvals component
   - Tabbed interface
   - Bulk actions
   - Approval modal
   - Quick view

3. Create team attendance component
   - Team attendance table
   - Filters
   - Export

4. Create workflow management component
   - Active workflows
   - Delegation settings

5. Integrate with backend API

**Deliverables**:
- ✅ Manager dashboard complete
- ✅ Approval workflow complete
- ✅ Team attendance reports complete
- ✅ Bulk actions working
- ✅ API integration complete

---

### Phase 9: Notifications & Integration (Week 13)

**Backend Tasks**:
1. Implement notification service
   - Email notifications
   - In-app notifications
   - Notification templates

2. Create notification triggers
   - Request submission
   - Request approval/rejection
   - Deadline reminders
   - Status changes

3. Create notification API endpoints
   - `GET /api/portal/notifications`
   - `PUT /api/portal/notifications/{id}/read`
   - `DELETE /api/portal/notifications/{id}`

**Frontend Tasks**:
1. Create notification component
   - Notification bell icon
   - Notification dropdown
   - Notification list
   - Mark as read

2. Implement real-time updates
   - SignalR integration (if applicable)
   - Polling mechanism
   - Toast notifications

3. Integrate notifications across portal

**Deliverables**:
- ✅ Notification system complete
- ✅ Email notifications working
- ✅ Real-time updates working
- ✅ Integration complete

---

### Phase 10: Testing, Polish & Deployment (Week 14-15)

**Backend Tasks**:
1. Unit testing
   - Service tests
   - Validation tests
   - Business logic tests

2. Integration testing
   - API endpoint tests
   - Database tests
   - Workflow tests

3. Performance optimization
   - Query optimization
   - Caching implementation
   - Load testing

**Frontend Tasks**:
1. Component testing
   - Unit tests
   - Integration tests

2. E2E testing
   - User flow tests
   - Cross-browser testing

3. UI/UX polish
   - Responsive design fixes
   - Accessibility improvements
   - Loading states
   - Error handling

4. Performance optimization
   - Lazy loading
   - Code splitting
   - Bundle optimization

**Documentation**:
1. User guides
   - Employee user guide
   - Manager user guide
   - FAQ

2. Technical documentation
   - API documentation
   - Architecture documentation
   - Deployment guide

**Deployment**:
1. Staging deployment
2. UAT (User Acceptance Testing)
3. Production deployment
4. Post-deployment monitoring

**Deliverables**:
- ✅ All tests passing
- ✅ Performance optimized
- ✅ Documentation complete
- ✅ Production deployment successful

---

## Technical Specifications

### Frontend Technologies

**Framework**: Angular 17+ (Standalone Components)

**Key Libraries**:
- Angular Signals for reactive state
- Bootstrap 5 for styling
- Chart.js for visualizations
- date-fns for date manipulation
- ngx-file-drop for file uploads

**Shared Components to Use**:
- `StatusBadgeComponent`
- `DefinitionListComponent`
- `BadgeListComponent`
- `DataTableComponent`
- `TableActionsComponent`
- `FormHeaderComponent`
- `FormSectionComponent`
- `FormGroupComponent`
- `DateRangePickerComponent`
- `SearchableSelectComponent`
- `LoadingSpinnerComponent`
- `EmptyStateComponent`
- `ErrorAlertComponent`
- `ModalWrapperComponent`
- `ConfirmationModalComponent`
- `StatsGridComponent`
- `StatCardComponent`
- `PaginationComponent`

**New Shared Components to Create**:
- `ActivityFeedComponent` - Timeline of activities
- `RequestStatusBadgeComponent` - Request-specific status badges
- `RequestTimelineComponent` - Request approval timeline
- `ApprovalActionPanelComponent` - Approval action buttons
- `QuickActionCardComponent` - Dashboard quick actions
- `NotificationBellComponent` - Notification dropdown

---

### Backend Technologies

**Framework**: ASP.NET Core 9.0

**Patterns**:
- CQRS with MediatR
- Repository Pattern
- Unit of Work Pattern
- AutoMapper for mapping

**Key Libraries**:
- Entity Framework Core
- FluentValidation
- Serilog for logging
- Hangfire/Coravel for background jobs

**Background Jobs**:
- Daily vacation balance updates
- Request deadline reminders
- Notification cleanup
- Report generation

---

### API Endpoints

#### Portal Endpoints

```
# Employee Dashboard
GET    /api/portal/employee/dashboard                      # Get dashboard data
GET    /api/portal/employee/stats                          # Get employee stats
GET    /api/portal/employee/activity                       # Get recent activity

# My Attendance
GET    /api/portal/employee/attendance                     # Get attendance records
GET    /api/portal/employee/attendance/history             # Get attendance history
GET    /api/portal/employee/attendance/export              # Export attendance data

# Vacation Requests
GET    /api/portal/employee/vacation-requests              # List vacation requests
POST   /api/portal/employee/vacation-requests              # Create vacation request
GET    /api/portal/employee/vacation-requests/{id}         # Get request detail
PUT    /api/portal/employee/vacation-requests/{id}         # Update vacation request
DELETE /api/portal/employee/vacation-requests/{id}         # Cancel vacation request
GET    /api/portal/employee/vacation-balance               # Get vacation balance

# Excuse Requests
GET    /api/portal/employee/excuse-requests                # List excuse requests
POST   /api/portal/employee/excuse-requests                # Create excuse request
GET    /api/portal/employee/excuse-requests/{id}           # Get request detail
PUT    /api/portal/employee/excuse-requests/{id}           # Update excuse request
DELETE /api/portal/employee/excuse-requests/{id}           # Cancel excuse request

# Fingerprint Update Requests
GET    /api/portal/employee/fingerprint-requests           # List fingerprint requests
POST   /api/portal/employee/fingerprint-requests           # Create fingerprint request
GET    /api/portal/employee/fingerprint-requests/{id}      # Get request detail
PUT    /api/portal/employee/fingerprint-requests/{id}      # Update fingerprint request

# My Profile
GET    /api/portal/employee/profile                        # Get my profile
PUT    /api/portal/employee/profile                        # Update my profile
POST   /api/portal/employee/profile/photo                  # Upload profile photo

# Manager Dashboard
GET    /api/portal/manager/dashboard                       # Get manager dashboard
GET    /api/portal/manager/team-stats                      # Get team stats
GET    /api/portal/manager/pending-approvals               # Get pending approvals
GET    /api/portal/manager/team-attendance                 # Get team attendance

# Request Approvals
POST   /api/portal/manager/requests/{id}/approve           # Approve request
POST   /api/portal/manager/requests/{id}/reject            # Reject request
POST   /api/portal/manager/requests/bulk-approve           # Bulk approve requests
GET    /api/portal/manager/requests/{id}/history           # Get approval history

# Notifications
GET    /api/portal/notifications                           # Get notifications
PUT    /api/portal/notifications/{id}/read                 # Mark as read
DELETE /api/portal/notifications/{id}                      # Delete notification
POST   /api/portal/notifications/read-all                  # Mark all as read
```

---

## Database Schema Updates

### New Tables

#### 1. Requests (Base Table)
```sql
CREATE TABLE Requests (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RequestType VARCHAR(50) NOT NULL,  -- Vacation, Excuse, FingerprintUpdate
    EmployeeId INT NOT NULL,
    Status VARCHAR(50) NOT NULL,  -- Draft, Submitted, Pending, Approved, Rejected, Cancelled
    SubmissionDate DATETIME2 NULL,
    ApprovalDate DATETIME2 NULL,
    ApproverId INT NULL,
    Priority VARCHAR(20) DEFAULT 'Normal',  -- Low, Normal, High, Urgent
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAtUtc DATETIME2 NULL,
    CreatedBy INT NOT NULL,
    UpdatedBy INT NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,

    CONSTRAINT FK_Requests_Employee FOREIGN KEY (EmployeeId)
        REFERENCES Employees(Id),
    CONSTRAINT FK_Requests_Approver FOREIGN KEY (ApproverId)
        REFERENCES Employees(Id)
);

CREATE INDEX IX_Requests_EmployeeId ON Requests(EmployeeId);
CREATE INDEX IX_Requests_Status ON Requests(Status);
CREATE INDEX IX_Requests_ApproverId ON Requests(ApproverId);
```

#### 2. VacationRequests
```sql
CREATE TABLE VacationRequests (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RequestId INT NOT NULL,
    VacationTypeId INT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    NumberOfDays INT NOT NULL,
    Reason NVARCHAR(500) NULL,
    EmergencyContact NVARCHAR(200) NULL,
    EmergencyPhone NVARCHAR(20) NULL,
    BackupEmployeeId INT NULL,
    AttachmentPath NVARCHAR(500) NULL,
    RejectionReason NVARCHAR(500) NULL,
    BalanceAfterRequest DECIMAL(5,2) NULL,

    CONSTRAINT FK_VacationRequests_Request FOREIGN KEY (RequestId)
        REFERENCES Requests(Id),
    CONSTRAINT FK_VacationRequests_VacationType FOREIGN KEY (VacationTypeId)
        REFERENCES VacationTypes(Id),
    CONSTRAINT FK_VacationRequests_BackupEmployee FOREIGN KEY (BackupEmployeeId)
        REFERENCES Employees(Id)
);

CREATE INDEX IX_VacationRequests_RequestId ON VacationRequests(RequestId);
CREATE INDEX IX_VacationRequests_Dates ON VacationRequests(StartDate, EndDate);
```

#### 3. ExcuseRequests
```sql
CREATE TABLE ExcuseRequests (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RequestId INT NOT NULL,
    ExcuseType VARCHAR(50) NOT NULL,  -- LateArrival, EarlyDeparture, Absence
    ExcuseDate DATE NOT NULL,
    StartTime TIME NULL,
    EndTime TIME NULL,
    Duration INT NULL,  -- In minutes
    ReasonCategory VARCHAR(100) NOT NULL,
    ReasonDescription NVARCHAR(500) NOT NULL,
    AttendanceId INT NULL,  -- Link to attendance record if exists
    AttachmentPath NVARCHAR(500) NULL,
    RejectionReason NVARCHAR(500) NULL,
    PolicyReferenceId INT NULL,

    CONSTRAINT FK_ExcuseRequests_Request FOREIGN KEY (RequestId)
        REFERENCES Requests(Id),
    CONSTRAINT FK_ExcuseRequests_Attendance FOREIGN KEY (AttendanceId)
        REFERENCES Attendances(Id),
    CONSTRAINT FK_ExcuseRequests_Policy FOREIGN KEY (PolicyReferenceId)
        REFERENCES ExcusePolicies(Id)
);

CREATE INDEX IX_ExcuseRequests_RequestId ON ExcuseRequests(RequestId);
CREATE INDEX IX_ExcuseRequests_Date ON ExcuseRequests(ExcuseDate);
```

#### 4. FingerprintUpdateRequests
```sql
CREATE TABLE FingerprintUpdateRequests (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RequestId INT NOT NULL,
    RequestType VARCHAR(50) NOT NULL,  -- NewEnrollment, Update, Issue
    IssueDescription NVARCHAR(500) NOT NULL,
    AffectedFingers NVARCHAR(100) NULL,
    PreferredDate DATE NULL,
    PreferredTime TIME NULL,
    ScheduledDate DATE NULL,
    ScheduledTime TIME NULL,
    CompletedDate DATETIME2 NULL,
    TechnicianId INT NULL,
    TechnicianNotes NVARCHAR(500) NULL,
    RejectionReason NVARCHAR(500) NULL,

    CONSTRAINT FK_FingerprintUpdateRequests_Request FOREIGN KEY (RequestId)
        REFERENCES Requests(Id),
    CONSTRAINT FK_FingerprintUpdateRequests_Technician FOREIGN KEY (TechnicianId)
        REFERENCES Users(Id)
);

CREATE INDEX IX_FingerprintUpdateRequests_RequestId ON FingerprintUpdateRequests(RequestId);
CREATE INDEX IX_FingerprintUpdateRequests_ScheduledDate ON FingerprintUpdateRequests(ScheduledDate);
```

#### 5. RequestApprovalHistory
```sql
CREATE TABLE RequestApprovalHistory (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RequestId INT NOT NULL,
    ApproverId INT NOT NULL,
    Action VARCHAR(50) NOT NULL,  -- Submitted, Approved, Rejected, Cancelled, MoreInfoRequested
    PreviousStatus VARCHAR(50) NOT NULL,
    NewStatus VARCHAR(50) NOT NULL,
    Comments NVARCHAR(1000) NULL,
    ActionDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IPAddress VARCHAR(50) NULL,

    CONSTRAINT FK_RequestApprovalHistory_Request FOREIGN KEY (RequestId)
        REFERENCES Requests(Id),
    CONSTRAINT FK_RequestApprovalHistory_Approver FOREIGN KEY (ApproverId)
        REFERENCES Employees(Id)
);

CREATE INDEX IX_RequestApprovalHistory_RequestId ON RequestApprovalHistory(RequestId);
CREATE INDEX IX_RequestApprovalHistory_ActionDate ON RequestApprovalHistory(ActionDate);
```

#### 6. EmployeeProfileUpdates
```sql
CREATE TABLE EmployeeProfileUpdates (
    Id INT PRIMARY KEY IDENTITY(1,1),
    EmployeeId INT NOT NULL,
    FieldName VARCHAR(100) NOT NULL,
    OldValue NVARCHAR(500) NULL,
    NewValue NVARCHAR(500) NULL,
    UpdatedBy INT NOT NULL,
    UpdatedAtUtc DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IPAddress VARCHAR(50) NULL,

    CONSTRAINT FK_EmployeeProfileUpdates_Employee FOREIGN KEY (EmployeeId)
        REFERENCES Employees(Id),
    CONSTRAINT FK_EmployeeProfileUpdates_UpdatedBy FOREIGN KEY (UpdatedBy)
        REFERENCES Users(Id)
);

CREATE INDEX IX_EmployeeProfileUpdates_EmployeeId ON EmployeeProfileUpdates(EmployeeId);
```

#### 7. Notifications
```sql
CREATE TABLE Notifications (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    Type VARCHAR(50) NOT NULL,  -- RequestSubmitted, RequestApproved, RequestRejected, etc.
    Title NVARCHAR(200) NOT NULL,
    Message NVARCHAR(1000) NOT NULL,
    RelatedEntityType VARCHAR(50) NULL,
    RelatedEntityId INT NULL,
    IsRead BIT NOT NULL DEFAULT 0,
    ReadAtUtc DATETIME2 NULL,
    CreatedAtUtc DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ExpiresAtUtc DATETIME2 NULL,

    CONSTRAINT FK_Notifications_User FOREIGN KEY (UserId)
        REFERENCES Users(Id)
);

CREATE INDEX IX_Notifications_UserId ON Notifications(UserId);
CREATE INDEX IX_Notifications_IsRead ON Notifications(IsRead);
CREATE INDEX IX_Notifications_CreatedAtUtc ON Notifications(CreatedAtUtc);
```

### Table Modifications

#### Employees Table
```sql
-- Add new columns to Employees table
ALTER TABLE Employees ADD ProfilePhotoPath NVARCHAR(500) NULL;
ALTER TABLE Employees ADD PersonalEmail NVARCHAR(100) NULL;
ALTER TABLE Employees ADD MobilePhone NVARCHAR(20) NULL;
ALTER TABLE Employees ADD EmergencyContactName NVARCHAR(200) NULL;
ALTER TABLE Employees ADD EmergencyContactPhone NVARCHAR(20) NULL;
ALTER TABLE Employees ADD Address NVARCHAR(500) NULL;
ALTER TABLE Employees ADD LastProfileUpdateDate DATETIME2 NULL;
```

---

## Security & Authorization

### Role-Based Access Control

#### Permission Definitions

```csharp
public static class PortalPermissions
{
    // Employee Permissions
    public const string ViewOwnDashboard = "portal.employee.dashboard.read";
    public const string ViewOwnAttendance = "portal.employee.attendance.read";
    public const string ExportOwnAttendance = "portal.employee.attendance.export";
    public const string CreateVacationRequest = "portal.employee.vacation.create";
    public const string ViewOwnVacationRequests = "portal.employee.vacation.read";
    public const string UpdateOwnVacationRequests = "portal.employee.vacation.update";
    public const string CancelOwnVacationRequests = "portal.employee.vacation.cancel";
    public const string CreateExcuseRequest = "portal.employee.excuse.create";
    public const string ViewOwnExcuseRequests = "portal.employee.excuse.read";
    public const string UpdateOwnExcuseRequests = "portal.employee.excuse.update";
    public const string CreateFingerprintRequest = "portal.employee.fingerprint.create";
    public const string ViewOwnProfile = "portal.employee.profile.read";
    public const string UpdateOwnProfile = "portal.employee.profile.update";
    public const string ChangeOwnPassword = "portal.employee.password.change";

    // Manager Permissions
    public const string ViewManagerDashboard = "portal.manager.dashboard.read";
    public const string ViewTeamAttendance = "portal.manager.team.attendance.read";
    public const string ViewPendingApprovals = "portal.manager.approvals.read";
    public const string ApproveRequests = "portal.manager.approvals.approve";
    public const string RejectRequests = "portal.manager.approvals.reject";
    public const string BulkApproveRequests = "portal.manager.approvals.bulk";
    public const string ViewTeamProfiles = "portal.manager.team.profile.read";
    public const string ExportTeamReports = "portal.manager.team.export";
    public const string ManageWorkflows = "portal.manager.workflows.manage";
}
```

#### Authorization Rules

**Employees**:
- Can view only their own data
- Can create requests for themselves
- Can update/cancel pending requests
- Cannot approve their own requests
- Cannot view other employees' data

**Managers**:
- Can view team members' data
- Can approve/reject team requests
- Can view team attendance reports
- Cannot approve requests for employees outside their team
- Cannot modify attendance records directly

**Admins**:
- Full access to all portal features
- Can act on behalf of any approver
- Can override approval workflows
- Can access all reports and data

### Data Access Security

```csharp
// Example authorization check
public async Task<EmployeeDashboardDto> GetEmployeeDashboard(int userId)
{
    var employee = await _employeeRepository.GetByUserId(userId);

    // Ensure user can only access their own data
    if (employee.UserId != userId && !_currentUser.IsAdmin())
    {
        throw new UnauthorizedException("Cannot access other employee's data");
    }

    return await _dashboardService.GetEmployeeDashboard(employee.Id);
}

// Manager authorization check
public async Task<List<PendingApprovalDto>> GetPendingApprovals(int managerId)
{
    var manager = await _employeeRepository.GetByIdAsync(managerId);

    if (!manager.IsManager && !_currentUser.IsAdmin())
    {
        throw new UnauthorizedException("Only managers can view pending approvals");
    }

    // Return only requests for team members
    return await _requestService.GetPendingApprovalsByManager(managerId);
}
```

### API Security

**Authentication**:
- JWT token authentication
- Token refresh mechanism
- Secure token storage

**Request Validation**:
- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

**Rate Limiting**:
- API endpoint rate limits
- Per-user rate limits
- Brute force protection

**Audit Logging**:
- All request submissions logged
- All approvals/rejections logged
- All profile updates logged
- Failed authorization attempts logged

---

## UI/UX Guidelines

### Design Principles

1. **Consistency**: Use established shared components throughout
2. **Clarity**: Clear labels, helpful error messages, informative feedback
3. **Efficiency**: Minimize clicks, provide shortcuts, smart defaults
4. **Responsiveness**: Mobile-first design, touch-friendly
5. **Accessibility**: WCAG 2.1 Level AA compliance

### Color Scheme

**Status Colors** (using Bootstrap variants):
- `success` (Green): Approved, Active, Present
- `danger` (Red): Rejected, Inactive, Absent
- `warning` (Yellow): Pending, Late, Warning
- `info` (Blue): Submitted, Information
- `secondary` (Gray): Draft, Inactive, Neutral

### Typography

- **Headers**: Use `FormHeaderComponent` and `PageHeaderComponent`
- **Body Text**: Bootstrap default
- **Labels**: Use `FormGroupComponent` labels
- **Status**: Use `StatusBadgeComponent`

### Spacing

- Follow Bootstrap spacing utilities (m-*, p-*)
- Consistent card spacing
- Section separation with `SectionCardComponent`

### Icons

Use Font Awesome icons:
- Dashboard: `fas fa-tachometer-alt`
- Attendance: `fas fa-calendar-check`
- Requests: `fas fa-file-alt`
- Vacation: `fas fa-umbrella-beach`
- Excuse: `fas fa-comment-medical`
- Fingerprint: `fas fa-fingerprint`
- Profile: `fas fa-user`
- Approval: `fas fa-check-circle`
- Rejection: `fas fa-times-circle`
- Pending: `fas fa-hourglass-half`

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Adaptations**:
- Stack cards vertically
- Collapsible filters
- Simplified tables (show essential columns only)
- Bottom navigation for quick actions
- Full-width forms

### Loading States

Use `LoadingSpinnerComponent`:
- Page-level loading
- Component-level loading
- Button loading states
- Skeleton screens for lists

### Empty States

Use `EmptyStateComponent`:
- No requests
- No attendance records
- No notifications
- No search results

### Error Handling

Use `ErrorAlertComponent`:
- Form validation errors
- API errors
- Network errors
- Permission errors

---

## Testing Strategy

### Backend Testing

#### Unit Tests
- Service layer tests
- Validation tests
- Business logic tests
- Repository tests

**Test Coverage Target**: 80%

**Example Test Cases**:
```csharp
public class VacationRequestServiceTests
{
    [Fact]
    public async Task CreateVacationRequest_WithSufficientBalance_ShouldSucceed()
    {
        // Arrange
        var request = new CreateVacationRequestCommand { ... };
        var employee = new Employee { VacationBalance = 10 };

        // Act
        var result = await _service.CreateVacationRequest(request);

        // Assert
        Assert.True(result.IsSuccess);
        Assert.NotNull(result.Data);
    }

    [Fact]
    public async Task CreateVacationRequest_WithInsufficientBalance_ShouldFail()
    {
        // Arrange
        var request = new CreateVacationRequestCommand { NumberOfDays = 15 };
        var employee = new Employee { VacationBalance = 5 };

        // Act
        var result = await _service.CreateVacationRequest(request);

        // Assert
        Assert.False(result.IsSuccess);
        Assert.Contains("insufficient balance", result.ErrorMessage.ToLower());
    }
}
```

#### Integration Tests
- API endpoint tests
- Database integration tests
- Workflow integration tests

#### Performance Tests
- Load testing (concurrent users)
- Stress testing (peak loads)
- Endurance testing (sustained load)

### Frontend Testing

#### Unit Tests
- Component tests
- Service tests
- Pipe/Filter tests
- Utility function tests

**Test Coverage Target**: 75%

**Example Test Cases**:
```typescript
describe('EmployeeDashboardComponent', () => {
  it('should display stats correctly', () => {
    const fixture = TestBed.createComponent(EmployeeDashboardComponent);
    const component = fixture.componentInstance;

    component.dashboardData.set({
      attendanceRate: 95,
      totalWorkingHours: '160h',
      remainingVacationDays: 10,
      pendingRequestsCount: 2
    });

    fixture.detectChanges();

    const statsCards = fixture.nativeElement.querySelectorAll('.stat-card');
    expect(statsCards.length).toBe(4);
    expect(statsCards[0].textContent).toContain('95%');
  });

  it('should load dashboard data on init', async () => {
    const fixture = TestBed.createComponent(EmployeeDashboardComponent);
    const component = fixture.componentInstance;
    const service = TestBed.inject(PortalService);

    spyOn(service, 'getEmployeeDashboard').and.returnValue(
      of({ attendanceRate: 95, ... })
    );

    component.ngOnInit();

    expect(service.getEmployeeDashboard).toHaveBeenCalled();
    expect(component.dashboardData()).toBeTruthy();
  });
});
```

#### Integration Tests
- Component interaction tests
- Service integration tests
- Router navigation tests

#### E2E Tests
- User flow tests
- Critical path tests
- Cross-browser tests

**Critical E2E Test Scenarios**:
1. Employee creates vacation request
2. Manager approves vacation request
3. Employee views attendance history
4. Employee updates profile
5. Manager views team dashboard
6. Employee submits excuse request
7. Manager bulk approves requests

### Manual Testing

#### UAT Test Cases
- Employee portal walkthrough
- Manager portal walkthrough
- Request submission flow
- Approval workflow
- Profile management
- Attendance viewing
- Notification functionality

#### Browser Testing
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

#### Device Testing
- Desktop (1920x1080, 1366x768)
- Tablet (iPad, Android tablet)
- Mobile (iPhone, Android phone)

---

## Timeline & Milestones

### Overall Timeline: 15 Weeks

```
Week 1-2:   Foundation & Core Setup
Week 3-4:   Employee Dashboard
Week 5:     My Attendance
Week 6-7:   Vacation Requests
Week 8:     Excuse Requests
Week 9:     Fingerprint Update Requests
Week 10:    My Profile
Week 11-12: Manager Dashboard
Week 13:    Notifications & Integration
Week 14-15: Testing, Polish & Deployment
```

### Key Milestones

| Milestone | Week | Deliverable |
|-----------|------|-------------|
| M1: Foundation Complete | 2 | Database schema, base services, routing |
| M2: Employee Dashboard Live | 4 | Fully functional employee dashboard |
| M3: Attendance Module Complete | 5 | Attendance reports and history |
| M4: Request Management Complete | 9 | All request types functional |
| M5: Profile Management Complete | 10 | Profile view and edit |
| M6: Manager Portal Complete | 12 | Full manager functionality |
| M7: Notifications Live | 13 | Notification system working |
| M8: Production Ready | 15 | Testing complete, deployed |

### Sprint Breakdown

**Sprint 1 (Weeks 1-3)**: Foundation + Employee Dashboard
**Sprint 2 (Weeks 4-6)**: Attendance + Vacation Requests
**Sprint 3 (Weeks 7-9)**: Excuse + Fingerprint Requests
**Sprint 4 (Weeks 10-12)**: Profile + Manager Dashboard
**Sprint 5 (Weeks 13-15)**: Notifications + Testing + Deployment

---

## Risk Assessment

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Database performance issues with large datasets | Medium | High | Implement proper indexing, pagination, caching |
| Integration conflicts with existing attendance system | Low | High | Thorough integration testing, feature flags |
| Complex approval workflows causing bugs | Medium | Medium | Comprehensive workflow testing, state machine |
| Notification system overwhelming users | Medium | Low | Configurable notification preferences, throttling |
| Mobile responsiveness issues | Low | Medium | Mobile-first design, thorough device testing |

### Business Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Low user adoption | Medium | High | User training, intuitive UI, pilot program |
| Resistance to self-service model | Low | Medium | Change management, communication plan |
| Workflow bottlenecks | Medium | Medium | Configurable escalation rules, delegation |
| Data privacy concerns | Low | High | Strong security measures, audit logging |
| Feature scope creep | High | Medium | Strict phase adherence, change control |

### Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Insufficient training | Medium | Medium | Comprehensive training program, user guides |
| Support burden during rollout | High | Medium | Dedicated support team, FAQ, helpdesk |
| System downtime during deployment | Low | High | Staging deployment, rollback plan |
| Data migration issues | Medium | High | Thorough testing, backup strategy |

---

## Success Criteria

### Functional Success Criteria

- ✅ All user stories implemented and tested
- ✅ All three user roles (Employee, Manager, Admin) fully functional
- ✅ All request types working end-to-end
- ✅ Approval workflows functioning correctly
- ✅ Notifications working (email and in-app)
- ✅ Reports and exports working
- ✅ Mobile responsive on all major devices
- ✅ All shared components properly integrated

### Performance Success Criteria

- ✅ Dashboard loads in < 2 seconds
- ✅ Request submission completes in < 1 second
- ✅ Data table rendering < 500ms for 100 rows
- ✅ Export generation < 5 seconds
- ✅ 99.5% uptime
- ✅ Support 500 concurrent users

### Quality Success Criteria

- ✅ 80% backend test coverage
- ✅ 75% frontend test coverage
- ✅ Zero critical bugs
- ✅ < 5 high-priority bugs
- ✅ WCAG 2.1 Level AA compliant
- ✅ All code reviews passed

### User Acceptance Criteria

- ✅ 90% positive feedback from pilot users
- ✅ 80% task completion rate in UAT
- ✅ < 10% support tickets per user in first month
- ✅ 70% adoption rate within first month
- ✅ 90% adoption rate within three months

---

## Appendix

### A. Component Usage Examples

#### Employee Dashboard Example

```typescript
// employee-dashboard.component.ts
import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StatsGridComponent } from '../../../shared/components/stats-grid/stats-grid.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../../../shared/components/error-alert/error-alert.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PortalService } from '../portal.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsGridComponent,
    SectionCardComponent,
    LoadingSpinnerComponent,
    ErrorAlertComponent
  ],
  templateUrl: './employee-dashboard.component.html'
})
export class EmployeeDashboardComponent implements OnInit {
  private i18n = inject(I18nService);
  private portalService = inject(PortalService);
  private router = inject(Router);

  loading = signal(true);
  error = signal<string | null>(null);
  dashboardData = signal<EmployeeDashboardDto | null>(null);

  stats = computed(() => {
    const data = this.dashboardData();
    if (!data) return [];

    return [
      {
        title: this.i18n.t('portal.stats.attendance_rate'),
        value: `${data.attendanceRate}%`,
        icon: 'fas fa-chart-line',
        variant: 'primary' as const,
        trend: `${data.attendanceTrend > 0 ? '+' : ''}${data.attendanceTrend}%`,
        trendUp: data.attendanceTrend > 0
      },
      {
        title: this.i18n.t('portal.stats.working_hours'),
        value: `${data.totalWorkingHours}h`,
        icon: 'fas fa-clock',
        variant: 'success' as const
      },
      {
        title: this.i18n.t('portal.stats.vacation_days'),
        value: data.remainingVacationDays,
        icon: 'fas fa-umbrella-beach',
        variant: 'info' as const
      },
      {
        title: this.i18n.t('portal.stats.pending_requests'),
        value: data.pendingRequestsCount,
        icon: 'fas fa-hourglass-half',
        variant: 'warning' as const
      }
    ];
  });

  ngOnInit(): void {
    this.loadDashboard();
  }

  async loadDashboard(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);
      const data = await this.portalService.getEmployeeDashboard();
      this.dashboardData.set(data);
    } catch (err: any) {
      this.error.set(err.message || this.i18n.t('common.error_loading_data'));
    } finally {
      this.loading.set(false);
    }
  }

  onQuickAction(action: string): void {
    switch (action) {
      case 'vacation':
        this.router.navigate(['/portal/my-requests/vacation/create']);
        break;
      case 'excuse':
        this.router.navigate(['/portal/my-requests/excuse/create']);
        break;
      case 'fingerprint':
        this.router.navigate(['/portal/my-requests/fingerprint/create']);
        break;
      case 'attendance':
        this.router.navigate(['/portal/my-attendance']);
        break;
      case 'profile':
        this.router.navigate(['/portal/my-profile']);
        break;
    }
  }
}
```

```html
<!-- employee-dashboard.component.html -->
<div class="employee-dashboard">
  <div class="page-header mb-4">
    <h1>{{ i18n.t('portal.dashboard.title') }}</h1>
    <p class="text-muted">{{ i18n.t('portal.dashboard.subtitle') }}</p>
  </div>

  @if (loading()) {
    <app-loading-spinner [message]="i18n.t('common.loading')"></app-loading-spinner>
  }

  @if (error()) {
    <app-error-alert
      [message]="error()!"
      [title]="i18n.t('common.error')"
      [showRetry]="true"
      (retry)="loadDashboard()">
    </app-error-alert>
  }

  @if (!loading() && !error() && dashboardData()) {
    <!-- Stats Grid -->
    <app-stats-grid
      [stats]="stats()"
      [columns]="4"
      class="mb-4">
    </app-stats-grid>

    <div class="row">
      <!-- Quick Actions -->
      <div class="col-lg-4 mb-4">
        <app-section-card
          [title]="i18n.t('portal.quick_actions')"
          [icon]="'fas fa-bolt'">
          <div class="quick-actions">
            <button class="btn btn-outline-primary w-100 mb-2" (click)="onQuickAction('vacation')">
              <i class="fas fa-umbrella-beach me-2"></i>
              {{ i18n.t('portal.actions.request_vacation') }}
            </button>
            <button class="btn btn-outline-secondary w-100 mb-2" (click)="onQuickAction('excuse')">
              <i class="fas fa-comment-medical me-2"></i>
              {{ i18n.t('portal.actions.submit_excuse') }}
            </button>
            <button class="btn btn-outline-info w-100 mb-2" (click)="onQuickAction('fingerprint')">
              <i class="fas fa-fingerprint me-2"></i>
              {{ i18n.t('portal.actions.update_fingerprint') }}
            </button>
            <button class="btn btn-outline-success w-100 mb-2" (click)="onQuickAction('attendance')">
              <i class="fas fa-calendar-check me-2"></i>
              {{ i18n.t('portal.actions.view_attendance') }}
            </button>
          </div>
        </app-section-card>
      </div>

      <!-- Recent Activity -->
      <div class="col-lg-8 mb-4">
        <app-section-card
          [title]="i18n.t('portal.recent_activity')"
          [icon]="'fas fa-history'">
          <!-- Activity feed component here -->
        </app-section-card>
      </div>
    </div>
  }
</div>
```

### B. Internationalization (i18n) Keys

```json
{
  "portal": {
    "dashboard": {
      "title": "My Dashboard",
      "subtitle": "Welcome back! Here's your overview"
    },
    "stats": {
      "attendance_rate": "Attendance Rate",
      "working_hours": "Working Hours",
      "vacation_days": "Remaining Vacation Days",
      "pending_requests": "Pending Requests"
    },
    "quick_actions": "Quick Actions",
    "recent_activity": "Recent Activity",
    "actions": {
      "request_vacation": "Request Vacation",
      "submit_excuse": "Submit Excuse",
      "update_fingerprint": "Update Fingerprint",
      "view_attendance": "View My Attendance"
    }
  }
}
```

### C. API Response DTOs

```csharp
// EmployeeDashboardDto.cs
public class EmployeeDashboardDto
{
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; }
    public decimal AttendanceRate { get; set; }
    public decimal AttendanceTrend { get; set; }
    public decimal TotalWorkingHours { get; set; }
    public int RemainingVacationDays { get; set; }
    public int PendingRequestsCount { get; set; }
    public List<ActivityDto> RecentActivity { get; set; }
    public List<NotificationDto> Notifications { get; set; }
}

// RequestDto.cs
public class RequestDto
{
    public int Id { get; set; }
    public string RequestType { get; set; }
    public string Status { get; set; }
    public DateTime SubmissionDate { get; set; }
    public DateTime? ApprovalDate { get; set; }
    public string ApproverName { get; set; }
    public string Summary { get; set; }
}

// VacationRequestDto.cs
public class VacationRequestDto : RequestDto
{
    public string VacationType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int NumberOfDays { get; set; }
    public string Reason { get; set; }
    public decimal BalanceAfterRequest { get; set; }
}
```

---

## Conclusion

This comprehensive plan provides a structured approach to implementing the Employee Self-Service Portal for the Time Attendance System. The portal will significantly improve employee experience, streamline workflows, and reduce administrative overhead.

### Next Steps

1. **Review & Approval**: Present plan to stakeholders for review
2. **Resource Allocation**: Assign development team members
3. **Environment Setup**: Prepare development/staging environments
4. **Kickoff Meeting**: Conduct project kickoff with all team members
5. **Sprint 1 Start**: Begin Phase 1 implementation

### Contact & Support

For questions or clarifications regarding this implementation plan:
- Technical Lead: [Contact Info]
- Project Manager: [Contact Info]
- Product Owner: [Contact Info]

---

**Document Version**: 1.0
**Last Updated**: October 25, 2025
**Status**: Ready for Review
