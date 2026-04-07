using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/employee-certifications")]
[Authorize]
public class EmployeeCertificationsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public EmployeeCertificationsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists employee certifications with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "EmployeeCertificationRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] long? courseId = null,
        [FromQuery] CertificationStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.EmployeeCertifications.AsNoTracking().AsQueryable();

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (courseId.HasValue) query = query.Where(x => x.TrainingCourseId == courseId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.CertificationName.Contains(search) || x.Employee.FullName.Contains(search) || x.Employee.EmployeeNumber.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.IssueDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.TrainingCourseId,
                CourseTitle = x.Course != null ? x.Course.Title : (string?)null,
                CourseTitleAr = x.Course != null ? x.Course.TitleAr : (string?)null,
                x.CertificationName,
                x.CertificationNameAr,
                x.IssuingAuthority,
                x.IssuingAuthorityAr,
                x.CertificationNumber,
                x.IssueDate,
                x.ExpiryDate,
                Status = x.Status.ToString(),
                x.RenewalRequired,
                x.RenewalReminderDays,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single employee certification by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "EmployeeCertificationRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.EmployeeCertifications.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.TrainingCourseId,
                CourseTitle = x.Course != null ? x.Course.Title : (string?)null,
                CourseTitleAr = x.Course != null ? x.Course.TitleAr : (string?)null,
                x.CertificationName,
                x.CertificationNameAr,
                x.IssuingAuthority,
                x.IssuingAuthorityAr,
                x.CertificationNumber,
                x.IssueDate,
                x.ExpiryDate,
                Status = x.Status.ToString(),
                x.DocumentUrl,
                x.RenewalRequired,
                x.RenewalReminderDays,
                x.Notes,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Employee certification not found." });
        return Ok(item);
    }

    /// <summary>Creates a new employee certification.</summary>
    [HttpPost]
    [Authorize(Policy = "EmployeeCertificationManagement")]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeCertificationRequest request)
    {
        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == request.EmployeeId);
        if (!employeeExists) return BadRequest(new { error = "Employee not found." });

        var entity = new EmployeeCertification
        {
            EmployeeId = request.EmployeeId,
            TrainingCourseId = request.TrainingCourseId,
            CertificationName = request.CertificationName,
            CertificationNameAr = request.CertificationNameAr,
            IssuingAuthority = request.IssuingAuthority,
            IssuingAuthorityAr = request.IssuingAuthorityAr,
            CertificationNumber = request.CertificationNumber,
            IssueDate = request.IssueDate,
            ExpiryDate = request.ExpiryDate,
            Status = CertificationStatus.Active,
            DocumentUrl = request.DocumentUrl,
            RenewalRequired = request.RenewalRequired,
            RenewalReminderDays = request.RenewalReminderDays,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.EmployeeCertifications.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing employee certification.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "EmployeeCertificationManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateEmployeeCertificationRequest request)
    {
        var entity = await _context.EmployeeCertifications.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Employee certification not found." });

        entity.TrainingCourseId = request.TrainingCourseId;
        entity.CertificationName = request.CertificationName;
        entity.CertificationNameAr = request.CertificationNameAr;
        entity.IssuingAuthority = request.IssuingAuthority;
        entity.IssuingAuthorityAr = request.IssuingAuthorityAr;
        entity.CertificationNumber = request.CertificationNumber;
        entity.IssueDate = request.IssueDate;
        entity.ExpiryDate = request.ExpiryDate;
        entity.Status = request.Status;
        entity.DocumentUrl = request.DocumentUrl;
        entity.RenewalRequired = request.RenewalRequired;
        entity.RenewalReminderDays = request.RenewalReminderDays;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Employee certification updated." });
    }

    /// <summary>Soft deletes an employee certification.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "EmployeeCertificationManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.EmployeeCertifications.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Employee certification not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Employee certification deleted." });
    }

    /// <summary>Gets certifications expiring within the specified number of days.</summary>
    [HttpGet("expiring")]
    [Authorize(Policy = "EmployeeCertificationRead")]
    public async Task<IActionResult> GetExpiring([FromQuery] int days = 30)
    {
        var targetDate = DateTime.UtcNow.Date.AddDays(days);

        var today = DateTime.UtcNow.Date;

        var rawItems = await _context.EmployeeCertifications.AsNoTracking()
            .Where(x => x.Status == CertificationStatus.Active
                && x.ExpiryDate != null
                && x.ExpiryDate.Value.Date <= targetDate
                && x.ExpiryDate.Value.Date >= today)
            .OrderBy(x => x.ExpiryDate)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FullName,
                EmployeeNameAr = x.Employee.FullNameAr,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.CertificationName,
                x.CertificationNameAr,
                x.IssuingAuthority,
                x.ExpiryDate
            })
            .ToListAsync();

        var items = rawItems.Select(x => new
        {
            x.Id,
            x.EmployeeId,
            x.EmployeeName,
            x.EmployeeNameAr,
            x.EmployeeNumber,
            x.CertificationName,
            x.CertificationNameAr,
            x.IssuingAuthority,
            x.ExpiryDate,
            DaysUntilExpiry = (x.ExpiryDate!.Value.Date - today).Days
        }).ToList();

        return Ok(new { data = items, totalCount = items.Count });
    }

    /// <summary>Gets all certifications for a specific employee.</summary>
    [HttpGet("employee/{employeeId}")]
    [Authorize(Policy = "EmployeeCertificationRead")]
    public async Task<IActionResult> GetByEmployee(long employeeId)
    {
        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == employeeId);
        if (!employeeExists) return NotFound(new { error = "Employee not found." });

        var items = await _context.EmployeeCertifications.AsNoTracking()
            .Where(x => x.EmployeeId == employeeId)
            .OrderByDescending(x => x.IssueDate)
            .Select(x => new
            {
                x.Id,
                x.CertificationName,
                x.CertificationNameAr,
                x.IssuingAuthority,
                x.IssuingAuthorityAr,
                x.CertificationNumber,
                x.IssueDate,
                x.ExpiryDate,
                Status = x.Status.ToString(),
                x.RenewalRequired,
                CourseTitle = x.Course != null ? x.Course.Title : (string?)null,
                CourseTitleAr = x.Course != null ? x.Course.TitleAr : (string?)null,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount = items.Count });
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateEmployeeCertificationRequest
{
    public long EmployeeId { get; set; }
    public long? TrainingCourseId { get; set; }
    public string CertificationName { get; set; } = string.Empty;
    public string? CertificationNameAr { get; set; }
    public string? IssuingAuthority { get; set; }
    public string? IssuingAuthorityAr { get; set; }
    public string? CertificationNumber { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public string? DocumentUrl { get; set; }
    public bool RenewalRequired { get; set; }
    public int? RenewalReminderDays { get; set; } = 30;
    public string? Notes { get; set; }
}

public class UpdateEmployeeCertificationRequest
{
    public long? TrainingCourseId { get; set; }
    public string CertificationName { get; set; } = string.Empty;
    public string? CertificationNameAr { get; set; }
    public string? IssuingAuthority { get; set; }
    public string? IssuingAuthorityAr { get; set; }
    public string? CertificationNumber { get; set; }
    public DateTime IssueDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public CertificationStatus Status { get; set; }
    public string? DocumentUrl { get; set; }
    public bool RenewalRequired { get; set; }
    public int? RenewalReminderDays { get; set; } = 30;
    public string? Notes { get; set; }
}
