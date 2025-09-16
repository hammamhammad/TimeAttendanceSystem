using TimeAttendanceSystem.Domain.Branches;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Employees;
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

        if (!await context.Shifts.AnyAsync())
        {
            await SeedShiftsAsync(context);
        }

        if (!await context.Departments.AnyAsync())
        {
            await SeedDepartmentsAsync(context);
        }

        if (!await context.Employees.AnyAsync())
        {
            await SeedEmployeesAsync(context);
        }

        // Assign default shift to all employees
        await AssignDefaultShiftToEmployeesAsync(context);

        // Always ensure SystemAdmin has all permissions (including newly added ones)
        await EnsureSystemAdminHasAllPermissionsAsync(context);

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

        // Shift Management - Work shifts and assignment management
        Console.WriteLine($"DEBUG: Creating shift permissions - PermissionResources.Shift = '{PermissionResources.Shift}'");
        var shiftExtendedCrudPermissions = PermissionBuilder.CreateExtendedCrudPermissions(PermissionResources.Shift, "Shift Management");
        Console.WriteLine($"DEBUG: Created {shiftExtendedCrudPermissions.Count} extended CRUD permissions for shift");
        foreach (var perm in shiftExtendedCrudPermissions)
        {
            Console.WriteLine($"DEBUG: Shift CRUD Permission: {perm.Key} - {perm.Description}");
        }
        permissions.AddRange(shiftExtendedCrudPermissions);

        var shiftAssignPermissions = PermissionBuilder.CreateResourcePermissions(PermissionResources.Shift, "Shift Management",
            PermissionActions.Assign, PermissionActions.Unassign);
        Console.WriteLine($"DEBUG: Created {shiftAssignPermissions.Count} assignment permissions for shift");
        foreach (var perm in shiftAssignPermissions)
        {
            Console.WriteLine($"DEBUG: Shift Assignment Permission: {perm.Key} - {perm.Description}");
        }
        permissions.AddRange(shiftAssignPermissions);

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

        // Get existing permissions to avoid duplicates
        var existingPermissionKeys = await context.Permissions
            .Where(p => !p.IsDeleted)
            .Select(p => p.Key)
            .ToListAsync();

        // Only add permissions that don't already exist
        var newPermissions = permissions.Where(p => !existingPermissionKeys.Contains(p.Key)).ToList();

        if (newPermissions.Any())
        {
            Console.WriteLine($"Adding {newPermissions.Count} new permissions");
            await context.Permissions.AddRangeAsync(newPermissions);
            await context.SaveChangesAsync();

            // Assign new permissions to SystemAdmin role
            var systemAdminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "SystemAdmin");
            if (systemAdminRole != null)
            {
                var newSystemAdminPermissions = newPermissions.Select(p => new RolePermission
                {
                    RoleId = systemAdminRole.Id,
                    PermissionId = p.Id
                }).ToArray();

                await context.RolePermissions.AddRangeAsync(newSystemAdminPermissions);
                await context.SaveChangesAsync();

                Console.WriteLine($"Added {newSystemAdminPermissions.Length} new permissions to SystemAdmin role");
            }
        }
        else
        {
            Console.WriteLine("All permissions already exist, skipping creation");
        }
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

    private static async Task SeedShiftsAsync(TimeAttendanceDbContext context)
    {
        var shifts = new List<Shift>
        {
            new()
            {
                Name = "Flexible Hours 7:30 - 9:00",
                Description = "Flexible working hours with flexible start time between 7:30 AM and 9:00 AM",
                ShiftType = ShiftType.TimeBased,
                RequiredHours = null,
                Status = ShiftStatus.Active,
                IsCheckInRequired = true,
                IsAutoCheckOut = false,
                AllowFlexibleHours = true,
                FlexMinutesBefore = 90, // 1.5 hours before 9:00 AM (7:30 AM)
                FlexMinutesAfter = 0,
                GracePeriodMinutes = 15,
                RequiredWeeklyHours = 40,
                HasCoreHours = true,
                CoreStart = new TimeOnly(9, 0), // Core hours start at 9:00 AM
                CoreEnd = new TimeOnly(16, 0), // Core hours end at 4:00 PM
                IsSunday = false,
                IsMonday = true,
                IsTuesday = true,
                IsWednesday = true,
                IsThursday = true,
                IsFriday = true,
                IsSaturday = false,
                IsNightShift = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new()
            {
                Name = "Morning Shift",
                Description = "Standard morning working hours",
                ShiftType = ShiftType.TimeBased,
                RequiredHours = null,
                Status = ShiftStatus.Active,
                IsCheckInRequired = true,
                IsAutoCheckOut = false,
                AllowFlexibleHours = false,
                FlexMinutesBefore = 0,
                FlexMinutesAfter = 0,
                GracePeriodMinutes = 15,
                RequiredWeeklyHours = 40,
                HasCoreHours = false,
                CoreStart = null,
                CoreEnd = null,
                IsSunday = false,
                IsMonday = true,
                IsTuesday = true,
                IsWednesday = true,
                IsThursday = true,
                IsFriday = true,
                IsSaturday = false,
                IsNightShift = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new()
            {
                Name = "Evening Shift",
                Description = "Standard evening working hours",
                ShiftType = ShiftType.TimeBased,
                RequiredHours = null,
                Status = ShiftStatus.Active,
                IsCheckInRequired = true,
                IsAutoCheckOut = false,
                AllowFlexibleHours = false,
                FlexMinutesBefore = 0,
                FlexMinutesAfter = 0,
                GracePeriodMinutes = 15,
                RequiredWeeklyHours = 40,
                HasCoreHours = false,
                CoreStart = null,
                CoreEnd = null,
                IsSunday = false,
                IsMonday = true,
                IsTuesday = true,
                IsWednesday = true,
                IsThursday = true,
                IsFriday = true,
                IsSaturday = false,
                IsNightShift = false,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new()
            {
                Name = "Night Shift",
                Description = "Night working hours",
                ShiftType = ShiftType.TimeBased,
                RequiredHours = null,
                Status = ShiftStatus.Active,
                IsCheckInRequired = true,
                IsAutoCheckOut = false,
                AllowFlexibleHours = false,
                FlexMinutesBefore = 0,
                FlexMinutesAfter = 0,
                GracePeriodMinutes = 15,
                RequiredWeeklyHours = 40,
                HasCoreHours = false,
                CoreStart = null,
                CoreEnd = null,
                IsSunday = false,
                IsMonday = true,
                IsTuesday = true,
                IsWednesday = true,
                IsThursday = true,
                IsFriday = true,
                IsSaturday = false,
                IsNightShift = true,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            }
        };

        await context.Shifts.AddRangeAsync(shifts);
        await context.SaveChangesAsync();

        // Add shift periods for each shift
        var flexibleShift = shifts.FirstOrDefault(s => s.Name == "Flexible Hours 7:30 - 9:00");
        var morningShift = shifts.FirstOrDefault(s => s.Name == "Morning Shift");
        var eveningShift = shifts.FirstOrDefault(s => s.Name == "Evening Shift");
        var nightShift = shifts.FirstOrDefault(s => s.Name == "Night Shift");

        var shiftPeriods = new List<ShiftPeriod>();

        if (flexibleShift != null)
        {
            shiftPeriods.Add(new ShiftPeriod
            {
                ShiftId = flexibleShift.Id,
                PeriodOrder = 1,
                StartTime = new TimeOnly(7, 30), // Earliest start time
                EndTime = new TimeOnly(16, 30), // 8 hours after latest start (9:00 AM + 8 hours = 5:00 PM, but allowing 30 min flex)
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        if (morningShift != null)
        {
            shiftPeriods.Add(new ShiftPeriod
            {
                ShiftId = morningShift.Id,
                PeriodOrder = 1,
                StartTime = new TimeOnly(8, 0),
                EndTime = new TimeOnly(17, 0),
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        if (eveningShift != null)
        {
            shiftPeriods.Add(new ShiftPeriod
            {
                ShiftId = eveningShift.Id,
                PeriodOrder = 1,
                StartTime = new TimeOnly(16, 0),
                EndTime = new TimeOnly(1, 0),
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        if (nightShift != null)
        {
            shiftPeriods.Add(new ShiftPeriod
            {
                ShiftId = nightShift.Id,
                PeriodOrder = 1,
                StartTime = new TimeOnly(22, 0),
                EndTime = new TimeOnly(6, 0),
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        await context.ShiftPeriods.AddRangeAsync(shiftPeriods);
        await context.SaveChangesAsync();
    }

    private static async Task SeedDepartmentsAsync(TimeAttendanceDbContext context)
    {
        var branch = await context.Branches.FirstAsync();

        var departments = new List<Department>
        {
            new Department
            {
                BranchId = branch.Id,
                Code = "DEPT01",
                Name = "Human Resources",
                NameAr = "الموارد البشرية",
                Description = "Employee relations, recruitment, and HR policies",
                DescriptionAr = "علاقات الموظفين والتوظيف وسياسات الموارد البشرية",
                IsActive = true,
                SortOrder = 1,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Department
            {
                BranchId = branch.Id,
                Code = "DEPT02",
                Name = "Information Technology",
                NameAr = "تكنولوجيا المعلومات",
                Description = "Software development, infrastructure, and technical support",
                DescriptionAr = "تطوير البرمجيات والبنية التحتية والدعم التقني",
                IsActive = true,
                SortOrder = 2,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Department
            {
                BranchId = branch.Id,
                Code = "DEPT03",
                Name = "Finance",
                NameAr = "المالية",
                Description = "Financial planning, accounting, and budget management",
                DescriptionAr = "التخطيط المالي والمحاسبة وإدارة الميزانية",
                IsActive = true,
                SortOrder = 3,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Department
            {
                BranchId = branch.Id,
                Code = "DEPT04",
                Name = "Marketing",
                NameAr = "التسويق",
                Description = "Brand management, advertising, and customer outreach",
                DescriptionAr = "إدارة العلامة التجارية والإعلان والتواصل مع العملاء",
                IsActive = true,
                SortOrder = 4,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Department
            {
                BranchId = branch.Id,
                Code = "DEPT05",
                Name = "Operations",
                NameAr = "العمليات",
                Description = "Daily operations, logistics, and process management",
                DescriptionAr = "العمليات اليومية واللوجستيات وإدارة العمليات",
                IsActive = true,
                SortOrder = 5,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            }
        };

        await context.Departments.AddRangeAsync(departments);
        await context.SaveChangesAsync();
    }

    private static async Task SeedEmployeesAsync(TimeAttendanceDbContext context)
    {
        var branch = await context.Branches.FirstAsync();
        var departments = await context.Departments.ToListAsync();

        var employees = new List<Employee>
        {
            // HR Department
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT01").Id,
                EmployeeNumber = "EMP001",
                FirstName = "Ahmed",
                LastName = "Hassan",
                FirstNameAr = "أحمد",
                LastNameAr = "حسن",
                Email = "ahmed.hassan@company.com",
                Phone = "+966501234567",
                HireDate = new DateTime(2023, 1, 15),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "HR Manager",
                JobTitleAr = "مدير الموارد البشرية",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT01").Id,
                EmployeeNumber = "EMP002",
                FirstName = "Fatima",
                LastName = "Al-Zahra",
                FirstNameAr = "فاطمة",
                LastNameAr = "الزهراء",
                Email = "fatima.alzahra@company.com",
                Phone = "+966501234568",
                HireDate = new DateTime(2023, 2, 1),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "HR Specialist",
                JobTitleAr = "أخصائي موارد بشرية",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            // IT Department
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT02").Id,
                EmployeeNumber = "EMP003",
                FirstName = "Mohammed",
                LastName = "Al-Rashid",
                FirstNameAr = "محمد",
                LastNameAr = "الراشد",
                Email = "mohammed.alrashid@company.com",
                Phone = "+966501234570",
                HireDate = new DateTime(2023, 3, 1),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "IT Manager",
                JobTitleAr = "مدير تكنولوجيا المعلومات",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT02").Id,
                EmployeeNumber = "EMP004",
                FirstName = "Aisha",
                LastName = "Salem",
                FirstNameAr = "عائشة",
                LastNameAr = "سالم",
                Email = "aisha.salem@company.com",
                Phone = "+966501234571",
                HireDate = new DateTime(2023, 3, 15),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "Software Developer",
                JobTitleAr = "مطور برمجيات",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            // Finance Department
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT03").Id,
                EmployeeNumber = "EMP005",
                FirstName = "Layla",
                LastName = "Al-Habib",
                FirstNameAr = "ليلى",
                LastNameAr = "الحبيب",
                Email = "layla.alhabib@company.com",
                Phone = "+966501234573",
                HireDate = new DateTime(2023, 4, 1),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "Finance Manager",
                JobTitleAr = "مدير مالي",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT03").Id,
                EmployeeNumber = "EMP006",
                FirstName = "Youssef",
                LastName = "Al-Kindi",
                FirstNameAr = "يوسف",
                LastNameAr = "الكندي",
                Email = "youssef.alkindi@company.com",
                Phone = "+966501234574",
                HireDate = new DateTime(2023, 4, 15),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "Accountant",
                JobTitleAr = "محاسب",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            // Marketing Department
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT04").Id,
                EmployeeNumber = "EMP007",
                FirstName = "Zainab",
                LastName = "Al-Farisi",
                FirstNameAr = "زينب",
                LastNameAr = "الفارسي",
                Email = "zainab.alfarisi@company.com",
                Phone = "+966501234575",
                HireDate = new DateTime(2023, 5, 1),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "Marketing Manager",
                JobTitleAr = "مدير تسويق",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT04").Id,
                EmployeeNumber = "EMP008",
                FirstName = "Hassan",
                LastName = "Al-Omari",
                FirstNameAr = "حسان",
                LastNameAr = "العمري",
                Email = "hassan.alomari@company.com",
                Phone = "+966501234576",
                HireDate = new DateTime(2023, 5, 15),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "Marketing Specialist",
                JobTitleAr = "أخصائي تسويق",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            // Operations Department
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT05").Id,
                EmployeeNumber = "EMP009",
                FirstName = "Mariam",
                LastName = "Al-Dosari",
                FirstNameAr = "مريم",
                LastNameAr = "الدوسري",
                Email = "mariam.aldosari@company.com",
                Phone = "+966501234577",
                HireDate = new DateTime(2023, 6, 1),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "Operations Manager",
                JobTitleAr = "مدير العمليات",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            },
            new Employee
            {
                BranchId = branch.Id,
                DepartmentId = departments.First(d => d.Code == "DEPT05").Id,
                EmployeeNumber = "EMP010",
                FirstName = "Saeed",
                LastName = "Al-Ghamdi",
                FirstNameAr = "سعيد",
                LastNameAr = "الغامدي",
                Email = "saeed.alghamdi@company.com",
                Phone = "+966501234578",
                HireDate = new DateTime(2023, 6, 15),
                EmploymentStatus = EmploymentStatus.FullTime,
                JobTitle = "Operations Coordinator",
                JobTitleAr = "منسق عمليات",
                WorkLocationType = WorkLocationType.OnSite,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            }
        };

        await context.Employees.AddRangeAsync(employees);
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

    private static async Task AssignDefaultShiftToEmployeesAsync(TimeAttendanceDbContext context)
    {
        // Find the flexible hours shift (default shift)
        var flexibleShift = await context.Shifts
            .FirstOrDefaultAsync(s => s.Name == "Flexible Hours 7:30 - 9:00" && s.Status == ShiftStatus.Active);

        if (flexibleShift == null)
        {
            Console.WriteLine("Flexible Hours shift not found, skipping default shift assignment");
            return;
        }

        // Get all employees who don't have any active shift assignments
        var allEmployees = await context.Employees
            .Where(e => e.EmploymentStatus != EmploymentStatus.Terminated)
            .ToListAsync();

        var existingAssignmentEmployeeIds = await context.ShiftAssignments
            .Where(sa => sa.Status == ShiftAssignmentStatus.Active && sa.AssignmentType == ShiftAssignmentType.Employee)
            .Select(sa => sa.EmployeeId)
            .ToListAsync();

        var employeesWithoutShift = allEmployees
            .Where(e => !existingAssignmentEmployeeIds.Contains(e.Id))
            .ToList();

        if (!employeesWithoutShift.Any())
        {
            Console.WriteLine("All employees already have shift assignments");
            return;
        }

        // Create shift assignments for employees without shifts
        var shiftAssignments = new List<ShiftAssignment>();
        foreach (var employee in employeesWithoutShift)
        {
            shiftAssignments.Add(new ShiftAssignment
            {
                ShiftId = flexibleShift.Id,
                AssignmentType = ShiftAssignmentType.Employee,
                EmployeeId = employee.Id,
                DepartmentId = null,
                BranchId = null,
                EffectiveDate = DateTime.UtcNow.Date,
                EndDate = null, // No end date - permanent assignment
                Status = ShiftAssignmentStatus.Active,
                Priority = 10,
                Notes = "Default shift assignment - created during system seed",
                AssignedByUserId = 1, // System admin user
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM"
            });
        }

        await context.ShiftAssignments.AddRangeAsync(shiftAssignments);
        await context.SaveChangesAsync();

        Console.WriteLine($"Assigned default flexible hours shift to {shiftAssignments.Count} employees");
    }

    private static async Task EnsureSystemAdminHasAllPermissionsAsync(TimeAttendanceDbContext context)
    {
        var systemAdminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "SystemAdmin");
        if (systemAdminRole == null)
        {
            Console.WriteLine("SystemAdmin role not found, skipping permission sync");
            return;
        }

        // Get all permissions
        var allPermissions = await context.Permissions.Where(p => !p.IsDeleted).ToListAsync();

        // Get existing role permissions for SystemAdmin
        var existingRolePermissionIds = await context.RolePermissions
            .Where(rp => rp.RoleId == systemAdminRole.Id)
            .Select(rp => rp.PermissionId)
            .ToListAsync();

        // Find missing permissions
        var missingPermissions = allPermissions
            .Where(p => !existingRolePermissionIds.Contains(p.Id))
            .ToList();

        if (missingPermissions.Any())
        {
            var newRolePermissions = missingPermissions.Select(p => new RolePermission
            {
                RoleId = systemAdminRole.Id,
                PermissionId = p.Id
            }).ToArray();

            await context.RolePermissions.AddRangeAsync(newRolePermissions);
            Console.WriteLine($"Added {newRolePermissions.Length} missing permissions to SystemAdmin role");
        }
        else
        {
            Console.WriteLine("SystemAdmin already has all permissions");
        }
    }

}

public static class Extensions
{
    public static bool In<T>(this T value, params T[] values)
    {
        return values.Contains(value);
    }
}