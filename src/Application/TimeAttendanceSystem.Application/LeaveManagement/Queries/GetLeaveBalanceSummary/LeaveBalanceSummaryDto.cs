namespace TimeAttendanceSystem.Application.LeaveManagement.Queries.GetLeaveBalanceSummary;

/// <summary>
/// Data Transfer Object representing a comprehensive leave balance summary for an employee.
/// Includes all vacation type balances for a specific year.
/// </summary>
public class LeaveBalanceSummaryDto
{
    public long EmployeeId { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public int Year { get; set; }
    public List<VacationTypeBalanceDto> VacationTypeBalances { get; set; } = new();
    public decimal TotalEntitled { get; set; }
    public decimal TotalAccrued { get; set; }
    public decimal TotalUsed { get; set; }
    public decimal TotalPending { get; set; }
    public decimal TotalAvailable { get; set; }
}

/// <summary>
/// Data Transfer Object representing balance details for a specific vacation type.
/// </summary>
public class VacationTypeBalanceDto
{
    public long VacationTypeId { get; set; }
    public string VacationTypeName { get; set; } = string.Empty;
    public string VacationTypeNameAr { get; set; } = string.Empty;
    public decimal EntitledDays { get; set; }
    public decimal AccruedDays { get; set; }
    public decimal UsedDays { get; set; }
    public decimal PendingDays { get; set; }
    public decimal AdjustedDays { get; set; }
    public decimal CurrentBalance { get; set; }
    public DateTime? LastAccrualDate { get; set; }
}
