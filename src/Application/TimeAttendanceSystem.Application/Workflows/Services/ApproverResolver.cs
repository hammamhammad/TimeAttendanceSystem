using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Workflows.Services;

/// <summary>
/// v13.6 approver-resolution service. Replaces the ad-hoc logic previously inlined in
/// <c>WorkflowEngine.DetermineApproverAsync</c>.
/// </summary>
public sealed class ApproverResolver : IApproverResolver
{
    private readonly IApplicationDbContext _db;

    public ApproverResolver(IApplicationDbContext db) => _db = db;

    public async Task<ApproverResolution> ResolveAsync(
        WorkflowInstance instance,
        WorkflowStep step,
        CancellationToken ct)
    {
        // 1) Resolve per the configured approver type.
        var primary = step.ApproverType switch
        {
            ApproverType.SpecificUser => await ResolveSpecificUserAsync(step, ct),
            ApproverType.DirectManager => await ResolveDirectManagerAsync(instance, ct),
            ApproverType.DepartmentHead => await ResolveDepartmentHeadAsync(instance, ct),
            ApproverType.BranchManager => await ResolveBranchManagerAsync(instance, ct),
            ApproverType.Role => await ResolveRoleAsync(step, ct),
            ApproverType.System => ApproverResolution.Ok(0, ApproverResolutionSource.Primary,
                "system_action", new Dictionary<string, object?> { ["approverType"] = "System" }),
            _ => ApproverResolution.None("unknown_approver_type",
                new Dictionary<string, object?> { ["approverType"] = step.ApproverType.ToString() })
        };

        // System step doesn't need a live user.
        if (step.ApproverType == ApproverType.System) return primary;

        if (primary.UserId is > 0 && await IsUserActiveAsync(primary.UserId.Value, ct))
        {
            return primary;
        }

        // 2) Primary failed — fall through the tenant chain.
        return await ResolveFallbackAsync(primary, ct);
    }

    // ---------------- primary resolvers ----------------

    private Task<ApproverResolution> ResolveSpecificUserAsync(WorkflowStep step, CancellationToken ct)
    {
        if (step.ApproverUserId is null)
        {
            return Task.FromResult(ApproverResolution.None("specific_user_not_configured",
                new Dictionary<string, object?> { ["stepId"] = step.Id }));
        }

        return Task.FromResult(ApproverResolution.Ok(
            step.ApproverUserId.Value,
            ApproverResolutionSource.Primary,
            "specific_user",
            new Dictionary<string, object?> { ["userId"] = step.ApproverUserId.Value }));
    }

    private async Task<ApproverResolution> ResolveDirectManagerAsync(WorkflowInstance instance, CancellationToken ct)
    {
        var link = await _db.EmployeeUserLinks.AsNoTracking()
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == instance.RequestedByUserId, ct);

        if (link?.Employee?.ManagerEmployeeId is null)
        {
            return ApproverResolution.None("direct_manager_unset",
                new Dictionary<string, object?>
                {
                    ["requestedByUserId"] = instance.RequestedByUserId,
                    ["employeeId"] = link?.Employee?.Id
                });
        }

        var managerLink = await _db.EmployeeUserLinks.AsNoTracking()
            .FirstOrDefaultAsync(eul => eul.EmployeeId == link.Employee.ManagerEmployeeId, ct);

        if (managerLink?.UserId is null or 0)
        {
            return ApproverResolution.None("direct_manager_has_no_user_link",
                new Dictionary<string, object?>
                {
                    ["managerEmployeeId"] = link.Employee.ManagerEmployeeId
                });
        }

