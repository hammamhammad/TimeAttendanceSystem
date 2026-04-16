using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.CancelSalaryAdjustment;

public record CancelSalaryAdjustmentCommand(long Id) : ICommand<Result>;
