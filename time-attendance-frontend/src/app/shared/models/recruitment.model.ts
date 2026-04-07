// ============================================================
// Recruitment Models
// ============================================================

// --- Enums (matching backend string serialization) ---

export type RequisitionStatus = 'Draft' | 'PendingApproval' | 'Approved' | 'Rejected' | 'Open' | 'OnHold' | 'Filled' | 'Cancelled';
export type RequisitionPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type JobEmploymentType = 'FullTime' | 'PartTime' | 'Contract' | 'Internship' | 'Temporary';
export type JobPostingStatus = 'Draft' | 'Active' | 'Published' | 'Paused' | 'Closed' | 'Expired';
export type ApplicationSource = 'Website' | 'Referral' | 'LinkedIn' | 'Indeed' | 'Agency' | 'University' | 'JobFair' | 'Internal' | 'Other';
export type ApplicationStatus = 'New' | 'Screening' | 'InterviewScheduled' | 'Interviewing' | 'Assessment' | 'OfferPending' | 'OfferExtended' | 'OfferDeclined' | 'Hired' | 'Rejected' | 'Withdrawn';
export type InterviewType = 'Phone' | 'Video' | 'InPerson' | 'Panel' | 'Technical' | 'HR';
export type InterviewResult = 'Pending' | 'Passed' | 'Failed' | 'OnHold' | 'NoShow' | 'Rescheduled';
export type InterviewRecommendation = 'StronglyRecommend' | 'Recommend' | 'Neutral' | 'DoNotRecommend' | 'StronglyDoNotRecommend';
export type OfferStatus = 'Draft' | 'PendingApproval' | 'Approved' | 'Sent' | 'Accepted' | 'Declined' | 'Expired' | 'Withdrawn';
export type ContractType = 'FullTime' | 'PartTime' | 'Contract' | 'Internship' | 'Temporary';
export type Gender = 'Male' | 'Female';

// --- Job Requisition ---

export interface JobRequisition {
  id: number;
  requisitionNumber: string;
  jobTitle: string;
  jobTitleAr?: string;
  description?: string;
  descriptionAr?: string;
  requirements?: string;
  branchId: number;
  branchName?: string;
  departmentId: number;
  departmentName?: string;
  jobGradeId?: number;
  jobGradeName?: string;
  employmentType: JobEmploymentType;
  numberOfPositions: number;
  filledPositions: number;
  priority: RequisitionPriority;
  status: RequisitionStatus;
  budgetedSalaryMin?: number;
  budgetedSalaryMax?: number;
  currency?: string;
  requiredSkills?: string;
  requiredQualifications?: string;
  requiredQualificationsAr?: string;
  requiredExperienceYears?: number;
  targetHireDate?: string;
  justification?: string;
  justificationAr?: string;
  isReplacement: boolean;
  replacingEmployeeId?: number;
  replacingEmployeeName?: string;
  requestedByEmployeeId?: number;
  requestedByEmployeeName?: string;
  rejectionReason?: string;
  approvedByUserId?: number;
  approvedAt?: string;
  notes?: string;
  workflowInstanceId?: number;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateJobRequisitionRequest {
  branchId: number;
  departmentId: number;
  jobTitle: string;
  jobTitleAr?: string;
  description?: string;
  descriptionAr?: string;
  jobGradeId?: number;
  employmentType: JobEmploymentType;
  numberOfPositions: number;
  priority: RequisitionPriority;
  budgetedSalaryMin?: number;
  budgetedSalaryMax?: number;
  currency?: string;
  requiredSkills?: string;
  requiredQualifications?: string;
  requiredQualificationsAr?: string;
  requiredExperienceYears?: number;
  targetHireDate?: string;
  justification?: string;
  justificationAr?: string;
  isReplacement: boolean;
  replacingEmployeeId?: number;
  requestedByEmployeeId?: number;
  notes?: string;
}

export interface RequisitionQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: RequisitionStatus;
  priority?: RequisitionPriority;
  departmentId?: number;
  branchId?: number;
}

// --- Job Posting ---

export interface JobPosting {
  id: number;
  jobRequisitionId: number;
  requisitionNumber?: string;
  jobTitle?: string;
  postingTitle: string;
  postingTitleAr?: string;
  externalDescription?: string;
  externalDescriptionAr?: string;
  responsibilities?: string;
  responsibilitiesAr?: string;
  benefits?: string;
  benefitsAr?: string;
  location?: string;
  locationAr?: string;
  branchName?: string;
  departmentName?: string;
  employmentType?: string;
  isInternal: boolean;
  isPublished: boolean;
  publishDate?: string;
  expiryDate?: string;
  applicationCount: number;
  status: JobPostingStatus;
  notes?: string;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateJobPostingRequest {
  jobRequisitionId: number;
  postingTitle: string;
  postingTitleAr?: string;
  externalDescription?: string;
  externalDescriptionAr?: string;
  responsibilities?: string;
  responsibilitiesAr?: string;
  benefits?: string;
  benefitsAr?: string;
  location?: string;
  locationAr?: string;
  isInternal: boolean;
  expiryDate?: string;
  notes?: string;
}

export interface PostingQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: JobPostingStatus;
  requisitionId?: number;
  isInternal?: boolean;
}

// --- Candidate ---

