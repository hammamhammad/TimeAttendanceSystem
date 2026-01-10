using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.LeaveManagement;

namespace TimeAttendanceSystem.Application.Services;

/// <summary>
/// Service for leave accrual calculations and balance management.
/// Handles monthly accrual processing, balance reservations, and adjustments.
/// </summary>
public class LeaveAccrualService : ILeaveAccrualService
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<LeaveAccrualService> _logger;

    public LeaveAccrualService(
        IApplicationDbContext context,
        ILogger<LeaveAccrualService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> ProcessMonthlyAccrualForEmployeeAsync(
        long employeeId,
        int year,
        int month,
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Validate month
            if (month < 1 || month > 12)
                return Result.Failure("Month must be between 1 and 12");

            // Get employee to check hire date
            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Id == employeeId, cancellationToken);

            if (employee == null)
                return Result.Failure($"Employee {employeeId} not found");

            // Get all entitlements for this employee and year
            var entitlements = await _context.LeaveEntitlements
                .Include(e => e.VacationType)
                .Where(e => e.EmployeeId == employeeId && e.Year == year)
                .ToListAsync(cancellationToken);

            if (!entitlements.Any())
            {
                _logger.LogWarning("No entitlements found for employee {EmployeeId} for year {Year}", employeeId, year);
                return Result.Success(); // Not an error, just no entitlements configured
            }

            var accrualDate = new DateTime(year, month, 1);
            var processedCount = 0;

            foreach (var entitlement in entitlements)
            {
                // Check if employee is eligible for accrual this month
                if (entitlement.EffectiveStartDate.HasValue &&
                    accrualDate < entitlement.EffectiveStartDate.Value.Date)
                    continue;

                if (entitlement.EffectiveEndDate.HasValue &&
                    accrualDate > entitlement.EffectiveEndDate.Value.Date)
                    continue;

                // Get or create balance
                var balance = await GetOrCreateLeaveBalanceAsync(
                    employeeId,
                    entitlement.VacationTypeId,
                    year,
                    entitlement.AnnualDays + entitlement.CarryOverDays,
                    cancellationToken);

                // Check if accrual already processed for this month
                if (balance.LastAccrualDate.HasValue)
                {
                    var lastAccrualMonth = balance.LastAccrualDate.Value.Month;
                    var lastAccrualYear = balance.LastAccrualDate.Value.Year;

                    if (lastAccrualYear == year && lastAccrualMonth == month)
                    {
                        _logger.LogInformation(
                            "Accrual already processed for employee {EmployeeId}, vacation type {VacationTypeId}, year {Year}, month {Month}",
                            employeeId, entitlement.VacationTypeId, year, month);
                        continue;
                    }
                }

                // Get accrual policy
                var policy = await _context.LeaveAccrualPolicies
                    .Where(p => p.VacationTypeId == entitlement.VacationTypeId && p.IsActive)
                    .FirstOrDefaultAsync(cancellationToken);

                if (policy == null)
                {
                    _logger.LogWarning(
                        "No active accrual policy found for vacation type {VacationTypeId}",
                        entitlement.VacationTypeId);
                    continue;
                }

                // Calculate monthly accrual amount
                var monthlyAccrual = policy.CalculateProratedMonthlyAccrual(
                    entitlement.AnnualDays,
                    employee.HireDate,
                    year);

                if (monthlyAccrual <= 0)
                    continue;

                // Process accrual
                balance.ProcessMonthlyAccrual(monthlyAccrual);

                // Create transaction record
                var transaction = LeaveTransaction.CreateAccrualTransaction(
                    balance.Id,
                    monthlyAccrual,
                    accrualDate,
                    "System");

                transaction.BalanceAfterTransaction = balance.CurrentBalance;
                _context.LeaveTransactions.Add(transaction);

                processedCount++;
            }

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Processed monthly accrual for employee {EmployeeId}, year {Year}, month {Month}. Processed {Count} entitlements",
                employeeId, year, month, processedCount);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error processing monthly accrual for employee {EmployeeId}, year {Year}, month {Month}",
                employeeId, year, month);
            return Result.Failure($"Error processing accrual: {ex.Message}");
        }
    }

    public async Task<Result<int>> ProcessMonthlyAccrualForAllEmployeesAsync(
        int year,
        int month,
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Get all active employees
            var employeeIds = await _context.Employees
                .Where(e => !e.IsDeleted)
                .Select(e => e.Id)
                .ToListAsync(cancellationToken);

            var successCount = 0;
            var errorCount = 0;

            foreach (var employeeId in employeeIds)
            {
                var result = await ProcessMonthlyAccrualForEmployeeAsync(
                    employeeId, year, month, cancellationToken);

                if (result.IsSuccess)
                    successCount++;
                else
                    errorCount++;
            }

            _logger.LogInformation(
                "Completed monthly accrual processing for year {Year}, month {Month}. Success: {Success}, Errors: {Errors}",
                year, month, successCount, errorCount);

            return Result<int>.Success(successCount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error processing monthly accrual for all employees, year {Year}, month {Month}",
                year, month);
            return Result.Failure<int>($"Error processing accrual: {ex.Message}");
        }
    }

    public async Task<Result> InitializeLeaveBalanceForYearAsync(
        long employeeId,
        int year,
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Get all entitlements for this employee and year
            var entitlements = await _context.LeaveEntitlements
                .Where(e => e.EmployeeId == employeeId && e.Year == year)
                .ToListAsync(cancellationToken);

            if (!entitlements.Any())
                return Result.Failure($"No entitlements found for employee {employeeId} for year {year}");

            foreach (var entitlement in entitlements)
            {
                // Check if balance already exists
                var existingBalance = await _context.LeaveBalances
                    .FirstOrDefaultAsync(b =>
                        b.EmployeeId == employeeId &&
                        b.VacationTypeId == entitlement.VacationTypeId &&
                        b.Year == year,
                        cancellationToken);

                if (existingBalance != null)
                    continue; // Already initialized

                // Create new balance
                var balance = new LeaveBalance
                {
                    EmployeeId = employeeId,
                    VacationTypeId = entitlement.VacationTypeId,
                    Year = year,
                    EntitledDays = entitlement.AnnualDays + entitlement.CarryOverDays,
                    AccruedDays = 0, // Will be accrued monthly
                    UsedDays = 0,
                    PendingDays = 0,
                    AdjustedDays = entitlement.CarryOverDays, // Carry-over as adjustment
                    CreatedAtUtc = DateTime.UtcNow
                };

                _context.LeaveBalances.Add(balance);

                // If there's carry-over, create transaction
                if (entitlement.CarryOverDays > 0)
                {
                    await _context.SaveChangesAsync(cancellationToken); // Save to get balance ID

                    var carryOverTransaction = LeaveTransaction.CreateCarryOverTransaction(
                        balance.Id,
                        entitlement.CarryOverDays,
                        new DateTime(year, 1, 1),
                        year - 1,
                        "System");

                    carryOverTransaction.BalanceAfterTransaction = balance.CurrentBalance;
                    _context.LeaveTransactions.Add(carryOverTransaction);
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Initialized leave balance for employee {EmployeeId} for year {Year}",
                employeeId, year);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error initializing leave balance for employee {EmployeeId}, year {Year}",
                employeeId, year);
            return Result.Failure($"Error initializing balance: {ex.Message}");
        }
    }

    public async Task<Result> ReserveLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        decimal days,
        long vacationId,
        int year,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var balance = await GetLeaveBalanceAsync(employeeId, vacationTypeId, year, cancellationToken);

            if (balance == null)
                return Result.Failure("No leave balance has been assigned for this vacation type. Please contact HR to set up your leave entitlement.");

            if (!balance.HasSufficientBalance(days))
            {
                return Result.Failure(
                    $"Insufficient leave balance. Available: {balance.CurrentBalance:F2} days, Requested: {days:F2} days");
            }

            balance.ReserveBalance(days);

            var transaction = LeaveTransaction.CreateReservationTransaction(
                balance.Id,
                days,
                vacationId,
                DateTime.UtcNow,
                "System");

            transaction.BalanceAfterTransaction = balance.CurrentBalance;
            _context.LeaveTransactions.Add(transaction);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Reserved {Days} days of leave for employee {EmployeeId}, vacation {VacationId}",
                days, employeeId, vacationId);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error reserving leave balance for employee {EmployeeId}, vacation {VacationId}",
                employeeId, vacationId);
            return Result.Failure($"Error reserving balance: {ex.Message}");
        }
    }

    public async Task<Result> ReleaseLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        decimal days,
        long vacationId,
        int year,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var balance = await GetLeaveBalanceAsync(employeeId, vacationTypeId, year, cancellationToken);

            if (balance == null)
                return Result.Failure($"No leave balance found");

            balance.ReleaseReservedBalance(days);

            var transaction = LeaveTransaction.CreateReservationReleaseTransaction(
                balance.Id,
                days,
                vacationId,
                DateTime.UtcNow,
                "System");

            transaction.BalanceAfterTransaction = balance.CurrentBalance;
            _context.LeaveTransactions.Add(transaction);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Released {Days} days of reserved leave for employee {EmployeeId}, vacation {VacationId}",
                days, employeeId, vacationId);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error releasing leave balance for employee {EmployeeId}, vacation {VacationId}",
                employeeId, vacationId);
            return Result.Failure($"Error releasing balance: {ex.Message}");
        }
    }

    public async Task<Result> ConfirmLeaveUsageAsync(
        long employeeId,
        long vacationTypeId,
        decimal days,
        long vacationId,
        int year,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var balance = await GetLeaveBalanceAsync(employeeId, vacationTypeId, year, cancellationToken);

            if (balance == null)
                return Result.Failure($"No leave balance found");

            balance.ConfirmUsage(days);

            var transaction = LeaveTransaction.CreateUsageTransaction(
                balance.Id,
                days,
                vacationId,
                DateTime.UtcNow,
                "System");

            transaction.BalanceAfterTransaction = balance.CurrentBalance;
            _context.LeaveTransactions.Add(transaction);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Confirmed usage of {Days} days of leave for employee {EmployeeId}, vacation {VacationId}",
                days, employeeId, vacationId);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error confirming leave usage for employee {EmployeeId}, vacation {VacationId}",
                employeeId, vacationId);
            return Result.Failure($"Error confirming usage: {ex.Message}");
        }
    }

    public async Task<Result<bool>> CheckSufficientBalanceAsync(
        long employeeId,
        long vacationTypeId,
        decimal days,
        int year,
        CancellationToken cancellationToken = default)
    {
        var balance = await GetLeaveBalanceAsync(employeeId, vacationTypeId, year, cancellationToken);

        if (balance == null)
        {
            // Return a failure with a user-friendly message
            return Result.Failure<bool>(
                "No leave balance has been assigned to you for this vacation type. Please contact HR to set up your leave entitlement.");
        }

        if (!balance.HasSufficientBalance(days))
        {
            return Result.Failure<bool>(
                $"Insufficient leave balance. You have {balance.CurrentBalance:F1} days available but requested {days:F1} days.");
        }

        return Result<bool>.Success(true);
    }

    public async Task<LeaveBalance?> GetLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        int year,
        CancellationToken cancellationToken = default)
    {
        return await _context.LeaveBalances
            .Include(b => b.VacationType)
            .Include(b => b.Employee)
            .FirstOrDefaultAsync(b =>
                b.EmployeeId == employeeId &&
                b.VacationTypeId == vacationTypeId &&
                b.Year == year,
                cancellationToken);
    }

    public async Task<Result> ProcessYearEndCarryOverAsync(
        long employeeId,
        int fromYear,
        int toYear,
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Get balances for the year ending
            var balances = await _context.LeaveBalances
                .Include(b => b.VacationType)
                .Where(b => b.EmployeeId == employeeId && b.Year == fromYear)
                .ToListAsync(cancellationToken);

            foreach (var balance in balances)
            {
                // Get accrual policy to determine carry-over rules
                var policy = await _context.LeaveAccrualPolicies
                    .FirstOrDefaultAsync(p =>
                        p.VacationTypeId == balance.VacationTypeId &&
                        p.IsActive,
                        cancellationToken);

                if (policy == null || !policy.AllowsCarryOver)
                    continue;

                var unusedDays = balance.AccruedDays - balance.UsedDays;
                if (unusedDays <= 0)
                    continue;

                var carryOverDays = policy.CalculateAllowedCarryOver(unusedDays);
                if (carryOverDays <= 0)
                    continue;

                // Update or create entitlement for next year with carry-over
                var nextYearEntitlement = await _context.LeaveEntitlements
                    .FirstOrDefaultAsync(e =>
                        e.EmployeeId == employeeId &&
                        e.VacationTypeId == balance.VacationTypeId &&
                        e.Year == toYear,
                        cancellationToken);

                if (nextYearEntitlement != null)
                {
                    nextYearEntitlement.CarryOverDays = carryOverDays;
                    nextYearEntitlement.ModifiedAtUtc = DateTime.UtcNow;
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Processed year-end carry-over for employee {EmployeeId} from {FromYear} to {ToYear}",
                employeeId, fromYear, toYear);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error processing year-end carry-over for employee {EmployeeId}",
                employeeId);
            return Result.Failure($"Error processing carry-over: {ex.Message}");
        }
    }

    public async Task<Result> AdjustLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        decimal adjustmentDays,
        string reason,
        int year,
        string adjustedBy,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var balance = await GetLeaveBalanceAsync(employeeId, vacationTypeId, year, cancellationToken);

            if (balance == null)
                return Result.Failure($"No leave balance found");

            balance.ApplyAdjustment(adjustmentDays);

            var transaction = LeaveTransaction.CreateAdjustmentTransaction(
                balance.Id,
                adjustmentDays,
                DateTime.UtcNow,
                reason,
                adjustedBy);

            transaction.BalanceAfterTransaction = balance.CurrentBalance;
            _context.LeaveTransactions.Add(transaction);

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "Adjusted leave balance for employee {EmployeeId} by {Days} days. Reason: {Reason}",
                employeeId, adjustmentDays, reason);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex,
                "Error adjusting leave balance for employee {EmployeeId}",
                employeeId);
            return Result.Failure($"Error adjusting balance: {ex.Message}");
        }
    }

    private async Task<LeaveBalance> GetOrCreateLeaveBalanceAsync(
        long employeeId,
        long vacationTypeId,
        int year,
        decimal entitledDays,
        CancellationToken cancellationToken)
    {
        var balance = await _context.LeaveBalances
            .FirstOrDefaultAsync(b =>
                b.EmployeeId == employeeId &&
                b.VacationTypeId == vacationTypeId &&
                b.Year == year,
                cancellationToken);

        if (balance == null)
        {
            balance = new LeaveBalance
            {
                EmployeeId = employeeId,
                VacationTypeId = vacationTypeId,
                Year = year,
                EntitledDays = entitledDays,
                AccruedDays = 0,
                UsedDays = 0,
                PendingDays = 0,
                AdjustedDays = 0,
                CreatedAtUtc = DateTime.UtcNow
            };

            _context.LeaveBalances.Add(balance);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return balance;
    }
}
