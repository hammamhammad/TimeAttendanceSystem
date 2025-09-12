using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace TimeAttendanceSystem.Infrastructure.Persistence;

public static class SeedData
{
    public static async Task SeedAsync(TimeAttendanceDbContext context)
    {
        if (!await context.Branches.AnyAsync())
        {
            await SeedBranchesAsync(context);
        }

        if (!await context.Permissions.AnyAsync())
        {
            await SeedPermissionsAsync(context);
        }

        if (!await context.Roles.AnyAsync())
        {
            await SeedRolesAsync(context);
        }

        if (!await context.Users.AnyAsync())
        {
            await SeedUsersAsync(context);
        }

        await context.SaveChangesAsync();
    }

    private static async Task SeedBranchesAsync(TimeAttendanceDbContext context)
    {
        var branch = new Branch
        {
            Code = "HQ",
            Name = "Head Quarters",
            TimeZone = "Asia/Riyadh",
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Branches.AddAsync(branch);
        await context.SaveChangesAsync();
    }

    private static async Task SeedPermissionsAsync(TimeAttendanceDbContext context)
    {
        var permissions = new List<Permission>();

        // User Management - Extended CRUD with specialized actions
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.User, "User Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.User, "User Management",
            PermissionActions.AssignRole, PermissionActions.RemoveRole, PermissionActions.ResetPassword, 
            PermissionActions.Lock, PermissionActions.Unlock, PermissionActions.Activate, PermissionActions.Deactivate));

