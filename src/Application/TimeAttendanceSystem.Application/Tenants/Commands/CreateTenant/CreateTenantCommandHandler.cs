using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Configuration;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Application.Tenants.Commands.CreateTenant;

public class CreateTenantCommandHandler : BaseHandler<CreateTenantCommand, Result<long>>
{
    public CreateTenantCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateTenantCommand request, CancellationToken cancellationToken)
    {
        // Validate subdomain uniqueness
        var subdomainExists = await Context.Tenants
            .AnyAsync(t => t.Subdomain.ToLower() == request.Subdomain.ToLower() && !t.IsDeleted, cancellationToken);

        if (subdomainExists)
        {
            return Result.Failure<long>("A tenant with this subdomain already exists");
        }

        // Validate custom domain uniqueness if provided
        if (!string.IsNullOrWhiteSpace(request.CustomDomain))
        {
            var domainExists = await Context.Tenants
                .AnyAsync(t => t.CustomDomain != null && t.CustomDomain.ToLower() == request.CustomDomain.ToLower() && !t.IsDeleted, cancellationToken);

            if (domainExists)
            {
                return Result.Failure<long>("A tenant with this custom domain already exists");
            }
        }

        // Parse status
        var tenantStatus = TenantStatus.PendingSetup;
        if (!string.IsNullOrWhiteSpace(request.Status) && Enum.TryParse<TenantStatus>(request.Status, true, out var parsedStatus))
        {
            tenantStatus = parsedStatus;
        }

        var tenant = new Tenant
        {
            Subdomain = request.Subdomain.ToLower().Trim(),
            Name = request.Name,
            NameAr = request.NameAr,
            LogoUrl = request.LogoUrl,
            ApiBaseUrl = request.ApiBaseUrl,
            CustomDomain = request.CustomDomain,
            IsActive = request.IsActive,
            DatabaseIdentifier = request.DatabaseIdentifier,
            CompanyRegistrationNumber = request.CompanyRegistrationNumber,
            TaxIdentificationNumber = request.TaxIdentificationNumber,
            Industry = request.Industry,
            Country = request.Country ?? "SA",
            City = request.City,
            Address = request.Address,
            Phone = request.Phone,
            Email = request.Email,
            Website = request.Website,
            DefaultTimezone = request.DefaultTimezone,
            DefaultLanguage = request.DefaultLanguage,
            DefaultCurrency = request.DefaultCurrency,
            Status = tenantStatus,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        // If status is Trial, set trial dates
        if (tenantStatus == TenantStatus.Trial)
        {
            tenant.TrialStartDate = DateTime.UtcNow;
            tenant.TrialEndDate = DateTime.UtcNow.AddDays(14);
        }

        Context.Tenants.Add(tenant);
        await Context.SaveChangesAsync(cancellationToken);

        // Auto-create default TenantSettings
        var settings = new TenantSettings
        {
            TenantId = tenant.Id,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };
        Context.TenantSettings.Add(settings);

        // Initialize setup tracking steps
        var setupSteps = new List<SetupStep>
        {
            new() { TenantId = tenant.Id, StepKey = "company_info", Category = "Organization", IsRequired = true, SortOrder = 1, CreatedBy = "SYSTEM" },
            new() { TenantId = tenant.Id, StepKey = "branches", Category = "Organization", IsRequired = true, SortOrder = 2, CreatedBy = "SYSTEM" },
            new() { TenantId = tenant.Id, StepKey = "departments", Category = "Organization", IsRequired = true, SortOrder = 3, CreatedBy = "SYSTEM" },
            new() { TenantId = tenant.Id, StepKey = "shifts", Category = "TimeAttendance", IsRequired = true, SortOrder = 4, CreatedBy = "SYSTEM" },
            new() { TenantId = tenant.Id, StepKey = "vacation_types", Category = "Leave", IsRequired = true, SortOrder = 5, CreatedBy = "SYSTEM" },
            new() { TenantId = tenant.Id, StepKey = "excuse_policies", Category = "Leave", IsRequired = false, SortOrder = 6, CreatedBy = "SYSTEM" },
            new() { TenantId = tenant.Id, StepKey = "workflows", Category = "TimeAttendance", IsRequired = true, SortOrder = 7, CreatedBy = "SYSTEM" },
            new() { TenantId = tenant.Id, StepKey = "employees", Category = "Organization", IsRequired = true, SortOrder = 8, CreatedBy = "SYSTEM" },
            new() { TenantId = tenant.Id, StepKey = "payroll", Category = "Payroll", IsRequired = false, SortOrder = 9, CreatedBy = "SYSTEM" },
        };
        Context.SetupSteps.AddRange(setupSteps);

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(tenant.Id);
    }
}
