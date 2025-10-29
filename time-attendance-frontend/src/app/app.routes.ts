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
      // Portal Routes (Employee Self-Service)
      {
        path: 'portal',
        redirectTo: 'portal/employee-dashboard',
        pathMatch: 'full'
      },
      {
        path: 'portal/employee-dashboard',
        loadComponent: () => import('./pages/portal/employee-dashboard/employee-dashboard.component').then(m => m.EmployeeDashboardComponent),
        data: {
          title: 'portal.employee_dashboard',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
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
      {
        path: 'portal/fingerprint-requests',
        loadComponent: () => import('./pages/portal/fingerprint-requests/fingerprint-requests-list.component').then(m => m.FingerprintRequestsListComponent),
        data: {
          title: 'portal.fingerprint_requests',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/fingerprint-requests/new',
        loadComponent: () => import('./pages/portal/fingerprint-requests/fingerprint-request-form.component').then(m => m.FingerprintRequestFormComponent),
        data: {
          title: 'portal.new_fingerprint_request',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/fingerprint-requests/:id',
        loadComponent: () => import('./pages/portal/fingerprint-requests/fingerprint-request-details.component').then(m => m.FingerprintRequestDetailsComponent),
        data: {
          title: 'portal.fingerprint_request_details',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/fingerprint-requests/:id/edit',
        loadComponent: () => import('./pages/portal/fingerprint-requests/fingerprint-request-form.component').then(m => m.FingerprintRequestFormComponent),
        data: {
          title: 'portal.edit_fingerprint_request',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/vacation-requests',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-requests-list.component').then(m => m.VacationRequestsListComponent),
        data: {
          title: 'portal.vacation_requests',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/excuse-requests',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-requests-list.component').then(m => m.ExcuseRequestsListComponent),
        data: {
          title: 'portal.excuse_requests',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/excuse-requests/new',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-form.component').then(m => m.PortalExcuseRequestFormComponent),
        data: {
          title: 'portal.new_excuse',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/excuse-requests/:id/edit',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-form.component').then(m => m.PortalExcuseRequestFormComponent),
        data: {
          title: 'portal.edit_excuse',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/excuse-requests/:id',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-details.component').then(m => m.PortalExcuseRequestDetailsComponent),
        data: {
          title: 'portal.excuse_details',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/remote-work-requests',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-requests-list.component').then(m => m.RemoteWorkRequestsListComponent),
        data: {
          title: 'portal.remote_work_requests',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/remote-work-requests/new',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-form.component').then(m => m.PortalRemoteWorkRequestFormComponent),
        data: {
          title: 'portal.new_remote_work',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/remote-work-requests/:id/edit',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-form.component').then(m => m.PortalRemoteWorkRequestFormComponent),
        data: {
          title: 'portal.edit_remote_work',
          permission: 'portal.access'
        },
        canMatch: [authGuard]
      },
      {
        path: 'portal/remote-work-requests/:id',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-details.component').then(m => m.PortalRemoteWorkRequestDetailsComponent),
        data: {
          title: 'portal.remote_work_details',
          permission: 'portal.access'
        },
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
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
        data: { title: 'settings.title' }
      },
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
