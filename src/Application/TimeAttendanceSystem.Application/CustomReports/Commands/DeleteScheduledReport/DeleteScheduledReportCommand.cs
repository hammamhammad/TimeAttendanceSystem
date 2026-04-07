using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CustomReports.Commands.DeleteScheduledReport;

/// <summary>
/// Command to soft-delete a scheduled report.
/// </summary>
[RequiresModule(SystemModule.CustomReports)]
public record DeleteScheduledReportCommand(long Id) : ICommand<Result>;
