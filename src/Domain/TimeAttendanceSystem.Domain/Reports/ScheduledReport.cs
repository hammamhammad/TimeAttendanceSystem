using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Reports;

public class ScheduledReport : BaseEntity
{
    public long CustomReportDefinitionId { get; set; }
    public string CronExpression { get; set; } = string.Empty;
    public string EmailRecipients { get; set; } = string.Empty;
    public ReportFormat Format { get; set; } = ReportFormat.Excel;
    public bool IsActive { get; set; } = true;
    public DateTime? LastRunAt { get; set; }
    public DateTime? NextRunAt { get; set; }
    public string? LastRunStatus { get; set; }

    // Navigation properties
    public CustomReportDefinition CustomReportDefinition { get; set; } = null!;
}
