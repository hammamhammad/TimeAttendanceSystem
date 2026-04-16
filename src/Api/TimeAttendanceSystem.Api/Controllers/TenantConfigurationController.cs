using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.TenantConfiguration.Commands.ResetBranchSettings;
using TecAxle.Hrms.Application.TenantConfiguration.Commands.UpdateBranchSettingsOverride;
using TecAxle.Hrms.Application.TenantConfiguration.Commands.UpdateTenantSettings;
using TecAxle.Hrms.Application.TenantConfiguration.Queries.GetBranchSettingsOverride;
using TecAxle.Hrms.Application.TenantConfiguration.Queries.GetResolvedSettings;
using TecAxle.Hrms.Application.TenantConfiguration.Queries.GetTenantSettings;

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

    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var result = await _mediator.Send(new GetTenantSettingsQuery());
        return result.IsSuccess ? Ok(result.Value) : BadRequest(new { error = result.Error });
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSettings([FromBody] UpdateTenantSettingsCommand command)
    {
        var result = await _mediator.Send(command);
        return result.IsSuccess ? Ok() : BadRequest(new { error = result.Error });
    }

    [HttpGet("resolved")]
    public async Task<IActionResult> GetResolved([FromQuery] long? branchId = null, [FromQuery] long? deptId = null)
    {
        var result = await _mediator.Send(new GetResolvedSettingsQuery(branchId, deptId));
        return result.IsSuccess ? Ok(result.Value) : BadRequest(new { error = result.Error });
    }

    [HttpGet("branches/{id:long}")]
    public async Task<IActionResult> GetBranchOverrides(long id)
    {
        var result = await _mediator.Send(new GetBranchSettingsOverrideQuery(id));
        return result.IsSuccess ? Ok(result.Value) : BadRequest(new { error = result.Error });
    }

    [HttpPut("branches/{id:long}")]
    public async Task<IActionResult> UpdateBranchOverrides(long id, [FromBody] UpdateBranchSettingsOverrideCommand command)
    {
        if (command.BranchId != id) return BadRequest(new { error = "Branch ID mismatch." });
        var result = await _mediator.Send(command);
        return result.IsSuccess ? Ok() : BadRequest(new { error = result.Error });
    }

    [HttpDelete("branches/{id:long}")]
    public async Task<IActionResult> ResetBranchOverrides(long id)
    {
        var result = await _mediator.Send(new ResetBranchSettingsCommand(id));
        return result.IsSuccess ? Ok() : BadRequest(new { error = result.Error });
    }
}
