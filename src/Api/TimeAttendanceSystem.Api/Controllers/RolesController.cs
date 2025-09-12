using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Roles.Queries.GetRoles;
using TimeAttendanceSystem.Application.Roles.Commands.AssignPermissionToRole;
using TimeAttendanceSystem.Application.Roles.Commands.RemovePermissionFromRole;
using TimeAttendanceSystem.Application.Roles.Commands.CreateRole;
using TimeAttendanceSystem.Application.Roles.Commands.UpdateRole;
using TimeAttendanceSystem.Application.Roles.Commands.DeleteRole;
using TimeAttendanceSystem.Application.Roles.Queries.GetRoleById;

namespace TimeAttendanceSystem.Api.Controllers;

[ApiController]
[Route("api/v1/roles")]
[Authorize]
public class RolesController : ControllerBase
{
    private readonly IMediator _mediator;

    public RolesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetRoles([FromQuery] bool includePermissions = false)
    {
        var query = new GetRolesQuery(includePermissions);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpPost]
    [Authorize(Policy = "SystemAdmin")] // Only system admins can create roles
    public async Task<IActionResult> CreateRole([FromBody] CreateRoleRequest request)
    {
        var command = new CreateRoleCommand
        {
            Name = request.Name,
            PermissionIds = request.PermissionIds ?? Array.Empty<long>()
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { id = result.Value });
    }

    [HttpPost("{roleId}/permissions")]
    [Authorize(Policy = "SystemAdmin")] // Only system admins can manage role permissions
    public async Task<IActionResult> AssignPermission(long roleId, [FromBody] AssignPermissionRequest request)
    {
        var command = new AssignPermissionToRoleCommand
        {
            RoleId = roleId,
            PermissionId = request.PermissionId
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoleById(long id)
    {
        var query = new GetRoleByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "SystemAdmin")] // Only system admins can update roles
    public async Task<IActionResult> UpdateRole(long id, [FromBody] UpdateRoleRequest request)
    {
        var command = new UpdateRoleCommand
        {
            Id = id,
            Name = request.Name,
            PermissionIds = request.PermissionIds ?? Array.Empty<long>()
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpDelete("{roleId}/permissions/{permissionId}")]
    [Authorize(Policy = "SystemAdmin")] // Only system admins can manage role permissions
    public async Task<IActionResult> RemovePermission(long roleId, long permissionId)
    {
        var command = new RemovePermissionFromRoleCommand
        {
            RoleId = roleId,
            PermissionId = permissionId
        };

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "SystemAdmin")] // Only system admins can delete roles
    public async Task<IActionResult> DeleteRole(long id)
    {
        var command = new DeleteRoleCommand { Id = id };
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}

public record AssignPermissionRequest(
    long PermissionId
);

public record CreateRoleRequest(
    string Name,
    long[] PermissionIds
);

public record UpdateRoleRequest(
    string Name,
    long[] PermissionIds
);