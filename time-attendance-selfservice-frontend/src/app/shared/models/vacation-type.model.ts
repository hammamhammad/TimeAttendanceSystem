export interface VacationType {
  id: number;
  branchId: number | null;
  branchName: string | null;
  name: string;
  nameAr?: string;
  isActive: boolean;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface VacationTypeDto {
  id: number;
  branchId: number | null;
  branchName: string | null;
  name: string;
  nameAr?: string;
  isActive: boolean;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface VacationTypeDetailDto {
  id: number;
  branchId: number | null;
  branchName: string | null;
  name: string;
  nameAr?: string;
  isActive: boolean;
  createdAtUtc: string;
  modifiedAtUtc?: string;
  canBeModified: boolean;
  canBeDeleted: boolean;
}

export interface CreateVacationTypeRequest {
  branchId: number | null;
  name: string;
  nameAr?: string;
}

export interface UpdateVacationTypeRequest {
  branchId: number | null;
  name: string;
  nameAr?: string;
}

export interface VacationTypesQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  branchId?: number;
  isActive?: boolean;
}

export interface VacationTypeFilter {
  search?: string;
  branchId?: number;
  isActive?: boolean;
}

export interface VacationTypeFormData {
  branchId: number | null;
  name: string;
  nameAr?: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}