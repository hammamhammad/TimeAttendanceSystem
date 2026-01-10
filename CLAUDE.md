# Development Guidelines for Time Attendance System

## System Overview

The Time Attendance System is a comprehensive enterprise-grade workforce management solution that provides:
- **Time & Attendance Tracking**: Automated attendance recording, overtime calculation, and reporting
- **Leave Management**: Vacation requests, leave balances, accruals, and approvals
- **Employee Self-Service Portal**: Separate frontend for employees to manage their own requests
- **Approval Workflows**: Multi-step configurable approval processes with delegation
- **Organization Management**: Multi-branch support with departments and hierarchies
- **Shift Management**: Complex shift configurations with multiple periods and assignments
- **Remote Work Management**: Policies and requests for remote/hybrid work
- **Comprehensive Reporting**: Analytics, dashboards, and audit logging

---

## System Features Reference

### Core Modules

#### 1. Authentication & Authorization
- JWT-based authentication with refresh tokens
- Two-factor authentication (2FA) with backup codes
- Role-based access control (RBAC)
- Permission-based authorization
- Branch-scoped access control (multi-tenancy)
- Session management and blacklisted tokens
- Password policies and history tracking
- Login attempt tracking and lockout

#### 2. Organization Structure
- **Branches**: Multi-branch organization support with branch-scoped data
- **Departments**: Hierarchical department structure (parent-child relationships)
- **Employees**: Complete employee lifecycle management
- **Users**: User accounts with role and branch assignments
- **Roles & Permissions**: Fine-grained permission system

#### 3. Time & Attendance
- **Attendance Records**: Daily automated generation of attendance records
- **Transactions**: Check-in, check-out, break start/end tracking
- **Calculations**: Automatic working hours, overtime, late minutes, early leave
- **Status Tracking**: Present, Absent, Late, OnLeave, Holiday, Weekend, etc.
- **Manual Override**: Edit and override automated attendance calculations
- **Approval Workflow**: Multi-step attendance approval process
- **Finalization**: Lock attendance records after approval
- **Device Integration**: Support for biometric fingerprint devices

#### 4. Shift Management
- **Shift Types**: Regular, Flexible, Split, Rotating, Night shifts
- **Shift Periods**: Multiple work periods per shift
- **Break Configuration**: Configurable break times
- **Grace Periods**: Late arrival and early departure tolerance
- **Overtime Rules**: Per-shift overtime calculation settings
- **Off Days**: Configurable off days per shift
- **Core Hours**: Define mandatory working hours
- **Shift Assignments**: Assign shifts to employees, departments, or branches
- **Priority System**: Handle overlapping shift assignments by priority
- **Temporary Assignments**: Time-bound shift assignments
- **Change Shift**: Modify employee or attendance record shifts

#### 5. Leave Management
- **Vacation Types**: Configurable leave types (annual, sick, personal, etc.)
- **Leave Policies**: Paid/unpaid, max days, carryover rules, accrual policies
- **Employee Vacations**: Create, approve, and track vacation requests
- **Leave Balances**: Track balances by employee and vacation type
- **Leave Transactions**: Accrual, usage, adjustments, carryover, expiry
- **Leave Entitlements**: Automatic entitlement assignments
- **Approval Workflow**: Multi-step vacation approval process
- **Calendar View**: Visual vacation calendar

#### 6. Excuse Management
- **Excuse Policies**: Configurable excuse types and limits
- **Excuse Types**: Sick, Personal, Emergency, Medical, Family, etc.
- **Documentation Requirements**: Attachable documents for excuses
- **Approval Workflow**: Multi-step excuse approval process
- **Balance Tracking**: Track excuse hours/days usage
- **Reset Periods**: Configure policy reset cycles

#### 7. Remote Work Management
- **Remote Work Policies**: Maximum days per week/month, notice periods
- **Work Location Types**: Office, Remote, Field Work, Client Site
- **Remote Work Requests**: Create and approve remote work requests
- **Approval Workflow**: Multi-step remote work approval process
- **Blackout Periods**: Define periods when remote work is not allowed
- **Department Eligibility**: Configure which departments can work remotely

#### 8. Approval Workflows
- **Workflow Definitions**: Configurable multi-step approval processes
- **Workflow Types**: Support for Vacation, Excuse, Remote Work, and custom types
- **Step Types**: Approval, Notification, Condition, Automatic
- **Approver Types**: Role, User, Manager, Direct Manager, Department Head
- **Delegation**: Delegate approvals to other users
- **Timeout & Escalation**: Automatic escalation on timeout
- **Conditional Logic**: Execute steps based on conditions
- **Parallel & Sequential**: Support both approval patterns
- **Branch-Specific**: Different workflows per branch

#### 9. Employee Self-Service Portal
**Separate Angular Application** (`time-attendance-selfservice-frontend`)
- **Employee Dashboard**: Personal attendance stats, vacation balance, recent activity
- **Manager Dashboard**: Team statistics, pending approvals, team member list
- **My Attendance**: View personal attendance records and history
- **My Profile**: View and update personal information
- **Vacation Requests**: Create, view, edit, and cancel vacation requests
- **Excuse Requests**: Create, view, edit, and cancel excuse requests
- **Remote Work Requests**: Create, view, edit, and cancel remote work requests
- **Fingerprint Requests**: Request fingerprint enrollment, update, or repair
- **Approvals**: Approve/reject team member requests (for managers)
- **Team View**: View team members and their hierarchy

#### 10. Fingerprint/Biometric Management
- **Fingerprint Requests**: Employee self-service requests for fingerprint management
- **Request Types**: Enrollment, Update, Repair, Replacement
- **Technician Assignment**: Assign technicians to handle requests
- **Status Tracking**: Pending, InProgress, Completed, Cancelled
- **Preferred Date/Time**: Schedule fingerprint appointments
- **Technician Notes**: Track technician feedback and resolution

