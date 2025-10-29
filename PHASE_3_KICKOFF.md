# Phase 3: My Attendance & Profile Pages - Implementation Guide

**Project**: Employee Self-Service Portal
**Phase**: 3 - My Attendance & Profile Pages
**Status**: Ready to Start ⏳
**Estimated Duration**: 4-6 hours
**Prerequisites**: Phase 1 ✅ & Phase 2 ✅ Complete

---

## 📋 Phase 3 Overview

This phase implements two key employee self-service features:
1. **My Attendance Page** - View attendance history with filtering and calendar view
2. **My Profile Page** - View and edit personal profile information

---

## 🎯 Phase 3 Goals

### Primary Objectives:
- ✅ Enable employees to view their attendance history
- ✅ Provide calendar view for attendance visualization
- ✅ Allow employees to view and edit their profile
- ✅ Support profile photo upload
- ✅ Integrate with existing backend or create new endpoints as needed

### Success Criteria:
- [ ] Attendance history displays with filtering
- [ ] Calendar view shows attendance status
- [ ] Profile displays current user information
- [ ] Profile editing works correctly
- [ ] Profile photo upload successful
- [ ] Build completes with no errors
- [ ] Responsive design on all devices

---

## 🏗️ Architecture Overview

### Component Structure:
```
portal/
├── employee-dashboard/          (✅ Phase 2)
│   ├── employee-dashboard.component.ts
│   ├── employee-dashboard.component.html
│   └── employee-dashboard.component.css
├── my-attendance/              (⏳ Phase 3)
│   ├── my-attendance.component.ts
│   ├── my-attendance.component.html
│   └── my-attendance.component.css
└── my-profile/                 (⏳ Phase 3)
    ├── my-profile.component.ts
    ├── my-profile.component.html
    └── my-profile.component.css
```

### Service Extensions:
```typescript
// portal.service.ts (extend existing)
- Add attendance query methods
- Add profile query/update methods
- Add photo upload method
```

### Backend Requirements:
- Check if attendance endpoints exist
- Check if profile endpoints exist
- Create new endpoints if needed
- Update authorization policies if needed

---

## 📝 Implementation Steps

### Step 1: Analyze Existing Backend (15 minutes)

**1.1 Check Existing Attendance Endpoints**
```bash
# Search for attendance endpoints
grep -r "AttendanceController" src/Api/
grep -r "GetAttendanceByEmployee" src/Application/
```

**Expected**: Should find existing attendance query endpoints
- If found: Use existing endpoints
- If not found: Create new CQRS queries

**1.2 Check Existing Profile/User Endpoints**
```bash
# Search for user profile endpoints
grep -r "UsersController" src/Api/
grep -r "GetUserProfile" src/Application/
grep -r "UpdateUserProfile" src/Application/
```

**Expected**: Should find user management endpoints
- Check if they support profile updates
- Check if they support photo upload

**Action Items**:
- [ ] Document existing attendance endpoints
- [ ] Document existing profile endpoints
- [ ] Identify gaps
- [ ] Plan new endpoints if needed

---

### Step 2: Backend Extensions (if needed) (1-2 hours)

**ONLY IF GAPS EXIST** - Skip if endpoints already exist

#### 2.1 Attendance Query (if needed)

**Create GetMyAttendanceQuery.cs**
```csharp
// Location: src/Application/Features/Portal/MyAttendance/Queries/
public record GetMyAttendanceQuery : IRequest<Result<PagedResult<AttendanceDto>>>
{
    public DateTime? StartDate { get; init; }
    public DateTime? EndDate { get; init; }
    public AttendanceStatus? Status { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
}

internal sealed class GetMyAttendanceQueryHandler : BaseHandler<GetMyAttendanceQuery, Result<PagedResult<AttendanceDto>>>
{
    // Implementation:
    // 1. Get current user's employee ID via EmployeeUserLink
    // 2. Query attendance records for employee
    // 3. Apply date and status filters
    // 4. Return paged results with attendance details
}
```

**Create Controller Endpoint**
```csharp
// Location: src/Api/Controllers/PortalController.cs
[HttpGet("my-attendance")]
public async Task<IActionResult> GetMyAttendance([FromQuery] GetMyAttendanceQuery query)
{
    var result = await _mediator.Send(query);
    return result.IsSuccess ? Ok(result) : BadRequest(result);
}
```

#### 2.2 Profile Query/Update (if needed)

