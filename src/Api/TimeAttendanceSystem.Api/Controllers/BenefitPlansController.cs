using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/benefit-plans")]
[Authorize]
public class BenefitPlansController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public BenefitPlansController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    // ===== BENEFIT PLANS CRUD =====

    /// <summary>Lists benefit plans with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "BenefitPlanRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] BenefitType? benefitType = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] int? planYear = null,
        [FromQuery] long? insuranceProviderId = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.BenefitPlans.AsNoTracking().AsQueryable();

        if (benefitType.HasValue)
            query = query.Where(x => x.BenefitType == benefitType.Value);

        if (isActive.HasValue)
            query = query.Where(x => x.IsActive == isActive.Value);

        if (planYear.HasValue)
            query = query.Where(x => x.PlanYear == planYear.Value);

        if (insuranceProviderId.HasValue)
            query = query.Where(x => x.InsuranceProviderId == insuranceProviderId.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || x.Code.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                x.Description,
                x.DescriptionAr,
                BenefitType = x.BenefitType.ToString(),
                x.InsuranceProviderId,
                InsuranceProviderName = x.InsuranceProvider != null ? x.InsuranceProvider.Name : null,
                x.PlanYear,
                x.EffectiveStartDate,
                x.EffectiveEndDate,
                x.EmployeePremiumAmount,
                x.EmployerPremiumAmount,
                x.Currency,
                x.MaxDependents,
                x.DependentPremiumAmount,
                x.IsActive,
                OptionsCount = x.Options.Count(o => !o.IsDeleted),
                EnrollmentsCount = x.Enrollments.Count(e => !e.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single benefit plan by ID with options and eligibility rules.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "BenefitPlanRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.BenefitPlans
            .AsNoTracking()
            .Include(x => x.InsuranceProvider)
            .Include(x => x.Options.Where(o => !o.IsDeleted))
            .Include(x => x.EligibilityRules.Where(r => !r.IsDeleted))
                .ThenInclude(r => r.Department)
            .Include(x => x.EligibilityRules.Where(r => !r.IsDeleted))
                .ThenInclude(r => r.Branch)
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                x.Description,
                x.DescriptionAr,
                BenefitType = x.BenefitType.ToString(),
                x.InsuranceProviderId,
                InsuranceProviderName = x.InsuranceProvider != null ? x.InsuranceProvider.Name : null,
                x.PlanYear,
                x.EffectiveStartDate,
                x.EffectiveEndDate,
                x.EmployeePremiumAmount,
                x.EmployerPremiumAmount,
                x.Currency,
                x.CoverageDetails,
                x.CoverageDetailsAr,
                x.MaxDependents,
                x.DependentPremiumAmount,
                x.IsActive,
                Options = x.Options.Where(o => !o.IsDeleted).Select(o => new
                {
                    o.Id,
                    o.Name,
                    o.NameAr,
                    o.Description,
                    o.EmployeeCost,
                    o.EmployerCost,
                    o.Currency,
                    CoverageLevel = o.CoverageLevel.ToString(),
                    o.IsDefault,
                    o.IsActive
                }),
                EligibilityRules = x.EligibilityRules.Where(r => !r.IsDeleted).Select(r => new
                {
                    r.Id,
                    RuleType = r.RuleType.ToString(),
                    r.MinServiceMonths,
                    r.MinJobGradeLevel,
                    r.MaxJobGradeLevel,
                    EmploymentStatusRequired = r.EmploymentStatusRequired != null ? r.EmploymentStatusRequired.ToString() : null,
                    ContractTypeRequired = r.ContractTypeRequired != null ? r.ContractTypeRequired.ToString() : null,
                    r.DepartmentId,
                    DepartmentName = r.Department != null ? r.Department.Name : null,
                    r.BranchId,
                    BranchName = r.Branch != null ? r.Branch.Name : null,
                    r.IsActive
                }),
                x.CreatedAtUtc,
                x.CreatedBy,
                x.ModifiedAtUtc,
                x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Benefit plan not found." });

        return Ok(item);
    }

    /// <summary>Creates a new benefit plan.</summary>
    [HttpPost]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> Create([FromBody] CreateBenefitPlanRequest request)
    {
        var codeExists = await _context.BenefitPlans.AnyAsync(x => x.Code == request.Code);
        if (codeExists)
            return BadRequest(new { error = "A benefit plan with this code already exists." });

        var entity = new BenefitPlan
        {
            Code = request.Code,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            BenefitType = request.BenefitType,
            InsuranceProviderId = request.InsuranceProviderId,
            PlanYear = request.PlanYear,
            EffectiveStartDate = request.EffectiveStartDate,
            EffectiveEndDate = request.EffectiveEndDate,
            EmployeePremiumAmount = request.EmployeePremiumAmount,
            EmployerPremiumAmount = request.EmployerPremiumAmount,
            Currency = request.Currency ?? "SAR",
            CoverageDetails = request.CoverageDetails,
            CoverageDetailsAr = request.CoverageDetailsAr,
            MaxDependents = request.MaxDependents,
            DependentPremiumAmount = request.DependentPremiumAmount,
            IsActive = request.IsActive,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.BenefitPlans.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an existing benefit plan.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateBenefitPlanRequest request)
    {
        var entity = await _context.BenefitPlans.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit plan not found." });

        if (entity.Code != request.Code)
        {
            var codeExists = await _context.BenefitPlans.AnyAsync(x => x.Code == request.Code && x.Id != id);
            if (codeExists)
                return BadRequest(new { error = "A benefit plan with this code already exists." });
        }

        entity.Code = request.Code;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.DescriptionAr = request.DescriptionAr;
        entity.BenefitType = request.BenefitType;
        entity.InsuranceProviderId = request.InsuranceProviderId;
        entity.PlanYear = request.PlanYear;
        entity.EffectiveStartDate = request.EffectiveStartDate;
        entity.EffectiveEndDate = request.EffectiveEndDate;
        entity.EmployeePremiumAmount = request.EmployeePremiumAmount;
        entity.EmployerPremiumAmount = request.EmployerPremiumAmount;
        entity.Currency = request.Currency ?? "SAR";
        entity.CoverageDetails = request.CoverageDetails;
        entity.CoverageDetailsAr = request.CoverageDetailsAr;
        entity.MaxDependents = request.MaxDependents;
        entity.DependentPremiumAmount = request.DependentPremiumAmount;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Soft deletes a benefit plan.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.BenefitPlans.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null)
            return NotFound(new { error = "Benefit plan not found." });

        var hasActiveEnrollments = await _context.BenefitEnrollments
            .AnyAsync(x => x.BenefitPlanId == id && x.Status == BenefitEnrollmentStatus.Active);
        if (hasActiveEnrollments)
            return BadRequest(new { error = "Cannot delete benefit plan with active enrollments." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Gets active benefit plans for dropdown lists.</summary>
    [HttpGet("dropdown")]
    public async Task<IActionResult> GetDropdown([FromQuery] BenefitType? benefitType = null)
    {
        var query = _context.BenefitPlans
            .AsNoTracking()
            .Where(x => x.IsActive && x.EffectiveEndDate >= DateTime.UtcNow.Date);

        if (benefitType.HasValue)
            query = query.Where(x => x.BenefitType == benefitType.Value);

        var items = await query
            .OrderBy(x => x.Name)
            .Select(x => new
            {
                x.Id,
                x.Code,
                x.Name,
                x.NameAr,
                BenefitType = x.BenefitType.ToString(),
                x.EmployeePremiumAmount,
                x.EmployerPremiumAmount,
                x.Currency
            })
            .ToListAsync();

        return Ok(items);
    }

    // ===== NESTED OPTIONS CRUD =====

    /// <summary>Gets options for a benefit plan.</summary>
    [HttpGet("{planId}/options")]
    [Authorize(Policy = "BenefitPlanRead")]
    public async Task<IActionResult> GetOptions(long planId)
    {
        var planExists = await _context.BenefitPlans.AnyAsync(x => x.Id == planId);
        if (!planExists)
            return NotFound(new { error = "Benefit plan not found." });

        var items = await _context.BenefitPlanOptions
            .AsNoTracking()
            .Where(x => x.BenefitPlanId == planId)
            .OrderBy(x => x.Name)
            .Select(x => new
            {
                x.Id,
                x.BenefitPlanId,
                x.Name,
                x.NameAr,
                x.Description,
                x.EmployeeCost,
                x.EmployerCost,
                x.Currency,
                CoverageLevel = x.CoverageLevel.ToString(),
                x.IsDefault,
                x.IsActive
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount = items.Count });
    }

    /// <summary>Creates a new option for a benefit plan.</summary>
    [HttpPost("{planId}/options")]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> CreateOption(long planId, [FromBody] CreateBenefitPlanOptionRequest request)
    {
        var planExists = await _context.BenefitPlans.AnyAsync(x => x.Id == planId);
        if (!planExists)
            return NotFound(new { error = "Benefit plan not found." });

        var entity = new BenefitPlanOption
        {
            BenefitPlanId = planId,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            EmployeeCost = request.EmployeeCost,
            EmployerCost = request.EmployerCost,
            Currency = request.Currency ?? "SAR",
            CoverageLevel = request.CoverageLevel,
            IsDefault = request.IsDefault,
            IsActive = request.IsActive,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.BenefitPlanOptions.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates a benefit plan option.</summary>
    [HttpPut("{planId}/options/{optionId}")]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> UpdateOption(long planId, long optionId, [FromBody] UpdateBenefitPlanOptionRequest request)
    {
        var entity = await _context.BenefitPlanOptions
            .FirstOrDefaultAsync(x => x.Id == optionId && x.BenefitPlanId == planId);

        if (entity == null)
            return NotFound(new { error = "Benefit plan option not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.EmployeeCost = request.EmployeeCost;
        entity.EmployerCost = request.EmployerCost;
        entity.Currency = request.Currency ?? "SAR";
        entity.CoverageLevel = request.CoverageLevel;
        entity.IsDefault = request.IsDefault;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Deletes a benefit plan option.</summary>
    [HttpDelete("{planId}/options/{optionId}")]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> DeleteOption(long planId, long optionId)
    {
        var entity = await _context.BenefitPlanOptions
            .FirstOrDefaultAsync(x => x.Id == optionId && x.BenefitPlanId == planId);

        if (entity == null)
            return NotFound(new { error = "Benefit plan option not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // ===== NESTED ELIGIBILITY RULES CRUD =====

    /// <summary>Gets eligibility rules for a benefit plan.</summary>
    [HttpGet("{planId}/eligibility-rules")]
    [Authorize(Policy = "BenefitPlanRead")]
    public async Task<IActionResult> GetEligibilityRules(long planId)
    {
        var planExists = await _context.BenefitPlans.AnyAsync(x => x.Id == planId);
        if (!planExists)
            return NotFound(new { error = "Benefit plan not found." });

        var items = await _context.BenefitEligibilityRules
            .AsNoTracking()
            .Where(x => x.BenefitPlanId == planId)
            .Select(x => new
            {
                x.Id,
                x.BenefitPlanId,
                RuleType = x.RuleType.ToString(),
                x.MinServiceMonths,
                x.MinJobGradeLevel,
                x.MaxJobGradeLevel,
                EmploymentStatusRequired = x.EmploymentStatusRequired != null ? x.EmploymentStatusRequired.ToString() : null,
                ContractTypeRequired = x.ContractTypeRequired != null ? x.ContractTypeRequired.ToString() : null,
                x.DepartmentId,
                DepartmentName = x.Department != null ? x.Department.Name : null,
                x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                x.IsActive
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount = items.Count });
    }

    /// <summary>Creates a new eligibility rule for a benefit plan.</summary>
    [HttpPost("{planId}/eligibility-rules")]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> CreateEligibilityRule(long planId, [FromBody] CreateBenefitEligibilityRuleRequest request)
    {
        var planExists = await _context.BenefitPlans.AnyAsync(x => x.Id == planId);
        if (!planExists)
            return NotFound(new { error = "Benefit plan not found." });

        var entity = new BenefitEligibilityRule
        {
            BenefitPlanId = planId,
            RuleType = request.RuleType,
            MinServiceMonths = request.MinServiceMonths,
            MinJobGradeLevel = request.MinJobGradeLevel,
            MaxJobGradeLevel = request.MaxJobGradeLevel,
            EmploymentStatusRequired = request.EmploymentStatusRequired,
            ContractTypeRequired = request.ContractTypeRequired,
            DepartmentId = request.DepartmentId,
            BranchId = request.BranchId,
            IsActive = request.IsActive,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.BenefitEligibilityRules.Add(entity);
        await _context.SaveChangesAsync();

        return Ok(new { id = entity.Id });
    }

    /// <summary>Updates an eligibility rule.</summary>
    [HttpPut("{planId}/eligibility-rules/{ruleId}")]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> UpdateEligibilityRule(long planId, long ruleId, [FromBody] UpdateBenefitEligibilityRuleRequest request)
    {
        var entity = await _context.BenefitEligibilityRules
            .FirstOrDefaultAsync(x => x.Id == ruleId && x.BenefitPlanId == planId);

        if (entity == null)
            return NotFound(new { error = "Eligibility rule not found." });

        entity.RuleType = request.RuleType;
        entity.MinServiceMonths = request.MinServiceMonths;
        entity.MinJobGradeLevel = request.MinJobGradeLevel;
        entity.MaxJobGradeLevel = request.MaxJobGradeLevel;
        entity.EmploymentStatusRequired = request.EmploymentStatusRequired;
        entity.ContractTypeRequired = request.ContractTypeRequired;
        entity.DepartmentId = request.DepartmentId;
        entity.BranchId = request.BranchId;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Deletes an eligibility rule.</summary>
    [HttpDelete("{planId}/eligibility-rules/{ruleId}")]
    [Authorize(Policy = "BenefitPlanManagement")]
    public async Task<IActionResult> DeleteEligibilityRule(long planId, long ruleId)
    {
        var entity = await _context.BenefitEligibilityRules
            .FirstOrDefaultAsync(x => x.Id == ruleId && x.BenefitPlanId == planId);

        if (entity == null)
            return NotFound(new { error = "Eligibility rule not found." });

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

public record CreateBenefitPlanRequest(
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    BenefitType BenefitType,
    long? InsuranceProviderId,
    int PlanYear,
    DateTime EffectiveStartDate,
    DateTime EffectiveEndDate,
    decimal EmployeePremiumAmount,
    decimal EmployerPremiumAmount,
    string? Currency,
    string? CoverageDetails,
    string? CoverageDetailsAr,
    int? MaxDependents,
    decimal DependentPremiumAmount,
    bool IsActive
);

public record UpdateBenefitPlanRequest(
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    BenefitType BenefitType,
    long? InsuranceProviderId,
    int PlanYear,
    DateTime EffectiveStartDate,
    DateTime EffectiveEndDate,
    decimal EmployeePremiumAmount,
    decimal EmployerPremiumAmount,
    string? Currency,
    string? CoverageDetails,
    string? CoverageDetailsAr,
    int? MaxDependents,
    decimal DependentPremiumAmount,
    bool IsActive
);

public record CreateBenefitPlanOptionRequest(
    string Name,
    string? NameAr,
    string? Description,
    decimal EmployeeCost,
    decimal EmployerCost,
    string? Currency,
    CoverageLevel CoverageLevel,
    bool IsDefault,
    bool IsActive
);

public record UpdateBenefitPlanOptionRequest(
    string Name,
    string? NameAr,
    string? Description,
    decimal EmployeeCost,
    decimal EmployerCost,
    string? Currency,
    CoverageLevel CoverageLevel,
    bool IsDefault,
    bool IsActive
);

public record CreateBenefitEligibilityRuleRequest(
    EligibilityRuleType RuleType,
    int? MinServiceMonths,
    int? MinJobGradeLevel,
    int? MaxJobGradeLevel,
    EmploymentStatus? EmploymentStatusRequired,
    ContractType? ContractTypeRequired,
    long? DepartmentId,
    long? BranchId,
    bool IsActive
);

public record UpdateBenefitEligibilityRuleRequest(
    EligibilityRuleType RuleType,
    int? MinServiceMonths,
    int? MinJobGradeLevel,
    int? MaxJobGradeLevel,
    EmploymentStatus? EmploymentStatusRequired,
    ContractType? ContractTypeRequired,
    long? DepartmentId,
    long? BranchId,
    bool IsActive
);
