using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/training-courses")]
[Authorize]
public class TrainingCoursesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TrainingCoursesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists training courses with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TrainingCourseRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? categoryId = null,
        [FromQuery] TrainingDeliveryMethod? deliveryMethod = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TrainingCourses.AsNoTracking().AsQueryable();

        if (categoryId.HasValue) query = query.Where(x => x.TrainingCategoryId == categoryId.Value);
        if (deliveryMethod.HasValue) query = query.Where(x => x.DeliveryMethod == deliveryMethod.Value);
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
                x.TrainingCategoryId,
                CategoryName = x.Category != null ? x.Category.Name : (string?)null,
                CategoryNameAr = x.Category != null ? x.Category.NameAr : (string?)null,
                x.Provider,
                x.ProviderAr,
                DeliveryMethod = x.DeliveryMethod.ToString(),
                x.DurationHours,
                x.MaxParticipants,
                x.Cost,
                x.Currency,
                x.CertificationAwarded,
                x.IsActive,
                SessionCount = x.Sessions.Count(s => !s.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single training course by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TrainingCourseRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TrainingCourses.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Title,
                x.TitleAr,
                x.Description,
                x.DescriptionAr,
                x.TrainingCategoryId,
                CategoryName = x.Category != null ? x.Category.Name : (string?)null,
                CategoryNameAr = x.Category != null ? x.Category.NameAr : (string?)null,
                x.Provider,
                x.ProviderAr,
                DeliveryMethod = x.DeliveryMethod.ToString(),
                x.DurationHours,
                x.MaxParticipants,
                x.Cost,
                x.Currency,
                x.Prerequisites,
                x.PrerequisitesAr,
                x.CertificationAwarded,
                x.CertificationName,
                x.CertificationValidityMonths,
                x.IsActive,
                SessionCount = x.Sessions.Count(s => !s.IsDeleted),
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Training course not found." });
        return Ok(item);
    }

    /// <summary>Creates a new training course.</summary>
    [HttpPost]
    [Authorize(Policy = "TrainingCourseManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTrainingCourseRequest request)
    {
        // Check code uniqueness
        var codeExists = await _context.TrainingCourses.AnyAsync(x => x.Code == request.Code);
        if (codeExists) return BadRequest(new { error = "A course with this code already exists." });

        var entity = new TrainingCourse
        {
            Code = request.Code,
            Title = request.Title,
            TitleAr = request.TitleAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            TrainingCategoryId = request.TrainingCategoryId,
            Provider = request.Provider,
            ProviderAr = request.ProviderAr,
            DeliveryMethod = request.DeliveryMethod,
            DurationHours = request.DurationHours,
            MaxParticipants = request.MaxParticipants,
            Cost = request.Cost,
            Currency = request.Currency,
            Prerequisites = request.Prerequisites,
            PrerequisitesAr = request.PrerequisitesAr,
            CertificationAwarded = request.CertificationAwarded,
            CertificationName = request.CertificationName,
            CertificationValidityMonths = request.CertificationValidityMonths,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TrainingCourses.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing training course.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TrainingCourseManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTrainingCourseRequest request)
    {
        var entity = await _context.TrainingCourses.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training course not found." });

        // Check code uniqueness (excluding self)
        var codeExists = await _context.TrainingCourses.AnyAsync(x => x.Code == request.Code && x.Id != id);
        if (codeExists) return BadRequest(new { error = "A course with this code already exists." });

        entity.Code = request.Code;
        entity.Title = request.Title;
        entity.TitleAr = request.TitleAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.TrainingCategoryId = request.TrainingCategoryId;
        entity.Provider = request.Provider;
        entity.ProviderAr = request.ProviderAr;
        entity.DeliveryMethod = request.DeliveryMethod;
        entity.DurationHours = request.DurationHours;
        entity.MaxParticipants = request.MaxParticipants;
        entity.Cost = request.Cost;
        entity.Currency = request.Currency;
        entity.Prerequisites = request.Prerequisites;
        entity.PrerequisitesAr = request.PrerequisitesAr;
        entity.CertificationAwarded = request.CertificationAwarded;
        entity.CertificationName = request.CertificationName;
        entity.CertificationValidityMonths = request.CertificationValidityMonths;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training course updated." });
    }

    /// <summary>Soft deletes a training course.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TrainingCourseManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TrainingCourses.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training course not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training course deleted." });
    }

    /// <summary>Returns active courses for dropdowns.</summary>
    [HttpGet("dropdown")]
    [Authorize(Policy = "TrainingCourseRead")]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.TrainingCourses.AsNoTracking()
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

public class CreateTrainingCourseRequest
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? TrainingCategoryId { get; set; }
    public string? Provider { get; set; }
    public string? ProviderAr { get; set; }
    public TrainingDeliveryMethod DeliveryMethod { get; set; }
    public decimal DurationHours { get; set; }
    public int? MaxParticipants { get; set; }
    public decimal? Cost { get; set; }
    public string Currency { get; set; } = "SAR";
    public string? Prerequisites { get; set; }
    public string? PrerequisitesAr { get; set; }
    public bool CertificationAwarded { get; set; }
    public string? CertificationName { get; set; }
    public int? CertificationValidityMonths { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpdateTrainingCourseRequest
{
    public string Code { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? TrainingCategoryId { get; set; }
    public string? Provider { get; set; }
    public string? ProviderAr { get; set; }
    public TrainingDeliveryMethod DeliveryMethod { get; set; }
    public decimal DurationHours { get; set; }
    public int? MaxParticipants { get; set; }
    public decimal? Cost { get; set; }
    public string Currency { get; set; } = "SAR";
    public string? Prerequisites { get; set; }
    public string? PrerequisitesAr { get; set; }
    public bool CertificationAwarded { get; set; }
    public string? CertificationName { get; set; }
    public int? CertificationValidityMonths { get; set; }
    public bool IsActive { get; set; } = true;
}
