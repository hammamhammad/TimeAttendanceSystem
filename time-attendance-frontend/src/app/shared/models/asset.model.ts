// Asset Management Models

export enum AssetStatus {
  Available = 'Available',
  Assigned = 'Assigned',
  UnderMaintenance = 'UnderMaintenance',
  Retired = 'Retired',
  Lost = 'Lost',
  Disposed = 'Disposed'
}

export enum AssetCondition {
  New = 'New',
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor',
  Damaged = 'Damaged'
}

export enum AssetAssignmentStatus {
  Active = 'Active',
  Returned = 'Returned',
  Lost = 'Lost',
  Damaged = 'Damaged'
}

export enum MaintenanceType {
  Preventive = 'Preventive',
  Corrective = 'Corrective',
  Emergency = 'Emergency',
  Upgrade = 'Upgrade',
  Inspection = 'Inspection'
}

export enum MaintenanceStatus {
  Scheduled = 'Scheduled',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

// Category
export interface AssetCategoryDto {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  parentCategoryId?: number;
  parentCategoryName?: string;
  assetCount: number;
  isActive: boolean;
  createdAtUtc: string;
}

export interface CreateAssetCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  parentCategoryId?: number;
  isActive: boolean;
}

export interface UpdateAssetCategoryRequest {
  name: string;
  nameAr?: string;
  description?: string;
  parentCategoryId?: number;
  isActive: boolean;
}

// Asset
export interface AssetDto {
  id: number;
  assetTag: string;
  name: string;
  nameAr?: string;
  description?: string;
  categoryId: number;
  categoryName?: string;
  branchId: number;
  branchName?: string;
  serialNumber?: string;
  model?: string;
  manufacturer?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currency?: string;
  warrantyExpiryDate?: string;
  status: AssetStatus;
  condition: AssetCondition;
  location?: string;
  notes?: string;
  isActive: boolean;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface CreateAssetRequest {
  assetTag: string;
  name: string;
  nameAr?: string;
  description?: string;
  categoryId: number;
  branchId: number;
  serialNumber?: string;
  model?: string;
  manufacturer?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currency?: string;
  warrantyExpiryDate?: string;
  status: AssetStatus;
  condition: AssetCondition;
  location?: string;
  notes?: string;
}

export interface UpdateAssetRequest {
  assetTag: string;
  name: string;
  nameAr?: string;
  description?: string;
  categoryId: number;
  branchId: number;
  serialNumber?: string;
  model?: string;
  manufacturer?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  currency?: string;
  warrantyExpiryDate?: string;
  status: AssetStatus;
  condition: AssetCondition;
  location?: string;
  notes?: string;
}

// Assignment
export interface AssetAssignmentDto {
  id: number;
  assetId: number;
  assetName?: string;
  assetTag?: string;
  employeeId: number;
  employeeName?: string;
  employeeNumber?: string;
  assignedDate: string;
  returnDate?: string;
  expectedReturnDate?: string;
  status: AssetAssignmentStatus;
  notes?: string;
  assignedBy?: string;
  returnedBy?: string;
  createdAtUtc: string;
}

export interface CreateAssetAssignmentRequest {
  assetId: number;
  employeeId: number;
  assignedDate: string;
  expectedReturnDate?: string;
  notes?: string;
}

export interface ReturnAssetRequest {
  returnDate: string;
  condition: AssetCondition;
  notes?: string;
}

// Maintenance
export interface AssetMaintenanceDto {
  id: number;
  assetId: number;
  assetName?: string;
  assetTag?: string;
  maintenanceType: MaintenanceType;
  status: MaintenanceStatus;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  cost?: number;
  currency?: string;
  vendor?: string;
  notes?: string;
  createdAtUtc: string;
}

export interface CreateAssetMaintenanceRequest {
  assetId: number;
  maintenanceType: MaintenanceType;
  status: MaintenanceStatus;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  cost?: number;
  currency?: string;
  vendor?: string;
  notes?: string;
}

export interface UpdateAssetMaintenanceRequest {
  maintenanceType: MaintenanceType;
  status: MaintenanceStatus;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  cost?: number;
  currency?: string;
  vendor?: string;
  notes?: string;
}

// Paged result
export interface PagedResult<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Query params
export interface AssetQueryParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  categoryId?: number;
  branchId?: number;
  status?: string;
}

export interface AssignmentQueryParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  status?: string;
  employeeId?: number;
}

export interface MaintenanceQueryParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  assetId?: number;
  status?: string;
  maintenanceType?: string;
}
