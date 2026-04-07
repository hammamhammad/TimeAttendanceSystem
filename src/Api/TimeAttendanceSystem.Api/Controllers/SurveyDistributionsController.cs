using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Surveys;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/survey-distributions")]
[Authorize]
public class SurveyDistributionsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public SurveyDistributionsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists survey distributions with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "SurveyDistributionRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? surveyTemplateId = null,
        [FromQuery] SurveyDistributionStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.SurveyDistributions.AsNoTracking().AsQueryable();

        if (surveyTemplateId.HasValue) query = query.Where(x => x.SurveyTemplateId == surveyTemplateId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
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
                x.SurveyTemplateId,
                TemplateName = x.Template.Title,
                TemplateNameAr = x.Template.TitleAr,
                SurveyType = x.Template.SurveyType.ToString(),
                TargetAudience = x.TargetAudience.ToString(),
                Status = x.Status.ToString(),
                x.StartDate,
                x.EndDate,
                x.TotalRecipients,
                x.TotalResponses,
                CompletionRate = x.TotalRecipients > 0
                    ? Math.Round((double)x.TotalResponses / x.TotalRecipients * 100, 1)
                    : 0,
                x.ReminderFrequencyDays,
                x.CreatedAtUtc,
                x.CreatedBy
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single survey distribution by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "SurveyDistributionRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.SurveyDistributions.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TitleAr,
                x.SurveyTemplateId,
                TemplateName = x.Template.Title,
                TemplateNameAr = x.Template.TitleAr,
                SurveyType = x.Template.SurveyType.ToString(),
                IsAnonymous = x.Template.IsAnonymous,
                TargetAudience = x.TargetAudience.ToString(),
                x.TargetIds,
                Status = x.Status.ToString(),
                x.StartDate,
                x.EndDate,
                x.ReminderFrequencyDays,
                x.LastReminderSentAt,
                x.TotalRecipients,
                x.TotalResponses,
                CompletionRate = x.TotalRecipients > 0
                    ? Math.Round((double)x.TotalResponses / x.TotalRecipients * 100, 1)
                    : 0,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Survey distribution not found." });
        return Ok(item);
    }

    /// <summary>Creates a new survey distribution.</summary>
    [HttpPost]
    [Authorize(Policy = "SurveyDistributionManagement")]
    public async Task<IActionResult> Create([FromBody] CreateSurveyDistributionRequest request)
    {
        // Validate template exists and is active
        var template = await _context.SurveyTemplates.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.SurveyTemplateId && x.IsActive);

        if (template == null)
            return BadRequest(new { error = "Survey template not found or is inactive." });

        // Validate template has questions
        var hasQuestions = await _context.SurveyQuestions
            .AnyAsync(q => q.SurveyTemplateId == request.SurveyTemplateId && !q.IsDeleted);

        if (!hasQuestions)
            return BadRequest(new { error = "Survey template has no questions." });

        if (request.EndDate <= request.StartDate)
            return BadRequest(new { error = "End date must be after start date." });

        var entity = new SurveyDistribution
        {
            SurveyTemplateId = request.SurveyTemplateId,
            Title = request.Title,
            TitleAr = request.TitleAr,
            TargetAudience = request.TargetAudience,
            TargetIds = request.TargetIds,
            Status = SurveyDistributionStatus.Draft,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            ReminderFrequencyDays = request.ReminderFrequencyDays,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.SurveyDistributions.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing survey distribution (only if Draft).</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "SurveyDistributionManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateSurveyDistributionRequest request)
    {
        var entity = await _context.SurveyDistributions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Survey distribution not found." });

        if (entity.Status != SurveyDistributionStatus.Draft)
            return BadRequest(new { error = "Only Draft distributions can be edited." });

        if (request.EndDate <= request.StartDate)
            return BadRequest(new { error = "End date must be after start date." });

        entity.Title = request.Title;
        entity.TitleAr = request.TitleAr;
        entity.TargetAudience = request.TargetAudience;
        entity.TargetIds = request.TargetIds;
        entity.StartDate = request.StartDate;
        entity.EndDate = request.EndDate;
        entity.ReminderFrequencyDays = request.ReminderFrequencyDays;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Survey distribution updated." });
    }

    /// <summary>Soft deletes a survey distribution (only if Draft or Cancelled).</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "SurveyDistributionManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.SurveyDistributions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Survey distribution not found." });

        if (entity.Status != SurveyDistributionStatus.Draft && entity.Status != SurveyDistributionStatus.Cancelled)
            return BadRequest(new { error = "Only Draft or Cancelled distributions can be deleted." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Survey distribution deleted." });
    }

    /// <summary>Activates a distribution: generates participants with GUID tokens and sets status to Active or Scheduled.</summary>
    [HttpPost("{id}/activate")]
    [Authorize(Policy = "SurveyDistributionManagement")]
    public async Task<IActionResult> Activate(long id)
    {
        var entity = await _context.SurveyDistributions
            .Include(d => d.Template)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity == null) return NotFound(new { error = "Survey distribution not found." });

        if (entity.Status != SurveyDistributionStatus.Draft)
            return BadRequest(new { error = "Only Draft distributions can be activated." });

        // Resolve target employees
        var employeeIds = await ResolveTargetEmployees(entity.TargetAudience, entity.TargetIds);

        if (!employeeIds.Any())
            return BadRequest(new { error = "No employees found for the target audience." });

        var now = DateTime.UtcNow;

        // Generate participants with anonymous tokens
        foreach (var empId in employeeIds)
        {
            var participant = new SurveyParticipant
            {
                SurveyDistributionId = entity.Id,
                EmployeeId = empId,
                InvitedAt = now,
                Status = SurveyParticipantStatus.Invited,
                AnonymousToken = Guid.NewGuid().ToString("N"),
                CreatedAtUtc = now,
                CreatedBy = _currentUser.Username ?? "system"
            };
            _context.SurveyParticipants.Add(participant);
        }

        entity.TotalRecipients = employeeIds.Count;
        entity.Status = entity.StartDate <= now
            ? SurveyDistributionStatus.Active
            : SurveyDistributionStatus.Scheduled;
        entity.ModifiedAtUtc = now;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Survey distribution activated.", totalRecipients = employeeIds.Count });
    }

    /// <summary>Closes an active distribution.</summary>
    [HttpPost("{id}/close")]
    [Authorize(Policy = "SurveyDistributionManagement")]
    public async Task<IActionResult> Close(long id)
    {
        var entity = await _context.SurveyDistributions.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Survey distribution not found." });

        if (entity.Status != SurveyDistributionStatus.Active && entity.Status != SurveyDistributionStatus.Scheduled)
            return BadRequest(new { error = "Only Active or Scheduled distributions can be closed." });

        entity.Status = SurveyDistributionStatus.Closed;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Mark pending participants as Expired
        var pendingParticipants = await _context.SurveyParticipants
            .Where(p => p.SurveyDistributionId == id && p.Status == SurveyParticipantStatus.Invited)
            .ToListAsync();

        foreach (var p in pendingParticipants)
        {
            p.Status = SurveyParticipantStatus.Expired;
            p.ModifiedAtUtc = DateTime.UtcNow;
            p.ModifiedBy = _currentUser.Username;
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Survey distribution closed." });
    }

    /// <summary>Gets participants for a distribution.</summary>
    [HttpGet("{id}/participants")]
    [Authorize(Policy = "SurveyDistributionRead")]
    public async Task<IActionResult> GetParticipants(long id,
        [FromQuery] SurveyParticipantStatus? status = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var exists = await _context.SurveyDistributions.AnyAsync(x => x.Id == id);
        if (!exists) return NotFound(new { error = "Survey distribution not found." });

        var query = _context.SurveyParticipants.AsNoTracking()
            .Where(x => x.SurveyDistributionId == id);

        if (status.HasValue) query = query.Where(x => x.Status == status.Value);

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.InvitedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                Status = x.Status.ToString(),
                x.InvitedAt,
                x.CompletedAt
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets aggregated results per question for a distribution.</summary>
    [HttpGet("{id}/results")]
    [Authorize(Policy = "SurveyResponseRead")]
    public async Task<IActionResult> GetResults(long id)
    {
        var distribution = await _context.SurveyDistributions.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Title,
                x.TitleAr,
                x.SurveyTemplateId,
                x.TotalRecipients,
                x.TotalResponses,
                SurveyType = x.Template.SurveyType.ToString(),
                IsAnonymous = x.Template.IsAnonymous
            })
            .FirstOrDefaultAsync();

        if (distribution == null) return NotFound(new { error = "Survey distribution not found." });

        // Get questions for this distribution's template
        var questions = await _context.SurveyQuestions.AsNoTracking()
            .Where(q => q.SurveyTemplateId == distribution.SurveyTemplateId && !q.IsDeleted)
            .OrderBy(q => q.DisplayOrder)
            .Select(q => new
            {
                q.Id,
                q.QuestionText,
                q.QuestionTextAr,
                QuestionType = q.QuestionType.ToString(),
                QuestionTypeEnum = q.QuestionType,
                q.SectionName,
                q.SectionNameAr,
                q.OptionsJson,
                q.MinValue,
                q.MaxValue
            })
            .ToListAsync();

        // Get all responses for this distribution
        var responses = await _context.SurveyResponses.AsNoTracking()
            .Where(r => r.SurveyDistributionId == id)
            .ToListAsync();

        var results = questions.Select(q =>
        {
            var questionResponses = responses.Where(r => r.SurveyQuestionId == q.Id).ToList();
            var totalResponses = questionResponses.Count;

            // Calculate aggregated stats based on question type
            double? averageValue = null;
            int? minResponse = null;
            int? maxResponse = null;
            Dictionary<string, int>? optionCounts = null;

            if (q.QuestionTypeEnum == SurveyQuestionType.Rating || q.QuestionTypeEnum == SurveyQuestionType.NPS)
            {
                var numericResponses = questionResponses
                    .Where(r => r.ResponseValue.HasValue)
                    .Select(r => r.ResponseValue!.Value)
                    .ToList();

                if (numericResponses.Any())
                {
                    averageValue = Math.Round(numericResponses.Average(), 2);
                    minResponse = numericResponses.Min();
                    maxResponse = numericResponses.Max();
                }
            }

            if (q.QuestionTypeEnum == SurveyQuestionType.MultipleChoice ||
                q.QuestionTypeEnum == SurveyQuestionType.MultiSelect ||
                q.QuestionTypeEnum == SurveyQuestionType.YesNo)
            {
                optionCounts = new Dictionary<string, int>();
                foreach (var resp in questionResponses.Where(r => !string.IsNullOrEmpty(r.SelectedOptions)))
                {
                    var options = resp.SelectedOptions!.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
                    foreach (var opt in options)
                    {
                        optionCounts.TryGetValue(opt, out var count);
                        optionCounts[opt] = count + 1;
                    }
                }
            }

            return new
            {
                QuestionId = q.Id,
                q.QuestionText,
                q.QuestionTextAr,
                q.QuestionType,
                q.SectionName,
                q.SectionNameAr,
                TotalResponses = totalResponses,
                AverageValue = averageValue,
                MinResponse = minResponse,
                MaxResponse = maxResponse,
                OptionCounts = optionCounts
            };
        }).ToList();

        // Count unique participant tokens that have submitted
        var uniqueRespondents = responses
            .Where(r => !string.IsNullOrEmpty(r.ParticipantToken))
            .Select(r => r.ParticipantToken)
            .Distinct()
            .Count();

        return Ok(new
        {
            distribution.Id,
            distribution.Title,
            distribution.TitleAr,
            distribution.SurveyType,
            distribution.IsAnonymous,
            distribution.TotalRecipients,
            distribution.TotalResponses,
            UniqueRespondents = uniqueRespondents,
            CompletionRate = distribution.TotalRecipients > 0
                ? Math.Round((double)uniqueRespondents / distribution.TotalRecipients * 100, 1)
                : 0,
            Questions = results
        });
    }

    /// <summary>Exports aggregated survey results as CSV.</summary>
    [HttpGet("{id}/results/export")]
    [Authorize(Policy = "SurveyResponseRead")]
    public async Task<IActionResult> ExportResults(long id)
    {
        var distribution = await _context.SurveyDistributions.AsNoTracking()
            .Include(x => x.Template)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (distribution == null) return NotFound(new { error = "Survey distribution not found." });

        var questions = await _context.SurveyQuestions.AsNoTracking()
            .Where(q => q.SurveyTemplateId == distribution.SurveyTemplateId && !q.IsDeleted)
            .OrderBy(q => q.DisplayOrder)
            .ToListAsync();

        var responses = await _context.SurveyResponses.AsNoTracking()
            .Where(r => r.SurveyDistributionId == id)
            .ToListAsync();

        // Group responses by participant token
        var participantGroups = responses
            .Where(r => !string.IsNullOrEmpty(r.ParticipantToken))
            .GroupBy(r => r.ParticipantToken)
            .ToList();

        var csv = new StringBuilder();

        // Header row
        csv.Append("Respondent");
        foreach (var q in questions)
        {
            csv.Append($",\"{q.QuestionText.Replace("\"", "\"\"")}\"");
        }
        csv.AppendLine();

        // Data rows
        var respondentIndex = 1;
        foreach (var group in participantGroups)
        {
            csv.Append($"Respondent {respondentIndex++}");
            foreach (var q in questions)
            {
                var resp = group.FirstOrDefault(r => r.SurveyQuestionId == q.Id);
                string value;
                if (resp == null)
                {
                    value = "";
                }
                else if (resp.ResponseValue.HasValue)
                {
                    value = resp.ResponseValue.Value.ToString();
                }
                else if (!string.IsNullOrEmpty(resp.SelectedOptions))
                {
                    value = resp.SelectedOptions;
                }
                else
                {
                    value = resp.ResponseText ?? "";
                }
                csv.Append($",\"{value.Replace("\"", "\"\"")}\"");
            }
            csv.AppendLine();
        }

        var fileName = $"survey-results-{distribution.Title.Replace(" ", "-")}-{DateTime.UtcNow:yyyyMMdd}.csv";
        var bytes = Encoding.UTF8.GetBytes(csv.ToString());
        return File(bytes, "text/csv", fileName);
    }

    /// <summary>Calculates eNPS score for a distribution (for ENPS or NPS-type questions).</summary>
    [HttpGet("{id}/enps-score")]
    [Authorize(Policy = "SurveyResponseRead")]
    public async Task<IActionResult> GetEnpsScore(long id)
    {
        var distribution = await _context.SurveyDistributions.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new { x.Id, x.SurveyTemplateId, x.TotalRecipients })
            .FirstOrDefaultAsync();

        if (distribution == null) return NotFound(new { error = "Survey distribution not found." });

        // Find NPS-type questions for this template
        var npsQuestionIds = await _context.SurveyQuestions.AsNoTracking()
            .Where(q => q.SurveyTemplateId == distribution.SurveyTemplateId
                && !q.IsDeleted
                && (q.QuestionType == SurveyQuestionType.NPS || q.QuestionType == SurveyQuestionType.Rating))
            .Select(q => q.Id)
            .ToListAsync();

        if (!npsQuestionIds.Any())
            return BadRequest(new { error = "No NPS or Rating questions found in this survey." });

        var scores = await _context.SurveyResponses.AsNoTracking()
            .Where(r => r.SurveyDistributionId == id
                && npsQuestionIds.Contains(r.SurveyQuestionId)
                && r.ResponseValue.HasValue)
            .Select(r => r.ResponseValue!.Value)
            .ToListAsync();

        if (!scores.Any())
            return Ok(new
            {
                EnpsScore = (double?)null,
                TotalResponses = 0,
                Promoters = 0,
                Passives = 0,
                Detractors = 0,
                Message = "No responses yet."
            });

        // eNPS calculation: scores 0-10
        // Promoters: 9-10, Passives: 7-8, Detractors: 0-6
        var promoters = scores.Count(s => s >= 9);
        var passives = scores.Count(s => s >= 7 && s <= 8);
        var detractors = scores.Count(s => s <= 6);
        var total = scores.Count;

        var enpsScore = Math.Round(((double)promoters / total - (double)detractors / total) * 100, 1);

        return Ok(new
        {
            EnpsScore = enpsScore,
            TotalResponses = total,
            Promoters = promoters,
            Passives = passives,
            Detractors = detractors,
            PromoterPercent = Math.Round((double)promoters / total * 100, 1),
            PassivePercent = Math.Round((double)passives / total * 100, 1),
            DetractorPercent = Math.Round((double)detractors / total * 100, 1)
        });
    }

    // ===========================
    // Private Helpers
    // ===========================

    private async Task<List<long>> ResolveTargetEmployees(SurveyTargetAudience audience, string? targetIds)
    {
        var query = _context.Employees.AsNoTracking()
            .Where(e => !e.IsDeleted && e.IsActive);

        switch (audience)
        {
            case SurveyTargetAudience.All:
                break;

            case SurveyTargetAudience.Branch:
                if (!string.IsNullOrWhiteSpace(targetIds))
                {
                    var branchIds = targetIds.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                        .Select(s => long.TryParse(s, out var v) ? v : 0)
                        .Where(v => v > 0)
                        .ToList();
                    if (branchIds.Any())
                        query = query.Where(e => branchIds.Contains(e.BranchId));
                }
                break;

            case SurveyTargetAudience.Department:
                if (!string.IsNullOrWhiteSpace(targetIds))
                {
                    var deptIds = targetIds.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                        .Select(s => long.TryParse(s, out var v) ? v : 0)
                        .Where(v => v > 0)
                        .ToList();
                    if (deptIds.Any())
                        query = query.Where(e => e.DepartmentId.HasValue && deptIds.Contains(e.DepartmentId.Value));
                }
                break;

            case SurveyTargetAudience.Custom:
                if (!string.IsNullOrWhiteSpace(targetIds))
                {
                    var empIds = targetIds.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                        .Select(s => long.TryParse(s, out var v) ? v : 0)
                        .Where(v => v > 0)
                        .ToList();
                    if (empIds.Any())
                        query = query.Where(e => empIds.Contains(e.Id));
                }
                break;
        }

        return await query.Select(e => e.Id).ToListAsync();
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateSurveyDistributionRequest
{
    public long SurveyTemplateId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public SurveyTargetAudience TargetAudience { get; set; }
    public string? TargetIds { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? ReminderFrequencyDays { get; set; }
}

public class UpdateSurveyDistributionRequest
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public SurveyTargetAudience TargetAudience { get; set; }
    public string? TargetIds { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? ReminderFrequencyDays { get; set; }
}
