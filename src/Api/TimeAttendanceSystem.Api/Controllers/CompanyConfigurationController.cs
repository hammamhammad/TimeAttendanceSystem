using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.CompanyConfiguration.Commands.ResetBranchSettings;
using TecAxle.Hrms.Application.CompanyConfiguration.Commands.UpdateBranchSettingsOverride;
using TecAxle.Hrms.Application.CompanyConfiguration.Commands.UpdateCompanySettings;
using TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetBranchSettingsOverride;
using TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetResolvedSettings;
using TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetCompanySettings;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/company-configuration")]
[Authorize]
public class CompanyConfigurationController : ControllerBase
{
    private readonly IMediator _mediator;

    public CompanyConfigurationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var result = await _mediator.Send(new GetCompanySettingsQuery());
        return result.IsSuccess ? Ok(result.Value) : BadRequest(new { error = result.Error });
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSettings([FromBody] UpdateCompanySettingsCommand command)
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
