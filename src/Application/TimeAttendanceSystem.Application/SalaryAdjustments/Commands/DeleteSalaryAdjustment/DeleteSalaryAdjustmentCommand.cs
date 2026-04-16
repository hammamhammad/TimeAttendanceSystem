using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.DeleteSalaryAdjustment;

public record DeleteSalaryAdjustmentCommand(long Id) : ICommand<Result>;