export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: Gender;
  nationality?: string;
  nationalityAr?: string;
  resumeUrl?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  source: ApplicationSource;
  referredByEmployeeId?: number;
  referredByEmployeeName?: string;
  currentCompany?: string;
  currentJobTitle?: string;
  yearsOfExperience?: number;
  skills?: string;
  notes?: string;
  status?: string;
  applicationCount?: number;
  convertedToEmployeeId?: number;
  convertedToEmployeeName?: string;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateCandidateRequest {
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  email?: string;
  phone?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: Gender;
  nationality?: string;
  nationalityAr?: string;
  resumeUrl?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  source: ApplicationSource;
  referredByEmployeeId?: number;
  currentCompany?: string;
  currentJobTitle?: string;
  yearsOfExperience?: number;
  skills?: string;
  notes?: string;
}

export interface CandidateQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  source?: ApplicationSource;
}

// --- Job Application ---

export interface JobApplication {
  id: number;
  candidateId: number;
  candidateName?: string;
  candidateEmail?: string;
  candidatePhone?: string;
  candidateResumeUrl?: string;
  jobPostingId: number;
  postingTitle?: string;
  requisitionNumber?: string;
  branchName?: string;
  departmentName?: string;
  status: ApplicationStatus;
  appliedDate: string;
  currentStage?: string;
  rating?: number;
  coverLetterUrl?: string;
  screeningNotes?: string;
  rejectionReason?: string;
  rejectionReasonAr?: string;
  reviewedByUserId?: number;
  reviewedAt?: string;
  notes?: string;
  interviews: InterviewSummary[];
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateJobApplicationRequest {
  candidateId: number;
  jobPostingId: number;
  coverLetterUrl?: string;
  notes?: string;
}

export interface AdvanceApplicationRequest {
  newStatus: ApplicationStatus;
  notes?: string;
}

export interface RejectApplicationRequest {
  reason: string;
  reasonAr?: string;
}

export interface ApplicationQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: ApplicationStatus;
  postingId?: number;
  candidateId?: number;
}

// --- Interview Schedule ---

export interface InterviewSchedule {
  id: number;
  jobApplicationId: number;
  candidateName?: string;
  candidateEmail?: string;
  postingTitle?: string;
  interviewType: InterviewType;
  interviewerEmployeeId: number;
  interviewerName?: string;
  scheduledDate: string;
  durationMinutes: number;
  location?: string;
  meetingLink?: string;
  result: InterviewResult;
  notes?: string;
  cancellationReason?: string;
  hasFeedback?: boolean;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface InterviewSummary {
  id: number;
  interviewType: InterviewType;
  interviewerName: string;
  scheduledDate: string;
  result: InterviewResult;
}

export interface CreateInterviewScheduleRequest {
  jobApplicationId: number;
  interviewType: InterviewType;
  interviewerEmployeeId: number;
  scheduledDate: string;
  durationMinutes: number;
  location?: string;
  meetingLink?: string;
  notes?: string;
}

export interface CompleteInterviewRequest {
  result: InterviewResult;
  notes?: string;
}

// --- Interview Feedback ---

export interface InterviewFeedback {
  id: number;
  interviewScheduleId: number;
  interviewerEmployeeId: number;
  interviewerName?: string;
  candidateName?: string;
  technicalScore: number;
  communicationScore: number;
  culturalFitScore: number;
  overallScore: number;
  recommendation: InterviewRecommendation;
  strengths?: string;
  weaknesses?: string;
  comments?: string;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateInterviewFeedbackRequest {
  interviewScheduleId: number;
  interviewerEmployeeId: number;
  technicalScore: number;
  communicationScore: number;
  culturalFitScore: number;
  overallScore: number;
  recommendation: InterviewRecommendation;
  strengths?: string;
  weaknesses?: string;
  comments?: string;
}

// --- Offer Letter ---

export interface OfferLetter {
  id: number;
  jobApplicationId: number;
  candidateId: number;
  candidateName?: string;
  candidateEmail?: string;
  jobTitle: string;
  jobTitleAr?: string;
  jobGradeId?: number;
  jobGradeName?: string;
  offeredSalary: number;
  currency: string;
  contractType: ContractType;
  employmentType?: string;
  startDate: string;
  expiryDate: string;
  benefitsDescription?: string;
  benefitsDescriptionAr?: string;
  specialConditions?: string;
  documentUrl?: string;
  status: OfferStatus;
  rejectionReason?: string;
  approvedByUserId?: number;
  approvedByName?: string;
  approvedAt?: string;
  sentAt?: string;
  respondedAt?: string;
  createdEmployeeId?: number;
  createdEmployeeName?: string;
  branchName?: string;
  departmentName?: string;
  notes?: string;
  workflowInstanceId?: number;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateOfferLetterRequest {
  jobApplicationId: number;
  jobTitle?: string;
  jobTitleAr?: string;
  jobGradeId?: number;
  offeredSalary: number;
  currency?: string;
  contractType: ContractType;
  startDate: string;
  expiryDate: string;
  benefitsDescription?: string;
  benefitsDescriptionAr?: string;
  specialConditions?: string;
  documentUrl?: string;
  notes?: string;
}

export interface DeclineOfferRequest {
  reason: string;
}

export interface OfferQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: OfferStatus;
  applicationId?: number;
}

// --- Paged Result ---

export interface RecruitmentPagedResult<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
