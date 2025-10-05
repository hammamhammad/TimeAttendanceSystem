import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface AuditLog {
  id: number;
  actorUserId: number | null;
  actorUsername: string | null;
  actorEmail: string | null;
  action: string;
  actionDisplayName: string;
  entityName: string;
  entityId: string;
  payloadJson: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAtUtc: string;
  createdBy: string;
}

export interface AuditLogsResponse {
  auditLogs: AuditLog[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface AuditLogsFilters {
  startDate?: string;
  endDate?: string;
  actions?: string[];
  entityName?: string;
  actorUserId?: number;
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditLogsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1/audit-logs`;

  /**
   * Get audit logs with filtering and pagination
   */
  getAuditLogs(filters: AuditLogsFilters = {}): Observable<AuditLogsResponse> {
    let params = new HttpParams();

    if (filters.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params = params.set('endDate', filters.endDate);
    }
    if (filters.actions && filters.actions.length > 0) {
      params = params.set('actions', filters.actions.join(','));
    }
    if (filters.entityName) {
      params = params.set('entityName', filters.entityName);
    }
    if (filters.actorUserId) {
      params = params.set('actorUserId', filters.actorUserId.toString());
    }
    if (filters.searchTerm) {
      params = params.set('searchTerm', filters.searchTerm);
    }
    if (filters.pageNumber) {
      params = params.set('pageNumber', filters.pageNumber.toString());
    }
    if (filters.pageSize) {
      params = params.set('pageSize', filters.pageSize.toString());
    }
    if (filters.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }
    if (filters.sortDirection) {
      params = params.set('sortDirection', filters.sortDirection);
    }

    return this.http.get<AuditLogsResponse>(this.apiUrl, { params });
  }

  /**
   * Get unique entity names for filtering
   */
  getEntityNames(): string[] {
    return [
      'User',
      'Employee',
      'Shift',
      'ShiftAssignment',
      'VacationType',
      'VacationRequest',
      'Branch',
      'Department',
      'AttendanceRecord',
      'PublicHoliday',
      'ExcusePolicy',
      'OvertimeConfiguration',
      'Settings'
    ];
  }

  /**
   * Get available audit actions for filtering
   */
  getAuditActions(): { value: string; label: string }[] {
    return [
      // Authentication & Authorization
      { value: 'Login', label: 'Login' },
      { value: 'Logout', label: 'Logout' },
      { value: 'LogoutAllDevices', label: 'Logout All Devices' },
      { value: 'TokenRefresh', label: 'Token Refresh' },
      { value: 'PasswordChange', label: 'Password Change' },
      { value: 'PasswordReset', label: 'Password Reset' },
      { value: 'PasswordResetRequest', label: 'Password Reset Request' },
      { value: 'AccountLockout', label: 'Account Lockout' },
      { value: 'AccountUnlock', label: 'Account Unlock' },
      { value: 'TwoFactorEnabled', label: 'Two-Factor Enabled' },
      { value: 'TwoFactorDisabled', label: 'Two-Factor Disabled' },
      { value: 'TwoFactorVerified', label: 'Two-Factor Verified' },
      { value: 'SessionCreated', label: 'Session Created' },
      { value: 'SessionTerminated', label: 'Session Terminated' },
      { value: 'SessionExpired', label: 'Session Expired' },

      // User Management
      { value: 'UserCreated', label: 'User Created' },
      { value: 'UserUpdated', label: 'User Updated' },
      { value: 'UserDeleted', label: 'User Deleted' },
      { value: 'UserActivated', label: 'User Activated' },
      { value: 'UserDeactivated', label: 'User Deactivated' },
      { value: 'UserRoleAssigned', label: 'User Role Assigned' },
      { value: 'UserRoleRevoked', label: 'User Role Revoked' },
      { value: 'UserBranchScopeAssigned', label: 'User Branch Scope Assigned' },
      { value: 'UserBranchScopeRevoked', label: 'User Branch Scope Revoked' },

      // Employee Management
      { value: 'EmployeeCreated', label: 'Employee Created' },
      { value: 'EmployeeUpdated', label: 'Employee Updated' },
      { value: 'EmployeeDeleted', label: 'Employee Deleted' },
      { value: 'EmployeeActivated', label: 'Employee Activated' },
      { value: 'EmployeeDeactivated', label: 'Employee Deactivated' },

      // Shift Management
      { value: 'ShiftCreated', label: 'Shift Created' },
      { value: 'ShiftUpdated', label: 'Shift Updated' },
      { value: 'ShiftDeleted', label: 'Shift Deleted' },

      // Shift Assignment Management
      { value: 'ShiftAssignmentCreated', label: 'Shift Assignment Created' },
      { value: 'ShiftAssignmentUpdated', label: 'Shift Assignment Updated' },
      { value: 'ShiftAssignmentDeleted', label: 'Shift Assignment Deleted' },
      { value: 'ShiftAssignmentActivated', label: 'Shift Assignment Activated' },
      { value: 'ShiftAssignmentDeactivated', label: 'Shift Assignment Deactivated' },

      // Vacation Management
      { value: 'VacationTypeCreated', label: 'Vacation Type Created' },
      { value: 'VacationTypeUpdated', label: 'Vacation Type Updated' },
      { value: 'VacationTypeDeleted', label: 'Vacation Type Deleted' },
      { value: 'VacationRequestCreated', label: 'Vacation Request Created' },
      { value: 'VacationRequestUpdated', label: 'Vacation Request Updated' },
      { value: 'VacationRequestApproved', label: 'Vacation Request Approved' },
      { value: 'VacationRequestRejected', label: 'Vacation Request Rejected' },
      { value: 'VacationRequestCancelled', label: 'Vacation Request Cancelled' },

      // System Actions
      { value: 'SystemStartup', label: 'System Startup' },
      { value: 'SystemShutdown', label: 'System Shutdown' },
      { value: 'DatabaseMigration', label: 'Database Migration' },

      // Generic CRUD Operations
      { value: 'Created', label: 'Created' },
      { value: 'Updated', label: 'Updated' },
      { value: 'Deleted', label: 'Deleted' },
      { value: 'Viewed', label: 'Viewed' }
    ];
  }
}
