using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.EndOfServicePolicies.Commands.CreateEndOfServicePolicy;
using TecAxle.Hrms.Application.EndOfServicePolicies.Commands.DeleteEndOfServicePolicy;
using TecAxle.Hrms.Application.EndOfServicePolicies.Commands.UpdateEndOfServicePolicy;
using TecAxle.Hrms.Application.EndOfServicePolicies.Queries.GetEndOfServicePolicies;
using TecAxle.Hrms.Application.EndOfServicePolicies.Queries.GetEndOfServicePolicyById;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Api.Controllers;

/// <summary>
/// CRUD for tenant-scoped End-of-Service (EOS) policies. Replaces the previously hardcoded
/// Saudi-law formula in <c>CalculateEndOfServiceCommandHandler</c>. See
/// <c>HARDCODED_BUSINESS_RULES_FIX.md</c> for the data model rationale.
/// </summary>
[ApiController]
[Route("api/v1/end-of-service-policies")]
[Authorize]
[RequiresModuleEndpoint(SystemModule.Offboarding)]
public class EndOfServicePoliciesController : ControllerBase
{
    private readonly IMediator _mediator;

    public EndOfServicePoliciesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetAll([FromQuery] bool? activeOnly = null, [FromQuery] string? countryCode = null)
    {
        var result = await _mediator.Send(new GetEndOfServicePoliciesQuery(activeOnly, countryCode));
        return result.IsSuccess ? Ok(result.Value) : BadRequest(new { message = result.Error });
    }

    [HttpGet("{id:long}")]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetEndOfServicePolicyByIdQuery(id));
        return result.IsSuccess ? Ok(result.Value) : NotFound(new { message = result.Error });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEndOfServicePolicyCommand command)
    {
        var result = await _mediator.Send(command);
        return result.IsSuccess
            ? CreatedAtAction(nameof(GetById), new { id = result.Value }, new { id = result.Value })
            : BadRequest(new { message = result.Error });
    }

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateEndOfServicePolicyCommand command)
    {
        if (command.Id != id)
            return BadRequest(new { message = "Route id and body id do not match." });
        var result = await _mediator.Send(command);
        return result.IsSuccess ? NoContent() : BadRequest(new { message = result.Error });
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        var result = await _mediator.Send(new DeleteEndOfServicePolicyCommand(id));
        return result.IsSuccess ? NoContent() : BadRequest(new { message = result.Error });
    }
}
