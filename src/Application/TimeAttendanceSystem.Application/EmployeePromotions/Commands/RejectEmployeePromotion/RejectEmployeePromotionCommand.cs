using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.RejectEmployeePromotion;

public record RejectEmployeePromotionCommand(
    long Id,
    string RejectionReason
) : ICommand<Result>;
