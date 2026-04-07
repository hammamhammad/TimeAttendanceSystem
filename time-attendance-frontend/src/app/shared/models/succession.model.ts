// ============================================================
// Succession Planning & Talent Management Models
// ============================================================

// --- Enums (matching backend string serialization) ---

export type PositionCriticality = 'Low' | 'Medium' | 'High' | 'Critical';
export type VacancyRisk = 'Low' | 'Medium' | 'High' | 'Imminent';
export type PotentialRating = 'Low' | 'Moderate' | 'High' | 'VeryHigh';
export type PerformanceRatingEnum = 'Unsatisfactory' | 'NeedsImprovement' | 'MeetsExpectations' | 'ExceedsExpectations' | 'Outstanding';
export type NineBoxPosition =
  'LowPerformanceLowPotential' | 'LowPerformanceModeratePotential' | 'LowPerformanceHighPotential' |
  'ModeratePerformanceLowPotential' | 'ModeratePerformanceModeratePotential' | 'ModeratePerformanceHighPotential' |
  'HighPerformanceLowPotential' | 'HighPerformanceModeratePotential' | 'HighPerformanceHighPotential';
export type ReadinessLevel = 'NotReady' | 'DevelopmentNeeded' | 'ReadyWithDevelopment' | 'ReadyNow';
export type RetentionRisk = 'Low' | 'Medium' | 'High' | 'Critical';
export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type SuccessionPlanStatus = 'Draft' | 'Active' | 'UnderReview' | 'Approved' | 'Archived';
export type ReadinessTimeline = 'Immediate' | 'SixMonths' | 'OneYear' | 'TwoYears' | 'ThreePlusYears';
export type CandidateSuccessionStatus = 'Active' | 'Promoted' | 'Removed' | 'OnHold';

// --- Key Position ---

export interface KeyPosition {
  id: number;
  jobTitle: string;
  jobTitleAr?: string;
  departmentId?: number;
  departmentName?: string;
  departmentNameAr?: string;
  branchId: number;
  branchName?: string;
  jobGradeId?: number;
  jobGradeName?: string;
  jobGradeNameAr?: string;
  currentHolderId?: number;
  currentHolderName?: string;
  currentHolderNameAr?: string;
  criticalityLevel: string;
  vacancyRisk: string;
  impactOfVacancy?: string;
  impactOfVacancyAr?: string;
  requiredCompetencies?: string;
  minExperienceYears?: number;
  isActive: boolean;
  notes?: string;
  createdAtUtc: string;
  modifiedAtUtc?: string;
  successionPlanCount?: number;
}

export interface CreateKeyPositionRequest {
  jobTitle: string;
  jobTitleAr?: string;
  departmentId?: number;
  branchId: number;
  jobGradeId?: number;
  currentHolderId?: number;
  criticalityLevel: PositionCriticality;
  vacancyRisk: VacancyRisk;
  impactOfVacancy?: string;
  impactOfVacancyAr?: string;
  requiredCompetencies?: string;
  minExperienceYears?: number;
  notes?: string;
}

export interface UpdateKeyPositionRequest extends CreateKeyPositionRequest {
  isActive: boolean;
}

export interface KeyPositionQueryParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  branchId?: number;
  departmentId?: number;
  jobGradeId?: number;
  criticalityLevel?: PositionCriticality;
  vacancyRisk?: VacancyRisk;
  isActive?: boolean;
}

// --- Talent Profile ---

export interface TalentSkill {
  id: number;
  skillName: string;
  skillNameAr?: string;
  proficiencyLevel: string;
  yearsOfExperience?: number;
  isVerified: boolean;
  verifiedDate?: string;
}

export interface TalentProfile {
  id: number;
  employeeId: number;
  employeeName?: string;
  employeeNameAr?: string;
  employeeNumber?: string;
  departmentName?: string;
  departmentNameAr?: string;
  branchName?: string;
  performanceRating?: string;
  potentialRating: string;
  nineBoxPosition: string;
  readinessLevel: string;
  retentionRisk: string;
  careerAspiration?: string;
  careerAspirationAr?: string;
  strengthsSummary?: string;
  developmentAreas?: string;
  lastAssessmentDate?: string;
  assessedByUserId?: number;
  isHighPotential: boolean;
  isActive: boolean;
  notes?: string;
  createdAtUtc: string;
  modifiedAtUtc?: string;
  skillCount?: number;
  skills?: TalentSkill[];
}

export interface TalentSkillRequest {
  skillName: string;
  skillNameAr?: string;
  proficiencyLevel: ProficiencyLevel;
  yearsOfExperience?: number;
  isVerified: boolean;
}

