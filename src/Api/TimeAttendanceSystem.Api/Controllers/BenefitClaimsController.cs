using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/benefit-claims")]
[Authorize]
public class BenefitClaimsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public BenefitClaimsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists benefit claims with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "BenefitClaimRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] long? benefitEnrollmentId = null,
        [FromQuery] BenefitClaimStatus? status = null,
        [FromQuery] BenefitClaimType? claimType = null,
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.BenefitClaims.AsNoTracking().AsQueryable();

        if (employeeId.HasValue)
            query = query.Where(x => x.EmployeeId == employeeId.Value);

        if (benefitEnrollmentId.HasValue)
            query = query.Where(x => x.BenefitEnrollmentId == benefitEnrollmentId.Value);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        if (claimType.HasValue)
            query = query.Where(x => x.ClaimType == claimType.Value);

        if (fromDate.HasValue)
            query = query.Where(x => x.ClaimDate >= fromDate.Value);

        if (toDate.HasValue)
            query = query.Where(x => x.ClaimDate <= toDate.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x =>
                x.Employee.FirstName.Contains(search) ||
                x.Employee.LastName.Contains(search) ||
                (x.Description != null && x.Description.Contains(search)));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.ClaimDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.BenefitEnrollmentId,
                BenefitPlanName = x.BenefitEnrollment.BenefitPlan.Name,
                x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.ClaimDate,
                x.ClaimAmount,
                x.ApprovedAmount,
                x.Currency,
                ClaimType = x.ClaimType.ToString(),
                x.Description,
                x.DescriptionAr,
                Status = x.Status.ToString(),
                x.ProcessedAt,
                x.RejectionReason,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single benefit claim by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "BenefitClaimRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.BenefitClaims
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.BenefitEnrollmentId,
                BenefitPlanName = x.BenefitEnrollment.BenefitPlan.Name,
                BenefitPlanCode = x.BenefitEnrollment.BenefitPlan.Code,
                BenefitType = x.BenefitEnrollment.BenefitPlan.BenefitType.ToString(),
                x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.ClaimDate,
                x.ClaimAmount,
                x.ApprovedAmount,
                x.Currency,
                ClaimType = x.ClaimType.ToString(),
                x.Description,
                x.DescriptionAr,
                Status = x.Status.ToString(),
                x.ProcessedAt,
                x.ProcessedByUserId,
                x.RejectionReason,
                x.Notes,
                x.CreatedAtUtc,
                x.CreatedBy,
                x.ModifiedAtUtc,
                x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Benefit claim not found." });

        return Ok(item);
    }

    /// <summary>Creates a new benefit claim.</summary>
    [HttpPost]
    [Authorize(Policy = "BenefitClaimManagement")]
    public async Task<IActionResult> Create([FromBody] CreateBenefitClaimRequest request)
    {
        // Validate enrollment exists and is active
        var enrollment = await _context.BenefitEnrollments
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == request.BenefitEnrollmentId);

        if (enrollment == null)
            return BadRequest(new { error = "Benefit enrollment not found." });

        if (enrollment.Status != BenefitEnrollmentStatus.Active)
            return BadRequest(new { error = "Claims can only be submitted against active enrollments." });

        var entity = new BenefitClaim
        {
            BenefitEnrollmentId = request.BenefitEnrollmentId,
            EmployeeId = enrollment.EmployeeId,
            ClaimDate = request.ClaimDate ?? DateTime.UtcNow,
            ClaimAmount = request.ClaimAmount,
            Currency = request.Currency ?? "SAR",
            ClaimType = request.ClaimType,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            Status = BenefitClaimStatus.Submitted,
            Notes = request.Notes,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.BenefitClaims.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a benefit claim (only if submitted/pending).</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "BenefitClaimManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateBenefitClaimRequest request)
    {
        var entity = await _context.BenefitClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit claim not found." });

        if (entity.Status != BenefitClaimStatus.Submitted && entity.Status != BenefitClaimStatus.UnderReview)
            return BadRequest(new { error = "Can only update claims in Submitted or UnderReview status." });

        entity.ClaimAmount = request.ClaimAmount;
        entity.Currency = request.Currency ?? "SAR";
        entity.ClaimType = request.ClaimType;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Soft deletes a benefit claim.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "BenefitClaimManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.BenefitClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit claim not found." });

        if (entity.Status == BenefitClaimStatus.Approved || entity.Status == BenefitClaimStatus.Paid)
            return BadRequest(new { error = "Cannot delete approved or paid claims." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Approves a benefit claim.</summary>
    [HttpPost("{id}/approve")]
    [Authorize(Policy = "BenefitClaimManagement")]
    public async Task<IActionResult> Approve(long id, [FromBody] ApproveBenefitClaimRequest request)
    {
        var entity = await _context.BenefitClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit claim not found." });

        if (entity.Status != BenefitClaimStatus.Submitted && entity.Status != BenefitClaimStatus.UnderReview)
            return BadRequest(new { error = "Only submitted or under-review claims can be approved." });

        entity.Status = BenefitClaimStatus.Approved;
        entity.ApprovedAmount = request.ApprovedAmount ?? entity.ClaimAmount;
        entity.ProcessedAt = DateTime.UtcNow;
        entity.ProcessedByUserId = _currentUser.UserId;
        entity.Notes = request.Comments ?? entity.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { status = entity.Status.ToString() });
    }

    /// <summary>Rejects a benefit claim.</summary>
    [HttpPost("{id}/reject")]
    [Authorize(Policy = "BenefitClaimManagement")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectBenefitClaimRequest request)
    {
        var entity = await _context.BenefitClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit claim not found." });

        if (entity.Status != BenefitClaimStatus.Submitted && entity.Status != BenefitClaimStatus.UnderReview)
            return BadRequest(new { error = "Only submitted or under-review claims can be rejected." });

        entity.Status = BenefitClaimStatus.Rejected;
        entity.RejectionReason = request.RejectionReason;
        entity.ProcessedAt = DateTime.UtcNow;
        entity.ProcessedByUserId = _currentUser.UserId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { status = entity.Status.ToString() });
    }

    /// <summary>Processes payment for an approved benefit claim.</summary>
    [HttpPost("{id}/process-payment")]
    [Authorize(Policy = "BenefitClaimManagement")]
    public async Task<IActionResult> ProcessPayment(long id)
    {
        var entity = await _context.BenefitClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit claim not found." });

        if (entity.Status != BenefitClaimStatus.Approved)
            return BadRequest(new { error = "Only approved claims can have payment processed." });

        entity.Status = BenefitClaimStatus.Paid;
        entity.ProcessedAt = DateTime.UtcNow;
        entity.ProcessedByUserId = _currentUser.UserId;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { status = entity.Status.ToString() });
    }
}

// ===========================
// DTOs
// ===========================

public record CreateBenefitClaimRequest(
    long BenefitEnrollmentId,
    DateTime? ClaimDate,
    decimal ClaimAmount,
    string? Currency,
    BenefitClaimType ClaimType,
    string? Description,
    string? DescriptionAr,
    string? Notes
);

public record UpdateBenefitClaimRequest(
    decimal ClaimAmount,
    string? Currency,
    BenefitClaimType ClaimType,
    string? Description,
    string? DescriptionAr,
    string? Notes
);

public record ApproveBenefitClaimRequest(
    decimal? ApprovedAmount,
    string? Comments
);

public record RejectBenefitClaimRequest(
    string RejectionReason
);
