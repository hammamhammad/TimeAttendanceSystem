using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.SubmitSalaryAdjustment;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record SubmitSalaryAdjustmentCommand(long Id) : ICommand<Result>;
