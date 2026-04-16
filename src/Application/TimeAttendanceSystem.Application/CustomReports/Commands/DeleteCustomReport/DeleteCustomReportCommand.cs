using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CustomReports.Commands.DeleteCustomReport;

/// <summary>
/// Command to soft-delete a custom report definition.
/// </summary>
public record DeleteCustomReportCommand(long Id) : ICommand<Result>;
