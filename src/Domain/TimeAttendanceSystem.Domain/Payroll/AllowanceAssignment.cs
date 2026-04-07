using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Payroll;

public class AllowanceAssignment : BaseEntity
{
    public long EmployeeId { get; set; }
    public long AllowanceTypeId { get; set; }
    public decimal Amount { get; set; }
    public CalculationType CalculationType { get; set; } = CalculationType.Fixed;
    public decimal? Percentage { get; set; }
    public string Currency { get; set; } = "SAR";
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }
    public AllowanceAssignmentStatus Status { get; set; } = AllowanceAssignmentStatus.Active;
    public long? AssignedByUserId { get; set; }
    public DateTime? AssignedAt { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public long? AllowanceRequestId { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public AllowanceType AllowanceType { get; set; } = null!;
    public AllowanceRequest? AllowanceRequest { get; set; }
}
