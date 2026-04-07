/**
 * Job grade model for frontend consumption.
 * Matches the backend JobGradeDto structure.
 */
export interface JobGrade {
  id: number;
  code: string;
  name: string;
  nameAr: string;
  level: number;
  minSalary: number;
  midSalary: number;
  maxSalary: number;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface CreateJobGradeRequest {
  code: string;
  name: string;
  nameAr: string;
  level: number;
  minSalary: number;
  midSalary: number;
  maxSalary: number;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
}

export interface UpdateJobGradeRequest {
  code: string;
  name: string;
  nameAr: string;
  level: number;
  minSalary: number;
  midSalary: number;
  maxSalary: number;
  description?: string;
  descriptionAr?: string;
  isActive: boolean;
}

export interface JobGradeQueryParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
}

export interface JobGradePagedResult {
  items: JobGrade[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface JobGradeDropdownItem {
  id: number;
  code: string;
  name: string;
  nameAr: string;
  level: number;
}
