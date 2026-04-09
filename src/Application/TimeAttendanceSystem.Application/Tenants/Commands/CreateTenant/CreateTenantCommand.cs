using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Tenants.Commands.CreateTenant;

public record TenantCreationResult(long Id, string? Warning = null);

public record CreateTenantCommand(
    string? Subdomain,
    string Name,
    string? NameAr,
    string? LogoUrl,
    bool IsActive,
    string? CompanyRegistrationNumber,
    string? TaxIdentificationNumber,
    string? Industry,
    string? Country,
    string? City,
    string? Address,
    string? Phone,
    string? Email,
    string? Website,
    string DefaultTimezone,
    string DefaultLanguage,
    string DefaultCurrency,
    long? PlanId,
    string? BillingCycle
) : ICommand<Result<TenantCreationResult>>;
