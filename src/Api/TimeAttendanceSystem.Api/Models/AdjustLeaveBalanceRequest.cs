namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for manually adjusting employee leave balance.
/// </summary>
public class AdjustLeaveBalanceRequest
{
    /// <summary>
    /// ID of the employee whose balance will be adjusted (required).
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// ID of the vacation type to adjust (required).
    /// </summary>
    public long VacationTypeId { get; set; }

    /// <summary>
    /// Calendar year for the balance adjustment (required).
    /// </summary>
    public int Year { get; set; }

    /// <summary>
    /// Number of days to adjust (positive = add, negative = subtract) (required).
    /// Cannot be zero.
    /// </summary>
    public decimal AdjustmentDays { get; set; }

    /// <summary>
    /// Reason for the adjustment (required for audit trail).
    /// Must be at least 10 characters.
    /// </summary>
    public string Reason { get; set; } = string.Empty;
}
