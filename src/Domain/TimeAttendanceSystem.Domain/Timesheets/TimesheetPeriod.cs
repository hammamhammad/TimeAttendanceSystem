using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Domain.Timesheets;

public class TimesheetPeriod : BaseEntity
{
    public long BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public TimesheetPeriodType PeriodType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime SubmissionDeadline { get; set; }
    public TimesheetPeriodStatus Status { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public Branch Branch { get; set; } = null!;
    public ICollection<Timesheet> Timesheets { get; set; } = new List<Timesheet>();
}
