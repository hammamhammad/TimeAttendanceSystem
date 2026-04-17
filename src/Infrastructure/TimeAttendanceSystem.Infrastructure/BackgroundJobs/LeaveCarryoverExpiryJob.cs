using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Phase 2 (v14.2) completion: Enforces <c>LeaveAccrualPolicy.CarryOverExpiryMonths</c>
/// which has been a passive configuration field — set by HR but never enforced — since
/// the leave module was first released.
///
/// Business rule: "Days carried over from year N-1 must be used by (month X of year N)
/// or they expire." The job runs daily at 04:00 UTC and, for each vacation type whose
/// accrual policy has <c>AllowsCarryOver=true</c> + <c>CarryOverExpiryMonths.HasValue</c>:
///
///   1. Determines today's cutoff month of the current year (start of month = expiry instant).
///   2. Finds every <see cref="LeaveBalance"/> for the current year with
///      <see cref="LeaveBalance.AdjustedDays"/> &gt; 0 AND at least one
///      <c>LeaveTransactionType.CarryOver</c> row recorded against it (marker that the
///      positive AdjustedDays came from last year).
///   3. If today is on/after the cutoff, compute the amount to claw back:
///      min(remaining carry-over, unused balance so we never take more than available).
///      Write a NEGATIVE <c>Adjustment</c> transaction and decrement <c>AdjustedDays</c>.
///   4. Record a <see cref="LeaveTransactionType.Adjustment"/> row (negative) so there is
///      a full audit trail: "Carry-over expired on 2026-04-01 per policy (3 months)."
///
/// Idempotency: the job writes a deterministic transaction marker
/// (<c>ReferenceType="CarryOverExpiry"</c> + <c>ReferenceId=leaveBalanceId</c>). A subsequent
/// run on the same day that finds an existing expiry transaction for the current year skips.
///
/// Safety:
///   - Never takes more than the current carry-over component (remaining AdjustedDays).
///   - Never touches current-year accruals (AccruedDays is untouched).
///   - Respects pending reservations implicitly — uses CurrentBalance as an upper bound.
/// </summary>
public sealed class LeaveCarryoverExpiryJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<LeaveCarryoverExpiryJob> _logger;

    public LeaveCarryoverExpiryJob(IApplicationDbContext context, ILogger<LeaveCarryoverExpiryJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        var today = DateTime.UtcNow.Date;
        var currentYear = today.Year;

        // Policies that have a carry-over expiry window configured.
        var policies = await _context.LeaveAccrualPolicies
            .Where(p => p.AllowsCarryOver && p.CarryOverExpiryMonths.HasValue)
            .ToListAsync();

        if (policies.Count == 0)
        {
            _logger.LogDebug("LeaveCarryoverExpiryJob: no policies with CarryOverExpiryMonths configured.");
            return;
        }

        int expiredRows = 0;
        decimal expiredTotal = 0m;

        foreach (var policy in policies)
        {
            // Cutoff = (start of year) + CarryOverExpiryMonths months. A setting of 3 means the
            // carry-over from last year expires on Apr 1 of the current year.
            var cutoff = new DateTime(currentYear, 1, 1).AddMonths(policy.CarryOverExpiryMonths!.Value);
            if (today < cutoff.Date) continue; // not yet past the expiry cutoff for this policy

            // Find balances for the policy's vacation type in the current year that still have
            // a positive AdjustedDays AND had a CarryOver transaction recorded.
            var balances = await _context.LeaveBalances
                .Where(b => b.VacationTypeId == policy.VacationTypeId
                         && b.Year == currentYear
                         && b.AdjustedDays > 0)
                .ToListAsync();

            foreach (var balance in balances)
            {
                // Marker: balance must have received a carry-over this year; otherwise the
                // AdjustedDays value represents a manual adjustment (not carry-over) and we
                // must not touch it.
                var hasCarryOver = await _context.LeaveTransactions.AsNoTracking()
                    .AnyAsync(t => t.LeaveBalanceId == balance.Id
                                && t.TransactionType == LeaveTransactionType.CarryOver
                                && t.TransactionDate.Year == currentYear);
                if (!hasCarryOver) continue;

                // Idempotency: already expired this year?
                var alreadyExpired = await _context.LeaveTransactions.AsNoTracking()
                    .AnyAsync(t => t.LeaveBalanceId == balance.Id
                                && t.TransactionType == LeaveTransactionType.Adjustment
                                && t.ReferenceType == "CarryOverExpiry"
                                && t.TransactionDate.Year == currentYear);
                if (alreadyExpired) continue;

                // Compute the net carry-over still in the balance: sum of CarryOver transactions
                // minus previously-expired adjustments of the same reference type for this year.
                var carryOverSum = await _context.LeaveTransactions.AsNoTracking()
                    .Where(t => t.LeaveBalanceId == balance.Id
                             && t.TransactionType == LeaveTransactionType.CarryOver
                             && t.TransactionDate.Year == currentYear)
                    .SumAsync(t => t.Days);

                if (carryOverSum <= 0) continue;

                // Never expire more than is actually still sitting in the balance. This also
                // guarantees we never go negative on AdjustedDays OR on CurrentBalance.
                var currentBalance = balance.AccruedDays + balance.AdjustedDays
                                     - balance.UsedDays - balance.PendingDays;
                if (currentBalance <= 0) continue;

                var amountToExpire = Math.Min(carryOverSum, Math.Min(balance.AdjustedDays, currentBalance));
                if (amountToExpire <= 0) continue;

                balance.AdjustedDays -= amountToExpire;
                balance.ModifiedAtUtc = DateTime.UtcNow;

                var tx = new LeaveTransaction
                {
                    LeaveBalanceId = balance.Id,
                    TransactionType = LeaveTransactionType.Adjustment,
                    Days = -amountToExpire, // NEGATIVE — carry-over clawed back
                    ReferenceType = "CarryOverExpiry",
                    ReferenceId = balance.Id,
                    TransactionDate = today,
                    Notes = $"Carry-over expired per policy '{policy.Name}' ({policy.CarryOverExpiryMonths} months).",
                    CreatedBy = "SYSTEM:LeaveCarryoverExpiryJob",
                    CreatedAtUtc = DateTime.UtcNow
                };
                _context.LeaveTransactions.Add(tx);

                expiredRows++;
                expiredTotal += amountToExpire;
            }
        }

        if (expiredRows > 0)
            await _context.SaveChangesAsync();

        _logger.LogInformation(
            "LeaveCarryoverExpiryJob: expired {Count} carry-over balances totalling {Days:0.00} days.",
            expiredRows, expiredTotal);
    }
}
