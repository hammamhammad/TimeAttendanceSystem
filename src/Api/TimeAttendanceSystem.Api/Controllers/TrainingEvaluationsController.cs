using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/training-evaluations")]
[Authorize]
public class TrainingEvaluationsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TrainingEvaluationsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists training evaluations with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TrainingEvaluationRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? sessionId = null,
        [FromQuery] long? employeeId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TrainingEvaluations.AsNoTracking().AsQueryable();

        if (sessionId.HasValue) query = query.Where(x => x.TrainingSessionId == sessionId.Value);
        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Employee.FullName.Contains(search) || x.Employee.EmployeeNumber.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.SubmittedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.TrainingSessionId,
                SessionTitle = x.Session.Title,
                CourseTitle = x.Session.Course.Title,
                CourseTitleAr = x.Session.Course.TitleAr,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.OverallRating,
                x.ContentRating,
                x.InstructorRating,
                x.MaterialRating,
                x.SubmittedAt,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single training evaluation by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TrainingEvaluationRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TrainingEvaluations.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.TrainingSessionId,
                SessionTitle = x.Session.Title,
                CourseTitle = x.Session.Course.Title,
                CourseTitleAr = x.Session.Course.TitleAr,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.OverallRating,
                x.ContentRating,
                x.InstructorRating,
                x.MaterialRating,
                x.Comments,
                x.CommentsAr,
                x.SubmittedAt,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Training evaluation not found." });
        return Ok(item);
    }

    /// <summary>Creates a new training evaluation.</summary>
    [HttpPost]
    [Authorize(Policy = "TrainingEvaluationManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTrainingEvaluationRequest request)
    {
        var sessionExists = await _context.TrainingSessions.AnyAsync(x => x.Id == request.TrainingSessionId);
        if (!sessionExists) return BadRequest(new { error = "Training session not found." });

        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == request.EmployeeId);
        if (!employeeExists) return BadRequest(new { error = "Employee not found." });

        // Check for duplicate evaluation
        var alreadyEvaluated = await _context.TrainingEvaluations
            .AnyAsync(x => x.TrainingSessionId == request.TrainingSessionId && x.EmployeeId == request.EmployeeId && !x.IsDeleted);
        if (alreadyEvaluated) return BadRequest(new { error = "Employee has already evaluated this session." });

        var entity = new TrainingEvaluation
        {
            TrainingSessionId = request.TrainingSessionId,
            EmployeeId = request.EmployeeId,
            OverallRating = request.OverallRating,
            ContentRating = request.ContentRating,
            InstructorRating = request.InstructorRating,
            MaterialRating = request.MaterialRating,
            Comments = request.Comments,
            CommentsAr = request.CommentsAr,
            SubmittedAt = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TrainingEvaluations.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing training evaluation.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TrainingEvaluationManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTrainingEvaluationRequest request)
    {
        var entity = await _context.TrainingEvaluations.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training evaluation not found." });

        entity.OverallRating = request.OverallRating;
        entity.ContentRating = request.ContentRating;
        entity.InstructorRating = request.InstructorRating;
        entity.MaterialRating = request.MaterialRating;
        entity.Comments = request.Comments;
        entity.CommentsAr = request.CommentsAr;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training evaluation updated." });
    }

    /// <summary>Soft deletes a training evaluation.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TrainingEvaluationManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TrainingEvaluations.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training evaluation not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training evaluation deleted." });
    }

    /// <summary>Gets evaluation summary/statistics for a training session.</summary>
    [HttpGet("session/{sessionId}/summary")]
    [Authorize(Policy = "TrainingEvaluationRead")]
    public async Task<IActionResult> GetSessionSummary(long sessionId)
    {
        var sessionExists = await _context.TrainingSessions.AnyAsync(x => x.Id == sessionId);
        if (!sessionExists) return NotFound(new { error = "Training session not found." });

        var evaluations = await _context.TrainingEvaluations.AsNoTracking()
            .Where(x => x.TrainingSessionId == sessionId && !x.IsDeleted)
            .ToListAsync();

        if (!evaluations.Any())
            return Ok(new
            {
                sessionId,
                totalEvaluations = 0,
                averageOverallRating = (decimal?)null,
                averageContentRating = (decimal?)null,
                averageInstructorRating = (decimal?)null,
                averageMaterialRating = (decimal?)null
            });

        return Ok(new
        {
            sessionId,
            totalEvaluations = evaluations.Count,
            averageOverallRating = Math.Round(evaluations.Average(x => (double)x.OverallRating), 2),
            averageContentRating = evaluations.Where(x => x.ContentRating.HasValue).Any()
                ? (double?)Math.Round(evaluations.Where(x => x.ContentRating.HasValue).Average(x => (double)x.ContentRating!.Value), 2)
                : null,
            averageInstructorRating = evaluations.Where(x => x.InstructorRating.HasValue).Any()
                ? (double?)Math.Round(evaluations.Where(x => x.InstructorRating.HasValue).Average(x => (double)x.InstructorRating!.Value), 2)
                : null,
            averageMaterialRating = evaluations.Where(x => x.MaterialRating.HasValue).Any()
                ? (double?)Math.Round(evaluations.Where(x => x.MaterialRating.HasValue).Average(x => (double)x.MaterialRating!.Value), 2)
                : null
        });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateTrainingEvaluationRequest
{
    public long TrainingSessionId { get; set; }
    public long EmployeeId { get; set; }
    public int OverallRating { get; set; }
    public int? ContentRating { get; set; }
    public int? InstructorRating { get; set; }
    public int? MaterialRating { get; set; }
    public string? Comments { get; set; }
    public string? CommentsAr { get; set; }
}

public class UpdateTrainingEvaluationRequest
{
    public int OverallRating { get; set; }
    public int? ContentRating { get; set; }
    public int? InstructorRating { get; set; }
    public int? MaterialRating { get; set; }
    public string? Comments { get; set; }
    public string? CommentsAr { get; set; }
}