**Create GetMyProfileQuery.cs**
```csharp
// Location: src/Application/Features/Portal/MyProfile/Queries/
public record GetMyProfileQuery : IRequest<Result<UserProfileDto>>;

internal sealed class GetMyProfileQueryHandler : BaseHandler<GetMyProfileQuery, Result<UserProfileDto>>
{
    // Implementation:
    // 1. Get current user from context
    // 2. Load user details with employee info
    // 3. Return profile DTO
}
```

**Create UpdateMyProfileCommand.cs**
```csharp
// Location: src/Application/Features/Portal/MyProfile/Commands/
public record UpdateMyProfileCommand : IRequest<Result>
{
    public string? PhoneNumber { get; init; }
    public string? Email { get; init; }
    public string? Address { get; init; }
    // Other editable fields
}

internal sealed class UpdateMyProfileCommandHandler : BaseHandler<UpdateMyProfileCommand, Result>
{
    // Implementation:
    // 1. Get current user
    // 2. Validate input
    // 3. Update allowed fields only
    // 4. Save changes
}
```

**Create Photo Upload Endpoint**
```csharp
[HttpPost("my-profile/photo")]
public async Task<IActionResult> UploadProfilePhoto(IFormFile photo)
{
    // Handle file upload
    // Validate file type and size
    // Save to storage
    // Update user photo path
}
```

---

### Step 3: Frontend Data Models (30 minutes)

**3.1 Create my-attendance.model.ts**

Location: `time-attendance-frontend/src/app/pages/portal/models/my-attendance.model.ts`

```typescript
/**
 * My Attendance data models
 */

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  status: AttendanceStatus;
  workingHours: number;
  overtimeHours: number;
  lateMinutes?: number;
  earlyLeaveMinutes?: number;
  shiftName: string;
  notes?: string;
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late',
  EarlyLeave = 'EarlyLeave',
  Holiday = 'Holiday',
  Weekend = 'Weekend',
  OnLeave = 'OnLeave'
}

export interface AttendanceQueryParams {
  startDate?: Date;
  endDate?: Date;
  status?: AttendanceStatus;
  pageNumber?: number;
  pageSize?: number;
}

export interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  totalWorkingHours: number;
  totalOvertimeHours: number;
  attendanceRate: number;
}

export interface CalendarDay {
  date: Date;
  status: AttendanceStatus;
  isToday: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  attendance?: AttendanceRecord;
}
```

**3.2 Create my-profile.model.ts**

Location: `time-attendance-frontend/src/app/pages/portal/models/my-profile.model.ts`

```typescript
/**
 * My Profile data models
 */

export interface UserProfile {
  userId: number;
  userName: string;
  email: string;
  phoneNumber?: string;
  fullName: string;
  employeeCode?: string;
  department?: string;
  branch?: string;
  position?: string;
  hireDate?: Date;
  photoUrl?: string;
  address?: string;
  // Other fields
}

export interface UpdateProfileRequest {
  phoneNumber?: string;
  email?: string;
  address?: string;
  // Only editable fields
}
```

---

### Step 4: Extend Portal Service (45 minutes)

**4.1 Add Attendance Methods to portal.service.ts**

```typescript
// Add to existing portal.service.ts

// ===== MY ATTENDANCE STATE =====

private readonly _myAttendance = signal<AttendanceRecord[]>([]);
private readonly _myAttendanceLoading = signal<boolean>(false);
private readonly _myAttendanceError = signal<string | null>(null);
private readonly _myAttendancePagedResult = signal<PagedResult<AttendanceRecord> | null>(null);
private readonly _attendanceSummary = signal<AttendanceSummary | null>(null);

readonly myAttendance = this._myAttendance.asReadonly();
readonly myAttendanceLoading = this._myAttendanceLoading.asReadonly();
readonly myAttendanceError = this._myAttendanceError.asReadonly();
readonly myAttendancePagedResult = this._myAttendancePagedResult.asReadonly();
readonly attendanceSummary = this._attendanceSummary.asReadonly();

/**
 * Loads my attendance records
 */
loadMyAttendance(params?: AttendanceQueryParams): Observable<PagedResult<AttendanceRecord>> {
  this._myAttendanceLoading.set(true);
  this._myAttendanceError.set(null);

  let httpParams = new HttpParams();
  // Build params...

  return this.http.get<{ isSuccess: boolean; value: PagedResult<AttendanceRecord>; error: string }>(
    `${this.portalApiUrl}/my-attendance`,
    { params: httpParams }
  ).pipe(
    map(response => {
      if (!response.isSuccess) {
        throw new Error(response.error || 'Failed to load attendance');
      }
      return {
        ...response.value,
        items: response.value.items.map(item => this.transformAttendanceDates(item))
      };
    }),
    tap(result => {
      this._myAttendance.set(result.items);
      this._myAttendancePagedResult.set(result);
      this._myAttendanceLoading.set(false);
      this.calculateAttendanceSummary(result.items);
    }),
    catchError(error => {
      const errorMessage = error.error?.error || error.message || 'Failed to load attendance';
      this._myAttendanceError.set(errorMessage);
      this._myAttendanceLoading.set(false);
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    })
  );
}

private calculateAttendanceSummary(records: AttendanceRecord[]): void {
  const totalDays = records.length;
  const presentDays = records.filter(r =>
    r.status === AttendanceStatus.Present ||
    r.status === AttendanceStatus.Late ||
    r.status === AttendanceStatus.EarlyLeave
  ).length;
  const absentDays = records.filter(r => r.status === AttendanceStatus.Absent).length;
  const lateDays = records.filter(r => r.status === AttendanceStatus.Late).length;
  const totalWorkingHours = records.reduce((sum, r) => sum + r.workingHours, 0);
  const totalOvertimeHours = records.reduce((sum, r) => sum + r.overtimeHours, 0);
  const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

  this._attendanceSummary.set({
    totalDays,
    presentDays,
    absentDays,
    lateDays,
    totalWorkingHours,
    totalOvertimeHours,
    attendanceRate
  });
}
```

