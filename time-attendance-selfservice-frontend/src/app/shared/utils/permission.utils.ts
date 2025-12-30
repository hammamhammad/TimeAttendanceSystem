export const PermissionActions = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  EXPORT: 'export',
  IMPORT: 'import',
  APPROVE: 'approve',
  REJECT: 'reject',
  LOCK: 'lock',
  UNLOCK: 'unlock',
  RESET_PASSWORD: 'resetPassword',
  ASSIGN_ROLE: 'assignRole',
  REMOVE_ROLE: 'removeRole',
  ASSIGN_PERMISSION: 'assignPermission',
  REMOVE_PERMISSION: 'removePermission',
  VIEW: 'view',
  DOWNLOAD: 'download',
  UPLOAD: 'upload',
  ARCHIVE: 'archive',
  RESTORE: 'restore',
  ACTIVATE: 'activate',
  DEACTIVATE: 'deactivate',
  ASSIGN: 'assign',
  UNASSIGN: 'unassign',
  MANAGE: 'manage',
  CONFIGURE: 'configure',
  BULK_CREATE: 'bulkCreate',
} as const;

export const PermissionResources = {
  USER: 'user',
  ROLE: 'role',
  EMPLOYEE: 'employee',
  BRANCH: 'branch',
  DEPARTMENT: 'department',
  SHIFT: 'shift',
  ATTENDANCE: 'attendance',
  SCHEDULE: 'schedule',
  REPORT: 'report',
  SETTINGS: 'settings',
  DASHBOARD: 'dashboard',
  PERMISSION: 'permission',
  AUDIT: 'audit',
  NOTIFICATION: 'notification',
  SYSTEM: 'system',
  VACATION_TYPE: 'vacationType',
  VACATION: 'vacation',
  EXCUSE: 'excuse'
} as const;

export const ActionDescriptions: Record<string, string> = {
  [PermissionActions.READ]: 'View and read data',
  [PermissionActions.CREATE]: 'Create new records',
  [PermissionActions.UPDATE]: 'Modify existing records',
  [PermissionActions.DELETE]: 'Remove records permanently',
  [PermissionActions.EXPORT]: 'Export data to external formats',
  [PermissionActions.IMPORT]: 'Import data from external sources',
  [PermissionActions.APPROVE]: 'Approve pending requests or changes',
  [PermissionActions.REJECT]: 'Reject pending requests or changes',
  [PermissionActions.LOCK]: 'Lock or disable accounts',
  [PermissionActions.UNLOCK]: 'Unlock or enable accounts',
  [PermissionActions.RESET_PASSWORD]: 'Reset user passwords',
  [PermissionActions.ASSIGN_ROLE]: 'Assign roles to users',
  [PermissionActions.REMOVE_ROLE]: 'Remove roles from users',
  [PermissionActions.ASSIGN_PERMISSION]: 'Assign permissions to roles',
  [PermissionActions.REMOVE_PERMISSION]: 'Remove permissions from roles',
  [PermissionActions.VIEW]: 'View detailed information',
  [PermissionActions.DOWNLOAD]: 'Download files or data',
  [PermissionActions.UPLOAD]: 'Upload files or data',
  [PermissionActions.ARCHIVE]: 'Archive records for long-term storage',
  [PermissionActions.RESTORE]: 'Restore archived or deleted records',
  [PermissionActions.ACTIVATE]: 'Activate inactive records',
  [PermissionActions.DEACTIVATE]: 'Deactivate active records',
  [PermissionActions.ASSIGN]: 'Assign resources or relationships',
  [PermissionActions.UNASSIGN]: 'Remove resource assignments',
  [PermissionActions.MANAGE]: 'Full management capabilities',
  [PermissionActions.CONFIGURE]: 'Configure settings and parameters',
  [PermissionActions.BULK_CREATE]: 'Create multiple records in bulk operations',
};

export const ResourceDescriptions: Record<string, string> = {
  [PermissionResources.USER]: 'User accounts and profiles',
  [PermissionResources.ROLE]: 'User roles and access levels',
  [PermissionResources.EMPLOYEE]: 'Employee records and information',
  [PermissionResources.BRANCH]: 'Company branches and locations',
  [PermissionResources.DEPARTMENT]: 'Organizational departments',
  [PermissionResources.SHIFT]: 'Work shifts and time periods',
  [PermissionResources.ATTENDANCE]: 'Time tracking and attendance records',
  [PermissionResources.SCHEDULE]: 'Work schedules and shift management',
  [PermissionResources.REPORT]: 'Reports and analytics',
  [PermissionResources.SETTINGS]: 'System configuration and settings',
  [PermissionResources.DASHBOARD]: 'Dashboard views and widgets',
  [PermissionResources.PERMISSION]: 'Permission management',
  [PermissionResources.AUDIT]: 'Audit logs and security tracking',
  [PermissionResources.NOTIFICATION]: 'System notifications and alerts',
  [PermissionResources.SYSTEM]: 'Core system functions',
  [PermissionResources.VACATION_TYPE]: 'Vacation types and leave policies',
  [PermissionResources.VACATION]: 'Employee vacation records and management',
  [PermissionResources.EXCUSE]: 'Employee excuse management and approval'
};

