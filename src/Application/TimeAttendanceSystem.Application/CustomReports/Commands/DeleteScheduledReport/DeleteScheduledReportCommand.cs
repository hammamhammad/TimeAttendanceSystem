using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CustomReports.Commands.DeleteScheduledReport;

/// <summary>
/// Command to soft-delete a scheduled report.
/// </summary>
public record DeleteScheduledReportCommand(long Id) : ICommand<Result>;