**4.2 Add Profile Methods to portal.service.ts**

```typescript
// ===== MY PROFILE STATE =====

private readonly _myProfile = signal<UserProfile | null>(null);
private readonly _myProfileLoading = signal<boolean>(false);
private readonly _myProfileError = signal<string | null>(null);

readonly myProfile = this._myProfile.asReadonly();
readonly myProfileLoading = this._myProfileLoading.asReadonly();
readonly myProfileError = this._myProfileError.asReadonly();

/**
 * Loads my profile
 */
loadMyProfile(): Observable<UserProfile> {
  this._myProfileLoading.set(true);
  this._myProfileError.set(null);

  return this.http.get<{ isSuccess: boolean; value: UserProfile; error: string }>(
    `${this.portalApiUrl}/my-profile`
  ).pipe(
    map(response => {
      if (!response.isSuccess) {
        throw new Error(response.error || 'Failed to load profile');
      }
      return this.transformProfileDates(response.value);
    }),
    tap(profile => {
      this._myProfile.set(profile);
      this._myProfileLoading.set(false);
    }),
    catchError(error => {
      const errorMessage = error.error?.error || error.message || 'Failed to load profile';
      this._myProfileError.set(errorMessage);
      this._myProfileLoading.set(false);
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    })
  );
}

/**
 * Updates my profile
 */
updateMyProfile(request: UpdateProfileRequest): Observable<void> {
  this._myProfileLoading.set(true);

  return this.http.put<{ isSuccess: boolean; error: string }>(
    `${this.portalApiUrl}/my-profile`,
    request
  ).pipe(
    map(response => {
      if (!response.isSuccess) {
        throw new Error(response.error || 'Failed to update profile');
      }
    }),
    tap(() => {
      this._myProfileLoading.set(false);
      this.notificationService.success('Profile updated successfully');
      // Refresh profile
      this.loadMyProfile().subscribe();
    }),
    catchError(error => {
      this._myProfileLoading.set(false);
      const errorMessage = error.error?.error || error.message || 'Failed to update profile';
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    })
  );
}

/**
 * Uploads profile photo
 */
uploadProfilePhoto(file: File): Observable<string> {
  this._myProfileLoading.set(true);

  const formData = new FormData();
  formData.append('photo', file);

  return this.http.post<{ isSuccess: boolean; value: string; error: string }>(
    `${this.portalApiUrl}/my-profile/photo`,
    formData
  ).pipe(
    map(response => {
      if (!response.isSuccess) {
        throw new Error(response.error || 'Failed to upload photo');
      }
      return response.value; // Photo URL
    }),
    tap(photoUrl => {
      this._myProfileLoading.set(false);
      this.notificationService.success('Profile photo updated successfully');
      // Update profile with new photo URL
      const currentProfile = this._myProfile();
      if (currentProfile) {
        this._myProfile.set({ ...currentProfile, photoUrl });
      }
    }),
    catchError(error => {
      this._myProfileLoading.set(false);
      const errorMessage = error.error?.error || error.message || 'Failed to upload photo';
      this.notificationService.error(errorMessage);
      return throwError(() => error);
    })
  );
}
```

---

### Step 5: My Attendance Component (1-1.5 hours)

**5.1 Create my-attendance.component.ts**

Location: `time-attendance-frontend/src/app/pages/portal/my-attendance/my-attendance.component.ts`

