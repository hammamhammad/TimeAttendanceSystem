using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Settings;
using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Employees;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace TimeAttendanceSystem.Infrastructure.Persistence;

public static class SeedData
{
    public static async Task SeedAsync(TimeAttendanceDbContext context)
    {
        // Always ensure all permissions are created and up-to-date
        await SeedPermissionsAsync(context);

        if (!await context.Roles.AnyAsync())
        {
            await SeedRolesAsync(context);
        }

        if (!await context.Users.AnyAsync())
        {
            await SeedUsersAsync(context);
        }

        // Always ensure SystemAdmin has all permissions (including newly added ones)
        await EnsureSystemAdminHasAllPermissionsAsync(context);

        if (!await context.Shifts.AnyAsync())
        {
            await SeedDefaultShiftAsync(context);
        }

        if (!await context.OvertimeConfigurations.AnyAsync())
        {
            await SeedDefaultOvertimeConfigurationAsync(context);
        }

        // Add sample employees with departments if none exist
        if (!await context.Employees.AnyAsync())
        {
            await SeedSampleEmployeesAsync(context);
        }

        await context.SaveChangesAsync();

        Console.WriteLine("✅ Essential system data seeding completed (permissions, roles, users, default shift, overtime configuration)");
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
            PermissionActions.Activate, PermissionActions.Deactivate));

        // Department Management - Standard operations
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Department, "Department Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Department, "Department Management",
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Assign, PermissionActions.Unassign));

        // Shift Management - Full CRUD with assignment capabilities
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Shift, "Shift Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Shift, "Shift Management",
            PermissionActions.Assign, PermissionActions.Unassign));

        // Attendance Management - Extended CRUD with approval
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Attendance, "Attendance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Attendance, "Attendance Management",
            PermissionActions.Approve, PermissionActions.Reject));

        // Report Management - Read and view focused
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Report, "Reporting",
            PermissionActions.Read, PermissionActions.View, PermissionActions.Export));

        // System Administration - Core system functions
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.System, "System Administration",
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Restore));

        // Audit Management - Read-only with export
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Audit, "Audit Management",
            PermissionActions.Read, PermissionActions.Export));

        // Settings Management - Configuration and preferences
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Settings, "Settings Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Settings, "Settings Management",
            PermissionActions.Configure, PermissionActions.Manage));

        // Schedule Management - Work schedules and planning
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Schedule, "Schedule Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Schedule, "Schedule Management",
            PermissionActions.Assign, PermissionActions.Unassign, PermissionActions.Approve, PermissionActions.Reject));

        // Dashboard Management - Views and widgets
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Dashboard, "Dashboard Management",
            PermissionActions.Read, PermissionActions.View, PermissionActions.Configure));

        // Permission Management - Direct permission control
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Permission, "Permission Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Permission, "Permission Management",
            PermissionActions.Assign, PermissionActions.Unassign, PermissionActions.Manage));

        // Notification Management - System alerts and messages
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Notification, "Notification Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Notification, "Notification Management",
            PermissionActions.Activate, PermissionActions.Deactivate));

        // Overtime Management - Settings for overtime calculation and configuration
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("settings.overtime", "Overtime Management",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Update, PermissionActions.Delete,
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Activate));

        // Public Holiday Management - Managing public holidays and calendar
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.PublicHoliday, "Public Holiday Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.PublicHoliday, "Public Holiday Management",
            PermissionActions.Configure, PermissionActions.Manage,
            PermissionActions.Activate, PermissionActions.Deactivate));

        // Vacation Type Management - Managing vacation types and leave policies
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.VacationType, "Vacation Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.VacationType, "Vacation Management",
            PermissionActions.Configure, PermissionActions.Manage,
            PermissionActions.Activate, PermissionActions.Deactivate));

        // Employee Vacation Management - Managing employee vacation records
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Vacation, "Employee Vacation Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Vacation, "Employee Vacation Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.View, PermissionActions.BulkCreate));

        // Excuse Policy Management - Settings for excuse policies
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("settings.excusePolicy", "Excuse Policy Management",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Update, PermissionActions.Delete,
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Activate, PermissionActions.Deactivate));

        // Employee Excuse Management - Managing employee excuse requests
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Excuse, "Employee Excuse Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Excuse, "Employee Excuse Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.View, PermissionActions.BulkCreate));


        // Get existing permission keys
        var existingKeys = await context.Permissions
            .Where(p => !p.IsDeleted)
            .Select(p => p.Key)
            .ToListAsync();

        // Filter out existing permissions
        var newPermissions = permissions.Where(p => !existingKeys.Contains(p.Key)).ToList();

        if (newPermissions.Any())
        {
            Console.WriteLine($"Adding {newPermissions.Count} new permissions");
            await context.Permissions.AddRangeAsync(newPermissions);
            await context.SaveChangesAsync();
        }
    }

    private static async Task SeedRolesAsync(TimeAttendanceDbContext context)
    {
        var roles = new List<Role>
        {
            new Role
            {
                Name = "SystemAdmin",
                IsSystem = true,
                IsEditable = false,
                IsDeletable = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Role
            {
                Name = "Admin",
                IsSystem = true,
                IsEditable = false,
                IsDeletable = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Role
            {
                Name = "Manager",
                IsSystem = false,
                IsEditable = true,
                IsDeletable = true,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Role
            {
                Name = "Employee",
                IsSystem = false,
                IsEditable = true,
                IsDeletable = true,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            }
        };

        await context.Roles.AddRangeAsync(roles);
        await context.SaveChangesAsync();
    }

    private static async Task SeedUsersAsync(TimeAttendanceDbContext context)
    {
        // Create SystemAdmin user
        var (sysAdminHash, sysAdminSalt) = HashPassword("TempP@ssw0rd123!");
        var systemAdminUser = new User
        {
            Username = "systemadmin",
            Email = "systemadmin@system.com",
            PasswordHash = sysAdminHash,
            PasswordSalt = sysAdminSalt,
            TwoFactorEnabled = false,
            EmailConfirmed = true,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

      
        await context.Users.AddRangeAsync(new[] { systemAdminUser });
        await context.SaveChangesAsync();

        // Assign SystemAdmin role to systemadmin user
        var systemAdminRole = await context.Roles.FirstAsync(r => r.Name == "SystemAdmin");
        var systemAdminUserRole = new UserRole
        {
            UserId = systemAdminUser.Id,
            RoleId = systemAdminRole.Id
        };


        await context.UserRoles.AddRangeAsync(new[] { systemAdminUserRole });
        await context.SaveChangesAsync();
    }

    private static async Task EnsureSystemAdminHasAllPermissionsAsync(TimeAttendanceDbContext context)
    {
        // Get SystemAdmin and Admin roles
        var systemAdminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "SystemAdmin");
        var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");

        if (systemAdminRole == null && adminRole == null)
        {
            Console.WriteLine("No protected roles found, skipping permission sync");
            return;
        }

        // Get all permissions
        var allPermissions = await context.Permissions.Where(p => !p.IsDeleted).ToListAsync();

        // Get system permissions (to exclude from Admin role)
        var systemPermissions = allPermissions
            .Where(p => p.Key.StartsWith(PermissionResources.System + "."))
            .ToList();

        // Handle SystemAdmin role - gets ALL permissions
        if (systemAdminRole != null)
        {
            await AssignPermissionsToRole(context, systemAdminRole, allPermissions, "SystemAdmin");
        }

        // Handle Admin role - gets all permissions EXCEPT system permissions
        if (adminRole != null)
        {
            var adminPermissions = allPermissions
                .Where(p => !p.Key.StartsWith(PermissionResources.System + "."))
                .ToList();

            await AssignPermissionsToRole(context, adminRole, adminPermissions, "Admin");
        }
    }

    private static async Task AssignPermissionsToRole(TimeAttendanceDbContext context, Role role, List<Permission> permissionsToAssign, string roleName)
    {
        // Get existing role permissions for this role
        var existingRolePermissionIds = await context.RolePermissions
            .Where(rp => rp.RoleId == role.Id)
            .Select(rp => rp.PermissionId)
            .ToListAsync();

        // Find missing permissions
        var missingPermissions = permissionsToAssign
            .Where(p => !existingRolePermissionIds.Contains(p.Id))
            .ToList();

        if (missingPermissions.Any())
        {
            var newRolePermissions = missingPermissions.Select(p => new RolePermission
            {
                RoleId = role.Id,
                PermissionId = p.Id
            }).ToList();

            await context.RolePermissions.AddRangeAsync(newRolePermissions);
            await context.SaveChangesAsync();

            Console.WriteLine($"Added {newRolePermissions.Count} missing permissions to {roleName} role");
        }
        else
        {
            Console.WriteLine($"{roleName} role already has all required permissions");
        }
    }

    private static async Task SeedDefaultShiftAsync(TimeAttendanceDbContext context)
    {
        // Create the default shift with extracted data from the current database
        var defaultShift = new Shift
        {
            Name = "Flexible hour 7:30 - 9:00",
            Description = "The default shift to all newly created employees",
            ShiftType = ShiftType.TimeBased,
            Status = ShiftStatus.Active,
            RequiredHours = null,
            IsCheckInRequired = true,
            IsAutoCheckOut = false,
            AllowFlexibleHours = true,
            FlexMinutesBefore = 30,
            FlexMinutesAfter = 60,
            GracePeriodMinutes = null,
            RequiredWeeklyHours = null,
            HasCoreHours = false,
            CoreStart = null,
            CoreEnd = null,
            IsSunday = true,
            IsMonday = true,
            IsTuesday = true,
            IsWednesday = true,
            IsThursday = true,
            IsFriday = false,
            IsSaturday = false,
            IsNightShift = false,
            IsDefault = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Shifts.AddAsync(defaultShift);
        await context.SaveChangesAsync();

        // Create the shift period
        var shiftPeriod = new ShiftPeriod
        {
            ShiftId = defaultShift.Id,
            PeriodOrder = 1,
            StartTime = new TimeOnly(8, 0), // 08:00
            EndTime = new TimeOnly(16, 0),  // 16:00
            Hours = 8.00m,
            IsNightPeriod = false,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.ShiftPeriods.AddAsync(shiftPeriod);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Default shift created: 'Flexible hour 7:30 - 9:00' (8:00-17:00)");
    }

    private static async Task SeedDefaultOvertimeConfigurationAsync(TimeAttendanceDbContext context)
    {
        // Create the default overtime configuration with standard business rules
        var defaultOvertimeConfig = new OvertimeConfiguration
        {
            EnablePreShiftOvertime = false,
            EnablePostShiftOvertime = true,
            NormalDayRate = 1.5m,
            PublicHolidayRate = 2.0m,
            OffDayRate = 1.5m,
            MinimumOvertimeMinutes = 15,
            ConsiderFlexibleTime = true,
            MaxPreShiftOvertimeHours = 2.0m,
            MaxPostShiftOvertimeHours = 4.0m,
            RequireApproval = false,
            OvertimeGracePeriodMinutes = 5,
            WeekendAsOffDay = true,
            RoundingIntervalMinutes = 15,
            PolicyNotes = "Default overtime configuration - Post-shift overtime enabled with 1.5x rate for normal days, 2.0x for holidays, and 2.5x for off days. Minimum 15 minutes threshold with 15-minute rounding.",
            IsActive = true,
            EffectiveFromDate = DateTime.UtcNow,
            EffectiveToDate = null,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.OvertimeConfigurations.AddAsync(defaultOvertimeConfig);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Default overtime configuration created: Post-shift overtime enabled (1.5x normal, 2.0x holiday, 2.5x off-day rates)");
    }

    private static async Task SeedSampleEmployeesAsync(TimeAttendanceDbContext context)
    {
        // First create some sample branches and departments
        var branch = new Branch
        {
            Code = "HQ001",
            Name = "Head Office",
            TimeZone = "Asia/Riyadh",
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Branches.AddAsync(branch);
        await context.SaveChangesAsync();

        var department = new Department
        {
            BranchId = branch.Id,
            Code = "IT001",
            Name = "Information Technology",
            NameAr = "تكنولوجيا المعلومات",
            Description = "IT Department",
            DescriptionAr = "قسم تكنولوجيا المعلومات",
            IsActive = true,
            SortOrder = 1,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.Departments.AddAsync(department);
        await context.SaveChangesAsync();

        // Create sample employees with department assignment
        var employees = new[]
        {
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = department.Id,
                EmployeeNumber = "EMP001",
                FirstName = "Ahmed",
                LastName = "Al-Rashid",
                FirstNameAr = "أحمد",
                LastNameAr = "الراشد",
                Email = "ahmed.alrashid@company.com",
                Phone = "+966551234567",
                HireDate = DateTime.UtcNow.AddDays(-365),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "Software Developer",
                JobTitleAr = "مطور برمجيات",
                WorkLocationType = WorkLocationType.OnSite,
                Gender = Gender.Male,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = department.Id,
                EmployeeNumber = "EMP002",
                FirstName = "Fatima",
                LastName = "Al-Zahra",
                FirstNameAr = "فاطمة",
                LastNameAr = "الزهراء",
                Email = "fatima.alzahra@company.com",
                Phone = "+966551234568",
                HireDate = DateTime.UtcNow.AddDays(-200),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "IT Manager",
                JobTitleAr = "مدير تكنولوجيا المعلومات",
                WorkLocationType = WorkLocationType.OnSite,
                Gender = Gender.Female,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            }
        };

        await context.Employees.AddRangeAsync(employees);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Sample employees created with departments: Ahmed Al-Rashid, Fatima Al-Zahra");
    }

    private static (string hash, string salt) HashPassword(string password)
    {
        // Generate a random salt
        var saltBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(saltBytes);
        }
        var salt = Convert.ToBase64String(saltBytes);

        // Hash the password with the salt using PBKDF2-SHA256 (same as login verification)
        using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256))
        {
            var hashBytes = pbkdf2.GetBytes(32);
            var hash = Convert.ToBase64String(hashBytes);
            return (hash, salt);
        }
    }
}