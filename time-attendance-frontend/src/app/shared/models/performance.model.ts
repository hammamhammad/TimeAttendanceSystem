// ============================================================
// Performance Management Models (matching backend request/response records)
// ============================================================

// --- Enums ---

export type ReviewCycleStatus = 'Draft' | 'Planning' | 'Active' | 'InReview' | 'Calibration' | 'Completed' | 'Cancelled';
export type ReviewCycleType = 'Annual' | 'SemiAnnual' | 'Quarterly' | 'Monthly' | 'Probation' | 'AdHoc';
export type ReviewStatus = 'NotStarted' | 'SelfReview' | 'SelfAssessmentPending' | 'ManagerReview' | 'ManagerAssessmentPending' | 'Calibration' | 'Completed' | 'Acknowledged';
export type GoalStatus = 'Draft' | 'Active' | 'InProgress' | 'Completed' | 'Cancelled' | 'Deferred';
export type GoalType = 'Individual' | 'Team' | 'Department' | 'Organization';
export type GoalPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type PerformanceRating = 'Exceptional' | 'ExceedsExpectations' | 'MeetsExpectations' | 'NeedsImprovement' | 'Unsatisfactory';
export type PipStatus = 'Draft' | 'Active' | 'Extended' | 'Completed' | 'CompletedSuccessful' | 'CompletedUnsuccessful' | 'Failed' | 'Cancelled';

// --- Review Cycle ---

export interface PerformanceReviewCycle {
  id: number;
  branchId?: number;
  branchName?: string;
  name: string;
  nameAr?: string;
  cycleType: ReviewCycleType;
  startDate: string;
  endDate: string;
  selfAssessmentDeadline?: string;
  managerAssessmentDeadline?: string;
  status: ReviewCycleStatus;
  calibrationDeadline?: string;
  competencyFrameworkId?: number;
  competencyFrameworkName?: string;
  description?: string;
  descriptionAr?: string;
  reviewCount: number;
  totalReviews?: number;
  completedReviews?: number;
  reviewsByStatus?: Record<string, number>;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreatePerformanceCycleRequest {
  branchId?: number;
  name: string;
  nameAr?: string;
  cycleType: ReviewCycleType;
  startDate: string;
  endDate: string;
  selfAssessmentDeadline?: string;
  managerAssessmentDeadline?: string;
  competencyFrameworkId?: number;
  description?: string;
  descriptionAr?: string;
}

export interface CycleQueryParams {
  page?: number;
  pageSize?: number;
  status?: ReviewCycleStatus;
  cycleType?: ReviewCycleType;
  branchId?: number;
}

// --- Performance Review ---

export interface PerformanceReview {
  id: number;
  performanceReviewCycleId: number;
  employeeId: number;
  employeeName?: string;
  cycleName?: string;
  departmentName?: string;
  reviewerEmployeeId: number;
  reviewerName?: string;
  status: ReviewStatus;
  selfRating?: PerformanceRating;
  managerRating?: PerformanceRating;
  finalRating?: PerformanceRating;
  overallRating?: string;
  selfComments?: string;
  managerComments?: string;
  strengths?: string;
  areasForImprovement?: string;
  goals?: GoalDefinition[];
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface ReviewQueryParams {
  page?: number;
  pageSize?: number;
  status?: ReviewStatus;
  cycleId?: number;
}

// --- Goal Definition ---

export interface GoalDefinition {
  id: number;
  performanceReviewId?: number;
  cycleName?: string;
  employeeId: number;
  employeeName?: string;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  goalType: GoalType;
  targetValue?: string;
  currentValue?: string;
  unit?: string;
  weight: number;
  priority: GoalPriority;
  dueDate?: string;
  status: GoalStatus;
  selfRating?: PerformanceRating;
  managerRating?: PerformanceRating;
  selfComments?: string;
  managerComments?: string;
  progressPercentage: number;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateGoalRequest {
  performanceReviewId?: number;
  employeeId: number;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  goalType: GoalType;
  targetValue?: string;
  unit?: string;
  weight: number;
  priority: GoalPriority;
  dueDate?: string;
}

export interface UpdateGoalProgressRequest {
  currentValue: string;
  progressPercentage: number;
}

export interface GoalQueryParams {
  page?: number;
  pageSize?: number;
  status?: GoalStatus;
  goalType?: GoalType;
  employeeId?: number;
  reviewId?: number;
}

// --- Competency Framework ---

export interface CompetencyFramework {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
  competencies: Competency[];
  competencyCount?: number;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface Competency {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  category?: string;
  categoryAr?: string;
  displayOrder: number;
}

export interface CreateCompetencyInput {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  category?: string;
  categoryAr?: string;
  displayOrder?: number;
}

export interface CreateCompetencyFrameworkRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
  competencies?: CreateCompetencyInput[];
}

export interface FrameworkQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean;
}

// --- Competency Assessment ---

export interface CompetencyAssessment {
  id: number;
  reviewId: number;
  competencyId: number;
  competencyName?: string;
  selfRating?: number;
  managerRating?: number;
  comments?: string;
}

// --- PIP ---

export interface PerformanceImprovementPlan {
  id: number;
  employeeId: number;
  employeeName?: string;
  departmentName?: string;
  managerEmployeeId: number;
  managerName?: string;
  performanceReviewId?: number;
  reviewCycleName?: string;
  startDate: string;
  endDate: string;
  extendedEndDate?: string;
  reason?: string;
  reasonAr?: string;
  objectives?: string;
  expectedOutcomes?: string;
  progressNotes?: string;
  goals?: string;
  milestones?: string;
  status: PipStatus;
  outcome?: string;
  outcomeNotes?: string;
  approvedByUserId?: number;
  approvedAt?: string;
  workflowInstanceId?: number;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreatePipRequest {
  employeeId: number;
  managerEmployeeId: number;
  performanceReviewId?: number;
  startDate: string;
  endDate: string;
  reason?: string;
  reasonAr?: string;
  goals?: string;
  milestones?: string;
}

export interface ExtendPipRequest {
  newEndDate: string;
  reason?: string;
}

export interface CompletePipRequest {
  outcomeNotes?: string;
}

export interface PipQueryParams {
  page?: number;
  pageSize?: number;
  status?: PipStatus;
  employeeId?: number;
}

// --- 360 Feedback ---

export type FeedbackStatus = 'Requested' | 'Submitted' | 'Expired' | 'Declined';

export interface FeedbackRequest360 {
  id: number;
  performanceReviewId: number;
  cycleName: string;
  revieweeName: string;
  requestedFromEmployeeId: number;
  requestedFromName: string;
  status: FeedbackStatus;
  deadline?: string;
  submittedAt?: string;
  createdAtUtc: string;
}

export interface CreateFeedbackRequest360 {
  performanceReviewId: number;
  requestedFromEmployeeId: number;
  deadline?: string;
}

export interface SubmitFeedback360Request {
  ratings?: string;
  strengths?: string;
  areasForImprovement?: string;
  additionalComments?: string;
  isAnonymous: boolean;
}

export interface FeedbackRequest360QueryParams {
  reviewId?: number;
  status?: FeedbackStatus;
  page?: number;
  pageSize?: number;
}

// --- Paged Result ---

export interface PerformancePagedResult<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
