using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Company;
using TecAxle.Hrms.Domain.Users;
using TecAxle.Hrms.Infrastructure.Persistence;

namespace TecAxle.Hrms.Workflow.Tests;

/// <summary>
/// Shared helpers for v13.6 workflow routing tests. Uses InMemory EF.
/// </summary>
internal static class TestHarness
{
    public static TecAxleDbContext NewDb()
    {
        var options = new DbContextOptionsBuilder<TecAxleDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.InMemoryEventId.TransactionIgnoredWarning))
            .Options;
        return new TecAxleDbContext(options);
    }

    public static CompanySettings SeedSettings(TecAxleDbContext db, Action<CompanySettings>? configure = null)
    {
        // TecAxleDbContext (tenant DB) does not hold the Tenants table — that lives in MasterDbContext.
        // For InMemory tests we only need the CompanySettings row itself; the FK pointing at Tenants
        // is not enforced by the InMemory provider.
        var s = new CompanySettings
        {
            Id = 1,
            WorkflowFallbackApproverRole = "HRManager",
            MaxWorkflowDelegationDepth = 2,
            MaxWorkflowResubmissions = 3,
            CreatedBy = "test",
            ModifiedAtUtc = DateTime.UtcNow
        };
        configure?.Invoke(s);
        db.CompanySettings.Add(s);
        db.SaveChanges();
        return s;
    }

    public static User SeedUser(TecAxleDbContext db, long id, string username, bool isActive = true, bool isSystem = false)
    {
        var u = new User
        {
            Id = id,
            Username = username,
            Email = $"{username}@test.com",
            PasswordHash = "x",
            PasswordSalt = "x",
            IsActive = isActive,
            IsSystemUser = isSystem,
            CreatedBy = "test"
        };
        db.Users.Add(u);
        return u;
    }

    public static Role SeedRole(TecAxleDbContext db, long id, string name)
    {
        var r = new Role { Id = id, Name = name, IsSystem = false, IsEditable = true, IsDeletable = true, CreatedBy = "test" };
        db.Roles.Add(r);
        return r;
    }

    public static UserRole AssignRole(TecAxleDbContext db, long userId, long roleId, int priority = 0)
    {
        var ur = new UserRole { UserId = userId, RoleId = roleId, Priority = priority };
        db.UserRoles.Add(ur);
        return ur;
    }

    public static Branch SeedBranch(TecAxleDbContext db, long id = 1, long? managerEmployeeId = null)
    {
        var b = new Branch
        {
            Id = id,
            Code = $"BR{id}",
            Name = $"Branch {id}",
            TimeZone = "UTC",
            IsActive = true,
            ManagerEmployeeId = managerEmployeeId,
            CreatedBy = "test"
        };
        db.Branches.Add(b);
        return b;
    }

    public static Department SeedDepartment(TecAxleDbContext db, long id, long branchId, long? managerEmployeeId = null)
    {
        var d = new Department
        {
            Id = id,
            Code = $"DEPT{id}",
            Name = $"Dept {id}",
            BranchId = branchId,
            ManagerEmployeeId = managerEmployeeId,
            IsActive = true,
            CreatedBy = "test"
        };
        db.Departments.Add(d);
        return d;
    }

    public static Employee SeedEmployee(TecAxleDbContext db, long id, long branchId, long? deptId = null, long? managerEmployeeId = null)
    {
        var e = new Employee
        {
            Id = id,
            EmployeeNumber = $"E{id:000}",
            FirstName = $"First{id}",
            LastName = $"Last{id}",
            JobTitle = "Staff",
            HireDate = new DateTime(2020, 1, 1),
            BranchId = branchId,
            DepartmentId = deptId,
            ManagerEmployeeId = managerEmployeeId,
            IsActive = true,
            CreatedBy = "test"
        };
        db.Employees.Add(e);
        return e;
    }

    public static EmployeeUserLink LinkEmployeeToUser(TecAxleDbContext db, long employeeId, long userId)
    {
        var link = new EmployeeUserLink { EmployeeId = employeeId, UserId = userId };
        db.EmployeeUserLinks.Add(link);
        return link;
    }
}
