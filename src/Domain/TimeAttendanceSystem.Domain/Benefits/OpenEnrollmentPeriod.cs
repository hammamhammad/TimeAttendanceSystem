using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Domain.Benefits;

public class OpenEnrollmentPeriod : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public long? BranchId { get; set; }
    public int PlanYear { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public EnrollmentPeriodStatus Status { get; set; }
    public bool AllowLifeEventChanges { get; set; } = true;
    public string? Notes { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public Branch? Branch { get; set; }
}
