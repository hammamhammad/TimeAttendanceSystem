using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

/// <summary>
/// Immutable append-only audit record for every payroll run (initial process, recalc, finalization, cancellation).
/// Captures the configuration snapshot used so a finalized payroll can be explained months later.
/// </summary>
public class PayrollRunAudit : BaseEntity
{
    public long PayrollPeriodId { get; set; }
    public PayrollRunType RunType { get; set; }
    public long? TriggeredByUserId { get; set; }
    public string? TriggeredByUsername { get; set; }

    public DateTime StartedAtUtc { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public PayrollRunStatus Status { get; set; } = PayrollRunStatus.Running;

    /// <summary>
    /// JSON snapshot of resolved configurations for this run:
    /// Tax/SocialInsurance/Overtime/CalendarPolicy IDs + effective dates.
    /// </summary>
    public string? ConfigSnapshotJson { get; set; }

    public int EmployeesProcessed { get; set; }
    public int EmployeesFailed { get; set; }
    public int EmployeesSkipped { get; set; }
    public int WarningCount { get; set; }

    public string? WarningsJson { get; set; }
    public string? ErrorsJson { get; set; }

    public PayrollPeriod PayrollPeriod { get; set; } = null!;
    public ICollection<PayrollRunAuditItem> Items { get; set; } = new List<PayrollRunAuditItem>();
}

/// <summary>
/// Per-employee line inside a payroll run audit.
/// </summary>
public class PayrollRunAuditItem : BaseEntity
{
    public long PayrollRunAuditId { get; set; }
    public long EmployeeId { get; set; }
    public long? PayrollRecordId { get; set; }
    public PayrollRunItemStatus Status { get; set; }
    public decimal? GrossEarnings { get; set; }
    public decimal? NetSalary { get; set; }
    public decimal? TaxAmount { get; set; }
    public decimal? SocialInsuranceEmployee { get; set; }
    public decimal? OvertimePay { get; set; }
    public decimal? AbsenceDeduction { get; set; }
    public string? WarningsJson { get; set; }
    public string? ErrorMessage { get; set; }

    public PayrollRunAudit PayrollRunAudit { get; set; } = null!;
}
