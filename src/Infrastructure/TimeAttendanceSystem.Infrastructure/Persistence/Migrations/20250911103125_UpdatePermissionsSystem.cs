using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeAttendanceSystem.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePermissionsSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Clear existing role-permission relationships to avoid foreign key conflicts
            migrationBuilder.Sql("DELETE FROM RolePermissions");
            
            // Clear existing permissions
            migrationBuilder.Sql("DELETE FROM Permissions");
            
            // Reseed permissions with new comprehensive set
            // User Management - Extended CRUD with specialized actions
            InsertPermission(migrationBuilder, "user.read", "User Management", "View and read user accounts and profiles");
            InsertPermission(migrationBuilder, "user.create", "User Management", "Create new user accounts and profiles");
            InsertPermission(migrationBuilder, "user.update", "User Management", "Modify existing user accounts and profiles");
            InsertPermission(migrationBuilder, "user.delete", "User Management", "Remove user accounts and profiles permanently");
            InsertPermission(migrationBuilder, "user.export", "User Management", "Export user accounts and profiles to external formats");
            InsertPermission(migrationBuilder, "user.import", "User Management", "Import user accounts and profiles from external sources");
            InsertPermission(migrationBuilder, "user.assignRole", "User Management", "Assign roles to user accounts and profiles");
            InsertPermission(migrationBuilder, "user.removeRole", "User Management", "Remove roles from user accounts and profiles");
            InsertPermission(migrationBuilder, "user.resetPassword", "User Management", "Reset user passwords for user accounts and profiles");
            InsertPermission(migrationBuilder, "user.lock", "User Management", "Lock or disable user accounts and profiles");
            InsertPermission(migrationBuilder, "user.unlock", "User Management", "Unlock or enable user accounts and profiles");
            InsertPermission(migrationBuilder, "user.activate", "User Management", "Activate inactive user accounts and profiles");
            InsertPermission(migrationBuilder, "user.deactivate", "User Management", "Deactivate active user accounts and profiles");

            // Role Management - Extended CRUD with permission assignment
            InsertPermission(migrationBuilder, "role.read", "Role Management", "View and read user roles and access levels");
            InsertPermission(migrationBuilder, "role.create", "Role Management", "Create new user roles and access levels");
            InsertPermission(migrationBuilder, "role.update", "Role Management", "Modify existing user roles and access levels");
            InsertPermission(migrationBuilder, "role.delete", "Role Management", "Remove user roles and access levels permanently");
            InsertPermission(migrationBuilder, "role.export", "Role Management", "Export user roles and access levels to external formats");
            InsertPermission(migrationBuilder, "role.import", "Role Management", "Import user roles and access levels from external sources");
            InsertPermission(migrationBuilder, "role.assignPermission", "Role Management", "Assign permissions to user roles and access levels");
            InsertPermission(migrationBuilder, "role.removePermission", "Role Management", "Remove permissions from user roles and access levels");
            InsertPermission(migrationBuilder, "role.manage", "Role Management", "Full management capabilities for user roles and access levels");

            // Employee Management - Full CRUD with import/export
            InsertPermission(migrationBuilder, "employee.read", "Employee Management", "View and read employee records and information");
            InsertPermission(migrationBuilder, "employee.create", "Employee Management", "Create new employee records and information");
            InsertPermission(migrationBuilder, "employee.update", "Employee Management", "Modify existing employee records and information");
            InsertPermission(migrationBuilder, "employee.delete", "Employee Management", "Remove employee records and information permanently");
            InsertPermission(migrationBuilder, "employee.export", "Employee Management", "Export employee records and information to external formats");
            InsertPermission(migrationBuilder, "employee.import", "Employee Management", "Import employee records and information from external sources");
            InsertPermission(migrationBuilder, "employee.activate", "Employee Management", "Activate inactive employee records and information");
            InsertPermission(migrationBuilder, "employee.deactivate", "Employee Management", "Deactivate active employee records and information");
            InsertPermission(migrationBuilder, "employee.assign", "Employee Management", "Assign resources or relationships for employee records and information");
            InsertPermission(migrationBuilder, "employee.unassign", "Employee Management", "Remove resource assignments for employee records and information");

            // Branch Management - Standard operations
            InsertPermission(migrationBuilder, "branch.read", "Branch Management", "View and read company branches and locations");
            InsertPermission(migrationBuilder, "branch.create", "Branch Management", "Create new company branches and locations");
            InsertPermission(migrationBuilder, "branch.update", "Branch Management", "Modify existing company branches and locations");
            InsertPermission(migrationBuilder, "branch.delete", "Branch Management", "Remove company branches and locations permanently");
            InsertPermission(migrationBuilder, "branch.export", "Branch Management", "Export company branches and locations to external formats");
            InsertPermission(migrationBuilder, "branch.import", "Branch Management", "Import company branches and locations from external sources");
            InsertPermission(migrationBuilder, "branch.activate", "Branch Management", "Activate inactive company branches and locations");
            InsertPermission(migrationBuilder, "branch.deactivate", "Branch Management", "Deactivate active company branches and locations");
            InsertPermission(migrationBuilder, "branch.manage", "Branch Management", "Full management capabilities for company branches and locations");

            // Department Management - Standard operations
            InsertPermission(migrationBuilder, "department.read", "Department Management", "View and read organizational departments");
            InsertPermission(migrationBuilder, "department.create", "Department Management", "Create new organizational departments");
            InsertPermission(migrationBuilder, "department.update", "Department Management", "Modify existing organizational departments");
            InsertPermission(migrationBuilder, "department.delete", "Department Management", "Remove organizational departments permanently");
            InsertPermission(migrationBuilder, "department.export", "Department Management", "Export organizational departments to external formats");
            InsertPermission(migrationBuilder, "department.import", "Department Management", "Import organizational departments from external sources");
            InsertPermission(migrationBuilder, "department.activate", "Department Management", "Activate inactive organizational departments");
            InsertPermission(migrationBuilder, "department.deactivate", "Department Management", "Deactivate active organizational departments");
            InsertPermission(migrationBuilder, "department.assign", "Department Management", "Assign resources or relationships for organizational departments");
            InsertPermission(migrationBuilder, "department.unassign", "Department Management", "Remove resource assignments for organizational departments");

            // Attendance Management - Specialized workflow actions
            InsertPermission(migrationBuilder, "attendance.read", "Attendance Management", "View and read time tracking and attendance records");
            InsertPermission(migrationBuilder, "attendance.create", "Attendance Management", "Create new time tracking and attendance records");
            InsertPermission(migrationBuilder, "attendance.update", "Attendance Management", "Modify existing time tracking and attendance records");
            InsertPermission(migrationBuilder, "attendance.delete", "Attendance Management", "Remove time tracking and attendance records permanently");
            InsertPermission(migrationBuilder, "attendance.export", "Attendance Management", "Export time tracking and attendance records to external formats");
            InsertPermission(migrationBuilder, "attendance.import", "Attendance Management", "Import time tracking and attendance records from external sources");
            InsertPermission(migrationBuilder, "attendance.approve", "Attendance Management", "Approve pending requests or changes for time tracking and attendance records");
            InsertPermission(migrationBuilder, "attendance.reject", "Attendance Management", "Reject pending requests or changes for time tracking and attendance records");
            InsertPermission(migrationBuilder, "attendance.archive", "Attendance Management", "Archive time tracking and attendance records for long-term storage");
            InsertPermission(migrationBuilder, "attendance.restore", "Attendance Management", "Restore archived or deleted time tracking and attendance records");

            // Reports Management - View and export focused
            InsertPermission(migrationBuilder, "report.read", "Reports", "View and read reports and analytics");
            InsertPermission(migrationBuilder, "report.create", "Reports", "Create new reports and analytics");
            InsertPermission(migrationBuilder, "report.export", "Reports", "Export reports and analytics to external formats");
            InsertPermission(migrationBuilder, "report.download", "Reports", "Download files or data for reports and analytics");
            InsertPermission(migrationBuilder, "report.archive", "Reports", "Archive reports and analytics for long-term storage");
            InsertPermission(migrationBuilder, "report.configure", "Reports", "Configure settings and parameters for reports and analytics");

            // System Settings - Configuration management
            InsertPermission(migrationBuilder, "settings.read", "System Settings", "View and read system configuration and settings");
            InsertPermission(migrationBuilder, "settings.update", "System Settings", "Modify existing system configuration and settings");
            InsertPermission(migrationBuilder, "settings.configure", "System Settings", "Configure settings and parameters for system configuration and settings");
            InsertPermission(migrationBuilder, "settings.export", "System Settings", "Export system configuration and settings to external formats");
            InsertPermission(migrationBuilder, "settings.import", "System Settings", "Import system configuration and settings from external sources");

            // Dashboard - View and configuration
            InsertPermission(migrationBuilder, "dashboard.read", "Dashboard", "View and read dashboard views and widgets");
            InsertPermission(migrationBuilder, "dashboard.configure", "Dashboard", "Configure settings and parameters for dashboard views and widgets");
            InsertPermission(migrationBuilder, "dashboard.export", "Dashboard", "Export dashboard views and widgets to external formats");

            // System Administration - Advanced system controls
            InsertPermission(migrationBuilder, "system.manage", "System Administration", "Full management capabilities for core system functions");
            InsertPermission(migrationBuilder, "system.configure", "System Administration", "Configure settings and parameters for core system functions");
            InsertPermission(migrationBuilder, "system.archive", "System Administration", "Archive core system functions for long-term storage");
            InsertPermission(migrationBuilder, "system.restore", "System Administration", "Restore archived or deleted core system functions");

            // Permission Management - Meta permissions for managing permissions themselves
            InsertPermission(migrationBuilder, "permission.read", "Permission Management", "View and read permission management");
            InsertPermission(migrationBuilder, "permission.create", "Permission Management", "Create new permission management");
            InsertPermission(migrationBuilder, "permission.update", "Permission Management", "Modify existing permission management");
            InsertPermission(migrationBuilder, "permission.delete", "Permission Management", "Remove permission management permanently");

            // Audit and Monitoring
            InsertPermission(migrationBuilder, "audit.read", "Audit & Monitoring", "View and read audit logs and security tracking");
            InsertPermission(migrationBuilder, "audit.export", "Audit & Monitoring", "Export audit logs and security tracking to external formats");
            InsertPermission(migrationBuilder, "audit.archive", "Audit & Monitoring", "Archive audit logs and security tracking for long-term storage");
        }
        
        private void InsertPermission(MigrationBuilder migrationBuilder, string key, string group, string description)
        {
            migrationBuilder.Sql($@"
                INSERT INTO Permissions ([Key], [Group], Description, CreatedAtUtc, CreatedBy, IsDeleted)
                VALUES ('{key}', '{group}', '{description}', GETUTCDATE(), 'SYSTEM', 0)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
