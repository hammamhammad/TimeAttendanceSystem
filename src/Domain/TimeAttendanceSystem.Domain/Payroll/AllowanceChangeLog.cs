using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Payroll;

public class AllowanceChangeLog : BaseEntity
{
    public long EmployeeId { get; set; }
    public long AllowanceTypeId { get; set; }
    public AllowanceChangeType ChangeType { get; set; }
    public decimal? PreviousAmount { get; set; }
    public decimal? NewAmount { get; set; }
    public decimal? PreviousPercentage { get; set; }
    public decimal? NewPercentage { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string? Reason { get; set; }
    public long? AllowanceRequestId { get; set; }
    public long? RelatedEntityId { get; set; }
    public string? RelatedEntityType { get; set; }
    public long? ChangedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public AllowanceType AllowanceType { get; set; } = null!;
    public AllowanceRequest? AllowanceRequest { get; set; }
}
