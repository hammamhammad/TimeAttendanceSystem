using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.DeleteSalaryAdjustment;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record DeleteSalaryAdjustmentCommand(long Id) : ICommand<Result>;
