# Phase 2: Employee Dashboard Frontend - Kickoff Guide

**Project**: Employee Self-Service Portal
**Phase**: 2 - Employee Dashboard Frontend
**Status**: Ready to Begin
**Prerequisites**: ✅ Phase 1 Complete
**Estimated Duration**: 4-6 hours

---

## Overview

Phase 2 focuses on building the frontend Angular components for the employee self-service dashboard. This phase will create the user interface that connects to the backend APIs built in Phase 1.

---

## Objectives

### Primary Goals:
1. ✅ Create portal routing structure
2. ✅ Implement employee dashboard component
3. ✅ Create portal service with Angular signals
4. ✅ Integrate with backend API endpoints
5. ✅ Create reusable shared components
6. ✅ Follow established Angular 17+ patterns

### Success Criteria:
- Employee can view their dashboard with real data
- Dashboard displays attendance stats, vacation balance, and activity
- All data loads from backend API
- Component uses signals for reactive state
- Follows project coding standards (CLAUDE.md)
- Uses shared components from SHARED_COMPONENTS_QUICK_REFERENCE.md

---

## Prerequisites Check

### Backend (Phase 1):
- ✅ Backend API running on http://localhost:5099
- ✅ Database migration applied
- ✅ API endpoints tested and working
- ✅ Swagger documentation available

### Frontend Setup:
- ⏳ Angular 17+ application running on http://localhost:4200
- ⏳ Authentication service available
- ⏳ HTTP interceptors configured
- ⏳ Shared components library available

### Required Knowledge:
- Angular 17+ standalone components
- Signals for reactive state management
- HttpClient for API calls
- Angular routing
- Bootstrap 5 for styling

---

## Architecture Overview

### Frontend Structure:
```
src/app/pages/portal/
├── employee-dashboard/
│   ├── employee-dashboard.component.ts
│   ├── employee-dashboard.component.html
│   └── employee-dashboard.component.css
├── services/
│   └── portal.service.ts
└── models/
    ├── employee-dashboard.model.ts
    └── activity.model.ts
```

### Data Flow:
```
Component → Service → HTTP → Backend API → Response → Signal → Template
```

---

## Implementation Plan

### Step 1: Create Portal Service (30 min)

**File**: `src/app/pages/portal/services/portal.service.ts`

**Purpose**: Centralized service for all portal-related API calls with signal-based state management

**Key Features**:
- Signal-based state management
- HTTP client integration
- Error handling
- Loading states
- Type-safe API calls

**Pattern to Follow**:
```typescript
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private readonly apiUrl = 'http://localhost:5099/api/v1/portal';

  // Signals for state management
  private dashboardData = signal<EmployeeDashboardDto | null>(null);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);

  // Computed properties
  readonly dashboard = computed(() => this.dashboardData());
  readonly isLoading = computed(() => this.loading());
  readonly hasError = computed(() => this.error());

  constructor(private http: HttpClient) {}

  loadEmployeeDashboard(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Result<EmployeeDashboardDto>>(`${this.apiUrl}/employee-dashboard`)
      .pipe(
        tap(result => {
          if (result.isSuccess) {
            this.dashboardData.set(result.value);
          } else {
            this.error.set(result.error);
          }
          this.loading.set(false);
        }),
        catchError(error => {
          this.error.set('Failed to load dashboard data');
          this.loading.set(false);
          throw error;
        })
      )
      .subscribe();
  }
}
```

**Tasks**:
- [ ] Create portal service file
- [ ] Define signal-based state
- [ ] Implement loadEmployeeDashboard method
- [ ] Add error handling
- [ ] Add loading states
- [ ] Test with backend API

---

### Step 2: Create Data Models (15 min)

**Files**:
- `src/app/pages/portal/models/employee-dashboard.model.ts`
- `src/app/pages/portal/models/activity.model.ts`

**Purpose**: TypeScript interfaces matching backend DTOs

**Example**:
```typescript
export interface EmployeeDashboardDto {
  employeeId: number;
  employeeName: string;
  departmentName: string;
  branchName: string;
  attendanceRate: number;
  attendanceTrend: number;
  totalWorkingHours: number;
  overtimeHours: number;
  remainingVacationDays: number;
  usedVacationDays: number;
  pendingRequestsCount: number;
  recentActivity: ActivityDto[];
}

export interface ActivityDto {
  type: string;
  description: string;
  timestamp: string;
  icon: string;
  variant: string;
}

export interface Result<T> {
  isSuccess: boolean;
  value: T;
  error: string;
}
```

**Tasks**:
- [ ] Create EmployeeDashboardDto interface
- [ ] Create ActivityDto interface
- [ ] Create Result<T> generic interface
- [ ] Export all interfaces

---

