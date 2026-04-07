/**
 * Employee transfer model for frontend consumption.
 * Matches the backend EmployeeTransferDto structure.
 */
export interface EmployeeTransfer {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  fromBranchId: number;
  fromBranchName: string;
  toBranchId: number;
  toBranchName: string;
  fromDepartmentId: number;
  fromDepartmentName: string;
  toDepartmentId: number;
  toDepartmentName: string;
  fromJobTitle?: string;
  toJobTitle?: string;
  effectiveDate: string;
  status: TransferStatus;
  transferType: TransferType;
  reason?: string;
  notes?: string;
  initiatedByUserId?: number;
  initiatedByName?: string;
  approvedByUserId?: number;
  approvedByName?: string;
  approvedAt?: string;
  completedAt?: string;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export enum TransferStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum TransferType {
  BranchTransfer = 'BranchTransfer',
  DepartmentTransfer = 'DepartmentTransfer',
  BranchAndDepartment = 'BranchAndDepartment',
  Relocation = 'Relocation'
}

export interface CreateEmployeeTransferRequest {
  employeeId: number;
  toBranchId: number;
  toDepartmentId?: number;
  toJobTitle?: string;
  toJobTitleAr?: string;
  effectiveDate: string;
  reason?: string;
  reasonAr?: string;
  notes?: string;
}

export interface UpdateEmployeeTransferRequest {
  toBranchId: number;
  toDepartmentId: number;
  toJobTitle?: string;
  effectiveDate: string;
  transferType: TransferType;
  reason?: string;
  notes?: string;
}

export interface TransferQueryParams {
  page?: number;
  pageSize?: number;
  employeeId?: number;
  branchId?: number;
  departmentId?: number;
  status?: TransferStatus;
  searchTerm?: string;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface TransferPagedResult {
  items: EmployeeTransfer[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
