// ============================================================
// Analytics & Dashboard Models
// Matches EXACT backend AnalyticsController response field names
// ============================================================

export interface AnalyticsQueryParams {
  startDate?: string;
  endDate?: string;
  branchId?: number;
  departmentId?: number;
}

// --- Executive Summary ---
// Backend: GET /api/v1/analytics/executive-summary
export interface ExecutiveSummaryResponse {
  headcount: {
    totalActive: number;
    newHiresThisMonth: number;
  };
  attrition: {
    annualAttritionRate: number;
    totalSeparations12Months: number;
  };
  recruitment: {
    openPositions: number;
  };
  leave: {
    employeesOnLeaveToday: number;
  };
  overtime: {
    totalOvertimeHoursThisMonth: number;
  };
  training: {
    completionRate: number;
  };
  payroll: {
    latestGross: number;
    latestNet: number;
    employeeCount: number;
  };
}

// --- Headcount ---
// Backend: GET /api/v1/analytics/headcount
export interface HeadcountResponse {
  totalActive: number;
  totalInactive: number;
  total: number;
  hiresByMonth: { year: number; month: number; count: number }[];
  byBranch: { branchId: number; branchName: string; count: number }[];
}

// Backend: GET /api/v1/analytics/headcount/demographics
export interface HeadcountDemographicsResponse {
  byGender: { gender: string; count: number }[];
  byAgeGroup: { ageGroup: string; count: number }[];
  byEmploymentStatus: { status: string; count: number }[];
}

// --- Attrition ---
// Backend: GET /api/v1/analytics/attrition
export interface AttritionResponse {
  totalTerminations: number;
  totalResignations: number;
  totalAttrition: number;
  attritionRate: number;
  terminationsByMonth: { year: number; month: number; count: number }[];
  resignationsByMonth: { year: number; month: number; count: number }[];
  byReason: { reason: string; count: number }[];
}

// --- Recruitment ---
// Backend: GET /api/v1/analytics/recruitment
export interface RecruitmentResponse {
  totalRequisitions: number;
  filledRequisitions: number;
  openRequisitions: number;
  totalApplications: number;
  hiredCount: number;
  avgTimeToFillDays: number;
  avgBudgetRange: { min: number; max: number };
  applicationsByStatus: { status: string; count: number }[];
}

// --- Training ---
// Backend: GET /api/v1/analytics/training
export interface TrainingResponse {
  totalEnrollments: number;
  completed: number;
  inProgress: number;
  cancelled: number;
  completionRate: number;
  totalTrainingHours: number;
  hoursPerEmployee: number;
  byStatus: { status: string; count: number }[];
}

// --- Leave ---
// Backend: GET /api/v1/analytics/leave
export interface LeaveResponse {
  totalDaysTaken: number;
  avgDaysPerEmployee: number;
  byType: { vacationTypeId: number; vacationTypeName: string; count: number; totalDays: number }[];
  byMonth: { year: number; month: number; count: number; totalDays: number }[];
}

// --- Overtime ---
// Backend: GET /api/v1/analytics/overtime
export interface OvertimeResponse {
  totalOvertimeHours: number;
  totalRecordsWithOvertime: number;
  distinctEmployeesWithOvertime: number;
  avgOvertimePerEmployee: number;
  byMonth: { year: number; month: number; totalHours: number; employeeCount: number }[];
}

// --- Payroll ---
// Backend: GET /api/v1/analytics/payroll
export interface PayrollResponse {
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  avgNetSalary: number;
  periods: PayrollPeriodSummary[];
}

export interface PayrollPeriodSummary {
  periodName: string;
  startDate: string;
  endDate: string;
  status: string;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  employeeCount: number;
}

// --- Engagement ---
// Backend: GET /api/v1/analytics/engagement
export interface EngagementResponse {
  surveys: EngagementSurveyResult[];
  totalSurveys: number;
}

export interface EngagementSurveyResult {
  distributionId: number;
  title: string;
  surveyType: string;
  startDate: string;
  endDate: string;
  avgScore: number;
  responseCount: number;
  totalRecipients: number;
  participationRate: number;
}

// --- Saved Dashboards ---
export interface SavedDashboard {
  id: number;
  name: string;
  description?: string;
  configuration: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavedDashboardRequest {
  name: string;
  description?: string;
  configuration: string;
  isDefault?: boolean;
}

export interface UpdateSavedDashboardRequest {
  name: string;
  description?: string;
  configuration: string;
  isDefault?: boolean;
}
