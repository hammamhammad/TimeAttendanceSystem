using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Settings;
using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.RemoteWork;
using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.Workflows.Enums;
using TimeAttendanceSystem.Domain.VacationTypes;
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

        if (!await context.RemoteWorkPolicies.AnyAsync())
        {
            await SeedDefaultRemoteWorkPolicyAsync(context);
        }

        if (!await context.WorkflowDefinitions.AnyAsync())
        {
            await SeedDefaultWorkflowsAsync(context);
        }

        if (!await context.VacationTypes.AnyAsync())
        {
            await SeedDefaultVacationTypesAsync(context);
        }

        await context.SaveChangesAsync();

        Console.WriteLine("✅ Essential system data seeding completed (permissions, roles, systemadmin user, default shift, remote work policy, default workflows, vacation types)");
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
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Assign, PermissionActions.Unassign, PermissionActions.Manage));

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

        // Leave Balance Management - Managing leave balances, entitlements and accruals
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.LeaveBalance, "Leave Balance Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.LeaveBalance, "Leave Balance Management",
            PermissionActions.View, PermissionActions.Manage, PermissionActions.Configure, "adjust", "accrue"));

        // Excuse Policy Management - Settings for excuse policies
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("settings.excusePolicy", "Excuse Policy Management",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Update, PermissionActions.Delete,
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Activate, PermissionActions.Deactivate));

        // Employee Excuse Management - Managing employee excuse requests
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Excuse, "Employee Excuse Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Excuse, "Employee Excuse Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.View, PermissionActions.BulkCreate));

        // Remote Work Policy Management - Settings for remote work policies
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("remoteWork.policy", "Remote Work Policy Management",
            PermissionActions.Read, PermissionActions.Create, PermissionActions.Update, PermissionActions.Delete,
            PermissionActions.Configure, PermissionActions.Manage, PermissionActions.Activate, PermissionActions.Deactivate));

        // Remote Work Request Management - Managing remote work requests
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions("remoteWork.request", "Remote Work Request Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions("remoteWork.request", "Remote Work Request Management",
            PermissionActions.Approve, PermissionActions.Reject, PermissionActions.View, "cancel"));

        // Session Management - Managing user sessions and security
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Session, "Session Management",
            PermissionActions.Read, PermissionActions.Delete, PermissionActions.Manage));

        // Workflow Management - Managing approval workflow definitions
        permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Workflow, "Workflow Management"));
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Workflow, "Workflow Management",
            PermissionActions.Activate, PermissionActions.Deactivate, PermissionActions.Manage));

        // Approval Management - Managing approval queue and actions
        permissions.AddRange(PermissionBuilder.CreateResourcePermissions(PermissionResources.Approval, "Approval Management",
            PermissionActions.Read, PermissionActions.Approve, PermissionActions.Reject, "delegate"));

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

            // Insert in batches to avoid PostgreSQL parameter limit (each permission has ~8 properties)
            const int batchSize = 20;
            for (int i = 0; i < newPermissions.Count; i += batchSize)
            {
                var batch = newPermissions.Skip(i).Take(batchSize).ToList();
                await context.Permissions.AddRangeAsync(batch);
                await context.SaveChangesAsync();
                Console.WriteLine($"Inserted {Math.Min(i + batchSize, newPermissions.Count)}/{newPermissions.Count} permissions");
            }
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

        Console.WriteLine("✅ Default shift created: 'Flexible hour 7:30 - 9:00' (8:00-16:00)");
    }

    private static async Task SeedDefaultRemoteWorkPolicyAsync(TimeAttendanceDbContext context)
    {
        // Create a company-wide default remote work policy
        var defaultPolicy = new RemoteWorkPolicy
        {
            BranchId = null, // Company-wide policy
            MaxDaysPerWeek = 3,
            MaxDaysPerMonth = 10,
            MaxDaysPerYear = 120,
            RequiresManagerApproval = false,
            AllowConsecutiveDays = true,
            MaxConsecutiveDays = 3,
            MinAdvanceNoticeDays = 1,
            BlackoutPeriods = null,
            CountForOvertime = true,
            EnforceShiftTimes = false,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        await context.RemoteWorkPolicies.AddAsync(defaultPolicy);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Default remote work policy created: Company-wide (3 days/week, 10 days/month, 120 days/year)");
    }

    private static async Task SeedDefaultWorkflowsAsync(TimeAttendanceDbContext context)
    {
        Console.WriteLine("Creating default workflows for Vacation, Excuse, Remote Work, and Fingerprint requests...");

        var workflows = new List<WorkflowDefinition>();

        // 1. Vacation Request Workflow
        var vacationWorkflow = new WorkflowDefinition
        {
            Name = "Default Vacation Approval",
            NameAr = "موافقة الإجازة الافتراضية",
            Description = "Default workflow for vacation requests - requires direct manager approval",
            DescriptionAr = "مسار العمل الافتراضي لطلبات الإجازة - يتطلب موافقة المدير المباشر",
            EntityType = WorkflowEntityType.Vacation,
            IsActive = true,
            IsDefault = true,
            BranchId = null, // Organization-wide
            Version = 1,
            Priority = 10,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        };

        vacationWorkflow.Steps.Add(new WorkflowStep
        {
            StepOrder = 1,
            Name = "Direct Manager Approval",
            NameAr = "موافقة المدير المباشر",
            StepType = WorkflowStepType.Approval,
            ApproverType = ApproverType.DirectManager,
            TimeoutHours = 48, // 2 days
            NotifyOnAction = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        });

        workflows.Add(vacationWorkflow);

        // 2. Excuse Request Workflow
        var excuseWorkflow = new WorkflowDefinition
        {
            Name = "Default Excuse Approval",
            NameAr = "موافقة العذر الافتراضية",
            Description = "Default workflow for excuse requests - requires direct manager approval",
            DescriptionAr = "مسار العمل الافتراضي لطلبات الأعذار - يتطلب موافقة المدير المباشر",
            EntityType = WorkflowEntityType.Excuse,
            IsActive = true,
            IsDefault = true,
            BranchId = null,
            Version = 1,
            Priority = 10,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        };

        excuseWorkflow.Steps.Add(new WorkflowStep
        {
            StepOrder = 1,
            Name = "Direct Manager Approval",
            NameAr = "موافقة المدير المباشر",
            StepType = WorkflowStepType.Approval,
            ApproverType = ApproverType.DirectManager,
            TimeoutHours = 24, // 1 day
            NotifyOnAction = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        });

        workflows.Add(excuseWorkflow);

        // 3. Remote Work Request Workflow
        var remoteWorkWorkflow = new WorkflowDefinition
        {
            Name = "Default Remote Work Approval",
            NameAr = "موافقة العمل عن بعد الافتراضية",
            Description = "Default workflow for remote work requests - requires direct manager approval",
            DescriptionAr = "مسار العمل الافتراضي لطلبات العمل عن بعد - يتطلب موافقة المدير المباشر",
            EntityType = WorkflowEntityType.RemoteWork,
            IsActive = true,
            IsDefault = true,
            BranchId = null,
            Version = 1,
            Priority = 10,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        };

        remoteWorkWorkflow.Steps.Add(new WorkflowStep
        {
            StepOrder = 1,
            Name = "Direct Manager Approval",
            NameAr = "موافقة المدير المباشر",
            StepType = WorkflowStepType.Approval,
            ApproverType = ApproverType.DirectManager,
            TimeoutHours = 48, // 2 days
            NotifyOnAction = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        });

        workflows.Add(remoteWorkWorkflow);

        // 4. Fingerprint Request Workflow
        var fingerprintWorkflow = new WorkflowDefinition
        {
            Name = "Default Fingerprint Request Approval",
            NameAr = "موافقة طلب البصمة الافتراضية",
            Description = "Default workflow for fingerprint requests - requires direct manager approval",
            DescriptionAr = "مسار العمل الافتراضي لطلبات البصمة - يتطلب موافقة المدير المباشر",
            EntityType = WorkflowEntityType.FingerprintRequest,
            IsActive = true,
            IsDefault = true,
            BranchId = null,
            Version = 1,
            Priority = 10,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        };

        fingerprintWorkflow.Steps.Add(new WorkflowStep
        {
            StepOrder = 1,
            Name = "Direct Manager Approval",
            NameAr = "موافقة المدير المباشر",
            StepType = WorkflowStepType.Approval,
            ApproverType = ApproverType.DirectManager,
            TimeoutHours = 24, // 1 day
            NotifyOnAction = true,
            CreatedBy = "SYSTEM",
            CreatedAtUtc = DateTime.UtcNow,
            RowVersion = new byte[] { 1 }
        });

        workflows.Add(fingerprintWorkflow);

        await context.WorkflowDefinitions.AddRangeAsync(workflows);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Created 4 default workflows: Vacation, Excuse, Remote Work, and Fingerprint Request - all with direct manager approval");
    }

    private static async Task SeedDefaultVacationTypesAsync(TimeAttendanceDbContext context)
    {
        var vacationTypes = new List<VacationType>
        {
            new VacationType
            {
                Name = "Annual Leave",
                NameAr = "إجازة سنوية",
                IsActive = true,
                BranchId = null, // Applies to all branches
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Sick Leave",
                NameAr = "إجازة مرضية",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Unpaid Leave",
                NameAr = "إجازة بدون راتب",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Emergency Leave",
                NameAr = "إجازة طارئة",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Maternity Leave",
                NameAr = "إجازة أمومة",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Paternity Leave",
                NameAr = "إجازة أبوة",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Bereavement Leave",
                NameAr = "إجازة عزاء",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            },
            new VacationType
            {
                Name = "Marriage Leave",
                NameAr = "إجازة زواج",
                IsActive = true,
                BranchId = null,
                CreatedBy = "SYSTEM",
                CreatedAtUtc = DateTime.UtcNow
            }
        };

        await context.VacationTypes.AddRangeAsync(vacationTypes);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Created 8 default vacation types: Annual, Sick, Unpaid, Emergency, Maternity, Paternity, Bereavement, Marriage Leave");
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