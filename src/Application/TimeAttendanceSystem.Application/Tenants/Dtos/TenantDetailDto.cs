using TecAxle.Hrms.Application.Subscriptions.Dtos;

namespace TecAxle.Hrms.Application.Tenants.Dtos;

/// <summary>
/// Detailed DTO for tenant detail view including subscription info.
/// </summary>
public class TenantDetailDto
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
    public string? CompanyRegistrationNumber { get; set; }
    public string? TaxIdentificationNumber { get; set; }
    public string? Industry { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public string? Website { get; set; }
    public string DefaultTimezone { get; set; } = string.Empty;
    public string DefaultLanguage { get; set; } = string.Empty;
    public string DefaultCurrency { get; set; } = string.Empty;
    public DateTime? TrialStartDate { get; set; }
    public DateTime? TrialEndDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public int BranchCount { get; set; }
    public int EmployeeCount { get; set; }
    public TenantSubscriptionDto? Subscription { get; set; }
}
