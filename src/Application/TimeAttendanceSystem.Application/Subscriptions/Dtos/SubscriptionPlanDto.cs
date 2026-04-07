namespace TecAxle.Hrms.Application.Subscriptions.Dtos;

/// <summary>
/// DTO representing a subscription plan with module entitlements and limits.
/// </summary>
public class SubscriptionPlanDto
{
    public long Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string Tier { get; set; } = string.Empty;
    public decimal MonthlyPriceUsd { get; set; }
    public decimal AnnualPriceUsd { get; set; }
    public string Currency { get; set; } = string.Empty;
    public bool IsPublic { get; set; }
    public bool IsActive { get; set; }
    public int SortOrder { get; set; }
    public List<string> Modules { get; set; } = new();
    public Dictionary<string, int> Limits { get; set; } = new();
}