export interface CreateTalentProfileRequest {
  employeeId: number;
  performanceRating?: PerformanceRatingEnum;
  potentialRating: PotentialRating;
  nineBoxPosition: NineBoxPosition;
  readinessLevel: ReadinessLevel;
  retentionRisk: RetentionRisk;
  careerAspiration?: string;
  careerAspirationAr?: string;
  strengthsSummary?: string;
  developmentAreas?: string;
  lastAssessmentDate?: string;
  isHighPotential: boolean;
  notes?: string;
  skills?: TalentSkillRequest[];
}

export interface UpdateTalentProfileRequest extends CreateTalentProfileRequest {
  isActive: boolean;
}

export interface TalentProfileQueryParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  nineBoxPosition?: NineBoxPosition;
  readinessLevel?: ReadinessLevel;
  retentionRisk?: RetentionRisk;
  isHighPotential?: boolean;
  isActive?: boolean;
}

// --- Succession Plan ---

export interface SuccessionCandidate {
  id: number;
  employeeId: number;
  employeeName?: string;
  employeeNameAr?: string;
  employeeNumber?: string;
  talentProfileId?: number;
  readinessLevel: string;
  readinessTimeline: string;
  priority: number;
  developmentPlan?: string;
  developmentPlanAr?: string;
  gapAnalysis?: string;
  status: string;
  notes?: string;
}

export interface SuccessionPlan {
  id: number;
  name: string;
  nameAr?: string;
  keyPositionId: number;
  keyPositionTitle?: string;
  keyPositionTitleAr?: string;
  keyPositionBranchName?: string;
  keyPositionDepartmentName?: string;
  criticalityLevel?: string;
  branchName?: string;
  status: string;
  effectiveDate: string;
  reviewDate?: string;
  reviewedByUserId?: number;
  isActive: boolean;
  notes?: string;
  createdAtUtc: string;
  modifiedAtUtc?: string;
  candidateCount?: number;
  candidates?: SuccessionCandidate[];
}

export interface CreateSuccessionPlanRequest {
  keyPositionId: number;
  name: string;
  nameAr?: string;
  status: SuccessionPlanStatus;
  effectiveDate: string;
  reviewDate?: string;
  notes?: string;
}

export interface UpdateSuccessionPlanRequest {
  name: string;
  nameAr?: string;
  status: SuccessionPlanStatus;
  effectiveDate: string;
  reviewDate?: string;
  isActive: boolean;
  notes?: string;
}

export interface AddSuccessionCandidateRequest {
  employeeId: number;
  talentProfileId?: number;
  readinessLevel: ReadinessLevel;
  readinessTimeline: ReadinessTimeline;
  priority: number;
  developmentPlan?: string;
  developmentPlanAr?: string;
  gapAnalysis?: string;
  notes?: string;
}

export interface SuccessionPlanQueryParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  keyPositionId?: number;
  status?: SuccessionPlanStatus;
  isActive?: boolean;
}

// --- Career Path ---

export interface CareerPathStep {
  id: number;
  fromJobGradeId?: number;
  fromJobGradeName?: string;
  fromJobGradeNameAr?: string;
  toJobGradeId: number;
  toJobGradeName?: string;
  toJobGradeNameAr?: string;
  jobTitle: string;
  jobTitleAr?: string;
  typicalDurationMonths?: number;
  requiredCompetencies?: string;
  stepOrder: number;
}

export interface CareerPath {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
  createdAtUtc: string;
  modifiedAtUtc?: string;
  stepCount?: number;
  steps?: CareerPathStep[];
}

export interface CareerPathStepRequest {
  fromJobGradeId?: number;
  toJobGradeId: number;
  jobTitle: string;
  jobTitleAr?: string;
  typicalDurationMonths?: number;
  requiredCompetencies?: string;
  stepOrder: number;
}

export interface CreateCareerPathRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  steps?: CareerPathStepRequest[];
}

export interface UpdateCareerPathRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
}

export interface CareerPathQueryParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean;
}

// --- Paged Result ---

export interface SuccessionPagedResult<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

// --- Risk Summary ---

export interface KeyPositionRiskSummary {
  totalKeyPositions: number;
  byCriticality: { level: string; count: number }[];
  byVacancyRisk: { risk: string; count: number }[];
  vacantPositions: number;
  highRiskCount: number;
  criticalPositions: number;
}

// --- Dropdown Items ---

export interface KeyPositionDropdown {
  id: number;
  jobTitle: string;
  jobTitleAr?: string;
  branchId: number;
}

export interface TalentProfileDropdown {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNameAr?: string;
}
