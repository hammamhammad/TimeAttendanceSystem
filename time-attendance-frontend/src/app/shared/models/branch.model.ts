export interface Branch {
  id: number;
  code: string;
  name: string;
  timeZone: string;
  isActive: boolean;
  employeeCount: number;
  departmentCount: number;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BranchesResponse extends PagedResult<Branch> {}

export interface CreateBranchRequest {
  code: string;
  name: string;
  timeZone: string;
  isActive?: boolean;
}

export interface UpdateBranchRequest {
  code: string;
  name: string;
  timeZone: string;
  isActive: boolean;
}