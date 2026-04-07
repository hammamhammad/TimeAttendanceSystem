namespace TecAxle.Hrms.Application.Subscriptions.Dtos;

/// <summary>
/// DTO representing a tenant's active subscription with plan details.
/// </summary>
public class TenantSubscriptionDto
{
    public long Id { get; set; }
    public long PlanId { get; set; }
    public string PlanCode { get; set; } = string.Empty;
    public string PlanName { get; set; } = string.Empty;
    public string PlanTier { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string BillingCycle { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime CurrentPeriodStart { get; set; }
    public DateTime CurrentPeriodEnd { get; set; }
    public DateTime? CancelledAt { get; set; }
    public DateTime? CancellationEffectiveDate { get; set; }
    public string? ExternalSubscriptionId { get; set; }
    public string? Notes { get; set; }
    public List<string> EnabledModules { get; set; } = new();
    public Dictionary<string, int> Limits { get; set; } = new();
    public List<TenantAddOnDto> AddOns { get; set; } = new();
}

public class TenantAddOnDto
{
    public long Id { get; set; }
    public string Module { get; set; } = string.Empty;
    public decimal MonthlyPrice { get; set; }
    public DateTime ActivatedAt { get; set; }
    public DateTime? DeactivatedAt { get; set; }
    public bool IsActive { get; set; }
}
