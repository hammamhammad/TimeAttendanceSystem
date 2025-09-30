using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Domain.Excuses;

/// <summary>
/// Domain entity representing organizational policy for employee excuse management.
/// Defines rules and limits for personal excuses while exempting official duties.
/// </summary>
/// <remarks>
/// ExcusePolicy Entity Features:
/// - Branch-scoped or organization-wide policy configuration
/// - Comprehensive limits for personal excuse usage
/// - Flexible configuration for partial hour excuses
/// - Active/inactive status for policy lifecycle management
/// - Role-based security through permission system
///
/// Business Rules:
/// - Personal excuses are subject to policy limits
/// - Official duties are exempt from all policy restrictions
/// - Policies can be branch-specific or organization-wide (null BranchId)
/// - All time-based limits are enforced during excuse creation
/// - Approval requirements are configurable per organization
///
/// Security Considerations:
/// - Branch-scoped access control for multi-tenant environments
/// - Permission-based policy modification rights
/// - Audit trail through BaseEntity inheritance
/// </remarks>
public class ExcusePolicy : BaseEntity
{
    /// <summary>
    /// Gets or sets the branch identifier for policy scope.
    /// When null, policy applies to all branches organization-wide.
    /// When set, policy is specific to that branch only.
    /// </summary>
    /// <value>Branch ID for organizational scope (null = organization-wide)</value>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the maximum number of personal excuses allowed per calendar month.
    /// Official duties are exempt from this limit.
    /// </summary>
    /// <value>Maximum personal excuse count per month</value>
    public int MaxPersonalExcusesPerMonth { get; set; } = 5;

    /// <summary>
    /// Gets or sets the maximum total hours of personal excuses allowed per calendar month.
    /// Cumulative limit across all personal excuses in the month.
    /// </summary>
    /// <value>Maximum personal excuse hours per month</value>
    public decimal MaxPersonalExcuseHoursPerMonth { get; set; } = 8.0m;

    /// <summary>
    /// Gets or sets the maximum total hours of personal excuses allowed per working day.
    /// Prevents excessive daily excuse usage while allowing multiple small excuses.
    /// </summary>
    /// <value>Maximum personal excuse hours per day</value>
    public decimal MaxPersonalExcuseHoursPerDay { get; set; } = 4.0m;

    /// <summary>
    /// Gets or sets the maximum duration allowed for a single personal excuse.
    /// Limits the length of individual excuse requests.
    /// </summary>
    /// <value>Maximum hours per individual excuse</value>
    public decimal MaxHoursPerExcuse { get; set; } = 2.0m;

    /// <summary>
    /// Gets or sets whether personal excuses require approval before being applied.
    /// When true, excuses remain pending until approved by authorized personnel.
    /// </summary>
    /// <value>True if approval is required, false for automatic acceptance</value>
    public bool RequiresApproval { get; set; } = true;

    /// <summary>
    /// Gets or sets whether partial hour excuses are allowed (e.g., 30 minutes, 1.5 hours).
    /// When false, only full hour excuses are permitted.
    /// </summary>
    /// <value>True if partial hours allowed, false for full hours only</value>
    public bool AllowPartialHourExcuses { get; set; } = true;

    /// <summary>
    /// Gets or sets the minimum duration required for an excuse request.
    /// Prevents very short excuse requests that may be unnecessary.
    /// </summary>
    /// <value>Minimum excuse duration in hours (e.g., 0.5 for 30 minutes)</value>
    public decimal MinimumExcuseDuration { get; set; } = 0.5m;

    /// <summary>
    /// Gets or sets the active status of this policy.
    /// Inactive policies are not enforced but preserved for historical reference.
    /// </summary>
    /// <value>True if policy is active and enforced</value>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Gets or sets the maximum number of days in the past that excuses can be created for.
    /// Prevents retroactive excuse creation beyond reasonable limits.
    /// </summary>
    /// <value>Maximum days in the past for excuse creation</value>
    public int MaxRetroactiveDays { get; set; } = 7;

    /// <summary>
    /// Gets or sets whether employees can create their own excuse requests.
    /// When false, only managers or HR can create excuses for employees.
    /// </summary>
    /// <value>True if self-service is allowed</value>
    public bool AllowSelfServiceRequests { get; set; } = true;

    // Navigation Properties

