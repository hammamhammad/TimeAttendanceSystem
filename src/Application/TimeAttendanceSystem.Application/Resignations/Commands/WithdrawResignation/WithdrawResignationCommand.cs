using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Resignations.Commands.WithdrawResignation;

public record WithdrawResignationCommand(long Id) : ICommand<Result>;
