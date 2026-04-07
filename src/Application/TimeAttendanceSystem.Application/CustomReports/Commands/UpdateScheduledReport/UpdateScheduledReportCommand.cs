using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Reports;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CustomReports.Commands.UpdateScheduledReport;

/// <summary>
/// Command to update an existing scheduled report.
/// </summary>
[RequiresModule(SystemModule.CustomReports)]
public record UpdateScheduledReportCommand(
    long Id,
    string CronExpression,
    string EmailRecipients,
    ReportFormat Format,
    bool IsActive
) : ICommand<Result>;
