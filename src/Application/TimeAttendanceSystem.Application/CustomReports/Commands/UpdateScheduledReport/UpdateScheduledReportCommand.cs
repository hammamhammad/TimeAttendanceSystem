using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Application.CustomReports.Commands.UpdateScheduledReport;

/// <summary>
/// Command to update an existing scheduled report.
/// </summary>
public record UpdateScheduledReportCommand(
    long Id,
    string CronExpression,
    string EmailRecipients,
    ReportFormat Format,
    bool IsActive
) : ICommand<Result>;