### Step 3: Add Portal Routes (15 min)

**File**: `src/app/app.routes.ts`

**Purpose**: Add routing for portal pages

**Pattern to Follow**:
```typescript
{
  path: 'portal',
  children: [
    {
      path: 'employee-dashboard',
      loadComponent: () =>
        import('./pages/portal/employee-dashboard/employee-dashboard.component')
          .then(m => m.EmployeeDashboardComponent),
      data: {
        title: 'My Dashboard',
        requiresAuth: true
      }
    }
  ]
}
```

**Tasks**:
- [ ] Add portal parent route
- [ ] Add employee-dashboard child route
- [ ] Configure lazy loading
- [ ] Set route data (title, auth)
- [ ] Test navigation

---

### Step 4: Create Employee Dashboard Component (90 min)

**Files**:
- `src/app/pages/portal/employee-dashboard/employee-dashboard.component.ts`
- `src/app/pages/portal/employee-dashboard/employee-dashboard.component.html`
- `src/app/pages/portal/employee-dashboard/employee-dashboard.component.css`

#### 4.1: Component TypeScript (45 min)

**Purpose**: Main dashboard logic with signals

**Key Features**:
- Signal-based reactive state
- Service integration
- Computed properties
- Lifecycle management

**Pattern to Follow**:
```typescript
import { Component, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalService } from '../services/portal.service';
import { StatsGridComponent } from '../../../shared/components/stats-grid/stats-grid.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsGridComponent,
    LoadingSpinnerComponent,
    // Add other shared components
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
  private portalService = inject(PortalService);

  // Expose service signals
  dashboard = this.portalService.dashboard;
  isLoading = this.portalService.isLoading;
  hasError = this.portalService.hasError;

  // Computed properties for dashboard stats
  statsCards = computed(() => {
    const data = this.dashboard();
    if (!data) return [];

    return [
      {
        title: 'Attendance Rate',
        value: `${data.attendanceRate}%`,
        trend: data.attendanceTrend,
        icon: 'fa-chart-line',
        variant: 'primary'
      },
      {
        title: 'Working Hours',
        value: `${data.totalWorkingHours}h`,
        subtitle: `+${data.overtimeHours}h overtime`,
        icon: 'fa-clock',
        variant: 'success'
      },
      {
        title: 'Vacation Days',
        value: data.remainingVacationDays.toString(),
        subtitle: `${data.usedVacationDays} used`,
        icon: 'fa-umbrella-beach',
        variant: 'info'
      },
      {
        title: 'Pending Requests',
        value: data.pendingRequestsCount.toString(),
        icon: 'fa-tasks',
        variant: 'warning'
      }
    ];
  });

  ngOnInit(): void {
    this.portalService.loadEmployeeDashboard();
  }
}
```

**Tasks**:
- [ ] Create component file
- [ ] Import required dependencies
- [ ] Inject portal service
- [ ] Create computed properties for stats
- [ ] Implement ngOnInit
- [ ] Add error handling logic
- [ ] Test with backend API

#### 4.2: Component Template (45 min)

**Purpose**: Dashboard UI using shared components

**Required Shared Components** (from SHARED_COMPONENTS_QUICK_REFERENCE.md):
- `FormHeaderComponent` - Page header
- `StatsGridComponent` - Dashboard stats
- `LoadingSpinnerComponent` - Loading state
- `EmptyStateComponent` - Empty/error state
- `BadgeComponent` - Status badges
- Activity feed component (to be created)

**Pattern to Follow**:
```html
<!-- Header -->
<app-form-header
  [title]="'My Dashboard'"
  [showBackButton]="false">
</app-form-header>

<!-- Loading State -->
@if (isLoading()) {
  <app-loading-spinner [message]="'Loading dashboard...'"></app-loading-spinner>
}

<!-- Error State -->
@else if (hasError()) {
  <app-empty-state
    [icon]="'fa-exclamation-circle'"
    [title]="'Failed to Load Dashboard'"
    [message]="hasError()"
    [variant]="'danger'">
  </app-empty-state>
}

<!-- Dashboard Content -->
@else if (dashboard()) {
  <div class="container-fluid py-4">
    <!-- Welcome Section -->
    <div class="row mb-4">
      <div class="col-12">
        <h4>Welcome back, {{ dashboard()?.employeeName }}!</h4>
        <p class="text-muted">
          {{ dashboard()?.departmentName }} • {{ dashboard()?.branchName }}
        </p>
      </div>
    </div>

    <!-- Stats Grid -->
    <app-stats-grid
      [stats]="statsCards()"
      [columns]="4">
    </app-stats-grid>

    <!-- Activity Timeline -->
    <div class="row mt-4">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Recent Activity</h5>
          </div>
          <div class="card-body">
            <!-- Activity feed component here -->
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">Quick Actions</h5>
          </div>
          <div class="card-body">
            <!-- Quick actions component here -->
          </div>
        </div>
      </div>
    </div>
  </div>
}
```

