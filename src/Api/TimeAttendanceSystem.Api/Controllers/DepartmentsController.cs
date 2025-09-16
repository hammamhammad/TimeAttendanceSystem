using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Departments.Commands.CreateDepartment;
using TimeAttendanceSystem.Application.Departments.Commands.UpdateDepartment;
using TimeAttendanceSystem.Application.Departments.Commands.DeleteDepartment;
using TimeAttendanceSystem.Application.Departments.Queries.GetDepartments;
using TimeAttendanceSystem.Application.Departments.Queries.GetDepartmentById;

namespace TimeAttendanceSystem.Api.Controllers;

[ApiController]
[Route("api/v1/departments")]
[Authorize]
public class DepartmentsController : ControllerBase
{
    private readonly IMediator _mediator;

    public DepartmentsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetDepartments(
        [FromQuery] long? branchId = null,
        [FromQuery] bool includeTree = false,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] long? parentDepartmentId = null,
        [FromQuery] bool includeInactive = false)
    {
        Console.WriteLine($"DEPARTMENTS CONTROLLER: Request received - User: {User.Identity?.Name}, Authenticated: {User.Identity?.IsAuthenticated}, branchId={branchId}, includeTree={includeTree}, isActive={isActive}, search={search}, parentDepartmentId={parentDepartmentId}, includeInactive={includeInactive}");

        var query = new GetDepartmentsQuery(branchId, includeTree, isActive, search, parentDepartmentId, includeInactive);
        var result = await _mediator.Send(query);

        Console.WriteLine($"DEBUG GetDepartments result: IsFailure={result.IsFailure}, Count={result.Value?.Count ?? 0}");

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDepartmentById(long id)
    {
        var query = new GetDepartmentByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
        {
            return result.Error == "Department not found"
                ? NotFound(new { error = result.Error })
                : BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    [HttpPost]
    public async Task<IActionResult> CreateDepartment([FromBody] CreateDepartmentRequest request)
    {
        var command = new CreateDepartmentCommand(
            request.BranchId,
            request.Code,
            request.Name,
            request.NameAr,
            request.Description,
            request.DescriptionAr,
            request.ParentDepartmentId,
            request.ManagerEmployeeId,
            request.CostCenter,
            request.Location,
            request.Phone,
            request.Email,
            request.SortOrder,
            request.IsActive
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(new { id = result.Value });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDepartment(long id, [FromBody] UpdateDepartmentRequest request)
    {
        var command = new UpdateDepartmentCommand(
            id,
            request.Code,
            request.Name,
            request.NameAr,
            request.Description,
            request.DescriptionAr,
            request.ParentDepartmentId,
            request.ManagerEmployeeId,
            request.CostCenter,
            request.Location,
            request.Phone,
            request.Email,
            request.SortOrder,
            request.IsActive
        );

        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDepartment(long id)
    {
        var command = new DeleteDepartmentCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }
}

public record CreateDepartmentRequest(
    long BranchId,
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? ParentDepartmentId,
    long? ManagerEmployeeId,
    string? CostCenter,
    string? Location,
    string? Phone,
    string? Email,
    int SortOrder = 0,
    bool IsActive = true
);

public record UpdateDepartmentRequest(
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? ParentDepartmentId,
    long? ManagerEmployeeId,
    string? CostCenter,
    string? Location,
    string? Phone,
    string? Email,
    int SortOrder,
    bool IsActive
);