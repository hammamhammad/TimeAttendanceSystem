import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

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
        canMatch: [authGuard]
      },
      {
        path: 'users/create',
        loadComponent: () => import('./pages/users/create-user-page/create-user-page.component').then(m => m.CreateUserPageComponent),
        data: { 
          title: 'users.create_user',
          permission: 'user.create'
        },
        canMatch: [authGuard]
      },
      {
        path: 'users/:id/view',
        loadComponent: () => import('./pages/users/view-user/view-user.component').then(m => m.ViewUserComponent),
        data: { 
          title: 'users.view_details',
          permission: 'user.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'users/:id/edit',
        loadComponent: () => import('./pages/users/edit-user-page/edit-user-page.component').then(m => m.EditUserPageComponent),
        data: { 
          title: 'users.edit_user',
          permission: 'user.update'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employees',
        loadComponent: () => import('./pages/employees/employees.component').then(m => m.EmployeesComponent),
        data: { 
          title: 'employees.title',
          permission: 'employee.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employees/create',
        loadComponent: () => import('./pages/employees/create-employee/create-employee.component').then(m => m.CreateEmployeeComponent),
        data: { 
          title: 'employees.create_employee',
          permission: 'employee.create'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employees/:id/view',
        loadComponent: () => import('./pages/employees/view-employee/view-employee.component').then(m => m.ViewEmployeeComponent),
        data: { 
          title: 'employees.view_details',
          permission: 'employee.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'employees/:id/edit',
        loadComponent: () => import('./pages/employees/edit-employee/edit-employee.component').then(m => m.EditEmployeeComponent),
        data: { 
          title: 'employees.edit_employee',
          permission: 'employee.update'
        },
        canMatch: [authGuard]
      },
      {
        path: 'roles',
        loadComponent: () => import('./pages/roles/roles.component').then(m => m.RolesComponent),
        data: { 
          title: 'roles.title',
          permission: 'role.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'roles/create',
        loadComponent: () => import('./pages/roles/create-role/create-role.component').then(m => m.CreateRoleComponent),
        data: { 
          title: 'roles.create_role',
          permission: 'role.create'
        },
        canMatch: [authGuard]
      },
      {
        path: 'roles/:id/view',
        loadComponent: () => import('./pages/roles/view-role/view-role.component').then(m => m.ViewRoleComponent),
        data: { 
          title: 'roles.view_details',
          permission: 'role.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'roles/:id/edit',
        loadComponent: () => import('./pages/roles/edit-role/edit-role.component').then(m => m.EditRoleComponent),
        data: { 
          title: 'roles.edit_role',
          permission: 'role.update'
        },
        canMatch: [authGuard]
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
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
        data: { title: 'settings.title' }
      }
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
