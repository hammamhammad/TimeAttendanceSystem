using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Reports;

public class CustomReportDefinition : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public ReportDataSource DataSource { get; set; }
    public string ColumnsJson { get; set; } = "[]";
    public string? FiltersJson { get; set; }
    public string? SortingJson { get; set; }
    public long? BranchId { get; set; }
    public long CreatedByUserId { get; set; }
    public bool IsPublic { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public ICollection<ScheduledReport> ScheduledReports { get; set; } = new List<ScheduledReport>();
}
