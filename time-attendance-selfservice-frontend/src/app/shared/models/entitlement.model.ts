export interface TenantEntitlementSummary {
  tenantId: number;
  planCode: string;
  planName: string;
  planNameAr: string | null;
  planTier: string;
  enabledModules: string[];
  featureFlags: Record<string, boolean>;
  limits: Record<string, LimitInfo>;
}

export interface LimitInfo {
  limit: number;
  current: number;
}

// Must mirror backend SystemModule enum exactly
export enum SystemModule {
  Core = 'Core',
  TimeAttendance = 'TimeAttendance',
  LeaveManagement = 'LeaveManagement',
  RemoteWork = 'RemoteWork',
  Workflows = 'Workflows',
  EmployeeLifecycle = 'EmployeeLifecycle',
  Payroll = 'Payroll',
  Allowances = 'Allowances',
  Offboarding = 'Offboarding',
  Recruitment = 'Recruitment',
  Onboarding = 'Onboarding',
  Performance = 'Performance',
  Documents = 'Documents',
  Expenses = 'Expenses',
  Loans = 'Loans',
  Announcements = 'Announcements',
  Training = 'Training',
  EmployeeRelations = 'EmployeeRelations',
  Assets = 'Assets',
  Surveys = 'Surveys',
  Analytics = 'Analytics',
  Timesheets = 'Timesheets',
  SuccessionPlanning = 'SuccessionPlanning',
  Benefits = 'Benefits',
  CustomReports = 'CustomReports',
  ShiftSwaps = 'ShiftSwaps'
}
