using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Tenants.Commands.UpdateTenant;

public record UpdateTenantCommand(
    long Id,
    string Subdomain,
    string Name,
    string? NameAr,
    string? LogoUrl,
    string ApiBaseUrl,
    string? CustomDomain,
    bool IsActive,
    string? DatabaseIdentifier,
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
    string DefaultCurrency
) : ICommand<Result>;
