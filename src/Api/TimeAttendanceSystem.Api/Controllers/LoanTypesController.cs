using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/loan-types")]
[Authorize]
public class LoanTypesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public LoanTypesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "LoanTypeRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.LoanTypes.AsNoTracking().AsQueryable();

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
                x.Id, x.Name, x.NameAr, x.Description, x.MaxAmount,
                x.MaxRepaymentMonths, x.InterestRate, x.RequiresGuarantor,
                x.IsActive, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "LoanTypeRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.LoanTypes.AsNoTracking()
            .Where(x => x.Id == id).FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Loan type not found." });
        return Ok(item);
    }

    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.LoanTypes
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderBy(x => x.Name)
            .Select(x => new { x.Id, x.Name })
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = "LoanTypeManagement")]
    public async Task<IActionResult> Create([FromBody] CreateLoanTypeRequest request)
    {
        var entity = new LoanType
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            MaxAmount = request.MaxAmount,
            MaxRepaymentMonths = request.MaxRepaymentMonths,
            InterestRate = request.InterestRate,
            RequiresGuarantor = request.RequiresGuarantor,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.LoanTypes.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "LoanTypeManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateLoanTypeRequest request)
    {
        var entity = await _context.LoanTypes.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Loan type not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.MaxAmount = request.MaxAmount;
        entity.MaxRepaymentMonths = request.MaxRepaymentMonths;
        entity.InterestRate = request.InterestRate;
        entity.RequiresGuarantor = request.RequiresGuarantor;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Loan type updated." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "LoanTypeManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.LoanTypes.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Loan type not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Loan type deleted." });
    }
}

public class CreateLoanTypeRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal MaxAmount { get; set; }
    public int MaxRepaymentMonths { get; set; }
    public decimal InterestRate { get; set; }
    public bool RequiresGuarantor { get; set; }
    public bool IsActive { get; set; } = true;
}
