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
  // GPS Coordinates for mobile check-in
  latitude?: number | null;
  longitude?: number | null;
  geofenceRadiusMeters: number;
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
  latitude?: number | null;
  longitude?: number | null;
  geofenceRadiusMeters?: number;
}

export interface UpdateBranchRequest {
  code: string;
  name: string;
  timeZone: string;
  isActive: boolean;
  latitude?: number | null;
  longitude?: number | null;
  geofenceRadiusMeters?: number;
}

export interface UpdateBranchCoordinatesRequest {
  latitude: number | null;
  longitude: number | null;
  geofenceRadiusMeters: number;
}