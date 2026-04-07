import { Injectable, signal } from '@angular/core';

export interface MenuItem {
  path: string;
  titleKey: string;
  icon: string;
  permission?: string;
  module?: string;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly menuItems = signal<MenuItem[]>([
    {
      path: '/dashboard',
      titleKey: 'nav.dashboard',
      icon: 'fa-solid fa-chart-line',
      permission: undefined // Dashboard accessible to all authenticated users
    },
    {
      path: '/platform',
      titleKey: 'Platform',
      icon: 'fa-solid fa-server',
      permission: 'system.manage',
      children: [
        {
          path: '/tenants',
          titleKey: 'Tenants',
          icon: 'fa-solid fa-building',
          permission: 'system.manage'
        },
        {
          path: '/subscription-plans',
          titleKey: 'Subscription Plans',
          icon: 'fa-solid fa-credit-card',
          permission: 'system.manage'
        }
      ]
    },
    {
      path: '/users',
      titleKey: 'nav.users',
      icon: 'fa-solid fa-users',
      permission: 'user.read'
    },
    {
      path: '/employees',
      titleKey: 'nav.employees',
      icon: 'fa-solid fa-id-card',
      permission: 'employee.read'
    },
    {
      path: '/roles',
      titleKey: 'nav.roles',
      icon: 'fa-solid fa-user-shield',
      permission: 'role.read'
    },
    {
      path: '/branches',
      titleKey: 'nav.branches',
      icon: 'fa-solid fa-code-branch',
      permission: 'branch.read'
    },
    {
      path: '/departments',
      titleKey: 'nav.departments',
      icon: 'fa-solid fa-sitemap',
      permission: 'department.read'
    },
    {
      path: '/shifts',
      titleKey: 'nav.shifts',
      icon: 'fa-solid fa-clock',
      permission: undefined, // Special handling in sidenav component
      module: 'TimeAttendance',
      children: [
        {
          path: '/shifts',
          titleKey: 'shifts.title',
          icon: 'fa-solid fa-clock',
          permission: 'shift.read'
        },
        {
          path: '/shifts/assign',
          titleKey: 'shifts.assignments.title',
          icon: 'fa-solid fa-user-clock',
          permission: 'shift.assign'
        }
      ]
    },
    {
      path: '/attendance',
      titleKey: 'nav.attendance',
      icon: 'fa-solid fa-calendar-check',
      permission: undefined, // Special handling in sidenav component
      module: 'TimeAttendance',
      children: [
        {
          path: '/attendance',
          titleKey: 'attendance.dashboard_title',
          icon: 'fa-solid fa-chart-line',
          permission: 'attendance.read'
        },
        {
          path: '/attendance/daily',
          titleKey: 'attendance.daily_view',
          icon: 'fa-solid fa-calendar-day',
          permission: 'attendance.read'
        },
        {
          path: '/attendance/monthly-report',
          titleKey: 'attendance.monthly_report',
          icon: 'fa-solid fa-calendar-alt',
          permission: 'attendance.read'
        },
        {
          path: '/attendance/shift-swaps',
          titleKey: 'nav.shiftSwaps',
          icon: 'fa-solid fa-exchange-alt',
          permission: 'shiftSwapRequest.read',
          module: 'ShiftSwaps'
        },
        {
          path: '/attendance/on-call',
          titleKey: 'nav.onCallSchedules',
          icon: 'fa-solid fa-phone-volume',
          permission: 'onCallSchedule.read'
        }
      ]
    },
    {
      path: '/reports',
      titleKey: 'nav.reports',
      icon: 'fa-solid fa-chart-bar',
      permission: undefined, // Show if user has any report access
      children: [
        {
          path: '/reports/attendance',
          titleKey: 'reports.attendance.title',
          icon: 'fa-solid fa-list-check',
          permission: 'attendance.read'
        },
        {
          path: '/reports/leaves',
          titleKey: 'reports.leaves',
          icon: 'fa-solid fa-calendar-minus',
          permission: 'vacation.read'
        },
        {
          path: '/reports/sessions',
          titleKey: 'sessions.title',
          icon: 'fa-solid fa-wifi',
          permission: 'session.read'
        },
        {
          path: '/reports/audit-logs',
          titleKey: 'audit_logs.title',
          icon: 'fa-solid fa-history',
          permission: 'audit.read'
        },
        {
          path: '/reports/payroll',
          titleKey: 'nav.payrollReports',
          icon: 'fa-solid fa-money-check-alt',
          permission: 'payroll.read',
          module: 'Payroll'
        },
        {
          path: '/reports/compliance',
          titleKey: 'nav.complianceReports',
          icon: 'fa-solid fa-clipboard-check',
          permission: 'attendance.read'
        },
        {
          path: '/reports/custom-reports',
          titleKey: 'nav.customReports',
          icon: 'fa-solid fa-file-chart-line',
          permission: 'customReport.read',
          module: 'CustomReports'
        }
      ]
    },
    {
      path: '/settings',
      titleKey: 'nav.settings',
      icon: 'fa-solid fa-cog',
      permission: undefined, // Settings accessible to all authenticated users
      children: [
        {
          path: '/settings/tenant-config',
          titleKey: 'tenant_configuration.title',
          icon: 'fa-solid fa-building-gear',
          permission: undefined
        },
        {
          path: '/settings',
          titleKey: 'settings.dashboard',
          icon: 'fa-solid fa-cog',
          permission: undefined
        },
        {
          path: '/settings/overtime',
          titleKey: 'settings.overtime.title',
          icon: 'fa-solid fa-clock',
          permission: 'settings.overtime.read'
        },
        {
          path: '/settings/public-holidays',
          titleKey: 'settings.holidays.title',
          icon: 'fa-solid fa-calendar-check',
          permission: 'publicHoliday.read'
        },
        {
          path: '/vacation-types',
          titleKey: 'vacation_types.title',
          icon: 'fa-solid fa-calendar-alt',
          permission: 'vacationType.read',
          module: 'LeaveManagement'
        },
        {
          path: '/settings/excuse-policies',
          titleKey: 'excuse_policies.title',
          icon: 'fa-solid fa-user-clock',
          permission: 'settings.excusePolicy.read',
          module: 'LeaveManagement'
        },
        {
          path: '/settings/remote-work-policy',
          titleKey: 'remoteWork.policy.title',
          icon: 'fa-solid fa-laptop-house',
          permission: 'remoteWork.policy.read',
          module: 'RemoteWork'
        },
        {
          path: '/settings/workflows',
          titleKey: 'workflows.title',
          icon: 'fa-solid fa-project-diagram',
          permission: 'workflow.read',
          module: 'Workflows'
        },
        {
          path: '/settings/leave-entitlements',
          titleKey: 'leaveBalance.leaveEntitlements',
          icon: 'fa-solid fa-calendar-check',
          permission: 'leaveBalance.read',
          module: 'LeaveManagement'
        },
        {
          path: '/settings/allowance-types',
          titleKey: 'nav.allowanceTypes',
          icon: 'fa-solid fa-tags',
          permission: 'allowanceType.read',
          module: 'Allowances'
        },
        {
          path: '/settings/allowance-policies',
          titleKey: 'nav.allowancePolicies',
          icon: 'fa-solid fa-shield-alt',
          permission: 'allowancePolicy.read',
          module: 'Allowances'
        }
      ]
    },
    {
      path: '/hr',
      titleKey: 'nav.hr',
      icon: 'fa-solid fa-user-tie',
      permission: undefined,
      module: 'EmployeeLifecycle',
      children: [
        {
          path: '/employee-contracts',
          titleKey: 'nav.contracts',
          icon: 'fa-solid fa-file-contract',
          permission: 'contract.read'
        },
        {
          path: '/employee-transfers',
          titleKey: 'nav.transfers',
          icon: 'fa-solid fa-exchange-alt',
          permission: 'transfer.read'
        },
        {
          path: '/employee-promotions',
          titleKey: 'nav.promotions',
          icon: 'fa-solid fa-arrow-up',
          permission: 'promotion.read'
        },
        {
          path: '/salary-adjustments',
          titleKey: 'nav.salaryAdjustments',
          icon: 'fa-solid fa-hand-holding-usd',
          permission: 'salaryAdjustment.read'
        },
        {
          path: '/allowances',
          titleKey: 'nav.allowances',
          icon: 'fa-solid fa-coins',
          permission: 'allowanceAssignment.read',
          module: 'Allowances'
        },
        {
          path: '/allowance-requests',
          titleKey: 'nav.allowanceRequests',
          icon: 'fa-solid fa-file-invoice-dollar',
          permission: 'allowanceRequest.read',
          module: 'Allowances'
        },
        {
          path: '/job-grades',
          titleKey: 'nav.jobGrades',
          icon: 'fa-solid fa-layer-group',
          permission: 'jobGrade.read'
        }
      ]
    },
    {
      path: '/leave-management',
      titleKey: 'nav.leaveManagement',
      icon: 'fa-solid fa-calendar-minus',
      permission: undefined,
      module: 'LeaveManagement',
      children: [
        {
          path: '/leave-management/compensatory-offs',
          titleKey: 'nav.compensatoryOffs',
          icon: 'fa-solid fa-calendar-plus',
          permission: 'compensatoryOff.read'
        },
        {
          path: '/leave-management/leave-encashments',
          titleKey: 'nav.leaveEncashments',
          icon: 'fa-solid fa-money-bill-wave',
          permission: 'leaveEncashment.read'
        }
      ]
    },
    {
      path: '/benefits',
      titleKey: 'nav.benefits',
      icon: 'fa-solid fa-heart-pulse',
      permission: undefined,
      module: 'Benefits',
      children: [
        { path: '/benefits/plans', titleKey: 'nav.benefitPlans', icon: 'fa-solid fa-file-medical', permission: 'benefitPlan.read' },
        { path: '/benefits/enrollment-periods', titleKey: 'nav.enrollmentPeriods', icon: 'fa-solid fa-calendar-plus', permission: 'openEnrollmentPeriod.read' },
        { path: '/benefits/enrollments', titleKey: 'nav.benefitEnrollments', icon: 'fa-solid fa-user-check', permission: 'benefitEnrollment.read' },
        { path: '/benefits/claims', titleKey: 'nav.benefitClaims', icon: 'fa-solid fa-file-invoice-dollar', permission: 'benefitClaim.read' }
      ]
    },
    {
      path: '/payroll',
      titleKey: 'nav.payroll',
      icon: 'fa-solid fa-money-check-alt',
      permission: undefined,
      module: 'Payroll',
      children: [
        {
          path: '/payroll/salary-structures',
          titleKey: 'nav.salaryStructures',
          icon: 'fa-solid fa-project-diagram',
          permission: 'salaryStructure.read'
        },
        {
          path: '/payroll/periods',
          titleKey: 'nav.payrollPeriods',
          icon: 'fa-solid fa-calendar-alt',
          permission: 'payroll.read'
        },
        {
          path: '/payroll/settings',
          titleKey: 'nav.payrollSettings',
          icon: 'fa-solid fa-cog',
          permission: 'payroll.manage'
        }
      ]
    },
    {
      path: '/offboarding',
      titleKey: 'nav.offboarding',
      icon: 'fa-solid fa-door-open',
      permission: undefined,
      module: 'Offboarding',
      children: [
        {
          path: '/offboarding/resignations',
          titleKey: 'nav.resignations',
          icon: 'fa-solid fa-file-signature',
          permission: 'resignation.read'
        },
        {
          path: '/offboarding/terminations',
          titleKey: 'nav.terminations',
          icon: 'fa-solid fa-user-slash',
          permission: 'termination.read'
        },
        { path: '/offboarding/pending-clearance', titleKey: 'nav.pendingClearance', icon: 'fa-solid fa-clipboard-check', permission: 'clearance.read' },
        { path: '/offboarding/final-settlements', titleKey: 'nav.finalSettlements', icon: 'fa-solid fa-money-check-alt', permission: 'finalSettlement.read' }
      ]
    },
    {
      path: '/recruitment',
      titleKey: 'nav.recruitment',
      icon: 'fa-solid fa-briefcase',
      permission: undefined,
      module: 'Recruitment',
      children: [
        { path: '/recruitment/requisitions', titleKey: 'nav.jobRequisitions', icon: 'fa-solid fa-file-alt', permission: 'jobRequisition.read' },
        { path: '/recruitment/postings', titleKey: 'nav.jobPostings', icon: 'fa-solid fa-bullhorn', permission: 'jobPosting.read' },
        { path: '/recruitment/candidates', titleKey: 'nav.candidates', icon: 'fa-solid fa-user-plus', permission: 'candidate.read' },
        { path: '/recruitment/applications', titleKey: 'nav.applications', icon: 'fa-solid fa-file-invoice', permission: 'jobApplication.read' },
        { path: '/recruitment/offers', titleKey: 'nav.offers', icon: 'fa-solid fa-envelope-open-text', permission: 'offerLetter.read' },
        { path: '/recruitment/interviews', titleKey: 'nav.interviews', icon: 'fa-solid fa-calendar-check', permission: 'interview.read' }
      ]
    },
    {
      path: '/onboarding',
      titleKey: 'nav.onboarding',
      icon: 'fa-solid fa-clipboard-check',
      permission: undefined,
      module: 'Onboarding',
      children: [
        { path: '/onboarding/templates', titleKey: 'nav.onboardingTemplates', icon: 'fa-solid fa-clipboard-list', permission: 'onboardingTemplate.read' },
        { path: '/onboarding/processes', titleKey: 'nav.onboardingProcesses', icon: 'fa-solid fa-tasks', permission: 'onboarding.read' },
        { path: '/onboarding/dashboard', titleKey: 'nav.onboardingDashboard', icon: 'fa-solid fa-chart-pie', permission: 'onboarding.read' }
      ]
    },
    {
      path: '/performance',
      titleKey: 'nav.performance',
      icon: 'fa-solid fa-star',
      permission: undefined,
      module: 'Performance',
      children: [
        { path: '/performance/cycles', titleKey: 'nav.reviewCycles', icon: 'fa-solid fa-sync-alt', permission: 'performanceReviewCycle.read' },
        { path: '/performance/reviews', titleKey: 'nav.reviews', icon: 'fa-solid fa-star', permission: 'performanceReview.read' },
        { path: '/performance/goals', titleKey: 'nav.goals', icon: 'fa-solid fa-bullseye', permission: 'goal.read' },
        { path: '/performance/competencies', titleKey: 'nav.competencies', icon: 'fa-solid fa-cubes', permission: 'competencyFramework.read' },
        { path: '/performance/pips', titleKey: 'nav.pips', icon: 'fa-solid fa-chart-line', permission: 'pip.read' },
        { path: '/performance/feedback-requests', titleKey: 'nav.feedback360', icon: 'fa-solid fa-comments', permission: 'feedback360.read' }
      ]
    },
    {
      path: '/succession',
      titleKey: 'nav.succession',
      icon: 'fa-solid fa-chess-queen',
      permission: undefined,
      module: 'SuccessionPlanning',
      children: [
        { path: '/succession/key-positions', titleKey: 'nav.keyPositions', icon: 'fa-solid fa-key', permission: 'keyPosition.read' },
        { path: '/succession/talent-profiles', titleKey: 'nav.talentProfiles', icon: 'fa-solid fa-user-tie', permission: 'talentProfile.read' },
        { path: '/succession/plans', titleKey: 'nav.successionPlans', icon: 'fa-solid fa-project-diagram', permission: 'successionPlan.read' },
        { path: '/succession/career-paths', titleKey: 'nav.careerPaths', icon: 'fa-solid fa-road', permission: 'careerPath.read' },
        { path: '/succession/talent-pool', titleKey: 'nav.talentPool', icon: 'fa-solid fa-swimming-pool', permission: 'talentProfile.read' }
      ]
    },
    {
      path: '/documents',
      titleKey: 'nav.documents',
      icon: 'fa-solid fa-folder-open',
      permission: undefined,
      module: 'Documents',
      children: [
        { path: '/documents/categories', titleKey: 'nav.documentCategories', icon: 'fa-solid fa-tags', permission: 'documentCategory.read' },
        { path: '/documents/employee-documents', titleKey: 'nav.employeeDocuments', icon: 'fa-solid fa-file-alt', permission: 'employeeDocument.read' },
        { path: '/documents/company-policies', titleKey: 'nav.companyPolicies', icon: 'fa-solid fa-shield-alt', permission: 'companyPolicy.read' },
        { path: '/documents/letter-templates', titleKey: 'nav.letterTemplates', icon: 'fa-solid fa-envelope-open-text', permission: 'letterTemplate.read' },
        { path: '/documents/letter-requests', titleKey: 'nav.letterRequests', icon: 'fa-solid fa-paper-plane', permission: 'letterRequest.read' }
      ]
    },
    {
      path: '/expenses',
      titleKey: 'nav.expenses',
      icon: 'fa-solid fa-receipt',
      permission: undefined,
      module: 'Expenses',
      children: [
        { path: '/expenses/categories', titleKey: 'nav.expenseCategories', icon: 'fa-solid fa-tags', permission: 'expenseCategory.read' },
        { path: '/expenses/policies', titleKey: 'nav.expensePolicies', icon: 'fa-solid fa-shield-alt', permission: 'expensePolicy.read' },
        { path: '/expenses/claims', titleKey: 'nav.expenseClaims', icon: 'fa-solid fa-file-invoice-dollar', permission: 'expenseClaim.read' }
      ]
    },
    {
      path: '/loans',
      titleKey: 'nav.loans',
      icon: 'fa-solid fa-hand-holding-usd',
      permission: undefined,
      module: 'Loans',
      children: [
        { path: '/loans/types', titleKey: 'nav.loanTypes', icon: 'fa-solid fa-list', permission: 'loanType.read' },
        { path: '/loans/policies', titleKey: 'nav.loanPolicies', icon: 'fa-solid fa-shield-alt', permission: 'loanPolicy.read' },
        { path: '/loans/applications', titleKey: 'nav.loanApplications', icon: 'fa-solid fa-file-contract', permission: 'loanApplication.read' },
        { path: '/loans/salary-advances', titleKey: 'nav.salaryAdvances', icon: 'fa-solid fa-money-bill-wave', permission: 'salaryAdvance.read' }
      ]
    },
    {
      path: '/training',
      titleKey: 'nav.training',
      icon: 'fa-solid fa-graduation-cap',
      permission: undefined,
      module: 'Training',
      children: [
        { path: '/training/categories', titleKey: 'nav.trainingCategories', icon: 'fa-solid fa-tags', permission: 'trainingCategory.read' },
        { path: '/training/courses', titleKey: 'nav.trainingCourses', icon: 'fa-solid fa-book-open', permission: 'trainingCourse.read' },
        { path: '/training/programs', titleKey: 'nav.trainingPrograms', icon: 'fa-solid fa-graduation-cap', permission: 'trainingProgram.read' },
        { path: '/training/sessions', titleKey: 'nav.trainingSessions', icon: 'fa-solid fa-chalkboard-teacher', permission: 'trainingSession.read' },
        { path: '/training/enrollments', titleKey: 'nav.trainingEnrollments', icon: 'fa-solid fa-user-graduate', permission: 'trainingEnrollment.read' },
        { path: '/training/certifications', titleKey: 'nav.certifications', icon: 'fa-solid fa-certificate', permission: 'employeeCertification.read' },
        { path: '/training/budgets', titleKey: 'nav.trainingBudgets', icon: 'fa-solid fa-piggy-bank', permission: 'trainingBudget.read' }
      ]
    },
    {
      path: '/employee-relations',
      titleKey: 'nav.employeeRelations',
      icon: 'fa-solid fa-handshake',
      permission: undefined,
      module: 'EmployeeRelations',
      children: [
        { path: '/employee-relations/grievances', titleKey: 'nav.grievances', icon: 'fa-solid fa-exclamation-circle', permission: 'grievance.read' },
        { path: '/employee-relations/disciplinary-actions', titleKey: 'nav.disciplinaryActions', icon: 'fa-solid fa-gavel', permission: 'disciplinaryAction.read' },
        { path: '/employee-relations/investigations', titleKey: 'nav.investigations', icon: 'fa-solid fa-search', permission: 'investigation.read' },
        { path: '/employee-relations/counseling', titleKey: 'nav.counseling', icon: 'fa-solid fa-comments', permission: 'counselingRecord.read' }
      ]
    },
    {
      path: '/announcements',
      titleKey: 'nav.announcements',
      icon: 'fa-solid fa-bullhorn',
      permission: undefined,
      module: 'Announcements',
      children: [
        { path: '/announcements/categories', titleKey: 'nav.announcementCategories', icon: 'fa-solid fa-tags', permission: 'announcementCategory.read' },
        { path: '/announcements', titleKey: 'nav.announcementList', icon: 'fa-solid fa-bullhorn', permission: 'announcement.read' }
      ]
    },
    {
      path: '/assets',
      titleKey: 'nav.assets',
      icon: 'fa-solid fa-boxes-stacked',
      permission: undefined,
      module: 'Assets',
      children: [
        { path: '/assets', titleKey: 'nav.assetList', icon: 'fa-solid fa-box', permission: 'asset.read' },
        { path: '/assets/categories', titleKey: 'nav.assetCategories', icon: 'fa-solid fa-tags', permission: 'assetCategory.read' },
        { path: '/assets/assignments', titleKey: 'nav.assetAssignments', icon: 'fa-solid fa-user-check', permission: 'assetAssignment.read' },
        { path: '/assets/maintenance', titleKey: 'nav.assetMaintenance', icon: 'fa-solid fa-wrench', permission: 'assetMaintenance.read' }
      ]
    },
    {
      path: '/surveys',
      titleKey: 'nav.surveys',
      icon: 'fa-solid fa-clipboard-question',
      permission: undefined,
      module: 'Surveys',
      children: [
        { path: '/surveys/templates', titleKey: 'nav.surveyTemplates', icon: 'fa-solid fa-file-lines', permission: 'surveyTemplate.read' },
        { path: '/surveys/distributions', titleKey: 'nav.surveyDistributions', icon: 'fa-solid fa-paper-plane', permission: 'surveyDistribution.read' }
      ]
    },
    {
      path: '/analytics',
      titleKey: 'nav.analytics',
      icon: 'fa-solid fa-chart-line',
      permission: undefined,
      module: 'Analytics',
      children: [
        { path: '/analytics', titleKey: 'nav.executiveDashboard', icon: 'fa-solid fa-tachometer-alt', permission: 'analytics.read' },
        { path: '/analytics/headcount', titleKey: 'nav.headcount', icon: 'fa-solid fa-users', permission: 'analytics.read' },
        { path: '/analytics/attrition', titleKey: 'nav.attrition', icon: 'fa-solid fa-user-minus', permission: 'analytics.read' },
        { path: '/analytics/recruitment', titleKey: 'nav.recruitmentAnalytics', icon: 'fa-solid fa-briefcase', permission: 'analytics.read' },
        { path: '/analytics/training', titleKey: 'nav.trainingAnalytics', icon: 'fa-solid fa-graduation-cap', permission: 'analytics.read' },
        { path: '/analytics/leave', titleKey: 'nav.leaveAnalytics', icon: 'fa-solid fa-calendar-minus', permission: 'analytics.read' },
        { path: '/analytics/overtime', titleKey: 'nav.overtimeAnalytics', icon: 'fa-solid fa-clock', permission: 'analytics.read' },
        { path: '/analytics/payroll', titleKey: 'nav.payrollAnalytics', icon: 'fa-solid fa-money-check-alt', permission: 'analytics.read' },
        { path: '/analytics/engagement', titleKey: 'nav.engagementAnalytics', icon: 'fa-solid fa-smile', permission: 'analytics.read' }
      ]
    },
    {
      path: '/timesheets',
      titleKey: 'nav.timesheets',
      icon: 'fa-solid fa-clock',
      permission: undefined,
      module: 'Timesheets',
      children: [
        { path: '/timesheets/projects', titleKey: 'nav.timesheetProjects', icon: 'fa-solid fa-project-diagram', permission: 'project.read' },
        { path: '/timesheets/periods', titleKey: 'nav.timesheetPeriods', icon: 'fa-solid fa-calendar-alt', permission: 'timesheetPeriod.read' },
        { path: '/timesheets/timesheets', titleKey: 'nav.timesheetEntries', icon: 'fa-solid fa-table', permission: 'timesheet.read' }
      ]
    },
    {
      path: '/approvals',
      titleKey: 'approvals.title',
      icon: 'fa-solid fa-tasks',
      permission: undefined, // Show if user has any approval access
      children: [
        {
          path: '/approvals',
          titleKey: 'approvals.pending_title',
          icon: 'fa-solid fa-clock',
          permission: 'approval.read'
        },
        {
          path: '/approvals/history',
          titleKey: 'approvals.history_title',
          icon: 'fa-solid fa-history',
          permission: 'approval.read'
        }
      ]
    },
    {
      path: '/employee-vacations',
      titleKey: 'nav.employeeVacations',
      icon: 'fa-solid fa-calendar-week',
      permission: 'vacation.read',
      module: 'LeaveManagement'
    },
    {
      path: '/employee-excuses',
      titleKey: 'employee_excuses.title',
      icon: 'fa-solid fa-clipboard-check',
      permission: 'excuse.read',
      module: 'LeaveManagement'
    },
    {
      path: '/remote-work',
      titleKey: 'remoteWork.request.title',
      icon: 'fa-solid fa-laptop-house',
      permission: 'remoteWork.request.read',
      module: 'RemoteWork'
    }
  ]);

  /**
   * Get all menu items
   */
  getMenuItems() {
    return this.menuItems();
  }

  /**
   * Get menu items as a signal
   */
  getMenuItems$() {
    return this.menuItems;
  }

  /**
   * Add a new menu item
   */
  addMenuItem(item: MenuItem) {
    this.menuItems.update(items => [...items, item]);
  }

  /**
   * Remove a menu item by path
   */
  removeMenuItem(path: string) {
    this.menuItems.update(items => items.filter(item => item.path !== path));
  }

  /**
   * Update a menu item
   */
  updateMenuItem(path: string, updatedItem: Partial<MenuItem>) {
    this.menuItems.update(items =>
      items.map(item =>
        item.path === path ? { ...item, ...updatedItem } : item
      )
    );
  }

  /**
   * Find a menu item by path
   */
  findMenuItem(path: string): MenuItem | undefined {
    return this.menuItems().find(item => item.path === path);
  }
}