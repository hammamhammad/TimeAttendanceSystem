using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.ApproveLeaveEncashment;

[RequiresModule(SystemModule.LeaveManagement)]
public record ApproveLeaveEncashmentCommand(long Id) : ICommand<Result>;
