namespace TimeAttendanceSystem.Application.Excuses.Queries.GetExcusePolicies;

/// <summary>
/// Data Transfer Object for excuse policy information.
/// Contains all policy configuration details for frontend consumption.
/// </summary>
public class ExcusePolicyDto
{
    /// <summary>
    /// Gets or sets the unique identifier for the excuse policy.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Gets or sets the branch identifier this policy applies to.
    /// Null indicates organization-wide policy.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the branch name this policy applies to.
    /// Null for organization-wide policies.
    /// </summary>
    public string? BranchName { get; set; }

    /// <summary>
    /// Gets or sets the maximum number of personal excuses allowed per month.
    /// </summary>
    public int MaxPersonalExcusesPerMonth { get; set; }

    /// <summary>
    /// Gets or sets the maximum total hours of personal excuses per month.
    /// </summary>
    public decimal MaxPersonalExcuseHoursPerMonth { get; set; }

    /// <summary>
    /// Gets or sets the maximum total hours of personal excuses per day.
    /// </summary>
    public decimal MaxPersonalExcuseHoursPerDay { get; set; }

    /// <summary>
    /// Gets or sets the maximum hours allowed per individual excuse.
    /// </summary>
    public decimal MaxHoursPerExcuse { get; set; }

    /// <summary>
    /// Gets or sets whether personal excuses require approval.
    /// </summary>
    public bool RequiresApproval { get; set; }

    /// <summary>
    /// Gets or sets whether partial hour excuses are allowed.
    /// </summary>
    public bool AllowPartialHourExcuses { get; set; }

    /// <summary>
    /// Gets or sets the minimum duration required for an excuse.
    /// </summary>
    public decimal MinimumExcuseDuration { get; set; }

    /// <summary>
    /// Gets or sets whether this policy is currently active.
    /// </summary>
    public bool IsActive { get; set; }

    /// <summary>
    /// Gets or sets the maximum days in the past for retroactive excuses.
    /// </summary>
    public int MaxRetroactiveDays { get; set; }

    /// <summary>
    /// Gets or sets whether employees can create self-service excuse requests.
    /// </summary>
    public bool AllowSelfServiceRequests { get; set; }

    /// <summary>
    /// Gets or sets when this policy was created.
    /// </summary>
    public DateTime CreatedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets who created this policy.
    /// </summary>
    public string CreatedBy { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets when this policy was last modified.
    /// </summary>
    public DateTime? ModifiedAtUtc { get; set; }

    /// <summary>
    /// Gets or sets who last modified this policy.
    /// </summary>
    public string? ModifiedBy { get; set; }
}