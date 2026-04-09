using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Subscriptions.Commands.UpdatePlan;

public record UpdateSubscriptionPlanCommand(
    long Id,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    string Tier,
    decimal MonthlyPriceUsd,
    decimal AnnualPriceUsd,
    string Currency,
    List<string> Modules,
    Dictionary<string, int> Limits,
    bool IsPublic,
    bool IsActive,
    int SortOrder
) : ICommand<Result>;
