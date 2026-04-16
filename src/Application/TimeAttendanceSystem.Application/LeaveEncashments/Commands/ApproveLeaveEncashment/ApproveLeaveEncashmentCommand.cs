using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.ApproveLeaveEncashment;

public record ApproveLeaveEncashmentCommand(long Id) : ICommand<Result>;