**Tasks**:
- [ ] Create HTML template
- [ ] Add header with FormHeaderComponent
- [ ] Add loading state with LoadingSpinnerComponent
- [ ] Add error state with EmptyStateComponent
- [ ] Add stats grid with StatsGridComponent
- [ ] Add activity section (placeholder)
- [ ] Add quick actions section (placeholder)
- [ ] Test responsive layout
- [ ] Verify all signals work correctly

---

### Step 5: Create Activity Feed Component (Optional - 30 min)

**File**: `src/app/shared/components/activity-feed/activity-feed.component.ts`

**Purpose**: Reusable component to display activity timeline

**Features**:
- Display list of activities
- Timeline-style layout
- Icon and variant support
- Responsive design

**Pattern to Follow**:
```typescript
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDto } from '../../../pages/portal/models/activity.model';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activity-feed">
      @for (activity of activities(); track activity.timestamp) {
        <div class="activity-item">
          <div class="activity-icon" [ngClass]="'bg-' + activity.variant">
            <i [class]="'fas ' + activity.icon"></i>
          </div>
          <div class="activity-content">
            <div class="activity-type">{{ activity.type }}</div>
            <div class="activity-description">{{ activity.description }}</div>
            <div class="activity-timestamp text-muted">
              {{ activity.timestamp | date:'short' }}
            </div>
          </div>
        </div>
      }

      @if (activities().length === 0) {
        <app-empty-state
          [icon]="'fa-inbox'"
          [title]="'No Recent Activity'"
          [message]="'Your recent activities will appear here'">
        </app-empty-state>
      }
    </div>
  `,
  styles: [`
    .activity-feed { /* styles */ }
    .activity-item { /* styles */ }
    .activity-icon { /* styles */ }
    .activity-content { /* styles */ }
  `]
})
export class ActivityFeedComponent {
  activities = input.required<ActivityDto[]>();
}
```

**Tasks**:
- [ ] Create component file
- [ ] Add input signal for activities
- [ ] Create timeline template
- [ ] Add CSS styling
- [ ] Handle empty state
- [ ] Add to employee dashboard

---

### Step 6: Create Quick Actions Component (Optional - 30 min)

**File**: `src/app/shared/components/quick-actions/quick-actions.component.ts`

**Purpose**: Quick links to common actions

**Features**:
- Action buttons with icons
- Navigation to different pages
- Badge for pending items

**Pattern to Follow**:
```typescript
import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="quick-actions">
      <a routerLink="/portal/my-attendance" class="action-item">
        <i class="fas fa-calendar-check"></i>
        <span>My Attendance</span>
      </a>

      <a routerLink="/portal/fingerprint-requests/new" class="action-item">
        <i class="fas fa-fingerprint"></i>
        <span>Request Fingerprint Update</span>
      </a>

      <a routerLink="/employee-vacations/create" class="action-item">
        <i class="fas fa-umbrella-beach"></i>
        <span>Request Vacation</span>
      </a>

      <a routerLink="/employee-excuses/create" class="action-item">
        <i class="fas fa-comment-medical"></i>
        <span>Submit Excuse</span>
      </a>

      <a routerLink="/portal/my-profile" class="action-item">
        <i class="fas fa-user-circle"></i>
        <span>My Profile</span>
      </a>
    </div>
  `,
  styles: [`
    .quick-actions { /* styles */ }
    .action-item { /* styles */ }
  `]
})
export class QuickActionsComponent {
  actionClicked = output<string>();
}
```

**Tasks**:
- [ ] Create component file
- [ ] Add action buttons
- [ ] Add routing links
- [ ] Add CSS styling
- [ ] Add to employee dashboard

---

### Step 7: Styling (30 min)

**File**: `src/app/pages/portal/employee-dashboard/employee-dashboard.component.css`

**Purpose**: Component-specific styles

**Key Styles**:
```css
:host {
  display: block;
}

.welcome-section {
  margin-bottom: 2rem;
}

.welcome-section h4 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stats-section {
  margin-bottom: 2rem;
}

.activity-section,
.quick-actions-section {
  margin-top: 1.5rem;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: none;
}

.card-header {
  background-color: #fff;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 1.5rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .welcome-section h4 {
    font-size: 1.25rem;
  }
}
```

**Tasks**:
- [ ] Add component styles
- [ ] Ensure responsive design
- [ ] Match existing app theme
- [ ] Test on mobile devices

---

### Step 8: Integration & Testing (45 min)

