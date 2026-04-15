using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/payroll-settings")]
[Authorize]
public class PayrollSettingsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public PayrollSettingsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    // ── Tax Configuration ──────────────────────────────────────────

    /// <summary>Gets all tax configurations.</summary>
    [HttpGet("tax-configs")]
    public async Task<IActionResult> GetTaxConfigs([FromQuery] long? branchId)
    {
        var query = _context.TaxConfigurations.Where(t => !t.IsDeleted).AsQueryable();

        if (branchId.HasValue)
            query = query.Where(t => t.BranchId == branchId.Value);

        var items = await query
            .OrderByDescending(t => t.EffectiveDate)
            .Select(t => new
            {
                t.Id, t.Name, t.NameAr, t.BranchId,
                BranchName = t.Branch != null ? t.Branch.Name : (string?)null,
                t.EffectiveDate, t.IsActive,
                Brackets = t.Brackets.Where(b => !b.IsDeleted).OrderBy(b => b.MinAmount).Select(b => new
                {
                    b.Id, b.MinAmount, b.MaxAmount, b.Rate, b.FixedAmount
                }).ToList()
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Gets a tax configuration by ID.</summary>
    [HttpGet("tax-configs/{id}")]
    public async Task<IActionResult> GetTaxConfig(long id)
    {
        var item = await _context.TaxConfigurations
            .Where(t => t.Id == id && !t.IsDeleted)
            .Select(t => new
            {
                t.Id, t.Name, t.NameAr, t.BranchId,
                BranchName = t.Branch != null ? t.Branch.Name : (string?)null,
                t.EffectiveDate, t.IsActive,
                Brackets = t.Brackets.Where(b => !b.IsDeleted).OrderBy(b => b.MinAmount).Select(b => new
                {
                    b.Id, b.MinAmount, b.MaxAmount, b.Rate, b.FixedAmount
                }).ToList()
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Tax configuration not found." });

        return Ok(item);
    }

    /// <summary>Creates a tax configuration with brackets.</summary>
    [HttpPost("tax-configs")]
    public async Task<IActionResult> CreateTaxConfig([FromBody] CreateTaxConfigRequest request)
    {
        var entity = new TaxConfiguration
        {
            Name = request.Name.Trim(),
            NameAr = request.NameAr?.Trim(),
            BranchId = request.BranchId,
            EffectiveDate = request.EffectiveDate,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.TaxConfigurations.Add(entity);
        await _context.SaveChangesAsync();

        if (request.Brackets is { Count: > 0 })
        {
            foreach (var b in request.Brackets)
            {
                _context.TaxBrackets.Add(new TaxBracket
                {
                    TaxConfigurationId = entity.Id,
                    MinAmount = b.MinAmount,
                    MaxAmount = b.MaxAmount,
                    Rate = b.Rate,
                    FixedAmount = b.FixedAmount,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = _currentUser.Username ?? "SYSTEM"
                });
            }
            await _context.SaveChangesAsync();
        }

        return CreatedAtAction(nameof(GetTaxConfig), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates a tax configuration and its brackets.</summary>
    [HttpPut("tax-configs/{id}")]
    public async Task<IActionResult> UpdateTaxConfig(long id, [FromBody] UpdateTaxConfigRequest request)
    {
        var entity = await _context.TaxConfigurations
            .Include(t => t.Brackets.Where(b => !b.IsDeleted))
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Tax configuration not found." });

        entity.Name = request.Name.Trim();
        entity.NameAr = request.NameAr?.Trim();
        entity.BranchId = request.BranchId;
        entity.EffectiveDate = request.EffectiveDate;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        // Soft-delete removed brackets
        var incomingIds = request.Brackets?.Where(b => b.Id.HasValue).Select(b => b.Id!.Value).ToHashSet() ?? new();
        foreach (var existing in entity.Brackets)
        {
            if (!incomingIds.Contains(existing.Id))
            {
                existing.IsDeleted = true;
                existing.ModifiedAtUtc = DateTime.UtcNow;
                existing.ModifiedBy = _currentUser.Username;
            }
        }

        if (request.Brackets != null)
        {
            foreach (var b in request.Brackets)
            {
                if (b.Id.HasValue)
                {
                    var existing = entity.Brackets.FirstOrDefault(x => x.Id == b.Id.Value);
                    if (existing != null)
                    {
                        existing.MinAmount = b.MinAmount;
                        existing.MaxAmount = b.MaxAmount;
                        existing.Rate = b.Rate;
                        existing.FixedAmount = b.FixedAmount;
                        existing.ModifiedAtUtc = DateTime.UtcNow;
                        existing.ModifiedBy = _currentUser.Username;
                    }
                }
                else
                {
                    _context.TaxBrackets.Add(new TaxBracket
                    {
                        TaxConfigurationId = entity.Id,
                        MinAmount = b.MinAmount,
                        MaxAmount = b.MaxAmount,
                        Rate = b.Rate,
                        FixedAmount = b.FixedAmount,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = _currentUser.Username ?? "SYSTEM"
                    });
                }
            }
        }

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Deletes a tax configuration.</summary>
    [HttpDelete("tax-configs/{id}")]
    public async Task<IActionResult> DeleteTaxConfig(long id)
    {
        var entity = await _context.TaxConfigurations
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Tax configuration not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // ── Social Insurance ───────────────────────────────────────────

    /// <summary>Gets all social insurance configurations.</summary>
    [HttpGet("social-insurance")]
    public async Task<IActionResult> GetSocialInsuranceConfigs([FromQuery] long? branchId)
    {
        var query = _context.SocialInsuranceConfigs.Where(s => !s.IsDeleted).AsQueryable();

        if (branchId.HasValue)
            query = query.Where(s => s.BranchId == branchId.Value);

        var items = await query
            .OrderByDescending(s => s.EffectiveDate)
            .Select(s => new
            {
                s.Id, s.Name, s.NameAr, s.BranchId,
                BranchName = s.Branch != null ? s.Branch.Name : (string?)null,
                s.EmployeeContributionRate, s.EmployerContributionRate,
                s.MaxInsurableSalary, s.EffectiveDate, s.IsActive,
                s.AppliesToNationalityCode
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Gets a social insurance configuration by ID.</summary>
    [HttpGet("social-insurance/{id}")]
    public async Task<IActionResult> GetSocialInsuranceConfig(long id)
    {
        var item = await _context.SocialInsuranceConfigs
            .Where(s => s.Id == id && !s.IsDeleted)
            .Select(s => new
            {
                s.Id, s.Name, s.NameAr, s.BranchId,
                BranchName = s.Branch != null ? s.Branch.Name : (string?)null,
                s.EmployeeContributionRate, s.EmployerContributionRate,
                s.MaxInsurableSalary, s.EffectiveDate, s.IsActive,
                s.AppliesToNationalityCode
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Social insurance configuration not found." });

        return Ok(item);
    }

    /// <summary>Creates a social insurance configuration.</summary>
    [HttpPost("social-insurance")]
    public async Task<IActionResult> CreateSocialInsurance([FromBody] CreateSocialInsuranceRequest request)
    {
        var entity = new SocialInsuranceConfig
        {
            Name = request.Name.Trim(),
            NameAr = request.NameAr?.Trim(),
            BranchId = request.BranchId,
            EmployeeContributionRate = request.EmployeeContributionRate,
            EmployerContributionRate = request.EmployerContributionRate,
            MaxInsurableSalary = request.MaxInsurableSalary,
            EffectiveDate = request.EffectiveDate,
            IsActive = request.IsActive,
            AppliesToNationalityCode = NormalizeNationality(request.AppliesToNationalityCode),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.SocialInsuranceConfigs.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSocialInsuranceConfig), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates a social insurance configuration.</summary>
    [HttpPut("social-insurance/{id}")]
    public async Task<IActionResult> UpdateSocialInsurance(long id, [FromBody] UpdateSocialInsuranceRequest request)
    {
        var entity = await _context.SocialInsuranceConfigs
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Social insurance configuration not found." });

        entity.Name = request.Name.Trim();
        entity.NameAr = request.NameAr?.Trim();
        entity.BranchId = request.BranchId;
        entity.EmployeeContributionRate = request.EmployeeContributionRate;
        entity.EmployerContributionRate = request.EmployerContributionRate;
        entity.MaxInsurableSalary = request.MaxInsurableSalary;
        entity.EffectiveDate = request.EffectiveDate;
        entity.IsActive = request.IsActive;
        entity.AppliesToNationalityCode = NormalizeNationality(request.AppliesToNationalityCode);
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    private static string? NormalizeNationality(string? code)
    {
        if (string.IsNullOrWhiteSpace(code)) return null;
        return code.Trim().ToUpperInvariant();
    }

    /// <summary>Deletes a social insurance configuration.</summary>
    [HttpDelete("social-insurance/{id}")]
    public async Task<IActionResult> DeleteSocialInsurance(long id)
    {
        var entity = await _context.SocialInsuranceConfigs
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Social insurance configuration not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // ── Insurance Providers ────────────────────────────────────────

    /// <summary>Gets all insurance providers.</summary>
    [HttpGet("insurance-providers")]
    public async Task<IActionResult> GetInsuranceProviders()
    {
        var items = await _context.InsuranceProviders
            .Where(p => !p.IsDeleted)
            .OrderBy(p => p.Name)
            .Select(p => new
            {
                p.Id, p.Name, p.NameAr, p.ContactPerson, p.Phone, p.Email,
                p.PolicyNumber, InsuranceType = (int)p.InsuranceType, p.IsActive,
                EmployeeCount = p.EmployeeInsurances.Count(ei => !ei.IsDeleted && ei.IsActive)
            })
            .ToListAsync();

        return Ok(items);
    }

    /// <summary>Gets an insurance provider by ID.</summary>
    [HttpGet("insurance-providers/{id}")]
    public async Task<IActionResult> GetInsuranceProvider(long id)
    {
        var item = await _context.InsuranceProviders
            .Where(p => p.Id == id && !p.IsDeleted)
            .Select(p => new
            {
                p.Id, p.Name, p.NameAr, p.ContactPerson, p.Phone, p.Email,
                p.PolicyNumber, InsuranceType = (int)p.InsuranceType, p.IsActive,
                EmployeeCount = p.EmployeeInsurances.Count(ei => !ei.IsDeleted && ei.IsActive)
            })
            .FirstOrDefaultAsync();

        if (item == null)
            return NotFound(new { error = "Insurance provider not found." });

        return Ok(item);
    }

    /// <summary>Creates an insurance provider.</summary>
    [HttpPost("insurance-providers")]
    public async Task<IActionResult> CreateInsuranceProvider([FromBody] CreateInsuranceProviderRequest request)
    {
        var entity = new InsuranceProvider
        {
            Name = request.Name.Trim(),
            NameAr = request.NameAr?.Trim(),
            ContactPerson = request.ContactPerson?.Trim(),
            Phone = request.Phone?.Trim(),
            Email = request.Email?.Trim(),
            PolicyNumber = request.PolicyNumber?.Trim(),
            InsuranceType = (InsuranceType)request.InsuranceType,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.InsuranceProviders.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetInsuranceProvider), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an insurance provider.</summary>
    [HttpPut("insurance-providers/{id}")]
    public async Task<IActionResult> UpdateInsuranceProvider(long id, [FromBody] UpdateInsuranceProviderRequest request)
    {
        var entity = await _context.InsuranceProviders
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Insurance provider not found." });

        entity.Name = request.Name.Trim();
        entity.NameAr = request.NameAr?.Trim();
        entity.ContactPerson = request.ContactPerson?.Trim();
        entity.Phone = request.Phone?.Trim();
        entity.Email = request.Email?.Trim();
        entity.PolicyNumber = request.PolicyNumber?.Trim();
        entity.InsuranceType = (InsuranceType)request.InsuranceType;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Deletes an insurance provider.</summary>
    [HttpDelete("insurance-providers/{id}")]
    public async Task<IActionResult> DeleteInsuranceProvider(long id)
    {
        var entity = await _context.InsuranceProviders
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);

        if (entity == null)
            return NotFound(new { error = "Insurance provider not found." });

        var hasActiveInsurances = await _context.EmployeeInsurances
            .AnyAsync(ei => ei.InsuranceProviderId == id && !ei.IsDeleted && ei.IsActive);

        if (hasActiveInsurances)
            return BadRequest(new { error = "Cannot delete provider with active employee insurances." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // ── Payroll Calendar Policy ────────────────────────────────────
    //
    // Drives the daily-rate basis used by absence deductions, proration, and the
    // hourly basis for overtime. Branch-specific beats tenant-wide; latest effective wins.
    // Falls back to FixedBasis(30) if no row exists (pre-fix backward-compat).

    /// <summary>Gets payroll calendar policies.</summary>
    [HttpGet("calendar-policies")]
    public async Task<IActionResult> GetCalendarPolicies([FromQuery] long? branchId)
    {
        var query = _context.PayrollCalendarPolicies.Where(p => !p.IsDeleted).AsQueryable();
        if (branchId.HasValue) query = query.Where(p => p.BranchId == branchId.Value);

        var items = await query
            .OrderByDescending(p => p.EffectiveFromDate)
            .Select(p => new
            {
                p.Id,
                p.BranchId,
                BranchName = p.Branch != null ? p.Branch.Name : (string?)null,
                BasisType = (int)p.BasisType,
                p.FixedBasisDays,
                p.StandardHoursPerDay,
                p.TreatPublicHolidaysAsPaid,
                p.EffectiveFromDate,
                p.EffectiveToDate,
                p.IsActive
            })
            .ToListAsync();
        return Ok(items);
    }

    /// <summary>Gets a payroll calendar policy by ID.</summary>
    [HttpGet("calendar-policies/{id}")]
    public async Task<IActionResult> GetCalendarPolicy(long id)
    {
        var item = await _context.PayrollCalendarPolicies
            .Where(p => p.Id == id && !p.IsDeleted)
            .Select(p => new
            {
                p.Id,
                p.BranchId,
                BranchName = p.Branch != null ? p.Branch.Name : (string?)null,
                BasisType = (int)p.BasisType,
                p.FixedBasisDays,
                p.StandardHoursPerDay,
                p.TreatPublicHolidaysAsPaid,
                p.EffectiveFromDate,
                p.EffectiveToDate,
                p.IsActive
            })
            .FirstOrDefaultAsync();
        if (item == null) return NotFound(new { error = "Calendar policy not found." });
        return Ok(item);
    }

    /// <summary>Creates a payroll calendar policy.</summary>
    [HttpPost("calendar-policies")]
    public async Task<IActionResult> CreateCalendarPolicy([FromBody] CreatePayrollCalendarPolicyRequest request)
    {
        if (!Enum.IsDefined(typeof(PayrollDailyBasisType), request.BasisType))
            return BadRequest(new { error = "Invalid BasisType. Use 1=CalendarDays, 2=WorkingDays, 3=FixedBasis." });
        if ((PayrollDailyBasisType)request.BasisType == PayrollDailyBasisType.FixedBasis
            && (!request.FixedBasisDays.HasValue || request.FixedBasisDays.Value <= 0))
            return BadRequest(new { error = "FixedBasisDays must be provided and > 0 when BasisType is FixedBasis." });
        if (request.StandardHoursPerDay <= 0)
            return BadRequest(new { error = "StandardHoursPerDay must be > 0." });

        var entity = new PayrollCalendarPolicy
        {
            BranchId = request.BranchId,
            BasisType = (PayrollDailyBasisType)request.BasisType,
            FixedBasisDays = request.FixedBasisDays,
            StandardHoursPerDay = request.StandardHoursPerDay,
            TreatPublicHolidaysAsPaid = request.TreatPublicHolidaysAsPaid,
            EffectiveFromDate = request.EffectiveFromDate,
            EffectiveToDate = request.EffectiveToDate,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };
        _context.PayrollCalendarPolicies.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCalendarPolicy), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates a payroll calendar policy.</summary>
    [HttpPut("calendar-policies/{id}")]
    public async Task<IActionResult> UpdateCalendarPolicy(long id, [FromBody] UpdatePayrollCalendarPolicyRequest request)
    {
        var entity = await _context.PayrollCalendarPolicies
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        if (entity == null) return NotFound(new { error = "Calendar policy not found." });

        if (!Enum.IsDefined(typeof(PayrollDailyBasisType), request.BasisType))
            return BadRequest(new { error = "Invalid BasisType." });
        if ((PayrollDailyBasisType)request.BasisType == PayrollDailyBasisType.FixedBasis
            && (!request.FixedBasisDays.HasValue || request.FixedBasisDays.Value <= 0))
            return BadRequest(new { error = "FixedBasisDays must be provided and > 0 when BasisType is FixedBasis." });

        entity.BranchId = request.BranchId;
        entity.BasisType = (PayrollDailyBasisType)request.BasisType;
        entity.FixedBasisDays = request.FixedBasisDays;
        entity.StandardHoursPerDay = request.StandardHoursPerDay;
        entity.TreatPublicHolidaysAsPaid = request.TreatPublicHolidaysAsPaid;
        entity.EffectiveFromDate = request.EffectiveFromDate;
        entity.EffectiveToDate = request.EffectiveToDate;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>Deletes a payroll calendar policy (soft delete).</summary>
    [HttpDelete("calendar-policies/{id}")]
    public async Task<IActionResult> DeleteCalendarPolicy(long id)
    {
        var entity = await _context.PayrollCalendarPolicies
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        if (entity == null) return NotFound(new { error = "Calendar policy not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

// ── Request Records ────────────────────────────────────────────────

public record CreateTaxConfigRequest(
    string Name,
    string? NameAr,
    long? BranchId,
    DateTime EffectiveDate,
    bool IsActive,
    List<TaxBracketRequest>? Brackets
);

public record UpdateTaxConfigRequest(
    string Name,
    string? NameAr,
    long? BranchId,
    DateTime EffectiveDate,
    bool IsActive,
    List<TaxBracketUpsertRequest>? Brackets
);

public record TaxBracketRequest(
    decimal MinAmount,
    decimal MaxAmount,
    decimal Rate,
    decimal FixedAmount
);

public record TaxBracketUpsertRequest(
    long? Id,
    decimal MinAmount,
    decimal MaxAmount,
    decimal Rate,
    decimal FixedAmount
);

public record CreateSocialInsuranceRequest(
    string Name,
    string? NameAr,
    long? BranchId,
    decimal EmployeeContributionRate,
    decimal EmployerContributionRate,
    decimal MaxInsurableSalary,
    DateTime EffectiveDate,
    bool IsActive,
    string? AppliesToNationalityCode = null
);

public record UpdateSocialInsuranceRequest(
    string Name,
    string? NameAr,
    long? BranchId,
    decimal EmployeeContributionRate,
    decimal EmployerContributionRate,
    decimal MaxInsurableSalary,
    DateTime EffectiveDate,
    bool IsActive,
    string? AppliesToNationalityCode = null
);

public record CreatePayrollCalendarPolicyRequest(
    long? BranchId,
    int BasisType,
    int? FixedBasisDays,
    decimal StandardHoursPerDay,
    bool TreatPublicHolidaysAsPaid,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    bool IsActive
);

public record UpdatePayrollCalendarPolicyRequest(
    long? BranchId,
    int BasisType,
    int? FixedBasisDays,
    decimal StandardHoursPerDay,
    bool TreatPublicHolidaysAsPaid,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    bool IsActive
);

public record CreateInsuranceProviderRequest(
    string Name,
    string? NameAr,
    string? ContactPerson,
    string? Phone,
    string? Email,
    string? PolicyNumber,
    int InsuranceType,
    bool IsActive
);

public record UpdateInsuranceProviderRequest(
    string Name,
    string? NameAr,
    string? ContactPerson,
    string? Phone,
    string? Email,
    string? PolicyNumber,
    int InsuranceType,
    bool IsActive
);
