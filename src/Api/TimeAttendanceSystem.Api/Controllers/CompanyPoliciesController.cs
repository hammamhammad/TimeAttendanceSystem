using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Documents;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/company-policies")]
[Authorize]
public class CompanyPoliciesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CompanyPoliciesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "CompanyPolicyRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] PolicyStatus? status = null,
        [FromQuery] long? categoryId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.CompanyPolicies.AsNoTracking().AsQueryable();

        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (categoryId.HasValue) query = query.Where(x => x.DocumentCategoryId == categoryId.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Title.Contains(search) || (x.TitleAr != null && x.TitleAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.EffectiveDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.Title, x.TitleAr, x.Description, x.DescriptionAr,
                x.DocumentCategoryId,
                CategoryName = x.DocumentCategory != null ? x.DocumentCategory.Name : null,
                x.DocumentUrl, x.Version, x.EffectiveDate, x.Status,
                x.RequiresAcknowledgment,
                AcknowledgmentCount = x.Acknowledgments.Count(a => !a.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "CompanyPolicyRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.CompanyPolicies.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.Title, x.TitleAr, x.Description, x.DescriptionAr,
                x.DocumentCategoryId,
                CategoryName = x.DocumentCategory != null ? x.DocumentCategory.Name : null,
                x.DocumentUrl, x.Version, x.EffectiveDate, x.Status,
                x.RequiresAcknowledgment, x.PublishedByUserId,
                AcknowledgmentCount = x.Acknowledgments.Count(a => !a.IsDeleted),
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Company policy not found." });
        return Ok(item);
    }

    [HttpPost]
    [Authorize(Policy = "CompanyPolicyManagement")]
    public async Task<IActionResult> Create([FromBody] CreateCompanyPolicyRequest request)
    {
        var entity = new CompanyPolicy
        {
            Title = request.Title,
            TitleAr = request.TitleAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            DocumentCategoryId = request.DocumentCategoryId,
            DocumentUrl = request.DocumentUrl,
            Version = request.Version,
            EffectiveDate = request.EffectiveDate,
            RequiresAcknowledgment = request.RequiresAcknowledgment,
            Status = PolicyStatus.Draft,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.CompanyPolicies.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "CompanyPolicyManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateCompanyPolicyRequest request)
    {
        var entity = await _context.CompanyPolicies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Company policy not found." });

        entity.Title = request.Title;
        entity.TitleAr = request.TitleAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.DocumentCategoryId = request.DocumentCategoryId;
        entity.DocumentUrl = request.DocumentUrl;
        entity.Version = request.Version;
        entity.EffectiveDate = request.EffectiveDate;
        entity.RequiresAcknowledgment = request.RequiresAcknowledgment;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Company policy updated." });
    }

    [HttpPost("{id}/publish")]
    [Authorize(Policy = "CompanyPolicyManagement")]
    public async Task<IActionResult> Publish(long id)
    {
        var entity = await _context.CompanyPolicies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Company policy not found." });
        if (entity.Status == PolicyStatus.Published) return BadRequest(new { error = "Policy is already published." });

        entity.Status = PolicyStatus.Published;
        entity.PublishedByUserId = _currentUser.UserId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Company policy published." });
    }

    [HttpPost("{id}/acknowledge")]
    public async Task<IActionResult> Acknowledge(long id)
    {
        var policy = await _context.CompanyPolicies.FirstOrDefaultAsync(x => x.Id == id && x.Status == PolicyStatus.Published);
        if (policy == null) return NotFound(new { error = "Published policy not found." });

        // Get employee for current user
        var empLink = await _context.EmployeeUserLinks
            .FirstOrDefaultAsync(l => l.UserId == _currentUser.UserId);
        if (empLink == null) return BadRequest(new { error = "No employee linked to current user." });

        var exists = await _context.PolicyAcknowledgments
            .AnyAsync(a => a.CompanyPolicyId == id && a.EmployeeId == empLink.EmployeeId && !a.IsDeleted);
        if (exists) return BadRequest(new { error = "Already acknowledged." });

        var ack = new PolicyAcknowledgment
        {
            CompanyPolicyId = id,
            EmployeeId = empLink.EmployeeId,
            AcknowledgedAt = DateTime.UtcNow,
            IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.PolicyAcknowledgments.Add(ack);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Policy acknowledged." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "CompanyPolicyManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.CompanyPolicies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Company policy not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Company policy deleted." });
    }
}

public class CreateCompanyPolicyRequest
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? DocumentCategoryId { get; set; }
    public string? DocumentUrl { get; set; }
    public string? Version { get; set; }
    public DateTime? EffectiveDate { get; set; }
    public bool RequiresAcknowledgment { get; set; }
}
