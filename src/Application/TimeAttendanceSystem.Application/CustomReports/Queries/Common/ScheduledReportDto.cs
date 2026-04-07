using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Application.CustomReports.Queries.Common;

/// <summary>
/// DTO representing a scheduled report with associated report name and format.
/// </summary>
public record ScheduledReportDto(
    long Id,
    long CustomReportDefinitionId,
    string ReportName,
    string CronExpression,
    string EmailRecipients,
    ReportFormat Format,
    string FormatName,
    bool IsActive,
    DateTime? LastRunAt,
    DateTime? NextRunAt,
    string? LastRunStatus,
    DateTime CreatedAtUtc,
    DateTime? ModifiedAtUtc
);
