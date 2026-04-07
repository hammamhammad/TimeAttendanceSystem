using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/loan-policies")]
[Authorize]
public class LoanPoliciesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public LoanPoliciesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "LoanPolicyRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? branchId = null,
        [FromQuery] long? loanTypeId = null,
        [FromQuery] bool? isActive = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.LoanPolicies.AsNoTracking().AsQueryable();

        if (branchId.HasValue) query = query.Where(x => x.BranchId == branchId.Value || x.BranchId == null);
        if (loanTypeId.HasValue) query = query.Where(x => x.LoanTypeId == loanTypeId.Value);
        if (isActive.HasValue) query = query.Where(x => x.IsActive == isActive.Value);

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderBy(x => x.LoanType.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                x.LoanTypeId, LoanTypeName = x.LoanType.Name,
                x.MaxConcurrentLoans, x.MinServiceMonths,
                x.MaxPercentageOfSalary, x.IsActive, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "LoanPolicyRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.LoanPolicies.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.BranchId,
                BranchName = x.Branch != null ? x.Branch.Name : null,
                x.LoanTypeId, LoanTypeName = x.LoanType.Name,
                x.MaxConcurrentLoans, x.MinServiceMonths,
                x.MaxPercentageOfSalary, x.IsActive,
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Loan policy not found." });
        return Ok(item);
    }

    [HttpPost]
    [Authorize(Policy = "LoanPolicyManagement")]
    public async Task<IActionResult> Create([FromBody] CreateLoanPolicyRequest request)
    {
        var entity = new LoanPolicy
        {
            BranchId = request.BranchId,
            LoanTypeId = request.LoanTypeId,
            MaxConcurrentLoans = request.MaxConcurrentLoans,
            MinServiceMonths = request.MinServiceMonths,
            MaxPercentageOfSalary = request.MaxPercentageOfSalary,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.LoanPolicies.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "LoanPolicyManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateLoanPolicyRequest request)
    {
        var entity = await _context.LoanPolicies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Loan policy not found." });

        entity.BranchId = request.BranchId;
        entity.LoanTypeId = request.LoanTypeId;
        entity.MaxConcurrentLoans = request.MaxConcurrentLoans;
        entity.MinServiceMonths = request.MinServiceMonths;
        entity.MaxPercentageOfSalary = request.MaxPercentageOfSalary;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Loan policy updated." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "LoanPolicyManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.LoanPolicies.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Loan policy not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Loan policy deleted." });
    }
}

public class CreateLoanPolicyRequest
{
    public long? BranchId { get; set; }
    public long LoanTypeId { get; set; }
    public int MaxConcurrentLoans { get; set; } = 1;
    public int MinServiceMonths { get; set; }
    public decimal MaxPercentageOfSalary { get; set; }
    public bool IsActive { get; set; } = true;
}
