/**
 * Benefits Administration domain models
 * Field names match backend controller responses exactly
 */

// ===== ENUMS =====

export enum BenefitType {
  Health = 'Health',
  Dental = 'Dental',
  Vision = 'Vision',
  Life = 'Life',
  Disability = 'Disability',
  Retirement = 'Retirement',
  Wellness = 'Wellness',
  Education = 'Education',
  Other = 'Other'
}

export enum CoverageLevel {
  EmployeeOnly = 'EmployeeOnly',
  EmployeePlusSpouse = 'EmployeePlusSpouse',
  EmployeePlusChildren = 'EmployeePlusChildren',
  Family = 'Family'
}

export enum EligibilityRuleType {
  ServiceLength = 'ServiceLength',
  JobGrade = 'JobGrade',
  EmploymentStatus = 'EmploymentStatus',
  ContractType = 'ContractType',
  Department = 'Department',
  Branch = 'Branch'
}

export enum EnrollmentPeriodStatus {
  Upcoming = 'Upcoming',
  Open = 'Open',
  Closed = 'Closed',
  Cancelled = 'Cancelled'
}

export enum BenefitEnrollmentStatus {
  Pending = 'Pending',
  Active = 'Active',
  Suspended = 'Suspended',
  Terminated = 'Terminated',
  Cancelled = 'Cancelled',
  PendingApproval = 'PendingApproval'
}

export enum LifeEventType {
  Marriage = 'Marriage',
  Divorce = 'Divorce',
  Birth = 'Birth',
  Adoption = 'Adoption',
  Death = 'Death',
  DisabilityChange = 'DisabilityChange',
  JobChange = 'JobChange',
  Other = 'Other'
}

export enum BenefitClaimType {
  Medical = 'Medical',
  Dental = 'Dental',
  Vision = 'Vision',
  Prescription = 'Prescription',
  Preventive = 'Preventive',
  Emergency = 'Emergency',
  Other = 'Other'
}

export enum BenefitClaimStatus {
  Submitted = 'Submitted',
  UnderReview = 'UnderReview',
  Approved = 'Approved',
  PartiallyApproved = 'PartiallyApproved',
  Rejected = 'Rejected',
  Paid = 'Paid',
  Cancelled = 'Cancelled'
}

export enum DependentRelationship {
  Spouse = 'Spouse',
  Child = 'Child',
  Parent = 'Parent',
  Sibling = 'Sibling',
  Other = 'Other'
}

// ===== BENEFIT PLANS =====

