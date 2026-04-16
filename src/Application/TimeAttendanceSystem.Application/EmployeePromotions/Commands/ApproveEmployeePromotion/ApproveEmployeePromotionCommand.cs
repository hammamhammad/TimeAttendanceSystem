using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.ApproveEmployeePromotion;

public record ApproveEmployeePromotionCommand(
    long Id,
    string? Comments
) : ICommand<Result>;
