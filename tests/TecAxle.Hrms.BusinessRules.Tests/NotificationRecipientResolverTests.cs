using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using TecAxle.Hrms.Domain.Company;
using TecAxle.Hrms.Domain.Users;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.BusinessRules.Tests;

public class NotificationRecipientResolverTests
{
    private static TecAxleDbContext NewInMemoryDb()
    {
        var options = new DbContextOptionsBuilder<TecAxleDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.InMemoryEventId.TransactionIgnoredWarning))
            .Options;
        return new TecAxleDbContext(options);
    }

    private static async Task SeedUsersAsync(TecAxleDbContext db,
        (string roleName, long userId)[] assignments, string? rolesCsv = null)
    {
        // Create distinct roles
        var roleNames = assignments.Select(a => a.roleName).Distinct().ToList();
        var roleMap = new Dictionary<string, long>();
        long nextRoleId = 1;
        foreach (var n in roleNames)
        {
            var role = new Role { Id = nextRoleId, Name = n, CreatedBy = "test" };
            db.Roles.Add(role);
            roleMap[n] = role.Id;
            nextRoleId++;
        }

        foreach (var (roleName, userId) in assignments)
        {
            // ensure User exists
            if (!db.Users.Any(u => u.Id == userId))
            {
                db.Users.Add(new User
                {
                    Id = userId,
                    Username = $"u{userId}",
                    Email = $"u{userId}@test.local",
                    PasswordHash = "x",
                    PasswordSalt = "x",
                    IsActive = true,
                    CreatedBy = "test"
                });
            }
            db.UserRoles.Add(new UserRole
            {
                UserId = userId,
                RoleId = roleMap[roleName]
            });
        }

        if (rolesCsv != null)
        {
            db.CompanySettings.Add(new CompanySettings
            {
                NotificationRecipientRolesCsv = rolesCsv,
                CreatedAtUtc = DateTime.UtcNow,
                ModifiedAtUtc = DateTime.UtcNow,
                CreatedBy = "test"
            });
        }

        await db.SaveChangesAsync();
    }

    [Fact]
    public async Task Default_roles_match_pre_v13_4_behavior()
    {
        await using var db = NewInMemoryDb();
        await SeedUsersAsync(db, new[]
        {
            ("HRManager", 10L),
            ("SystemAdmin", 20L),
            ("Employee", 30L),
        });

        var resolver = new NotificationRecipientResolver(db, NullLogger<NotificationRecipientResolver>.Instance);
        var ids = await resolver.GetRecipientUserIdsAsync();

        ids.Should().BeEquivalentTo(new[] { 10L, 20L });
    }

    [Fact]
    public async Task Reads_configured_CSV_from_CompanySettings()
    {
        await using var db = NewInMemoryDb();
        await SeedUsersAsync(db, new[]
        {
            ("HRManager", 10L),
            ("HR", 11L),
            ("PayrollAdmin", 12L),
            ("SystemAdmin", 20L),
        }, rolesCsv: "HR,PayrollAdmin");

        var resolver = new NotificationRecipientResolver(db, NullLogger<NotificationRecipientResolver>.Instance);
        var ids = await resolver.GetRecipientUserIdsAsync();

        // Only the HR and PayrollAdmin users (HRManager/SystemAdmin excluded).
        ids.Should().BeEquivalentTo(new[] { 11L, 12L });
    }

    [Fact]
    public async Task Extra_roles_are_added_on_top_of_configured_CSV()
    {
        await using var db = NewInMemoryDb();
        await SeedUsersAsync(db, new[]
        {
            ("HRManager", 10L),
            ("SystemAdmin", 20L),
            ("Admin", 30L),
        });

        var resolver = new NotificationRecipientResolver(db, NullLogger<NotificationRecipientResolver>.Instance);
        var ids = await resolver.GetRecipientUserIdsAsync(new[] { "Admin" });

        ids.Should().BeEquivalentTo(new[] { 10L, 20L, 30L });
    }

    [Fact]
    public async Task Empty_or_null_CSV_falls_back_to_defaults()
    {
        await using var db = NewInMemoryDb();
        await SeedUsersAsync(db, new[]
        {
            ("HRManager", 10L),
            ("SystemAdmin", 20L),
        }, rolesCsv: "   ");

        var resolver = new NotificationRecipientResolver(db, NullLogger<NotificationRecipientResolver>.Instance);
        var ids = await resolver.GetRecipientUserIdsAsync();

        ids.Should().BeEquivalentTo(new[] { 10L, 20L });
    }

    [Fact]
    public async Task Case_insensitive_role_match()
    {
        await using var db = NewInMemoryDb();
        await SeedUsersAsync(db, new[]
        {
            ("hrmanager", 10L),
            ("HRMANAGER", 11L),  // duplicate role name — the second assignment reuses the role
            ("SystemAdmin", 20L),
        });

        var resolver = new NotificationRecipientResolver(db, NullLogger<NotificationRecipientResolver>.Instance);
        var ids = await resolver.GetRecipientUserIdsAsync();

        ids.Should().Contain(10L);
        ids.Should().Contain(20L);
    }

    [Fact]
    public async Task Returns_empty_when_no_matching_users_exist()
    {
        await using var db = NewInMemoryDb();
        await SeedUsersAsync(db, new[]
        {
            ("Employee", 30L),
            ("Contractor", 31L),
        });

        var resolver = new NotificationRecipientResolver(db, NullLogger<NotificationRecipientResolver>.Instance);
        var ids = await resolver.GetRecipientUserIdsAsync();

        ids.Should().BeEmpty();
    }
}
