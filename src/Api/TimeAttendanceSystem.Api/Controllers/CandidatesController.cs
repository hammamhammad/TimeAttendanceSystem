using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Recruitment;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/candidates")]
[Authorize]
[RequiresModuleEndpoint(SystemModule.Recruitment)]
public class CandidatesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CandidatesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists candidates with optional search and pagination.</summary>
    [HttpGet]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? search,
        [FromQuery] ApplicationSource? source,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.Candidates
            .Where(c => !c.IsDeleted);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(c =>
                c.FirstName.Contains(search) ||
                c.LastName.Contains(search) ||
                (c.Email != null && c.Email.Contains(search)) ||
                (c.Skills != null && c.Skills.Contains(search)));

        if (source.HasValue)
            query = query.Where(c => c.Source == source.Value);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(c => c.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new CandidateListDto
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                FirstNameAr = c.FirstNameAr,
                LastNameAr = c.LastNameAr,
                Email = c.Email,
                Phone = c.Phone,
                Source = c.Source,
                CurrentCompany = c.CurrentCompany,
                CurrentJobTitle = c.CurrentJobTitle,
                YearsOfExperience = c.YearsOfExperience,
                ConvertedToEmployeeId = c.ConvertedToEmployeeId,
                CreatedAtUtc = c.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber = page, pageSize });
    }

    /// <summary>Gets a candidate by ID.</summary>
    [HttpGet("{id}")]
    [AllowModuleReadOnly]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.Candidates
            .Include(c => c.ReferredByEmployee)
            .Include(c => c.ConvertedToEmployee)
            .Where(c => c.Id == id && !c.IsDeleted)
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Candidate not found." });

        return Ok(new CandidateDetailDto
        {
            Id = item.Id,
            FirstName = item.FirstName,
            LastName = item.LastName,
            FirstNameAr = item.FirstNameAr,
            LastNameAr = item.LastNameAr,
            Email = item.Email,
            Phone = item.Phone,
            NationalId = item.NationalId,
            DateOfBirth = item.DateOfBirth,
            Gender = item.Gender,
            Nationality = item.Nationality,
            NationalityAr = item.NationalityAr,
            ResumeUrl = item.ResumeUrl,
            LinkedInUrl = item.LinkedInUrl,
            PortfolioUrl = item.PortfolioUrl,
            Source = item.Source,
            ReferredByEmployeeId = item.ReferredByEmployeeId,
            ReferredByEmployeeName = item.ReferredByEmployee != null ? item.ReferredByEmployee.FirstName + " " + item.ReferredByEmployee.LastName : null,
            CurrentCompany = item.CurrentCompany,
            CurrentJobTitle = item.CurrentJobTitle,
            YearsOfExperience = item.YearsOfExperience,
            Skills = item.Skills,
            Notes = item.Notes,
            ConvertedToEmployeeId = item.ConvertedToEmployeeId,
            ConvertedToEmployeeName = item.ConvertedToEmployee != null ? item.ConvertedToEmployee.FirstName + " " + item.ConvertedToEmployee.LastName : null,
            CreatedAtUtc = item.CreatedAtUtc,
            CreatedBy = item.CreatedBy,
            ModifiedAtUtc = item.ModifiedAtUtc
        });
    }

    /// <summary>Creates a new candidate.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCandidateRequest request)
    {
        var entity = new Candidate
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            FirstNameAr = request.FirstNameAr,
            LastNameAr = request.LastNameAr,
            Email = request.Email,
            Phone = request.Phone,
            NationalId = request.NationalId,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
            Nationality = request.Nationality,
            NationalityAr = request.NationalityAr,
            ResumeUrl = request.ResumeUrl,
            LinkedInUrl = request.LinkedInUrl,
            PortfolioUrl = request.PortfolioUrl,
            Source = request.Source,
            ReferredByEmployeeId = request.ReferredByEmployeeId,
            CurrentCompany = request.CurrentCompany,
            CurrentJobTitle = request.CurrentJobTitle,
            YearsOfExperience = request.YearsOfExperience,
            Skills = request.Skills,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.Candidates.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a candidate.</summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateCandidateRequest request)
    {
        var entity = await _context.Candidates
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Candidate not found." });

        entity.FirstName = request.FirstName;
        entity.LastName = request.LastName;
        entity.FirstNameAr = request.FirstNameAr;
        entity.LastNameAr = request.LastNameAr;
        entity.Email = request.Email;
        entity.Phone = request.Phone;
        entity.NationalId = request.NationalId;
        entity.DateOfBirth = request.DateOfBirth;
        entity.Gender = request.Gender;
        entity.Nationality = request.Nationality;
        entity.NationalityAr = request.NationalityAr;
        entity.ResumeUrl = request.ResumeUrl;
        entity.LinkedInUrl = request.LinkedInUrl;
        entity.PortfolioUrl = request.PortfolioUrl;
        entity.Source = request.Source;
        entity.ReferredByEmployeeId = request.ReferredByEmployeeId;
        entity.CurrentCompany = request.CurrentCompany;
        entity.CurrentJobTitle = request.CurrentJobTitle;
        entity.YearsOfExperience = request.YearsOfExperience;
        entity.Skills = request.Skills;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>Soft-deletes a candidate.</summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.Candidates
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Candidate not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();

        return NoContent();
    }
}

// ===========================
// Request / Response Records
// ===========================

public record CreateCandidateRequest(
    string FirstName,
    string LastName,
    string? FirstNameAr,
    string? LastNameAr,
    string? Email,
    string? Phone,
    string? NationalId,
    DateTime? DateOfBirth,
    Gender? Gender,
    string? Nationality,
    string? NationalityAr,
    string? ResumeUrl,
    string? LinkedInUrl,
    string? PortfolioUrl,
    ApplicationSource Source,
    long? ReferredByEmployeeId,
    string? CurrentCompany,
    string? CurrentJobTitle,
    int? YearsOfExperience,
    string? Skills,
    string? Notes
);

public class CandidateListDto
{
    public long Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? FirstNameAr { get; set; }
    public string? LastNameAr { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public ApplicationSource Source { get; set; }
    public string? CurrentCompany { get; set; }
    public string? CurrentJobTitle { get; set; }
    public int? YearsOfExperience { get; set; }
    public long? ConvertedToEmployeeId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class CandidateDetailDto : CandidateListDto
{
    public string? NationalId { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }
    public string? Nationality { get; set; }
    public string? NationalityAr { get; set; }
    public string? ResumeUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public long? ReferredByEmployeeId { get; set; }
    public string? ReferredByEmployeeName { get; set; }
    public string? Skills { get; set; }
    public string? Notes { get; set; }
    public string? ConvertedToEmployeeName { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
}
