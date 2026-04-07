using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.RejectLeaveEncashment;

[RequiresModule(SystemModule.LeaveManagement)]
public record RejectLeaveEncashmentCommand(long Id, string? Notes) : ICommand<Result>;