        // Role Management - Extended CRUD with permission assignment
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Role, "Role Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Role, "Role Management",
            PermissionActions.AssignPermission, PermissionActions.RemovePermission, PermissionActions.Manage));

        // Employee Management - Full CRUD with import/export
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Employee, "Employee Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Employee, "Employee Management",
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Assign, PermissionActions.Unassign));

        // Branch Management - Standard operations
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Branch, "Branch Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Branch, "Branch Management",
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Manage));

        // Department Management - Standard operations
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Department, "Department Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Department, "Department Management",
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Assign, PermissionActions.Unassign));

        // Attendance Management - Specialized workflow actions
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Attendance, "Attendance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Attendance, "Attendance Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.Archive, PermissionActions.Restore));

        // Schedule Management - Work schedules and shift management
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Schedule, "Schedule Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Schedule, "Schedule Management",
            PermissionActions.Assign, PermissionActions.Unassign, PermissionActions.Approve, PermissionActions.Reject,
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Archive, PermissionActions.Restore));

        // Reports Management - View and export focused
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Report, "Reports",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Export, PermissionActions.Download, 
            PermissionActions.Archive, PermissionActions.Configure));

        // System Settings - Configuration management
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Settings, "System Settings",
            PermissionActions.Read, PermissionActions.Update, PermissionActions.Configure, PermissionActions.Export, PermissionActions.Import));

        // Dashboard - View and configuration
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Dashboard, "Dashboard",
            PermissionActions.Read, PermissionActions.Configure, PermissionActions.Export));

        // System Administration - Advanced system controls
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.System, "System Administration",
            PermissionActions.Manage, PermissionActions.Configure, PermissionActions.Archive, PermissionActions.Restore));

        // Permission Management - Meta permissions for managing permissions themselves
        permissions.AddRange(PermissionBuilder.CreateStandardCrudPermissions(PermissionResources.Permission, "Permission Management"));
        
        // Audit and Monitoring
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Audit, "Audit & Monitoring",
            PermissionActions.Read, PermissionActions.Export, PermissionActions.Archive));

        await context.Permissions.AddRangeAsync(permissions);
        await context.SaveChangesAsync();
    }

    private static async Task SeedRolesAsync(TimeAttendanceDbContext context)
    {
        var allPermissions = await context.Permissions.ToListAsync();

        // System Admin Role - All permissions
        var systemAdminRole = new Role
        {
            Name = "SystemAdmin",
            IsSystem = true,
            IsEditable = false,
            IsDeletable = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Roles.AddAsync(systemAdminRole);
        await context.SaveChangesAsync();

        var systemAdminPermissions = allPermissions.Select(p => new RolePermission
        {
            RoleId = systemAdminRole.Id,
            PermissionId = p.Id
        }).ToArray();

        await context.RolePermissions.AddRangeAsync(systemAdminPermissions);

        // Admin Role - All except user management
        var adminRole = new Role
        {
            Name = "Admin",
            IsSystem = true,
            IsEditable = true,
            IsDeletable = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Roles.AddAsync(adminRole);
        await context.SaveChangesAsync();

        var adminPermissions = allPermissions
            .Where(p => !p.Key.StartsWith("user.") && !p.Key.StartsWith("settings."))
            .Select(p => new RolePermission
            {
                RoleId = adminRole.Id,
                PermissionId = p.Id
            }).ToArray();

        await context.RolePermissions.AddRangeAsync(adminPermissions);

        // HR Operation Role - Limited permissions
        var hrRole = new Role
        {
            Name = "HROperation",
            IsSystem = true,
            IsEditable = true,
            IsDeletable = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Roles.AddAsync(hrRole);
        await context.SaveChangesAsync();

        var hrPermissions = allPermissions
            .Where(p => p.Key.In("employee.read", "employee.create", "employee.update", "employee.export", "employee.import", 
                                 "branch.read", "department.read", "attendance.read", "attendance.create", 
                                 "attendance.update", "schedule.read", "schedule.create", "schedule.update", 
                                 "schedule.assign", "schedule.unassign", "report.read", "dashboard.read"))
            .Select(p => new RolePermission
            {
                RoleId = hrRole.Id,
                PermissionId = p.Id
            }).ToArray();

        await context.RolePermissions.AddRangeAsync(hrPermissions);

        // Default User Role - Basic permissions for registered users
        var userRole = new Role
        {
            Name = "User",
            IsSystem = true,
            IsEditable = true,
            IsDeletable = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Roles.AddAsync(userRole);
        await context.SaveChangesAsync();

        // Basic permissions for regular users (read-only access)
        var userPermissions = allPermissions
            .Where(p => p.Key.In("dashboard.read", "employee.read", "branch.read", "department.read", "report.read"))
            .Select(p => new RolePermission
            {
                RoleId = userRole.Id,
                PermissionId = p.Id
            }).ToArray();

        await context.RolePermissions.AddRangeAsync(userPermissions);

        await context.SaveChangesAsync();
    }

    private static async Task SeedUsersAsync(TimeAttendanceDbContext context)
    {
        var systemAdminRole = await context.Roles.FirstAsync(r => r.Name == "SystemAdmin");
        var branch = await context.Branches.FirstAsync();

        var (hash, salt) = HashPassword("TempP@ssw0rd123!");
        
        var systemAdmin = new User
        {
            Username = "systemadmin",
            Email = "admin@timeattendance.com",
            PasswordHash = hash,
            PasswordSalt = salt,
            MustChangePassword = true,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Users.AddAsync(systemAdmin);
        await context.SaveChangesAsync();

        // Assign SystemAdmin role
        var userRole = new UserRole
        {
            UserId = systemAdmin.Id,
            RoleId = systemAdminRole.Id
        };

        await context.UserRoles.AddAsync(userRole);
        await context.SaveChangesAsync();
    }

    private static (string hash, string salt) HashPassword(string password)
    {
        var saltBytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(saltBytes);
        var salt = Convert.ToBase64String(saltBytes);
        
        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
        var hash = Convert.ToBase64String(pbkdf2.GetBytes(32));
        
        return (hash, salt);
    }
}

public static class Extensions
{
    public static bool In<T>(this T value, params T[] values)
    {
        return values.Contains(value);
    }
}