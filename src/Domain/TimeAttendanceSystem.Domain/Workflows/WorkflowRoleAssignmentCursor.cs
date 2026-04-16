using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.Domain.Workflows;

/// <summary>
/// Persistent cursor used by the <c>RoundRobin</c> role-assignment strategy.
/// One row per role; records the last user assigned to a workflow step by that role
/// so that the next assignment rotates to the next candidate.
/// </summary>
/// <remarks>
/// - Created on demand the first time a role is used with <c>RoundRobin</c>.
/// - Stored in each tenant's database (not the master) because role IDs are tenant-scoped.
/// - Accessed read-modify-write in a single <c>SaveChangesAsync</c> call; under contention,
///   the winner advances the cursor and losers retry. At HRMS submission rates this is negligible.
/// </remarks>
public class WorkflowRoleAssignmentCursor : BaseEntity
{
    /// <summary>
    /// The role whose user pool is being rotated. Unique — one cursor per role.
    /// </summary>
    public long RoleId { get; set; }

    /// <summary>
    /// The user most recently assigned by this cursor, or null if the cursor has never advanced.
    /// The next call picks the first active user with UserId &gt; this one (wrapping to the lowest
    /// UserId when the end of the list is reached).
    /// </summary>
    public long? LastAssignedUserId { get; set; }

    /// <summary>
    /// UTC timestamp of the last advance. Used for operational debugging — e.g. "when did we last
    /// rotate for the Finance Approver role?"
    /// </summary>
    public DateTime? LastAssignedAtUtc { get; set; }

    // Navigation
    public Role Role { get; set; } = null!;
    public User? LastAssignedUser { get; set; }
}
