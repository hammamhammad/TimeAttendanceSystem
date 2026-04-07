using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Training;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/training-budgets")]
[Authorize]
public class TrainingBudgetsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public TrainingBudgetsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    /// <summary>Lists training budgets with optional filters.</summary>
    [HttpGet]
    [Authorize(Policy = "TrainingBudgetRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] int? fiscalYear = null,
        [FromQuery] long? branchId = null,
        [FromQuery] long? departmentId = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.TrainingBudgets.AsNoTracking().AsQueryable();

        if (fiscalYear.HasValue) query = query.Where(x => x.FiscalYear == fiscalYear.Value);
        if (branchId.HasValue) query = query.Where(x => x.BranchId == branchId.Value);
        if (departmentId.HasValue) query = query.Where(x => x.DepartmentId == departmentId.Value);

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.FiscalYear)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id,
                x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : (string?)null,
                x.DepartmentId,
                DepartmentName = x.Department != null ? x.Department.Name : (string?)null,
                DepartmentNameAr = x.Department != null ? x.Department.NameAr : (string?)null,
                x.FiscalYear,
                x.AllocatedBudget,
                x.SpentAmount,
                RemainingBudget = x.AllocatedBudget - x.SpentAmount,
                UtilizationPercent = x.AllocatedBudget > 0 ? Math.Round((x.SpentAmount / x.AllocatedBudget) * 100, 2) : 0,
                x.Currency,
                x.Notes,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    /// <summary>Gets a single training budget by ID.</summary>
    [HttpGet("{id}")]
    [Authorize(Policy = "TrainingBudgetRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.TrainingBudgets.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id,
                x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : (string?)null,
                x.DepartmentId,
                DepartmentName = x.Department != null ? x.Department.Name : (string?)null,
                DepartmentNameAr = x.Department != null ? x.Department.NameAr : (string?)null,
                x.FiscalYear,
                x.AllocatedBudget,
                x.SpentAmount,
                RemainingBudget = x.AllocatedBudget - x.SpentAmount,
                UtilizationPercent = x.AllocatedBudget > 0 ? Math.Round((x.SpentAmount / x.AllocatedBudget) * 100, 2) : 0,
                x.Currency,
                x.Notes,
                x.CreatedAtUtc,
                x.ModifiedAtUtc,
                x.CreatedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Training budget not found." });
        return Ok(item);
    }

    /// <summary>Creates a new training budget.</summary>
    [HttpPost]
    [Authorize(Policy = "TrainingBudgetManagement")]
    public async Task<IActionResult> Create([FromBody] CreateTrainingBudgetRequest request)
    {
        var entity = new TrainingBudget
        {
            BranchId = request.BranchId,
            DepartmentId = request.DepartmentId,
            FiscalYear = request.FiscalYear,
            AllocatedBudget = request.AllocatedBudget,
            SpentAmount = request.SpentAmount,
            Currency = request.Currency,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.TrainingBudgets.Add(entity);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    /// <summary>Updates an existing training budget.</summary>
    [HttpPut("{id}")]
    [Authorize(Policy = "TrainingBudgetManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] UpdateTrainingBudgetRequest request)
    {
        var entity = await _context.TrainingBudgets.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training budget not found." });

        entity.BranchId = request.BranchId;
        entity.DepartmentId = request.DepartmentId;
        entity.FiscalYear = request.FiscalYear;
        entity.AllocatedBudget = request.AllocatedBudget;
        entity.SpentAmount = request.SpentAmount;
        entity.Currency = request.Currency;
        entity.Notes = request.Notes;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training budget updated." });
    }

    /// <summary>Soft deletes a training budget.</summary>
    [HttpDelete("{id}")]
    [Authorize(Policy = "TrainingBudgetManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.TrainingBudgets.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Training budget not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Training budget deleted." });
    }

    /// <summary>Gets budget summary grouped by fiscal year.</summary>
    [HttpGet("summary")]
    [Authorize(Policy = "TrainingBudgetRead")]
    public async Task<IActionResult> GetSummary([FromQuery] int? fiscalYear = null)
    {
        var query = _context.TrainingBudgets.AsNoTracking().AsQueryable();
        if (fiscalYear.HasValue) query = query.Where(x => x.FiscalYear == fiscalYear.Value);

        var summary = await query
            .GroupBy(x => x.FiscalYear)
            .Select(g => new
            {
                FiscalYear = g.Key,
                TotalAllocated = g.Sum(x => x.AllocatedBudget),
                TotalSpent = g.Sum(x => x.SpentAmount),
                TotalRemaining = g.Sum(x => x.AllocatedBudget) - g.Sum(x => x.SpentAmount),
                UtilizationPercent = g.Sum(x => x.AllocatedBudget) > 0
                    ? Math.Round((g.Sum(x => x.SpentAmount) / g.Sum(x => x.AllocatedBudget)) * 100, 2)
                    : 0,
                BudgetCount = g.Count()
            })
            .OrderByDescending(x => x.FiscalYear)
            .ToListAsync();

        return Ok(summary);
    }
}

// ===========================
// Request DTOs
// ===========================

public class CreateTrainingBudgetRequest
{
    public long? BranchId { get; set; }
    public long? DepartmentId { get; set; }
    public int FiscalYear { get; set; }
    public decimal AllocatedBudget { get; set; }
    public decimal SpentAmount { get; set; }
    public string Currency { get; set; } = "SAR";
    public string? Notes { get; set; }
}

public class UpdateTrainingBudgetRequest
{
    public long? BranchId { get; set; }
    public long? DepartmentId { get; set; }
    public int FiscalYear { get; set; }
    public decimal AllocatedBudget { get; set; }
    public decimal SpentAmount { get; set; }
    public string Currency { get; set; } = "SAR";
    public string? Notes { get; set; }
}
