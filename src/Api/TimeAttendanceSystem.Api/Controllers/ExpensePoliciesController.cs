using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Expenses;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/expense-policies")]
[Authorize]
public class ExpensePoliciesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public ExpensePoliciesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "ExpensePolicyRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.ExpensePolicies.AsNoTracking().AsQueryable();

        if (branchId.HasValue) query = query.Where(x => x.BranchId == branchId.Value || x.BranchId == null);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Name.Contains(search) || (x.NameAr != null && x.NameAr.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(x => x.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.Name, x.NameAr, x.Description, x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                x.MaxClaimPerMonth, x.MaxClaimPerYear,
                x.RequiresApproval, x.IsActive, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "ExpensePolicyRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.ExpensePolicies.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.Name, x.NameAr, x.Description, x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                x.MaxClaimPerMonth, x.MaxClaimPerYear,
                x.RequiresApproval, x.IsActive,
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Expense policy not found." });
        return Ok(item);
    }

    [HttpPost]
    [Authorize(Policy = "ExpensePolicyManagement")]
    public async Task<IActionResult> Create([FromBody] CreateExpensePolicyRequest request)
    {
        var entity = new ExpensePolicy
        {
            BranchId = request.BranchId,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            MaxClaimPerMonth = request.MaxClaimPerMonth,
            MaxClaimPerYear = request.MaxClaimPerYear,
            RequiresApproval = request.RequiresApproval,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.ExpensePolicies.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "ExpensePolicyManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateExpensePolicyRequest request)
    {
        var entity = await _context.ExpensePolicies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Expense policy not found." });

        entity.BranchId = request.BranchId;
        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.MaxClaimPerMonth = request.MaxClaimPerMonth;
        entity.MaxClaimPerYear = request.MaxClaimPerYear;
        entity.RequiresApproval = request.RequiresApproval;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Expense policy updated." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "ExpensePolicyManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.ExpensePolicies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Expense policy not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Expense policy deleted." });
    }
}

public class CreateExpensePolicyRequest
{
    public long? BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal? MaxClaimPerMonth { get; set; }
    public decimal? MaxClaimPerYear { get; set; }
    public bool RequiresApproval { get; set; } = true;
    public bool IsActive { get; set; } = true;
}
