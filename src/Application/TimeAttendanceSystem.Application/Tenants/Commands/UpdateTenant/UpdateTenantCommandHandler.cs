using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Tenants.Commands.UpdateTenant;

public class UpdateTenantCommandHandler : BaseHandler<UpdateTenantCommand, Result>
{
    public UpdateTenantCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateTenantCommand request, CancellationToken cancellationToken)
    {
        var tenant = await Context.Tenants
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (tenant == null)
        {
            return Result.Failure("Tenant not found");
        }

        // Validate subdomain uniqueness (excluding current tenant)
        var subdomainExists = await Context.Tenants
            .AnyAsync(t => t.Id != request.Id && t.Subdomain.ToLower() == request.Subdomain.ToLower() && !t.IsDeleted, cancellationToken);

        if (subdomainExists)
        {
            return Result.Failure("A tenant with this subdomain already exists");
        }

        // Validate custom domain uniqueness if provided
        if (!string.IsNullOrWhiteSpace(request.CustomDomain))
        {
            var domainExists = await Context.Tenants
                .AnyAsync(t => t.Id != request.Id && t.CustomDomain != null && t.CustomDomain.ToLower() == request.CustomDomain.ToLower() && !t.IsDeleted, cancellationToken);

            if (domainExists)
            {
                return Result.Failure("A tenant with this custom domain already exists");
            }
        }

        tenant.Subdomain = request.Subdomain.ToLower().Trim();
        tenant.Name = request.Name;
        tenant.NameAr = request.NameAr;
        tenant.LogoUrl = request.LogoUrl;
        tenant.ApiBaseUrl = request.ApiBaseUrl;
        tenant.CustomDomain = request.CustomDomain;
        tenant.IsActive = request.IsActive;
        tenant.DatabaseIdentifier = request.DatabaseIdentifier;
        tenant.CompanyRegistrationNumber = request.CompanyRegistrationNumber;
        tenant.TaxIdentificationNumber = request.TaxIdentificationNumber;
        tenant.Industry = request.Industry;
        tenant.Country = request.Country;
        tenant.City = request.City;
        tenant.Address = request.Address;
        tenant.Phone = request.Phone;
        tenant.Email = request.Email;
        tenant.Website = request.Website;
        tenant.DefaultTimezone = request.DefaultTimezone;
        tenant.DefaultLanguage = request.DefaultLanguage;
        tenant.DefaultCurrency = request.DefaultCurrency;
        tenant.ModifiedAtUtc = DateTime.UtcNow;
        tenant.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
