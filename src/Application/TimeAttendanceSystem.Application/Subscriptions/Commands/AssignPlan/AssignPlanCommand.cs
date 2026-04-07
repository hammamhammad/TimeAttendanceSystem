using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.AssignPlan;

public record AssignPlanCommand(
    long TenantId,
    long PlanId,
    string BillingCycle,
    string? Notes
) : ICommand<Result<long>>;
