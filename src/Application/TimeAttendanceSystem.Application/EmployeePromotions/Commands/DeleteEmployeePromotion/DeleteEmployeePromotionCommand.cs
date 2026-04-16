using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.DeleteEmployeePromotion;

public record DeleteEmployeePromotionCommand(long Id) : ICommand<Result>;
