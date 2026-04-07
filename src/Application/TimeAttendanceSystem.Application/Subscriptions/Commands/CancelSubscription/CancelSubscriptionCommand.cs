using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.CancelSubscription;

public record CancelSubscriptionCommand(long TenantId) : ICommand<Result>;
