using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/project-tasks")]
[Authorize]
public class ProjectTasksController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public ProjectTasksController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists project tasks with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "ProjectTaskRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? projectId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.ProjectTasks.AsNoTracking().AsQueryable();

        if (projectId.HasValue)
            query = query.Where(x => x.ProjectId == projectId.Value);

        if (isActive.HasValue)
            query = query.Where(x => x.IsActive == isActive.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x =>
                x.Name.Contains(search) ||
                x.Code.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.DisplayOrder)
            .ThenByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.ProjectId,
                ProjectName = x.Project.Name,
                ProjectCode = x.Project.Code,
                x.Code,
                x.Name,
                x.NameAr,
                x.Description,
                x.BudgetHours,
                x.IsActive,
                x.DisplayOrder,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single project task by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "ProjectTaskRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.ProjectTasks
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.ProjectId,
                ProjectName = x.Project.Name,
                ProjectCode = x.Project.Code,
                x.Code,
                x.Name,
                x.NameAr,
                x.Description,
                x.BudgetHours,
                x.IsActive,
                x.DisplayOrder,
                x.CreatedAtUtc
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Project task not found." });

        return Ok(item);
    }

    /// <summary>Creates a new project task.</summary>
    [HttpPost]
    [Authorize(Policy = "ProjectTaskManagement")]
    public async Task<IActionResult> Create([FromBody] CreateProjectTaskRequest request)
    {
        // Validate project exists
        var projectExists = await _context.Projects.AnyAsync(x => x.Id == request.ProjectId);
        if (!projectExists)
            return BadRequest(new { error = "Project not found." });

        // Validate unique code within project
        var codeExists = await _context.ProjectTasks
            .AnyAsync(x => x.ProjectId == request.ProjectId && x.Code == request.Code);
        if (codeExists)
            return BadRequest(new { error = "A task with this code already exists in the project." });

        var entity = new ProjectTask
        {
            ProjectId = request.ProjectId,
            Code = request.Code,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            BudgetHours = request.BudgetHours,
            IsActive = request.IsActive ?? true,
            DisplayOrder = request.DisplayOrder,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.ProjectTasks.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates a project task.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "ProjectTaskManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateProjectTaskRequest request)
    {
        var entity = await _context.ProjectTasks.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Project task not found." });

        // Validate unique code within project if changed
        if (request.Code != entity.Code || request.ProjectId != entity.ProjectId)
        {
            var codeExists = await _context.ProjectTasks
                .AnyAsync(x => x.ProjectId == request.ProjectId && x.Code == request.Code && x.Id != id);
            if (codeExists)
                return BadRequest(new { error = "A task with this code already exists in the project." });
        }

        entity.ProjectId = request.ProjectId;
        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.BudgetHours = request.BudgetHours;
        entity.IsActive = request.IsActive;
        entity.DisplayOrder = request.DisplayOrder;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Deletes a project task (soft delete).</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "ProjectTaskManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.ProjectTasks.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Project task not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Gets active tasks for a project for dropdown selection.</summary>
    [HttpGet("dropdown")]
    public async Task<IActionResult> GetDropdown([FromQuery] long? projectId = null)
    {
        var query = _context.ProjectTasks.AsNoTracking()
            .Where(x => x.IsActive);

        if (projectId.HasValue)
            query = query.Where(x => x.ProjectId == projectId.Value);

        var items = await query
            .OrderBy(x => x.DisplayOrder)
            .ThenBy(x => x.Name)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                x.ProjectId
            })
            .ToListAsync();

        return Ok(items);
    }
}

// ── DTOs ────────────────────────────────────────────────

public class CreateProjectTaskRequest
{
    public long ProjectId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal? BudgetHours { get; set; }
    public bool? IsActive { get; set; }
    public int DisplayOrder { get; set; }
}

public class UpdateProjectTaskRequest
{
    public long ProjectId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal? BudgetHours { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
}
