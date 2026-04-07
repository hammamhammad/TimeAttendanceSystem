using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.RejectSalaryAdjustment;

[RequiresModule(SystemModule.EmployeeLifecycle)]
public record RejectSalaryAdjustmentCommand(long Id, string RejectionReason) : ICommand<Result>;
