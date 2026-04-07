using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.SalaryStructures.Commands.CreateSalaryStructure;
using TecAxle.Hrms.Application.SalaryStructures.Queries.Common;
using TecAxle.Hrms.Application.SalaryStructures.Queries.GetSalaryStructureById;
using TecAxle.Hrms.Application.SalaryStructures.Queries.GetSalaryStructures;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/salary-structures")]
[Authorize]
public class SalaryStructuresController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public SalaryStructuresController(IMediator mediator, IApplicationDbContext context, ICurrentUser currentUser)
    {
        _mediator = mediator;
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Gets all salary structures with optional filtering.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId,
        [FromQuery] bool? isActive,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _mediator.Send(new GetSalaryStructuresQuery(branchId, isActive, search, page, pageSize));
        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Gets a salary structure by ID with components.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var result = await _mediator.Send(new GetSalaryStructureByIdQuery(id));
        if (result.IsFailure)
            return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>Creates a new salary structure with components.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateSalaryStructureRequest request)
    {
        var command = new CreateSalaryStructureCommand(
            request.Name,
            request.NameAr,
            request.Description,
            request.DescriptionAr,
            request.BranchId,
            request.IsActive,
            request.Components?.Select(c => new CreateComponentRequest(
                c.Name, c.NameAr, c.ComponentType, c.CalculationType,
                c.Amount, c.Percentage, c.IsRecurring, c.IsTaxable,
                c.IsSocialInsurable, c.DisplayOrder
            )).ToList() ?? new()
        );

        var result = await _mediator.Send(command);
        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return CreatedAtAction(nameof(GetById), new { id = result.Value }, new { id = result.Value });
    }

    /// <summary>Updates a salary structure and its components.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateSalaryStructureRequest request)
    {
        var entity = await _context.SalaryStructures
            .Include(s => s.Components.Where(c => !c.IsDeleted))
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Salary structure not found." });

        entity.Name = request.Name.Trim();
        entity.NameAr = request.NameAr?.Trim();
        entity.Description = request.Description?.Trim();
        entity.DescriptionAr = request.DescriptionAr?.Trim();
        entity.BranchId = request.BranchId;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Soft-delete removed components
        var incomingIds = request.Components?.Where(c => c.Id.HasValue).Select(c => c.Id!.Value).ToHashSet() ?? new();
        foreach (var existing in entity.Components)
        {
            if (!incomingIds.Contains(existing.Id))
            {
                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = _currentUser.Username;
            }
        }

        // Upsert components
        if (request.Components != null)
        {
            foreach (var c in request.Components)
            {
                if (c.Id.HasValue)
                {
                    var existing = entity.Components.FirstOrDefault(x => x.Id == c.Id.Value);
                    if (existing != null)
                    {
                        existing.Name = c.Name.Trim();
                        existing.NameAr = c.NameAr?.Trim();
                        existing.ComponentType = (SalaryComponentType)c.ComponentType;
                        existing.CalculationType = (CalculationType)c.CalculationType;
                        existing.Amount = c.Amount;
                        existing.Percentage = c.Percentage;
                        existing.IsRecurring = c.IsRecurring;
                        existing.IsTaxable = c.IsTaxable;
                        existing.IsSocialInsurable = c.IsSocialInsurable;
                        existing.DisplayOrder = c.DisplayOrder;
                        existing.ModifiedAtUtc = DateTime.UtcNow;
                        existing.ModifiedBy = _currentUser.Username;
                    }
                }
                else
                {
                    _context.SalaryComponents.Add(new SalaryComponent
                    {
                        SalaryStructureId = entity.Id,
                        Name = c.Name.Trim(),
                        NameAr = c.NameAr?.Trim(),
                        ComponentType = (SalaryComponentType)c.ComponentType,
                        CalculationType = (CalculationType)c.CalculationType,
                        Amount = c.Amount,
                        Percentage = c.Percentage,
                        IsRecurring = c.IsRecurring,
                        IsTaxable = c.IsTaxable,
                        IsSocialInsurable = c.IsSocialInsurable,
                        DisplayOrder = c.DisplayOrder,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = _currentUser.Username ?? "SYSTEM"
                    });
                }
            }
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Soft-deletes a salary structure if not referenced by any employee salary.</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.SalaryStructures
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Salary structure not found." });

        var hasEmployeeSalaries = await _context.EmployeeSalaries
            .AnyAsync(es => es.SalaryStructureId == id && !es.IsDeleted);

        if (hasEmployeeSalaries)
            return BadRequest(new { error = "Cannot delete salary structure that is assigned to employees." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Toggles the active status of a salary structure.</summary>
    [HttpPost("{id}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(long id)
    {
        var entity = await _context.SalaryStructures
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Salary structure not found." });

        entity.IsActive = !entity.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { isActive = entity.IsActive });
    }

    /// <summary>Gets active salary structures for dropdown selection.</summary>
    [HttpGet("dropdown")]
    public async Task<IActionResult> GetDropdown([FromQuery] long? branchId)
    {
        var query = _context.SalaryStructures
            .Where(s => !s.IsDeleted && s.IsActive);

        if (branchId.HasValue)
            query = query.Where(s => s.BranchId == branchId.Value || s.BranchId == null);

        var items = await query
            .OrderBy(s => s.Name)
            .Select(s => new { id = s.Id, name = s.Name, nameAr = s.NameAr })
            .ToListAsync();

        return Ok(items);
    }
}

// Request records
public record CreateSalaryStructureRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? BranchId,
    bool IsActive,
    List<CreateComponentRequestDto>? Components
);

public record CreateComponentRequestDto(
    string Name,
    string? NameAr,
    int ComponentType,
    int CalculationType,
    decimal? Amount,
    decimal? Percentage,
    bool IsRecurring,
    bool IsTaxable,
    bool IsSocialInsurable,
    int DisplayOrder
);

public record UpdateSalaryStructureRequest(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? BranchId,
    bool IsActive,
    List<UpdateComponentRequestDto>? Components
);

public record UpdateComponentRequestDto(
    long? Id,
    string Name,
    string? NameAr,
    int ComponentType,
    int CalculationType,
    decimal? Amount,
    decimal? Percentage,
    bool IsRecurring,
    bool IsTaxable,
    bool IsSocialInsurable,
    int DisplayOrder
);
