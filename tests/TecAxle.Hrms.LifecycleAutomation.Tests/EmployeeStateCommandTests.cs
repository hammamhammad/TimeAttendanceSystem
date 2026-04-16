using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

public class EmployeeStateCommandTests
{
    [Fact]
    public async Task Suspend_is_idempotent()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var user = TestHarness.StubUser();
        var handler = new SuspendEmployeeCommandHandler(db, user);

        var r1 = await handler.Handle(new SuspendEmployeeCommand(emp.Id, "test", 1L), default);
        var r2 = await handler.Handle(new SuspendEmployeeCommand(emp.Id, "test", 1L), default);

        r1.IsSuccess.Should().BeTrue();
        r2.IsSuccess.Should().BeTrue();
        db.Employees.Find(emp.Id)!.IsSuspended.Should().BeTrue();
    }

    [Fact]
    public async Task Suspend_blocks_linked_user_login()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var testUser = new User
        {
            Username = "emp1",
            Email = "emp1@test.com",
            PasswordHash = "hash",
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        db.Users.Add(testUser);
        db.SaveChanges();
        db.EmployeeUserLinks.Add(new EmployeeUserLink { EmployeeId = emp.Id, UserId = testUser.Id });
        db.SaveChanges();

        var handler = new SuspendEmployeeCommandHandler(db, TestHarness.StubUser());

        var r = await handler.Handle(new SuspendEmployeeCommand(emp.Id, "test", 1L), default);

        r.IsSuccess.Should().BeTrue();
        db.Users.Find(testUser.Id)!.IsActive.Should().BeFalse();
    }

    [Fact]
    public async Task Deactivate_is_idempotent_when_already_inactive()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db, configure: e =>
        {
            e.IsActive = false;
            e.IsSuspended = false;
        });

        var handler = new DeactivateEmployeeCommandHandler(db, TestHarness.StubUser());

        var r = await handler.Handle(new DeactivateEmployeeCommand(emp.Id, "test", 1L), default);

        r.IsSuccess.Should().BeTrue();
        var refreshed = db.Employees.Find(emp.Id);
        refreshed!.IsActive.Should().BeFalse();
    }

    [Fact]
    public async Task Deactivate_clears_suspended_flag()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db, configure: e =>
        {
            e.IsActive = true;
            e.IsSuspended = true;
        });

        var handler = new DeactivateEmployeeCommandHandler(db, TestHarness.StubUser());

        await handler.Handle(new DeactivateEmployeeCommand(emp.Id, "test", 1L), default);

        var refreshed = db.Employees.Find(emp.Id);
        refreshed!.IsActive.Should().BeFalse();
        refreshed.IsSuspended.Should().BeFalse();
    }

    [Fact]
    public async Task Activate_flips_prehire_and_stamps_milestone()
    {
        await using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db, configure: e =>
        {
            e.IsPreHire = true;
            e.IsActive = false;
        });

        var handler = new ActivateEmployeeCommandHandler(db, TestHarness.StubUser());

        await handler.Handle(new ActivateEmployeeCommand(emp.Id, 1L), default);

        var refreshed = db.Employees.Find(emp.Id);
        refreshed!.IsPreHire.Should().BeFalse();
        refreshed.IsActive.Should().BeTrue();
        refreshed.OnboardingCompletedAt.Should().NotBeNull();
    }
}
