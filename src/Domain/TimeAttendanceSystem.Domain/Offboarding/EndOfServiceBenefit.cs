using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Offboarding;

public class EndOfServiceBenefit : BaseEntity
{
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public int ServiceYears { get; set; }
    public int ServiceMonths { get; set; }
    public int ServiceDays { get; set; }
    public decimal BasicSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal CalculationBasis { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal DeductionAmount { get; set; }
    public decimal NetAmount { get; set; }
    public string? CalculationDetails { get; set; }
    public string? Notes { get; set; }

    /// <summary>FK to the EOS policy that produced this calculation. Null for records calculated before v13.3.</summary>
    public long? EndOfServicePolicyId { get; set; }

    /// <summary>JSON snapshot of the applied policy + tiers for forensic audit — survives later policy edits.</summary>
    public string? AppliedPolicySnapshotJson { get; set; }

    // Navigation
    public TerminationRecord TerminationRecord { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public EndOfServicePolicy? EndOfServicePolicy { get; set; }
}
