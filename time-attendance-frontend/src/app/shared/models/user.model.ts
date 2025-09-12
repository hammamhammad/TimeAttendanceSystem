export interface Role {
  id: number;
  name: string;
}

export interface Branch {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  preferredLanguage: string;
  roles: string[];
  permissions?: string[];
  branchIds?: number[];
  branches?: any[];
  isActive?: boolean;
  createdAt?: string;
  createdAtUtc?: string;
  lastLoginAt?: string;
  mustChangePassword?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEndUtc?: string;
  accessFailedCount?: number;
}

export interface UserDto {
  id: number;
  username: string;
  email: string;
  phone?: string;
  twoFactorEnabled: boolean;
  lockoutEndUtc?: string;
  mustChangePassword: boolean;
  preferredLanguage: string;
  isActive: boolean;
  createdAtUtc: string;
  roles: string[];
  branches: string[];
  permissions?: string[];
  branchIds?: number[];
  accessFailedCount?: number;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  phone?: string;
  password: string;
  preferredLanguage: string;
  roleIds: number[];
  branchIds: number[];
}

export interface UpdateUserRequest {
  email: string;
  phone?: string;
  preferredLanguage: string;
  isActive: boolean;
  roleIds?: number[];
  branchIds?: number[];
}

export interface AssignRoleRequest {
  roleId: number;
}

export interface AssignBranchRequest {
  branchId: number;
}

export interface PagedResult<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
  deviceInfo?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
  mustChangePassword: boolean;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
  mustChangePassword: boolean;
  user: User;
}