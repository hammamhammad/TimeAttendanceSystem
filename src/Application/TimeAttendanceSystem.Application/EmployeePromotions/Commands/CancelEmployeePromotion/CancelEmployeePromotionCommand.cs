using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.CancelEmployeePromotion;

public record CancelEmployeePromotionCommand(long Id) : ICommand<Result>;
