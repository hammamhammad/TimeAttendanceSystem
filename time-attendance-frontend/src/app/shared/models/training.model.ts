// ============================================================
// Training & Development Models
// ============================================================

// --- Enums (matching backend string serialization) ---

export type TrainingDeliveryMethod = 'InPerson' | 'Online' | 'Hybrid' | 'SelfPaced' | 'OnTheJob';
export type TrainingProgramStatus = 'Draft' | 'Active' | 'Completed' | 'Cancelled' | 'Archived';
export type TrainingSessionStatus = 'Scheduled' | 'InProgress' | 'Completed' | 'Cancelled' | 'Postponed';
export type TrainingEnrollmentStatus = 'Pending' | 'Approved' | 'Rejected' | 'Enrolled' | 'Completed' | 'Withdrawn' | 'NoShow';
export type TrainingAttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';
export type CertificationStatus = 'Active' | 'Expired' | 'Revoked' | 'Pending';

// --- Training Category ---

export interface TrainingCategoryDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  isActive: boolean;
  courseCount: number;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface CreateTrainingCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  isActive: boolean;
}

export interface UpdateTrainingCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  isActive: boolean;
}

// --- Training Course ---

export interface TrainingCourseDto {
  id: number;
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  categoryId: number;
  categoryName?: string;
  deliveryMethod: TrainingDeliveryMethod;
  durationHours: number;
  maxParticipants?: number;
  prerequisites?: string;
  objectives?: string;
  isActive: boolean;
  isMandatory: boolean;
  costPerParticipant?: number;
  currency?: string;
  providerName?: string;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateTrainingCourseRequest {
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  categoryId: number;
  deliveryMethod: TrainingDeliveryMethod;
  durationHours: number;
  maxParticipants?: number;
  prerequisites?: string;
  objectives?: string;
  isActive: boolean;
  isMandatory: boolean;
  costPerParticipant?: number;
  currency?: string;
  providerName?: string;
}

export interface UpdateTrainingCourseRequest extends CreateTrainingCourseRequest {}

// --- Training Program ---

export interface TrainingProgramDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  status: TrainingProgramStatus;
  startDate?: string;
  endDate?: string;
  totalDurationHours: number;
  branchId?: number;
  branchName?: string;
  departmentId?: number;
  departmentName?: string;
  courses: TrainingProgramCourseDto[];
  courseCount: number;
  isActive: boolean;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface TrainingProgramCourseDto {
  id: number;
  courseId: number;
  courseName: string;
  courseCode: string;
  sequenceOrder: number;
  isMandatory: boolean;
}

export interface CreateTrainingProgramRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  status: TrainingProgramStatus;
  startDate?: string;
  endDate?: string;
  branchId?: number;
  departmentId?: number;
  courseIds?: number[];
}

export interface UpdateTrainingProgramRequest extends CreateTrainingProgramRequest {}

// --- Training Session ---

