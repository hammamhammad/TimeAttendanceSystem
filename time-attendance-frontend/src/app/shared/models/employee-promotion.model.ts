/**
 * Employee promotion model for frontend consumption.
 * Matches the backend EmployeePromotionDto structure.
 */
export interface EmployeePromotion {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  oldJobTitle: string;
  newJobTitle: string;
  oldGradeId?: number;
  oldGradeName?: string;
  newGradeId?: number;
  newGradeName?: string;
  oldSalary?: number;
  newSalary?: number;
  effectiveDate: string;
  status: PromotionStatus;
  promotionType: PromotionType;
  reason?: string;
  notes?: string;
  initiatedByUserId?: number;
  initiatedByName?: string;
  approvedByUserId?: number;
  approvedByName?: string;
  approvedAt?: string;
  branchName?: string;
  departmentName?: string;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export enum PromotionStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Effective = 'Effective',
  Cancelled = 'Cancelled'
}

export enum PromotionType {
  TitleChange = 'TitleChange',
  GradePromotion = 'GradePromotion',
  SalaryIncrease = 'SalaryIncrease',
  FullPromotion = 'FullPromotion',
  Demotion = 'Demotion'
}

export interface CreateEmployeePromotionRequest {
  employeeId: number;
  newJobTitle: string;
  newJobTitleAr?: string;
  newGrade?: string;
  newDepartmentId?: number;
  newBaseSalary?: number;
  effectiveDate: string;
  reason?: string;
  reasonAr?: string;
  notes?: string;
}

export interface UpdateEmployeePromotionRequest {
  newJobTitle: string;
  newGradeId?: number;
  newSalary?: number;
  effectiveDate: string;
  promotionType: PromotionType;
  reason?: string;
  notes?: string;
}

export interface PromotionQueryParams {
  page?: number;
  pageSize?: number;
  employeeId?: number;
  branchId?: number;
  departmentId?: number;
  status?: PromotionStatus;
  searchTerm?: string;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface PromotionPagedResult {
  items: EmployeePromotion[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
