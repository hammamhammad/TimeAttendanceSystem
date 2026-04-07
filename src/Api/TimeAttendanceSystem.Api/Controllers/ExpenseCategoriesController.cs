using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Expenses;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/expense-categories")]
[Authorize]
public class ExpenseCategoriesController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public ExpenseCategoriesController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "ExpenseCategoryRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isActive = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.ExpenseCategories.AsNoTracking().AsQueryable();

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
                x.RequiresReceipt, x.IsActive, x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "ExpenseCategoryRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.ExpenseCategories.AsNoTracking()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Expense category not found." });
        return Ok(item);
    }

    [HttpGet("dropdown")]
    [Authorize]
    public async Task<IActionResult> GetDropdown()
    {
        var items = await _context.ExpenseCategories
            .Where(x => x.IsActive && !x.IsDeleted)
            .OrderBy(x => x.Name)
            .Select(x => new { x.Id, x.Name })
            .ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = "ExpenseCategoryManagement")]
    public async Task<IActionResult> Create([FromBody] CreateExpenseCategoryRequest request)
    {
        var entity = new ExpenseCategory
        {
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            MaxAmount = request.MaxAmount,
            RequiresReceipt = request.RequiresReceipt,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.ExpenseCategories.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "ExpenseCategoryManagement")]
    public async Task<IActionResult> Update(long id, [FromBody] CreateExpenseCategoryRequest request)
    {
        var entity = await _context.ExpenseCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Expense category not found." });

        entity.Name = request.Name;
        entity.NameAr = request.NameAr;
        entity.Description = request.Description;
        entity.MaxAmount = request.MaxAmount;
        entity.RequiresReceipt = request.RequiresReceipt;
        entity.IsActive = request.IsActive;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Expense category updated." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "ExpenseCategoryManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var entity = await _context.ExpenseCategories.FirstOrDefaultAsync(x => x.Id == id);
        if (entity == null) return NotFound(new { error = "Expense category not found." });

        entity.IsDeleted = true;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Expense category deleted." });
    }
}

public class CreateExpenseCategoryRequest
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal? MaxAmount { get; set; }
    public bool RequiresReceipt { get; set; } = true;
    public bool IsActive { get; set; } = true;
}
