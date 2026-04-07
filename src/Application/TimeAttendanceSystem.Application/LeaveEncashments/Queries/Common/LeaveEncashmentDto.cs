using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.Common;

public class LeaveEncashmentDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public string? DepartmentName { get; set; }
    public long VacationTypeId { get; set; }
    public string VacationTypeName { get; set; } = string.Empty;
    public string? VacationTypeNameAr { get; set; }
    public int Year { get; set; }
    public decimal DaysEncashed { get; set; }
    public decimal AmountPerDay { get; set; }
    public decimal TotalAmount { get; set; }
    public LeaveEncashmentStatus Status { get; set; }
    public string StatusName { get; set; } = string.Empty;
    public long? PayrollRecordId { get; set; }
    public long? ApprovedByUserId { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
