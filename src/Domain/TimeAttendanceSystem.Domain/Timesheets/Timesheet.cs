using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Timesheets;

public class Timesheet : BaseEntity
{
    public long TimesheetPeriodId { get; set; }
    public long EmployeeId { get; set; }
    public TimesheetStatus Status { get; set; }
    public decimal TotalHours { get; set; }
    public decimal RegularHours { get; set; }
    public decimal OvertimeHours { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public long? SubmittedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? RejectedAt { get; set; }
    public string? RejectionReason { get; set; }
    public string? Notes { get; set; }
    public long? WorkflowInstanceId { get; set; }

    // Navigation
    public TimesheetPeriod TimesheetPeriod { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public ICollection<TimesheetEntry> Entries { get; set; } = new List<TimesheetEntry>();
    public WorkflowInstance? WorkflowInstance { get; set; }
}