**Tasks**:
1. **Integration Testing**
   - [ ] Start backend server (http://localhost:5099)
   - [ ] Start frontend server (http://localhost:4200)
   - [ ] Navigate to employee dashboard
   - [ ] Verify data loads from API
   - [ ] Test loading states
   - [ ] Test error states
   - [ ] Test responsive layout

2. **Functionality Testing**
   - [ ] Verify all stats display correctly
   - [ ] Check attendance rate calculation
   - [ ] Verify vacation days display
   - [ ] Check activity timeline loads
   - [ ] Test quick actions navigation
   - [ ] Verify signals update reactively

3. **UI/UX Testing**
   - [ ] Check layout on desktop
   - [ ] Check layout on tablet
   - [ ] Check layout on mobile
   - [ ] Verify loading spinner shows
   - [ ] Verify error messages clear
   - [ ] Check accessibility (keyboard nav, screen readers)

4. **Performance Testing**
   - [ ] Check initial load time
   - [ ] Verify no unnecessary re-renders
   - [ ] Check network requests (should be 1)
   - [ ] Verify signals work efficiently

---

## Code Quality Checklist

Before marking Phase 2 complete, verify:

### Angular Standards:
- [ ] Uses standalone components
- [ ] Uses Angular 17+ signals
- [ ] Uses `@if` and `@for` syntax (not *ngIf/*ngFor)
- [ ] Proper dependency injection with `inject()`
- [ ] TypeScript strict mode compliance

### Project Standards (from CLAUDE.md):
- [ ] Split components into 3 files (ts, html, css)
- [ ] Uses shared components from library
- [ ] Follows signal-based state management
- [ ] Uses NotificationService for notifications
- [ ] Uses i18n service for translations
- [ ] No inline styles or scripts

### Shared Components Usage:
- [ ] Uses FormHeaderComponent for headers
- [ ] Uses StatsGridComponent for stats
- [ ] Uses LoadingSpinnerComponent for loading
- [ ] Uses EmptyStateComponent for empty states
- [ ] Uses BadgeComponent for badges
- [ ] No custom badge HTML

### API Integration:
- [ ] Service uses HttpClient
- [ ] Proper error handling
- [ ] Loading states managed
- [ ] Type-safe API calls
- [ ] Result<T> pattern handled

---

## Common Pitfalls to Avoid

1. **Don't use structural directives**: Use `@if/@for` instead of `*ngIf/*ngFor`
2. **Don't create inline badges**: Always use `StatusBadgeComponent`
3. **Don't use manual dt/dd lists**: Use `DefinitionListComponent`
4. **Don't forget signal accessors**: Use `signal()` not just `signal`
5. **Don't skip error handling**: Always handle HTTP errors
6. **Don't ignore loading states**: Show spinner during API calls
7. **Don't hardcode strings**: Use i18n service
8. **Don't create custom components**: Check shared library first

---

## Phase 2 Deliverables

By the end of Phase 2, you should have:

1. ✅ Portal service with signal-based state
2. ✅ Data models (interfaces)
3. ✅ Portal routes configured
4. ✅ Employee dashboard component (ts, html, css)
5. ✅ Activity feed component (optional)
6. ✅ Quick actions component (optional)
7. ✅ Fully functional dashboard page
8. ✅ Integration with backend API
9. ✅ Responsive design
10. ✅ Documentation updated

---

## Next Phase Preview

**Phase 3: My Attendance & Profile** will include:
- My attendance page with calendar view
- Attendance details and history
- My profile page with edit capability
- Password change functionality
- Profile photo upload

---

## Resources

### Documentation:
- [CLAUDE.md](CLAUDE.md) - Project coding standards
- [SHARED_COMPONENTS_QUICK_REFERENCE.md](SHARED_COMPONENTS_QUICK_REFERENCE.md) - Component library
- [API_TESTING_GUIDE.md](API_TESTING_GUIDE.md) - Backend API documentation
- [PHASE_1_COMPLETION_SUMMARY.md](PHASE_1_COMPLETION_SUMMARY.md) - Backend architecture

### Example Components to Reference:
- `src/app/pages/dashboard/dashboard.component.ts` - Existing dashboard pattern
- `src/app/pages/employee-vacations/employee-vacations.component.ts` - List page pattern
- `src/app/services/employee-vacations.service.ts` - Service pattern with signals

### Useful Commands:
```bash
# Start backend
cd src/Api/TimeAttendanceSystem.Api
dotnet run

# Start frontend
cd time-attendance-frontend
npm start

# Generate component
ng generate component pages/portal/employee-dashboard --standalone

# Generate service
ng generate service pages/portal/services/portal
```

---

**Ready to Begin Phase 2!** 🚀

Start with Step 1 (Portal Service) and work through each step systematically. Remember to test frequently and follow the project coding standards.

Good luck!
