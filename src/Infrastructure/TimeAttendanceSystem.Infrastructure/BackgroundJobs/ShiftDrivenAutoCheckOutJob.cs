using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Shifts;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Phase 3 (v14.3): Shift-driven auto-checkout job.
///
/// The legacy <c>CompanySettings.AutoCheckOutEnabled</c> + <c>AutoCheckOutTime</c> settings
/// assume a single company-wide clockout time which doesn't model real organisations with
/// multiple shifts. This job replaces that model with a per-employee, shift-aware
/// automatic checkout driven by each employee's <b>effective shift for the attendance date</b>.
///
/// Resolution rules:
///   1. Find all employees with an <see cref="AttendanceTransaction.TransactionType"/> of
///      CheckIn on a target date who have no matching CheckOut.
///   2. Resolve the effective shift via <see cref="IAttendanceCalculationService.GetEffectiveShiftAssignmentAsync"/>
///      (reuses the priority chain Employee → Department → Branch already used by the daily
///      attendance generator, so there is a single authoritative shift-resolver in the system).
///   3. Skip employees whose shift has <see cref="Shift.IsCheckInRequired"/>=false
///      (the shift is informational only; absence isn't flagged and neither is missing checkout).
///   4. Skip attendance records that are already finalized, on leave, on holiday, or absent.
///   5. Compute the expected checkout UTC instant as <c>shift end time (from last ShiftPeriod)
///      + GracePeriodMinutes (if configured)</c>, converted from branch-local wall-clock to UTC
///      using <see cref="ITimezoneService"/>. Overnight shifts (where the period's EndTime is
///      earlier than StartTime) are handled by adding 1 day to the attendance date before
///      converting to UTC.
///   6. Only emit the auto-checkout if <c>DateTime.UtcNow &gt;= expectedCheckoutUtc</c>, i.e.
///      the shift has actually ended. Running the job hourly during the day won't prematurely
///      check out employees whose shift hasn't finished.
///
/// Safety & idempotency:
///   - A second run on the same day for the same employee finds the newly-created
///     <see cref="TransactionType.AutoCheckOut"/> transaction and skips.
///   - Duplicate prevention also matches manual <see cref="TransactionType.CheckOut"/>
///     transactions so a manually-entered checkout after the job started isn't overwritten.
///   - The inserted transaction is flagged with <c>IsManual=true</c> + <c>EnteredByUserId=null</c>
///     + <c>Notes</c> identifying the source shift so HR can trace every auto-checkout.
///   - If shift resolution fails (no assignment + no default), the employee is logged and
///     SKIPPED — never a silent fake checkout.
///
/// Cadence: scheduled hourly. A shift that ends at 17:00 with a 15-min grace results in the
/// auto-checkout being written on the next hourly tick after 17:15 branch-local.
/// </summary>
public sealed class ShiftDrivenAutoCheckOutJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly ITimezoneService _timezoneService;
    private readonly ILogger<ShiftDrivenAutoCheckOutJob> _logger;

    public ShiftDrivenAutoCheckOutJob(
        IApplicationDbContext context,
        IAttendanceCalculationService calculationService,
        ITimezoneService timezoneService,
        ILogger<ShiftDrivenAutoCheckOutJob> logger)
    {
        _context = context;
        _calculationService = calculationService;
        _timezoneService = timezoneService;
        _logger = logger;
    }

    public async Task Invoke()
    {
        var report = await ExecuteAsync(CancellationToken.None);
        _logger.LogInformation(
            "ShiftDrivenAutoCheckOutJob: created {Created} auto-checkouts; skipped {Skipped} (already closed/on-leave/no-shift/shift-not-ended).",
            report.CreatedCount, report.SkippedCount);
    }

    /// <summary>
    /// Exposed for manual/test invocation. Returns a report of what was done so tests and
    /// admin endpoints can assert on the outcome.
    /// </summary>
    public async Task<AutoCheckOutReport> ExecuteAsync(CancellationToken ct)
    {
        var report = new AutoCheckOutReport();
        var nowUtc = DateTime.UtcNow;

        // Consider the last 2 days of attendance dates — covers overnight shifts whose
        // expected-checkout time falls into the following calendar day.
        var fromDate = nowUtc.Date.AddDays(-2);
        var toDate = nowUtc.Date.AddDays(1); // include today (branch-local bucket can differ)

        // Find open check-ins: every CheckIn transaction on the relevant date range whose
        // employee has no matching CheckOut / AutoCheckOut on the same AttendanceDate.
        var openCheckIns = await _context.AttendanceTransactions
            .Where(t => !t.IsDeleted
                     && t.TransactionType == TransactionType.CheckIn
                     && t.AttendanceDate >= fromDate
                     && t.AttendanceDate <= toDate)
            .Select(t => new { t.EmployeeId, t.AttendanceDate, t.TransactionTimeUtc })
            .ToListAsync(ct);

        // Group by (employeeId, attendanceDate) and pick the earliest check-in per bucket.
        var groups = openCheckIns
            .GroupBy(x => new { x.EmployeeId, Date = x.AttendanceDate.Date })
            .Select(g => new
            {
                g.Key.EmployeeId,
                g.Key.Date,
                FirstCheckInUtc = g.Min(x => x.TransactionTimeUtc)
            })
            .ToList();

        foreach (var g in groups)
        {
            ct.ThrowIfCancellationRequested();

            // Already has a closing transaction? → skip.
            var alreadyClosed = await _context.AttendanceTransactions.AsNoTracking()
                .AnyAsync(t => !t.IsDeleted
                            && t.EmployeeId == g.EmployeeId
                            && t.AttendanceDate.Date == g.Date
                            && (t.TransactionType == TransactionType.CheckOut
                                || t.TransactionType == TransactionType.AutoCheckOut), ct);
            if (alreadyClosed)
            {
                report.SkippedCount++;
                continue;
            }

            // Ignore records that are finalized / on leave / holiday / absent —
            // their status says there should be no work day at all.
            var rec = await _context.AttendanceRecords.AsNoTracking()
                .Where(r => !r.IsDeleted
                         && r.EmployeeId == g.EmployeeId
                         && r.AttendanceDate.Date == g.Date)
                .Select(r => new { r.Status, r.IsFinalized })
                .FirstOrDefaultAsync(ct);
            if (rec != null && rec.IsFinalized)
            {
                report.SkippedCount++;
                report.Skips.Add(new AutoCheckOutSkip(g.EmployeeId, g.Date, "AttendanceRecordFinalized"));
                continue;
            }
            if (rec != null
                && (rec.Status == AttendanceStatus.OnLeave
                    || rec.Status == AttendanceStatus.Holiday
                    || rec.Status == AttendanceStatus.Absent
                    || rec.Status == AttendanceStatus.DayOff))
            {
                report.SkippedCount++;
                report.Skips.Add(new AutoCheckOutSkip(g.EmployeeId, g.Date, $"AttendanceStatus={rec.Status}"));
                continue;
            }

            // Resolve the effective shift + its owning branch via the same service the daily
            // attendance generator uses — single source of truth for shift resolution.
            var shiftAssignment = await _calculationService.GetEffectiveShiftAssignmentAsync(
                g.EmployeeId, g.Date, ct);
            if (shiftAssignment == null)
            {
                report.SkippedCount++;
                report.Skips.Add(new AutoCheckOutSkip(g.EmployeeId, g.Date, "NoEffectiveShift"));
                _logger.LogWarning(
                    "Auto-checkout skipped: employee {EmployeeId} has no effective shift for {Date}; not creating a fake checkout.",
                    g.EmployeeId, g.Date);
                continue;
            }

            var shift = await _context.Shifts
                .Include(s => s.ShiftPeriods)
                .FirstOrDefaultAsync(s => s.Id == shiftAssignment.ShiftId && !s.IsDeleted, ct);
            if (shift == null || shift.Status != ShiftStatus.Active)
            {
                report.SkippedCount++;
                report.Skips.Add(new AutoCheckOutSkip(g.EmployeeId, g.Date, "ShiftMissingOrInactive"));
                continue;
            }

            // Informational-only shift: we never synthesize a checkout.
            if (!shift.IsCheckInRequired)
            {
                report.SkippedCount++;
                report.Skips.Add(new AutoCheckOutSkip(g.EmployeeId, g.Date, "ShiftIsCheckInOptional"));
                continue;
            }

            // Resolve the end-of-shift local wall-clock time.
            var periods = shift.ShiftPeriods
                .Where(p => !p.IsDeleted)
                .OrderBy(p => p.PeriodOrder)
                .ToList();
            if (periods.Count == 0)
            {
                report.SkippedCount++;
                report.Skips.Add(new AutoCheckOutSkip(g.EmployeeId, g.Date, "ShiftHasNoPeriods"));
                continue;
            }

            var last = periods[^1];

            // Overnight shift: if the last period's EndTime is earlier than its StartTime,
            // the end is on the NEXT calendar day in branch-local terms.
            var endLocalDate = last.IsNightPeriod || last.EndTime < last.StartTime
                ? g.Date.AddDays(1)
                : g.Date;
            var endLocal = endLocalDate
                .Add(last.EndTime.ToTimeSpan())
                .AddMinutes(shift.GracePeriodMinutes ?? 0);

            // Resolve branch id from the assignment (or fall through — we'll ask the employee's branch).
            long? branchId = shiftAssignment.BranchId
                ?? await _context.Employees.AsNoTracking()
                    .Where(e => e.Id == g.EmployeeId)
                    .Select(e => (long?)e.BranchId)
                    .FirstOrDefaultAsync(ct);

            var endUtc = await _timezoneService.FromBranchLocalAsync(endLocal, branchId, ct);

            // Shift hasn't ended yet? Don't auto-checkout early.
            if (nowUtc < endUtc)
            {
                report.SkippedCount++;
                report.Skips.Add(new AutoCheckOutSkip(g.EmployeeId, g.Date, "ShiftNotYetEnded"));
                continue;
            }

            // Check-in must precede the auto-checkout instant (defensive safety — this should
            // always be true but prevents impossible transaction sequences if clocks drift).
            if (g.FirstCheckInUtc >= endUtc)
            {
                report.SkippedCount++;
                report.Skips.Add(new AutoCheckOutSkip(g.EmployeeId, g.Date, "CheckInAfterComputedCheckOut"));
                continue;
            }

            var localEndForStorage = await _timezoneService.ToBranchLocalAsync(endUtc, branchId, ct);
            var tx = new AttendanceTransaction
            {
                EmployeeId = g.EmployeeId,
                TransactionType = TransactionType.AutoCheckOut,
                TransactionTimeUtc = endUtc,
                TransactionTimeLocal = localEndForStorage,
                AttendanceDate = DateTime.SpecifyKind(g.Date, DateTimeKind.Unspecified),
                IsManual = true,
                EnteredByUserId = null,
                Notes = $"Auto-checkout: shift '{shift.Name}' ended at {last.EndTime:HH:mm} (+ grace {shift.GracePeriodMinutes ?? 0}m).",
                Location = "SYSTEM",
                DeviceId = "SYSTEM:ShiftDrivenAutoCheckOutJob",
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "SYSTEM:ShiftDrivenAutoCheckOutJob"
            };
            _context.AttendanceTransactions.Add(tx);
            report.CreatedCount++;
            report.Creations.Add(new AutoCheckOutCreation(g.EmployeeId, g.Date, shift.Id, shift.Name, endUtc));
        }

        if (report.CreatedCount > 0)
            await _context.SaveChangesAsync(ct);

        return report;
    }
}

/// <summary>Phase 3 auto-checkout report payload. Used by tests and auditing.</summary>
public sealed class AutoCheckOutReport
{
    public int CreatedCount { get; set; }
    public int SkippedCount { get; set; }
    public List<AutoCheckOutCreation> Creations { get; } = new();
    public List<AutoCheckOutSkip> Skips { get; } = new();
}

public sealed record AutoCheckOutCreation(long EmployeeId, DateTime AttendanceDate, long ShiftId, string ShiftName, DateTime CheckoutUtc);
public sealed record AutoCheckOutSkip(long EmployeeId, DateTime AttendanceDate, string Reason);
