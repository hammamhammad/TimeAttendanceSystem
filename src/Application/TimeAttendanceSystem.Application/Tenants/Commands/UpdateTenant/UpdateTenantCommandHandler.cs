using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Tenants.Commands.UpdateTenant;

public class UpdateTenantCommandHandler : BaseHandler<UpdateTenantCommand, Result>
{
    private readonly IMasterDbContext _masterContext;

    public UpdateTenantCommandHandler(IApplicationDbContext context, ICurrentUser currentUser, IMasterDbContext masterContext)
        : base(context, currentUser)
    {
        _masterContext = masterContext;
    }

    public override async Task<Result> Handle(UpdateTenantCommand request, CancellationToken cancellationToken)
    {
        var tenant = await _masterContext.Tenants
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (tenant == null)
            return Result.Failure("Tenant not found");

        // Subdomain is immutable after creation — don't update it
        tenant.Name = request.Name;
        tenant.NameAr = request.NameAr;
        tenant.LogoUrl = request.LogoUrl;
        tenant.IsActive = request.IsActive;
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

        await _masterContext.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
