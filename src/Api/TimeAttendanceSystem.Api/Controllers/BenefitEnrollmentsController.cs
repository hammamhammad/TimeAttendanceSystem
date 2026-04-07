using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/benefit-enrollments")]
[Authorize]
public class BenefitEnrollmentsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public BenefitEnrollmentsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists benefit enrollments with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "BenefitEnrollmentRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] long? benefitPlanId = null,
        [FromQuery] BenefitEnrollmentStatus? status = null,
        [FromQuery] long? openEnrollmentPeriodId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.BenefitEnrollments.AsNoTracking().AsQueryable();

        if (employeeId.HasValue)
            query = query.Where(x => x.EmployeeId == employeeId.Value);

        if (benefitPlanId.HasValue)
            query = query.Where(x => x.BenefitPlanId == benefitPlanId.Value);

        if (status.HasValue)
            query = query.Where(x => x.Status == status.Value);

        if (openEnrollmentPeriodId.HasValue)
            query = query.Where(x => x.OpenEnrollmentPeriodId == openEnrollmentPeriodId.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x =>
                x.Employee.FirstName.Contains(search) ||
                x.Employee.LastName.Contains(search) ||
                x.BenefitPlan.Name.Contains(search));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.BenefitPlanId,
                BenefitPlanName = x.BenefitPlan.Name,
                BenefitPlanCode = x.BenefitPlan.Code,
                BenefitType = x.BenefitPlan.BenefitType.ToString(),
                x.BenefitPlanOptionId,
                PlanOptionName = x.PlanOption != null ? x.PlanOption.Name : null,
                x.OpenEnrollmentPeriodId,
                Status = x.Status.ToString(),
                x.EnrollmentDate,
                x.EffectiveDate,
                x.TerminationDate,
                x.EmployeeMonthlyContribution,
                x.EmployerMonthlyContribution,
                x.Currency,
                LifeEventType = x.LifeEventType != null ? x.LifeEventType.ToString() : null,
                DependentsCount = x.Dependents.Count(d => !d.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single benefit enrollment by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "BenefitEnrollmentRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.BenefitEnrollments
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                EmployeeNumber = x.Employee.EmployeeNumber,
                x.BenefitPlanId,
                BenefitPlanName = x.BenefitPlan.Name,
                BenefitPlanCode = x.BenefitPlan.Code,
                BenefitType = x.BenefitPlan.BenefitType.ToString(),
                x.BenefitPlanOptionId,
                PlanOptionName = x.PlanOption != null ? x.PlanOption.Name : null,
                x.OpenEnrollmentPeriodId,
                OpenEnrollmentPeriodName = x.OpenEnrollmentPeriod != null ? x.OpenEnrollmentPeriod.Name : null,
                Status = x.Status.ToString(),
                x.EnrollmentDate,
                x.EffectiveDate,
                x.TerminationDate,
                x.TerminationReason,
                x.EmployeeMonthlyContribution,
                x.EmployerMonthlyContribution,
                x.Currency,
                LifeEventType = x.LifeEventType != null ? x.LifeEventType.ToString() : null,
                x.LifeEventDate,
                x.Notes,
                x.WorkflowInstanceId,
                Dependents = x.Dependents.Where(d => !d.IsDeleted).Select(d => new
                {
                    d.Id,
                    d.EmployeeDependentId,
                    d.FirstName,
                    d.FirstNameAr,
                    d.LastName,
                    d.LastNameAr,
                    Relationship = d.Relationship.ToString(),
                    d.DateOfBirth,
                    d.NationalId,
                    d.CoverageStartDate,
                    d.CoverageEndDate,
                    d.AdditionalPremium,
                    d.Currency,
                    d.IsActive
                }),
                x.CreatedAtUtc,
                x.CreatedBy,
                x.ModifiedAtUtc,
                x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Benefit enrollment not found." });

        return Ok(item);
    }

    /// <summary>Gets enrollments by employee ID.</summary>
    [HttpGet("by-employee/{employeeId}")]
    [Authorize(Policy = "BenefitEnrollmentRead")]
    public async Task<IActionResult> GetByEmployee(long employeeId)
    {
        var items = await _context.BenefitEnrollments
            .AsNoTracking()
            .Where(x => x.EmployeeId == employeeId)
            .OrderByDescending(x => x.CreatedAtUtc)
            .Select(x => new
            {
                x.Id,
                x.BenefitPlanId,
                BenefitPlanName = x.BenefitPlan.Name,
                BenefitPlanCode = x.BenefitPlan.Code,
                BenefitType = x.BenefitPlan.BenefitType.ToString(),
                PlanOptionName = x.PlanOption != null ? x.PlanOption.Name : null,
                Status = x.Status.ToString(),
                x.EnrollmentDate,
                x.EffectiveDate,
                x.TerminationDate,
                x.EmployeeMonthlyContribution,
                x.EmployerMonthlyContribution,
                x.Currency,
                DependentsCount = x.Dependents.Count(d => !d.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount = items.Count });
    }

    /// <summary>Creates a new benefit enrollment.</summary>
    [HttpPost]
    [Authorize(Policy = "BenefitEnrollmentManagement")]
    public async Task<IActionResult> Create([FromBody] CreateBenefitEnrollmentRequest request)
    {
        // Validate plan exists and is active
        var plan = await _context.BenefitPlans.AsNoTracking().FirstOrDefaultAsync(x => x.Id == request.BenefitPlanId);
        if (plan == null || !plan.IsActive)
            return BadRequest(new { error = "Benefit plan not found or inactive." });

        // Validate employee exists
        var employeeExists = await _context.Employees.AnyAsync(x => x.Id == request.EmployeeId);
        if (!employeeExists)
            return BadRequest(new { error = "Employee not found." });

        // Check for duplicate active enrollment
        var hasDuplicate = await _context.BenefitEnrollments
            .AnyAsync(x => x.EmployeeId == request.EmployeeId
                && x.BenefitPlanId == request.BenefitPlanId
                && x.Status == BenefitEnrollmentStatus.Active);
        if (hasDuplicate)
            return BadRequest(new { error = "Employee already has an active enrollment for this benefit plan." });

        var entity = new BenefitEnrollment
        {
            EmployeeId = request.EmployeeId,
            BenefitPlanId = request.BenefitPlanId,
            BenefitPlanOptionId = request.BenefitPlanOptionId,
            OpenEnrollmentPeriodId = request.OpenEnrollmentPeriodId,
            Status = BenefitEnrollmentStatus.PendingApproval,
            EnrollmentDate = request.EnrollmentDate ?? DateTime.UtcNow,
            EffectiveDate = request.EffectiveDate,
            EmployeeMonthlyContribution = request.EmployeeMonthlyContribution,
            EmployerMonthlyContribution = request.EmployerMonthlyContribution,
            Currency = request.Currency ?? "SAR",
            LifeEventType = request.LifeEventType,
            LifeEventDate = request.LifeEventDate,
            Notes = request.Notes,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.BenefitEnrollments.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a benefit enrollment (only if pending).</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "BenefitEnrollmentManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateBenefitEnrollmentRequest request)
    {
        var entity = await _context.BenefitEnrollments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit enrollment not found." });

        if (entity.Status != BenefitEnrollmentStatus.PendingApproval && entity.Status != BenefitEnrollmentStatus.Pending)
            return BadRequest(new { error = "Can only update enrollments in Draft or PendingApproval status." });

        entity.BenefitPlanOptionId = request.BenefitPlanOptionId;
        entity.OpenEnrollmentPeriodId = request.OpenEnrollmentPeriodId;
        entity.EffectiveDate = request.EffectiveDate;
        entity.EmployeeMonthlyContribution = request.EmployeeMonthlyContribution;
        entity.EmployerMonthlyContribution = request.EmployerMonthlyContribution;
        entity.Currency = request.Currency ?? "SAR";
        entity.LifeEventType = request.LifeEventType;
        entity.LifeEventDate = request.LifeEventDate;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Soft deletes a benefit enrollment.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "BenefitEnrollmentManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.BenefitEnrollments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit enrollment not found." });

        if (entity.Status == BenefitEnrollmentStatus.Active)
            return BadRequest(new { error = "Cannot delete an active enrollment. Terminate it first." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Approves a benefit enrollment.</summary>
    [HttpPost("{id}/approve")]
    [Authorize(Policy = "BenefitEnrollmentManagement")]
    public async Task<IActionResult> Approve(long id, [FromBody] ApproveRejectBenefitRequest? request = null)
    {
        var entity = await _context.BenefitEnrollments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit enrollment not found." });

        if (entity.Status != BenefitEnrollmentStatus.PendingApproval)
            return BadRequest(new { error = "Only pending enrollments can be approved." });

        entity.Status = BenefitEnrollmentStatus.Active;
        entity.Notes = request?.Comments ?? entity.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { status = entity.Status.ToString() });
    }

    /// <summary>Rejects a benefit enrollment.</summary>
    [HttpPost("{id}/reject")]
    [Authorize(Policy = "BenefitEnrollmentManagement")]
    public async Task<IActionResult> Reject(long id, [FromBody] ApproveRejectBenefitRequest request)
    {
        var entity = await _context.BenefitEnrollments.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit enrollment not found." });

        if (entity.Status != BenefitEnrollmentStatus.PendingApproval)
            return BadRequest(new { error = "Only pending enrollments can be rejected." });

        entity.Status = BenefitEnrollmentStatus.Cancelled;
        entity.Notes = request.Comments;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { status = entity.Status.ToString() });
    }

    // ===== DEPENDENT MANAGEMENT =====

    /// <summary>Adds a dependent to an enrollment.</summary>
    [HttpPost("{enrollmentId}/dependents")]
    [Authorize(Policy = "BenefitEnrollmentManagement")]
    public async Task<IActionResult> AddDependent(long enrollmentId, [FromBody] CreateBenefitDependentRequest request)
    {
        var enrollment = await _context.BenefitEnrollments
            .Include(x => x.BenefitPlan)
            .Include(x => x.Dependents.Where(d => !d.IsDeleted))
            .FirstOrDefaultAsync(x => x.Id == enrollmentId);

        if (enrollment == null)
            return NotFound(new { error = "Benefit enrollment not found." });

        if (enrollment.BenefitPlan.MaxDependents.HasValue &&
            enrollment.Dependents.Count >= enrollment.BenefitPlan.MaxDependents.Value)
            return BadRequest(new { error = $"Maximum number of dependents ({enrollment.BenefitPlan.MaxDependents.Value}) reached." });

        var entity = new BenefitDependent
        {
            BenefitEnrollmentId = enrollmentId,
            EmployeeDependentId = request.EmployeeDependentId,
            FirstName = request.FirstName,
            FirstNameAr = request.FirstNameAr,
            LastName = request.LastName,
            LastNameAr = request.LastNameAr,
            Relationship = request.Relationship,
            DateOfBirth = request.DateOfBirth,
            NationalId = request.NationalId,
            CoverageStartDate = request.CoverageStartDate,
            CoverageEndDate = request.CoverageEndDate,
            AdditionalPremium = request.AdditionalPremium,
            Currency = request.Currency ?? "SAR",
            IsActive = true,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.BenefitDependents.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Removes a dependent from an enrollment.</summary>
    [HttpDelete("{enrollmentId}/dependents/{dependentId}")]
    [Authorize(Policy = "BenefitEnrollmentManagement")]
    public async Task<IActionResult> RemoveDependent(long enrollmentId, long dependentId)
    {
        var entity = await _context.BenefitDependents
            .FirstOrDefaultAsync(x => x.Id == dependentId && x.BenefitEnrollmentId == enrollmentId);

        if (entity == null)
            return NotFound(new { error = "Benefit dependent not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }
}

// ===========================
// DTOs
// ===========================

public record CreateBenefitEnrollmentRequest(
    long EmployeeId,
    long BenefitPlanId,
    long? BenefitPlanOptionId,
    long? OpenEnrollmentPeriodId,
    DateTime? EnrollmentDate,
    DateTime EffectiveDate,
    decimal EmployeeMonthlyContribution,
    decimal EmployerMonthlyContribution,
    string? Currency,
    LifeEventType? LifeEventType,
    DateTime? LifeEventDate,
    string? Notes
);

public record UpdateBenefitEnrollmentRequest(
    long? BenefitPlanOptionId,
    long? OpenEnrollmentPeriodId,
    DateTime EffectiveDate,
    decimal EmployeeMonthlyContribution,
    decimal EmployerMonthlyContribution,
    string? Currency,
    LifeEventType? LifeEventType,
    DateTime? LifeEventDate,
    string? Notes
);

public record ApproveRejectBenefitRequest(
    string? Comments
);

public record CreateBenefitDependentRequest(
    long? EmployeeDependentId,
    string FirstName,
    string? FirstNameAr,
    string LastName,
    string? LastNameAr,
    DependentRelationship Relationship,
    DateTime? DateOfBirth,
    string? NationalId,
    DateTime CoverageStartDate,
    DateTime? CoverageEndDate,
    decimal AdditionalPremium,
    string? Currency
);
