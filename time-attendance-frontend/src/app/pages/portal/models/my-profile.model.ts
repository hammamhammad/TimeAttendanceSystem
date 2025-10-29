/**
 * My Profile Data Models
 * For employee self-service profile viewing and editing
 */

/**
 * User profile information
 */
export interface UserProfile {
  userId: number;
  userName: string;
  email: string;
  phoneNumber?: string;
  displayName?: string;
  employeeInfo?: EmployeeInfo;
  photoUrl?: string;
  isActive: boolean;
  createdAtUtc: Date;
  lastLoginAtUtc?: Date;
  roles: string[];
  branches: BranchAccess[];
}

/**
 * Employee information within profile
 */
export interface EmployeeInfo {
  employeeId: number;
  employeeCode: string;
  fullName: string;
  department?: string;
  departmentId?: number;
  branch?: string;
  branchId?: number;
  position?: string;
  hireDate?: Date;
  nationalId?: string;
  address?: string;
  birthDate?: Date;
  gender?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

/**
 * Branch access information
 */
export interface BranchAccess {
  branchId: number;
  branchName: string;
  isDefault: boolean;
}

/**
 * Update profile request (only editable fields)
 */
export interface UpdateProfileRequest {
  phoneNumber?: string;
  email?: string;
  displayName?: string;
  // Employee-editable fields (if any)
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

/**
 * Change password request
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Upload photo response
 */
export interface UploadPhotoResponse {
  photoUrl: string;
  message: string;
}
