using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.CancelSalaryAdjustment;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record CancelSalaryAdjustmentCommand(long Id) : ICommand<Result>;
