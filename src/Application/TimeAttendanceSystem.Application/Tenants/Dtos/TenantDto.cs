namespace TecAxle.Hrms.Application.Tenants.Dtos;

/// <summary>
/// Summary DTO for tenant list views.
/// </summary>
public class TenantDto
{
    public long Id { get; set; }
    public string Subdomain { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? LogoUrl { get; set; }
    public string? ApiBaseUrl { get; set; }
    public string? CustomDomain { get; set; }
    public bool IsActive { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Industry { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string DefaultTimezone { get; set; } = string.Empty;
    public string DefaultLanguage { get; set; } = string.Empty;
    public string DefaultCurrency { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; }
    public int BranchCount { get; set; }
    public int EmployeeCount { get; set; }
    public string? SubscriptionPlanName { get; set; }
    public string? SubscriptionStatus { get; set; }
}
