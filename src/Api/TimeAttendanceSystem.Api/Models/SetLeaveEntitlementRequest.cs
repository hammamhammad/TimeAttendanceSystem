namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for setting or updating employee leave entitlement.
/// </summary>
public class SetLeaveEntitlementRequest
{
    /// <summary>
    /// ID of the employee receiving the entitlement (required).
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// ID of the vacation type being entitled (required).
    /// </summary>
    public long VacationTypeId { get; set; }

    /// <summary>
    /// Calendar year for this entitlement (required).
    /// </summary>
    public int Year { get; set; }

    /// <summary>
    /// Total annual leave days entitled (required, must be > 0).
    /// </summary>
    public decimal AnnualDays { get; set; }

    /// <summary>
    /// Days carried over from previous year (default: 0).
    /// </summary>
    public decimal CarryOverDays { get; set; } = 0;

    /// <summary>
    /// Maximum days allowed to carry over (optional).
    /// </summary>
    public decimal? MaxCarryOverDays { get; set; }

    /// <summary>
    /// Whether unused leave expires at year end (default: true).
    /// </summary>
    public bool ExpiresAtYearEnd { get; set; } = true;

    /// <summary>
    /// Date when entitlement becomes effective (optional, for mid-year hires).
    /// </summary>
    public DateTime? EffectiveStartDate { get; set; }

    /// <summary>
    /// Date when entitlement ends (optional, for terminations).
    /// </summary>
    public DateTime? EffectiveEndDate { get; set; }

    /// <summary>
    /// Administrative notes about the entitlement (optional).
    /// </summary>
    public string? Notes { get; set; }
}
