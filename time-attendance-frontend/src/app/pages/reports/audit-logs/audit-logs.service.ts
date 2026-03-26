import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { I18nService } from '../../../core/i18n/i18n.service';

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
  private i18n = inject(I18nService);
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
      { value: 'Login', label: this.i18n.t('audit_logs.actions.login') },
      { value: 'Logout', label: this.i18n.t('audit_logs.actions.logout') },
      { value: 'LogoutAllDevices', label: this.i18n.t('audit_logs.actions.logout_all_devices') },
      { value: 'TokenRefresh', label: this.i18n.t('audit_logs.actions.token_refresh') },
      { value: 'PasswordChange', label: this.i18n.t('audit_logs.actions.password_change') },
      { value: 'PasswordReset', label: this.i18n.t('audit_logs.actions.password_reset') },
      { value: 'PasswordResetRequest', label: this.i18n.t('audit_logs.actions.password_reset_request') },
      { value: 'AccountLockout', label: this.i18n.t('audit_logs.actions.account_lockout') },
      { value: 'AccountUnlock', label: this.i18n.t('audit_logs.actions.account_unlock') },
      { value: 'TwoFactorEnabled', label: this.i18n.t('audit_logs.actions.two_factor_enabled') },
      { value: 'TwoFactorDisabled', label: this.i18n.t('audit_logs.actions.two_factor_disabled') },
      { value: 'TwoFactorVerified', label: this.i18n.t('audit_logs.actions.two_factor_verified') },
      { value: 'SessionCreated', label: this.i18n.t('audit_logs.actions.session_created') },
      { value: 'SessionTerminated', label: this.i18n.t('audit_logs.actions.session_terminated') },
      { value: 'SessionExpired', label: this.i18n.t('audit_logs.actions.session_expired') },

      // User Management
      { value: 'UserCreated', label: this.i18n.t('audit_logs.actions.user_created') },
      { value: 'UserUpdated', label: this.i18n.t('audit_logs.actions.user_updated') },
      { value: 'UserDeleted', label: this.i18n.t('audit_logs.actions.user_deleted') },
      { value: 'UserActivated', label: this.i18n.t('audit_logs.actions.user_activated') },
      { value: 'UserDeactivated', label: this.i18n.t('audit_logs.actions.user_deactivated') },
      { value: 'UserRoleAssigned', label: this.i18n.t('audit_logs.actions.user_role_assigned') },
      { value: 'UserRoleRevoked', label: this.i18n.t('audit_logs.actions.user_role_revoked') },
      { value: 'UserBranchScopeAssigned', label: this.i18n.t('audit_logs.actions.user_branch_scope_assigned') },
      { value: 'UserBranchScopeRevoked', label: this.i18n.t('audit_logs.actions.user_branch_scope_revoked') },

      // Employee Management
      { value: 'EmployeeCreated', label: this.i18n.t('audit_logs.actions.employee_created') },
      { value: 'EmployeeUpdated', label: this.i18n.t('audit_logs.actions.employee_updated') },
      { value: 'EmployeeDeleted', label: this.i18n.t('audit_logs.actions.employee_deleted') },
      { value: 'EmployeeActivated', label: this.i18n.t('audit_logs.actions.employee_activated') },
      { value: 'EmployeeDeactivated', label: this.i18n.t('audit_logs.actions.employee_deactivated') },

      // Shift Management
      { value: 'ShiftCreated', label: this.i18n.t('audit_logs.actions.shift_created') },
      { value: 'ShiftUpdated', label: this.i18n.t('audit_logs.actions.shift_updated') },
      { value: 'ShiftDeleted', label: this.i18n.t('audit_logs.actions.shift_deleted') },

      // Shift Assignment Management
      { value: 'ShiftAssignmentCreated', label: this.i18n.t('audit_logs.actions.shift_assignment_created') },
      { value: 'ShiftAssignmentUpdated', label: this.i18n.t('audit_logs.actions.shift_assignment_updated') },
      { value: 'ShiftAssignmentDeleted', label: this.i18n.t('audit_logs.actions.shift_assignment_deleted') },
      { value: 'ShiftAssignmentActivated', label: this.i18n.t('audit_logs.actions.shift_assignment_activated') },
      { value: 'ShiftAssignmentDeactivated', label: this.i18n.t('audit_logs.actions.shift_assignment_deactivated') },

      // Vacation Management
      { value: 'VacationTypeCreated', label: this.i18n.t('audit_logs.actions.vacation_type_created') },
      { value: 'VacationTypeUpdated', label: this.i18n.t('audit_logs.actions.vacation_type_updated') },
      { value: 'VacationTypeDeleted', label: this.i18n.t('audit_logs.actions.vacation_type_deleted') },
      { value: 'VacationRequestCreated', label: this.i18n.t('audit_logs.actions.vacation_request_created') },
      { value: 'VacationRequestUpdated', label: this.i18n.t('audit_logs.actions.vacation_request_updated') },
      { value: 'VacationRequestApproved', label: this.i18n.t('audit_logs.actions.vacation_request_approved') },
      { value: 'VacationRequestRejected', label: this.i18n.t('audit_logs.actions.vacation_request_rejected') },
      { value: 'VacationRequestCancelled', label: this.i18n.t('audit_logs.actions.vacation_request_cancelled') },

      // System Actions
      { value: 'SystemStartup', label: this.i18n.t('audit_logs.actions.system_startup') },
      { value: 'SystemShutdown', label: this.i18n.t('audit_logs.actions.system_shutdown') },
      { value: 'DatabaseMigration', label: this.i18n.t('audit_logs.actions.database_migration') },

      // Generic CRUD Operations
      { value: 'Created', label: this.i18n.t('audit_logs.actions.created') },
      { value: 'Updated', label: this.i18n.t('audit_logs.actions.updated') },
      { value: 'Deleted', label: this.i18n.t('audit_logs.actions.deleted') },
      { value: 'Viewed', label: this.i18n.t('audit_logs.actions.viewed') }
    ];
  }
}
