using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.VacationTypes;

namespace TimeAttendanceSystem.Domain.LeaveManagement;

/// <summary>
/// Represents annual leave entitlement for an employee for a specific vacation type.
/// Defines how many days an employee is entitled to per year.
/// </summary>
public class LeaveEntitlement
{
    /// <summary>
    /// Unique identifier for the leave entitlement.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Employee ID this entitlement belongs to.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Navigation property to Employee.
    /// </summary>
    public Employee Employee { get; set; } = null!;

    /// <summary>
    /// Vacation type ID this entitlement is for.
    /// </summary>
    public long VacationTypeId { get; set; }

    /// <summary>
    /// Navigation property to VacationType.
    /// </summary>
    public VacationType VacationType { get; set; } = null!;

    /// <summary>
    /// Year this entitlement applies to (e.g., 2025).
    /// </summary>
    public int Year { get; set; }

    /// <summary>
    /// Total annual days entitled (calendar days per year).
    /// </summary>
    public decimal AnnualDays { get; set; }

    /// <summary>
    /// Days carried over from previous year (if policy allows).
    /// </summary>
    public decimal CarryOverDays { get; set; } = 0;

    /// <summary>
    /// Maximum days that can be carried over to next year.
    /// Null means no carry-over allowed.
    /// </summary>
    public decimal? MaxCarryOverDays { get; set; }

    /// <summary>
    /// Whether unused balance expires at year end (use-it-or-lose-it).
    /// </summary>
    public bool ExpiresAtYearEnd { get; set; } = true;

    /// <summary>
    /// Effective start date for this entitlement (for mid-year hires).
    /// </summary>
    public DateTime? EffectiveStartDate { get; set; }

    /// <summary>
    /// Effective end date for this entitlement (for terminations).
    /// </summary>
    public DateTime? EffectiveEndDate { get; set; }

    /// <summary>
    /// Notes about this entitlement.
    /// </summary>
    public string? Notes { get; set; }

    /// <summary>
    /// Timestamp when the entitlement was created.
    /// </summary>
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// User ID who created this entitlement.
    /// </summary>
    public string? CreatedBy { get; set; }

    /// <summary>
    /// Timestamp when the entitlement was last modified.
    /// </summary>
    public DateTime? ModifiedAtUtc { get; set; }

    /// <summary>
    /// User ID who last modified this entitlement.
    /// </summary>
    public string? ModifiedBy { get; set; }

    /// <summary>
    /// Calculates the prorated annual days for mid-year hires.
    /// </summary>
    /// <returns>Prorated days based on effective start date</returns>
    public decimal CalculateProratedDays()
    {
        if (EffectiveStartDate == null)
            return AnnualDays;

        var startDate = EffectiveStartDate.Value;
        var yearStart = new DateTime(Year, 1, 1);
        var yearEnd = new DateTime(Year, 12, 31);

        // If start date is not in the entitlement year, no proration needed
        if (startDate.Year != Year)
            return AnnualDays;

        var daysInYear = (yearEnd - yearStart).Days + 1;
        var remainingDays = (yearEnd - startDate).Days + 1;

        return Math.Round(AnnualDays * remainingDays / daysInYear, 2);
    }

    /// <summary>
    /// Validates the leave entitlement.
    /// </summary>
    /// <returns>Validation result with errors if any</returns>
    public (bool IsValid, List<string> Errors) Validate()
    {
        var errors = new List<string>();

        if (EmployeeId <= 0)
            errors.Add("Employee ID is required");

        if (VacationTypeId <= 0)
            errors.Add("Vacation Type ID is required");

        if (Year < 2000 || Year > 2100)
            errors.Add("Year must be between 2000 and 2100");

        if (AnnualDays < 0)
            errors.Add("Annual days cannot be negative");

        if (AnnualDays > 365)
            errors.Add("Annual days cannot exceed 365");

        if (CarryOverDays < 0)
            errors.Add("Carry-over days cannot be negative");

        if (MaxCarryOverDays.HasValue && MaxCarryOverDays.Value < 0)
            errors.Add("Max carry-over days cannot be negative");

        if (EffectiveStartDate.HasValue && EffectiveEndDate.HasValue &&
            EffectiveStartDate.Value > EffectiveEndDate.Value)
            errors.Add("Effective start date cannot be after end date");

        return (errors.Count == 0, errors);
    }
}
