/**
 * Authorization Directive Exports
 *
 * This module exports all authorization-related directives for the Time Attendance System.
 * These directives provide declarative access control in templates, mirroring the backend's
 * authorization policies for consistent security throughout the application.
 *
 * @description
 * Available Directives:
 * - HasPermissionDirective: Fine-grained permission-based access control
 * - HasRoleDirective: Role-based access control with hierarchical inheritance
 * - CanManageDirective: Policy-based management capability checking
 * - CanReadDirective: Policy-based read access capability checking
 *
 * @usage
 * ```typescript
 * import {
 *   HasPermissionDirective,
 *   HasRoleDirective,
 *   CanManageDirective,
 *   CanReadDirective
 * } from './shared/directives';
 *
 * // Use in component imports
 * @Component({
 *   imports: [HasPermissionDirective, HasRoleDirective, CanManageDirective, CanReadDirective],
 *   // ...
 * })
 * ```
 */

export { HasPermissionDirective } from './has-permission.directive';
export { HasRoleDirective } from './has-role.directive';
export { CanManageDirective } from './can-manage.directive';
export { CanReadDirective } from './can-read.directive';