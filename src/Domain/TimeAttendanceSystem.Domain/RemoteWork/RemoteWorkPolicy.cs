using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Domain.RemoteWork;

/// <summary>
/// Domain entity representing remote work policy configuration within the organization.
/// Manages remote work rules, quotas, and restrictions with branch-level organization.
/// </summary>
/// <remarks>
/// Remote Work Policy Features:
/// - Branch-scoped policy configuration for multi-tenant isolation
/// - Flexible quota system (weekly/monthly/yearly limits)
/// - Consecutive days restrictions and blackout periods
/// - Optional manager approval workflow
/// - Attendance integration settings
/// - Active/inactive status control for availability management
///
/// Business Rules:
/// - Policy is branch-specific (required BranchId)
/// - At least one quota limit should be defined (week/month/year)
/// - Consecutive days restrictions require AllowConsecutiveDays to be true
/// - Blackout periods stored as JSON array of date ranges
/// - Active status controls availability for new remote work assignments
///
/// Integration:
/// - Affects attendance calculations (CountForOvertime, EnforceShiftTimes)
/// - Works with RemoteWorkAssignment for quota validation
/// - Integrates with manager approval workflow when required
///
/// Security Considerations:
/// - Branch-scoped access control for multi-tenant data protection
/// - Permission-based operations for policy management
/// - Audit trail support through BaseEntity inheritance
/// </remarks>
public class RemoteWorkPolicy : BaseEntity
{
    /// <summary>
    /// Gets or sets the branch identifier linking this policy to its organizational scope.
    /// When null, the policy applies company-wide to all branches.
    /// When set, the policy applies only to the specified branch.
    /// </summary>
    /// <value>Branch ID for organizational context (nullable - null means company-wide)</value>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the maximum number of remote work days allowed per week.
    /// When null, no weekly limit is enforced.
    /// </summary>
    /// <value>Maximum remote days per week (nullable)</value>
    public int? MaxDaysPerWeek { get; set; }

    /// <summary>
    /// Gets or sets the maximum number of remote work days allowed per month.
    /// When null, no monthly limit is enforced.
    /// </summary>
    /// <value>Maximum remote days per month (nullable)</value>
    public int? MaxDaysPerMonth { get; set; }

    /// <summary>
    /// Gets or sets the maximum number of remote work days allowed per year.
    /// When null, no yearly limit is enforced.
    /// </summary>
    /// <value>Maximum remote days per year (nullable)</value>
    public int? MaxDaysPerYear { get; set; }

    /// <summary>
    /// Gets or sets whether remote work assignments require manager approval.
    /// When true, assignments enter Pending status awaiting manager action.
    /// </summary>
    /// <value>True if manager approval required, false for automatic approval</value>
    public bool RequiresManagerApproval { get; set; } = false;

    /// <summary>
    /// Gets or sets whether consecutive remote work days are allowed.
    /// When false, remote work days must be separated by on-site days.
    /// </summary>
    /// <value>True if consecutive days allowed, false if not</value>
    public bool AllowConsecutiveDays { get; set; } = true;

    /// <summary>
    /// Gets or sets the maximum number of consecutive remote work days allowed.
    /// Only applicable when AllowConsecutiveDays is true. When null, no limit on consecutive days.
    /// </summary>
    /// <value>Maximum consecutive remote days (nullable)</value>
    public int? MaxConsecutiveDays { get; set; }

    /// <summary>
    /// Gets or sets the minimum number of days in advance required for remote work requests.
    /// When null, no advance notice requirement. Used for planning and coordination.
    /// </summary>
    /// <value>Minimum days advance notice (nullable)</value>
    public int? MinAdvanceNoticeDays { get; set; }

    /// <summary>
    /// Gets or sets blackout periods when remote work is not allowed.
    /// Stored as JSON array of date ranges for flexibility.
    /// Example: [{"StartDate":"2025-12-20","EndDate":"2025-12-31"}]
    /// </summary>
    /// <value>JSON string of blackout date ranges (nullable)</value>
    public string? BlackoutPeriods { get; set; }

    /// <summary>
    /// Gets or sets whether remote work days count towards overtime calculations.
    /// When true, remote work hours are included in overtime eligibility.
    /// </summary>
    /// <value>True if remote work counts for overtime, false if excluded</value>
    public bool CountForOvertime { get; set; } = true;

    /// <summary>
    /// Gets or sets whether shift times must be enforced during remote work.
    /// When true, employees must check in/out during assigned shift times.
    /// When false, flexible timing is allowed within working day.
    /// </summary>
    /// <value>True if shift times enforced, false for flexible timing</value>
    public bool EnforceShiftTimes { get; set; } = false;

    /// <summary>
    /// Gets or sets the current active status of this policy.
    /// Controls availability for new remote work assignments while preserving historical data.
    /// </summary>
    /// <value>True if available for new assignments, false if disabled</value>
    public bool IsActive { get; set; } = true;

    // Navigation Properties

    /// <summary>
    /// Gets or sets the branch entity this policy belongs to.
    /// </summary>
    /// <value>Branch entity for organizational hierarchy navigation</value>
    public Branch? Branch { get; set; }

    /// <summary>
    /// Gets or sets the collection of remote work requests using this policy.
    /// </summary>
    /// <value>Collection of requests governed by this policy</value>
    public ICollection<RemoteWorkRequest> RemoteWorkRequests { get; set; } = new List<RemoteWorkRequest>();

    // Business Logic Methods

