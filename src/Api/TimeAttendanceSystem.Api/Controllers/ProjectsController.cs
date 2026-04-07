using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Timesheets;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/projects")]
[Authorize]
public class ProjectsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public ProjectsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists projects with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "ProjectRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId = null,
        [FromQuery] ProjectStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.Projects.AsNoTracking().AsQueryable();

        if (branchId.HasValue)
            query = query.Where(x => x.BranchId == branchId.Value);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        if (isActive.HasValue)
            query = query.Where(x => x.IsActive == isActive.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x =>
                x.Name.Contains(search) ||
                x.Code.Contains(search) ||
                (x.ClientName != null && x.ClientName.Contains(search)));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                x.Description,
                x.DescriptionAr,
                x.ClientName,
                x.ClientNameAr,
                x.ManagerEmployeeId,
                ManagerEmployeeName = x.ManagerEmployee != null
                    ? x.ManagerEmployee.FirstName + " " + x.ManagerEmployee.LastName : null,
                x.BranchId,
                BranchName = x.Branch.Name,
                x.StartDate,
                x.EndDate,
                x.BudgetHours,
                x.Status,
                x.IsActive,
                x.IsChargeable,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single project by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "ProjectRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.Projects
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                x.Description,
                x.DescriptionAr,
                x.ClientName,
                x.ClientNameAr,
                x.ManagerEmployeeId,
                ManagerEmployeeName = x.ManagerEmployee != null
                    ? x.ManagerEmployee.FirstName + " " + x.ManagerEmployee.LastName : null,
                x.BranchId,
                BranchName = x.Branch.Name,
                x.StartDate,
                x.EndDate,
                x.BudgetHours,
                x.Status,
                x.IsActive,
                x.IsChargeable,
                x.CreatedAtUtc,
                TaskCount = x.Tasks.Count(t => !t.IsDeleted)
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Project not found." });

        return Ok(item);
    }

    /// <summary>Creates a new project.</summary>
    [HttpPost]
    [Authorize(Policy = "ProjectManagement")]
    public async Task<IActionResult> Create([FromBody] CreateProjectRequest request)
    {
        // Validate unique code
        var codeExists = await _context.Projects.AnyAsync(x => x.Code == request.Code);
        if (codeExists)
            return BadRequest(new { error = "A project with this code already exists." });

        // Validate branch
        var branchExists = await _context.Branches.AnyAsync(x => x.Id == request.BranchId);
        if (!branchExists)
            return BadRequest(new { error = "Branch not found." });

        // Validate manager if provided
        if (request.ManagerEmployeeId.HasValue)
        {
            var managerExists = await _context.Employees.AnyAsync(x => x.Id == request.ManagerEmployeeId.Value);
            if (!managerExists)
                return BadRequest(new { error = "Manager employee not found." });
        }

        var entity = new Project
        {
            Code = request.Code,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            ClientName = request.ClientName,
            ClientNameAr = request.ClientNameAr,
            ManagerEmployeeId = request.ManagerEmployeeId,
            BranchId = request.BranchId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            BudgetHours = request.BudgetHours,
            Status = request.Status ?? ProjectStatus.Active,
            IsActive = request.IsActive ?? true,
            IsChargeable = request.IsChargeable ?? true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.Projects.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates a project.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "ProjectManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateProjectRequest request)
    {
        var entity = await _context.Projects.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Project not found." });

        // Validate unique code if changed
        if (request.Code != entity.Code)
        {
            var codeExists = await _context.Projects.AnyAsync(x => x.Code == request.Code && x.Id != id);
            if (codeExists)
                return BadRequest(new { error = "A project with this code already exists." });
        }

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.ClientName = request.ClientName;
        entity.ClientNameAr = request.ClientNameAr;
        entity.ManagerEmployeeId = request.ManagerEmployeeId;
        entity.BranchId = request.BranchId;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.BudgetHours = request.BudgetHours;
        entity.Status = request.Status;
        entity.IsActive = request.IsActive;
        entity.IsChargeable = request.IsChargeable;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Deletes a project (soft delete).</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "ProjectManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.Projects.FindAsync(id);
        if (entity == null || entity.IsDeleted)
            return NotFound(new { error = "Project not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Gets active projects for dropdown selection.</summary>
    [HttpGet("dropdown")]
    public async Task<IActionResult> GetDropdown([FromQuery] long? branchId = null)
    {
        var query = _context.Projects.AsNoTracking()
            .Where(x => x.IsActive && x.Status == ProjectStatus.Active);

        if (branchId.HasValue)
            query = query.Where(x => x.BranchId == branchId.Value);

        var items = await query
            .OrderBy(x => x.Name)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                x.BranchId
            })
            .ToListAsync();

        return Ok(items);
    }
}

// ── DTOs ────────────────────────────────────────────────

public class CreateProjectRequest
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? ClientName { get; set; }
    public string? ClientNameAr { get; set; }
    public long? ManagerEmployeeId { get; set; }
    public long BranchId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal? BudgetHours { get; set; }
    public ProjectStatus? Status { get; set; }
    public bool? IsActive { get; set; }
    public bool? IsChargeable { get; set; }
}

public class UpdateProjectRequest
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? ClientName { get; set; }
    public string? ClientNameAr { get; set; }
    public long? ManagerEmployeeId { get; set; }
    public long BranchId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public decimal? BudgetHours { get; set; }
    public ProjectStatus Status { get; set; }
    public bool IsActive { get; set; }
    public bool IsChargeable { get; set; }
}
