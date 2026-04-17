using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Benefits;

public class BenefitEnrollment : BaseEntity
{
    public long EmployeeId { get; set; }
    public long BenefitPlanId { get; set; }
    public long? BenefitPlanOptionId { get; set; }
    public long? OpenEnrollmentPeriodId { get; set; }
    public BenefitEnrollmentStatus Status { get; set; }
    public DateTime EnrollmentDate { get; set; }
    public DateTime EffectiveDate { get; set; }
    public DateTime? TerminationDate { get; set; }
    public string? TerminationReason { get; set; }
    public decimal EmployeeMonthlyContribution { get; set; }
    public decimal EmployerMonthlyContribution { get; set; }
    public string Currency { get; set; } = "SAR";
    public LifeEventType? LifeEventType { get; set; }
    public DateTime? LifeEventDate { get; set; }
    public string? Notes { get; set; }
    public long? WorkflowInstanceId { get; set; }

    // Phase 1 (v14.1): Execution tracking.
    // After approval the BenefitEnrollmentExecutor marks the enrollment Active and flags it
    // as "ready for payroll deduction" so the payroll engine includes the EmployeeMonthlyContribution.
    public bool IsExecuted { get; set; }
    public DateTime? ExecutedAtUtc { get; set; }
    public long? ExecutedByUserId { get; set; }
    public string? ExecutionError { get; set; }
    public bool PayrollDeductionEnabled { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public BenefitPlan BenefitPlan { get; set; } = null!;
    public BenefitPlanOption? PlanOption { get; set; }
    public OpenEnrollmentPeriod? OpenEnrollmentPeriod { get; set; }
    public ICollection<BenefitDependent> Dependents { get; set; } = new List<BenefitDependent>();
    public WorkflowInstance? WorkflowInstance { get; set; }
}
