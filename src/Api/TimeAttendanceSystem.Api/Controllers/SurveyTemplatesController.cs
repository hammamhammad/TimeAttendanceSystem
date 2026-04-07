using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Surveys;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/survey-templates")]
[Authorize]
public class SurveyTemplatesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public SurveyTemplatesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists survey templates with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "SurveyTemplateRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] SurveyType? surveyType = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.SurveyTemplates.AsNoTracking().AsQueryable();

        if (surveyType.HasValue) query = query.Where(x => x.SurveyType == surveyType.Value);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Title.Contains(search) || (x.TitleAr != null && x.TitleAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TitleAr,
                x.Description,
                x.DescriptionAr,
                SurveyType = x.SurveyType.ToString(),
                x.IsAnonymous,
                x.IsActive,
                x.EstimatedDurationMinutes,
                QuestionCount = x.Questions.Count(),
                DistributionCount = x.Distributions.Count(),
                x.CreatedAtUtc,
                x.CreatedBy
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single survey template by ID with questions.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "SurveyTemplateRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.SurveyTemplates.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TitleAr,
                x.Description,
                x.DescriptionAr,
                SurveyType = x.SurveyType.ToString(),
                x.IsAnonymous,
                x.IsActive,
                x.EstimatedDurationMinutes,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy,
                Questions = x.Questions
                    .Where(q => !q.IsDeleted)
                    .OrderBy(q => q.DisplayOrder)
                    .Select(q => new
                    {
                        q.Id,
                        q.QuestionText,
                        q.QuestionTextAr,
                        QuestionType = q.QuestionType.ToString(),
                        q.IsRequired,
                        q.DisplayOrder,
                        q.SectionName,
                        q.SectionNameAr,
                        q.OptionsJson,
                        q.MinValue,
                        q.MaxValue,
                        q.MinLabel,
                        q.MaxLabel,
                        q.MinLabelAr,
                        q.MaxLabelAr
                    })
                    .ToList()
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Survey template not found." });
        return Ok(item);
    }

    /// <summary>Gets active survey templates for dropdown.</summary>
    [HttpGet("dropdown")]
    [Authorize(Policy = "SurveyTemplateRead")]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.SurveyTemplates.AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.Title)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TitleAr,
                SurveyType = x.SurveyType.ToString(),
                QuestionCount = x.Questions.Count()
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Creates a new survey template with questions.</summary>
    [HttpPost]
    [Authorize(Policy = "SurveyTemplateManagement")]
    public async Task<IActionResult> Create([FromBody] CreateSurveyTemplateRequest request)
    {
        var entity = new SurveyTemplate
        {
            Title = request.Title,
            TitleAr = request.TitleAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            SurveyType = request.SurveyType,
            IsAnonymous = request.IsAnonymous,
            IsActive = request.IsActive,
            EstimatedDurationMinutes = request.EstimatedDurationMinutes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        // Add questions
        if (request.Questions != null)
        {
            var order = 0;
            foreach (var q in request.Questions)
            {
                entity.Questions.Add(new SurveyQuestion
                {
                    QuestionText = q.QuestionText,
                    QuestionTextAr = q.QuestionTextAr,
                    QuestionType = q.QuestionType,
                    IsRequired = q.IsRequired,
                    DisplayOrder = q.DisplayOrder ?? order++,
                    SectionName = q.SectionName,
                    SectionNameAr = q.SectionNameAr,
                    OptionsJson = q.OptionsJson,
                    MinValue = q.MinValue,
                    MaxValue = q.MaxValue,
                    MinLabel = q.MinLabel,
                    MaxLabel = q.MaxLabel,
                    MinLabelAr = q.MinLabelAr,
                    MaxLabelAr = q.MaxLabelAr,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "system"
                });
            }
        }

        _context.SurveyTemplates.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing survey template and its questions.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "SurveyTemplateManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateSurveyTemplateRequest request)
    {
        var entity = await _context.SurveyTemplates
            .Include(x => x.Questions)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null) return NotFound(new { error = "Survey template not found." });

        entity.Title = request.Title;
        entity.TitleAr = request.TitleAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.SurveyType = request.SurveyType;
        entity.IsAnonymous = request.IsAnonymous;
        entity.IsActive = request.IsActive;
        entity.EstimatedDurationMinutes = request.EstimatedDurationMinutes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Soft-delete existing questions and re-add
        if (request.Questions != null)
        {
            foreach (var existing in entity.Questions.Where(q => !q.IsDeleted))
            {
                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = _currentUser.Username;
            }

            var order = 0;
            foreach (var q in request.Questions)
            {
                entity.Questions.Add(new SurveyQuestion
                {
                    QuestionText = q.QuestionText,
                    QuestionTextAr = q.QuestionTextAr,
                    QuestionType = q.QuestionType,
                    IsRequired = q.IsRequired,
                    DisplayOrder = q.DisplayOrder ?? order++,
                    SectionName = q.SectionName,
                    SectionNameAr = q.SectionNameAr,
                    OptionsJson = q.OptionsJson,
                    MinValue = q.MinValue,
                    MaxValue = q.MaxValue,
                    MinLabel = q.MinLabel,
                    MaxLabel = q.MaxLabel,
                    MinLabelAr = q.MinLabelAr,
                    MaxLabelAr = q.MaxLabelAr,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "system"
                });
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Survey template updated." });
    }

    /// <summary>Soft deletes a survey template.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "SurveyTemplateManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.SurveyTemplates.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Survey template not found." });

        // Check if template has active distributions
        var hasActiveDistributions = await _context.SurveyDistributions
            .AnyAsync(d => d.SurveyTemplateId == id &&
                (d.Status == SurveyDistributionStatus.Active || d.Status == SurveyDistributionStatus.Scheduled));

        if (hasActiveDistributions)
            return BadRequest(new { error = "Cannot delete a template with active or scheduled distributions." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Survey template deleted." });
    }

    /// <summary>Duplicates an existing survey template with all its questions.</summary>
    [HttpPost("{id}/duplicate")]
    [Authorize(Policy = "SurveyTemplateManagement")]
    public async Task<IActionResult> Duplicate(long id)
    {
        var source = await _context.SurveyTemplates.AsNoTracking()
            .Include(x => x.Questions.Where(q => !q.IsDeleted))
            .FirstOrDefaultAsync(x => x.Id == id);

        if (source == null) return NotFound(new { error = "Survey template not found." });

        var duplicate = new SurveyTemplate
        {
            Title = $"{source.Title} (Copy)",
            TitleAr = source.TitleAr != null ? $"{source.TitleAr} (نسخة)" : null,
            Description = source.Description,
            DescriptionAr = source.DescriptionAr,
            SurveyType = source.SurveyType,
            IsAnonymous = source.IsAnonymous,
            IsActive = false, // Start as inactive
            EstimatedDurationMinutes = source.EstimatedDurationMinutes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        foreach (var q in source.Questions.OrderBy(q => q.DisplayOrder))
        {
            duplicate.Questions.Add(new SurveyQuestion
            {
                QuestionText = q.QuestionText,
                QuestionTextAr = q.QuestionTextAr,
                QuestionType = q.QuestionType,
                IsRequired = q.IsRequired,
                DisplayOrder = q.DisplayOrder,
                SectionName = q.SectionName,
                SectionNameAr = q.SectionNameAr,
                OptionsJson = q.OptionsJson,
                MinValue = q.MinValue,
                MaxValue = q.MaxValue,
                MinLabel = q.MinLabel,
                MaxLabel = q.MaxLabel,
                MinLabelAr = q.MinLabelAr,
                MaxLabelAr = q.MaxLabelAr,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "system"
            });
        }

        _context.SurveyTemplates.Add(duplicate);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = duplicate.Id }, new { id = duplicate.Id });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateSurveyTemplateRequest
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public SurveyType SurveyType { get; set; }
    public bool IsAnonymous { get; set; } = true;
    public bool IsActive { get; set; } = true;
    public int? EstimatedDurationMinutes { get; set; }
    public List<SurveyQuestionRequest>? Questions { get; set; }
}

public class UpdateSurveyTemplateRequest
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public SurveyType SurveyType { get; set; }
    public bool IsAnonymous { get; set; } = true;
    public bool IsActive { get; set; } = true;
    public int? EstimatedDurationMinutes { get; set; }
    public List<SurveyQuestionRequest>? Questions { get; set; }
}

public class SurveyQuestionRequest
{
    public string QuestionText { get; set; } = string.Empty;
    public string? QuestionTextAr { get; set; }
    public SurveyQuestionType QuestionType { get; set; }
    public bool IsRequired { get; set; } = true;
    public int? DisplayOrder { get; set; }
    public string? SectionName { get; set; }
    public string? SectionNameAr { get; set; }
    public string? OptionsJson { get; set; }
    public int? MinValue { get; set; }
    public int? MaxValue { get; set; }
    public string? MinLabel { get; set; }
    public string? MaxLabel { get; set; }
    public string? MinLabelAr { get; set; }
    public string? MaxLabelAr { get; set; }
}