        return ApproverResolution.Ok(managerLink.UserId, ApproverResolutionSource.Primary, "direct_manager");
    }

    private async Task<ApproverResolution> ResolveDepartmentHeadAsync(WorkflowInstance instance, CancellationToken ct)
    {
        // v13.6: use Department.ManagerEmployeeId explicitly. No heuristic.
        var link = await _db.EmployeeUserLinks.AsNoTracking()
            .Include(eul => eul.Employee)
                .ThenInclude(e => e.Department)
            .FirstOrDefaultAsync(eul => eul.UserId == instance.RequestedByUserId, ct);

        if (link?.Employee?.DepartmentId is null)
        {
            return ApproverResolution.None("requester_has_no_department",
                new Dictionary<string, object?> { ["requestedByUserId"] = instance.RequestedByUserId });
        }

        var dept = await _db.Departments.AsNoTracking()
            .FirstOrDefaultAsync(d => d.Id == link.Employee.DepartmentId, ct);

        if (dept?.ManagerEmployeeId is null)
        {
            return ApproverResolution.None("department_head_unset",
                new Dictionary<string, object?>
                {
                    ["departmentId"] = link.Employee.DepartmentId,
                    ["departmentName"] = dept?.Name
                });
        }

        var headLink = await _db.EmployeeUserLinks.AsNoTracking()
            .FirstOrDefaultAsync(eul => eul.EmployeeId == dept.ManagerEmployeeId, ct);

        if (headLink?.UserId is null or 0)
        {
            return ApproverResolution.None("department_head_has_no_user_link",
                new Dictionary<string, object?>
                {
                    ["departmentId"] = dept.Id,
                    ["managerEmployeeId"] = dept.ManagerEmployeeId
                });
        }

        return ApproverResolution.Ok(headLink.UserId, ApproverResolutionSource.Primary, "department_head",
            new Dictionary<string, object?>
            {
                ["departmentId"] = dept.Id,
                ["managerEmployeeId"] = dept.ManagerEmployeeId
            });
    }

    private async Task<ApproverResolution> ResolveBranchManagerAsync(WorkflowInstance instance, CancellationToken ct)
    {
        var link = await _db.EmployeeUserLinks.AsNoTracking()
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == instance.RequestedByUserId, ct);

        if (link?.Employee is null)
        {
            return ApproverResolution.None("requester_has_no_employee",
                new Dictionary<string, object?> { ["requestedByUserId"] = instance.RequestedByUserId });
        }

        var branch = await _db.Branches.AsNoTracking()
            .FirstOrDefaultAsync(b => b.Id == link.Employee.BranchId, ct);

        if (branch?.ManagerEmployeeId is null)
        {
            return ApproverResolution.None("branch_manager_unset",
                new Dictionary<string, object?>
                {
                    ["branchId"] = link.Employee.BranchId,
                    ["branchName"] = branch?.Name
                });
        }

        var mgrLink = await _db.EmployeeUserLinks.AsNoTracking()
            .FirstOrDefaultAsync(eul => eul.EmployeeId == branch.ManagerEmployeeId, ct);

        if (mgrLink?.UserId is null or 0)
        {
            return ApproverResolution.None("branch_manager_has_no_user_link",
                new Dictionary<string, object?>
                {
                    ["branchId"] = branch.Id,
                    ["managerEmployeeId"] = branch.ManagerEmployeeId
                });
        }

        return ApproverResolution.Ok(mgrLink.UserId, ApproverResolutionSource.Primary, "branch_manager",
            new Dictionary<string, object?> { ["branchId"] = branch.Id });
    }

    private async Task<ApproverResolution> ResolveRoleAsync(WorkflowStep step, CancellationToken ct)
    {
        if (step.ApproverRoleId is null)
        {
            return ApproverResolution.None("role_not_configured",
                new Dictionary<string, object?> { ["stepId"] = step.Id });
        }

        return await ResolveRoleByStrategyAsync(step.ApproverRoleId.Value, step.RoleAssignmentStrategy, ct);
    }

    private async Task<ApproverResolution> ResolveRoleByStrategyAsync(
        long roleId, RoleAssignmentStrategy strategy, CancellationToken ct)
    {
        // Candidate pool: all active users holding the role.
        var raw = await _db.UserRoles.AsNoTracking()
            .Where(ur => ur.RoleId == roleId && ur.User.IsActive)
            .Select(ur => new { ur.UserId, ur.Priority })
            .ToListAsync(ct);

        if (raw.Count == 0)
        {
            return ApproverResolution.None("role_has_no_active_users",
                new Dictionary<string, object?> { ["roleId"] = roleId });
        }

        // Project anonymous type → value tuple list so the static local functions
        // can consume a typed IReadOnlyList<(long, int)>.
        var candidates = raw.Select(x => (UserId: x.UserId, Priority: x.Priority)).ToList();

        return strategy switch
        {
            RoleAssignmentStrategy.FirstMatch => FirstMatch(candidates, roleId),
            RoleAssignmentStrategy.RoundRobin => await RoundRobinAsync(candidates.Select(c => c.UserId).ToList(), roleId, ct),
            RoleAssignmentStrategy.FixedPriority => FixedPriority(candidates, roleId),
            RoleAssignmentStrategy.LeastPendingApprovals or _ =>
                await LeastPendingAsync(candidates.Select(c => c.UserId).ToList(), roleId, ct)
        };

        static ApproverResolution FirstMatch(
            IReadOnlyList<(long UserId, int Priority)> list, long roleId)
        {
            // Stable, deterministic: ordered by UserId ascending.
            var picked = list.OrderBy(x => x.UserId).First();
            return ApproverResolution.Ok(picked.UserId, ApproverResolutionSource.Primary, "role_first_match",
                new Dictionary<string, object?> { ["roleId"] = roleId, ["strategy"] = "FirstMatch" });
        }

        static ApproverResolution FixedPriority(
            IReadOnlyList<(long UserId, int Priority)> list, long roleId)
        {
            var picked = list.OrderByDescending(x => x.Priority).ThenBy(x => x.UserId).First();
            return ApproverResolution.Ok(picked.UserId, ApproverResolutionSource.Primary, "role_fixed_priority",
                new Dictionary<string, object?>
                {
                    ["roleId"] = roleId,
                    ["strategy"] = "FixedPriority",
                    ["priority"] = picked.Priority
                });
        }
    }

    // Helper: project IEnumerable of anonymous tuples into the typed list the local funcs expect.
    private static IReadOnlyList<(long UserId, int Priority)> AsTyped(
        IEnumerable<dynamic> src)
        => src.Select(x => ((long)x.UserId, (int)x.Priority)).ToList();

    private async Task<ApproverResolution> RoundRobinAsync(List<long> candidateUserIds, long roleId, CancellationToken ct)
    {
        var ordered = candidateUserIds.OrderBy(x => x).ToList();

        var cursor = await _db.WorkflowRoleAssignmentCursors
            .FirstOrDefaultAsync(c => c.RoleId == roleId, ct);

        long pickedUserId;
        if (cursor == null)
        {
            pickedUserId = ordered.First();
            _db.WorkflowRoleAssignmentCursors.Add(new WorkflowRoleAssignmentCursor
            {
                RoleId = roleId,
                LastAssignedUserId = pickedUserId,
                LastAssignedAtUtc = DateTime.UtcNow
            });
        }
        else
        {
            // Next user greater than last; wrap to first if at end.
            pickedUserId = ordered.FirstOrDefault(u => u > (cursor.LastAssignedUserId ?? long.MinValue));
            if (pickedUserId == 0) pickedUserId = ordered.First();
            cursor.LastAssignedUserId = pickedUserId;
            cursor.LastAssignedAtUtc = DateTime.UtcNow;
        }

        return ApproverResolution.Ok(pickedUserId, ApproverResolutionSource.Primary, "role_round_robin",
            new Dictionary<string, object?>
            {
                ["roleId"] = roleId,
                ["strategy"] = "RoundRobin",
                ["rotationSize"] = ordered.Count
            });
    }

    private async Task<ApproverResolution> LeastPendingAsync(List<long> candidateUserIds, long roleId, CancellationToken ct)
    {
        // Count currently-pending executions per candidate.
        var pendingCounts = await _db.WorkflowStepExecutions
            .AsNoTracking()
            .Where(e => candidateUserIds.Contains(e.AssignedToUserId) && !e.Action.HasValue)
            .GroupBy(e => e.AssignedToUserId)
            .Select(g => new { UserId = g.Key, Count = g.Count() })
            .ToListAsync(ct);

        var countMap = pendingCounts.ToDictionary(x => x.UserId, x => x.Count);

        // Pick minimum count; tie broken by lowest UserId.
        var picked = candidateUserIds
            .Select(u => (UserId: u, Count: countMap.TryGetValue(u, out var c) ? c : 0))
            .OrderBy(x => x.Count)
            .ThenBy(x => x.UserId)
            .First();

        return ApproverResolution.Ok(picked.UserId, ApproverResolutionSource.Primary, "role_least_pending",
            new Dictionary<string, object?>
            {
                ["roleId"] = roleId,
                ["strategy"] = "LeastPendingApprovals",
                ["pendingCount"] = picked.Count,
                ["candidatePoolSize"] = candidateUserIds.Count
            });
    }

    // ---------------- fallback ----------------

    private async Task<ApproverResolution> ResolveFallbackAsync(ApproverResolution primary, CancellationToken ct)
    {
        var settings = await _db.CompanySettings.AsNoTracking().FirstOrDefaultAsync(ct);

        // 2a) Explicit user override.
        if (settings?.WorkflowFallbackApproverUserId is { } fbUserId && fbUserId > 0
            && await IsUserActiveAsync(fbUserId, ct))
        {
            return new ApproverResolution
            {
                UserId = fbUserId,
                Source = ApproverResolutionSource.FallbackUser,
                Reason = "fallback_user_override",
                Details = MergeDetails(primary.Details, new Dictionary<string, object?>
                {
                    ["primaryFailReason"] = primary.Reason,
                    ["fallbackUserId"] = fbUserId
                })
            };
        }

        // 2b) Role-based fallback — use FirstMatch to avoid recursion complexity.
        var roleName = settings?.WorkflowFallbackApproverRole;
        if (!string.IsNullOrWhiteSpace(roleName))
        {
            var role = await _db.Roles.AsNoTracking().FirstOrDefaultAsync(r => r.Name == roleName, ct);
            if (role != null)
            {
                var roleResult = await ResolveRoleByStrategyAsync(role.Id, RoleAssignmentStrategy.FirstMatch, ct);
                if (roleResult.UserId is > 0 && await IsUserActiveAsync(roleResult.UserId.Value, ct))
                {
                    return new ApproverResolution
                    {
                        UserId = roleResult.UserId,
                        Source = ApproverResolutionSource.FallbackRole,
                        Reason = "fallback_role",
                        Details = MergeDetails(primary.Details, new Dictionary<string, object?>
                        {
                            ["primaryFailReason"] = primary.Reason,
                            ["fallbackRole"] = roleName,
                            ["fallbackUserId"] = roleResult.UserId
                        })
                    };
                }
            }
        }

        // 3) Both fallbacks failed.
        return ApproverResolution.None(
            "no_approver_found",
            MergeDetails(primary.Details, new Dictionary<string, object?>
            {
                ["primaryFailReason"] = primary.Reason,
                ["fallbackUserId"] = settings?.WorkflowFallbackApproverUserId,
                ["fallbackRole"] = settings?.WorkflowFallbackApproverRole
            }));
    }

    private async Task<bool> IsUserActiveAsync(long userId, CancellationToken ct)
    {
        if (userId <= 0) return false;
        return await _db.Users.AsNoTracking().AnyAsync(u => u.Id == userId && u.IsActive, ct);
    }

    private static Dictionary<string, object?> MergeDetails(
        Dictionary<string, object?>? a, Dictionary<string, object?> b)
    {
        if (a == null) return b;
        var merged = new Dictionary<string, object?>(a);
        foreach (var kv in b) merged[kv.Key] = kv.Value;
        return merged;
    }
}
