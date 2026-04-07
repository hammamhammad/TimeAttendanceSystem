// ============================================================
// Onboarding Models (matching backend request/response records)
// ============================================================

// --- Enums ---

export type OnboardingStatus = 'NotStarted' | 'InProgress' | 'Completed' | 'Cancelled' | 'Overdue';
export type OnboardingTaskStatus = 'Pending' | 'InProgress' | 'Completed' | 'Skipped' | 'Overdue';
export type OnboardingTaskCategory = 'Documentation' | 'IT' | 'HR' | 'Training' | 'Equipment' | 'Access' | 'Introduction' | 'Other';

// --- Template ---

export interface OnboardingTemplate {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  departmentId?: number;
  departmentName?: string;
  branchId?: number;
  branchName?: string;
  isActive: boolean;
  isDefault: boolean;
  status?: string;
  estimatedDays?: number;
  taskCount: number;
  tasks: OnboardingTemplateTask[];
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface OnboardingTemplateTask {
  id: number;
  taskName: string;
  taskNameAr?: string;
  description?: string;
  descriptionAr?: string;
  category: OnboardingTaskCategory;
  dueDaysAfterJoining: number;
  priority: number;
  displayOrder: number;
  isRequired: boolean;
}

export interface CreateOnboardingTemplateRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  departmentId?: number;
  branchId?: number;
  isActive: boolean;
  isDefault: boolean;
  tasks?: CreateOnboardingTemplateTaskRequest[];
}

export interface CreateOnboardingTemplateTaskRequest {
  taskName: string;
  taskNameAr?: string;
  description?: string;
  descriptionAr?: string;
  category: OnboardingTaskCategory;
  dueDaysAfterJoining: number;
  priority: number;
  displayOrder?: number;
  isRequired: boolean;
}

export interface TemplateQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean;
  departmentId?: number;
  branchId?: number;
}

// --- Process ---

export interface OnboardingProcess {
  id: number;
  employeeId: number;
  employeeName?: string;
  onboardingTemplateId: number;
  templateName?: string;
  departmentName?: string;
  startDate: string;
  expectedCompletionDate?: string;
  expectedEndDate?: string;
  status: OnboardingStatus;
  progress?: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks?: number;
  offerLetterId?: number;
  tasks?: OnboardingTask[];
  documents?: any[];
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface OnboardingTask {
  id: number;
  onboardingProcessId: number;
  onboardingTemplateTaskId?: number;
  taskName: string;
  taskNameAr?: string;
  description?: string;
  category: OnboardingTaskCategory;
  dueDate?: string;
  isRequired: boolean;
  priority: number;
  displayOrder?: number;
  assigneeName?: string;
  status: OnboardingTaskStatus;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface ProcessQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: OnboardingStatus;
  departmentId?: number;
  branchId?: number;
}

export interface UpdateTaskStatusRequest {
  status: OnboardingTaskStatus;
  comments?: string;
}

// --- Dashboard ---

export interface OnboardingDashboardStats {
  activeProcesses: number;
  completedThisMonth: number;
  overdueProcesses: number;
  averageCompletionDays: number;
  recentProcesses: OnboardingProcess[];
  tasksByCategory: { category: string; count: number }[];
}

// --- Paged Result ---

export interface OnboardingPagedResult<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
