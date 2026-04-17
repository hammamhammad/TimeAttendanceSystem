import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { systemAdminGuard, adminGuard, managerGuard, employeeGuard } from './core/auth/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login.component').then(m => m.LoginComponent),
    data: { title: 'auth.login' }
  },
  {
    path: 'auth/change-password',
    loadComponent: () => import('./pages/auth/change-password.component').then(m => m.ChangePasswordComponent),
    canMatch: [authGuard],
    data: { title: 'auth.change_password' }
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    canMatch: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: { title: 'dashboard.title' }
      },
      {
        // Phase 3 (v14.3): Admin UI for operational alerts + ops dashboard.
        // Minimum-viable integration of the Phase 1/2/3 backend endpoints.
        path: 'operational-alerts',
        loadComponent: () =>
          import('./pages/operational-alerts/operational-alerts.component').then(m => m.OperationalAlertsComponent),
        data: { title: 'Operational Alerts' },
        canMatch: [adminGuard]
      },
      // Phase 4 (v14.4): remaining admin UI for Phase 1–3 operational endpoints.
      {
        path: 'ops-dashboard',
        loadComponent: () =>
          import('./pages/ops-dashboard-summary/ops-dashboard-summary.component').then(m => m.OpsDashboardSummaryComponent),
        data: { title: 'Operations Dashboard' },
        canMatch: [adminGuard]
      },
      {
        path: 'work-queues/:queue',
        loadComponent: () =>
          import('./pages/work-queues/work-queues.component').then(m => m.WorkQueuesComponent),
        data: { title: 'Work Queue' },
        canMatch: [adminGuard]
      },
      {
        path: 'approved-not-executed',
        loadComponent: () =>
          import('./pages/approved-not-executed/approved-not-executed.component').then(m => m.ApprovedNotExecutedComponent),
        data: { title: 'Approved Not Executed' },
        canMatch: [adminGuard]
      },
      {
        path: 'execution-status/:targetType/:id',
        loadComponent: () =>
          import('./pages/execution-status/execution-status.component').then(m => m.ExecutionStatusComponent),
        data: { title: 'Execution Status' },
        canMatch: [adminGuard]
      },
      {
        path: 'global-search',
        loadComponent: () =>
          import('./pages/global-search/global-search.component').then(m => m.GlobalSearchComponent),
        data: { title: 'Global Search' },
        canMatch: [authGuard]
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
        data: {
          title: 'users.title',
          permission: 'user.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'users/create',
        loadComponent: () => import('./pages/users/create-user-page/create-user-page.component').then(m => m.CreateUserPageComponent),
        data: {
          title: 'users.create_user',
          permission: 'user.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'users/:id/view',
        loadComponent: () => import('./pages/users/view-user/view-user.component').then(m => m.ViewUserComponent),
        data: {
          title: 'users.view_details',
          permission: 'user.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'users/:id/edit',
        loadComponent: () => import('./pages/users/edit-user-page/edit-user-page.component').then(m => m.EditUserPageComponent),
        data: {
          title: 'users.edit_user',
          permission: 'user.update'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'employees',
        loadComponent: () => import('./pages/employees/employees.component').then(m => m.EmployeesComponent),
        data: {
          title: 'employees.title',
          permission: 'employee.read'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'employees/create',
        loadComponent: () => import('./pages/employees/create-employee/create-employee.component').then(m => m.CreateEmployeeComponent),
        data: {
          title: 'employees.create_employee',
          permission: 'employee.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'employees/:id/view',
        loadComponent: () => import('./pages/employees/view-employee/view-employee.component').then(m => m.ViewEmployeeComponent),
        data: {
          title: 'employees.view_details',
          permission: 'employee.read'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'employees/:id/edit',
        loadComponent: () => import('./pages/employees/edit-employee/edit-employee.component').then(m => m.EditEmployeeComponent),
        data: {
          title: 'employees.edit_employee',
          permission: 'employee.update'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'employees/:employeeId/change-shift',
        loadComponent: () => import('./pages/employees/change-employee-shift/change-employee-shift.component').then(m => m.ChangeEmployeeShiftComponent),
        data: {
          title: 'employees.change_shift',
          permission: 'employee.update'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'roles',
        loadComponent: () => import('./pages/roles/roles.component').then(m => m.RolesComponent),
        data: {
          title: 'roles.title',
          permission: 'role.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'roles/create',
        loadComponent: () => import('./pages/roles/create-role/create-role.component').then(m => m.CreateRoleComponent),
        data: {
          title: 'roles.create_role',
          permission: 'role.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'roles/:id/view',
        loadComponent: () => import('./pages/roles/view-role/view-role.component').then(m => m.ViewRoleComponent),
        data: {
          title: 'roles.view_details',
          permission: 'role.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'roles/:id/edit',
        loadComponent: () => import('./pages/roles/edit-role/edit-role.component').then(m => m.EditRoleComponent),
        data: {
          title: 'roles.edit_role',
          permission: 'role.update'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'branches',
        loadComponent: () => import('./pages/branches/branches.component').then(m => m.BranchesComponent),
        data: {
          title: 'branches.title',
          permission: 'branch.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'branches/create',
        loadComponent: () => import('./pages/branches/create-branch/create-branch.component').then(m => m.CreateBranchComponent),
        data: {
          title: 'branches.create_branch',
          permission: 'branch.create'
        },
        canMatch: [authGuard]
      },
      {
        path: 'branches/:id/view',
        loadComponent: () => import('./pages/branches/view-branch/view-branch.component').then(m => m.ViewBranchComponent),
        data: {
          title: 'branches.view_details',
          permission: 'branch.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'branches/:id/edit',
        loadComponent: () => import('./pages/branches/edit-branch/edit-branch.component').then(m => m.EditBranchComponent),
        data: {
          title: 'branches.edit_branch',
          permission: 'branch.update'
        },
        canMatch: [authGuard]
      },
      {
        path: 'departments',
        loadComponent: () => import('./pages/departments/departments.component').then(m => m.DepartmentsComponent),
        data: {
          title: 'departments.title',
          permission: 'department.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'departments/create',
        loadComponent: () => import('./pages/departments/create-department/create-department.component').then(m => m.CreateDepartmentComponent),
        data: {
          title: 'departments.create',
          permission: 'department.create'
        },
        canMatch: [authGuard]
      },
      {
        path: 'departments/:id/view',
        loadComponent: () => import('./pages/departments/view-department/view-department.component').then(m => m.ViewDepartmentComponent),
        data: {
          title: 'departments.view_details',
          permission: 'department.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'departments/:id/edit',
        loadComponent: () => import('./pages/departments/edit-department/edit-department.component').then(m => m.EditDepartmentComponent),
        data: {
          title: 'departments.edit',
          permission: 'department.update'
        },
        canMatch: [authGuard]
      },
      {
        path: 'shifts',
        loadComponent: () => import('./pages/shifts/shifts.component').then(m => m.ShiftsComponent),
        data: {
          title: 'shifts.title',
          permission: 'shift.read'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'shifts/create',
        loadComponent: () => import('./pages/shifts/create-shift/create-shift.component').then(m => m.CreateShiftComponent),
        data: {

          title: 'shifts.create_shift',
          permission: 'shift.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'shifts/:id/view',
        loadComponent: () => import('./pages/shifts/view-shift/view-shift.component').then(m => m.ViewShiftComponent),
        data: {
          title: 'shifts.view_details',
          permission: 'shift.read'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'shifts/:id/edit',
        loadComponent: () => import('./pages/shifts/edit-shift/edit-shift.component').then(m => m.EditShiftComponent),
        data: {

          title: 'shifts.edit_shift',
          permission: 'shift.update'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'shifts/assign',
        loadComponent: () => import('./pages/shifts/assign-shifts/assign-shifts.component').then(m => m.AssignShiftsComponent),
        data: {

          title: 'shifts.assignments.title',
          permission: 'shift.assign'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'attendance',
        loadComponent: () => import('./pages/attendance/attendance.component').then(m => m.AttendanceComponent),
        data: {
          title: 'attendance.dashboard_title',
          permission: 'attendance.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/daily',
        loadComponent: () => import('./pages/attendance/daily/daily-attendance.component').then(m => m.DailyAttendanceComponent),
        data: {
          title: 'attendance.daily_view',
          permission: 'attendance.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/monthly-report',
        loadComponent: () => import('./pages/attendance/monthly-report/monthly-report.component').then(m => m.MonthlyReportComponent),
        data: {
          title: 'attendance.monthly_report',
          permission: 'attendance.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/daily-detail/:employeeId/:date',
        loadComponent: () => import('./pages/attendance/daily-attendance-detail/daily-attendance-detail.component').then(m => m.DailyAttendanceDetailComponent),
        data: {
          title: 'attendance.daily_detail.title',
          permission: 'attendance.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/employee-history',
        loadComponent: () => import('./pages/attendance/employee-detail/employee-attendance-detail.component').then(m => m.EmployeeAttendanceDetailComponent),
        data: {
          title: 'attendance.employee_history.title',
          permission: 'attendance.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/employee/:id',
        loadComponent: () => import('./pages/attendance/employee-detail/employee-attendance-detail.component').then(m => m.EmployeeAttendanceDetailComponent),
        data: {
          title: 'attendance.employee_detail',
          permission: 'attendance.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/edit/:id',
        loadComponent: () => import('./pages/attendance/edit-attendance/edit-attendance.component').then(m => m.EditAttendanceComponent),
        data: {

          title: 'attendance.edit.title',
          permission: 'attendance.update'
        },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/:attendanceId/change-shift',
        loadComponent: () => import('./pages/attendance/change-attendance-shift/change-attendance-shift.component').then(m => m.ChangeAttendanceShiftComponent),
        data: {

          title: 'attendance.change_shift_title',
          permission: 'attendance.update'
        },
        canMatch: [authGuard]
      },
      // Shift Swap Routes
      {
        path: 'attendance/shift-swaps',
        loadComponent: () => import('./pages/attendance/shift-swaps/shift-swaps.component').then(m => m.ShiftSwapsComponent),
        data: { title: 'shiftSwaps.title', permission: 'shiftSwapRequest.read' },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/shift-swaps/:id/view',
        loadComponent: () => import('./pages/attendance/shift-swaps/view-shift-swap/view-shift-swap.component').then(m => m.ViewShiftSwapComponent),
        data: { title: 'shiftSwaps.view', permission: 'shiftSwapRequest.read' },
        canMatch: [authGuard]
      },
      // On-Call Schedule Routes
      {
        path: 'attendance/on-call',
        loadComponent: () => import('./pages/attendance/on-call/on-call-schedules.component').then(m => m.OnCallSchedulesComponent),
        data: { title: 'onCall.title', permission: 'onCallSchedule.read' },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/on-call/create',
        loadComponent: () => import('./pages/attendance/on-call/create-on-call/create-on-call.component').then(m => m.CreateOnCallComponent),
        data: {title: 'onCall.create', permission: 'onCallSchedule.create' },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/on-call/:id/view',
        loadComponent: () => import('./pages/attendance/on-call/view-on-call/view-on-call.component').then(m => m.ViewOnCallComponent),
        data: { title: 'onCall.view', permission: 'onCallSchedule.read' },
        canMatch: [authGuard]
      },
      {
        path: 'attendance/on-call/:id/edit',
        loadComponent: () => import('./pages/attendance/on-call/create-on-call/create-on-call.component').then(m => m.CreateOnCallComponent),
        data: {title: 'onCall.edit', permission: 'onCallSchedule.update' },
        canMatch: [authGuard]
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
        data: { title: 'settings.title' }
      },
      {
        // Phase 7 (v14.7): canonical route is now `/settings/company-config`. The old
        // `/settings/tenant-config` path is a permanent redirect below to preserve
        // existing bookmarks, audit-log links, and notification-action URLs.
        path: 'settings/company-config',
        loadComponent: () => import('./pages/settings/company-configuration/company-configuration.component').then(m => m.CompanyConfigurationComponent),
        data: { title: 'tenant_configuration.title' },
        children: [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: 'general', loadComponent: () => import('./pages/settings/company-configuration/general-settings/general-settings.component').then(m => m.GeneralSettingsComponent), data: { title: 'tenant_configuration.general.title' } },
          { path: 'attendance', loadComponent: () => import('./pages/settings/company-configuration/attendance-settings/attendance-settings.component').then(m => m.AttendanceSettingsComponent), data: { title: 'tenant_configuration.attendance.title' } },
          { path: 'leave', loadComponent: () => import('./pages/settings/company-configuration/leave-settings/leave-settings.component').then(m => m.LeaveSettingsComponent), data: { title: 'tenant_configuration.leave.title' } },
          { path: 'approval', loadComponent: () => import('./pages/settings/company-configuration/approval-settings/approval-settings.component').then(m => m.ApprovalSettingsComponent), data: { title: 'tenant_configuration.approval.title' } },
          { path: 'notification', loadComponent: () => import('./pages/settings/company-configuration/notification-settings/notification-settings.component').then(m => m.NotificationSettingsComponent), data: { title: 'tenant_configuration.notification.title' } },
          { path: 'mobile', loadComponent: () => import('./pages/settings/company-configuration/mobile-settings/mobile-settings.component').then(m => m.MobileSettingsComponent), data: { title: 'tenant_configuration.mobile.title' } },
          { path: 'security', loadComponent: () => import('./pages/settings/company-configuration/security-settings/security-settings.component').then(m => m.SecuritySettingsComponent), data: { title: 'tenant_configuration.security.title' } },
        ]
      },
      // Phase 7 (v14.7): legacy route alias → forwards to the new canonical path with
      // the same sub-route preserved (e.g. /settings/tenant-config/attendance →
      // /settings/company-config/attendance). Angular's prefix redirect handles child
      // segments automatically.
      { path: 'settings/tenant-config', redirectTo: 'settings/company-config' },
      {
        path: 'settings/overtime',
        loadComponent: () => import('./pages/settings/overtime/overtime-configurations.component').then(m => m.OvertimeConfigurationsComponent),
        data: {
          title: 'settings.overtime.title',
          permission: 'settings.overtime.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/overtime/create',
        loadComponent: () => import('./pages/settings/overtime/create-overtime-configuration/create-overtime-configuration.component').then(m => m.CreateOvertimeConfigurationComponent),
        data: {

          title: 'settings.overtime.create',
          permission: 'settings.overtime.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/overtime/edit/:id',
        loadComponent: () => import('./pages/settings/overtime/edit-overtime-configuration/edit-overtime-configuration.component').then(m => m.EditOvertimeConfigurationComponent),
        data: {

          title: 'settings.overtime.edit',
          permission: 'settings.overtime.update'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/overtime/:id/view',
        loadComponent: () => import('./pages/settings/overtime/view-overtime-configuration/view-overtime-configuration.component').then(m => m.ViewOvertimeConfigurationComponent),
        data: {
          title: 'settings.overtime.view_details',
          permission: 'settings.overtime.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/public-holidays',
        loadComponent: () => import('./pages/settings/public-holidays/public-holidays.component').then(m => m.PublicHolidaysComponent),
        data: {
          title: 'settings.holidays.title',
          permission: 'publicHoliday.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/public-holidays/create',
        loadComponent: () => import('./pages/settings/public-holidays/create-public-holiday/create-public-holiday.component').then(m => m.CreatePublicHolidayComponent),
        data: {

          title: 'settings.holidays.create',
          permission: 'publicHoliday.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/public-holidays/:id/view',
        loadComponent: () => import('./pages/settings/public-holidays/view-public-holiday/view-public-holiday.component').then(m => m.ViewPublicHolidayComponent),
        data: {
          title: 'settings.holidays.view_details',
          permission: 'publicHoliday.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/public-holidays/:id/edit',
        loadComponent: () => import('./pages/settings/public-holidays/edit-public-holiday/edit-public-holiday.component').then(m => m.EditPublicHolidayComponent),
        data: {

          title: 'settings.holidays.edit',
          permission: 'publicHoliday.update'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'reports/attendance',
        loadComponent: () => import('./pages/reports/attendance-report').then(m => m.AttendanceReportComponent),
        data: {
          title: 'reports.attendance.title',
          permission: 'attendance.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'reports/leaves',
        loadComponent: () => import('./pages/reports/leave-report').then(m => m.LeaveReportComponent),
        data: {
          title: 'reports.leaves',
          permission: 'vacation.read'
        },
        canMatch: [authGuard]
      },
      // Vacation Types Routes
      {
        path: 'vacation-types',
        loadComponent: () => import('./pages/vacation-types/vacation-types.component').then(m => m.VacationTypesComponent),
        data: {
          title: 'vacation_types.title',
          permission: 'vacationType.read'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'vacation-types/:id',
        loadComponent: () => import('./pages/vacation-types/view-vacation-type/view-vacation-type.component').then(m => m.ViewVacationTypeComponent),
        data: {
          title: 'vacation_types.view_details',
          permission: 'vacationType.read'
        },
        canMatch: [managerGuard]
      },
      // Employee Vacations Routes
      {
        path: 'employee-vacations',
        loadComponent: () => import('./pages/employee-vacations/employee-vacations.component').then(m => m.EmployeeVacationsComponent),
        data: {
          title: 'employee_vacations.title',
          permission: 'vacation.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employee-vacations/create',
        loadComponent: () => import('./pages/employee-vacations/create-employee-vacation/create-employee-vacation.component').then(m => m.CreateEmployeeVacationComponent),
        data: {

          title: 'employee_vacations.create_vacation',
          permission: 'vacation.create'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employee-vacations/:id/view',
        loadComponent: () => import('./pages/employee-vacations/view-employee-vacation/view-employee-vacation.component').then(m => m.ViewEmployeeVacationComponent),
        data: {
          title: 'employee_vacations.view_details',
          permission: 'vacation.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employee-vacations/:id/edit',
        loadComponent: () => import('./pages/employee-vacations/edit-employee-vacation/edit-employee-vacation.component').then(m => m.EditEmployeeVacationComponent),
        data: {

          title: 'employee_vacations.edit_vacation',
          permission: 'vacation.update'
        },
        canMatch: [authGuard]
      },
      // Employee Excuses Routes
      {
        path: 'employee-excuses',
        loadComponent: () => import('./pages/employee-excuses/employee-excuses.component').then(m => m.EmployeeExcusesComponent),
        data: {
          title: 'employee_excuses.title',
          permission: 'excuse.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employee-excuses/create',
        loadComponent: () => import('./pages/employee-excuses/excuse-request-form/excuse-request-form.component').then(m => m.ExcuseRequestFormComponent),
        data: {

          title: 'employee_excuses.create_request',
          permission: 'excuse.create'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employee-excuses/:id/view',
        loadComponent: () => import('./pages/employee-excuses/excuse-details/excuse-details.component').then(m => m.ExcuseDetailsComponent),
        data: {
          title: 'employee_excuses.excuse_details',
          permission: 'excuse.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employee-excuses/:id/edit',
        loadComponent: () => import('./pages/employee-excuses/excuse-request-form/excuse-request-form.component').then(m => m.ExcuseRequestFormComponent),
        data: {

          title: 'employee_excuses.edit_request',
          permission: 'excuse.update'
        },
        canMatch: [authGuard]
      },
      // Remote Work Routes
      {
        path: 'remote-work',
        loadComponent: () => import('./pages/remote-work/remote-work-list/remote-work-list.component').then(m => m.RemoteWorkListComponent),
        data: {
          title: 'remoteWork.request.title',
          permission: 'remoteWork.request.read'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'remote-work/create',
        loadComponent: () => import('./pages/remote-work/assign-remote-work/assign-remote-work.component').then(m => m.AssignRemoteWorkComponent),
        data: {

          title: 'remoteWork.request.create',
          permission: 'remoteWork.request.create'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'remote-work/:id/view',
        loadComponent: () => import('./pages/remote-work/view-remote-work-assignment/view-remote-work-assignment.component').then(m => m.ViewRemoteWorkAssignmentComponent),
        data: {
          title: 'remoteWork.request.view_details',
          permission: 'remoteWork.request.read'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'remote-work/edit/:id',
        loadComponent: () => import('./pages/remote-work/edit-remote-work/edit-remote-work.component').then(m => m.EditRemoteWorkComponent),
        data: {

          title: 'remoteWork.request.edit',
          permission: 'remoteWork.request.update'
        },
        canMatch: [managerGuard]
      },
      {
        path: 'settings/remote-work-policy',
        loadComponent: () => import('./pages/settings/remote-work-policy/remote-work-policy-list/remote-work-policy-list.component').then(m => m.RemoteWorkPolicyListComponent),
        data: {
          title: 'remoteWork.policy.title',
          permission: 'remoteWork.policy.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/remote-work-policy/create',
        loadComponent: () => import('./pages/settings/remote-work-policy/create-remote-work-policy/create-remote-work-policy.component').then(m => m.CreateRemoteWorkPolicyComponent),
        data: {

          title: 'remoteWork.policy.create_policy',
          permission: 'remoteWork.policy.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/remote-work-policy/:id/view',
        loadComponent: () => import('./pages/settings/remote-work-policy/view-remote-work-policy/view-remote-work-policy.component').then(m => m.ViewRemoteWorkPolicyComponent),
        data: {
          title: 'remoteWork.policy.policy_details',
          permission: 'remoteWork.policy.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/remote-work-policy/:id/edit',
        loadComponent: () => import('./pages/settings/remote-work-policy/edit-remote-work-policy/edit-remote-work-policy.component').then(m => m.EditRemoteWorkPolicyComponent),
        data: {

          title: 'remoteWork.policy.edit_policy',
          permission: 'remoteWork.policy.update'
        },
        canMatch: [adminGuard]
      },
      // Excuse Policies Routes
      {
        path: 'settings/excuse-policies',
        loadComponent: () => import('./pages/settings/excuse-policies/excuse-policies.component').then(m => m.ExcusePoliciesComponent),
        data: {
          title: 'excuse_policies.title',
          permission: 'settings.excusePolicy.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/excuse-policies/create',
        loadComponent: () => import('./pages/settings/excuse-policies/create-excuse-policy/create-excuse-policy.component').then(m => m.CreateExcusePolicyComponent),
        data: {

          title: 'excuse_policies.create_policy',
          permission: 'settings.excusePolicy.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/excuse-policies/:id/view',
        loadComponent: () => import('./pages/settings/excuse-policies/view-excuse-policy/view-excuse-policy.component').then(m => m.ViewExcusePolicyComponent),
        data: {
          title: 'excuse_policies.view_policy',
          permission: 'settings.excusePolicy.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/excuse-policies/:id/edit',
        loadComponent: () => import('./pages/settings/excuse-policies/edit-excuse-policy/edit-excuse-policy.component').then(m => m.EditExcusePolicyComponent),
        data: {

          title: 'excuse_policies.edit_policy',
          permission: 'settings.excusePolicy.update'
        },
        canMatch: [adminGuard]
      },
      // Workflow Routes
      {
        path: 'settings/workflows',
        loadComponent: () => import('./pages/settings/workflows/workflow-list/workflow-list.component').then(m => m.WorkflowListComponent),
        data: {
          title: 'workflows.title',
          permission: 'workflow.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/workflows/create',
        loadComponent: () => import('./pages/settings/workflows/workflow-form/workflow-form.component').then(m => m.WorkflowFormComponent),
        data: {

          title: 'workflows.create_workflow',
          permission: 'workflow.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/workflows/:id/view',
        loadComponent: () => import('./pages/settings/workflows/workflow-form/workflow-form.component').then(m => m.WorkflowFormComponent),
        data: {
          title: 'workflows.view_workflow',
          permission: 'workflow.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/workflows/:id/edit',
        loadComponent: () => import('./pages/settings/workflows/workflow-form/workflow-form.component').then(m => m.WorkflowFormComponent),
        data: {

          title: 'workflows.edit_workflow',
          permission: 'workflow.update'
        },
        canMatch: [adminGuard]
      },
      // Leave Entitlements Routes
      {
        path: 'settings/leave-entitlements',
        loadComponent: () => import('./pages/settings/leave-balances/leave-entitlements-list/leave-entitlements-list.component').then(m => m.LeaveEntitlementsListComponent),
        data: {
          title: 'leaveBalance.leaveEntitlements',
          permission: 'leaveBalance.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'settings/leave-entitlements/create',
        loadComponent: () => import('./pages/settings/leave-balances/leave-entitlement-form/leave-entitlement-form.component').then(m => m.LeaveEntitlementFormComponent),
        data: {

          title: 'leaveBalance.createEntitlementTitle',
          permission: 'leaveBalance.create'
        },
        canMatch: [authGuard]
      },
      {
        path: 'settings/leave-entitlements/edit/:id',
        loadComponent: () => import('./pages/settings/leave-balances/leave-entitlement-form/leave-entitlement-form.component').then(m => m.LeaveEntitlementFormComponent),
        data: {

          title: 'leaveBalance.editEntitlementTitle',
          permission: 'leaveBalance.update'
        },
        canMatch: [authGuard]
      },
      // Approvals Routes
      {
        path: 'approvals',
        loadComponent: () => import('./pages/approvals/pending-approvals/pending-approvals.component').then(m => m.PendingApprovalsComponent),
        data: {
          title: 'approvals.pending_title',
          permission: 'approval.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'approvals/history',
        loadComponent: () => import('./pages/approvals/approval-history/approval-history.component').then(m => m.ApprovalHistoryComponent),
        data: {
          title: 'approvals.history_title',
          permission: 'approval.read'
        },
        canMatch: [authGuard]
      },
      // Reports Routes
      {
        path: 'reports/sessions',
        loadComponent: () => import('./pages/reports/sessions/sessions.component').then(m => m.SessionsComponent),
        data: {
          title: 'sessions.title',
          permission: 'session.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'reports/audit-logs',
        loadComponent: () => import('./pages/reports/audit-logs/audit-logs.component').then(m => m.AuditLogsComponent),
        data: {
          title: 'audit_logs.title',
          permission: 'audit.read'
        },
        canMatch: [adminGuard]
      },
      // ============================================================
      // Phase 7: Leave Management
      // ============================================================
      {
        path: 'leave-management/compensatory-offs',
        loadComponent: () => import('./pages/leave-management/compensatory-offs/compensatory-offs.component').then(m => m.CompensatoryOffsComponent),
        data: { title: 'compensatoryOff.title', permission: 'compensatoryOff.read' },
        canMatch: [authGuard]
      },
      {
        path: 'leave-management/compensatory-offs/create',
        loadComponent: () => import('./pages/leave-management/compensatory-offs/create-compensatory-off/create-compensatory-off.component').then(m => m.CreateCompensatoryOffComponent),
        data: {title: 'compensatoryOff.create', permission: 'compensatoryOff.create' },
        canMatch: [authGuard]
      },
      {
        path: 'leave-management/compensatory-offs/:id/view',
        loadComponent: () => import('./pages/leave-management/compensatory-offs/view-compensatory-off/view-compensatory-off.component').then(m => m.ViewCompensatoryOffComponent),
        data: { title: 'compensatoryOff.view', permission: 'compensatoryOff.read' },
        canMatch: [authGuard]
      },
      {
        path: 'leave-management/leave-encashments',
        loadComponent: () => import('./pages/leave-management/leave-encashments/leave-encashments.component').then(m => m.LeaveEncashmentsComponent),
        data: { title: 'leaveEncashment.title', permission: 'leaveEncashment.read' },
        canMatch: [authGuard]
      },
      {
        path: 'leave-management/leave-encashments/:id/view',
        loadComponent: () => import('./pages/leave-management/leave-encashments/view-leave-encashment/view-leave-encashment.component').then(m => m.ViewLeaveEncashmentComponent),
        data: { title: 'leaveEncashment.view', permission: 'leaveEncashment.read' },
        canMatch: [authGuard]
      },

      // ============================================================
      // Phase 7: Reports - Payroll, Compliance, Custom Reports
      // ============================================================
      {
        path: 'reports/payroll',
        loadComponent: () => import('./pages/reports/payroll-reports/payroll-reports.component').then(m => m.PayrollReportsComponent),
        data: { title: 'reports.payroll.title', permission: 'payroll.read' },
        canMatch: [authGuard]
      },
      {
        path: 'reports/compliance',
        loadComponent: () => import('./pages/reports/compliance-reports/compliance-reports.component').then(m => m.ComplianceReportsComponent),
        data: { title: 'reports.compliance.title', permission: 'attendance.read' },
        canMatch: [authGuard]
      },
      {
        path: 'reports/custom-reports',
        loadComponent: () => import('./pages/reports/custom-reports/custom-reports.component').then(m => m.CustomReportsComponent),
        data: { title: 'customReports.title', permission: 'customReport.read' },
        canMatch: [authGuard]
      },
      {
        path: 'reports/custom-reports/create',
        loadComponent: () => import('./pages/reports/custom-reports/create-custom-report/create-custom-report.component').then(m => m.CreateCustomReportComponent),
        data: {title: 'customReports.create', permission: 'customReport.create' },
        canMatch: [authGuard]
      },
      {
        path: 'reports/custom-reports/:id/view',
        loadComponent: () => import('./pages/reports/custom-reports/view-custom-report/view-custom-report.component').then(m => m.ViewCustomReportComponent),
        data: { title: 'customReports.view', permission: 'customReport.read' },
        canMatch: [authGuard]
      },
      {
        path: 'reports/custom-reports/:id/edit',
        loadComponent: () => import('./pages/reports/custom-reports/create-custom-report/create-custom-report.component').then(m => m.CreateCustomReportComponent),
        data: {title: 'customReports.edit', permission: 'customReport.update' },
        canMatch: [authGuard]
      },

      // Notification Broadcast Routes
      {
        path: 'notifications/send',
        loadComponent: () => import('./pages/notifications/send-notification.component').then(m => m.SendNotificationComponent),
        data: {
          title: 'notifications.send_notification',
          permission: 'notification.broadcast'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'notifications/history',
        loadComponent: () => import('./pages/notifications/broadcast-history.component').then(m => m.BroadcastHistoryComponent),
        data: {
          title: 'notifications.broadcast_history',
          permission: 'notification.broadcast'
        },
        canMatch: [adminGuard]
      },
      // NFC Tags Routes
      {
        path: 'nfc-tags',
        loadComponent: () => import('./pages/nfc-tags/nfc-tags.component').then(m => m.NfcTagsComponent),
        data: {
          title: 'nfc_tags.title',
          permission: 'branch.management'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'nfc-tags/create',
        loadComponent: () => import('./pages/nfc-tags/nfc-tag-form/nfc-tag-form.component').then(m => m.NfcTagFormComponent),
        data: {

          title: 'nfc_tags.register_tag',
          permission: 'branch.management'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'nfc-tags/:id/view',
        loadComponent: () => import('./pages/nfc-tags/view-nfc-tag/view-nfc-tag.component').then(m => m.ViewNfcTagComponent),
        data: {
          title: 'nfc_tags.view_tag',
          permission: 'branch.management'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'nfc-tags/:id/edit',
        loadComponent: () => import('./pages/nfc-tags/nfc-tag-form/nfc-tag-form.component').then(m => m.NfcTagFormComponent),
        data: {

          title: 'nfc_tags.edit_tag',
          permission: 'branch.management'
        },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 1: Employee Lifecycle
      // ============================================================
      {
        path: 'employee-contracts',
        loadComponent: () => import('./pages/employee-contracts/employee-contracts.component').then(m => m.EmployeeContractsComponent),
        data: { title: 'employee_contracts.title', permission: 'contract.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-contracts/create',
        loadComponent: () => import('./pages/employee-contracts/create-contract/create-contract.component').then(m => m.CreateContractComponent),
        data: {title: 'employee_contracts.create', permission: 'contract.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-contracts/:id/view',
        loadComponent: () => import('./pages/employee-contracts/view-contract/view-contract.component').then(m => m.ViewContractComponent),
        data: { title: 'employee_contracts.view', permission: 'contract.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-contracts/:id/edit',
        loadComponent: () => import('./pages/employee-contracts/create-contract/create-contract.component').then(m => m.CreateContractComponent),
        data: {title: 'employee_contracts.edit', permission: 'contract.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-transfers',
        loadComponent: () => import('./pages/employee-transfers/employee-transfers.component').then(m => m.EmployeeTransfersComponent),
        data: { title: 'employee_transfers.title', permission: 'transfer.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-transfers/create',
        loadComponent: () => import('./pages/employee-transfers/create-transfer/create-transfer.component').then(m => m.CreateTransferComponent),
        data: {title: 'employee_transfers.create', permission: 'transfer.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-transfers/:id/view',
        loadComponent: () => import('./pages/employee-transfers/view-transfer/view-transfer.component').then(m => m.ViewTransferComponent),
        data: { title: 'employee_transfers.view', permission: 'transfer.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-transfers/:id/edit',
        loadComponent: () => import('./pages/employee-transfers/create-transfer/create-transfer.component').then(m => m.CreateTransferComponent),
        data: {title: 'employee_transfers.edit', permission: 'transfer.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-promotions',
        loadComponent: () => import('./pages/employee-promotions/employee-promotions.component').then(m => m.EmployeePromotionsComponent),
        data: { title: 'employee_promotions.title', permission: 'promotion.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-promotions/create',
        loadComponent: () => import('./pages/employee-promotions/create-promotion/create-promotion.component').then(m => m.CreatePromotionComponent),
        data: {title: 'employee_promotions.create', permission: 'promotion.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-promotions/:id/view',
        loadComponent: () => import('./pages/employee-promotions/view-promotion/view-promotion.component').then(m => m.ViewPromotionComponent),
        data: { title: 'employee_promotions.view', permission: 'promotion.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-promotions/:id/edit',
        loadComponent: () => import('./pages/employee-promotions/create-promotion/create-promotion.component').then(m => m.CreatePromotionComponent),
        data: {title: 'employee_promotions.edit', permission: 'promotion.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'salary-adjustments',
        loadComponent: () => import('./pages/salary-adjustments/salary-adjustments.component').then(m => m.SalaryAdjustmentsComponent),
        data: { title: 'salary_adjustments.title', permission: 'salaryAdjustment.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'salary-adjustments/create',
        loadComponent: () => import('./pages/salary-adjustments/create-adjustment/create-adjustment.component').then(m => m.CreateAdjustmentComponent),
        data: {title: 'salary_adjustments.create', permission: 'salaryAdjustment.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'salary-adjustments/:id/view',
        loadComponent: () => import('./pages/salary-adjustments/view-adjustment/view-adjustment.component').then(m => m.ViewAdjustmentComponent),
        data: { title: 'salary_adjustments.view', permission: 'salaryAdjustment.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'salary-adjustments/:id/edit',
        loadComponent: () => import('./pages/salary-adjustments/create-adjustment/create-adjustment.component').then(m => m.CreateAdjustmentComponent),
        data: {title: 'salary_adjustments.edit', permission: 'salaryAdjustment.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'job-grades',
        loadComponent: () => import('./pages/job-grades/job-grades.component').then(m => m.JobGradesComponent),
        data: { title: 'job_grades.title', permission: 'jobGrade.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'job-grades/create',
        loadComponent: () => import('./pages/job-grades/create-grade/create-grade.component').then(m => m.CreateGradeComponent),
        data: {title: 'job_grades.create', permission: 'jobGrade.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'job-grades/:id/view',
        loadComponent: () => import('./pages/job-grades/view-grade/view-grade.component').then(m => m.ViewGradeComponent),
        data: { title: 'job_grades.view', permission: 'jobGrade.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'job-grades/:id/edit',
        loadComponent: () => import('./pages/job-grades/create-grade/create-grade.component').then(m => m.CreateGradeComponent),
        data: {title: 'job_grades.edit', permission: 'jobGrade.update' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 1: Payroll
      // ============================================================
      {
        path: 'payroll/salary-structures',
        loadComponent: () => import('./pages/payroll/salary-structures/salary-structures.component').then(m => m.SalaryStructuresComponent),
        data: { title: 'payroll.salary_structures.title', permission: 'salaryStructure.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'payroll/salary-structures/create',
        loadComponent: () => import('./pages/payroll/salary-structures/create-salary-structure/create-salary-structure.component').then(m => m.CreateSalaryStructureComponent),
        data: {title: 'payroll.salary_structures.create', permission: 'salaryStructure.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'payroll/salary-structures/:id/view',
        loadComponent: () => import('./pages/payroll/salary-structures/view-salary-structure/view-salary-structure.component').then(m => m.ViewSalaryStructureComponent),
        data: { title: 'payroll.salary_structures.view', permission: 'salaryStructure.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'payroll/salary-structures/:id/edit',
        loadComponent: () => import('./pages/payroll/salary-structures/create-salary-structure/create-salary-structure.component').then(m => m.CreateSalaryStructureComponent),
        data: {title: 'payroll.salary_structures.edit', permission: 'salaryStructure.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'payroll/periods',
        loadComponent: () => import('./pages/payroll/payroll-periods/payroll-periods.component').then(m => m.PayrollPeriodsComponent),
        data: { title: 'payroll.periods.title', permission: 'payroll.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'payroll/periods/create',
        loadComponent: () => import('./pages/payroll/payroll-periods/create-payroll-period/create-payroll-period.component').then(m => m.CreatePayrollPeriodComponent),
        data: {title: 'payroll.periods.create', permission: 'payroll.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'payroll/periods/:id/view',
        loadComponent: () => import('./pages/payroll/payroll-periods/view-payroll-period/view-payroll-period.component').then(m => m.ViewPayrollPeriodComponent),
        data: { title: 'payroll.periods.view', permission: 'payroll.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'payroll/periods/:id/edit',
        loadComponent: () => import('./pages/payroll/payroll-periods/create-payroll-period/create-payroll-period.component').then(m => m.CreatePayrollPeriodComponent),
        data: {title: 'payroll.periods.edit', permission: 'payroll.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'payroll/settings',
        loadComponent: () => import('./pages/payroll/payroll-settings/payroll-settings.component').then(m => m.PayrollSettingsComponent),
        data: { title: 'payroll.settings.title', permission: 'payroll.manage' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 1: Offboarding
      // ============================================================
      {
        path: 'offboarding/resignations',
        loadComponent: () => import('./pages/offboarding/resignation-requests/resignation-requests.component').then(m => m.ResignationRequestsComponent),
        data: { title: 'offboarding.resignations.title', permission: 'resignation.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'offboarding/resignations/:id/view',
        loadComponent: () => import('./pages/offboarding/resignation-requests/view-resignation/view-resignation.component').then(m => m.ViewResignationComponent),
        data: { title: 'offboarding.resignations.view', permission: 'resignation.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'offboarding/terminations',
        loadComponent: () => import('./pages/offboarding/terminations/terminations.component').then(m => m.TerminationsComponent),
        data: { title: 'offboarding.terminations.title', permission: 'termination.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'offboarding/terminations/create',
        loadComponent: () => import('./pages/offboarding/terminations/create-termination/create-termination.component').then(m => m.CreateTerminationComponent),
        data: {title: 'offboarding.terminations.create', permission: 'termination.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'offboarding/terminations/:id/view',
        loadComponent: () => import('./pages/offboarding/terminations/view-termination/view-termination.component').then(m => m.ViewTerminationComponent),
        data: { title: 'offboarding.terminations.view', permission: 'termination.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'offboarding/terminations/:id/edit',
        loadComponent: () => import('./pages/offboarding/terminations/create-termination/create-termination.component').then(m => m.CreateTerminationComponent),
        data: {title: 'offboarding.terminations.edit', permission: 'termination.manage' },
        canMatch: [adminGuard]
      },

      // --- Offboarding Overview Pages ---
      {
        path: 'offboarding/pending-clearance',
        loadComponent: () => import('./pages/offboarding/pending-clearance/pending-clearance.component').then(m => m.PendingClearanceComponent),
        data: { title: 'offboarding.pending_clearance.title', permission: 'clearance.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'offboarding/final-settlements',
        loadComponent: () => import('./pages/offboarding/final-settlements/final-settlements.component').then(m => m.FinalSettlementsComponent),
        data: { title: 'offboarding.final_settlements.title', permission: 'finalSettlement.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Benefits Administration
      // ============================================================
      {
        path: 'benefits/plans',
        loadComponent: () => import('./pages/benefits/plans/benefit-plans.component').then(m => m.BenefitPlansComponent),
        data: { title: 'benefits.plans.title', permission: 'benefitPlan.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/plans/create',
        loadComponent: () => import('./pages/benefits/plans/create-plan/create-plan.component').then(m => m.CreatePlanComponent),
        data: {title: 'benefits.plans.create', permission: 'benefitPlan.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/plans/:id/view',
        loadComponent: () => import('./pages/benefits/plans/view-plan/view-plan.component').then(m => m.ViewPlanComponent),
        data: { title: 'benefits.plans.view', permission: 'benefitPlan.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/plans/:id/edit',
        loadComponent: () => import('./pages/benefits/plans/create-plan/create-plan.component').then(m => m.CreatePlanComponent),
        data: {title: 'benefits.plans.edit', permission: 'benefitPlan.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/enrollment-periods',
        loadComponent: () => import('./pages/benefits/enrollment-periods/enrollment-periods.component').then(m => m.EnrollmentPeriodsComponent),
        data: { title: 'benefits.periods.title', permission: 'openEnrollmentPeriod.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/enrollment-periods/create',
        loadComponent: () => import('./pages/benefits/enrollment-periods/create-enrollment-period/create-enrollment-period.component').then(m => m.CreateEnrollmentPeriodComponent),
        data: {title: 'benefits.periods.create', permission: 'openEnrollmentPeriod.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/enrollment-periods/:id/view',
        loadComponent: () => import('./pages/benefits/enrollment-periods/view-enrollment-period/view-enrollment-period.component').then(m => m.ViewEnrollmentPeriodComponent),
        data: { title: 'benefits.periods.view', permission: 'openEnrollmentPeriod.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/enrollment-periods/:id/edit',
        loadComponent: () => import('./pages/benefits/enrollment-periods/create-enrollment-period/create-enrollment-period.component').then(m => m.CreateEnrollmentPeriodComponent),
        data: {title: 'benefits.periods.edit', permission: 'openEnrollmentPeriod.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/enrollments',
        loadComponent: () => import('./pages/benefits/enrollments/benefit-enrollments.component').then(m => m.BenefitEnrollmentsComponent),
        data: { title: 'benefits.enrollments.title', permission: 'benefitEnrollment.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/enrollments/:id/view',
        loadComponent: () => import('./pages/benefits/enrollments/view-enrollment/view-enrollment.component').then(m => m.ViewEnrollmentComponent),
        data: { title: 'benefits.enrollments.view', permission: 'benefitEnrollment.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/claims',
        loadComponent: () => import('./pages/benefits/claims/benefit-claims.component').then(m => m.BenefitClaimsComponent),
        data: { title: 'benefits.claims.title', permission: 'benefitClaim.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'benefits/claims/:id/view',
        loadComponent: () => import('./pages/benefits/claims/view-claim/view-claim.component').then(m => m.ViewClaimComponent),
        data: { title: 'benefits.claims.view', permission: 'benefitClaim.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Allowance Management
      // ============================================================
      {
        path: 'settings/allowance-types',
        loadComponent: () => import('./pages/settings/allowance-types/allowance-types.component').then(m => m.AllowanceTypesComponent),
        data: { title: 'allowance_types.title', permission: 'allowanceType.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/allowance-types/create',
        loadComponent: () => import('./pages/settings/allowance-types/create-allowance-type/create-allowance-type.component').then(m => m.CreateAllowanceTypeComponent),
        data: {title: 'allowance_types.create', permission: 'allowanceType.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/allowance-types/:id/view',
        loadComponent: () => import('./pages/settings/allowance-types/view-allowance-type/view-allowance-type.component').then(m => m.ViewAllowanceTypeComponent),
        data: { title: 'allowance_types.view', permission: 'allowanceType.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/allowance-types/:id/edit',
        loadComponent: () => import('./pages/settings/allowance-types/create-allowance-type/create-allowance-type.component').then(m => m.CreateAllowanceTypeComponent),
        data: {title: 'allowance_types.edit', permission: 'allowanceType.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/allowance-policies',
        loadComponent: () => import('./pages/settings/allowance-policies/allowance-policies.component').then(m => m.AllowancePoliciesComponent),
        data: { title: 'allowance_policies.title', permission: 'allowancePolicy.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/allowance-policies/create',
        loadComponent: () => import('./pages/settings/allowance-policies/create-allowance-policy/create-allowance-policy.component').then(m => m.CreateAllowancePolicyComponent),
        data: {title: 'allowance_policies.create', permission: 'allowancePolicy.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/allowance-policies/:id/view',
        loadComponent: () => import('./pages/settings/allowance-policies/view-allowance-policy/view-allowance-policy.component').then(m => m.ViewAllowancePolicyComponent),
        data: { title: 'allowance_policies.view', permission: 'allowancePolicy.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'settings/allowance-policies/:id/edit',
        loadComponent: () => import('./pages/settings/allowance-policies/create-allowance-policy/create-allowance-policy.component').then(m => m.CreateAllowancePolicyComponent),
        data: {title: 'allowance_policies.edit', permission: 'allowancePolicy.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'allowances',
        loadComponent: () => import('./pages/allowances/allowances.component').then(m => m.AllowancesComponent),
        data: { title: 'allowance_assignments.title', permission: 'allowanceAssignment.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'allowances/assign',
        loadComponent: () => import('./pages/allowances/assign-allowance/assign-allowance.component').then(m => m.AssignAllowanceComponent),
        data: {title: 'allowance_assignments.assign', permission: 'allowanceAssignment.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'allowances/:id/view',
        loadComponent: () => import('./pages/allowances/view-allowance/view-allowance.component').then(m => m.ViewAllowanceComponent),
        data: { title: 'allowance_assignments.view', permission: 'allowanceAssignment.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'allowance-requests',
        loadComponent: () => import('./pages/allowance-requests/allowance-requests.component').then(m => m.AllowanceRequestsComponent),
        data: { title: 'allowance_requests.title', permission: 'allowanceRequest.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'allowance-requests/:id/view',
        loadComponent: () => import('./pages/allowance-requests/view-allowance-request/view-allowance-request.component').then(m => m.ViewAllowanceRequestComponent),
        data: { title: 'allowance_requests.view', permission: 'allowanceRequest.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 2: Recruitment
      // ============================================================
      {
        path: 'recruitment/requisitions',
        loadComponent: () => import('./pages/recruitment/job-requisitions/job-requisitions.component').then(m => m.JobRequisitionsComponent),
        data: { title: 'job_requisitions.title', permission: 'jobRequisition.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/requisitions/create',
        loadComponent: () => import('./pages/recruitment/job-requisitions/create-requisition/create-requisition.component').then(m => m.CreateRequisitionComponent),
        data: {title: 'job_requisitions.create', permission: 'jobRequisition.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/requisitions/:id/view',
        loadComponent: () => import('./pages/recruitment/job-requisitions/view-requisition/view-requisition.component').then(m => m.ViewRequisitionComponent),
        data: { title: 'job_requisitions.view', permission: 'jobRequisition.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/requisitions/:id/edit',
        loadComponent: () => import('./pages/recruitment/job-requisitions/create-requisition/create-requisition.component').then(m => m.CreateRequisitionComponent),
        data: {title: 'job_requisitions.edit', permission: 'jobRequisition.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/postings',
        loadComponent: () => import('./pages/recruitment/job-postings/job-postings.component').then(m => m.JobPostingsComponent),
        data: { title: 'job_postings.title', permission: 'jobPosting.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/postings/create',
        loadComponent: () => import('./pages/recruitment/job-postings/create-posting/create-posting.component').then(m => m.CreatePostingComponent),
        data: {title: 'job_postings.create', permission: 'jobPosting.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/postings/:id/view',
        loadComponent: () => import('./pages/recruitment/job-postings/view-posting/view-posting.component').then(m => m.ViewPostingComponent),
        data: { title: 'job_postings.view', permission: 'jobPosting.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/postings/:id/edit',
        loadComponent: () => import('./pages/recruitment/job-postings/create-posting/create-posting.component').then(m => m.CreatePostingComponent),
        data: {title: 'job_postings.edit', permission: 'jobPosting.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/candidates',
        loadComponent: () => import('./pages/recruitment/candidates/candidates.component').then(m => m.CandidatesComponent),
        data: { title: 'candidates.title', permission: 'candidate.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/candidates/:id/view',
        loadComponent: () => import('./pages/recruitment/candidates/view-candidate/view-candidate.component').then(m => m.ViewCandidateComponent),
        data: { title: 'candidates.view', permission: 'candidate.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/candidates/create',
        loadComponent: () => import('./pages/recruitment/candidates/create-candidate/create-candidate.component').then(m => m.CreateCandidateComponent),
        data: {title: 'candidates.create', permission: 'candidate.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/candidates/:id/edit',
        loadComponent: () => import('./pages/recruitment/candidates/create-candidate/create-candidate.component').then(m => m.CreateCandidateComponent),
        data: {title: 'candidates.edit', permission: 'candidate.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/applications',
        loadComponent: () => import('./pages/recruitment/applications/applications.component').then(m => m.ApplicationsComponent),
        data: { title: 'job_applications.title', permission: 'jobApplication.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/applications/:id/view',
        loadComponent: () => import('./pages/recruitment/applications/view-application/view-application.component').then(m => m.ViewApplicationComponent),
        data: { title: 'job_applications.view', permission: 'jobApplication.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/offers',
        loadComponent: () => import('./pages/recruitment/offers/offers.component').then(m => m.OffersComponent),
        data: { title: 'offer_letters.title', permission: 'offerLetter.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/offers/:id/view',
        loadComponent: () => import('./pages/recruitment/offers/view-offer/view-offer.component').then(m => m.ViewOfferComponent),
        data: { title: 'offer_letters.view', permission: 'offerLetter.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/offers/create',
        loadComponent: () => import('./pages/recruitment/offers/view-offer/view-offer.component').then(m => m.ViewOfferComponent),
        data: {title: 'offer_letters.create', permission: 'offerLetter.create' },
        canMatch: [adminGuard]
      },

      // --- Interviews ---
      {
        path: 'recruitment/interviews',
        loadComponent: () => import('./pages/recruitment/interviews/interviews.component').then(m => m.InterviewsComponent),
        data: { title: 'interviews.title', permission: 'interview.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/interviews/create',
        loadComponent: () => import('./pages/recruitment/interviews/create-interview/create-interview.component').then(m => m.CreateInterviewComponent),
        data: {title: 'interviews.create', permission: 'interview.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/interviews/:id/view',
        loadComponent: () => import('./pages/recruitment/interviews/view-interview/view-interview.component').then(m => m.ViewInterviewComponent),
        data: { title: 'interviews.view', permission: 'interview.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'recruitment/interviews/:id/edit',
        loadComponent: () => import('./pages/recruitment/interviews/create-interview/create-interview.component').then(m => m.CreateInterviewComponent),
        data: {title: 'interviews.edit', permission: 'interview.manage' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 2: Onboarding
      // ============================================================
      {
        path: 'onboarding/templates',
        loadComponent: () => import('./pages/onboarding/templates/templates.component').then(m => m.OnboardingTemplatesComponent),
        data: { title: 'onboarding_templates.title', permission: 'onboardingTemplate.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'onboarding/templates/create',
        loadComponent: () => import('./pages/onboarding/templates/create-template/create-template.component').then(m => m.CreateOnboardingTemplateComponent),
        data: {title: 'onboarding_templates.create', permission: 'onboardingTemplate.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'onboarding/templates/:id/view',
        loadComponent: () => import('./pages/onboarding/templates/view-template/view-template.component').then(m => m.ViewOnboardingTemplateComponent),
        data: { title: 'onboarding_templates.view', permission: 'onboardingTemplate.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'onboarding/templates/:id/edit',
        loadComponent: () => import('./pages/onboarding/templates/create-template/create-template.component').then(m => m.CreateOnboardingTemplateComponent),
        data: {title: 'onboarding_templates.edit', permission: 'onboardingTemplate.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'onboarding/processes',
        loadComponent: () => import('./pages/onboarding/processes/processes.component').then(m => m.OnboardingProcessesComponent),
        data: { title: 'onboarding_processes.title', permission: 'onboarding.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'onboarding/processes/create',
        loadComponent: () => import('./pages/onboarding/processes/processes.component').then(m => m.OnboardingProcessesComponent),
        data: {title: 'onboarding_processes.create', permission: 'onboarding.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'onboarding/processes/:id/view',
        loadComponent: () => import('./pages/onboarding/processes/view-process/view-process.component').then(m => m.ViewOnboardingProcessComponent),
        data: { title: 'onboarding_processes.view', permission: 'onboarding.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'onboarding/dashboard',
        loadComponent: () => import('./pages/onboarding/dashboard/onboarding-dashboard.component').then(m => m.OnboardingDashboardComponent),
        data: { title: 'onboarding_processes.dashboard', permission: 'onboarding.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 2: Performance Management
      // ============================================================
      {
        path: 'performance/cycles',
        loadComponent: () => import('./pages/performance/cycles/cycles.component').then(m => m.PerformanceCyclesComponent),
        data: { title: 'performance_cycles.title', permission: 'performanceReviewCycle.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/cycles/create',
        loadComponent: () => import('./pages/performance/cycles/create-cycle/create-cycle.component').then(m => m.CreateCycleComponent),
        data: {title: 'performance_cycles.create', permission: 'performanceReviewCycle.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/cycles/:id/view',
        loadComponent: () => import('./pages/performance/cycles/view-cycle/view-cycle.component').then(m => m.ViewCycleComponent),
        data: { title: 'performance_cycles.view', permission: 'performanceReviewCycle.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/cycles/:id/edit',
        loadComponent: () => import('./pages/performance/cycles/create-cycle/create-cycle.component').then(m => m.CreateCycleComponent),
        data: {title: 'performance_cycles.edit', permission: 'performanceReviewCycle.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/reviews',
        loadComponent: () => import('./pages/performance/reviews/reviews.component').then(m => m.PerformanceReviewsComponent),
        data: { title: 'performance_reviews.title', permission: 'performanceReview.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/reviews/:id/view',
        loadComponent: () => import('./pages/performance/reviews/view-review/view-review.component').then(m => m.ViewReviewComponent),
        data: { title: 'performance_reviews.view', permission: 'performanceReview.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/goals',
        loadComponent: () => import('./pages/performance/goals/goals.component').then(m => m.GoalsComponent),
        data: { title: 'goals.title', permission: 'goal.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/goals/create',
        loadComponent: () => import('./pages/performance/goals/create-goal/create-goal.component').then(m => m.CreateGoalComponent),
        data: {title: 'goals.create', permission: 'goal.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/goals/:id/view',
        loadComponent: () => import('./pages/performance/goals/view-goal/view-goal.component').then(m => m.ViewGoalComponent),
        data: { title: 'goals.view', permission: 'goal.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/goals/:id/edit',
        loadComponent: () => import('./pages/performance/goals/create-goal/create-goal.component').then(m => m.CreateGoalComponent),
        data: {title: 'goals.edit', permission: 'goal.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/competencies',
        loadComponent: () => import('./pages/performance/competency-frameworks/competency-frameworks.component').then(m => m.CompetencyFrameworksComponent),
        data: { title: 'competencies.title', permission: 'competencyFramework.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/competencies/create',
        loadComponent: () => import('./pages/performance/competency-frameworks/competency-frameworks.component').then(m => m.CompetencyFrameworksComponent),
        data: {title: 'competencies.create', permission: 'competencyFramework.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/competencies/:id/view',
        loadComponent: () => import('./pages/performance/competency-frameworks/competency-frameworks.component').then(m => m.CompetencyFrameworksComponent),
        data: { title: 'competencies.view', permission: 'competencyFramework.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/pips',
        loadComponent: () => import('./pages/performance/pips/pips.component').then(m => m.PipsComponent),
        data: { title: 'pips.title', permission: 'pip.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/pips/create',
        loadComponent: () => import('./pages/performance/pips/pips.component').then(m => m.PipsComponent),
        data: {title: 'pips.create', permission: 'pip.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/pips/:id/view',
        loadComponent: () => import('./pages/performance/pips/view-pip/view-pip.component').then(m => m.ViewPipComponent),
        data: { title: 'pips.view', permission: 'pip.read' },
        canMatch: [adminGuard]
      },

      // --- 360 Feedback ---
      {
        path: 'performance/feedback-requests',
        loadComponent: () => import('./pages/performance/feedback-requests/feedback-requests.component').then(m => m.FeedbackRequestsComponent),
        data: { title: 'feedback_360.title', permission: 'feedback360.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/feedback-requests/create',
        loadComponent: () => import('./pages/performance/feedback-requests/create-feedback-request/create-feedback-request.component').then(m => m.CreateFeedbackRequestComponent),
        data: {title: 'feedback_360.create', permission: 'feedback360.manage' },
        canMatch: [adminGuard]
      },
      {
        path: 'performance/feedback-requests/:id/view',
        loadComponent: () => import('./pages/performance/feedback-requests/view-feedback-request/view-feedback-request.component').then(m => m.ViewFeedbackRequestComponent),
        data: { title: 'feedback_360.view', permission: 'feedback360.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 6: Succession Planning & Talent Management
      // ============================================================
      {
        path: 'succession/key-positions',
        loadComponent: () => import('./pages/succession/key-positions/key-positions.component').then(m => m.KeyPositionsComponent),
        data: { title: 'succession.key_positions.title', permission: 'keyPosition.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/key-positions/create',
        loadComponent: () => import('./pages/succession/key-positions/create-key-position/create-key-position.component').then(m => m.CreateKeyPositionComponent),
        data: {title: 'succession.key_positions.create', permission: 'keyPosition.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/key-positions/:id/view',
        loadComponent: () => import('./pages/succession/key-positions/view-key-position/view-key-position.component').then(m => m.ViewKeyPositionComponent),
        data: { title: 'succession.key_positions.view', permission: 'keyPosition.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/key-positions/:id/edit',
        loadComponent: () => import('./pages/succession/key-positions/create-key-position/create-key-position.component').then(m => m.CreateKeyPositionComponent),
        data: {title: 'succession.key_positions.edit', permission: 'keyPosition.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/talent-profiles',
        loadComponent: () => import('./pages/succession/talent-profiles/talent-profiles.component').then(m => m.TalentProfilesComponent),
        data: { title: 'succession.talent_profiles.title', permission: 'talentProfile.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/talent-profiles/create',
        loadComponent: () => import('./pages/succession/talent-profiles/create-talent-profile/create-talent-profile.component').then(m => m.CreateTalentProfileComponent),
        data: {title: 'succession.talent_profiles.create', permission: 'talentProfile.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/talent-profiles/:id/view',
        loadComponent: () => import('./pages/succession/talent-profiles/view-talent-profile/view-talent-profile.component').then(m => m.ViewTalentProfileComponent),
        data: { title: 'succession.talent_profiles.view', permission: 'talentProfile.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/talent-profiles/:id/edit',
        loadComponent: () => import('./pages/succession/talent-profiles/create-talent-profile/create-talent-profile.component').then(m => m.CreateTalentProfileComponent),
        data: {title: 'succession.talent_profiles.edit', permission: 'talentProfile.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/plans',
        loadComponent: () => import('./pages/succession/succession-plans/succession-plans.component').then(m => m.SuccessionPlansComponent),
        data: { title: 'succession.plans.title', permission: 'successionPlan.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/plans/create',
        loadComponent: () => import('./pages/succession/succession-plans/create-succession-plan/create-succession-plan.component').then(m => m.CreateSuccessionPlanComponent),
        data: {title: 'succession.plans.create', permission: 'successionPlan.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/plans/:id/view',
        loadComponent: () => import('./pages/succession/succession-plans/view-succession-plan/view-succession-plan.component').then(m => m.ViewSuccessionPlanComponent),
        data: { title: 'succession.plans.view', permission: 'successionPlan.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/plans/:id/edit',
        loadComponent: () => import('./pages/succession/succession-plans/create-succession-plan/create-succession-plan.component').then(m => m.CreateSuccessionPlanComponent),
        data: {title: 'succession.plans.edit', permission: 'successionPlan.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/career-paths',
        loadComponent: () => import('./pages/succession/career-paths/career-paths.component').then(m => m.CareerPathsComponent),
        data: { title: 'succession.career_paths.title', permission: 'careerPath.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/career-paths/create',
        loadComponent: () => import('./pages/succession/career-paths/create-career-path/create-career-path.component').then(m => m.CreateCareerPathComponent),
        data: {title: 'succession.career_paths.create', permission: 'careerPath.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/career-paths/:id/view',
        loadComponent: () => import('./pages/succession/career-paths/view-career-path/view-career-path.component').then(m => m.ViewCareerPathComponent),
        data: { title: 'succession.career_paths.view', permission: 'careerPath.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/career-paths/:id/edit',
        loadComponent: () => import('./pages/succession/career-paths/create-career-path/create-career-path.component').then(m => m.CreateCareerPathComponent),
        data: {title: 'succession.career_paths.edit', permission: 'careerPath.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'succession/talent-pool',
        loadComponent: () => import('./pages/succession/talent-pool/talent-pool.component').then(m => m.TalentPoolComponent),
        data: { title: 'succession.talent_pool.title', permission: 'talentProfile.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 3: Document Management
      // ============================================================
      {
        path: 'documents/categories',
        loadComponent: () => import('./pages/documents/categories/document-categories.component').then(m => m.DocumentCategoriesComponent),
        data: { title: 'document_categories.title', permission: 'documentCategory.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/employee-documents',
        loadComponent: () => import('./pages/documents/employee-documents/employee-documents.component').then(m => m.EmployeeDocumentsComponent),
        data: { title: 'employee_documents.title', permission: 'employeeDocument.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/employee-documents/create',
        loadComponent: () => import('./pages/documents/employee-documents/create-document/create-document.component').then(m => m.CreateDocumentComponent),
        data: {title: 'employee_documents.create', permission: 'employeeDocument.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/employee-documents/:id/view',
        loadComponent: () => import('./pages/documents/employee-documents/view-document/view-document.component').then(m => m.ViewDocumentComponent),
        data: { title: 'employee_documents.view', permission: 'employeeDocument.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/company-policies',
        loadComponent: () => import('./pages/documents/company-policies/company-policies.component').then(m => m.CompanyPoliciesComponent),
        data: { title: 'company_policies.title', permission: 'companyPolicy.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/company-policies/create',
        loadComponent: () => import('./pages/documents/company-policies/create-policy/create-policy.component').then(m => m.CreatePolicyComponent),
        data: {title: 'company_policies.create', permission: 'companyPolicy.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/company-policies/:id/view',
        loadComponent: () => import('./pages/documents/company-policies/view-policy/view-policy.component').then(m => m.ViewPolicyComponent),
        data: { title: 'company_policies.view', permission: 'companyPolicy.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/company-policies/:id/edit',
        loadComponent: () => import('./pages/documents/company-policies/create-policy/create-policy.component').then(m => m.CreatePolicyComponent),
        data: {title: 'company_policies.edit', permission: 'companyPolicy.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/letter-templates',
        loadComponent: () => import('./pages/documents/letter-templates/letter-templates.component').then(m => m.LetterTemplatesComponent),
        data: { title: 'letter_templates.title', permission: 'letterTemplate.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/letter-templates/create',
        loadComponent: () => import('./pages/documents/letter-templates/create-template/create-template.component').then(m => m.CreateTemplateComponent),
        data: {title: 'letter_templates.create', permission: 'letterTemplate.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/letter-templates/:id/view',
        loadComponent: () => import('./pages/documents/letter-templates/view-template/view-template.component').then(m => m.ViewTemplateComponent),
        data: { title: 'letter_templates.view', permission: 'letterTemplate.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/letter-templates/:id/edit',
        loadComponent: () => import('./pages/documents/letter-templates/create-template/create-template.component').then(m => m.CreateTemplateComponent),
        data: {title: 'letter_templates.edit', permission: 'letterTemplate.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/letter-requests',
        loadComponent: () => import('./pages/documents/letter-requests/letter-requests.component').then(m => m.LetterRequestsComponent),
        data: { title: 'letter_requests.title', permission: 'letterRequest.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/letter-requests/create',
        loadComponent: () => import('./pages/documents/letter-requests/create-request/create-request.component').then(m => m.CreateRequestComponent),
        data: {title: 'letter_requests.create', permission: 'letterRequest.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'documents/letter-requests/:id/view',
        loadComponent: () => import('./pages/documents/letter-requests/view-request/view-request.component').then(m => m.ViewRequestComponent),
        data: { title: 'letter_requests.view', permission: 'letterRequest.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 3: Expense Management
      // ============================================================
      {
        path: 'expenses/categories',
        loadComponent: () => import('./pages/expenses/categories/expense-categories.component').then(m => m.ExpenseCategoriesComponent),
        data: { title: 'expense_categories.title', permission: 'expenseCategory.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'expenses/policies',
        loadComponent: () => import('./pages/expenses/policies/expense-policies.component').then(m => m.ExpensePoliciesComponent),
        data: { title: 'expense_policies.title', permission: 'expensePolicy.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'expenses/policies/create',
        loadComponent: () => import('./pages/expenses/policies/create-policy/create-expense-policy.component').then(m => m.CreateExpensePolicyComponent),
        data: {title: 'expense_policies.create', permission: 'expensePolicy.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'expenses/policies/:id/view',
        loadComponent: () => import('./pages/expenses/policies/view-policy/view-expense-policy.component').then(m => m.ViewExpensePolicyComponent),
        data: { title: 'expense_policies.view', permission: 'expensePolicy.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'expenses/policies/:id/edit',
        loadComponent: () => import('./pages/expenses/policies/create-policy/create-expense-policy.component').then(m => m.CreateExpensePolicyComponent),
        data: {title: 'expense_policies.edit', permission: 'expensePolicy.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'expenses/claims',
        loadComponent: () => import('./pages/expenses/claims/expense-claims.component').then(m => m.ExpenseClaimsComponent),
        data: { title: 'expense_claims.title', permission: 'expenseClaim.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'expenses/claims/create',
        loadComponent: () => import('./pages/expenses/claims/create-claim/create-claim.component').then(m => m.CreateClaimComponent),
        data: {title: 'expense_claims.create', permission: 'expenseClaim.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'expenses/claims/:id/view',
        loadComponent: () => import('./pages/expenses/claims/view-claim/view-claim.component').then(m => m.ViewClaimComponent),
        data: { title: 'expense_claims.view', permission: 'expenseClaim.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Phase 3: Loan Management
      // ============================================================
      {
        path: 'loans/types',
        loadComponent: () => import('./pages/loans/types/loan-types.component').then(m => m.LoanTypesComponent),
        data: { title: 'loan_types.title', permission: 'loanType.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'loans/policies',
        loadComponent: () => import('./pages/loans/policies/loan-policies.component').then(m => m.LoanPoliciesComponent),
        data: { title: 'loan_policies.title', permission: 'loanPolicy.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'loans/applications',
        loadComponent: () => import('./pages/loans/applications/loan-applications.component').then(m => m.LoanApplicationsComponent),
        data: { title: 'loan_applications.title', permission: 'loanApplication.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'loans/applications/create',
        loadComponent: () => import('./pages/loans/applications/create-application/create-application.component').then(m => m.CreateApplicationComponent),
        data: {title: 'loan_applications.create', permission: 'loanApplication.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'loans/applications/:id/view',
        loadComponent: () => import('./pages/loans/applications/view-application/view-application.component').then(m => m.ViewApplicationComponent),
        data: { title: 'loan_applications.view', permission: 'loanApplication.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'loans/salary-advances',
        loadComponent: () => import('./pages/loans/salary-advances/salary-advances.component').then(m => m.SalaryAdvancesComponent),
        data: { title: 'salary_advances.title', permission: 'salaryAdvance.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'loans/salary-advances/create',
        loadComponent: () => import('./pages/loans/salary-advances/create-advance/create-advance.component').then(m => m.CreateAdvanceComponent),
        data: {title: 'salary_advances.create', permission: 'salaryAdvance.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'loans/salary-advances/:id/view',
        loadComponent: () => import('./pages/loans/salary-advances/view-advance/view-advance.component').then(m => m.ViewAdvanceComponent),
        data: { title: 'salary_advances.view', permission: 'salaryAdvance.read' },
        canMatch: [adminGuard]
      },
      // ============================================================
      // Phase 3: Announcement Management
      // ============================================================
      {
        path: 'announcements/categories',
        loadComponent: () => import('./pages/announcements/categories/announcement-categories.component').then(m => m.AnnouncementCategoriesComponent),
        data: { title: 'announcement_categories.title', permission: 'announcementCategory.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'announcements',
        loadComponent: () => import('./pages/announcements/announcement-list/announcement-list.component').then(m => m.AnnouncementListComponent),
        data: { title: 'announcements.title', permission: 'announcement.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'announcements/create',
        loadComponent: () => import('./pages/announcements/create-announcement/create-announcement.component').then(m => m.CreateAnnouncementComponent),
        data: {title: 'announcements.create', permission: 'announcement.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'announcements/:id/view',
        loadComponent: () => import('./pages/announcements/view-announcement/view-announcement.component').then(m => m.ViewAnnouncementComponent),
        data: { title: 'announcements.view', permission: 'announcement.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'announcements/:id/edit',
        loadComponent: () => import('./pages/announcements/create-announcement/create-announcement.component').then(m => m.CreateAnnouncementComponent),
        data: {title: 'announcements.edit', permission: 'announcement.update' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Training & Development
      // ============================================================
      {
        path: 'training/categories',
        loadComponent: () => import('./pages/training/categories/training-categories.component').then(m => m.TrainingCategoriesComponent),
        data: { title: 'training_categories.title', permission: 'trainingCategory.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/courses',
        loadComponent: () => import('./pages/training/courses/training-courses.component').then(m => m.TrainingCoursesComponent),
        data: { title: 'training_courses.title', permission: 'trainingCourse.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/courses/create',
        loadComponent: () => import('./pages/training/courses/create-course/create-course.component').then(m => m.CreateCourseComponent),
        data: {title: 'training_courses.create', permission: 'trainingCourse.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/courses/:id/view',
        loadComponent: () => import('./pages/training/courses/view-course/view-course.component').then(m => m.ViewCourseComponent),
        data: { title: 'training_courses.view', permission: 'trainingCourse.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/courses/:id/edit',
        loadComponent: () => import('./pages/training/courses/create-course/create-course.component').then(m => m.CreateCourseComponent),
        data: {title: 'training_courses.edit', permission: 'trainingCourse.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/programs',
        loadComponent: () => import('./pages/training/programs/training-programs.component').then(m => m.TrainingProgramsComponent),
        data: { title: 'training_programs.title', permission: 'trainingProgram.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/programs/create',
        loadComponent: () => import('./pages/training/programs/create-program/create-program.component').then(m => m.CreateProgramComponent),
        data: {title: 'training_programs.create', permission: 'trainingProgram.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/programs/:id/view',
        loadComponent: () => import('./pages/training/programs/view-program/view-program.component').then(m => m.ViewProgramComponent),
        data: { title: 'training_programs.view', permission: 'trainingProgram.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/programs/:id/edit',
        loadComponent: () => import('./pages/training/programs/create-program/create-program.component').then(m => m.CreateProgramComponent),
        data: {title: 'training_programs.edit', permission: 'trainingProgram.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/sessions',
        loadComponent: () => import('./pages/training/sessions/training-sessions.component').then(m => m.TrainingSessionsComponent),
        data: { title: 'training_sessions.title', permission: 'trainingSession.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/sessions/create',
        loadComponent: () => import('./pages/training/sessions/create-session/create-session.component').then(m => m.CreateSessionComponent),
        data: {title: 'training_sessions.create', permission: 'trainingSession.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/sessions/:id/view',
        loadComponent: () => import('./pages/training/sessions/view-session/view-session.component').then(m => m.ViewSessionComponent),
        data: { title: 'training_sessions.view', permission: 'trainingSession.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/sessions/:id/edit',
        loadComponent: () => import('./pages/training/sessions/create-session/create-session.component').then(m => m.CreateSessionComponent),
        data: {title: 'training_sessions.edit', permission: 'trainingSession.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/enrollments',
        loadComponent: () => import('./pages/training/enrollments/training-enrollments.component').then(m => m.TrainingEnrollmentsComponent),
        data: { title: 'training_enrollments.title', permission: 'trainingEnrollment.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/certifications',
        loadComponent: () => import('./pages/training/certifications/certifications.component').then(m => m.CertificationsComponent),
        data: { title: 'certifications.title', permission: 'employeeCertification.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/certifications/create',
        loadComponent: () => import('./pages/training/certifications/create-certification/create-certification.component').then(m => m.CreateCertificationComponent),
        data: {title: 'certifications.create', permission: 'employeeCertification.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/certifications/:id/view',
        loadComponent: () => import('./pages/training/certifications/view-certification/view-certification.component').then(m => m.ViewCertificationComponent),
        data: { title: 'certifications.view', permission: 'employeeCertification.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/certifications/:id/edit',
        loadComponent: () => import('./pages/training/certifications/create-certification/create-certification.component').then(m => m.CreateCertificationComponent),
        data: {title: 'certifications.edit', permission: 'employeeCertification.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'training/budgets',
        loadComponent: () => import('./pages/training/budgets/training-budgets.component').then(m => m.TrainingBudgetsComponent),
        data: { title: 'training_budgets.title', permission: 'trainingBudget.read' },
        canMatch: [adminGuard]
      },

      // ============================================================
      // Employee Relations
      // ============================================================
      {
        path: 'employee-relations/grievances',
        loadComponent: () => import('./pages/employee-relations/grievances/grievances.component').then(m => m.GrievancesComponent),
        data: { title: 'grievances.title', permission: 'grievance.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/grievances/create',
        loadComponent: () => import('./pages/employee-relations/grievances/create-grievance/create-grievance.component').then(m => m.CreateGrievanceComponent),
        data: {title: 'grievances.create', permission: 'grievance.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/grievances/:id/view',
        loadComponent: () => import('./pages/employee-relations/grievances/view-grievance/view-grievance.component').then(m => m.ViewGrievanceComponent),
        data: { title: 'grievances.view', permission: 'grievance.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/grievances/:id/edit',
        loadComponent: () => import('./pages/employee-relations/grievances/create-grievance/create-grievance.component').then(m => m.CreateGrievanceComponent),
        data: {title: 'grievances.edit', permission: 'grievance.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/disciplinary-actions',
        loadComponent: () => import('./pages/employee-relations/disciplinary-actions/disciplinary-actions.component').then(m => m.DisciplinaryActionsComponent),
        data: { title: 'disciplinary_actions.title', permission: 'disciplinaryAction.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/disciplinary-actions/create',
        loadComponent: () => import('./pages/employee-relations/disciplinary-actions/create-action/create-action.component').then(m => m.CreateActionComponent),
        data: {title: 'disciplinary_actions.create', permission: 'disciplinaryAction.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/disciplinary-actions/:id/view',
        loadComponent: () => import('./pages/employee-relations/disciplinary-actions/view-action/view-action.component').then(m => m.ViewActionComponent),
        data: { title: 'disciplinary_actions.view', permission: 'disciplinaryAction.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/disciplinary-actions/:id/edit',
        loadComponent: () => import('./pages/employee-relations/disciplinary-actions/create-action/create-action.component').then(m => m.CreateActionComponent),
        data: {title: 'disciplinary_actions.edit', permission: 'disciplinaryAction.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/investigations',
        loadComponent: () => import('./pages/employee-relations/investigations/investigations.component').then(m => m.InvestigationsComponent),
        data: { title: 'investigations.title', permission: 'investigation.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/investigations/create',
        loadComponent: () => import('./pages/employee-relations/investigations/create-investigation/create-investigation.component').then(m => m.CreateInvestigationComponent),
        data: {title: 'investigations.create', permission: 'investigation.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/investigations/:id/view',
        loadComponent: () => import('./pages/employee-relations/investigations/view-investigation/view-investigation.component').then(m => m.ViewInvestigationComponent),
        data: { title: 'investigations.view', permission: 'investigation.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/investigations/:id/edit',
        loadComponent: () => import('./pages/employee-relations/investigations/create-investigation/create-investigation.component').then(m => m.CreateInvestigationComponent),
        data: {title: 'investigations.edit', permission: 'investigation.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/counseling',
        loadComponent: () => import('./pages/employee-relations/counseling/counseling.component').then(m => m.CounselingComponent),
        data: { title: 'counseling_records.title', permission: 'counselingRecord.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/counseling/create',
        loadComponent: () => import('./pages/employee-relations/counseling/create-counseling/create-counseling.component').then(m => m.CreateCounselingComponent),
        data: {title: 'counseling_records.create', permission: 'counselingRecord.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/counseling/:id/view',
        loadComponent: () => import('./pages/employee-relations/counseling/view-counseling/view-counseling.component').then(m => m.ViewCounselingComponent),
        data: { title: 'counseling_records.view', permission: 'counselingRecord.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'employee-relations/counseling/:id/edit',
        loadComponent: () => import('./pages/employee-relations/counseling/create-counseling/create-counseling.component').then(m => m.CreateCounselingComponent),
        data: {title: 'counseling_records.edit', permission: 'counselingRecord.update' },
        canMatch: [adminGuard]
      },
      // Asset Management
      {
        path: 'assets/categories',
        loadComponent: () => import('./pages/assets/categories/asset-categories.component').then(m => m.AssetCategoriesComponent),
        data: { title: 'assets.categories.title', permission: 'assetCategory.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'assets',
        loadComponent: () => import('./pages/assets/asset-list/asset-list.component').then(m => m.AssetListComponent),
        data: { title: 'assets.title', permission: 'asset.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'assets/create',
        loadComponent: () => import('./pages/assets/create-asset/create-asset.component').then(m => m.CreateAssetComponent),
        data: {title: 'assets.create', permission: 'asset.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'assets/assignments',
        loadComponent: () => import('./pages/assets/assignments/asset-assignments.component').then(m => m.AssetAssignmentsComponent),
        data: { title: 'assets.assignments.title', permission: 'assetAssignment.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'assets/assignments/create',
        loadComponent: () => import('./pages/assets/create-assignment/create-assignment.component').then(m => m.CreateAssignmentComponent),
        data: {title: 'assets.assignments.create', permission: 'assetAssignment.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'assets/maintenance',
        loadComponent: () => import('./pages/assets/maintenance/asset-maintenance.component').then(m => m.AssetMaintenanceComponent),
        data: { title: 'assets.maintenance.title', permission: 'assetMaintenance.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'assets/:id/view',
        loadComponent: () => import('./pages/assets/view-asset/view-asset.component').then(m => m.ViewAssetComponent),
        data: { title: 'assets.view', permission: 'asset.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'assets/:id/edit',
        loadComponent: () => import('./pages/assets/create-asset/create-asset.component').then(m => m.CreateAssetComponent),
        data: {title: 'assets.edit', permission: 'asset.update' },
        canMatch: [adminGuard]
      },
      // ============================================================
      // Employee Engagement & Surveys
      // ============================================================
      {
        path: 'surveys/templates',
        loadComponent: () => import('./pages/surveys/templates/survey-templates.component').then(m => m.SurveyTemplatesComponent),
        data: { title: 'surveys.templates_title', permission: 'surveyTemplate.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'surveys/templates/create',
        loadComponent: () => import('./pages/surveys/create-template/create-template.component').then(m => m.CreateTemplateComponent),
        data: {title: 'surveys.create_template', permission: 'surveyTemplate.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'surveys/templates/:id/view',
        loadComponent: () => import('./pages/surveys/view-template/view-template.component').then(m => m.ViewTemplateComponent),
        data: { title: 'surveys.view_template', permission: 'surveyTemplate.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'surveys/templates/:id/edit',
        loadComponent: () => import('./pages/surveys/create-template/create-template.component').then(m => m.CreateTemplateComponent),
        data: {title: 'surveys.edit_template', permission: 'surveyTemplate.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'surveys/distributions',
        loadComponent: () => import('./pages/surveys/distributions/survey-distributions.component').then(m => m.SurveyDistributionsComponent),
        data: { title: 'surveys.distributions_title', permission: 'surveyDistribution.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'surveys/distributions/create',
        loadComponent: () => import('./pages/surveys/create-distribution/create-distribution.component').then(m => m.CreateDistributionComponent),
        data: {title: 'surveys.create_distribution', permission: 'surveyDistribution.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'surveys/distributions/:id/view',
        loadComponent: () => import('./pages/surveys/view-distribution/view-distribution.component').then(m => m.ViewDistributionComponent),
        data: { title: 'surveys.view_distribution', permission: 'surveyDistribution.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'surveys/distributions/:id/edit',
        loadComponent: () => import('./pages/surveys/create-distribution/create-distribution.component').then(m => m.CreateDistributionComponent),
        data: {title: 'surveys.edit_distribution', permission: 'surveyDistribution.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'surveys/distributions/:id/results',
        loadComponent: () => import('./pages/surveys/results/survey-results.component').then(m => m.SurveyResultsComponent),
        data: { title: 'surveys.results_title', permission: 'surveyResponse.read' },
        canMatch: [adminGuard]
      },
      // Analytics
      {
        path: 'analytics',
        loadComponent: () => import('./pages/analytics/executive-dashboard/executive-dashboard.component').then(m => m.ExecutiveDashboardComponent),
        data: { title: 'analytics.executive_dashboard', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'analytics/headcount',
        loadComponent: () => import('./pages/analytics/headcount/headcount.component').then(m => m.HeadcountComponent),
        data: { title: 'analytics.headcount', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'analytics/attrition',
        loadComponent: () => import('./pages/analytics/attrition/attrition.component').then(m => m.AttritionComponent),
        data: { title: 'analytics.attrition', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'analytics/recruitment',
        loadComponent: () => import('./pages/analytics/recruitment-analytics/recruitment-analytics.component').then(m => m.RecruitmentAnalyticsComponent),
        data: { title: 'analytics.recruitment', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'analytics/training',
        loadComponent: () => import('./pages/analytics/training-analytics/training-analytics.component').then(m => m.TrainingAnalyticsComponent),
        data: { title: 'analytics.training', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'analytics/leave',
        loadComponent: () => import('./pages/analytics/leave-analytics/leave-analytics.component').then(m => m.LeaveAnalyticsComponent),
        data: { title: 'analytics.leave', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'analytics/overtime',
        loadComponent: () => import('./pages/analytics/overtime-analytics/overtime-analytics.component').then(m => m.OvertimeAnalyticsComponent),
        data: { title: 'analytics.overtime', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'analytics/payroll',
        loadComponent: () => import('./pages/analytics/payroll-analytics/payroll-analytics.component').then(m => m.PayrollAnalyticsComponent),
        data: { title: 'analytics.payroll', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'analytics/engagement',
        loadComponent: () => import('./pages/analytics/engagement-analytics/engagement-analytics.component').then(m => m.EngagementAnalyticsComponent),
        data: { title: 'analytics.engagement', permission: 'analytics.read' },
        canMatch: [adminGuard]
      },
      // Phase 6: Timesheet Management
      {
        path: 'timesheets/projects',
        loadComponent: () => import('./pages/timesheets/projects/projects.component').then(m => m.ProjectsComponent),
        data: { title: 'timesheets.projects.title', permission: 'project.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/projects/create',
        loadComponent: () => import('./pages/timesheets/projects/create-project/create-project.component').then(m => m.CreateProjectComponent),
        data: {title: 'timesheets.projects.create', permission: 'project.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/projects/:id/view',
        loadComponent: () => import('./pages/timesheets/projects/view-project/view-project.component').then(m => m.ViewProjectComponent),
        data: { title: 'timesheets.projects.view', permission: 'project.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/projects/:id/edit',
        loadComponent: () => import('./pages/timesheets/projects/create-project/create-project.component').then(m => m.CreateProjectComponent),
        data: {title: 'timesheets.projects.edit', permission: 'project.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/periods',
        loadComponent: () => import('./pages/timesheets/periods/periods.component').then(m => m.PeriodsComponent),
        data: { title: 'timesheets.periods.title', permission: 'timesheetPeriod.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/periods/create',
        loadComponent: () => import('./pages/timesheets/periods/create-period/create-period.component').then(m => m.CreatePeriodComponent),
        data: {title: 'timesheets.periods.create', permission: 'timesheetPeriod.create' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/periods/:id/view',
        loadComponent: () => import('./pages/timesheets/periods/view-period/view-period.component').then(m => m.ViewPeriodComponent),
        data: { title: 'timesheets.periods.view', permission: 'timesheetPeriod.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/periods/:id/edit',
        loadComponent: () => import('./pages/timesheets/periods/create-period/create-period.component').then(m => m.CreatePeriodComponent),
        data: {title: 'timesheets.periods.edit', permission: 'timesheetPeriod.update' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/timesheets',
        loadComponent: () => import('./pages/timesheets/timesheets/timesheets-list.component').then(m => m.TimesheetsListComponent),
        data: { title: 'timesheets.timesheets.title', permission: 'timesheet.read' },
        canMatch: [adminGuard]
      },
      {
        path: 'timesheets/timesheets/:id/view',
        loadComponent: () => import('./pages/timesheets/timesheets/view-timesheet/view-timesheet.component').then(m => m.ViewTimesheetComponent),
        data: { title: 'timesheets.timesheets.view', permission: 'timesheet.read' },
        canMatch: [adminGuard]
      },
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent),
    data: { title: 'Unauthorized Access' }
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    data: { title: 'Page Not Found' }
  }
];
