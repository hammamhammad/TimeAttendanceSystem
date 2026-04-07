// ===== Enums =====

export enum DocumentCategory {
  PersonalId = 'PersonalId',
  Contract = 'Contract',
  Certificate = 'Certificate',
  License = 'License',
  Medical = 'Medical',
  Visa = 'Visa',
  Insurance = 'Insurance',
  Training = 'Training',
  Other = 'Other'
}

export enum DocumentStatus {
  Active = 'Active',
  Expired = 'Expired',
  PendingVerification = 'PendingVerification',
  Verified = 'Verified',
  Rejected = 'Rejected',
  Archived = 'Archived'
}

export enum PolicyStatus {
  Draft = 'Draft',
  Published = 'Published',
  Archived = 'Archived'
}

export enum LetterType {
  SalaryCertificate = 'SalaryCertificate',
  EmploymentLetter = 'EmploymentLetter',
  ExperienceLetter = 'ExperienceLetter',
  NOC = 'NOC',
  Custom = 'Custom'
}

export enum LetterRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Generated = 'Generated',
  Delivered = 'Delivered'
}

// ===== Document Category =====

export interface DocumentCategoryDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  isActive: boolean;
  documentCount: number;
  createdAtUtc: string;
}

export interface CreateDocumentCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  isActive: boolean;
}

export interface UpdateDocumentCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  isActive: boolean;
}

// ===== Employee Document =====

export interface EmployeeDocumentDto {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  categoryId: number;
  categoryName: string;
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  documentNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  status: DocumentStatus;
  isVerified: boolean;
  verifiedByName?: string;
  verifiedAtUtc?: string;
  notes?: string;
  createdAtUtc: string;
}

export interface CreateEmployeeDocumentRequest {
  employeeId: number;
  categoryId: number;
  title: string;
  description?: string;
  documentNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  notes?: string;
}

// ===== Company Policy =====

export interface CompanyPolicyDto {
  id: number;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  documentCategoryId?: number;
  categoryName?: string;
  documentUrl?: string;
  version: string;
  status: PolicyStatus;
  effectiveDate: string;
  expiryDate?: string;
  fileName?: string;
  fileUrl?: string;
  requiresAcknowledgment: boolean;
  acknowledgmentCount: number;
  totalEmployees: number;
  createdByName: string;
  createdAtUtc: string;
}

export interface CreateCompanyPolicyRequest {
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  documentCategoryId?: number;
  version: string;
  effectiveDate: string;
  expiryDate?: string;
  requiresAcknowledgment: boolean;
}

export interface PolicyAcknowledgmentDto {
  id: number;
  policyId: number;
  employeeId: number;
  employeeName: string;
  acknowledgedAtUtc: string;
}

// ===== Letter Template =====

export interface LetterTemplateDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  category: string;
  htmlContent: string;
  placeholders: string[];
  isActive: boolean;
  usageCount: number;
  createdAtUtc: string;
}

export interface CreateLetterTemplateRequest {
  name: string;
  nameAr?: string;
  description?: string;
  category: string;
  htmlContent: string;
  isActive: boolean;
}

export interface UpdateLetterTemplateRequest {
  name: string;
  nameAr?: string;
  description?: string;
  category: string;
  htmlContent: string;
  isActive: boolean;
}

// ===== Letter Request =====

export interface LetterRequestDto {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  templateId: number;
  templateName: string;
  purpose?: string;
  status: LetterRequestStatus;
  generatedFileUrl?: string;
  requestedAtUtc: string;
  processedByName?: string;
  processedAtUtc?: string;
  rejectionReason?: string;
  notes?: string;
}

export interface CreateLetterRequestRequest {
  employeeId: number;
  letterType: LetterType;
  purpose?: string;
  purposeAr?: string;
  additionalNotes?: string;
}
