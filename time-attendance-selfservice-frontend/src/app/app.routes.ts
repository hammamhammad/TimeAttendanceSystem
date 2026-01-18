import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { managerGuard } from './core/auth/guards';

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
        loadComponent: () => import('./pages/portal/employee-dashboard/employee-dashboard.component').then(m => m.EmployeeDashboardComponent),
        data: { title: 'portal.employee_dashboard' },
        canMatch: [authGuard]
      },
      {
        path: 'my-attendance',
        loadComponent: () => import('./pages/portal/my-attendance/my-attendance.component').then(m => m.MyAttendanceComponent),
        data: { title: 'portal.my_attendance' },
        canMatch: [authGuard]
      },
      {
        path: 'my-profile',
        loadComponent: () => import('./pages/portal/my-profile/my-profile.component').then(m => m.MyProfileComponent),
        data: { title: 'portal.my_profile' },
        canMatch: [authGuard]
      },
      {
        path: 'fingerprint-requests',
        loadComponent: () => import('./pages/portal/fingerprint-requests/fingerprint-requests-list.component').then(m => m.FingerprintRequestsListComponent),
        data: { title: 'portal.fingerprint_requests' },
        canMatch: [authGuard]
      },
      {
        path: 'fingerprint-requests/new',
        loadComponent: () => import('./pages/portal/fingerprint-requests/fingerprint-request-form.component').then(m => m.FingerprintRequestFormComponent),
        data: { title: 'portal.new_fingerprint_request' },
        canMatch: [authGuard]
      },
      {
        path: 'fingerprint-requests/:id',
        loadComponent: () => import('./pages/portal/fingerprint-requests/fingerprint-request-details.component').then(m => m.FingerprintRequestDetailsComponent),
        data: { title: 'portal.fingerprint_request_details' },
        canMatch: [authGuard]
      },
      {
        path: 'fingerprint-requests/:id/edit',
        loadComponent: () => import('./pages/portal/fingerprint-requests/fingerprint-request-form.component').then(m => m.FingerprintRequestFormComponent),
        data: { title: 'portal.edit_fingerprint_request' },
        canMatch: [authGuard]
      },
      {
        path: 'vacation-requests',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-requests-list.component').then(m => m.VacationRequestsListComponent),
        data: { title: 'portal.vacation_requests' },
        canMatch: [authGuard]
      },
      {
        path: 'vacation-requests/new',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-request-form.component').then(m => m.PortalVacationRequestFormComponent),
        data: { title: 'portal.new_vacation' },
        canMatch: [authGuard]
      },
      {
        path: 'vacation-requests/:id/edit',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-request-form.component').then(m => m.PortalVacationRequestFormComponent),
        data: { title: 'portal.edit_vacation' },
        canMatch: [authGuard]
      },
      {
        path: 'vacation-requests/:id',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-request-details.component').then(m => m.PortalVacationRequestDetailsComponent),
        data: { title: 'portal.vacation_details' },
        canMatch: [authGuard]
      },
      {
        path: 'excuse-requests',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-requests-list.component').then(m => m.ExcuseRequestsListComponent),
        data: { title: 'portal.excuse_requests' },
        canMatch: [authGuard]
      },
      {
        path: 'excuse-requests/new',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-form.component').then(m => m.PortalExcuseRequestFormComponent),
        data: { title: 'portal.new_excuse' },
        canMatch: [authGuard]
      },
      {
        path: 'excuse-requests/:id/edit',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-form.component').then(m => m.PortalExcuseRequestFormComponent),
        data: { title: 'portal.edit_excuse' },
        canMatch: [authGuard]
      },
      {
        path: 'excuse-requests/:id',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-details.component').then(m => m.PortalExcuseRequestDetailsComponent),
        data: { title: 'portal.excuse_details' },
        canMatch: [authGuard]
      },
      {
        path: 'remote-work-requests',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-requests-list.component').then(m => m.RemoteWorkRequestsListComponent),
        data: { title: 'portal.remote_work_requests' },
        canMatch: [authGuard]
      },
      {
        path: 'remote-work-requests/new',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-form.component').then(m => m.PortalRemoteWorkRequestFormComponent),
        data: { title: 'portal.new_remote_work' },
        canMatch: [authGuard]
      },
      {
        path: 'remote-work-requests/:id/edit',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-form.component').then(m => m.PortalRemoteWorkRequestFormComponent),
        data: { title: 'portal.edit_remote_work' },
        canMatch: [authGuard]
      },
      {
        path: 'remote-work-requests/:id',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-details.component').then(m => m.PortalRemoteWorkRequestDetailsComponent),
        data: { title: 'portal.remote_work_details' },
        canMatch: [authGuard]
      },
      // Manager routes (require manager role)
      {
        path: 'manager-dashboard',
        loadComponent: () => import('./pages/portal/manager-dashboard/manager-dashboard.component').then(m => m.ManagerDashboardComponent),
        data: { title: 'portal.manager_dashboard' },
        canMatch: [managerGuard]
      },
      {
        path: 'team-members',
        loadComponent: () => import('./pages/portal/team-members/team-members.component').then(m => m.TeamMembersComponent),
        data: { title: 'portal.team_members' },
        canMatch: [managerGuard]
      },
      {
        path: 'pending-approvals',
        loadComponent: () => import('./pages/portal/pending-approvals/pending-approvals.component').then(m => m.PendingApprovalsComponent),
        data: { title: 'portal.pending_approvals' },
        canMatch: [authGuard]  // Changed from managerGuard - anyone can receive delegated approvals
      },
      // Redirect legacy /approvals route to pending-approvals
      {
        path: 'approvals',
        redirectTo: 'pending-approvals',
        pathMatch: 'prefix'
      },
      // Redirect legacy notification URLs to correct routes
      {
        path: 'excuses/:id',
        redirectTo: 'excuse-requests/:id',
        pathMatch: 'full'
      },
      {
        path: 'vacations/:id',
        redirectTo: 'vacation-requests/:id',
        pathMatch: 'full'
      },
      {
        path: 'remote-work/:id',
        redirectTo: 'remote-work-requests/:id',
        pathMatch: 'full'
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
