namespace TimeAttendanceSystem.Application.LeaveManagement.Queries.GetEmployeeLeaveBalance;

/// <summary>
/// Data Transfer Object representing employee leave balance information.
/// Provides comprehensive balance details for a specific vacation type and year.
/// </summary>
public class LeaveBalanceDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public long VacationTypeId { get; set; }
    public string VacationTypeName { get; set; } = string.Empty;
    public string VacationTypeNameAr { get; set; } = string.Empty;
    public int Year { get; set; }
    public decimal EntitledDays { get; set; }
    public decimal AccruedDays { get; set; }
    public decimal UsedDays { get; set; }
    public decimal PendingDays { get; set; }
    public decimal AdjustedDays { get; set; }
    public decimal CurrentBalance { get; set; }
    public DateTime? LastAccrualDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
}
