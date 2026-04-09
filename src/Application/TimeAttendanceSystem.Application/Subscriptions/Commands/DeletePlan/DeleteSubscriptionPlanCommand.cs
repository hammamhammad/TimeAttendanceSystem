using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.DeletePlan;

public record DeleteSubscriptionPlanCommand(long Id) : ICommand<Result>;
