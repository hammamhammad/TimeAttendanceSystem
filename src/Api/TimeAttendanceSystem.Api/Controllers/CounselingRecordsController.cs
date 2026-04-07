using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.EmployeeRelations;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/counseling-records")]
[Authorize]
public class CounselingRecordsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CounselingRecordsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    private bool CanViewConfidential()
    {
        return _currentUser.Roles.Any(r => r is "SystemAdmin" or "Admin" or "HR");
    }

    /// <summary>Lists counseling records with optional filters. Confidential records filtered.</summary>
    [HttpGet]
    [Authorize(Policy = "CounselingRecordRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] CounselingType? sessionType = null,
        [FromQuery] bool? followUpRequired = null,
        [FromQuery] bool? followUpCompleted = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var canViewConf = CanViewConfidential();
        var userId = _currentUser.UserId;

        var query = _context.CounselingRecords.AsNoTracking().AsQueryable();

        // Confidentiality filter: non-privileged users can only see non-confidential + where they are counselor
        if (!canViewConf)
            query = query.Where(x => !x.IsConfidential || x.CounselorUserId == userId);

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (sessionType.HasValue) query = query.Where(x => x.SessionType == sessionType.Value);
        if (followUpRequired.HasValue) query = query.Where(x => x.FollowUpRequired == followUpRequired.Value);
        if (followUpCompleted.HasValue) query = query.Where(x => x.FollowUpCompleted == followUpCompleted.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Subject.Contains(search) || (x.SubjectAr != null && x.SubjectAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.SessionDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                x.CounselorUserId,
                x.SessionDate,
                SessionType = x.SessionType.ToString(),
                x.Subject,
                x.SubjectAr,
                x.IsConfidential,
                x.FollowUpRequired,
                x.FollowUpDate,
                x.FollowUpCompleted,
                x.Outcome,
                x.OutcomeAr,
                x.RelatedDisciplinaryActionId,
                x.RelatedGrievanceId,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single counseling record by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "CounselingRecordRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.CounselingRecords.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                x.CounselorUserId,
                x.SessionDate,
                SessionType = x.SessionType.ToString(),
                x.Subject,
                x.SubjectAr,
                x.Notes,
                x.IsConfidential,
                x.FollowUpRequired,
                x.FollowUpDate,
                x.FollowUpCompleted,
                x.RelatedDisciplinaryActionId,
                RelatedDisciplinaryActionNumber = x.RelatedDisciplinaryAction != null ? x.RelatedDisciplinaryAction.ActionNumber : (string?)null,
                x.RelatedGrievanceId,
                RelatedGrievanceNumber = x.RelatedGrievance != null ? x.RelatedGrievance.GrievanceNumber : (string?)null,
                x.Outcome,
                x.OutcomeAr,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Counseling record not found." });

        // Confidentiality check
        if (item.IsConfidential && !CanViewConfidential() && item.CounselorUserId != _currentUser.UserId)
            return Forbid();

        return Ok(item);
    }

    /// <summary>Creates a new counseling record.</summary>
    [HttpPost]
    [Authorize(Policy = "CounselingRecordManagement")]
    public async Task<IActionResult> Create([FromBody] CreateCounselingRecordRequest request)
    {
        var entity = new CounselingRecord
        {
            EmployeeId = request.EmployeeId,
            CounselorUserId = request.CounselorUserId ?? _currentUser.UserId!.Value,
            SessionDate = request.SessionDate,
            SessionType = request.SessionType,
            Subject = request.Subject,
            SubjectAr = request.SubjectAr,
            Notes = request.Notes,
            IsConfidential = request.IsConfidential,
            FollowUpRequired = request.FollowUpRequired,
            FollowUpDate = request.FollowUpDate,
            RelatedDisciplinaryActionId = request.RelatedDisciplinaryActionId,
            RelatedGrievanceId = request.RelatedGrievanceId,
            Outcome = request.Outcome,
            OutcomeAr = request.OutcomeAr,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.CounselingRecords.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing counseling record.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "CounselingRecordManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateCounselingRecordRequest request)
    {
        var entity = await _context.CounselingRecords.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Counseling record not found." });

        entity.SessionDate = request.SessionDate;
        entity.SessionType = request.SessionType;
        entity.Subject = request.Subject;
        entity.SubjectAr = request.SubjectAr;
        entity.Notes = request.Notes;
        entity.IsConfidential = request.IsConfidential;
        entity.FollowUpRequired = request.FollowUpRequired;
        entity.FollowUpDate = request.FollowUpDate;
        entity.RelatedDisciplinaryActionId = request.RelatedDisciplinaryActionId;
        entity.RelatedGrievanceId = request.RelatedGrievanceId;
        entity.Outcome = request.Outcome;
        entity.OutcomeAr = request.OutcomeAr;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Counseling record updated." });
    }

    /// <summary>Marks follow-up as completed for a counseling record.</summary>
    [HttpPost("{id}/follow-up-complete")]
    [Authorize(Policy = "CounselingRecordManagement")]
    public async Task<IActionResult> FollowUpComplete(long id, [FromBody] FollowUpCompleteRequest? request = null)
    {
        var entity = await _context.CounselingRecords.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Counseling record not found." });

        if (!entity.FollowUpRequired)
            return BadRequest(new { error = "This counseling record does not require follow-up." });

        if (entity.FollowUpCompleted)
            return BadRequest(new { error = "Follow-up is already completed." });

        entity.FollowUpCompleted = true;
        if (request?.Outcome != null)
        {
            entity.Outcome = request.Outcome;
            entity.OutcomeAr = request.OutcomeAr;
        }
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Follow-up completed." });
    }

    /// <summary>Gets counseling records that need follow-up (pending).</summary>
    [HttpGet("pending-follow-ups")]
    [Authorize(Policy = "CounselingRecordRead")]
    public async Task<IActionResult> GetPendingFollowUps()
    {
        var canViewConf = CanViewConfidential();
        var userId = _currentUser.UserId;

        var query = _context.CounselingRecords.AsNoTracking()
            .Where(x => x.FollowUpRequired && !x.FollowUpCompleted);

        if (!canViewConf)
            query = query.Where(x => !x.IsConfidential || x.CounselorUserId == userId);

        var items = await query
            .OrderBy(x => x.FollowUpDate)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                x.CounselorUserId,
                x.SessionDate,
                SessionType = x.SessionType.ToString(),
                x.Subject,
                x.SubjectAr,
                x.FollowUpDate,
                IsOverdue = x.FollowUpDate.HasValue && x.FollowUpDate.Value < DateTime.UtcNow
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount = items.Count });
    }

    /// <summary>Soft deletes a counseling record.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "CounselingRecordManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.CounselingRecords.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Counseling record not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Counseling record deleted." });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateCounselingRecordRequest
{
    public long EmployeeId { get; set; }
    public long? CounselorUserId { get; set; }
    public DateTime SessionDate { get; set; }
    public CounselingType SessionType { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string? Notes { get; set; }
    public bool IsConfidential { get; set; } = true;
    public bool FollowUpRequired { get; set; }
    public DateTime? FollowUpDate { get; set; }
    public long? RelatedDisciplinaryActionId { get; set; }
    public long? RelatedGrievanceId { get; set; }
    public string? Outcome { get; set; }
    public string? OutcomeAr { get; set; }
}

public class UpdateCounselingRecordRequest
{
    public DateTime SessionDate { get; set; }
    public CounselingType SessionType { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? SubjectAr { get; set; }
    public string? Notes { get; set; }
    public bool IsConfidential { get; set; } = true;
    public bool FollowUpRequired { get; set; }
    public DateTime? FollowUpDate { get; set; }
    public long? RelatedDisciplinaryActionId { get; set; }
    public long? RelatedGrievanceId { get; set; }
    public string? Outcome { get; set; }
    public string? OutcomeAr { get; set; }
}

public class FollowUpCompleteRequest
{
    public string? Outcome { get; set; }
    public string? OutcomeAr { get; set; }
}
