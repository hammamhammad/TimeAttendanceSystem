using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/letter-requests")]
[Authorize]
public class LetterRequestsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public LetterRequestsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "LetterRequestRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] LetterType? letterType = null,
        [FromQuery] LetterRequestStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.LetterRequests.AsNoTracking().AsQueryable();

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (letterType.HasValue) query = query.Where(x => x.LetterType == letterType.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Purpose != null && x.Purpose.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.LetterType, x.Purpose, x.PurposeAr, x.Status,
                x.GeneratedDocumentUrl, x.GeneratedAt, x.ApprovedAt,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "LetterRequestRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.LetterRequests.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.LetterType, x.Purpose, x.PurposeAr, x.AdditionalNotes,
                x.Status, x.RejectionReason, x.GeneratedDocumentUrl, x.GeneratedAt,
                x.TemplateId, x.ApprovedByUserId, x.ApprovedAt,
                x.WorkflowInstanceId, x.SubmittedByUserId,
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Letter request not found." });
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLetterRequestDto request)
    {
        var entity = new LetterRequest
        {
            EmployeeId = request.EmployeeId,
            LetterType = request.LetterType,
            Purpose = request.Purpose,
            PurposeAr = request.PurposeAr,
            AdditionalNotes = request.AdditionalNotes,
            Status = LetterRequestStatus.Pending,
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.LetterRequests.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPost("{id}/approve")]
    [Authorize(Policy = "LetterRequestManagement")]
    public async Task<IActionResult> Approve(long id)
    {
        var entity = await _context.LetterRequests.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Letter request not found." });
        if (entity.Status != LetterRequestStatus.Pending)
            return BadRequest(new { error = "Only pending requests can be approved." });

        entity.Status = LetterRequestStatus.Approved;
        entity.ApprovedByUserId = _currentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Auto-select template
        var template = await _context.LetterTemplates
            .FirstOrDefaultAsync(t => t.LetterType == entity.LetterType && t.IsDefault && t.IsActive && !t.IsDeleted);
        if (template != null)
        {
            entity.TemplateId = template.Id;

            // Simple placeholder replacement for generation
            var employee = await _context.Employees.FirstOrDefaultAsync(e => e.Id == entity.EmployeeId);
            if (employee != null && template.Content != null)
            {
                var content = template.Content
                    .Replace("{{EmployeeName}}", employee.FullName)
                    .Replace("{{EmployeeId}}", employee.EmployeeNumber ?? employee.Id.ToString())
                    .Replace("{{Date}}", DateTime.UtcNow.ToString("yyyy-MM-dd"))
                    .Replace("{{JobTitle}}", employee.JobTitle ?? "")
                    .Replace("{{Department}}", "");

                // In production, generate PDF and save to storage
                entity.Status = LetterRequestStatus.Generated;
                entity.GeneratedAt = DateTime.UtcNow;
                entity.GeneratedDocumentUrl = $"/generated-letters/{entity.Id}_{entity.LetterType}.html";
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Letter request approved and generated.", documentUrl = entity.GeneratedDocumentUrl });
    }

    [HttpPost("{id}/reject")]
    [Authorize(Policy = "LetterRequestManagement")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectLetterRequestDto request)
    {
        var entity = await _context.LetterRequests.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Letter request not found." });
        if (entity.Status != LetterRequestStatus.Pending)
            return BadRequest(new { error = "Only pending requests can be rejected." });

        entity.Status = LetterRequestStatus.Rejected;
        entity.RejectionReason = request.Reason;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Letter request rejected." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "LetterRequestManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.LetterRequests.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Letter request not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Letter request deleted." });
    }
}

public class CreateLetterRequestDto
{
    public long EmployeeId { get; set; }
    public LetterType LetterType { get; set; }
    public string? Purpose { get; set; }
    public string? PurposeAr { get; set; }
    public string? AdditionalNotes { get; set; }
}

public class RejectLetterRequestDto
{
    public string? Reason { get; set; }
}
