using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/job-grades")]
[Authorize]
public class JobGradesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public JobGradesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Gets all job grades.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _context.JobGrades
            .Where(x => !x.IsDeleted)
            .OrderBy(x => x.Level)
            .ThenBy(x => x.DisplayOrder)
            .Select(x => new JobGradeDto
            {
                Id = x.Id,
                Code = x.Code,
                Name = x.Name,
                NameAr = x.NameAr,
                Description = x.Description,
                Level = x.Level,
                MinSalary = x.MinSalary,
                MidSalary = x.MidSalary,
                MaxSalary = x.MaxSalary,
                Currency = x.Currency,
                IsActive = x.IsActive,
                DisplayOrder = x.DisplayOrder
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Gets a specific job grade by ID.</summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.JobGrades
            .Where(x => x.Id == id && !x.IsDeleted)
            .Select(x => new JobGradeDto
            {
                Id = x.Id,
                Code = x.Code,
                Name = x.Name,
                NameAr = x.NameAr,
                Description = x.Description,
                Level = x.Level,
                MinSalary = x.MinSalary,
                MidSalary = x.MidSalary,
                MaxSalary = x.MaxSalary,
                Currency = x.Currency,
                IsActive = x.IsActive,
                DisplayOrder = x.DisplayOrder
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Job grade not found." });

        return Ok(item);
    }

    /// <summary>Creates a new job grade.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateJobGradeRequest request)
    {
        var codeExists = await _context.JobGrades
            .AnyAsync(x => x.Code == request.Code && !x.IsDeleted);

        if (codeExists)
            return BadRequest(new { error = "Job grade code already exists." });

        var entity = new JobGrade
        {
            Code = request.Code.Trim(),
            Name = request.Name.Trim(),
            NameAr = request.NameAr,
            Description = request.Description,
            Level = request.Level,
            MinSalary = request.MinSalary,
            MidSalary = request.MidSalary,
            MaxSalary = request.MaxSalary,
            Currency = request.Currency ?? "SAR",
            IsActive = request.IsActive,
            DisplayOrder = request.DisplayOrder,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.JobGrades.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an existing job grade.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateJobGradeRequest request)
    {
        var entity = await _context.JobGrades
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job grade not found." });

        var codeExists = await _context.JobGrades
            .AnyAsync(x => x.Code == request.Code && x.Id != id && !x.IsDeleted);

        if (codeExists)
            return BadRequest(new { error = "Job grade code already exists." });

        entity.Code = request.Code.Trim();
        entity.Name = request.Name.Trim();
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.Level = request.Level;
        entity.MinSalary = request.MinSalary;
        entity.MidSalary = request.MidSalary;
        entity.MaxSalary = request.MaxSalary;
        entity.Currency = request.Currency ?? "SAR";
        entity.IsActive = request.IsActive;
        entity.DisplayOrder = request.DisplayOrder;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Soft deletes a job grade.</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.JobGrades
            .FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Job grade not found." });

        // Check if any employees are using this grade
        var inUse = await _context.Employees
            .AnyAsync(e => e.JobGradeId == id && !e.IsDeleted);

        if (inUse)
            return BadRequest(new { error = "Cannot delete job grade that is assigned to employees." });

        entity.IsDeleted = true;
        entity.IsActive = false;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Gets active job grades for dropdown selection.</summary>
    [HttpGet("dropdown")]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.JobGrades
            .Where(x => !x.IsDeleted && x.IsActive)
            .OrderBy(x => x.Level)
            .ThenBy(x => x.DisplayOrder)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                x.Level
            })
            .ToListAsync();

        return Ok(items);
    }
}

public record CreateJobGradeRequest(
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    int Level,
    decimal? MinSalary,
    decimal? MidSalary,
    decimal? MaxSalary,
    string? Currency,
    bool IsActive,
    int DisplayOrder
);
