using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Tenants.Commands.ActivateTenant;
using TecAxle.Hrms.Application.Tenants.Commands.CreateTenant;
using TecAxle.Hrms.Application.Tenants.Commands.SuspendTenant;
using TecAxle.Hrms.Application.Tenants.Commands.UpdateTenant;
using TecAxle.Hrms.Application.Tenants.Queries.DiscoverTenant;
using TecAxle.Hrms.Application.Tenants.Queries.GetTenantById;
using TecAxle.Hrms.Application.Tenants.Queries.GetTenants;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// Controller for tenant management and discovery in multi-tenant SaaS deployment.
/// Management endpoints require SystemAdmin role. Discovery endpoints are public.
/// </summary>
[ApiController]
[Route("api/v1/tenants")]
public class TenantsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly ITenantProvisioningService _provisioningService;

    public TenantsController(IMediator mediator, ITenantProvisioningService provisioningService)
    {
        _mediator = mediator;
        _provisioningService = provisioningService;
    }

    // ── Provisioning Endpoints (SystemAdmin) ─────────────────────────

    /// <summary>
    /// Provisions a dedicated database for a tenant.
    /// Creates the database, applies migrations, and stores the encrypted connection string.
    /// </summary>
    [HttpPost("{id}/provision")]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> ProvisionTenantDatabase(long id)
    {
        var result = await _provisioningService.ProvisionTenantAsync(id);
        if (!result.Success)
            return BadRequest(new { error = result.ErrorMessage });

        return Ok(new
        {
            message = $"Database '{result.DatabaseName}' provisioned successfully.",
            databaseName = result.DatabaseName,
            tenantAdminEmail = "tecaxleadmin@{subdomain}.clockn.net"
        });
    }

    /// <summary>
    /// Applies pending EF Core migrations to a tenant's dedicated database.
    /// </summary>
    [HttpPost("{id}/migrate")]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> MigrateTenantDatabase(long id)
    {
        var success = await _provisioningService.ApplyMigrationsAsync(id);
        if (!success)
            return BadRequest(new { error = "Migration failed. Tenant may not have a dedicated database." });

        return Ok(new { message = "Migrations applied successfully." });
    }

    /// <summary>
    /// Validates that a tenant's dedicated database is accessible.
    /// </summary>
    [HttpGet("{id}/validate-db")]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> ValidateTenantDatabase(long id)
    {
        var valid = await _provisioningService.ValidateTenantDatabaseAsync(id);
        return Ok(new { tenantId = id, databaseValid = valid });
    }

    // ── Discovery Endpoints (Public) ─────────────────────────────────

    /// <summary>
    /// Discover tenant configuration by subdomain or custom domain.
    /// This is the first API call made by the mobile app.
    /// </summary>
    /// <param name="domain">Company subdomain (e.g., "acme") or full domain (e.g., "acme.timeattendance.com")</param>
    [HttpGet("discover")]
    public async Task<IActionResult> DiscoverTenant([FromQuery] string domain)
    {
        if (string.IsNullOrWhiteSpace(domain))
        {
            return BadRequest(new { error = "Domain parameter is required" });
        }

        var query = new DiscoverTenantQuery(domain);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        var tenant = result.Value;
        return Ok(new
        {
            tenantId = tenant.TenantId,
            subdomain = tenant.Subdomain,
            name = tenant.Name,
            nameAr = tenant.NameAr,
            logoUrl = tenant.LogoUrl
        });
    }

    /// <summary>
    /// Validate if a subdomain/domain exists and is active.
    /// Lightweight endpoint for quick validation.
    /// </summary>
    [HttpGet("validate")]
    public async Task<IActionResult> ValidateTenant([FromQuery] string domain)
    {
        if (string.IsNullOrWhiteSpace(domain))
        {
            return BadRequest(new { valid = false, error = "Domain parameter is required" });
        }

        var query = new DiscoverTenantQuery(domain);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return Ok(new { valid = false });
        }

        return Ok(new { valid = true, tenantName = result.Value.Name });
    }

    // ── Management Endpoints (SystemAdmin) ───────────────────────────

    /// <summary>
    /// List tenants with pagination, search, and filtering.
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> GetTenants(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? status = null,
        [FromQuery] bool? isActive = null)
    {
        var query = new GetTenantsQuery(page, pageSize, search, status, isActive);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Get tenant by ID with full details including subscription information.
    /// </summary>
    [HttpGet("{id}")]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> GetTenantById(long id)
    {
        var query = new GetTenantByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return NotFound(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Create a new tenant.
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> CreateTenant([FromBody] CreateTenantRequest request)
    {
        var command = new CreateTenantCommand(
            request.Subdomain,  // optional — auto-generated from Name if null
            request.Name,
            request.NameAr,
            request.LogoUrl,
            request.IsActive,
            request.CompanyRegistrationNumber,
            request.TaxIdentificationNumber,
            request.Industry,
            request.Country,
            request.City,
            request.Address,
            request.Phone,
            request.Email,
            request.Website,
            request.DefaultTimezone ?? "Asia/Riyadh",
            request.DefaultLanguage ?? "en",
            request.DefaultCurrency ?? "SAR",
            request.PlanId,
            request.BillingCycle
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        var response = new { id = result.Value.Id, warning = result.Value.Warning };
        return CreatedAtAction(nameof(GetTenantById), new { id = result.Value.Id }, response);
    }

    /// <summary>
    /// Update an existing tenant.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> UpdateTenant(long id, [FromBody] UpdateTenantRequest request)
    {
        var command = new UpdateTenantCommand(
            id,
            request.Name,
            request.NameAr,
            request.LogoUrl,
            request.IsActive,
            request.CompanyRegistrationNumber,
            request.TaxIdentificationNumber,
            request.Industry,
            request.Country,
            request.City,
            request.Address,
            request.Phone,
            request.Email,
            request.Website,
            request.DefaultTimezone ?? "Asia/Riyadh",
            request.DefaultLanguage ?? "en",
            request.DefaultCurrency ?? "SAR"
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Activate a tenant (sets status to Active and IsActive to true).
    /// </summary>
    [HttpPost("{id}/activate")]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> ActivateTenant(long id)
    {
        var command = new ActivateTenantCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Suspend a tenant (sets status to Suspended and IsActive to false).
    /// </summary>
    [HttpPost("{id}/suspend")]
    [Authorize(Roles = "SystemAdmin")]
    public async Task<IActionResult> SuspendTenant(long id)
    {
        var command = new SuspendTenantCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}

// ── Request Models ───────────────────────────────────────────────────

public record CreateTenantRequest(
    string Name,
    string? Subdomain = null,
    string? NameAr = null,
    string? LogoUrl = null,
    bool IsActive = true,
    string? CompanyRegistrationNumber = null,
    string? TaxIdentificationNumber = null,
    string? Industry = null,
    string? Country = "SA",
    string? City = null,
    string? Address = null,
    string? Phone = null,
    string? Email = null,
    string? Website = null,
    string? DefaultTimezone = "Asia/Riyadh",
    string? DefaultLanguage = "en",
    string? DefaultCurrency = "SAR",
    long? PlanId = null,
    string? BillingCycle = "Monthly"
);

public record UpdateTenantRequest(
    string Name,
    string? NameAr = null,
    string? LogoUrl = null,
    bool IsActive = true,
    string? CompanyRegistrationNumber = null,
    string? TaxIdentificationNumber = null,
    string? Industry = null,
    string? Country = "SA",
    string? City = null,
    string? Address = null,
    string? Phone = null,
    string? Email = null,
    string? Website = null,
    string? DefaultTimezone = "Asia/Riyadh",
    string? DefaultLanguage = "en",
    string? DefaultCurrency = "SAR"
);

