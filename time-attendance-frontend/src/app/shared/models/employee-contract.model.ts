/**
 * Employee contract model for frontend consumption.
 * Matches the backend EmployeeContractDto structure.
 */
export interface EmployeeContract {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  contractNumber: string;
  contractType: ContractType;
  status: ContractStatus;
  startDate: string;
  endDate?: string;
  renewalDate?: string;
  autoRenew: boolean;
  basicSalary: number;
  currency: string;
  probationPeriodDays?: number;
  probationEndDate?: string;
  probationStatus: ProbationStatus;
  noticePeriodDays?: number;
  terms?: string;
  termsAr?: string;
  documentUrl?: string;
  notes?: string;
  approvedByUserId?: number;
  approvedByName?: string;
  approvedAt?: string;
  previousContractId?: number;
  branchName?: string;
  departmentName?: string;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export enum ContractType {
  Permanent = 'Permanent',
  FixedTerm = 'FixedTerm',
  Probation = 'Probation',
  Internship = 'Internship',
  Consultancy = 'Consultancy'
}

export enum ContractStatus {
  Draft = 'Draft',
  Active = 'Active',
  Expired = 'Expired',
  Terminated = 'Terminated',
  Renewed = 'Renewed',
  Suspended = 'Suspended'
}

export enum ProbationStatus {
  NotApplicable = 'NotApplicable',
  InProgress = 'InProgress',
  Passed = 'Passed',
  Failed = 'Failed',
  Extended = 'Extended'
}

export interface CreateEmployeeContractRequest {
  employeeId: number;
  contractNumber: string;
  contractType: ContractType;
  startDate: string;
  endDate?: string;
  renewalDate?: string;
  autoRenew: boolean;
  basicSalary: number;
  currency: string;
  probationPeriodDays?: number;
  probationEndDate?: string;
  probationStatus: ProbationStatus;
  noticePeriodDays?: number;
  terms?: string;
  termsAr?: string;
  documentUrl?: string;
  notes?: string;
}

export interface UpdateEmployeeContractRequest {
  contractNumber: string;
  contractType: ContractType;
  startDate: string;
  endDate?: string;
  autoRenew: boolean;
  basicSalary: number;
  currency: string;
  probationPeriodDays?: number;
  noticePeriodDays?: number;
  terms?: string;
  termsAr?: string;
  notes?: string;
}

export interface ContractQueryParams {
  page?: number;
  pageSize?: number;
  employeeId?: number;
  branchId?: number;
  status?: ContractStatus;
  contractType?: ContractType;
  searchTerm?: string;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface ContractPagedResult {
  items: EmployeeContract[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