export const ActionColors: Record<string, string> = {
  [PermissionActions.READ]: 'info',
  [PermissionActions.VIEW]: 'info',
  [PermissionActions.CREATE]: 'success',
  [PermissionActions.UPDATE]: 'warning',
  [PermissionActions.DELETE]: 'danger',
  [PermissionActions.EXPORT]: 'primary',
  [PermissionActions.IMPORT]: 'secondary',
  [PermissionActions.DOWNLOAD]: 'primary',
  [PermissionActions.UPLOAD]: 'secondary',
  [PermissionActions.APPROVE]: 'success',
  [PermissionActions.REJECT]: 'danger',
  [PermissionActions.LOCK]: 'danger',
  [PermissionActions.UNLOCK]: 'success',
  [PermissionActions.RESET_PASSWORD]: 'warning',
  [PermissionActions.ASSIGN_ROLE]: 'info',
  [PermissionActions.REMOVE_ROLE]: 'warning',
  [PermissionActions.ASSIGN_PERMISSION]: 'info',
  [PermissionActions.REMOVE_PERMISSION]: 'warning',
  [PermissionActions.ARCHIVE]: 'secondary',
  [PermissionActions.RESTORE]: 'success',
  [PermissionActions.ACTIVATE]: 'success',
  [PermissionActions.DEACTIVATE]: 'warning',
  [PermissionActions.ASSIGN]: 'info',
  [PermissionActions.UNASSIGN]: 'warning',
  [PermissionActions.MANAGE]: 'primary',
  [PermissionActions.CONFIGURE]: 'primary',
  [PermissionActions.BULK_CREATE]: 'primary'
};

export const ResourceIcons: Record<string, string> = {
  [PermissionResources.USER]: 'fa-user',
  [PermissionResources.ROLE]: 'fa-user-shield',
  [PermissionResources.EMPLOYEE]: 'fa-users',
  [PermissionResources.BRANCH]: 'fa-building',
  [PermissionResources.DEPARTMENT]: 'fa-sitemap',
  [PermissionResources.SHIFT]: 'fa-clock',
  [PermissionResources.ATTENDANCE]: 'fa-user-clock',
  [PermissionResources.SCHEDULE]: 'fa-calendar-alt',
  [PermissionResources.REPORT]: 'fa-chart-bar',
  [PermissionResources.SETTINGS]: 'fa-cog',
  [PermissionResources.DASHBOARD]: 'fa-tachometer-alt',
  [PermissionResources.PERMISSION]: 'fa-key',
  [PermissionResources.AUDIT]: 'fa-history',
  [PermissionResources.NOTIFICATION]: 'fa-bell',
  [PermissionResources.SYSTEM]: 'fa-server',
  [PermissionResources.VACATION_TYPE]: 'fa-calendar-times',
  [PermissionResources.VACATION]: 'fa-calendar-week',
  [PermissionResources.EXCUSE]: 'fa-clipboard-check'
};

export interface PermissionInfo {
  resource: string;
  action: string;
  key: string;
}

export class PermissionUtils {
  static parsePermissionKey(key: string): PermissionInfo {
    if (!key || typeof key !== 'string') {
      return {
        resource: '',
        action: '',
        key: ''
      };
    }
    const parts = key.split('.', 2);
    if (parts.length === 2) {
      return {
        resource: parts[0],
        action: parts[1],
        key
      };
    }
    return {
      resource: key,
      action: '',
      key
    };
  }

  static buildPermissionKey(resource: string, action: string): string {
    return `${resource}.${action}`;
  }

  static getResourceName(resource: string): string {
    return resource.charAt(0).toUpperCase() + resource.slice(1);
  }

  static getActionName(action: string): string {
    // Handle camelCase actions like 'resetPassword'
    const result = action.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  static getActionDescription(action: string): string {
    return ActionDescriptions[action] || this.getActionName(action);
  }

  static getResourceDescription(resource: string): string {
    return ResourceDescriptions[resource] || this.getResourceName(resource);
  }

  static getActionColor(action: string): string {
    return ActionColors[action] || 'light';
  }

  static getResourceIcon(resource: string): string {
    return ResourceIcons[resource] || 'fa-question';
  }

  static getActionBadgeClass(action: string): string {
    const color = this.getActionColor(action);
    return `bg-${color}-subtle text-${color}`;
  }

  static formatPermissionDisplay(key: string): { resource: string; action: string; color: string; icon: string } {
    const { resource, action } = this.parsePermissionKey(key);
    return {
      resource: this.getResourceName(resource),
      action: this.getActionName(action),
      color: this.getActionColor(action),
      icon: this.getResourceIcon(resource)
    };
  }
}