#### 11. Overtime Management
- **Overtime Configuration**: Per-branch overtime rules
- **Regular Overtime**: Standard overtime rate and thresholds
- **Premium Overtime**: Enhanced overtime for weekends/holidays
- **Daily/Weekly/Monthly Thresholds**: Multiple calculation periods
- **Automatic Calculation**: Overtime calculated during attendance processing
- **Approval Requirements**: Optional approval workflow for overtime

#### 12. Public Holidays
- **Holiday Management**: Create and manage public holidays
- **Recurring Holidays**: Support for annual recurring holidays
- **Branch-Specific**: Different holidays per branch
- **Attendance Impact**: Automatic marking of attendance on holidays
- **Bilingual Names**: Holiday names in English and Arabic

#### 13. Dashboards & Analytics
- **Admin Dashboard**: Organization stats, HR stats, attendance stats, leave stats, system health
- **Employee Dashboard**: Personal attendance, leave balance, recent activity, upcoming vacations
- **Manager Dashboard**: Team size, pending approvals, team attendance overview
- **Widgets**: Modular dashboard with real-time data refresh
- **Weekly Trends**: Attendance trends over time
- **Incomplete Records**: Track and highlight incomplete attendance

#### 14. Reporting & Audit
- **Attendance Reports**: Summary and detailed reports with date range, branch, department filtering
- **Leave Reports**: Leave summary and breakdown by type
- **Export to CSV**: Download reports for external analysis
- **Audit Logs**: Comprehensive tracking of all system changes
- **Audit Changes**: Before/after value comparison for all modifications
- **Session Reports**: Active sessions and login history
- **User Activity Tracking**: Track who did what and when

#### 15. System Administration
- **Database Seeding**: Initialize system with sample data
- **Background Jobs** (using Coravel):
  - Daily attendance generation
  - Leave accrual calculations
  - Session cleanup
  - Report generation
- **Permission Management**: Manage system permissions
- **System Configuration**: Configure system-wide settings

#### 16. Multi-Language Support
- **Bilingual UI**: Full support for English and Arabic
- **Entity Names**: All entities support bilingual names
- **RTL Support**: Right-to-left layout for Arabic
- **Translation Service**: Centralized i18n service

---

## General Development Rules

