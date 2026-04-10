using System.Text.RegularExpressions;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Subscriptions.Commands.AssignPlan;
using TecAxle.Hrms.Domain.Tenants;
using MediatR;

namespace TecAxle.Hrms.Application.Tenants.Commands.CreateTenant;

public class CreateTenantCommandHandler : BaseHandler<CreateTenantCommand, Result<TenantCreationResult>>
{
    private readonly IMasterDbContext _masterContext;
    private readonly ITenantProvisioningService _provisioningService;
    private readonly IMediator _mediator;
    private readonly IValidator<CreateTenantCommand> _validator;
    private readonly ILogger<CreateTenantCommandHandler> _logger;

    public CreateTenantCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IMasterDbContext masterContext,
        ITenantProvisioningService provisioningService,
        IMediator mediator,
        IValidator<CreateTenantCommand> validator,
        ILogger<CreateTenantCommandHandler> logger)
        : base(context, currentUser)
    {
        _masterContext = masterContext;
        _provisioningService = provisioningService;
        _mediator = mediator;
        _validator = validator;
        _logger = logger;
    }

    public override async Task<Result<TenantCreationResult>> Handle(CreateTenantCommand request, CancellationToken cancellationToken)
    {
        // Validate input
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            var errorMessages = string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage));
            return Result.Failure<TenantCreationResult>($"Validation failed: {errorMessages}");
        }

        // Resolve subdomain: use provided value or auto-generate from tenant name
        string subdomain;
        if (!string.IsNullOrWhiteSpace(request.Subdomain))
        {
            subdomain = request.Subdomain.ToLower().Trim();

            // Validate uniqueness for explicitly provided subdomain
            var subdomainExists = await _masterContext.Tenants
                .AnyAsync(t => t.Subdomain.ToLower() == subdomain && !t.IsDeleted, cancellationToken);
            if (subdomainExists)
                return Result.Failure<TenantCreationResult>("A tenant with this subdomain already exists");
        }
        else
        {
            subdomain = await GenerateUniqueSubdomainAsync(request.Name, cancellationToken);
        }

        // Validate email domain uniqueness to prevent conflicts in TenantUserEmails
        if (!string.IsNullOrWhiteSpace(request.Email) && request.Email.Contains('@'))
        {
            var emailDomain = request.Email.Split('@')[1].ToLower();
            var adminEmail = $"tecaxleadmin@{emailDomain}";

            // Check if this admin email already exists in TenantUserEmails (direct conflict)
            var emailMappingExists = await _masterContext.TenantUserEmails
                .AnyAsync(tue => tue.Email.ToLower() == adminEmail, cancellationToken);
            if (emailMappingExists)
                return Result.Failure<TenantCreationResult>($"A tenant with the email domain '{emailDomain}' already exists. Each tenant must use a unique email domain.");
        }

        // 1. Create tenant record in master DB
        var tenant = new Tenant
        {
            Subdomain = subdomain,
            Name = request.Name,
            NameAr = request.NameAr,
            LogoUrl = request.LogoUrl,
            ApiBaseUrl = string.Empty,
            IsActive = request.IsActive,
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
            Status = TenantStatus.PendingSetup,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        _masterContext.Tenants.Add(tenant);
        await _masterContext.SaveChangesAsync(cancellationToken);

        // 2. Auto-provision dedicated database (creates DB, applies migrations, seeds admin user)
        var provisionResult = await _provisioningService.ProvisionTenantAsync(tenant.Id, cancellationToken);
        if (!provisionResult.Success)
            return Result.Failure<TenantCreationResult>($"Tenant created but provisioning failed: {provisionResult.ErrorMessage}");

        // 3. Update status to Active — tenant is provisioned and usable
        tenant.Status = TenantStatus.Active;
        await _masterContext.SaveChangesAsync(cancellationToken);

        // 4. Auto-assign subscription plan if specified (non-fatal — tenant is already provisioned)
        string? planWarning = null;
        if (request.PlanId.HasValue)
        {
            var billingCycle = request.BillingCycle ?? "Monthly";
            try
            {
                var assignResult = await _mediator.Send(
                    new AssignPlanCommand(tenant.Id, request.PlanId.Value, billingCycle, "Auto-assigned during tenant creation"),
                    cancellationToken);

                if (assignResult.IsFailure)
                {
                    planWarning = $"Plan assignment failed: {assignResult.Error}";
                    _logger.LogWarning("Tenant {TenantId} provisioned but plan assignment failed: {Error}", tenant.Id, assignResult.Error);
                }
            }
            catch (Exception ex)
            {
                planWarning = $"Plan assignment failed: {ex.Message}";
                _logger.LogWarning(ex, "Tenant {TenantId} provisioned but plan assignment threw exception", tenant.Id);
            }
        }

        return Result.Success(new TenantCreationResult(tenant.Id, planWarning));
    }

    private async Task<string> GenerateUniqueSubdomainAsync(string tenantName, CancellationToken cancellationToken)
    {
        var slug = GenerateSlug(tenantName);

        // Check if base slug is available
        var exists = await _masterContext.Tenants
            .AnyAsync(t => t.Subdomain == slug && !t.IsDeleted, cancellationToken);
        if (!exists)
            return slug;

        // Append numeric suffix to resolve collision
        for (int i = 2; i <= 100; i++)
        {
            var candidate = $"{slug}-{i}";
            exists = await _masterContext.Tenants
                .AnyAsync(t => t.Subdomain == candidate && !t.IsDeleted, cancellationToken);
            if (!exists)
                return candidate;
        }

        // Fallback: use slug with timestamp
        return $"{slug}-{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}";
    }

    private static string GenerateSlug(string name)
    {
        // Lowercase and replace spaces/underscores with hyphens
        var slug = name.ToLowerInvariant()
            .Replace(' ', '-')
            .Replace('_', '-');

        // Remove all characters that are not lowercase letters, digits, or hyphens
        slug = Regex.Replace(slug, @"[^a-z0-9-]", "");

        // Collapse consecutive hyphens
        slug = Regex.Replace(slug, @"-{2,}", "-");

        // Trim leading/trailing hyphens
        slug = slug.Trim('-');

        // Handle empty result (e.g., purely non-ASCII name like Arabic)
        if (string.IsNullOrEmpty(slug) || slug.Length < 3)
            slug = "tenant";

        // Truncate to 50 characters
        if (slug.Length > 50)
            slug = slug[..50].TrimEnd('-');

        return slug;
    }
}
