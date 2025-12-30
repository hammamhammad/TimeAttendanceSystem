using TimeAttendanceSystem.Domain.VacationTypes;

namespace TimeAttendanceSystem.Domain.LeaveManagement;

/// <summary>
/// Defines accrual rules for a vacation type.
/// Controls how leave balances accumulate over time.
/// </summary>
public class LeaveAccrualPolicy
{
    /// <summary>
    /// Unique identifier for the accrual policy.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Vacation type ID this policy applies to.
    /// </summary>
    public long VacationTypeId { get; set; }

    /// <summary>
    /// Navigation property to VacationType.
    /// </summary>
    public VacationType VacationType { get; set; } = null!;

    /// <summary>
    /// Policy name for identification.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Description of the policy.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Accrual frequency (Monthly, Quarterly, Annually, etc.).
    /// Currently only Monthly is supported.
    /// </summary>
    public string AccrualFrequency { get; set; } = "Monthly";

    /// <summary>
    /// Whether to accrue on a monthly basis.
    /// True = accrue monthly (annual ÷ 12).
    /// False = grant full entitlement upfront on Jan 1.
    /// </summary>
    public bool IsMonthlyAccrual { get; set; } = true;

    /// <summary>
    /// Whether to prorate accrual for mid-year hires.
    /// </summary>
    public bool ProrateMidYearHires { get; set; } = true;

    /// <summary>
    /// Minimum months of service before accrual starts.
    /// 0 = immediate accrual.
    /// </summary>
    public int MinimumServiceMonths { get; set; } = 0;

    /// <summary>
    /// Maximum accrual cap (days).
    /// Null = no cap.
    /// </summary>
    public decimal? MaxAccrualCap { get; set; }

    /// <summary>
    /// Whether unused balance carries over to next year.
    /// </summary>
    public bool AllowsCarryOver { get; set; } = false;

    /// <summary>
    /// Maximum days that can be carried over.
    /// Null = carry over all unused balance.
    /// </summary>
    public decimal? MaxCarryOverDays { get; set; }

    /// <summary>
    /// Whether unused balance expires at year end (use-it-or-lose-it).
    /// </summary>
    public bool ExpiresAtYearEnd { get; set; } = true;

    /// <summary>
    /// Number of months after year end before carry-over expires.
    /// Example: 3 means carry-over must be used by March 31.
    /// </summary>
    public int? CarryOverExpiryMonths { get; set; }

    /// <summary>
    /// Whether this policy is currently active.
    /// </summary>
    public bool IsActive { get; set; } = true;

    /// <summary>
    /// Effective start date for this policy.
    /// </summary>
    public DateTime? EffectiveStartDate { get; set; }

    /// <summary>
    /// Effective end date for this policy.
    /// </summary>
    public DateTime? EffectiveEndDate { get; set; }

    /// <summary>
    /// Timestamp when the policy was created.
    /// </summary>
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// User ID who created this policy.
    /// </summary>
    public string? CreatedBy { get; set; }

    /// <summary>
    /// Timestamp when the policy was last modified.
    /// </summary>
    public DateTime? ModifiedAtUtc { get; set; }

    /// <summary>
    /// User ID who last modified this policy.
    /// </summary>
    public string? ModifiedBy { get; set; }

    /// <summary>
    /// Calculates monthly accrual amount based on annual entitlement.
    /// </summary>
    /// <param name="annualDays">Annual entitlement in days</param>
    /// <returns>Monthly accrual amount</returns>
    public decimal CalculateMonthlyAccrual(decimal annualDays)
    {
        if (!IsMonthlyAccrual)
            return annualDays; // Grant all upfront

        return Math.Round(annualDays / 12, 2);
    }

    /// <summary>
    /// Calculates prorated monthly accrual for mid-year hires.
    /// </summary>
    /// <param name="annualDays">Annual entitlement in days</param>
    /// <param name="hireDate">Employee hire date</param>
    /// <param name="year">Year to calculate for</param>
    /// <returns>Prorated monthly accrual amount</returns>
    public decimal CalculateProratedMonthlyAccrual(decimal annualDays, DateTime hireDate, int year)
    {
        if (!ProrateMidYearHires)
            return CalculateMonthlyAccrual(annualDays);

        // If hired before the year, no proration needed
        if (hireDate.Year < year)
            return CalculateMonthlyAccrual(annualDays);

        // If hired after the year, no accrual
        if (hireDate.Year > year)
            return 0;

        // Calculate remaining months in year
        var yearStart = new DateTime(year, 1, 1);
        var yearEnd = new DateTime(year, 12, 31);
        var remainingMonths = 12 - hireDate.Month + 1;

        var proratedAnnual = annualDays * remainingMonths / 12;
        return Math.Round(proratedAnnual / remainingMonths, 2);
    }

    /// <summary>
    /// Determines allowed carry-over days based on policy.
    /// </summary>
    /// <param name="unusedDays">Unused balance at year end</param>
    /// <returns>Days allowed to carry over</returns>
    public decimal CalculateAllowedCarryOver(decimal unusedDays)
    {
        if (!AllowsCarryOver || ExpiresAtYearEnd)
            return 0;

        if (MaxCarryOverDays.HasValue)
            return Math.Min(unusedDays, MaxCarryOverDays.Value);

        return unusedDays;
    }

    /// <summary>
    /// Validates the accrual policy.
    /// </summary>
    /// <returns>Validation result with errors if any</returns>
    public (bool IsValid, List<string> Errors) Validate()
    {
        var errors = new List<string>();

        if (VacationTypeId <= 0)
            errors.Add("Vacation Type ID is required");

        if (string.IsNullOrWhiteSpace(Name))
            errors.Add("Policy name is required");

        if (MinimumServiceMonths < 0)
            errors.Add("Minimum service months cannot be negative");

        if (MinimumServiceMonths > 120)
            errors.Add("Minimum service months cannot exceed 120 (10 years)");

        if (MaxAccrualCap.HasValue && MaxAccrualCap.Value < 0)
            errors.Add("Max accrual cap cannot be negative");

        if (MaxCarryOverDays.HasValue && MaxCarryOverDays.Value < 0)
            errors.Add("Max carry-over days cannot be negative");

        if (AllowsCarryOver && ExpiresAtYearEnd)
            errors.Add("Cannot allow carry-over if balance expires at year end");

        if (CarryOverExpiryMonths.HasValue && (CarryOverExpiryMonths.Value < 1 || CarryOverExpiryMonths.Value > 12))
            errors.Add("Carry-over expiry months must be between 1 and 12");

        if (EffectiveStartDate.HasValue && EffectiveEndDate.HasValue &&
            EffectiveStartDate.Value > EffectiveEndDate.Value)
            errors.Add("Effective start date cannot be after end date");

        return (errors.Count == 0, errors);
    }
}
