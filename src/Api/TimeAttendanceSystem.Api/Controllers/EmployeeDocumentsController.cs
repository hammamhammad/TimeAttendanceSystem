using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/employee-documents")]
[Authorize]
public class EmployeeDocumentsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public EmployeeDocumentsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "EmployeeDocumentRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] long? categoryId = null,
        [FromQuery] DocumentType? documentType = null,
        [FromQuery] DocumentVerificationStatus? status = null,
        [FromQuery] bool? expiringSoon = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.EmployeeDocuments.AsNoTracking().AsQueryable();

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (categoryId.HasValue) query = query.Where(x => x.DocumentCategoryId == categoryId.Value);
        if (documentType.HasValue) query = query.Where(x => x.DocumentType == documentType.Value);
        if (status.HasValue) query = query.Where(x => x.VerificationStatus == status.Value);
        if (expiringSoon == true)
        {
            // Horizon = max of the tenant-configured DocumentExpiryAlertDaysCsv (default "30,15,7" → 30).
            var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync();
            var parsed = (settings?.DocumentExpiryAlertDaysCsv ?? "30,15,7")
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(s => int.TryParse(s, out var v) && v > 0 ? v : 0)
                .Where(v => v > 0)
                .DefaultIfEmpty(30);
            var horizonDays = parsed.Max();
            var horizon = DateTime.UtcNow.AddDays(horizonDays);
            query = query.Where(x => x.ExpiryDate != null && x.ExpiryDate.Value <= horizon);
        }
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.DocumentName.Contains(search) || (x.DocumentNameAr != null && x.DocumentNameAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.DocumentCategoryId,
                CategoryName = x.DocumentCategory != null ? x.DocumentCategory.Name : null,
                x.DocumentName, x.DocumentNameAr, x.DocumentType, x.FileUrl,
                x.ExpiryDate, x.IssuedDate, x.VerificationStatus, x.VerifiedAt,
                x.Notes, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "EmployeeDocumentRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.EmployeeDocuments.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.DocumentCategoryId,
                CategoryName = x.DocumentCategory != null ? x.DocumentCategory.Name : null,
                x.DocumentName, x.DocumentNameAr, x.DocumentType, x.FileUrl,
                x.ExpiryDate, x.IssuedDate, x.VerificationStatus,
                x.VerifiedByUserId, x.VerifiedAt, x.Notes,
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Employee document not found." });
        return Ok(item);
    }

    [HttpPost]
    [Authorize(Policy = "EmployeeDocumentManagement")]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeDocumentRequest request)
    {
        var entity = new EmployeeDocument
        {
            EmployeeId = request.EmployeeId,
            DocumentCategoryId = request.DocumentCategoryId,
            DocumentName = request.DocumentName,
            DocumentNameAr = request.DocumentNameAr,
            DocumentType = request.DocumentType,
            FileUrl = request.FileUrl,
            ExpiryDate = request.ExpiryDate,
            IssuedDate = request.IssuedDate,
            Notes = request.Notes,
            VerificationStatus = DocumentVerificationStatus.Pending,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmployeeDocuments.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "EmployeeDocumentManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateEmployeeDocumentRequest request)
    {
        var entity = await _context.EmployeeDocuments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Employee document not found." });

        entity.DocumentCategoryId = request.DocumentCategoryId;
        entity.DocumentName = request.DocumentName;
        entity.DocumentNameAr = request.DocumentNameAr;
        entity.DocumentType = request.DocumentType;
        entity.FileUrl = request.FileUrl;
        entity.ExpiryDate = request.ExpiryDate;
        entity.IssuedDate = request.IssuedDate;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Employee document updated." });
    }

    [HttpPost("{id}/verify")]
    [Authorize(Policy = "EmployeeDocumentManagement")]
    public async Task<IActionResult> Verify(long id, [FromBody] VerifyDocumentRequest request)
    {
        var entity = await _context.EmployeeDocuments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Employee document not found." });

        entity.VerificationStatus = request.Status;
        entity.VerifiedByUserId = _currentUser.UserId;
        entity.VerifiedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = $"Document {request.Status}." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "EmployeeDocumentManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.EmployeeDocuments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Employee document not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Employee document deleted." });
    }
}

public class CreateEmployeeDocumentRequest
{
    public long EmployeeId { get; set; }
    public long? DocumentCategoryId { get; set; }
    public string DocumentName { get; set; } = string.Empty;
    public string? DocumentNameAr { get; set; }
    public DocumentType DocumentType { get; set; }
    public string? FileUrl { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public DateTime? IssuedDate { get; set; }
    public string? Notes { get; set; }
}

public class VerifyDocumentRequest
{
    public DocumentVerificationStatus Status { get; set; }
}
