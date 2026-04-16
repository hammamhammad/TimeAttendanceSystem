using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;

namespace TecAxle.Hrms.Application.CustomReports.Commands.CreateScheduledReport;

/// <summary>
/// Command to create a new scheduled report for a custom report definition.
/// </summary>
public record CreateScheduledReportCommand(
    long CustomReportDefinitionId,
    string CronExpression,
    string EmailRecipients,
    ReportFormat Format,
    bool IsActive
) : ICommand<Result<long>>;
