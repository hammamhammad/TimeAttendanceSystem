using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Extensions;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Infrastructure.Persistence.Repositories;

/// <summary>
/// Repository implementation for attendance transaction data access operations.
/// Provides comprehensive data access methods for transaction management and tracking.
/// </summary>
public class AttendanceTransactionRepository : IAttendanceTransactionRepository
{
    private readonly TimeAttendanceDbContext _context;

    public AttendanceTransactionRepository(TimeAttendanceDbContext context)
    {
        _context = context;
    }

    public async Task<AttendanceTransaction?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceTransactions
            .Include(t => t.Employee)
            .Include(t => t.EnteredByUser)
            .Include(t => t.VerifiedByUser)
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
    }

    public async Task<List<AttendanceTransaction>> GetByEmployeeAndDateAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default)
    {
        var normalizedDate = attendanceDate.ToUtcDate();
        return await _context.AttendanceTransactions
            .Include(t => t.Employee)
            .Include(t => t.EnteredByUser)
            .Include(t => t.VerifiedByUser)
            .Where(t => t.EmployeeId == employeeId &&
                       t.AttendanceDate.Date == normalizedDate)
            .OrderBy(t => t.TransactionTimeUtc)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceTransaction>> GetByEmployeeAndDateRangeAsync(long employeeId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        var normalizedStartDate = startDate.ToUtcDate();
        var normalizedEndDate = endDate.ToUtcDate();
        return await _context.AttendanceTransactions
            .Include(t => t.Employee)
            .Include(t => t.EnteredByUser)
            .Include(t => t.VerifiedByUser)
            .Where(t => t.EmployeeId == employeeId &&
                       t.AttendanceDate.Date >= normalizedStartDate &&
                       t.AttendanceDate.Date <= normalizedEndDate)
            .OrderBy(t => t.AttendanceDate)
            .ThenBy(t => t.TransactionTimeUtc)
            .ToListAsync(cancellationToken);
    }

    public async Task<AttendanceTransaction?> GetLatestByEmployeeAsync(long employeeId, CancellationToken cancellationToken = default)
    {
        return await _context.AttendanceTransactions
            .Include(t => t.Employee)
            .Include(t => t.EnteredByUser)
            .Include(t => t.VerifiedByUser)
            .Where(t => t.EmployeeId == employeeId)
            .OrderByDescending(t => t.TransactionTimeUtc)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<List<AttendanceTransaction>> GetUnverifiedTransactionsAsync(long? branchId = null, CancellationToken cancellationToken = default)
    {
        var query = _context.AttendanceTransactions
            .Include(t => t.Employee)
            .Include(t => t.EnteredByUser)
            .Include(t => t.VerifiedByUser)
            .Where(t => !t.IsVerified);

        if (branchId.HasValue)
        {
            query = query.Where(t => t.Employee.BranchId == branchId.Value);
        }

        return await query
            .OrderBy(t => t.AttendanceDate)
            .ThenBy(t => t.TransactionTimeUtc)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceTransaction>> GetManualTransactionsAsync(long? branchId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        var normalizedStartDate = startDate.ToUtcDate();
        var normalizedEndDate = endDate.ToUtcDate();
        var query = _context.AttendanceTransactions
            .Include(t => t.Employee)
            .Include(t => t.EnteredByUser)
            .Include(t => t.VerifiedByUser)
            .Where(t => t.IsManual &&
                       t.AttendanceDate.Date >= normalizedStartDate &&
                       t.AttendanceDate.Date <= normalizedEndDate);

        if (branchId.HasValue)
        {
            query = query.Where(t => t.Employee.BranchId == branchId.Value);
        }

        return await query
            .OrderBy(t => t.AttendanceDate)
            .ThenBy(t => t.TransactionTimeUtc)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<AttendanceTransaction>> GetByTypeAndDateRangeAsync(TransactionType transactionType, long? branchId, DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        var normalizedStartDate = startDate.ToUtcDate();
        var normalizedEndDate = endDate.ToUtcDate();
        var query = _context.AttendanceTransactions
            .Include(t => t.Employee)
            .Include(t => t.EnteredByUser)
            .Include(t => t.VerifiedByUser)
            .Where(t => t.TransactionType == transactionType &&
                       t.AttendanceDate.Date >= normalizedStartDate &&
                       t.AttendanceDate.Date <= normalizedEndDate);

        if (branchId.HasValue)
        {
            query = query.Where(t => t.Employee.BranchId == branchId.Value);
        }

        return await query
            .OrderBy(t => t.AttendanceDate)
            .ThenBy(t => t.TransactionTimeUtc)
            .ToListAsync(cancellationToken);
    }

    public async Task<AttendanceTransaction> CreateAsync(AttendanceTransaction transaction, CancellationToken cancellationToken = default)
    {
        _context.AttendanceTransactions.Add(transaction);
        await _context.SaveChangesAsync(cancellationToken);
        return transaction;
    }

    public async Task<List<AttendanceTransaction>> CreateBatchAsync(IEnumerable<AttendanceTransaction> transactions, CancellationToken cancellationToken = default)
    {
        var transactionsList = transactions.ToList();
        _context.AttendanceTransactions.AddRange(transactionsList);
        await _context.SaveChangesAsync(cancellationToken);
        return transactionsList;
    }

    public async Task<AttendanceTransaction> UpdateAsync(AttendanceTransaction transaction, CancellationToken cancellationToken = default)
    {
        _context.AttendanceTransactions.Update(transaction);
        await _context.SaveChangesAsync(cancellationToken);
        return transaction;
    }

    public async Task<bool> DeleteAsync(long id, CancellationToken cancellationToken = default)
    {
        var transaction = await _context.AttendanceTransactions.FindAsync(new object[] { id }, cancellationToken);
        if (transaction == null)
            return false;

        _context.AttendanceTransactions.Remove(transaction);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> ExistsTransactionTypeAsync(long employeeId, DateTime attendanceDate, TransactionType transactionType, CancellationToken cancellationToken = default)
    {
        var normalizedDate = attendanceDate.ToUtcDate();
        return await _context.AttendanceTransactions
            .AnyAsync(t => t.EmployeeId == employeeId &&
                          t.AttendanceDate.Date == normalizedDate &&
                          t.TransactionType == transactionType,
                     cancellationToken);
    }

    public async Task<(AttendanceTransaction? CheckIn, AttendanceTransaction? CheckOut)> GetCheckInOutPairAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default)
    {
        var normalizedDate = attendanceDate.ToUtcDate();
        var transactions = await _context.AttendanceTransactions
            .Where(t => t.EmployeeId == employeeId &&
                       t.AttendanceDate.Date == normalizedDate &&
                       (t.TransactionType == TransactionType.CheckIn ||
                        t.TransactionType == TransactionType.CheckOut ||
                        t.TransactionType == TransactionType.AutoCheckOut))
            .OrderBy(t => t.TransactionTimeUtc)
            .ToListAsync(cancellationToken);

        var checkIn = transactions.FirstOrDefault(t => t.TransactionType == TransactionType.CheckIn);
        var checkOut = transactions.FirstOrDefault(t => t.TransactionType == TransactionType.CheckOut ||
                                                        t.TransactionType == TransactionType.AutoCheckOut);

        return (checkIn, checkOut);
    }

    public async Task<List<(AttendanceTransaction BreakStart, AttendanceTransaction? BreakEnd)>> GetBreakPeriodsAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default)
    {
        var normalizedDate = attendanceDate.ToUtcDate();
        var breakTransactions = await _context.AttendanceTransactions
            .Where(t => t.EmployeeId == employeeId &&
                       t.AttendanceDate.Date == normalizedDate &&
                       (t.TransactionType == TransactionType.BreakStart ||
                        t.TransactionType == TransactionType.BreakEnd))
            .OrderBy(t => t.TransactionTimeUtc)
            .ToListAsync(cancellationToken);

        var breakPeriods = new List<(AttendanceTransaction BreakStart, AttendanceTransaction? BreakEnd)>();
        AttendanceTransaction? currentBreakStart = null;

        foreach (var transaction in breakTransactions)
        {
            if (transaction.TransactionType == TransactionType.BreakStart)
            {
                // If we have an unclosed break, close it with null
                if (currentBreakStart != null)
                {
                    breakPeriods.Add((currentBreakStart, null));
                }
                currentBreakStart = transaction;
            }
            else if (transaction.TransactionType == TransactionType.BreakEnd && currentBreakStart != null)
            {
                breakPeriods.Add((currentBreakStart, transaction));
                currentBreakStart = null;
            }
        }

        // If we have an unclosed break at the end
        if (currentBreakStart != null)
        {
            breakPeriods.Add((currentBreakStart, null));
        }

        return breakPeriods;
    }

    public async Task<TransactionValidationResult> ValidateTransactionSequenceAsync(long employeeId, DateTime attendanceDate, CancellationToken cancellationToken = default)
    {
        var transactions = await GetByEmployeeAndDateAsync(employeeId, attendanceDate, cancellationToken);
        var result = new TransactionValidationResult { IsValid = true };

        if (!transactions.Any())
        {
            return result;
        }

        var issues = new List<string>();
        var hasCheckIn = false;
        var hasCheckOut = false;
        var inBreak = false;
        var breakStartCount = 0;
        var breakEndCount = 0;

        foreach (var transaction in transactions)
        {
            switch (transaction.TransactionType)
            {
                case TransactionType.CheckIn:
                    if (hasCheckIn && !hasCheckOut)
                    {
                        issues.Add("Multiple check-ins without check-out");
                    }
                    hasCheckIn = true;
                    hasCheckOut = false;
                    break;

                case TransactionType.CheckOut:
                case TransactionType.AutoCheckOut:
                    if (!hasCheckIn)
                    {
                        issues.Add("Check-out without check-in");
                    }
                    hasCheckOut = true;
                    break;

                case TransactionType.BreakStart:
                    if (!hasCheckIn)
                    {
                        issues.Add("Break start before check-in");
                    }
                    if (inBreak)
                    {
                        issues.Add("Break start while already on break");
                    }
                    inBreak = true;
                    breakStartCount++;
                    break;

                case TransactionType.BreakEnd:
                    if (!inBreak)
                    {
                        issues.Add("Break end without break start");
                    }
                    inBreak = false;
                    breakEndCount++;
                    break;
            }
        }

        // Check for incomplete states
        if (hasCheckIn && !hasCheckOut)
        {
            result.HasIncompleteCheckOut = true;
            issues.Add("Missing check-out transaction");
        }

        if (breakStartCount != breakEndCount)
        {
            result.HasIncompleteBreaks = true;
            issues.Add($"Unmatched break transactions: {breakStartCount} starts, {breakEndCount} ends");
        }

        if (inBreak)
        {
            result.HasIncompleteBreaks = true;
            issues.Add("Day ended while on break");
        }

        result.Issues = issues;
        result.IsValid = !issues.Any();
        result.HasInvalidSequence = issues.Any(i => !i.Contains("Missing") && !i.Contains("Unmatched") && !i.Contains("ended"));

        return result;
    }

    public async Task<List<AttendanceTransaction>> GetRecentTransactionsAsync(
        int limit = 10,
        long? branchId = null,
        long? departmentId = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.AttendanceTransactions
            .Include(t => t.Employee)
            .Include(t => t.EnteredByUser)
            .AsNoTracking();

        if (branchId.HasValue)
        {
            query = query.Where(t => t.Employee.BranchId == branchId.Value);
        }

        if (departmentId.HasValue)
        {
            query = query.Where(t => t.Employee.DepartmentId == departmentId.Value);
        }

        var transactions = await query
            .OrderByDescending(t => t.TransactionTimeUtc)
            .Take(limit)
            .ToListAsync(cancellationToken);

        return transactions;
    }
}