```typescript
import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { AttendanceStatus } from '../models/my-attendance.model';

@Component({
  selector: 'app-my-attendance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    DataTableComponent
  ],
  templateUrl: './my-attendance.component.html',
  styleUrl: './my-attendance.component.css'
})
export class MyAttendanceComponent implements OnInit {
  private readonly portalService = inject(PortalService);
  readonly i18n = inject(I18nService);

  // State from service
  attendance = this.portalService.myAttendance;
  loading = this.portalService.myAttendanceLoading;
  error = this.portalService.myAttendanceError;
  summary = this.portalService.attendanceSummary;

  // Filters
  startDate = signal<Date | null>(this.getFirstDayOfMonth());
  endDate = signal<Date | null>(new Date());
  selectedStatus = signal<AttendanceStatus | null>(null);
  viewMode = signal<'table' | 'calendar'>('table');

  // Table columns
  columns: TableColumn[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'checkInTime', label: 'Check In', sortable: true },
    { key: 'checkOutTime', label: 'Check Out', sortable: true },
    { key: 'workingHours', label: 'Working Hours', sortable: true },
    { key: 'overtimeHours', label: 'Overtime', sortable: true },
    { key: 'shiftName', label: 'Shift', sortable: false }
  ];

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    this.portalService.loadMyAttendance({
      startDate: this.startDate() || undefined,
      endDate: this.endDate() || undefined,
      status: this.selectedStatus() || undefined
    }).subscribe();
  }

  applyFilters(): void {
    this.loadAttendance();
  }

  clearFilters(): void {
    this.startDate.set(this.getFirstDayOfMonth());
    this.endDate.set(new Date());
    this.selectedStatus.set(null);
    this.loadAttendance();
  }

  toggleViewMode(): void {
    this.viewMode.set(this.viewMode() === 'table' ? 'calendar' : 'table');
  }

  private getFirstDayOfMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
}
```

**5.2 Create my-attendance.component.html**

```html
<!-- Page Header -->
<app-page-header
  [title]="i18n.t('portal.my_attendance')"
  [subtitle]="i18n.t('portal.attendance_subtitle')"
  icon="fa-solid fa-calendar-alt">
  <div header-actions>
    <button
      class="btn btn-outline-secondary btn-sm me-2"
      (click)="toggleViewMode()"
      type="button">
      <i [class]="viewMode() === 'table' ? 'fa-solid fa-calendar' : 'fa-solid fa-table'"></i>
      {{ viewMode() === 'table' ? i18n.t('common.calendar_view') : i18n.t('common.table_view') }}
    </button>
    <button
      class="btn btn-outline-primary btn-sm"
      (click)="loadAttendance()"
      [disabled]="loading()"
      type="button">
      <i class="fa-solid fa-sync-alt" [class.fa-spin]="loading()"></i>
      {{ i18n.t('common.refresh') }}
    </button>
  </div>
</app-page-header>

<!-- Loading State -->
@if (loading() && !attendance().length) {
  <app-loading-spinner [message]="i18n.t('common.loading')"></app-loading-spinner>
}

<!-- Error State -->
@if (error() && !attendance().length) {
  <div class="alert alert-danger" role="alert">
    <i class="fa-solid fa-exclamation-triangle me-2"></i>
    {{ error() }}
    <button class="btn btn-sm btn-outline-danger ms-3" (click)="loadAttendance()" type="button">
      {{ i18n.t('common.retry') }}
    </button>
  </div>
}

<!-- Summary Cards -->
@if (summary()) {
  <div class="row g-3 mb-4">
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h6>{{ i18n.t('attendance.attendance_rate') }}</h6>
          <h3>{{ summary()!.attendanceRate.toFixed(1) }}%</h3>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h6>{{ i18n.t('attendance.present_days') }}</h6>
          <h3>{{ summary()!.presentDays }} / {{ summary()!.totalDays }}</h3>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h6>{{ i18n.t('attendance.working_hours') }}</h6>
          <h3>{{ summary()!.totalWorkingHours.toFixed(1) }}h</h3>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h6>{{ i18n.t('attendance.overtime_hours') }}</h6>
          <h3>{{ summary()!.totalOvertimeHours.toFixed(1) }}h</h3>
        </div>
      </div>
    </div>
  </div>
}

<!-- Filters -->
<div class="card mb-4">
  <div class="card-body">
    <div class="row g-3">
      <div class="col-md-3">
        <label class="form-label">{{ i18n.t('common.start_date') }}</label>
        <input
          type="date"
          class="form-control"
          [(ngModel)]="startDate"
          (change)="applyFilters()">
      </div>
      <div class="col-md-3">
        <label class="form-label">{{ i18n.t('common.end_date') }}</label>
        <input
          type="date"
          class="form-control"
          [(ngModel)]="endDate"
          (change)="applyFilters()">
      </div>
      <div class="col-md-3">
        <label class="form-label">{{ i18n.t('common.status') }}</label>
        <select
          class="form-select"
          [(ngModel)]="selectedStatus"
          (change)="applyFilters()">
          <option [ngValue]="null">{{ i18n.t('common.all') }}</option>
          <option value="Present">{{ i18n.t('attendance.status.present') }}</option>
          <option value="Absent">{{ i18n.t('attendance.status.absent') }}</option>
          <option value="Late">{{ i18n.t('attendance.status.late') }}</option>
        </select>
      </div>
      <div class="col-md-3 d-flex align-items-end">
        <button
          class="btn btn-outline-secondary w-100"
          (click)="clearFilters()"
          type="button">
          {{ i18n.t('common.clear_filters') }}
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Table View -->
@if (viewMode() === 'table') {
  @if (attendance().length > 0) {
    <app-data-table
      [data]="attendance()"
      [columns]="columns"
      [loading]="loading()">
    </app-data-table>
  } @else if (!loading()) {
    <app-empty-state
      icon="fa-calendar-alt"
      [title]="i18n.t('attendance.no_records')"
      [message]="i18n.t('attendance.no_records_message')">
    </app-empty-state>
  }
}

<!-- Calendar View -->
@if (viewMode() === 'calendar') {
  <div class="card">
    <div class="card-body">
      <p>Calendar view will be implemented here</p>
    </div>
  </div>
}
```

