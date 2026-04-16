using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.LeaveEncashments.Commands.RejectLeaveEncashment;

public record RejectLeaveEncashmentCommand(long Id, string? Notes) : ICommand<Result>;
