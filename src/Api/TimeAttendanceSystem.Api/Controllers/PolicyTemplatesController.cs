using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Application.PolicyTemplates.Commands.ApplyPolicyTemplate;
using TecAxle.Hrms.Application.PolicyTemplates.Commands.CreatePolicyTemplate;
using TecAxle.Hrms.Application.PolicyTemplates.Commands.DeletePolicyTemplate;
using TecAxle.Hrms.Application.PolicyTemplates.Commands.UpdatePolicyTemplate;
using TecAxle.Hrms.Application.PolicyTemplates.Queries.GetPolicyTemplateById;
using TecAxle.Hrms.Application.PolicyTemplates.Queries.GetPolicyTemplates;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/policy-templates")]
[Authorize]
public class PolicyTemplatesController : ControllerBase
{
    private readonly IMediator _mediator;

    public PolicyTemplatesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>List available policy templates, optionally filtered by region and/or industry.</summary>
    [HttpGet]
    public async Task<IActionResult> GetPolicyTemplates([FromQuery] string? region, [FromQuery] string? industry)
    {
        var result = await _mediator.Send(new GetPolicyTemplatesQuery(region, industry));
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(result.Value);
    }

    /// <summary>Get a policy template by ID with its items.</summary>
    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetPolicyTemplateById(long id)
    {
        var result = await _mediator.Send(new GetPolicyTemplateByIdQuery(id));
        return result.IsFailure ? NotFound(new { error = result.Error }) : Ok(result.Value);
    }

    /// <summary>Create a new custom policy template for the current tenant.</summary>
    [HttpPost]
    public async Task<IActionResult> CreatePolicyTemplate([FromBody] CreatePolicyTemplateCommand command)
    {
        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok(new { id = result.Value });
    }

    /// <summary>Update an existing policy template.</summary>
    [HttpPut("{id:long}")]
    public async Task<IActionResult> UpdatePolicyTemplate(long id, [FromBody] UpdatePolicyTemplateCommand command)
    {
        if (id != command.Id)
            return BadRequest(new { error = "Route ID and body ID do not match" });

        var result = await _mediator.Send(command);
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok();
    }

    /// <summary>Delete a custom policy template (system templates cannot be deleted).</summary>
    [HttpDelete("{id:long}")]
    public async Task<IActionResult> DeletePolicyTemplate(long id)
    {
        var result = await _mediator.Send(new DeletePolicyTemplateCommand(id));
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok();
    }

    /// <summary>Apply a policy template to the current tenant (or a specific branch).</summary>
    [HttpPost("{id:long}/apply")]
    public async Task<IActionResult> ApplyPolicyTemplate(long id, [FromQuery] long? branchId)
    {
        var result = await _mediator.Send(new ApplyPolicyTemplateCommand(id, branchId));
        return result.IsFailure ? BadRequest(new { error = result.Error }) : Ok();
    }
}
