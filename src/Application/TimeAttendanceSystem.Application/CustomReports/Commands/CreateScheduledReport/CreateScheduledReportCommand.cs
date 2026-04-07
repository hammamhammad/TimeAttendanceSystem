using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CustomReports.Commands.CreateScheduledReport;

/// <summary>
/// Command to create a new scheduled report for a custom report definition.
/// </summary>
[RequiresModule(SystemModule.CustomReports)]
public record CreateScheduledReportCommand(
    long CustomReportDefinitionId,
    string CronExpression,
    string EmailRecipients,
    ReportFormat Format,
    bool IsActive
) : ICommand<Result<long>>;
