using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.TenantConfiguration.Commands.UpdateTenantSettings;
using TecAxle.Hrms.Application.TenantConfiguration.Commands.UpdateBranchSettingsOverride;
using TecAxle.Hrms.Application.TenantConfiguration.Commands.ResetBranchSettings;
using TecAxle.Hrms.Application.TenantConfiguration.Queries.GetTenantSettings;
using TecAxle.Hrms.Application.TenantConfiguration.Queries.GetResolvedSettings;
using TecAxle.Hrms.Application.TenantConfiguration.Queries.GetBranchSettingsOverride;
using TecAxle.Hrms.Application.SetupTracking.Queries.GetSetupStatus;
using TecAxle.Hrms.Application.SetupTracking.Commands.RecalculateSetupCompletion;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/tenant-configuration")]
[Authorize]
public class TenantConfigurationController : ControllerBase
{
    private readonly IMediator _mediator;

    public TenantConfigurationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>Get tenant settings for the current tenant.</summary>
    [HttpGet]
    public async Task<IActionResult> GetTenantSettings()
    {
        var result = await _mediator.Send(new GetTenantSettingsQuery());
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }

    /// <summary>Create or update tenant settings.</summary>
    [HttpPut]
    public async Task<IActionResult> UpdateTenantSettings([FromBody] UpdateTenantSettingsCommand command)
    {
        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok();
    }

    /// <summary>Get fully resolved settings for a branch/department (inheritance applied).</summary>
    [HttpGet("resolved")]
    public async Task<IActionResult> GetResolvedSettings([FromQuery] long? branchId, [FromQuery] long? departmentId)
    {
        var result = await _mediator.Send(new GetResolvedSettingsQuery(branchId, departmentId));
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }

    /// <summary>Get branch-level setting overrides.</summary>
    [HttpGet("branches/{branchId:long}")]
    public async Task<IActionResult> GetBranchSettingsOverride(long branchId)
    {
        var result = await _mediator.Send(new GetBranchSettingsOverrideQuery(branchId));
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }

    /// <summary>Create or update branch-level setting overrides.</summary>
    [HttpPut("branches/{branchId:long}")]
    public async Task<IActionResult> UpdateBranchSettingsOverride(long branchId, [FromBody] UpdateBranchSettingsOverrideCommand command)
    {
        if (command.BranchId != branchId)
            return BadRequest(new { error = "Branch ID mismatch" });

        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok();
    }

    /// <summary>Reset all branch overrides (branch inherits all settings from tenant).</summary>
    [HttpDelete("branches/{branchId:long}")]
    public async Task<IActionResult> ResetBranchSettings(long branchId)
    {
        var result = await _mediator.Send(new ResetBranchSettingsCommand(branchId));
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok();
    }

    // ── Setup Status ─────────────────────────────────────────

    /// <summary>Get setup completion status for the current tenant.</summary>
    [HttpGet("setup-status")]
    public async Task<IActionResult> GetSetupStatus()
    {
        var result = await _mediator.Send(new GetSetupStatusQuery());
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }

    /// <summary>Recalculate setup completion by auto-detecting configured items.</summary>
    [HttpPost("setup-status/recalculate")]
    public async Task<IActionResult> RecalculateSetupCompletion()
    {
        var result = await _mediator.Send(new RecalculateSetupCompletionCommand());
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }
}