**5.3 Create my-attendance.component.css**

```css
/* Attendance page styles */
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
```

---

### Step 6: My Profile Component (1-1.5 hours)

Similar structure to My Attendance - create TypeScript, HTML, and CSS files for profile view and edit functionality.

---

### Step 7: Routing Configuration (15 minutes)

**Update app.routes.ts**

```typescript
// Add after portal/employee-dashboard route
{
  path: 'portal/my-attendance',
  loadComponent: () => import('./pages/portal/my-attendance/my-attendance.component').then(m => m.MyAttendanceComponent),
  data: {
    title: 'portal.my_attendance',
    permission: 'portal.access'
  },
  canMatch: [authGuard]
},
{
  path: 'portal/my-profile',
  loadComponent: () => import('./pages/portal/my-profile/my-profile.component').then(m => m.MyProfileComponent),
  data: {
    title: 'portal.my_profile',
    permission: 'portal.access'
  },
  canMatch: [authGuard]
},
```

---

### Step 8: Build & Test (30 minutes)

```bash
# Frontend build
cd time-attendance-frontend
npm run build

# Test in browser
npm start
# Navigate to:
# http://localhost:4200/portal/my-attendance
# http://localhost:4200/portal/my-profile
```

---

## 📊 Phase 3 Deliverables Checklist

### Backend (if needed):
- [ ] Attendance query endpoint
- [ ] Profile query endpoint
- [ ] Profile update endpoint
- [ ] Photo upload endpoint
- [ ] Authorization policies
- [ ] Database migration (if schema changes)

### Frontend:
- [ ] my-attendance.model.ts
- [ ] my-profile.model.ts
- [ ] Extended portal.service.ts
- [ ] my-attendance.component.ts/html/css
- [ ] my-profile.component.ts/html/css
- [ ] Updated app.routes.ts

### Documentation:
- [ ] PHASE_3_COMPLETION_SUMMARY.md
- [ ] Updated PORTAL_IMPLEMENTATION_PROGRESS.md
- [ ] Updated README_PORTAL.md

---

## 🎯 Success Metrics

| Metric | Target |
|--------|--------|
| Build Errors | 0 |
| Type Safety | 100% |
| Responsive Design | Yes |
| Component Structure | 3 files each |
| Signal Usage | Yes |
| Integration Tests | Pass |

---

## 📚 Reference Documents

- **CLAUDE.md** - Development guidelines
- **PHASE_2_COMPLETION_SUMMARY.md** - Previous phase patterns
- **API_TESTING_GUIDE.md** - Backend API reference
- **SHARED_COMPONENTS_QUICK_REFERENCE.md** - Reusable components

---

## 🚀 Ready to Start!

When ready to begin Phase 3:
1. Confirm backend endpoints exist
2. Start with data models
3. Extend portal service
4. Create My Attendance component
5. Create My Profile component
6. Add routes
7. Build and test

**Estimated Total Time**: 4-6 hours
**Target Completion**: End of session

---

**Good luck with Phase 3! 🎉**
