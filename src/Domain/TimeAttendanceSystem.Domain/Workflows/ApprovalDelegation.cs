using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Domain.Workflows;

/// <summary>
/// Domain entity representing approval delegation from one user to another.
/// Allows users to delegate their approval authority during absence periods.
/// </summary>
/// <remarks>
/// ApprovalDelegation Features:
/// - Time-bound delegation with start and end dates
/// - Entity type filtering (delegate only specific request types)
/// - Active status for immediate delegation control
/// - Supports multiple simultaneous delegations
/// - Audit trail for delegation history
///
/// Business Rules:
/// - User cannot delegate to themselves
/// - Delegation period must be valid (end after start)
/// - Only active delegations are considered for approval routing
/// - Multiple delegations can overlap for different entity types
/// </remarks>
public class ApprovalDelegation : BaseEntity
{
    /// <summary>
    /// Gets or sets the user delegating their approval authority.
    /// </summary>
    public long DelegatorUserId { get; set; }

    /// <summary>
    /// Gets or sets the user receiving the delegated authority.
    /// </summary>
    public long DelegateUserId { get; set; }

    /// <summary>
    /// Gets or sets the start date of the delegation period.
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Gets or sets the end date of the delegation period.
    /// </summary>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Gets or sets whether this delegation is currently active.
    /// Can be deactivated manually before end date.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Gets or sets the comma-separated list of entity types this delegation applies to.
    /// Null means all entity types are delegated.
    /// </summary>
    public string? EntityTypesJson { get; set; }

    /// <summary>
    /// Gets or sets notes about the reason for delegation.
    /// </summary>
    public string? Notes { get; set; }

    // Navigation Properties

    /// <summary>
    /// Gets or sets the user who is delegating their authority.
    /// </summary>
    public User DelegatorUser { get; set; } = null!;

    /// <summary>
    /// Gets or sets the user receiving delegated authority.
    /// </summary>
    public User DelegateUser { get; set; } = null!;

    // Business Logic Methods

    /// <summary>
    /// Validates the delegation configuration.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateDelegation()
    {
        var errors = new List<string>();

        if (DelegatorUserId == DelegateUserId)
        {
            errors.Add("Cannot delegate to yourself");
        }

        if (EndDate < StartDate)
        {
            errors.Add("End date must be after start date");
        }

        if (EndDate < DateTime.Today)
        {
            errors.Add("Delegation period has already ended");
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Checks if the delegation is currently effective.
    /// </summary>
    /// <returns>True if delegation is active and within date range</returns>
    public bool IsCurrentlyEffective()
    {
        var today = DateTime.Today;
        return IsActive && today >= StartDate && today <= EndDate;
    }

    /// <summary>
    /// Checks if this delegation applies to a specific entity type.
    /// </summary>
    /// <param name="entityType">Entity type to check</param>
    /// <returns>True if delegation covers the entity type</returns>
    public bool AppliesToEntityType(WorkflowEntityType entityType)
    {
        if (string.IsNullOrEmpty(EntityTypesJson))
        {
            // Null means all entity types
            return true;
        }

        var entityTypes = GetEntityTypes();
        return entityTypes.Contains(entityType);
    }

    /// <summary>
    /// Gets the list of entity types this delegation applies to.
    /// </summary>
    /// <returns>List of workflow entity types</returns>
    public List<WorkflowEntityType> GetEntityTypes()
    {
        if (string.IsNullOrEmpty(EntityTypesJson))
        {
            return Enum.GetValues<WorkflowEntityType>().ToList();
        }

        return EntityTypesJson
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(s => Enum.Parse<WorkflowEntityType>(s.Trim()))
            .ToList();
    }

    /// <summary>
    /// Sets the entity types this delegation applies to.
    /// </summary>
    /// <param name="entityTypes">List of entity types</param>
    public void SetEntityTypes(IEnumerable<WorkflowEntityType>? entityTypes)
    {
        if (entityTypes == null || !entityTypes.Any())
        {
            EntityTypesJson = null;
            return;
        }

        EntityTypesJson = string.Join(",", entityTypes.Select(e => e.ToString()));
    }

    /// <summary>
    /// Activates this delegation.
    /// </summary>
    public void Activate()
    {
        IsActive = true;
    }

    /// <summary>
    /// Deactivates this delegation.
    /// </summary>
    public void Deactivate()
    {
        IsActive = false;
    }

    /// <summary>
    /// Checks if the delegation period is in the future.
    /// </summary>
    /// <returns>True if delegation starts in the future</returns>
    public bool IsUpcoming()
    {
        return StartDate > DateTime.Today;
    }

    /// <summary>
    /// Checks if the delegation period has ended.
    /// </summary>
    /// <returns>True if delegation has ended</returns>
    public bool IsExpired()
    {
        return EndDate < DateTime.Today;
    }

    /// <summary>
    /// Gets the remaining days in the delegation period.
    /// </summary>
    /// <returns>Number of days remaining, 0 if expired or not started</returns>
    public int GetRemainingDays()
    {
        if (IsExpired())
        {
            return 0;
        }

        var today = DateTime.Today;
        var startFrom = today > StartDate ? today : StartDate;
        return (EndDate - startFrom).Days + 1;
    }

    /// <summary>
    /// Gets a summary description of this delegation.
    /// </summary>
    /// <returns>Human-readable summary</returns>
    public string GetSummaryDescription()
    {
        var entityTypePart = string.IsNullOrEmpty(EntityTypesJson)
            ? "all request types"
            : $"{GetEntityTypes().Count} request type(s)";

        var status = IsCurrentlyEffective() ? "Active" :
                     IsUpcoming() ? "Upcoming" :
                     IsExpired() ? "Expired" : "Inactive";

        return $"{StartDate:MMM dd} - {EndDate:MMM dd, yyyy} ({entityTypePart}) - {status}";
    }
}
