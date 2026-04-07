using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Domain.Subscriptions;

/// <summary>
/// Append-only audit log for subscription and entitlement state transitions.
/// Records every plan change, module enable/disable, and feature flag modification
/// for compliance, debugging, and support operations.
/// </summary>
/// <remarks>
/// This is separate from the general AuditLog system because entitlement changes
/// require different queryability: "When was module X disabled for tenant Y?"
/// vs general "what fields changed on entity Z."
///
/// Business Rules:
/// - Append-only: entries are never updated or deleted
/// - Every plan change records full before/after module set as JSON
/// - Module-level changes record the specific module affected
/// - System-initiated changes (e.g., expiry) use PerformedByUserId = null
/// </remarks>
public class EntitlementChangeLog : BaseEntity
{
    /// <summary>
    /// The tenant whose entitlements changed.
    /// </summary>
    public long TenantId { get; set; }

    /// <summary>
    /// The type of entitlement change.
    /// </summary>
    public EntitlementChangeType ChangeType { get; set; }

    /// <summary>
    /// JSON representation of the previous state (e.g., old plan code, old module set).
    /// Null for initial assignments.
    /// </summary>
    public string? PreviousValue { get; set; }

    /// <summary>
    /// JSON representation of the new state (e.g., new plan code, new module set).
    /// </summary>
    public string? NewValue { get; set; }

    /// <summary>
    /// The specific module affected, if applicable (for add-on changes).
    /// Null for plan-level changes that affect multiple modules.
    /// </summary>
    public SystemModule? AffectedModule { get; set; }

    /// <summary>
    /// Human-readable reason for the change.
    /// </summary>
    public string? Reason { get; set; }

    /// <summary>
    /// The user who performed the change.
    /// Null for system-initiated changes (e.g., subscription expiry).
    /// </summary>
    public long? PerformedByUserId { get; set; }
}