### Project Structure
- Understand the project structure and follow this structure before implementing any new feature
- Split the new components into three files (ts, html, css)
- Follow the established folder organization patterns
- **Two Frontend Applications**:
  - `time-attendance-frontend`: Admin/management application (http://localhost:4200)
  - `time-attendance-selfservice-frontend`: Employee self-service portal (http://localhost:4201)
- **See "Running the Complete System" section below for startup instructions**

### Development Workflow
- Always give me the plan for implementation, then wait for me to confirm
- Compile the project and confirm no compilation errors before going to the next step
- Test features thoroughly before considering them complete
- Consider which frontend application the feature belongs to (admin vs. self-service)
- When testing, run all three applications: Backend (5099), Admin (4200), and Self-Service (4201)

### Backend Development
- Use **Coravel package** for all background jobs
- **Database Setup for Development**:
  - First time: Database will be created automatically on first run with essential seed data (systemadmin user, roles, permissions)
  - After database creation: Run `scripts/sample-data-with-users.sql` to populate with sample data (50 employees, 5 branches, 20 departments)
  - Sample data includes login credentials - Default password: `Emp@123!` (users must change on first login)
- When applying database migrations, ensure that all existing data in the database is preserved
- Always run the backend on **http://localhost:5099**
- Follow Clean Architecture layers: Domain → Application → Infrastructure → API
- Use Entity Framework Core for data access
- Implement repository pattern with generic base repository
- Use DTOs for API request/response
- Implement proper validation using FluentValidation
- Use AutoMapper for object mapping

### Frontend Development
- Always run the admin frontend on **http://localhost:4200**
- Always run the self-service portal on **http://localhost:4201**
- Both frontends are separate applications that share the same backend API
- Always use the new Angular template syntax `@if` / `@for` instead of legacy structural directives (`*ngIf`, `*ngFor`)
- Follow Angular 17+ standalone component patterns
- Use Angular Signals for reactive state management

---

## Frontend Component Standards

### Required Services
- Always use `NotificationService` for user notifications (success, error, warning, info)
- Always use `ConfirmationService` for confirmation dialogs (delete, submit, etc.)

### Data Display Standards
- Always use `DataTableComponent` for tables in the frontend
- Use `EmptyStateComponent` when no data is available
- Use `LoadingSpinnerComponent` for loading states

### Shared Component Usage (IMPORTANT)

#### View Pages
When creating view/detail pages, **always use**:
- `StatusBadgeComponent` for all status displays
- `DefinitionListComponent` for label-value pairs (instead of manual dt/dd)
- `BadgeListComponent` for collections of badges
- `FormHeaderComponent` for page headers with navigation
- `DetailCardComponent` for information cards

**Required Pattern**:
```typescript
import { Component, signal, inject, computed } from '@angular/core';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { BadgeListComponent, BadgeItem } from '../../../shared/components/badge-list/badge-list.component';

// Always use computed properties for reactive badge configuration
statusBadge = computed(() => ({
  label: this.entity()?.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
  variant: this.entity()?.isActive ? 'success' : 'secondary'
}));
```

#### List Pages
When creating list pages, **always use**:
- `DataTableComponent` for the main table
- `TableActionsComponent` for row actions (view, edit, delete)
- `SearchFilterComponent` or `UnifiedFilterComponent` for filtering
- `BulkActionsToolbarComponent` for bulk operations
- `PaginationComponent` for pagination
- `EmptyStateComponent` for empty states

#### Form Pages
When creating form pages, **always use**:
- `FormHeaderComponent` for page header
- `FormSectionComponent` for logical grouping of fields
- `FormGroupComponent` for individual form fields with labels and validation
- `SearchableSelectComponent` for dropdowns with search
- `DateRangePickerComponent` for date ranges
- `TimeRangeInputComponent` for time ranges

### Modal Standards
- Use `ModalWrapperComponent` for all custom modals
- Use `ConfirmationModalComponent` for confirmation dialogs (via `ConfirmationService`)

### Badge and Status Display Rules
- **NEVER** use inline `<span class="badge">` - always use `StatusBadgeComponent`
- **NEVER** create manual badge HTML - use shared components
- **NEVER** use manual dt/dd lists - always use `DefinitionListComponent`
- For DataTable columns, use HTML injection pattern (documented exception)

**❌ Bad - Don't do this**:
```html
<span [class]="getStatusBadgeClass(entity.isActive)">
  {{ getStatusText(entity.isActive) }}
</span>

<dl class="row">
  <dt class="col-sm-4">Name</dt>
  <dd class="col-sm-8">{{ entity.name }}</dd>
</dl>
```

**✅ Good - Do this**:
```html
<app-status-badge
  [status]="statusBadge().label"
  [variant]="statusBadge().variant">
</app-status-badge>

<app-definition-list
  [items]="basicInfoItems()"
  [labelWidth]="'4'"
  [valueWidth]="'8'">
</app-definition-list>
```

---

## Code Quality Standards

### TypeScript Standards
- Use signals for reactive state: `signal()`, `computed()`
- Use dependency injection with `inject()` function
- Maintain type safety - avoid `any` type when possible
- Use interfaces for complex objects

### Template Standards
- Use `@if` and `@for` syntax (Angular 17+)
- Use signal accessors with `()`
- Maintain consistent indentation
- Use i18n service for all user-facing text: `i18n.t('key')`

### Styling Standards
- Use Bootstrap 5 utility classes
- Follow established spacing patterns
- Maintain responsive design (mobile-first)
- Use CSS files for component-specific styles

---

## Documentation Requirements

### When Creating New Features
1. Follow patterns in `SHARED_COMPONENTS_QUICK_REFERENCE.md`
2. Reference `COMPONENT_REFACTORING_DOCUMENTATION.md` for best practices
3. Check `DOCUMENTATION_INDEX.md` for related documentation

### When Refactoring
1. Use computed properties for reactive data
2. Replace inline patterns with shared components
3. Maintain backward compatibility when possible
4. Test thoroughly after refactoring

---

## Testing Standards

### Before Committing Code
- [ ] Compile with no TypeScript errors
- [ ] All computed properties update correctly
- [ ] Shared components render properly
- [ ] i18n translations work correctly
- [ ] No visual regressions
- [ ] Responsive behavior maintained
- [ ] Loading states work correctly
- [ ] Error handling works correctly

### Build Verification
- Run `ng build` to verify production build
- Check bundle sizes haven't increased significantly
- Verify no console errors in development mode

---

## Reference Documentation

### Essential Reading
- **Quick Reference**: `SHARED_COMPONENTS_QUICK_REFERENCE.md` - Component usage guide
- **Refactoring Guide**: `COMPONENT_REFACTORING_DOCUMENTATION.md` - Patterns and best practices
- **Documentation Index**: `DOCUMENTATION_INDEX.md` - Master index of all docs

### Component Documentation
All shared components are documented in `SHARED_COMPONENTS_QUICK_REFERENCE.md` with:
- Usage examples
- Input/Output parameters
- TypeScript patterns
- HTML examples
- Common use cases

### Architecture Documentation
- `PROJECT_ARCHITECTURE.md` - System architecture overview
- `COMPONENT_EXTRACTION_PLAN.md` - Component strategy and rationale
- `API_DOCUMENTATION.md` - Backend API reference

---

## Common Patterns

### Creating a New View Page
1. Import required components: `StatusBadgeComponent`, `DefinitionListComponent`, `BadgeListComponent`
2. Create signal for entity: `entity = signal<Entity | null>(null)`
3. Create computed properties for badges: `statusBadge = computed(() => ({ ... }))`
4. Create computed properties for definition lists: `basicInfoItems = computed(() => [...])`
5. Use components in template instead of inline HTML

### Creating a New List Page
1. Import: `DataTableComponent`, `TableActionsComponent`, `EmptyStateComponent`
2. Define table columns with `TableColumn[]` interface
3. Define table actions with `TableActionItem[]` interface
4. Handle pagination, sorting, and filtering
5. Use `EmptyStateComponent` for no data states

### Creating a New Form
1. Import form components: `FormHeaderComponent`, `FormSectionComponent`, `FormGroupComponent`
2. Use `ReactiveFormsModule` for form handling
3. Group related fields in `FormSectionComponent`
4. Use `FormGroupComponent` for each field with validation
5. Use appropriate input components (`SearchableSelectComponent`, `DateRangePickerComponent`, etc.)

---

## Important Notes

### Component Usage is Mandatory
- Using shared components is **not optional** - it's required for consistency
- All new features must follow established patterns
- Refactor existing code to use shared components when modifying it

### Performance Considerations
- Shared components are optimized and tested
- Using them ensures consistent performance
- Computed properties are efficient with Angular signals

### Maintenance Benefits
- Centralized component logic reduces bugs
- Consistent UI patterns improve UX
- Easier to update styling across the application
- Reduced code duplication

---

## Getting Help

### Can't Find a Component?
- Check `SHARED_COMPONENTS_QUICK_REFERENCE.md` for complete catalog
- Search the `shared/components` directory
- Ask team members for guidance

### Unsure About a Pattern?
- Review `COMPONENT_REFACTORING_DOCUMENTATION.md` for examples
- Look at recently refactored components (view-user, view-vacation-type, edit-attendance)
- Check `DOCUMENTATION_INDEX.md` for related documentation

### Need to Create New Shared Component?
- Review `COMPONENT_EXTRACTION_PLAN.md` for component design principles
- Follow established component structure (separate ts/html/css files)
- Document the new component in `SHARED_COMPONENTS_QUICK_REFERENCE.md`

---

## Employee Self-Service Portal (Separate Application)

### Overview
The Time Attendance System includes a **separate Angular application** specifically designed for employee self-service. This is a standalone frontend application that runs independently from the admin portal.

**Application Location**: `time-attendance-selfservice-frontend/`

### Key Differences from Admin Portal

| Aspect | Admin Portal | Self-Service Portal |
|--------|--------------|---------------------|
| **Location** | `time-attendance-frontend/` | `time-attendance-selfservice-frontend/` |
| **Port** | http://localhost:4200 | http://localhost:4201 |
| **Target Users** | HR, Managers, Administrators | Employees, Managers |
| **Access Level** | Full system access (based on roles) | Limited to personal data and team data (for managers) |
| **Features** | Full CRUD operations, system config | Self-service requests, view-only data |

### Self-Service Portal Features

#### For All Employees
1. **Dashboard**
   - Personal attendance statistics
   - Leave balance summary
   - Recent activity timeline
   - Upcoming vacations
   - Pending requests status

2. **My Attendance**
   - View personal attendance records
   - Attendance history with filters
   - Monthly attendance calendar
   - Attendance details (check-in/out times, working hours, overtime)

3. **My Profile**
   - View personal information
   - View job details
   - View contact information
   - View department and branch assignment

4. **Leave Requests** (Vacation Management)
   - Create new vacation requests
   - View current leave balance
   - View vacation request history
   - Edit pending vacation requests
   - Cancel approved vacation requests (with validation)
   - Track approval status

5. **Excuse Requests**
   - Create excuse requests
   - Upload supporting documents
   - View excuse request history
   - Edit pending excuse requests
   - Track approval status
   - View remaining excuse balance

6. **Remote Work Requests**
   - Request remote work days
   - Select work location (Remote, Field Work, Client Site)
   - View remote work request history
   - Edit pending requests
   - Cancel requests
   - Track approval status

7. **Fingerprint Requests**
   - Request fingerprint enrollment
   - Request fingerprint updates/repairs
   - Track request status
   - Specify preferred date/time
   - View technician notes

#### For Managers (Additional Features)
8. **Manager Dashboard**
   - Team size and statistics
   - Direct reports count
   - Indirect reports count
   - Team members list
   - Pending approvals count

9. **Team Management**
   - View team members
   - View team hierarchy
   - View team attendance overview

10. **Approvals**
    - Approve/reject vacation requests
    - Approve/reject excuse requests
    - Approve/reject remote work requests
    - Add comments to approvals
    - View approval history
    - View pending team requests

### Self-Service Portal Architecture

#### Project Structure
```
time-attendance-selfservice-frontend/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   ├── portal/
│   │   │   │   ├── employee-dashboard/
│   │   │   │   ├── manager-dashboard/
│   │   │   │   ├── my-attendance/
│   │   │   │   ├── my-profile/
│   │   │   │   ├── vacation-requests/
│   │   │   │   ├── excuse-requests/
│   │   │   │   ├── remote-work-requests/
│   │   │   │   ├── fingerprint-requests/
│   │   │   │   ├── team-members/
│   │   │   │   └── approvals/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   └── app.config.ts
│   └── assets/
└── package.json
```

#### Key Components
- **Portal Components**: Located in `src/app/features/portal/`
- **Shared Components**: Reusable UI components
- **Services**: API communication services
- **Guards**: Route guards for authentication and role-based access
- **Interceptors**: HTTP interceptors for token management

### Development Guidelines for Self-Service Portal

#### Authentication & Authorization
```typescript
// Employee can only access their own data
// Managers can access their team's data
// Use employee-specific guards

// Example: employee-auth.guard.ts
export const employeeAuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isEmployee()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

// Example: manager-auth.guard.ts
export const managerAuthGuard = () => {
  const authService = inject(AuthService);

  return authService.isAuthenticated() && authService.isManager();
};
```

#### Data Access Patterns
```typescript
// Always fetch current employee's data
async loadMyData() {
  this.myAttendance = await this.portalService.getMyAttendance();
  this.myBalance = await this.portalService.getMyLeaveBalance();
}

// For managers: fetch team data
async loadTeamData() {
  if (this.isManager()) {
    this.teamMembers = await this.portalService.getMyTeam();
    this.pendingApprovals = await this.portalService.getPendingApprovals();
  }
}
```

#### Request Validation
```typescript
// Always validate before submitting requests
async submitVacationRequest(request: VacationRequest) {
  // 1. Validate dates
  if (request.startDate > request.endDate) {
    this.notificationService.error('Invalid date range');
    return;
  }

  // 2. Check balance
  const balance = await this.portalService.getLeaveBalance(request.vacationTypeId);
  if (balance < request.totalDays) {
    this.notificationService.error('Insufficient leave balance');
    return;
  }

  // 3. Submit request
  await this.portalService.createVacationRequest(request);
  this.notificationService.success('Request submitted successfully');
}
```

#### Manager Approval Pattern
```typescript
// Manager approval workflow
async approveRequest(requestId: number, requestType: string) {
  const confirmed = await this.confirmationService.confirm({
    title: 'Approve Request',
    message: 'Are you sure you want to approve this request?',
    confirmText: 'Approve',
    cancelText: 'Cancel'
  });

  if (confirmed) {
    await this.portalService.approveRequest(requestId, requestType);
    this.notificationService.success('Request approved');
    this.refreshPendingApprovals();
  }
}
```

### API Endpoints for Self-Service

The self-service portal communicates with the backend through dedicated endpoints:

#### Employee Endpoints
- `GET /api/portal/employee-dashboard` - Get employee dashboard data
- `GET /api/portal/my-attendance` - Get personal attendance records
- `GET /api/portal/my-profile` - Get employee profile
- `PUT /api/portal/my-profile` - Update employee profile
- `GET /api/portal/leave-balance` - Get leave balance

#### Manager Endpoints
- `GET /api/portal/manager-dashboard` - Get manager dashboard data
- `GET /api/portal/my-team` - Get team members
- `GET /api/portal/pending-approvals` - Get pending approvals
- `POST /api/portal/approve-request` - Approve a request
- `POST /api/portal/reject-request` - Reject a request

#### Request Management Endpoints
- `GET /api/employee-vacations/my-requests` - Get my vacation requests
- `POST /api/employee-vacations` - Create vacation request
- `PUT /api/employee-vacations/{id}` - Update vacation request
- `DELETE /api/employee-vacations/{id}` - Cancel vacation request

- `GET /api/employee-excuses/my-requests` - Get my excuse requests
- `POST /api/employee-excuses` - Create excuse request

- `GET /api/remote-work-requests/my-requests` - Get my remote work requests
- `POST /api/remote-work-requests` - Create remote work request

- `GET /api/fingerprint-requests/my-requests` - Get my fingerprint requests
- `POST /api/fingerprint-requests` - Create fingerprint request

### Running the Self-Service Portal

#### Development
```bash
# Navigate to self-service frontend
cd time-attendance-selfservice-frontend

# Install dependencies
npm install

# Run development server (configure port in angular.json)
npm start

# The app will run on configured port (NOT 4200, which is used by admin portal)
```

#### Production Build
```bash
# Build for production
npm run build

# Output will be in dist/ folder
# Deploy to separate domain/subdomain (e.g., portal.company.com)
```

### Deployment Considerations

#### Separate Deployment
- Deploy on a different domain or subdomain from admin portal
- Example: `admin.company.com` vs `portal.company.com`
- Or: `company.com/admin` vs `company.com/portal`

#### Configuration
- Configure separate environment files
- Set API base URL to point to backend
- Configure authentication settings
- Set up proper CORS on backend for self-service origin

#### Security
- Implement proper authentication guards
- Validate employee access to data
- Restrict manager access to only their team
- Implement request throttling
- Validate all inputs before submission

### Best Practices for Self-Service Development

1. **Always Restrict Data Access**
   - Employees should only see their own data
   - Managers should only see their direct/indirect reports
   - Validate access on both frontend and backend

2. **Provide Clear Feedback**
   - Show balance before allowing requests
   - Display clear validation messages
   - Show request status prominently
   - Provide loading states for all operations

3. **Mobile-Friendly Design**
   - Self-service portal is often accessed from mobile devices
   - Ensure responsive design
   - Test on various screen sizes
   - Consider mobile-specific UX patterns

4. **Real-Time Updates**
   - Refresh dashboard data automatically
   - Show real-time approval status
   - Update balances after requests
   - Notify users of approval/rejection

5. **Offline Considerations**
   - Handle network failures gracefully
   - Show appropriate error messages
   - Allow retry for failed operations
   - Cache non-sensitive data when appropriate

---

## Feature-Specific Development Guidelines

### Attendance Features
When working with attendance:
- Always recalculate working hours after any modification
- Consider shift periods and break times in calculations
- Validate against core hours compliance
- Check for overlapping transactions
- Ensure proper status updates (Present, Absent, Late, etc.)
- Apply grace periods before marking as late
- Calculate both regular and premium overtime
- Track manual overrides separately from automated calculations

### Leave Management Features
When working with leave/vacation features:
- Always validate leave balance before approval
- Update leave transactions for all balance changes
- Handle leave accruals based on accrual policies
- Consider carryover rules and expiry dates
- Support both paid and unpaid leave types
- Integrate with approval workflows
- Update attendance records when leave is approved
- Calculate business days vs. calendar days correctly

### Shift Assignment Features
When working with shift assignments:
- Respect assignment priority for overlapping assignments
- Support effective date ranges (from/to dates)
- Handle shift changes with proper history tracking
- Validate shift periods don't overlap
- Apply correct shift based on priority and date
- Support temporary vs. permanent assignments
- Allow assignments at employee, department, or branch level

### Approval Workflow Features
When implementing approval workflows:
- Support multiple approval steps
- Handle different approver types (Role, User, Manager, etc.)
- Implement timeout and escalation logic
- Support approval delegation
- Track approval history and comments
- Send notifications at each step
- Handle workflow cancellation
- Support both parallel and sequential approvals

### Self-Service Portal Features
When adding self-service features:
- Ensure proper authentication and authorization
- Restrict data to current employee only
- Support manager access to team data
- Implement proper request validation
- Integrate with approval workflows
- Provide real-time status updates
- Show balance information before requests
- Allow request cancellation with proper validation

### Reporting Features
When creating reports:
- Support flexible date range filtering
- Allow filtering by branch, department, employee
- Implement pagination for large datasets
- Provide CSV export functionality
- Calculate statistics and summaries
- Consider performance for large data sets
- Cache report results when appropriate
- Show loading states during generation

---

## Backend Architecture Guidelines

### Clean Architecture Layers

1. **Domain Layer** (`TimeAttendanceSystem.Domain`)
   - Entities with business logic
   - Enums for constants
   - Domain events (if applicable)
   - No dependencies on other layers
   - Contains: Employee, Attendance, Shift, Vacation, etc.

2. **Application Layer** (`TimeAttendanceSystem.Application`)
   - DTOs (Request/Response models)
   - Service interfaces and implementations
   - Business logic and validations
   - Mapping configurations (AutoMapper profiles)
   - Depends only on Domain layer

3. **Infrastructure Layer** (`TimeAttendanceSystem.Infrastructure`)
   - Database context (EF Core)
   - Repository implementations
   - External service integrations
   - Background job implementations (Coravel)
   - Depends on Domain and Application layers

4. **API Layer** (`TimeAttendanceSystem.Api`)
   - Controllers for HTTP endpoints
   - Authentication/authorization middleware
   - Swagger/API documentation
   - Depends on all other layers

### Common Backend Patterns

#### Repository Pattern
```csharp
// Use the generic repository for basic operations
var employee = await _employeeRepository.GetByIdAsync(id);
await _employeeRepository.AddAsync(newEmployee);
await _employeeRepository.UpdateAsync(employee);
await _employeeRepository.DeleteAsync(employee);

// Use specific repository methods for complex queries
var activeEmployees = await _employeeRepository.GetActiveEmployeesByBranchAsync(branchId);
```

#### Service Pattern
```csharp
// Services handle business logic
public class AttendanceService
{
    public async Task<AttendanceDto> CalculateAttendanceAsync(int employeeId, DateTime date)
    {
        // 1. Get shift assignment
        // 2. Get transactions for the day
        // 3. Calculate working hours
        // 4. Calculate overtime
        // 5. Determine attendance status
        // 6. Return DTO
    }
}
```

#### DTO Pattern
```csharp
// Request DTOs for incoming data
public class CreateEmployeeRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // ... validation attributes
}

// Response DTOs for outgoing data
public class EmployeeDto
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string DepartmentName { get; set; }
    // ... mapped from entity
}
```

---

## Security Guidelines

### Authentication & Authorization
- Always use JWT tokens for API authentication
- Implement token refresh mechanism
- Support 2FA for sensitive accounts
- Track login attempts and implement lockout
- Use role-based and permission-based authorization
- Implement branch-scoped data access

### Data Security
- Hash passwords using strong algorithms
- Store password history to prevent reuse
- Blacklist revoked tokens
- Audit all data modifications
- Implement proper data validation
- Sanitize user inputs
- Use parameterized queries (EF Core does this)

### API Security
- Validate all inputs
- Implement rate limiting
- Use HTTPS in production
- Set proper CORS policies
- Implement request/response logging
- Handle errors without exposing sensitive info

---

## Performance Guidelines

### Backend Performance
- Use async/await for all I/O operations
- Implement pagination for list endpoints
- Use eager loading for related entities when needed
- Avoid N+1 query problems
- Cache frequently accessed data
- Use background jobs for long-running tasks
- Optimize database indexes

### Frontend Performance
- Use lazy loading for routes
- Implement virtual scrolling for long lists
- Use OnPush change detection strategy
- Unsubscribe from observables
- Use trackBy functions in *ngFor loops
- Optimize bundle size
- Use Angular signals for reactive state

### Database Performance
- Create appropriate indexes
- Avoid loading unnecessary columns
- Use projection (Select) when possible
- Batch operations when appropriate
- Monitor query performance
- Use connection pooling

---

## Testing Guidelines

### Backend Testing
- Write unit tests for business logic
- Test validation logic thoroughly
- Test authorization rules
- Test error handling
- Mock external dependencies
- Test background jobs
- Use in-memory database for integration tests

### Frontend Testing
- Test component initialization
- Test user interactions
- Test form validations
- Test service calls
- Test error handling
- Test routing and navigation
- Use TestBed for Angular tests

### Manual Testing Checklist
- [ ] Test on different browsers
- [ ] Test on different screen sizes
- [ ] Test with different user roles
- [ ] Test with different branches
- [ ] Test Arabic RTL layout
- [ ] Test form validations
- [ ] Test error scenarios
- [ ] Test loading states
- [ ] Test permission restrictions
- [ ] Test data filtering and pagination

---

## Deployment Guidelines

### Development Environment
- Backend: http://localhost:5099
- Admin Frontend: http://localhost:4200
- Self-Service Frontend: http://localhost:4201
- Database: SQL Server (local or container)
- Use Coravel for background jobs
- **See "Running the Complete System" section for detailed startup instructions**

### Production Considerations
- Use environment-specific configurations
- Configure HTTPS and SSL certificates
- Set up proper database backups
- Configure logging and monitoring
- Set up error tracking
- Use production-optimized builds
- Configure CDN for static assets
- Set up database migrations pipeline
- Configure branch-specific settings
- Review and set CORS policies

---

## Documentation Standards

### Code Documentation
- Document complex business logic
- Add XML comments for public APIs
- Document configuration options
- Document background jobs
- Keep README files updated
- Document API endpoints (Swagger)

### Feature Documentation
When adding a new feature:
1. Update this CLAUDE.md if it's a new module
2. Document API endpoints in backend docs
3. Document components in frontend docs
4. Add examples to shared component docs
5. Update test documentation
6. Document any new configuration options

---

## Troubleshooting Guide

### Common Issues

#### Backend Issues
- **Database connection errors**: Check connection string, ensure SQL Server is running
- **Migration errors**: Drop database and recreate (dev only), or fix migration conflicts
- **Authentication errors**: Check JWT secret, token expiration, user permissions
- **Background job failures**: Check Coravel configuration, review job logs

#### Frontend Issues
- **Compilation errors**: Clear node_modules and reinstall, check TypeScript version
- **API call failures**: Check backend is running, verify CORS settings, check network tab
- **Routing issues**: Verify route configuration, check authentication guards
- **Translation errors**: Ensure translation keys exist in both languages

#### Common Mistakes to Avoid
- ❌ Forgetting to validate leave balances before approval
- ❌ Not recalculating attendance after shift changes
- ❌ Missing branch scope in data queries
- ❌ Not handling Arabic RTL layout
- ❌ Using inline styles instead of shared components
- ❌ Forgetting to update audit logs
- ❌ Not implementing proper error handling
- ❌ Missing pagination on large datasets
- ❌ Not testing with different user roles

---

## Sample Data Management Tools

The project includes .NET console tools for managing sample data without requiring `psql` or `sqlcmd` to be installed.

### Tools Overview

#### 1. Sample Data Loader (`tools/RunSampleData.csproj`)
**Purpose**: Loads sample data into the database by executing the SQL script.

**Location**: `d:\Work\TimeAttendanceSystem\tools\RunSampleData.cs`

**Usage**:
```bash
cd tools
dotnet run --project RunSampleData.csproj
```

**What it does**:
- Reads `scripts/sample-data-with-users.sql`
- Connects to PostgreSQL database
- Executes the SQL script
- Creates 5 branches, 20 departments, 50 employees with user accounts

**Output**:
```
Reading SQL file...
Connecting to database...
Executing SQL script...
✅ Sample data inserted successfully!
Created: 5 Branches, 20 Departments, 50 Employees with User Accounts
Default password for all employees: Emp@123!
```

#### 2. Sample Data Verifier (`tools/verify/`)
**Purpose**: Verifies that sample data was loaded correctly.

**Location**: `d:\Work\TimeAttendanceSystem\tools\verify\Program.cs`

**Usage**:
```bash
cd tools/verify
dotnet run
```

**What it does**:
- Connects to the database
- Counts branches (should be 5)
- Counts departments (should be 20)
- Counts employees (should be 50)
- Counts users (should be 50)
- Displays a sample employee with credentials

**Output**:
```
✅ Branches: 5/5
✅ Departments: 20/20
✅ Employees: 50/50
✅ Users: 50/50

📋 Sample Branch Manager:
   Name: Ahmed Al-Rashid
   Email: ahmed.rashid@company.com
   Username: ahmed.rashid
   Password: Emp@123! (must change on first login)

✅ All sample data verified successfully!
```

### Configuration

Both tools use the same connection string from `appsettings.json`:

```csharp
string connectionString = "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";
```

**Important**: Update the connection string in both tools if your database credentials differ.

### When to Use These Tools

#### Use RunSampleData when:
- Setting up the development environment for the first time
- You don't have `psql` or `sqlcmd` installed
- You want a cross-platform solution
- You've dropped and recreated the database

#### Use VerifySampleData when:
- Confirming sample data was loaded successfully
- Troubleshooting login issues
- Checking employee account credentials
- Verifying database population after restore

### Sample Data Structure

After running the sample data loader, the database will contain:

**5 Branches (IDs: 101-105)**:
- Headquarters - Riyadh
- Jeddah Branch
- Dammam Branch
- Madinah Branch
- Makkah Branch

**20 Departments (IDs: 101-120)**:
- 4 departments per branch: HR, IT, Finance, Operations

**50 Employees (IDs: 1001-1050)**:
- 1 Branch Manager per branch (IDs: 1001, 1011, 1021, 1031, 1041)
- 4 Department Managers per branch (one for each department)
- 5 Regular Employees per branch

**User Accounts**:
- Username: Email prefix (e.g., `ahmed.rashid` for ahmed.rashid@company.com)
- Password: `Emp@123!` (all users must change on first login)
- MustChangePassword flag: `true`

### Troubleshooting Tools

#### RunSampleData Issues:
- **SQL file not found**: Ensure you run from `tools/` directory and `scripts/sample-data-with-users.sql` exists
- **Connection failed**: Check PostgreSQL is running and credentials in the code
- **Timeout**: Increase `CommandTimeout` value (default: 120 seconds)
- **Duplicate key errors**: Sample data already exists, drop and recreate database first

#### VerifySampleData Issues:
- **Connection failed**: Check PostgreSQL is running
- **Count mismatch**: Sample data may not have loaded completely, check for errors
- **No employee found**: Database may not have sample data, run RunSampleData first

### Project Structure

```
tools/
├── RunSampleData.cs          # Main loader script
├── RunSampleData.csproj      # Project file for loader
└── verify/
    ├── Program.cs            # Verification script
    └── Verify.csproj         # Project file for verifier
```

**Note**: Both tools are separate from the main application and can be run independently. They use Npgsql 9.0.2 for PostgreSQL connectivity.

---

## Quick Reference

### Essential Commands

#### Backend
```bash
# Run backend
cd src/Api/TimeAttendanceSystem.Api
dotnet run

# Load sample data (first time only, after database creation)
# Option 1: Using .NET tool (recommended - works without psql/sqlcmd installed)
cd tools
dotnet run --project RunSampleData.csproj

# Option 2: Using PostgreSQL command line
psql -U your_username -d TimeAttendanceDb -f scripts/sample-data-with-users.sql

# Option 3: Using SQL Server command line
sqlcmd -S localhost -d TimeAttendanceDb -i scripts/sample-data-with-users.sql

# Verify sample data was loaded correctly
cd tools/verify
dotnet run

# Create migration
dotnet ef migrations add MigrationName --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api

# Update database
dotnet ef database update --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api

# Drop database (use with caution - will lose all data)
dotnet ef database drop --project src/Infrastructure/TimeAttendanceSystem.Infrastructure --startup-project src/Api/TimeAttendanceSystem.Api
```

#### Frontend (Admin)
```bash
# Run admin frontend
cd time-attendance-frontend
npm start

# Build for production
npm run build

# Run tests
npm test
```

#### Frontend (Self-Service)
```bash
# Run self-service portal
cd time-attendance-selfservice-frontend
npm start

# Build for production
npm run build
```

### Running the Complete System

To run and test the entire Time Attendance System, you need to start all three applications:

#### Prerequisites
- Ensure SQL Server is running
- Ensure Node.js and .NET SDK are installed
- First-time setup: Install npm dependencies for both frontends

#### Step-by-Step Startup

**1. Start the Backend API** (Terminal 1)
```bash
cd src/Api/TimeAttendanceSystem.Api
dotnet run
```
- Backend will run on: **http://localhost:5099**
- Wait for "Application started" message
- Database will be created automatically on first run with essential seed data (systemadmin user, default shift, roles, permissions)

**1a. Load Sample Data** (First Time Only - After Backend Starts)
```bash
# Open a new terminal and navigate to project root

# Option 1: Using .NET tool (recommended - works without psql/sqlcmd installed)
cd tools
dotnet run --project RunSampleData.csproj

# Option 2: Using PostgreSQL command line
# psql -U your_username -d TimeAttendanceDb -f scripts/sample-data-with-users.sql

# Option 3: Using SQL Server command line
# sqlcmd -S localhost -d TimeAttendanceDb -i scripts/sample-data-with-users.sql

# Verify the data was loaded successfully
cd tools/verify
dotnet run
```
- This creates 50 employee accounts with user credentials
- Default password for all employees: `Emp@123!` (must change on first login)
- Includes branch managers, department managers, and regular employees
- **Note**: Only run this once after initial database creation
- **See "Sample Data Management Tools" section for detailed documentation**

**2. Start the Admin Frontend** (Terminal 2)
```bash
cd time-attendance-frontend
npm start
```
- Admin portal will run on: **http://localhost:4200**
- Wait for "Application bundle generation complete"
- Access at: [http://localhost:4200](http://localhost:4200)

**3. Start the Self-Service Portal** (Terminal 3)
```bash
cd time-attendance-selfservice-frontend

# First time only: Install dependencies
npm install

# Start the application
npm start
```
- Self-service portal will run on: **http://localhost:4201**
- Wait for "Application bundle generation complete"
- Access at: [http://localhost:4201](http://localhost:4201)

#### Running Applications Summary

| Application | URL | Port | Purpose |
|-------------|-----|------|---------|
| **Backend API** | http://localhost:5099 | 5099 | RESTful API, Authentication, Business Logic |
| **Admin Portal** | http://localhost:4200 | 4200 | Full system management for HR/Admins |
| **Self-Service Portal** | http://localhost:4201 | 4201 | Employee self-service and manager approvals |

#### Default Login Credentials

**System Administrator:**
- **Username**: `systemadmin`
- **Password**: Check the seeder class in `Infrastructure/Data/ApplicationDbContextSeed.cs`

**Sample Employee Accounts** (after running sample data script):
- **Username**: Email prefix (e.g., `ahmed.rashid` for ahmed.rashid@company.com)
- **Password**: `Emp@123!` (all users must change password on first login)
- **Examples**:
  - Branch Manager: `ahmed.rashid` / `Emp@123!` (Employee ID: 1001)
  - Department Manager: `sara.fahad` / `Emp@123!` (Employee ID: 1006)
  - Regular Employee: `salma.khaldi` / `Emp@123!` (Employee ID: 1026)
- **Total**: 50 employees across 5 branches and 20 departments

#### Quick Testing Checklist
Once all three applications are running:
- [ ] Backend: Visit http://localhost:5099/swagger to see API documentation
- [ ] Admin Portal: Log in at http://localhost:4200 with systemadmin credentials
- [ ] Self-Service Portal: Log in at http://localhost:4201 with employee credentials (e.g., `salma.khaldi` / `Emp@123!`)
- [ ] Change password on first login (required for all sample employee accounts)
- [ ] Verify API calls work (check browser console)
- [ ] Test employee features: Create a vacation request in self-service portal
- [ ] Test manager features: Log in as department manager (e.g., `sara.fahad`) and approve requests
- [ ] Test hierarchy: Verify managers can see their team members and pending approvals

#### Troubleshooting Startup Issues
- **Backend won't start**: Check SQL Server connection, review appsettings.json
- **Frontend compilation errors**: Delete node_modules and run `npm install` again
- **Port conflicts**: Check if ports 4200, 4201, or 5099 are already in use
- **API connection errors**: Verify backend is running and CORS is configured correctly
- **Self-Service shows different port**: Port is configured in `angular.json` under `serve.options.port`
- **No employees to test with**: Make sure you ran the sample data script `scripts/sample-data-with-users.sql` after first run
- **Can't login with employee account**: Verify you're using the correct username format (email prefix) and default password `Emp@123!`

### Key File Locations

#### Backend
- Controllers: `src/Api/TimeAttendanceSystem.Api/Controllers/`
- Services: `src/Application/TimeAttendanceSystem.Application/Services/`
- Entities: `src/Domain/TimeAttendanceSystem.Domain/Entities/`
- Repositories: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Repositories/`
- DTOs: `src/Application/TimeAttendanceSystem.Application/DTOs/`
- Background Jobs: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/`

#### Frontend (Admin)
- Components: `time-attendance-frontend/src/app/features/`
- Shared Components: `time-attendance-frontend/src/app/shared/components/`
- Services: `time-attendance-frontend/src/app/core/services/`
- Models: `time-attendance-frontend/src/app/shared/models/`
- Guards: `time-attendance-frontend/src/app/core/guards/`

#### Frontend (Self-Service)
- Components: `time-attendance-selfservice-frontend/src/app/features/`
- Portal Components: `time-attendance-selfservice-frontend/src/app/features/portal/`
- Shared: `time-attendance-selfservice-frontend/src/app/shared/`

---

## Related Documentation

### Backend Documentation
- [Backend Index](docs/backend/00-INDEX.md) - Complete backend documentation index
- [Quick Reference](docs/backend/01-QUICK-REFERENCE.md) - Backend quick reference guide
- [Domain Layer](docs/backend/02-DOMAIN-LAYER.md) - Domain entities documentation
- [Application Layer](docs/backend/03-APPLICATION-LAYER.md) - Services and DTOs
- [Infrastructure Layer](docs/backend/04-INFRASTRUCTURE-LAYER.md) - Data access and infrastructure
- [API Layer](docs/backend/05-API-LAYER.md) - Controllers and endpoints

### Frontend Documentation
- [Core Architecture](docs/frontend/02-CORE-ARCHITECTURE.md) - Frontend architecture guide
- Shared Components Quick Reference - Component usage guide
- Component Refactoring Documentation - Patterns and best practices

### Business Rules
- [Overtime Business Rules](OVERTIME_BUSINESS_RULES.md) - Overtime calculation rules
- [Workflow Integration Plan](WORKFLOW_INTEGRATION_PLAN.md) - Approval workflow guide

### Deployment
- [Ubuntu Deployment Guide](UBUNTU_DEPLOYMENT_GUIDE.md) - Linux deployment instructions

### Testing
- [Test Cases Index](TestCases/00_TEST_CASES_INDEX.md) - Master test cases index
- [Test Data Setup](TestCases/TEST_DATA_SETUP_GUIDE.md) - Test data guide

---

**Last Updated**: December 30, 2025
**Version**: 3.0 - Comprehensive system features and development guidelines