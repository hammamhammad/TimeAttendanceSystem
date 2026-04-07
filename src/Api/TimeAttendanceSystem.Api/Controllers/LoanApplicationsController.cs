using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Loans;

namespace TecAxle.Hrms.Api.Controllers;

[ApiController]
[Route("api/v1/loan-applications")]
[Authorize]
public class LoanApplicationsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public LoanApplicationsController(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    [HttpGet]
    [Authorize(Policy = "LoanApplicationRead")]
    public async Task<IActionResult> GetAll(
        [FromQuery] long? employeeId = null,
        [FromQuery] long? loanTypeId = null,
        [FromQuery] LoanApplicationStatus? status = null,
        [FromQuery] string? search = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20)
    {
        var query = _context.LoanApplications.AsNoTracking().AsQueryable();

        if (employeeId.HasValue) query = query.Where(x => x.EmployeeId == employeeId.Value);
        if (loanTypeId.HasValue) query = query.Where(x => x.LoanTypeId == loanTypeId.Value);
        if (status.HasValue) query = query.Where(x => x.Status == status.Value);
        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(x => x.Purpose != null && x.Purpose.Contains(search));

        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(x => x.CreatedAtUtc)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.LoanTypeId, LoanTypeName = x.LoanType.Name,
                x.RequestedAmount, x.ApprovedAmount, x.RepaymentMonths,
                x.MonthlyInstallment, x.InterestRate, x.Status,
                x.OutstandingBalance, x.StartDate, x.EndDate,
                x.CreatedAtUtc
            })
            .ToListAsync();

        return Ok(new { data = items, totalCount, pageNumber, pageSize });
    }

    [HttpGet("{id}")]
    [Authorize(Policy = "LoanApplicationRead")]
    public async Task<IActionResult> GetById(long id)
    {
        var item = await _context.LoanApplications.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(x => new
            {
                x.Id, x.EmployeeId,
                EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                x.LoanTypeId, LoanTypeName = x.LoanType.Name,
                x.LoanPolicyId, x.RequestedAmount, x.ApprovedAmount,
                x.RepaymentMonths, x.MonthlyInstallment, x.InterestRate,
                x.Purpose, x.PurposeAr, x.Status, x.StartDate, x.EndDate,
                x.RejectionReason, x.ApprovedByUserId, x.ApprovedAt,
                x.OutstandingBalance, x.Notes,
                x.WorkflowInstanceId, x.SubmittedByUserId,
                Repayments = x.Repayments.Where(r => !r.IsDeleted).OrderBy(r => r.InstallmentNumber).Select(r => new
                {
                    r.Id, r.InstallmentNumber, r.Amount, r.PrincipalAmount,
                    r.InterestAmount, r.DueDate, r.PaidDate, r.Status,
                    r.BalanceRemaining
                }).ToList(),
                x.CreatedAtUtc, x.CreatedBy, x.ModifiedAtUtc, x.ModifiedBy
            })
            .FirstOrDefaultAsync();

        if (item == null) return NotFound(new { error = "Loan application not found." });
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLoanApplicationRequest request)
    {
        var entity = new LoanApplication
        {
            EmployeeId = request.EmployeeId,
            LoanTypeId = request.LoanTypeId,
            LoanPolicyId = request.LoanPolicyId,
            RequestedAmount = request.RequestedAmount,
            RepaymentMonths = request.RepaymentMonths,
            InterestRate = request.InterestRate,
            Purpose = request.Purpose,
            PurposeAr = request.PurposeAr,
            Notes = request.Notes,
            Status = LoanApplicationStatus.Draft,
            SubmittedByUserId = _currentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "system"
        };

        _context.LoanApplications.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = entity.Id }, new { id = entity.Id });
    }

    [HttpPost("{id}/submit")]
    public async Task<IActionResult> Submit(long id)
    {
        var loan = await _context.LoanApplications.FirstOrDefaultAsync(x => x.Id == id);
        if (loan == null) return NotFound(new { error = "Loan application not found." });
        if (loan.Status != LoanApplicationStatus.Draft)
            return BadRequest(new { error = "Only draft applications can be submitted." });

        // Check concurrent loans
        var activeLoans = await _context.LoanApplications
            .CountAsync(x => x.EmployeeId == loan.EmployeeId
                && (x.Status == LoanApplicationStatus.Active || x.Status == LoanApplicationStatus.Approved)
                && !x.IsDeleted);

        loan.Status = LoanApplicationStatus.Pending;
        loan.ModifiedAtUtc = DateTime.UtcNow;
        loan.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Loan application submitted." });
    }

    [HttpPost("{id}/approve")]
    [Authorize(Policy = "LoanApplicationManagement")]
    public async Task<IActionResult> Approve(long id, [FromBody] ApproveLoanRequest request)
    {
        var loan = await _context.LoanApplications.FirstOrDefaultAsync(x => x.Id == id);
        if (loan == null) return NotFound(new { error = "Loan application not found." });
        if (loan.Status != LoanApplicationStatus.Pending)
            return BadRequest(new { error = "Only pending applications can be approved." });

        var approvedAmount = request.ApprovedAmount ?? loan.RequestedAmount;
        var repaymentMonths = loan.RepaymentMonths;
        var installment = Math.Round(approvedAmount / repaymentMonths, 2);
        var startDate = request.StartDate ?? DateTime.UtcNow.Date.AddMonths(1);

        loan.Status = LoanApplicationStatus.Active;
        loan.ApprovedAmount = approvedAmount;
        loan.MonthlyInstallment = installment;
        loan.StartDate = startDate;
        loan.EndDate = startDate.AddMonths(repaymentMonths);
        loan.OutstandingBalance = approvedAmount;
        loan.ApprovedByUserId = _currentUser.UserId;
        loan.ApprovedAt = DateTime.UtcNow;
        loan.ModifiedAtUtc = DateTime.UtcNow;
        loan.ModifiedBy = _currentUser.Username;

        // Auto-generate repayment schedule
        for (int i = 1; i <= repaymentMonths; i++)
        {
            var repayment = new LoanRepayment
            {
                LoanApplicationId = loan.Id,
                InstallmentNumber = i,
                Amount = installment,
                PrincipalAmount = installment,
                InterestAmount = 0,
                DueDate = startDate.AddMonths(i),
                Status = LoanRepaymentStatus.Scheduled,
                BalanceRemaining = approvedAmount - (installment * i),
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = _currentUser.Username ?? "system"
            };

            // Adjust last installment for rounding
            if (i == repaymentMonths)
            {
                repayment.Amount = approvedAmount - (installment * (repaymentMonths - 1));
                repayment.PrincipalAmount = repayment.Amount;
                repayment.BalanceRemaining = 0;
            }

            _context.LoanRepayments.Add(repayment);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Loan approved. Repayment schedule created.", approvedAmount, installment, repaymentMonths });
    }

    [HttpPost("{id}/reject")]
    [Authorize(Policy = "LoanApplicationManagement")]
    public async Task<IActionResult> Reject(long id, [FromBody] RejectLoanRequest request)
    {
        var loan = await _context.LoanApplications.FirstOrDefaultAsync(x => x.Id == id);
        if (loan == null) return NotFound(new { error = "Loan application not found." });
        if (loan.Status != LoanApplicationStatus.Pending)
            return BadRequest(new { error = "Only pending applications can be rejected." });

        loan.Status = LoanApplicationStatus.Rejected;
        loan.RejectionReason = request.Reason;
        loan.ModifiedAtUtc = DateTime.UtcNow;
        loan.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Loan application rejected." });
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "LoanApplicationManagement")]
    public async Task<IActionResult> Delete(long id)
    {
        var loan = await _context.LoanApplications.FirstOrDefaultAsync(x => x.Id == id);
        if (loan == null) return NotFound(new { error = "Loan application not found." });

        loan.IsDeleted = true;
        loan.ModifiedAtUtc = DateTime.UtcNow;
        loan.ModifiedBy = _currentUser.Username;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Loan application deleted." });
    }
}

public class CreateLoanApplicationRequest
{
    public long EmployeeId { get; set; }
    public long LoanTypeId { get; set; }
    public long? LoanPolicyId { get; set; }
    public decimal RequestedAmount { get; set; }
    public int RepaymentMonths { get; set; }
    public decimal InterestRate { get; set; }
    public string? Purpose { get; set; }
    public string? PurposeAr { get; set; }
    public string? Notes { get; set; }
}

public class ApproveLoanRequest
{
    public decimal? ApprovedAmount { get; set; }
    public DateTime? StartDate { get; set; }
}

public class RejectLoanRequest
{
    public string? Reason { get; set; }
}
