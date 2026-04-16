using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.ApproveSalaryAdjustment;

public record ApproveSalaryAdjustmentCommand(long Id) : ICommand<Result>;
