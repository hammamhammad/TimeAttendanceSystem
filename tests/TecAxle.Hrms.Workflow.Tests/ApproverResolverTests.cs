using FluentAssertions;
using TecAxle.Hrms.Application.Workflows.Services;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Workflow.Tests;

/// <summary>
/// v13.6 — tests for ApproverResolver strategy dispatch and fallback chain.
/// </summary>
public class ApproverResolverTests
{
    [Fact]
    public async Task DepartmentHead_ResolvesViaExplicitField()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        var branch = TestHarness.SeedBranch(db);
        var requester = TestHarness.SeedUser(db, 10, "requester");
        var headUser = TestHarness.SeedUser(db, 11, "head");
        var dept = TestHarness.SeedDepartment(db, 100, branch.Id, managerEmployeeId: 201);
        var requesterEmp = TestHarness.SeedEmployee(db, 200, branch.Id, dept.Id);
        var headEmp = TestHarness.SeedEmployee(db, 201, branch.Id, dept.Id);
        TestHarness.LinkEmployeeToUser(db, 200, 10);
        TestHarness.LinkEmployeeToUser(db, 201, 11);
        db.SaveChanges();

        var resolver = new ApproverResolver(db);
        var instance = new WorkflowInstance { RequestedByUserId = 10, EntityType = WorkflowEntityType.Vacation };
        var step = new WorkflowStep { ApproverType = ApproverType.DepartmentHead, StepType = WorkflowStepType.Approval };

        var result = await resolver.ResolveAsync(instance, step, CancellationToken.None);

