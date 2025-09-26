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
