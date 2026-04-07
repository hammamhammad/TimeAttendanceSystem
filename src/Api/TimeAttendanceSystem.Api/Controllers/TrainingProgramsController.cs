using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/training-programs")]
[Authorize]
public class TrainingProgramsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TrainingProgramsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists training programs with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TrainingProgramRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] TrainingProgramStatus? status = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TrainingPrograms.AsNoTracking().AsQueryable();

        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Title.Contains(search) || (x.TitleAr != null && x.TitleAr.Contains(search)) || x.Code.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Title,
                x.TitleAr,
                Status = x.Status.ToString(),
                x.TotalDurationHours,
                x.StartDate,
                x.EndDate,
                x.IsActive,
                CourseCount = x.ProgramCourses.Count(pc => !pc.IsDeleted),
                EnrollmentCount = x.Enrollments.Count(e => !e.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single training program by ID with courses.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TrainingProgramRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TrainingPrograms.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Title,
                x.TitleAr,
                x.Description,
                x.DescriptionAr,
                x.TargetAudience,
                x.TargetAudienceAr,
                x.TotalDurationHours,
                Status = x.Status.ToString(),
                x.StartDate,
                x.EndDate,
                x.IsActive,
                Courses = x.ProgramCourses
                    .Where(pc => !pc.IsDeleted)
                    .OrderBy(pc => pc.SequenceOrder)
                    .Select(pc => new
                    {
                        pc.Id,
                        pc.TrainingCourseId,
                        CourseCode = pc.Course.Code,
                        CourseTitle = pc.Course.Title,
                        CourseTitleAr = pc.Course.TitleAr,
                        pc.SequenceOrder,
                        pc.IsRequired,
                        CourseDurationHours = pc.Course.DurationHours
                    })
                    .ToList(),
                EnrollmentCount = x.Enrollments.Count(e => !e.IsDeleted),
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Training program not found." });
        return Ok(item);
    }

    /// <summary>Creates a new training program.</summary>
    [HttpPost]
    [Authorize(Policy = "TrainingProgramManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTrainingProgramRequest request)
    {
        var codeExists = await _context.TrainingPrograms.AnyAsync(x => x.Code == request.Code);
        if (codeExists) return BadRequest(new { error = "A program with this code already exists." });

        var entity = new TrainingProgram
        {
            Code = request.Code,
            Title = request.Title,
            TitleAr = request.TitleAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            TargetAudience = request.TargetAudience,
            TargetAudienceAr = request.TargetAudienceAr,
            TotalDurationHours = request.TotalDurationHours,
            Status = TrainingProgramStatus.Draft,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TrainingPrograms.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing training program.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TrainingProgramManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTrainingProgramRequest request)
    {
        var entity = await _context.TrainingPrograms.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training program not found." });

        var codeExists = await _context.TrainingPrograms.AnyAsync(x => x.Code == request.Code && x.Id != id);
        if (codeExists) return BadRequest(new { error = "A program with this code already exists." });

        entity.Code = request.Code;
        entity.Title = request.Title;
        entity.TitleAr = request.TitleAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.TargetAudience = request.TargetAudience;
        entity.TargetAudienceAr = request.TargetAudienceAr;
        entity.TotalDurationHours = request.TotalDurationHours;
        entity.Status = request.Status;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training program updated." });
    }

    /// <summary>Soft deletes a training program.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TrainingProgramManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TrainingPrograms.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training program not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training program deleted." });
    }

    /// <summary>Adds a course to a training program.</summary>
    [HttpPost("{id}/courses")]
    [Authorize(Policy = "TrainingProgramManagement")]
    public async Task<IActionResult> AddCourse(long id, [FromBody] AddProgramCourseRequest request)
    {
        var program = await _context.TrainingPrograms.FirstOrDefaultAsync(x => x.Id == id);
        if (program == null) return NotFound(new { error = "Training program not found." });

        var courseExists = await _context.TrainingCourses.AnyAsync(x => x.Id == request.TrainingCourseId);
        if (!courseExists) return BadRequest(new { error = "Training course not found." });

        var alreadyAdded = await _context.TrainingProgramCourses
            .AnyAsync(x => x.TrainingProgramId == id && x.TrainingCourseId == request.TrainingCourseId && !x.IsDeleted);
        if (alreadyAdded) return BadRequest(new { error = "Course is already part of this program." });

        var entity = new TrainingProgramCourse
        {
            TrainingProgramId = id,
            TrainingCourseId = request.TrainingCourseId,
            SequenceOrder = request.SequenceOrder,
            IsRequired = request.IsRequired,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TrainingProgramCourses.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id, message = "Course added to program." });
    }

    /// <summary>Removes a course from a training program.</summary>
    [HttpDelete("{id}/courses/{courseId}")]
    [Authorize(Policy = "TrainingProgramManagement")]
    public async Task<IActionResult> RemoveCourse(long id, long courseId)
    {
        var link = await _context.TrainingProgramCourses
            .FirstOrDefaultAsync(x => x.TrainingProgramId == id && x.TrainingCourseId == courseId && !x.IsDeleted);
        if (link == null) return NotFound(new { error = "Course not found in this program." });

        link.IsDeleted = true;
        link.ModifiedAtUtc = DateTime.UtcNow;
        link.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Course removed from program." });
    }

    /// <summary>Returns active programs for dropdowns.</summary>
    [HttpGet("dropdown")]
    [Authorize(Policy = "TrainingProgramRead")]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.TrainingPrograms.AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.Title)
            .Select(x => new { x.Id, x.Code, x.Title, x.TitleAr })
            .ToListAsync();

        return Ok(items);
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateTrainingProgramRequest
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? TargetAudience { get; set; }
    public string? TargetAudienceAr { get; set; }
    public decimal TotalDurationHours { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpdateTrainingProgramRequest
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? TargetAudience { get; set; }
    public string? TargetAudienceAr { get; set; }
    public decimal TotalDurationHours { get; set; }
    public TrainingProgramStatus Status { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsActive { get; set; } = true;
}

public class AddProgramCourseRequest
{
    public long TrainingCourseId { get; set; }
    public int SequenceOrder { get; set; }
    public bool IsRequired { get; set; } = true;
}
