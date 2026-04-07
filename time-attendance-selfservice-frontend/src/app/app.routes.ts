import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { managerGuard, moduleGuard } from './core/auth/guards';

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
        data: { title: 'portal.my_attendance', module: 'TimeAttendance' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-profile',
        loadComponent: () => import('./pages/portal/my-profile/my-profile.component').then(m => m.MyProfileComponent),
        data: { title: 'portal.my_profile' },
        canMatch: [authGuard]
      },
      {
        path: 'vacation-requests',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-requests-list.component').then(m => m.VacationRequestsListComponent),
        data: { title: 'portal.vacation_requests', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'vacation-requests/new',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-request-form.component').then(m => m.PortalVacationRequestFormComponent),
        data: { title: 'portal.new_vacation', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'vacation-requests/:id/edit',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-request-form.component').then(m => m.PortalVacationRequestFormComponent),
        data: { title: 'portal.edit_vacation', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'vacation-requests/:id',
        loadComponent: () => import('./pages/portal/vacation-requests/vacation-request-details.component').then(m => m.PortalVacationRequestDetailsComponent),
        data: { title: 'portal.vacation_details', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'excuse-requests',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-requests-list.component').then(m => m.ExcuseRequestsListComponent),
        data: { title: 'portal.excuse_requests', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'excuse-requests/new',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-form.component').then(m => m.PortalExcuseRequestFormComponent),
        data: { title: 'portal.new_excuse', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'excuse-requests/:id/edit',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-form.component').then(m => m.PortalExcuseRequestFormComponent),
        data: { title: 'portal.edit_excuse', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'excuse-requests/:id',
        loadComponent: () => import('./pages/portal/excuse-requests/excuse-request-details.component').then(m => m.PortalExcuseRequestDetailsComponent),
        data: { title: 'portal.excuse_details', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'remote-work-requests',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-requests-list.component').then(m => m.RemoteWorkRequestsListComponent),
        data: { title: 'portal.remote_work_requests', module: 'RemoteWork' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'remote-work-requests/new',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-form.component').then(m => m.PortalRemoteWorkRequestFormComponent),
        data: { title: 'portal.new_remote_work', module: 'RemoteWork' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'remote-work-requests/:id/edit',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-form.component').then(m => m.PortalRemoteWorkRequestFormComponent),
        data: { title: 'portal.edit_remote_work', module: 'RemoteWork' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'remote-work-requests/:id',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-details.component').then(m => m.PortalRemoteWorkRequestDetailsComponent),
        data: { title: 'portal.remote_work_details', module: 'RemoteWork' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'remote-work-requests/approval/:id',
        loadComponent: () => import('./pages/portal/remote-work-requests/remote-work-request-details.component').then(m => m.PortalRemoteWorkRequestDetailsComponent),
        data: { title: 'portal.remote_work_approval', module: 'RemoteWork' },
        canMatch: [authGuard, moduleGuard]
      },
      // Payslips, Salary, Resignation routes
      {
        path: 'my-payslips',
        loadComponent: () => import('./pages/portal/my-payslips/my-payslips.component').then(m => m.MyPayslipsComponent),
        data: { title: 'portal.payslips.title', module: 'Payroll' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-salary',
        loadComponent: () => import('./pages/portal/my-salary/my-salary.component').then(m => m.MySalaryComponent),
        data: { title: 'portal.salary.title', module: 'Payroll' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-resignation',
        loadComponent: () => import('./pages/portal/my-resignation/my-resignation.component').then(m => m.MyResignationComponent),
        data: { title: 'portal.resignation.title', module: 'Offboarding' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-allowances',
        loadComponent: () => import('./pages/portal/my-allowances/my-allowances.component').then(m => m.MyAllowancesComponent),
        data: { title: 'portal.allowances.title', module: 'Allowances' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-benefits',
        loadComponent: () => import('./pages/portal/my-benefits/my-benefits.component').then(m => m.MyBenefitsComponent),
        data: { title: 'portal.benefits.title', module: 'Benefits' },
        canMatch: [authGuard, moduleGuard]
      },
      // Announcements
      {
        path: 'announcements',
        loadComponent: () => import('./pages/portal/announcements/announcements.component').then(m => m.AnnouncementsComponent),
        data: { title: 'portal.announcements.title', module: 'Announcements' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'announcements/:id',
        loadComponent: () => import('./pages/portal/announcements/announcement-detail.component').then(m => m.AnnouncementDetailComponent),
        data: { title: 'portal.announcements.detail', module: 'Announcements' },
        canMatch: [authGuard, moduleGuard]
      },
      // Documents, Letters, Expenses, Loans
      {
        path: 'my-documents',
        loadComponent: () => import('./pages/portal/my-documents/my-documents.component').then(m => m.MyDocumentsComponent),
        data: { title: 'portal.documents.title', module: 'Documents' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-letters',
        loadComponent: () => import('./pages/portal/my-letters/my-letters.component').then(m => m.MyLettersComponent),
        data: { title: 'portal.letters.title', module: 'Documents' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-expenses',
        loadComponent: () => import('./pages/portal/my-expenses/my-expenses.component').then(m => m.MyExpensesComponent),
        data: { title: 'portal.expenses.title', module: 'Expenses' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-loans',
        loadComponent: () => import('./pages/portal/my-loans/my-loans.component').then(m => m.MyLoansComponent),
        data: { title: 'portal.loans.title', module: 'Loans' },
        canMatch: [authGuard, moduleGuard]
      },
      // Employee Relations
      {
        path: 'my-grievances',
        loadComponent: () => import('./pages/portal/my-grievances/my-grievances.component').then(m => m.MyGrievancesComponent),
        data: { title: 'portal.grievances.title', module: 'EmployeeRelations' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-disciplinary',
        loadComponent: () => import('./pages/portal/my-disciplinary/my-disciplinary.component').then(m => m.MyDisciplinaryComponent),
        data: { title: 'portal.disciplinary.title', module: 'EmployeeRelations' },
        canMatch: [authGuard, moduleGuard]
      },
      // Training & Development
      {
        path: 'my-training',
        loadComponent: () => import('./pages/portal/my-training/my-training.component').then(m => m.MyTrainingComponent),
        data: { title: 'portal.training.my_training', module: 'Training' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'training-catalog',
        loadComponent: () => import('./pages/portal/training-catalog/training-catalog.component').then(m => m.TrainingCatalogComponent),
        data: { title: 'portal.training.catalog', module: 'Training' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'training/:id',
        loadComponent: () => import('./pages/portal/training-detail/training-detail.component').then(m => m.TrainingDetailComponent),
        data: { title: 'portal.training.session_details', module: 'Training' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-certifications',
        loadComponent: () => import('./pages/portal/my-certifications/my-certifications.component').then(m => m.MyCertificationsComponent),
        data: { title: 'portal.training.my_certifications', module: 'Training' },
        canMatch: [authGuard, moduleGuard]
      },
      // My Assets
      {
        path: 'my-assets',
        loadComponent: () => import('./pages/portal/my-assets/my-assets.component').then(m => m.MyAssetsComponent),
        data: { title: 'portal.assets.title', module: 'Assets' },
        canMatch: [authGuard, moduleGuard]
      },
      // Attendance Correction routes
      {
        path: 'attendance-corrections',
        loadComponent: () => import('./pages/attendance-corrections/attendance-corrections-list.component').then(m => m.AttendanceCorrectionsListComponent),
        data: { title: 'portal.attendance_corrections', module: 'TimeAttendance' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'attendance-corrections/new',
        loadComponent: () => import('./pages/attendance-corrections/attendance-correction-form.component').then(m => m.AttendanceCorrectionFormComponent),
        data: { title: 'portal.new_correction', module: 'TimeAttendance' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'attendance-corrections/:id/edit',
        loadComponent: () => import('./pages/attendance-corrections/attendance-correction-form.component').then(m => m.AttendanceCorrectionFormComponent),
        data: { title: 'portal.edit_correction', module: 'TimeAttendance' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'attendance-corrections/:id',
        loadComponent: () => import('./pages/attendance-corrections/attendance-correction-details.component').then(m => m.AttendanceCorrectionDetailsComponent),
        data: { title: 'portal.correction_details', module: 'TimeAttendance' },
        canMatch: [authGuard, moduleGuard]
      },
      // Employee Engagement & Surveys
      {
        path: 'my-surveys',
        loadComponent: () => import('./pages/portal/my-surveys/my-surveys.component').then(m => m.MySurveysComponent),
        data: { title: 'portal.surveys.title', module: 'Surveys' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-surveys/:id/respond',
        loadComponent: () => import('./pages/portal/survey-respond/survey-respond.component').then(m => m.SurveyRespondComponent),
        data: { title: 'portal.surveys.take_survey', module: 'Surveys' },
        canMatch: [authGuard, moduleGuard]
      },
      // Shift Swap Requests
      {
        path: 'shift-swap-requests',
        loadComponent: () => import('./pages/portal/shift-swap-requests/shift-swap-requests.component').then(m => m.ShiftSwapRequestsComponent),
        data: { title: 'portal.shift_swaps.title', module: 'ShiftSwaps' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'shift-swap-requests/create',
        loadComponent: () => import('./pages/portal/shift-swap-requests/create-shift-swap/create-shift-swap.component').then(m => m.CreateShiftSwapComponent),
        data: { title: 'portal.shift_swaps.create', module: 'ShiftSwaps' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'shift-swap-requests/:id',
        loadComponent: () => import('./pages/portal/shift-swap-requests/shift-swap-detail/shift-swap-detail.component').then(m => m.ShiftSwapDetailComponent),
        data: { title: 'portal.shift_swaps.detail', module: 'ShiftSwaps' },
        canMatch: [authGuard, moduleGuard]
      },
      // My On-Call
      {
        path: 'my-on-call',
        loadComponent: () => import('./pages/portal/my-on-call/my-on-call.component').then(m => m.MyOnCallComponent),
        data: { title: 'portal.on_call.title', module: 'TimeAttendance' },
        canMatch: [authGuard, moduleGuard]
      },
      // Compensatory Offs
      {
        path: 'my-compensatory-offs',
        loadComponent: () => import('./pages/portal/my-compensatory-offs/my-compensatory-offs.component').then(m => m.MyCompensatoryOffsComponent),
        data: { title: 'portal.compensatory_offs.title', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      // Leave Encashments
      {
        path: 'my-leave-encashments',
        loadComponent: () => import('./pages/portal/my-leave-encashments/my-leave-encashments.component').then(m => m.MyLeaveEncashmentsComponent),
        data: { title: 'portal.leave_encashments.title', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-leave-encashments/request',
        loadComponent: () => import('./pages/portal/my-leave-encashments/request-encashment/request-encashment.component').then(m => m.RequestEncashmentComponent),
        data: { title: 'portal.leave_encashments.request', module: 'LeaveManagement' },
        canMatch: [authGuard, moduleGuard]
      },
      // Career Development
      {
        path: 'my-career',
        loadComponent: () => import('./pages/portal/my-career/my-career.component').then(m => m.MyCareerComponent),
        data: { title: 'portal.my_career.title', module: 'SuccessionPlanning' },
        canMatch: [authGuard, moduleGuard]
      },
      // Timesheets
      {
        path: 'my-timesheets',
        loadComponent: () => import('./pages/portal/my-timesheets/my-timesheets.component').then(m => m.MyTimesheetsComponent),
        data: { title: 'portal.timesheets.title', module: 'Timesheets' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-timesheets/new',
        loadComponent: () => import('./pages/portal/my-timesheets/my-timesheet-form.component').then(m => m.MyTimesheetFormComponent),
        data: { title: 'portal.timesheets.create', module: 'Timesheets' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-timesheets/:id',
        loadComponent: () => import('./pages/portal/my-timesheets/my-timesheet-detail.component').then(m => m.MyTimesheetDetailComponent),
        data: { title: 'portal.timesheets.detail', module: 'Timesheets' },
        canMatch: [authGuard, moduleGuard]
      },
      {
        path: 'my-timesheets/:id/edit',
        loadComponent: () => import('./pages/portal/my-timesheets/my-timesheet-form.component').then(m => m.MyTimesheetFormComponent),
        data: { title: 'portal.timesheets.edit', module: 'Timesheets' },
        canMatch: [authGuard, moduleGuard]
      },
      // Module disabled page
      {
        path: 'module-disabled',
        loadComponent: () => import('./pages/module-disabled/module-disabled.component').then(m => m.ModuleDisabledComponent),
        data: { title: 'module.not_available' },
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
