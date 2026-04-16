using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.SubmitSalaryAdjustment;

public record SubmitSalaryAdjustmentCommand(long Id) : ICommand<Result>;
