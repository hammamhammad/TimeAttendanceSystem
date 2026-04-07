using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CustomReports.Commands.DeleteCustomReport;

/// <summary>
/// Command to soft-delete a custom report definition.
/// </summary>
[RequiresModule(SystemModule.CustomReports)]
public record DeleteCustomReportCommand(long Id) : ICommand<Result>;
