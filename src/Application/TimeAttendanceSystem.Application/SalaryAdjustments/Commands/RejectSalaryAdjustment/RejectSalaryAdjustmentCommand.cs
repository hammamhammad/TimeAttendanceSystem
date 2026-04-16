using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.RejectSalaryAdjustment;

public record RejectSalaryAdjustmentCommand(long Id, string RejectionReason) : ICommand<Result>;