export interface BenefitPlan {
  id: number;
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  benefitType: string;
  insuranceProviderId?: number;
  insuranceProviderName?: string;
  planYear: number;
  effectiveStartDate: string;
  effectiveEndDate: string;
  employeePremiumAmount: number;
  employerPremiumAmount: number;
  currency: string;
  coverageDetails?: string;
  coverageDetailsAr?: string;
  maxDependents?: number;
  dependentPremiumAmount: number;
  isActive: boolean;
  optionsCount?: number;
  enrollmentsCount?: number;
  options?: BenefitPlanOption[];
  eligibilityRules?: BenefitEligibilityRule[];
  createdAtUtc?: string;
  createdBy?: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface CreateBenefitPlanRequest {
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  benefitType: string;
  insuranceProviderId?: number;
  planYear: number;
  effectiveStartDate: string;
  effectiveEndDate: string;
  employeePremiumAmount: number;
  employerPremiumAmount: number;
  currency: string;
  coverageDetails?: string;
  coverageDetailsAr?: string;
  maxDependents?: number;
  dependentPremiumAmount: number;
  isActive: boolean;
}

export interface UpdateBenefitPlanRequest extends CreateBenefitPlanRequest {}

// ===== BENEFIT PLAN OPTIONS =====

export interface BenefitPlanOption {
  id: number;
  benefitPlanId: number;
  name: string;
  nameAr?: string;
  description?: string;
  employeeCost: number;
  employerCost: number;
  currency: string;
  coverageLevel: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface CreateBenefitPlanOptionRequest {
  name: string;
  nameAr?: string;
  description?: string;
  employeeCost: number;
  employerCost: number;
  currency: string;
  coverageLevel: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface UpdateBenefitPlanOptionRequest extends CreateBenefitPlanOptionRequest {}

// ===== ELIGIBILITY RULES =====

export interface BenefitEligibilityRule {
  id: number;
  benefitPlanId: number;
  ruleType: string;
  minServiceMonths?: number;
  minJobGradeLevel?: number;
  maxJobGradeLevel?: number;
  employmentStatusRequired?: string;
  contractTypeRequired?: string;
  departmentId?: number;
  departmentName?: string;
  branchId?: number;
  branchName?: string;
  isActive: boolean;
}

export interface CreateBenefitEligibilityRuleRequest {
  ruleType: string;
  minServiceMonths?: number;
  minJobGradeLevel?: number;
  maxJobGradeLevel?: number;
  employmentStatusRequired?: string;
  contractTypeRequired?: string;
  departmentId?: number;
  branchId?: number;
  isActive: boolean;
}

export interface UpdateBenefitEligibilityRuleRequest extends CreateBenefitEligibilityRuleRequest {}

// ===== OPEN ENROLLMENT PERIODS =====

export interface OpenEnrollmentPeriod {
  id: number;
  name: string;
  nameAr?: string;
  branchId?: number;
  branchName?: string;
  planYear: number;
  startDate: string;
  endDate: string;
  status: string;
  allowLifeEventChanges: boolean;
  notes?: string;
  isActive: boolean;
  createdAtUtc?: string;
  createdBy?: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface CreateOpenEnrollmentPeriodRequest {
  name: string;
  nameAr?: string;
  branchId?: number;
  planYear: number;
  startDate: string;
  endDate: string;
  allowLifeEventChanges: boolean;
  notes?: string;
  isActive: boolean;
}

export interface UpdateOpenEnrollmentPeriodRequest extends CreateOpenEnrollmentPeriodRequest {}

// ===== BENEFIT ENROLLMENTS =====

export interface BenefitEnrollment {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber?: string;
  benefitPlanId: number;
  benefitPlanName: string;
  benefitPlanCode?: string;
  benefitType?: string;
  benefitPlanOptionId?: number;
  planOptionName?: string;
  openEnrollmentPeriodId?: number;
  openEnrollmentPeriodName?: string;
  status: string;
  enrollmentDate: string;
  effectiveDate: string;
  terminationDate?: string;
  terminationReason?: string;
  employeeMonthlyContribution: number;
  employerMonthlyContribution: number;
  currency: string;
  lifeEventType?: string;
  lifeEventDate?: string;
  notes?: string;
  workflowInstanceId?: number;
  dependents?: BenefitDependent[];
  dependentsCount?: number;
  createdAtUtc?: string;
  createdBy?: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface CreateBenefitEnrollmentRequest {
  employeeId: number;
  benefitPlanId: number;
  benefitPlanOptionId?: number;
  openEnrollmentPeriodId?: number;
  enrollmentDate?: string;
  effectiveDate: string;
  employeeMonthlyContribution: number;
  employerMonthlyContribution: number;
  currency: string;
  lifeEventType?: string;
  lifeEventDate?: string;
  notes?: string;
}

// ===== BENEFIT DEPENDENTS =====

export interface BenefitDependent {
  id: number;
  employeeDependentId?: number;
  firstName: string;
  firstNameAr?: string;
  lastName: string;
  lastNameAr?: string;
  relationship: string;
  dateOfBirth?: string;
  nationalId?: string;
  coverageStartDate: string;
  coverageEndDate?: string;
  additionalPremium: number;
  currency: string;
  isActive: boolean;
}

// ===== BENEFIT CLAIMS =====

export interface BenefitClaim {
  id: number;
  benefitEnrollmentId: number;
  benefitPlanName?: string;
  benefitPlanCode?: string;
  benefitType?: string;
  employeeId: number;
  employeeName: string;
  employeeNumber?: string;
  claimDate: string;
  claimAmount: number;
  approvedAmount?: number;
  currency: string;
  claimType: string;
  description?: string;
  descriptionAr?: string;
  status: string;
  processedAt?: string;
  processedByUserId?: number;
  rejectionReason?: string;
  notes?: string;
  createdAtUtc?: string;
  createdBy?: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface CreateBenefitClaimRequest {
  benefitEnrollmentId: number;
  claimDate?: string;
  claimAmount: number;
  currency: string;
  claimType: string;
  description?: string;
  descriptionAr?: string;
  notes?: string;
}

export interface ApproveBenefitClaimRequest {
  approvedAmount?: number;
  comments?: string;
}

export interface RejectBenefitClaimRequest {
  rejectionReason: string;
}
