using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Employees;

public class EmployeeContract : BaseEntity
{
    public long EmployeeId { get; set; }
    public string ContractNumber { get; set; } = string.Empty;
    public ContractType ContractType { get; set; }
    public ContractStatus Status { get; set; } = ContractStatus.Draft;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? RenewalDate { get; set; }
    public bool AutoRenew { get; set; }
    public decimal BasicSalary { get; set; }
    public string? Currency { get; set; } = "SAR";
    public int? ProbationPeriodDays { get; set; }
    public DateTime? ProbationEndDate { get; set; }
    public ProbationStatus ProbationStatus { get; set; } = ProbationStatus.NotApplicable;
    public int? NoticePeriodDays { get; set; }
    public string? Terms { get; set; }
    public string? TermsAr { get; set; }
    public string? DocumentUrl { get; set; }
    public string? Notes { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? PreviousContractId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public EmployeeContract? PreviousContract { get; set; }
}
