using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.VacationTypes;

namespace TecAxle.Hrms.Domain.LeaveManagement;

public class LeaveEncashment : BaseEntity
{
    public long EmployeeId { get; set; }
    public long VacationTypeId { get; set; }
    public int Year { get; set; }
    public decimal DaysEncashed { get; set; }
    public decimal AmountPerDay { get; set; }
    public decimal TotalAmount { get; set; }
    public LeaveEncashmentStatus Status { get; set; } = LeaveEncashmentStatus.Pending;
    public long? PayrollRecordId { get; set; }
    public long? ApprovedByUserId { get; set; }
    public string? Notes { get; set; }

    // Navigation properties
    public Employee Employee { get; set; } = null!;
    public VacationType VacationType { get; set; } = null!;
    public PayrollRecord? PayrollRecord { get; set; }
}
