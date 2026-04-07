using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.ChangePlan;

public record ChangePlanCommand(
    long TenantId,
    long NewPlanId,
    string? Notes
) : ICommand<Result>;