    /// <summary>
    /// Gets or sets the branch entity this policy belongs to.
    /// Navigation property for branch-specific policy management.
    /// </summary>
    /// <value>Branch entity for organizational hierarchy (nullable)</value>
    public Branch? Branch { get; set; }

    // Business Logic Methods

    /// <summary>
    /// Validates the policy configuration for business rule compliance.
    /// Ensures all limits and settings are logically consistent.
    /// </summary>
    /// <returns>Validation result with specific error details</returns>
    public (bool IsValid, List<string> Errors) ValidatePolicy()
    {
        var errors = new List<string>();

        if (MaxPersonalExcusesPerMonth <= 0)
            errors.Add("Maximum personal excuses per month must be greater than zero");

        if (MaxPersonalExcuseHoursPerMonth <= 0)
            errors.Add("Maximum personal excuse hours per month must be greater than zero");

        if (MaxPersonalExcuseHoursPerDay <= 0)
            errors.Add("Maximum personal excuse hours per day must be greater than zero");

        if (MaxHoursPerExcuse <= 0)
            errors.Add("Maximum hours per excuse must be greater than zero");

        if (MinimumExcuseDuration <= 0)
            errors.Add("Minimum excuse duration must be greater than zero");

        if (MaxRetroactiveDays < 0)
            errors.Add("Maximum retroactive days cannot be negative");

        if (MaxPersonalExcuseHoursPerDay > MaxPersonalExcuseHoursPerMonth)
            errors.Add("Daily excuse hours limit cannot exceed monthly limit");

        if (MaxHoursPerExcuse > MaxPersonalExcuseHoursPerDay)
            errors.Add("Single excuse hours limit cannot exceed daily limit");

        if (MinimumExcuseDuration > MaxHoursPerExcuse)
            errors.Add("Minimum excuse duration cannot exceed maximum excuse duration");

        if (!AllowPartialHourExcuses && MinimumExcuseDuration < 1.0m)
            errors.Add("When partial hours are not allowed, minimum duration must be at least 1 hour");

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Checks if a proposed excuse duration is within policy limits.
    /// </summary>
    /// <param name="durationHours">Proposed excuse duration in hours</param>
    /// <returns>True if duration is acceptable under policy</returns>
    public bool IsValidExcuseDuration(decimal durationHours)
    {
        if (durationHours < MinimumExcuseDuration)
            return false;

        if (durationHours > MaxHoursPerExcuse)
            return false;

        if (!AllowPartialHourExcuses && durationHours % 1 != 0)
            return false;

        return true;
    }

    /// <summary>
    /// Calculates remaining excuse allowance for an employee in a given month.
    /// </summary>
    /// <param name="currentMonthExcuseCount">Current number of excuses this month</param>
    /// <param name="currentMonthExcuseHours">Current total excuse hours this month</param>
    /// <returns>Remaining allowance details</returns>
    public (int RemainingCount, decimal RemainingHours) GetRemainingAllowance(
        int currentMonthExcuseCount,
        decimal currentMonthExcuseHours)
    {
        var remainingCount = Math.Max(0, MaxPersonalExcusesPerMonth - currentMonthExcuseCount);
        var remainingHours = Math.Max(0, MaxPersonalExcuseHoursPerMonth - currentMonthExcuseHours);

        return (remainingCount, remainingHours);
    }

    /// <summary>
    /// Checks if a date is within the allowed retroactive period.
    /// </summary>
    /// <param name="excuseDate">Date of the proposed excuse</param>
    /// <returns>True if date is within allowed retroactive period</returns>
    public bool IsWithinRetroactiveLimit(DateTime excuseDate)
    {
        var earliestAllowedDate = DateTime.Today.AddDays(-MaxRetroactiveDays);
        return excuseDate.Date >= earliestAllowedDate;
    }

    /// <summary>
    /// Gets a summary description of the policy configuration.
    /// </summary>
    /// <returns>Human-readable policy summary</returns>
    public string GetPolicySummary()
    {
        var scope = BranchId.HasValue ? "Branch-specific" : "Organization-wide";
        var approval = RequiresApproval ? "Requires approval" : "Auto-approved";
        var partialHours = AllowPartialHourExcuses ? "Allows partial hours" : "Full hours only";

        return $"{scope} policy: {MaxPersonalExcusesPerMonth} excuses/month, " +
               $"{MaxPersonalExcuseHoursPerMonth}h/month, {MaxPersonalExcuseHoursPerDay}h/day. " +
               $"{approval}, {partialHours}";
    }
}