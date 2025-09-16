export interface EmployeeDto {
  id: number;
  branchId: number;
  branchName: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  fullName: string;
  fullNameAr?: string;
  nationalId?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  hireDate: string;
  employmentStatus: EmploymentStatus;
  jobTitle: string;
  jobTitleAr?: string;
  departmentId?: number;
  departmentName?: string;
  managerEmployeeId?: number;
  managerName?: string;
  workLocationType: WorkLocationType;
  photoUrl?: string;
  currentShiftId?: number;
  currentShiftName?: string;
  isActive: boolean;
  createdAtUtc: string;
}

export interface CreateEmployeeRequest {
  branchId: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  nationalId?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  hireDate: string;
  employmentStatus: EmploymentStatus;
  jobTitle: string;
  jobTitleAr?: string;
  departmentId?: number;
  managerEmployeeId?: number;
  workLocationType: WorkLocationType;
}

export interface UpdateEmployeeRequest {
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  employmentStatus: EmploymentStatus;
  jobTitle: string;
  jobTitleAr?: string;
  departmentId?: number;
  managerEmployeeId?: number;
  workLocationType: WorkLocationType;
  photoUrl?: string;
}

export interface EmployeesFilter {
  page?: number;
  pageSize?: number;
  search?: string;
  branchId?: number;
  departmentId?: number;
  managerId?: number;
  isActive?: boolean;
  employmentStatus?: string;
  // Sorting properties
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export enum Gender {
  Male = 1,
  Female = 2
}

export enum EmploymentStatus {
  FullTime = 1,
  PartTime = 2,
  Contract = 3,
  Intern = 4,
  Consultant = 5,
  Terminated = 6
}

export enum WorkLocationType {
  OnSite = 1,
  Remote = 2,
  Hybrid = 3
}

export interface BranchDto {
  id: number;
  name: string;
  code: string;
  location?: string;
  isActive: boolean;
}

export interface DepartmentDto {
  id: number;
  name: string;
  nameAr?: string;
  branchId: number;
  parentDepartmentId?: number;
  isActive: boolean;
}

export interface EmployeeSelectOption {
  id: number;
  name: string;
  employeeNumber: string;
}

export type Employee = EmployeeDto;