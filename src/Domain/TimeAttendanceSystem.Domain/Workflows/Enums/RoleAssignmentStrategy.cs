namespace TecAxle.Hrms.Domain.Workflows.Enums;

/// <summary>
/// Strategy for picking a single user from a role when a workflow step has
/// <see cref="ApproverType.Role"/>. Added in v13.6 to replace the previous
/// non-deterministic first-match behavior that could overload one approver
/// or silently stall the workflow if that user was on leave.
/// </summary>
public enum RoleAssignmentStrategy
{
    /// <summary>
    /// Legacy behavior preserved for tenants that opt in explicitly (e.g. roles with a single user).
    /// Picks the first active user with the role, ordered by <c>UserId</c>.
    /// </summary>
    FirstMatch = 1,

    /// <summary>
    /// Rotate through all active users with the role using a per-role cursor
    /// (<see cref="WorkflowRoleAssignmentCursor"/>). Deterministic, fair, and contention-safe at HRMS scale.
    /// </summary>
    RoundRobin = 2,

    /// <summary>
    /// Pick the candidate user with the fewest currently-pending workflow executions.
    /// Ties broken by lowest <c>UserId</c>. Default strategy — best UX for HR teams with variable load.
    /// </summary>
    LeastPendingApprovals = 3,

    /// <summary>
    /// Pick the candidate with the highest <see cref="Users.UserRole.Priority"/> value
    /// (ties broken by earliest assignment). Use when a tenant maintains an explicit seniority
    /// or fallback ladder inside a single role.
    /// </summary>
    FixedPriority = 4
}
