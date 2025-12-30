export interface DepartmentDto {
  id: number;
  branchId: number;
  branchName: string;
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  parentDepartmentId?: number;
  parentDepartmentName?: string;
  managerEmployeeId?: number;
  managerName?: string;
  costCenter?: string;
  location?: string;
  phone?: string;
  email?: string;
  sortOrder: number;
  isActive: boolean;
  employeeCount: number;
  level: number;
  path: string;
  hasChildren: boolean;
  createdAtUtc: string;
  children?: DepartmentDto[];
}

export interface CreateDepartmentRequest {
  branchId: number;
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  parentDepartmentId?: number;
  managerEmployeeId?: number;
  costCenter?: string;
  location?: string;
  phone?: string;
  email?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateDepartmentRequest {
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  parentDepartmentId?: number;
  managerEmployeeId?: number;
  costCenter?: string;
  location?: string;
  phone?: string;
  email?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface DepartmentFilter {
  branchId?: number;
  includeTree?: boolean;
  isActive?: boolean;
  search?: string;
  parentDepartmentId?: number;
  includeInactive?: boolean;
}

export interface DepartmentTreeNode extends DepartmentDto {
  expanded?: boolean;
  selected?: boolean;
  indentLevel?: number;
}

export type Department = DepartmentDto;