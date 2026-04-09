using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Platform;
using TecAxle.Hrms.Domain.Subscriptions;
using TecAxle.Hrms.Domain.Tenants;
using System.Security.Cryptography;

namespace TecAxle.Hrms.Infrastructure.Persistence.Master;

/// <summary>
/// Seeds platform-level data into the master database.
/// Tenant business data (roles, permissions, shifts, etc.) is seeded during tenant provisioning.
/// </summary>
public static class MasterSeedData
{
    public static async Task SeedAsync(MasterDbContext context)
    {
        if (!await context.PlatformUsers.AnyAsync())
        {
            await SeedPlatformAdminAsync(context);
        }

        if (!await context.SubscriptionPlans.AnyAsync())
        {
            await SeedSubscriptionPlansAsync(context);
        }

        Console.WriteLine("Master database seeding completed (platform admin, subscription plans)");
    }

    private static async Task SeedPlatformAdminAsync(MasterDbContext context)
    {
        var (hash, salt) = HashPassword("TecAxle@Admin2026!");
        var admin = new PlatformUser
        {
            Username = "tecaxleadmin",
            Email = "admin@tecaxle.com",
            PasswordHash = hash,
            PasswordSalt = salt,
            FullName = "TecAxle Administrator",
            FullNameAr = "مدير تيك أكسل",
            Role = PlatformRole.TecAxleAdmin,
            IsActive = true,
            MustChangePassword = false,
            PreferredLanguage = "en",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        context.PlatformUsers.Add(admin);
        await context.SaveChangesAsync();
        Console.WriteLine("Seeded TecAxle Admin platform user (admin@tecaxle.com)");
    }

    private static async Task SeedSubscriptionPlansAsync(MasterDbContext context)
    {
        var now = DateTime.UtcNow;

        var starter = new SubscriptionPlan
        {
            Code = "starter", Name = "Starter", NameAr = "الأساسية",
            Description = "Essential time & attendance and leave management for small teams",
            DescriptionAr = "إدارة الحضور والانصراف والإجازات الأساسية للفرق الصغيرة",
            Tier = PlanTier.Starter, MonthlyPriceUsd = 49m, AnnualPriceUsd = 490m,
            Currency = "USD", IsPublic = true, IsActive = true, SortOrder = 1,
            CreatedAtUtc = now, CreatedBy = "SYSTEM"
        };

        var professional = new SubscriptionPlan
        {
            Code = "professional", Name = "Professional", NameAr = "الاحترافية",
            Description = "Complete HR management with payroll, lifecycle, and performance",
            DescriptionAr = "إدارة موارد بشرية متكاملة مع الرواتب ودورة حياة الموظف والأداء",
            Tier = PlanTier.Professional, MonthlyPriceUsd = 149m, AnnualPriceUsd = 1490m,
            Currency = "USD", IsPublic = true, IsActive = true, SortOrder = 2,
            CreatedAtUtc = now, CreatedBy = "SYSTEM"
        };

        var enterprise = new SubscriptionPlan
        {
            Code = "enterprise", Name = "Enterprise", NameAr = "المؤسسات",
            Description = "Full platform access with all modules, unlimited capacity, and premium support",
            DescriptionAr = "وصول كامل للمنصة مع جميع الوحدات وسعة غير محدودة ودعم متميز",
            Tier = PlanTier.Enterprise, MonthlyPriceUsd = 399m, AnnualPriceUsd = 3990m,
            Currency = "USD", IsPublic = true, IsActive = true, SortOrder = 3,
            CreatedAtUtc = now, CreatedBy = "SYSTEM"
        };

        await context.SubscriptionPlans.AddRangeAsync(starter, professional, enterprise);
        await context.SaveChangesAsync();

        // Module entitlements
        var starterModules = new[] { SystemModule.Core, SystemModule.TimeAttendance, SystemModule.LeaveManagement, SystemModule.Workflows, SystemModule.RemoteWork };
        foreach (var mod in starterModules)
            context.PlanModuleEntitlements.Add(new PlanModuleEntitlement { PlanId = starter.Id, Module = mod, IsIncluded = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" });

        var professionalModules = starterModules.Concat(new[] {
            SystemModule.EmployeeLifecycle, SystemModule.Payroll, SystemModule.Allowances,
            SystemModule.Offboarding, SystemModule.Documents, SystemModule.Expenses,
            SystemModule.Announcements, SystemModule.Performance
        }).Distinct().ToArray();
        foreach (var mod in professionalModules)
            context.PlanModuleEntitlements.Add(new PlanModuleEntitlement { PlanId = professional.Id, Module = mod, IsIncluded = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" });

        foreach (SystemModule mod in Enum.GetValues(typeof(SystemModule)))
            context.PlanModuleEntitlements.Add(new PlanModuleEntitlement { PlanId = enterprise.Id, Module = mod, IsIncluded = true, CreatedAtUtc = now, CreatedBy = "SYSTEM" });

        // Limits
        await context.PlanLimits.AddRangeAsync(
            new PlanLimit { PlanId = starter.Id, LimitType = LimitType.MaxEmployees, LimitValue = 50, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = starter.Id, LimitType = LimitType.MaxBranches, LimitValue = 3, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = starter.Id, LimitType = LimitType.MaxUsers, LimitValue = 10, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = starter.Id, LimitType = LimitType.StorageGb, LimitValue = 5, CreatedAtUtc = now, CreatedBy = "SYSTEM" });

        await context.PlanLimits.AddRangeAsync(
            new PlanLimit { PlanId = professional.Id, LimitType = LimitType.MaxEmployees, LimitValue = 500, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = professional.Id, LimitType = LimitType.MaxBranches, LimitValue = 20, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = professional.Id, LimitType = LimitType.MaxUsers, LimitValue = 50, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = professional.Id, LimitType = LimitType.StorageGb, LimitValue = 50, CreatedAtUtc = now, CreatedBy = "SYSTEM" });

        await context.PlanLimits.AddRangeAsync(
            new PlanLimit { PlanId = enterprise.Id, LimitType = LimitType.MaxEmployees, LimitValue = -1, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = enterprise.Id, LimitType = LimitType.MaxBranches, LimitValue = -1, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = enterprise.Id, LimitType = LimitType.MaxUsers, LimitValue = -1, CreatedAtUtc = now, CreatedBy = "SYSTEM" },
            new PlanLimit { PlanId = enterprise.Id, LimitType = LimitType.StorageGb, LimitValue = -1, CreatedAtUtc = now, CreatedBy = "SYSTEM" });

        await context.SaveChangesAsync();
        Console.WriteLine("Seeded 3 subscription plans (Starter, Professional, Enterprise) with module entitlements and limits");
    }

    private static (string hash, string salt) HashPassword(string password)
    {
        var saltBytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(saltBytes);
        var salt = Convert.ToBase64String(saltBytes);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
        return (Convert.ToBase64String(pbkdf2.GetBytes(32)), salt);
    }
}