export interface TrainingSessionDto {
  id: number;
  courseId: number;
  courseName?: string;
  courseCode?: string;
  programId?: number;
  programName?: string;
  title: string;
  titleAr?: string;
  status: TrainingSessionStatus;
  deliveryMethod: TrainingDeliveryMethod;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  locationAr?: string;
  onlineLink?: string;
  trainerId?: number;
  trainerName?: string;
  maxParticipants: number;
  enrolledCount: number;
  branchId?: number;
  branchName?: string;
  notes?: string;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateTrainingSessionRequest {
  courseId: number;
  programId?: number;
  title: string;
  titleAr?: string;
  deliveryMethod: TrainingDeliveryMethod;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  locationAr?: string;
  onlineLink?: string;
  trainerId?: number;
  maxParticipants: number;
  branchId?: number;
  notes?: string;
}

export interface UpdateTrainingSessionRequest extends CreateTrainingSessionRequest {}

// --- Training Enrollment ---

export interface TrainingEnrollmentDto {
  id: number;
  sessionId: number;
  sessionTitle?: string;
  courseName?: string;
  employeeId: number;
  employeeName?: string;
  employeeNumber?: string;
  status: TrainingEnrollmentStatus;
  enrollmentDate: string;
  completionDate?: string;
  score?: number;
  certificateIssued: boolean;
  notes?: string;
  approvedByName?: string;
  rejectionReason?: string;
  createdAtUtc: string;
}

export interface CreateTrainingEnrollmentRequest {
  sessionId: number;
  employeeId: number;
  notes?: string;
}

export interface BulkEnrollmentRequest {
  sessionId: number;
  employeeIds: number[];
}

// --- Training Attendance ---

export interface TrainingAttendanceDto {
  id: number;
  sessionId: number;
  employeeId: number;
  employeeName?: string;
  employeeNumber?: string;
  attendanceDate: string;
  status: TrainingAttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

export interface MarkTrainingAttendanceRequest {
  sessionId: number;
  attendances: {
    employeeId: number;
    attendanceDate: string;
    status: TrainingAttendanceStatus;
    checkInTime?: string;
    checkOutTime?: string;
    notes?: string;
  }[];
}

// --- Training Evaluation ---

export interface TrainingEvaluationDto {
  id: number;
  sessionId: number;
  sessionTitle?: string;
  employeeId: number;
  employeeName?: string;
  overallRating: number;
  contentRating: number;
  trainerRating: number;
  materialRating: number;
  venueRating: number;
  comments?: string;
  suggestions?: string;
  wouldRecommend: boolean;
  createdAtUtc: string;
}

export interface CreateTrainingEvaluationRequest {
  sessionId: number;
  employeeId: number;
  overallRating: number;
  contentRating: number;
  trainerRating: number;
  materialRating: number;
  venueRating: number;
  comments?: string;
  suggestions?: string;
  wouldRecommend: boolean;
}

export interface SessionEvaluationSummaryDto {
  sessionId: number;
  sessionTitle: string;
  totalEvaluations: number;
  averageOverallRating: number;
  averageContentRating: number;
  averageTrainerRating: number;
  averageMaterialRating: number;
  averageVenueRating: number;
  recommendationRate: number;
}

// --- Employee Certification ---

export interface EmployeeCertificationDto {
  id: number;
  employeeId: number;
  employeeName?: string;
  employeeNumber?: string;
  certificationName: string;
  certificationNameAr?: string;
  issuingOrganization: string;
  issuingOrganizationAr?: string;
  credentialId?: string;
  issueDate: string;
  expiryDate?: string;
  status: CertificationStatus;
  courseId?: number;
  courseName?: string;
  sessionId?: number;
  sessionTitle?: string;
  notes?: string;
  fileUrl?: string;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateEmployeeCertificationRequest {
  employeeId: number;
  certificationName: string;
  certificationNameAr?: string;
  issuingOrganization: string;
  issuingOrganizationAr?: string;
  credentialId?: string;
  issueDate: string;
  expiryDate?: string;
  status: CertificationStatus;
  courseId?: number;
  sessionId?: number;
  notes?: string;
}

export interface UpdateEmployeeCertificationRequest extends CreateEmployeeCertificationRequest {}

// --- Training Budget ---

export interface TrainingBudgetDto {
  id: number;
  year: number;
  branchId?: number;
  branchName?: string;
  departmentId?: number;
  departmentName?: string;
  totalBudget: number;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  currency: string;
  notes?: string;
  utilizationPercentage: number;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateTrainingBudgetRequest {
  year: number;
  branchId?: number;
  departmentId?: number;
  totalBudget: number;
  currency: string;
  notes?: string;
}

export interface UpdateTrainingBudgetRequest extends CreateTrainingBudgetRequest {}

export interface TrainingBudgetSummaryDto {
  totalBudget: number;
  totalAllocated: number;
  totalSpent: number;
  totalRemaining: number;
  overallUtilization: number;
}
