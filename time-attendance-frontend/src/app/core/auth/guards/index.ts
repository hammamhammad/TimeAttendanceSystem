/**
 * Role-based Guard Services
 *
 * This module exports all role-based guard services for the Time Attendance System.
 * These guards implement the authorization policies that mirror the backend's
 * role-based access control system.
 *
 * @description
 * The guards implement a hierarchical authorization system:
 * - SystemAdminGuard: Highest level, system administration access
 * - AdminGuard: Administrative access for organizational management
 * - ManagerGuard: Managerial access for departmental operations
 * - EmployeeGuard: Basic access for standard employee functions
 *
 * Each guard supports both role-based and permission-based authorization,
 * providing flexible security controls that match the backend policies.
 *
 * @usage
 * ```typescript
 * import { systemAdminGuard, adminGuard, managerGuard, employeeGuard } from './core/auth/guards';
 *
 * // Use in route configuration
 * {
 *   path: 'admin',
 *   canMatch: [adminGuard],
 *   // ...
 * }
 * ```
 */

export { systemAdminGuard } from './system-admin.guard';
export { adminGuard } from './admin.guard';
export { managerGuard } from './manager.guard';
export { employeeGuard } from './employee.guard';