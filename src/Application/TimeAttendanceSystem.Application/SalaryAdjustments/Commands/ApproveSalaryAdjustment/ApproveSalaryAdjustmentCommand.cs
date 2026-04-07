using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.ApproveSalaryAdjustment;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record ApproveSalaryAdjustmentCommand(long Id) : ICommand<Result>;
