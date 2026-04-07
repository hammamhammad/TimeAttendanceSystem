using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// API controller for tenant entitlement and subscription information.
/// Provides endpoints for the frontend to check enabled modules, feature flags,
/// and usage limits based on the current tenant's subscription plan.
/// </summary>
[ApiController]
[Route("api/v1/entitlements")]
[Authorize]
public class EntitlementsController : ControllerBase
{
    private readonly IEntitlementService _entitlementService;
    private readonly ICurrentUser _currentUser;

    public EntitlementsController(IEntitlementService entitlementService, ICurrentUser currentUser)
    {
        _entitlementService = entitlementService;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Gets the full entitlement summary for the current tenant's subscription.
    /// Includes plan details, enabled modules, feature flags, and usage limits.
    /// </summary>
    /// <returns>Complete tenant entitlement summary</returns>
    /// <response code="200">Entitlement summary retrieved successfully</response>
    /// <response code="400">Tenant context not available for the current user</response>
    /// <response code="401">User not authenticated</response>
    [HttpGet]
    [ProducesResponseType(typeof(TenantEntitlementSummary), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetEntitlementSummary(CancellationToken cancellationToken)
    {
        var tenantId = _currentUser.TenantId;

        // System admins without tenant context get all-modules-enabled
        if (tenantId is null)
        {
            if (_currentUser.IsSystemAdmin)
            {
                var allModules = Enum.GetValues<SystemModule>().ToList();
                return Ok(new TenantEntitlementSummary(
                    TenantId: 0,
                    PlanCode: "system",
                    PlanName: "System Administrator",
                    PlanNameAr: "مدير النظام",
                    PlanTier: "Enterprise",
                    EnabledModules: allModules,
                    FeatureFlags: new Dictionary<string, bool>(),
                    Limits: new Dictionary<LimitType, LimitInfo>()
                ));
            }
            return BadRequest(new { error = "Tenant context is not available for the current user." });
        }

        var summary = await _entitlementService.GetEntitlementSummaryAsync(tenantId.Value, cancellationToken);
        return Ok(summary);
    }

    /// <summary>
    /// Gets the list of enabled module names for the current tenant's subscription.
    /// Useful for the frontend to conditionally show/hide navigation items and features.
    /// </summary>
    /// <returns>List of enabled module name strings</returns>
    /// <response code="200">Enabled modules retrieved successfully</response>
    /// <response code="400">Tenant context not available for the current user</response>
    /// <response code="401">User not authenticated</response>
    [HttpGet("modules")]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetEnabledModules(CancellationToken cancellationToken)
    {
        var tenantId = _currentUser.TenantId;
        if (tenantId is null)
        {
            if (_currentUser.IsSystemAdmin)
                return Ok(Enum.GetValues<SystemModule>().Select(m => m.ToString()).ToList());
            return BadRequest(new { error = "Tenant context is not available for the current user." });
        }

        var modules = await _entitlementService.GetEnabledModulesAsync(tenantId.Value, cancellationToken);
        var moduleNames = modules.Select(m => m.ToString()).ToList();
        return Ok(moduleNames);
    }

    /// <summary>
    /// Gets the current usage versus plan limits for the current tenant.
    /// Returns a dictionary of limit types with their configured limit and current usage count.
    /// </summary>
    /// <returns>Dictionary of limit types with limit and current usage information</returns>
    /// <response code="200">Usage limits retrieved successfully</response>
    /// <response code="400">Tenant context not available for the current user</response>
    /// <response code="401">User not authenticated</response>
    [HttpGet("usage")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetUsageLimits(CancellationToken cancellationToken)
    {
        var tenantId = _currentUser.TenantId;
        if (tenantId is null)
        {
            if (_currentUser.IsSystemAdmin)
                return Ok(new Dictionary<LimitType, LimitInfo>());
            return BadRequest(new { error = "Tenant context is not available for the current user." });
        }

        var summary = await _entitlementService.GetEntitlementSummaryAsync(tenantId.Value, cancellationToken);
        return Ok(summary.Limits);
    }
}