    /// <summary>
    /// Validates the remote work policy configuration for business rule compliance.
    /// Ensures policy settings are logically consistent and operationally viable.
    /// </summary>
    /// <returns>Result indicating validation success or specific failure reasons</returns>
    /// <remarks>
    /// Validation Rules:
    /// - BranchId must be greater than 0 if specified (null means company-wide)
    /// - At least one quota limit (week/month/year) should be defined
    /// - All quota values must be positive if specified
    /// - MaxConsecutiveDays requires AllowConsecutiveDays to be true
    /// - MaxConsecutiveDays cannot exceed weekly/monthly quotas if defined
    /// - MinAdvanceNoticeDays must be non-negative if specified
    /// - BlackoutPeriods must be valid JSON if provided
    /// </remarks>
    public (bool IsValid, List<string> Errors) ValidateConfiguration()
    {
        var errors = new List<string>();

        if (BranchId.HasValue && BranchId.Value <= 0)
            errors.Add("Branch ID must be greater than 0 if specified");

        // At least one quota should be defined
        if (!MaxDaysPerWeek.HasValue && !MaxDaysPerMonth.HasValue && !MaxDaysPerYear.HasValue)
            errors.Add("At least one quota limit (weekly, monthly, or yearly) must be defined");

        // Validate quota values are positive
        if (MaxDaysPerWeek.HasValue && MaxDaysPerWeek.Value <= 0)
            errors.Add("Maximum days per week must be greater than 0");

        if (MaxDaysPerMonth.HasValue && MaxDaysPerMonth.Value <= 0)
            errors.Add("Maximum days per month must be greater than 0");

        if (MaxDaysPerYear.HasValue && MaxDaysPerYear.Value <= 0)
            errors.Add("Maximum days per year must be greater than 0");

        // Validate weekly quota doesn't exceed reasonable limits
        if (MaxDaysPerWeek.HasValue && MaxDaysPerWeek.Value > 7)
            errors.Add("Maximum days per week cannot exceed 7");

        // Validate monthly quota doesn't exceed reasonable limits
        if (MaxDaysPerMonth.HasValue && MaxDaysPerMonth.Value > 31)
            errors.Add("Maximum days per month cannot exceed 31");

        // Validate yearly quota doesn't exceed reasonable limits
        if (MaxDaysPerYear.HasValue && MaxDaysPerYear.Value > 365)
            errors.Add("Maximum days per year cannot exceed 365");

        // Validate consecutive days logic
        if (MaxConsecutiveDays.HasValue && !AllowConsecutiveDays)
            errors.Add("MaxConsecutiveDays cannot be set when AllowConsecutiveDays is false");

        if (MaxConsecutiveDays.HasValue && MaxConsecutiveDays.Value <= 0)
            errors.Add("Maximum consecutive days must be greater than 0");

        // Validate consecutive days don't exceed weekly quota
        if (MaxConsecutiveDays.HasValue && MaxDaysPerWeek.HasValue && MaxConsecutiveDays.Value > MaxDaysPerWeek.Value)
            errors.Add("Maximum consecutive days cannot exceed maximum days per week");

        // Validate advance notice
        if (MinAdvanceNoticeDays.HasValue && MinAdvanceNoticeDays.Value < 0)
            errors.Add("Minimum advance notice days cannot be negative");

        // Validate blackout periods JSON format (basic check)
        if (!string.IsNullOrEmpty(BlackoutPeriods))
        {
            try
            {
                System.Text.Json.JsonDocument.Parse(BlackoutPeriods);
            }
            catch
            {
                errors.Add("Blackout periods must be valid JSON format");
            }
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Checks if the policy allows remote work on a specific date.
    /// Validates against blackout periods if configured.
    /// </summary>
    /// <param name="date">The date to check</param>
    /// <returns>True if remote work is allowed on this date, false if in blackout period</returns>
    public bool IsDateAllowed(DateOnly date)
    {
        if (!IsActive)
            return false;

        if (string.IsNullOrEmpty(BlackoutPeriods))
            return true;

        try
        {
            using var doc = System.Text.Json.JsonDocument.Parse(BlackoutPeriods);
            var root = doc.RootElement;

            if (root.ValueKind != System.Text.Json.JsonValueKind.Array)
                return true;

            foreach (var period in root.EnumerateArray())
            {
                if (period.TryGetProperty("StartDate", out var startProp) &&
                    period.TryGetProperty("EndDate", out var endProp))
                {
                    if (DateOnly.TryParse(startProp.GetString(), out var startDate) &&
                        DateOnly.TryParse(endProp.GetString(), out var endDate))
                    {
                        if (date >= startDate && date <= endDate)
                            return false; // Date falls within blackout period
                    }
                }
            }

            return true;
        }
        catch
        {
            // If parsing fails, allow the date (fail-open approach)
            return true;
        }
    }

    /// <summary>
    /// Calculates the effective quota for a given period type.
    /// Returns null if no quota is defined for that period.
    /// </summary>
    /// <param name="periodType">Period type (week/month/year)</param>
    /// <returns>Quota value or null if not defined</returns>
    public int? GetQuotaForPeriod(QuotaPeriod periodType)
    {
        return periodType switch
        {
            QuotaPeriod.Week => MaxDaysPerWeek,
            QuotaPeriod.Month => MaxDaysPerMonth,
            QuotaPeriod.Year => MaxDaysPerYear,
            _ => null
        };
    }
}

/// <summary>
/// Enum representing quota period types for remote work policies.
/// </summary>
public enum QuotaPeriod
{
    Week = 1,
    Month = 2,
    Year = 3
}