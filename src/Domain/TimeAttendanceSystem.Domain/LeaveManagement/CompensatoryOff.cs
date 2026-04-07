using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Vacations;

namespace TecAxle.Hrms.Domain.LeaveManagement;

public class CompensatoryOff : BaseEntity
{
    public long EmployeeId { get; set; }
    public DateTime EarnedDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string? ReasonAr { get; set; }
    public CompensatoryOffStatus Status { get; set; } = CompensatoryOffStatus.Available;
    public long? UsedVacationId { get; set; }
    public decimal? HoursWorked { get; set; }
    public long? ApprovedByUserId { get; set; }
    public string? Notes { get; set; }

    // Navigation properties
    public Employee Employee { get; set; } = null!;
    public EmployeeVacation? UsedVacation { get; set; }
}
