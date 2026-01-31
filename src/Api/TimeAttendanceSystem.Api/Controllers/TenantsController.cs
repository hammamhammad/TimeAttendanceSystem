using MediatR;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Tenants.Queries.DiscoverTenant;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for tenant discovery in multi-tenant SaaS deployment.
/// Used by mobile app to discover tenant configuration by company URL.
/// </summary>
[ApiController]
[Route("api/v1/tenants")]
public class TenantsController : ControllerBase
{
    private readonly IMediator _mediator;

    public TenantsController(IMediator mediator)
    {
        _mediator = mediator;
    }

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
            logoUrl = tenant.LogoUrl,
            apiBaseUrl = tenant.ApiBaseUrl
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
}
