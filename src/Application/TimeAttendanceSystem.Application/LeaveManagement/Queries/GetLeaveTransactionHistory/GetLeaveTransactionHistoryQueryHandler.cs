using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.LeaveManagement.Queries.GetLeaveTransactionHistory;

/// <summary>
/// Query handler for retrieving leave transaction history with pagination.
/// </summary>
public class GetLeaveTransactionHistoryQueryHandler : BaseHandler<GetLeaveTransactionHistoryQuery, Result<PagedResult<LeaveTransactionDto>>>
{
    public GetLeaveTransactionHistoryQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<PagedResult<LeaveTransactionDto>>> Handle(GetLeaveTransactionHistoryQuery request, CancellationToken cancellationToken)
    {
        // Validate employee exists
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
            return Result.Failure<PagedResult<LeaveTransactionDto>>("Employee does not exist.");

        // Enforce branch-scoped access control
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<PagedResult<LeaveTransactionDto>>("Access denied to this employee's branch.");

        // Build query
        var query = Context.LeaveTransactions
            .Include(lt => lt.LeaveBalance)
                .ThenInclude(lb => lb.VacationType)
            .Where(lt => lt.LeaveBalance.EmployeeId == request.EmployeeId);

        // Apply vacation type filter if specified
        if (request.VacationTypeId.HasValue)
        {
            query = query.Where(lt => lt.LeaveBalance.VacationTypeId == request.VacationTypeId.Value);
        }

        // Apply year filter if specified
        if (request.Year.HasValue)
        {
            query = query.Where(lt => lt.LeaveBalance.Year == request.Year.Value);
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination and ordering (most recent first)
        var transactions = await query
            .OrderByDescending(lt => lt.TransactionDate)
            .ThenByDescending(lt => lt.Id)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(lt => new LeaveTransactionDto
            {
                Id = lt.Id,
                LeaveBalanceId = lt.LeaveBalanceId,
                TransactionType = lt.TransactionType,
                TransactionTypeName = lt.TransactionType.ToString(),
                Days = lt.Days,
                ReferenceType = lt.ReferenceType,
                ReferenceId = lt.ReferenceId,
                Notes = lt.Notes,
                TransactionDate = lt.TransactionDate,
                BalanceAfterTransaction = lt.BalanceAfterTransaction,
                CreatedAtUtc = lt.CreatedAtUtc,
                CreatedBy = lt.CreatedBy
            })
            .ToListAsync(cancellationToken);

        var pagedResult = new PagedResult<LeaveTransactionDto>(
            transactions,
            totalCount,
            request.PageNumber,
            request.PageSize);

        return Result.Success(pagedResult);
    }
}