        result.UserId.Should().Be(11);
        result.Source.Should().Be(ApproverResolutionSource.Primary);
    }

    [Fact]
    public async Task DepartmentHead_FallsBackWhenUnset()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s =>
        {
            s.WorkflowFallbackApproverRole = "HRManager";
        });
        var branch = TestHarness.SeedBranch(db);
        var requester = TestHarness.SeedUser(db, 10, "requester");
        var hrUser = TestHarness.SeedUser(db, 50, "hrmgr");
        var hrRole = TestHarness.SeedRole(db, 5, "HRManager");
        TestHarness.AssignRole(db, 50, 5);
        var dept = TestHarness.SeedDepartment(db, 100, branch.Id, managerEmployeeId: null);
        var requesterEmp = TestHarness.SeedEmployee(db, 200, branch.Id, dept.Id);
        TestHarness.LinkEmployeeToUser(db, 200, 10);
        db.SaveChanges();

        var resolver = new ApproverResolver(db);
        var instance = new WorkflowInstance { RequestedByUserId = 10, EntityType = WorkflowEntityType.Vacation };
        var step = new WorkflowStep { ApproverType = ApproverType.DepartmentHead, StepType = WorkflowStepType.Approval };

        var result = await resolver.ResolveAsync(instance, step, CancellationToken.None);

        result.UserId.Should().Be(50);
        result.Source.Should().Be(ApproverResolutionSource.FallbackRole);
    }

    [Fact]
    public async Task Role_LeastPendingApprovals_PicksUserWithFewestPending()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        var u1 = TestHarness.SeedUser(db, 1, "u1");
        var u2 = TestHarness.SeedUser(db, 2, "u2");
        var u3 = TestHarness.SeedUser(db, 3, "u3");
        var role = TestHarness.SeedRole(db, 10, "Approvers");
        TestHarness.AssignRole(db, 1, 10);
        TestHarness.AssignRole(db, 2, 10);
        TestHarness.AssignRole(db, 3, 10);

        // u1 has 2 pending, u2 has 0, u3 has 1
        db.WorkflowStepExecutions.AddRange(
            new WorkflowStepExecution { WorkflowInstanceId = 99, StepId = 99, AssignedToUserId = 1, AssignedAt = DateTime.UtcNow, CreatedBy = "test" },
            new WorkflowStepExecution { WorkflowInstanceId = 99, StepId = 99, AssignedToUserId = 1, AssignedAt = DateTime.UtcNow, CreatedBy = "test" },
            new WorkflowStepExecution { WorkflowInstanceId = 99, StepId = 99, AssignedToUserId = 3, AssignedAt = DateTime.UtcNow, CreatedBy = "test" }
        );
        db.SaveChanges();

        var resolver = new ApproverResolver(db);
        var instance = new WorkflowInstance { RequestedByUserId = 100, EntityType = WorkflowEntityType.Vacation };
        var step = new WorkflowStep
        {
            ApproverType = ApproverType.Role,
            StepType = WorkflowStepType.Approval,
            ApproverRoleId = 10,
            RoleAssignmentStrategy = RoleAssignmentStrategy.LeastPendingApprovals
        };

        var result = await resolver.ResolveAsync(instance, step, CancellationToken.None);

        result.UserId.Should().Be(2, "u2 has zero pending; should win");
        result.Source.Should().Be(ApproverResolutionSource.Primary);
    }

    [Fact]
    public async Task Role_FixedPriority_PicksHighestPriority()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        TestHarness.SeedUser(db, 1, "u1");
        TestHarness.SeedUser(db, 2, "u2");
        TestHarness.SeedUser(db, 3, "u3");
        TestHarness.SeedRole(db, 10, "Approvers");
        TestHarness.AssignRole(db, 1, 10, priority: 1);
        TestHarness.AssignRole(db, 2, 10, priority: 5);  // highest
        TestHarness.AssignRole(db, 3, 10, priority: 3);
        db.SaveChanges();

        var resolver = new ApproverResolver(db);
        var instance = new WorkflowInstance { RequestedByUserId = 100, EntityType = WorkflowEntityType.Vacation };
        var step = new WorkflowStep
        {
            ApproverType = ApproverType.Role,
            StepType = WorkflowStepType.Approval,
            ApproverRoleId = 10,
            RoleAssignmentStrategy = RoleAssignmentStrategy.FixedPriority
        };

        var result = await resolver.ResolveAsync(instance, step, CancellationToken.None);

        result.UserId.Should().Be(2);
    }

    [Fact]
    public async Task Role_EmptyPool_FallsBackViaTenantChain()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s =>
        {
            s.WorkflowFallbackApproverUserId = 999;
        });
        TestHarness.SeedUser(db, 999, "fallback");
        TestHarness.SeedRole(db, 10, "EmptyRole"); // nobody assigned
        db.SaveChanges();

        var resolver = new ApproverResolver(db);
        var instance = new WorkflowInstance { RequestedByUserId = 100, EntityType = WorkflowEntityType.Vacation };
        var step = new WorkflowStep
        {
            ApproverType = ApproverType.Role,
            StepType = WorkflowStepType.Approval,
            ApproverRoleId = 10,
            RoleAssignmentStrategy = RoleAssignmentStrategy.LeastPendingApprovals
        };

        var result = await resolver.ResolveAsync(instance, step, CancellationToken.None);

        result.UserId.Should().Be(999);
        result.Source.Should().Be(ApproverResolutionSource.FallbackUser);
    }

    [Fact]
    public async Task NoApproverResolved_ReturnsUnresolvedSource()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db); // default HRManager fallback role with no users
        var branch = TestHarness.SeedBranch(db);
        var requester = TestHarness.SeedUser(db, 10, "requester");
        var dept = TestHarness.SeedDepartment(db, 100, branch.Id, managerEmployeeId: null);
        var requesterEmp = TestHarness.SeedEmployee(db, 200, branch.Id, dept.Id);
        TestHarness.LinkEmployeeToUser(db, 200, 10);
        db.SaveChanges();

        var resolver = new ApproverResolver(db);
        var instance = new WorkflowInstance { RequestedByUserId = 10, EntityType = WorkflowEntityType.Vacation };
        var step = new WorkflowStep { ApproverType = ApproverType.DepartmentHead, StepType = WorkflowStepType.Approval };

        var result = await resolver.ResolveAsync(instance, step, CancellationToken.None);

        result.UserId.Should().BeNull();
        result.Source.Should().Be(ApproverResolutionSource.Unresolved);
    }

    [Fact]
    public async Task BranchManager_ResolvesViaBranchFieldAndLink()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        var branch = TestHarness.SeedBranch(db, 1, managerEmployeeId: 301);
        TestHarness.SeedUser(db, 10, "requester");
        TestHarness.SeedUser(db, 20, "branchmgr");
        TestHarness.SeedEmployee(db, 200, branch.Id);
        TestHarness.SeedEmployee(db, 301, branch.Id);
        TestHarness.LinkEmployeeToUser(db, 200, 10);
        TestHarness.LinkEmployeeToUser(db, 301, 20);
        db.SaveChanges();

        var resolver = new ApproverResolver(db);
        var instance = new WorkflowInstance { RequestedByUserId = 10, EntityType = WorkflowEntityType.Vacation };
        var step = new WorkflowStep { ApproverType = ApproverType.BranchManager, StepType = WorkflowStepType.Approval };

        var result = await resolver.ResolveAsync(instance, step, CancellationToken.None);

        result.UserId.Should().Be(20);
        result.Source.Should().Be(ApproverResolutionSource.Primary);
    }

    [Fact]
    public async Task Role_RoundRobin_AdvancesCursorAcrossCalls()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        TestHarness.SeedUser(db, 1, "u1");
        TestHarness.SeedUser(db, 2, "u2");
        TestHarness.SeedUser(db, 3, "u3");
        TestHarness.SeedRole(db, 10, "Rotating");
        TestHarness.AssignRole(db, 1, 10);
        TestHarness.AssignRole(db, 2, 10);
        TestHarness.AssignRole(db, 3, 10);
        db.SaveChanges();

        var resolver = new ApproverResolver(db);
        var step = new WorkflowStep
        {
            ApproverType = ApproverType.Role,
            StepType = WorkflowStepType.Approval,
            ApproverRoleId = 10,
            RoleAssignmentStrategy = RoleAssignmentStrategy.RoundRobin
        };

        var picks = new List<long?>();
        for (var i = 0; i < 4; i++)
        {
            var instance = new WorkflowInstance { RequestedByUserId = 100, EntityType = WorkflowEntityType.Vacation };
            var result = await resolver.ResolveAsync(instance, step, CancellationToken.None);
            picks.Add(result.UserId);
            await db.SaveChangesAsync(); // persist cursor advance
        }

        picks.Should().BeEquivalentTo(new long?[] { 1, 2, 3, 1 }, "round-robin must rotate through the 3 users then wrap");
    }
}
