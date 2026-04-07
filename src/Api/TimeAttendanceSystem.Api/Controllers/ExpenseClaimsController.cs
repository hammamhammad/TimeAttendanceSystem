using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Expenses;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/expense-claims")]
[Authorize]
public class ExpenseClaimsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public ExpenseClaimsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "ExpenseClaimRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] ExpenseClaimStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.ExpenseClaims.AsNoTracking().AsQueryable();

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.ClaimNumber.Contains(search) || (x.Description != null && x.Description.Contains(search)));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.ClaimNumber, x.TotalAmount, x.Currency, x.Description,
                x.Status, x.ApprovedAt,
                ItemCount = x.Items.Count(i => !i.IsDeleted),
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "ExpenseClaimRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.ExpenseClaims.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.ClaimNumber, x.ExpensePolicyId, x.TotalAmount, x.Currency, x.Description,
                x.Status, x.RejectionReason, x.ApprovedByUserId, x.ApprovedAt,
                x.WorkflowInstanceId, x.SubmittedByUserId,
                Items = x.Items.Where(i => !i.IsDeleted).Select(i => new
                {
                    i.Id, i.ExpenseCategoryId,
                    CategoryName = i.ExpenseCategory != null ? i.ExpenseCategory.Name : null,
                    i.Description, i.DescriptionAr, i.Amount, i.ReceiptUrl,
                    i.ExpenseDate, i.Notes
                }).ToList(),
                Reimbursement = x.Reimbursement != null ? new
                {
                    x.Reimbursement.Id, x.Reimbursement.Amount,
                    x.Reimbursement.ReimbursementDate, x.Reimbursement.Method,
                    x.Reimbursement.ReferenceNumber
                } : null,
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Expense claim not found." });
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateExpenseClaimRequest request)
    {
        var claimNumber = $"EXP-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..6].ToUpper()}";

        var claim = new ExpenseClaim
        {
            EmployeeId = request.EmployeeId,
            ClaimNumber = claimNumber,
            ExpensePolicyId = request.ExpensePolicyId,
            Currency = request.Currency ?? "SAR",
            Description = request.Description,
            Status = ExpenseClaimStatus.Draft,
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        decimal total = 0;
        foreach (var item in request.Items)
        {
            claim.Items.Add(new ExpenseClaimItem
            {
                ExpenseCategoryId = item.ExpenseCategoryId,
                Description = item.Description,
                DescriptionAr = item.DescriptionAr,
                Amount = item.Amount,
                ReceiptUrl = item.ReceiptUrl,
                ExpenseDate = item.ExpenseDate,
                Notes = item.Notes,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "system"
            });
            total += item.Amount;
        }

        claim.TotalAmount = total;
        _context.ExpenseClaims.Add(claim);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = claim.Id }, new { id = claim.Id, claimNumber });
    }

    [HttpPost("{id}/submit")]
    public async Task<IActionResult> Submit(long id)
    {
        var claim = await _context.ExpenseClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (claim == null) return NotFound(new { error = "Expense claim not found." });
        if (claim.Status != ExpenseClaimStatus.Draft)
            return BadRequest(new { error = "Only draft claims can be submitted." });

        claim.Status = ExpenseClaimStatus.Submitted;
        claim.ModifiedAtUtc = DateTime.UtcNow;
        claim.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Expense claim submitted for approval." });
    }

    [HttpPost("{id}/approve")]
    [Authorize(Policy = "ExpenseClaimManagement")]
    public async Task<IActionResult> Approve(long id)
    {
        var claim = await _context.ExpenseClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (claim == null) return NotFound(new { error = "Expense claim not found." });
        if (claim.Status != ExpenseClaimStatus.Submitted && claim.Status != ExpenseClaimStatus.PendingApproval)
            return BadRequest(new { error = "Only submitted claims can be approved." });

        claim.Status = ExpenseClaimStatus.Approved;
        claim.ApprovedByUserId = _currentUser.UserId;
        claim.ApprovedAt = DateTime.UtcNow;
        claim.ModifiedAtUtc = DateTime.UtcNow;
        claim.ModifiedBy = _currentUser.Username;

        // Auto-create reimbursement
        var reimbursement = new ExpenseReimbursement
        {
            ExpenseClaimId = claim.Id,
            Amount = claim.TotalAmount,
            Method = ReimbursementMethod.Payroll,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };
        _context.ExpenseReimbursements.Add(reimbursement);

        await _context.SaveChangesAsync();
        return Ok(new { message = "Expense claim approved. Reimbursement created." });
    }

    [HttpPost("{id}/reject")]
    [Authorize(Policy = "ExpenseClaimManagement")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectExpenseClaimRequest request)
    {
        var claim = await _context.ExpenseClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (claim == null) return NotFound(new { error = "Expense claim not found." });
        if (claim.Status != ExpenseClaimStatus.Submitted && claim.Status != ExpenseClaimStatus.PendingApproval)
            return BadRequest(new { error = "Only submitted claims can be rejected." });

        claim.Status = ExpenseClaimStatus.Rejected;
        claim.RejectionReason = request.Reason;
        claim.ModifiedAtUtc = DateTime.UtcNow;
        claim.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Expense claim rejected." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "ExpenseClaimManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var claim = await _context.ExpenseClaims.FirstOrDefaultAsync(x => x.Id == id);
        if (claim == null) return NotFound(new { error = "Expense claim not found." });

        claim.IsDeleted = true;
        claim.ModifiedAtUtc = DateTime.UtcNow;
        claim.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Expense claim deleted." });
    }
}

public class CreateExpenseClaimRequest
{
    public long EmployeeId { get; set; }
    public long? ExpensePolicyId { get; set; }
    public string? Currency { get; set; }
    public string? Description { get; set; }
    public List<CreateExpenseClaimItemRequest> Items { get; set; } = new();
}

public class CreateExpenseClaimItemRequest
{
    public long? ExpenseCategoryId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public decimal Amount { get; set; }
    public string? ReceiptUrl { get; set; }
    public DateTime ExpenseDate { get; set; }
    public string? Notes { get; set; }
}

public class RejectExpenseClaimRequest
{
    public string? Reason { get; set; }
}
