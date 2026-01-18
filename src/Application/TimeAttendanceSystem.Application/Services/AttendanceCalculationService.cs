using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Extensions;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Shifts;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Vacations;
using TimeAttendanceSystem.Domain.RemoteWork;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Services;

/// <summary>
/// Service implementation for attendance calculation operations.
/// Provides comprehensive attendance calculation methods based on transactions and shift rules.
/// </summary>
public class AttendanceCalculationService : IAttendanceCalculationService
{
    private readonly IApplicationDbContext _context;
    private readonly IOvertimeConfigurationService _overtimeConfigService;
    private readonly IPublicHolidayService _publicHolidayService;
    private readonly ILogger<AttendanceCalculationService>? _logger;

    public AttendanceCalculationService(
        IApplicationDbContext context,
        IOvertimeConfigurationService overtimeConfigService,
        IPublicHolidayService publicHolidayService,
        ILogger<AttendanceCalculationService>? logger = null)
    {
        _context = context;
        _overtimeConfigService = overtimeConfigService;
        _publicHolidayService = publicHolidayService;
        _logger = logger;
    }

    public async Task<AttendanceRecord> CalculateAttendanceAsync(
        long employeeId,
        DateTime attendanceDate,
        IEnumerable<AttendanceTransaction> transactions,
        ShiftAssignment? shiftAssignment,
        CancellationToken cancellationToken = default)
    {
        var transactionsList = transactions.OrderBy(t => t.TransactionTimeUtc).ToList();
        var shift = shiftAssignment?.Shift;

        // Calculate basic time information
        var (workingHours, breakHours) = await CalculateWorkingHoursAsync(transactionsList, cancellationToken);
        var scheduledHours = CalculateScheduledHours(shift, attendanceDate);

        // Get check-in/out times
        var checkInTransaction = transactionsList.FirstOrDefault(t => t.TransactionType == TransactionType.CheckIn);
        var checkOutTransaction = transactionsList.FirstOrDefault(t =>
            t.TransactionType == TransactionType.CheckOut || t.TransactionType == TransactionType.AutoCheckOut);

        // Calculate scheduled times
        var (scheduledStartTime, scheduledEndTime) = GetScheduledTimes(shift, attendanceDate);

        // Determine attendance status first to check if it's a holiday
        var status = await DetermineAttendanceStatusAsync(employeeId, shift, transactionsList, attendanceDate, cancellationToken);

        // Calculate late and early leave minutes ONLY if it's NOT a holiday, excused, or on duty
        // On holidays and excused days, employees should not be penalized for lateness or early leave
        var lateMinutes = 0;
        var earlyLeaveMinutes = 0;

        if (status != AttendanceStatus.Holiday &&
            status != AttendanceStatus.Excused &&
            status != AttendanceStatus.OnDuty &&
            status != AttendanceStatus.OnLeave)
        {
            lateMinutes = await CalculateLateMinutesAsync(
                scheduledStartTime,
                checkInTransaction?.TransactionTimeLocal,
                shift,
                cancellationToken);

            earlyLeaveMinutes = await CalculateEarlyLeaveMinutesAsync(
                scheduledEndTime,
                checkOutTransaction?.TransactionTimeLocal,
                checkInTransaction?.TransactionTimeLocal,
                shift,
                cancellationToken);

            // Apply excuse offsets to late and early leave minutes for partial excuses
            var approvedExcuses = await GetApprovedExcusesForDateAsync(employeeId, attendanceDate, cancellationToken);
            if (approvedExcuses.Any())
            {
                var excuseOffset = CalculateExcuseOffset(
                    approvedExcuses,
                    scheduledStartTime,
                    scheduledEndTime,
                    checkInTransaction?.TransactionTimeLocal,
                    checkOutTransaction?.TransactionTimeLocal,
                    shift);

                // Offset late minutes (cannot go negative)
                var originalLateMinutes = lateMinutes;
                lateMinutes = Math.Max(0, lateMinutes - excuseOffset.LateMinutesOffset);

                // Offset early leave minutes (cannot go negative)
                var originalEarlyLeaveMinutes = earlyLeaveMinutes;
                earlyLeaveMinutes = Math.Max(0, earlyLeaveMinutes - excuseOffset.EarlyLeaveMinutesOffset);

                if (originalLateMinutes != lateMinutes || originalEarlyLeaveMinutes != earlyLeaveMinutes)
                {
                    _logger?.LogDebug("Applied excuse offset for employee {EmployeeId} on {Date}. Late: {OriginalLate} -> {AdjustedLate}, Early: {OriginalEarly} -> {AdjustedEarly}",
                        employeeId, attendanceDate.Date, originalLateMinutes, lateMinutes, originalEarlyLeaveMinutes, earlyLeaveMinutes);
                }
            }
        }

        // Calculate comprehensive overtime details
        var overtimeResult = await CalculateOvertimeAsync(employeeId, attendanceDate, transactionsList, shift, cancellationToken);
        var activeOvertimeConfig = await _overtimeConfigService.GetActiveConfigurationAsync(cancellationToken);

        var attendanceRecord = new AttendanceRecord
        {
            EmployeeId = employeeId,
            AttendanceDate = attendanceDate,
            ShiftAssignmentId = shiftAssignment?.Id,
            Status = status,
            ScheduledStartTime = scheduledStartTime,
            ScheduledEndTime = scheduledEndTime,
            ActualCheckInTime = checkInTransaction?.TransactionTimeLocal,
            ActualCheckOutTime = checkOutTransaction?.TransactionTimeLocal,
            ScheduledHours = scheduledHours,
            WorkingHours = workingHours,
            BreakHours = breakHours,
            OvertimeHours = overtimeResult.TotalOvertimeHours,
            LateMinutes = lateMinutes,
            EarlyLeaveMinutes = earlyLeaveMinutes
        };

        // Update comprehensive overtime details
        attendanceRecord.UpdateOvertimeDetails(
            overtimeResult.PreShiftOvertime.FinalHours,
            overtimeResult.PostShiftOvertime.FinalHours,
            overtimeResult.BaseOvertimeRate,
            overtimeResult.DayType,
            activeOvertimeConfig.Id,
            string.Join(" | ", overtimeResult.CalculationNotes)
        );

        return attendanceRecord;
    }

    public async Task<AttendanceRecord> RecalculateAttendanceAsync(
        AttendanceRecord attendanceRecord,
        IEnumerable<AttendanceTransaction> transactions,
        CancellationToken cancellationToken = default)
    {
        // IMPORTANT: Use the historical shift assignment stored in the attendance record
        // This ensures recalculation uses the shift that was active on that specific date
        ShiftAssignment? shiftAssignment = null;
        if (attendanceRecord.ShiftAssignmentId.HasValue)
        {
            shiftAssignment = await _context.ShiftAssignments
                .Include(sa => sa.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
                .AsNoTracking()
                .FirstOrDefaultAsync(sa => sa.Id == attendanceRecord.ShiftAssignmentId.Value, cancellationToken);

            if (shiftAssignment == null)
            {
                // Log warning if historical shift assignment is not found
                // This might happen if the shift assignment was deleted
                // In this case, we'll recalculate without shift assignment
                _logger?.LogWarning("Historical shift assignment {ShiftAssignmentId} not found for attendance record {AttendanceRecordId} on {Date}. Recalculating without shift assignment.",
                    attendanceRecord.ShiftAssignmentId.Value, attendanceRecord.Id, attendanceRecord.AttendanceDate.Date);
            }
        }

        // Recalculate using the historical shift assignment (not current assignment)
        var recalculatedRecord = await CalculateAttendanceAsync(
            attendanceRecord.EmployeeId,
            attendanceRecord.AttendanceDate,
            transactions,
            shiftAssignment,
            cancellationToken);

        // Preserve original record metadata and manual adjustments
        recalculatedRecord.Id = attendanceRecord.Id;

        // Preserve manual override information
        recalculatedRecord.IsManualOverride = attendanceRecord.IsManualOverride;
        recalculatedRecord.OverrideByUserId = attendanceRecord.OverrideByUserId;
        recalculatedRecord.OverrideAtUtc = attendanceRecord.OverrideAtUtc;
        recalculatedRecord.OverrideNotes = attendanceRecord.OverrideNotes;

        // Preserve approval information
        recalculatedRecord.IsApproved = attendanceRecord.IsApproved;
        recalculatedRecord.ApprovedByUserId = attendanceRecord.ApprovedByUserId;
        recalculatedRecord.ApprovedAtUtc = attendanceRecord.ApprovedAtUtc;

        // Preserve finalization status
        recalculatedRecord.IsFinalized = attendanceRecord.IsFinalized;
        recalculatedRecord.Notes = attendanceRecord.Notes;

        return recalculatedRecord;
    }

    public async Task<WorkingDay> CalculateWorkingDayAsync(
        AttendanceRecord attendanceRecord,
        IEnumerable<AttendanceTransaction> transactions,
        CancellationToken cancellationToken = default)
    {
        var transactionsList = transactions.OrderBy(t => t.TransactionTimeUtc).ToList();

        var workStartTime = transactionsList.FirstOrDefault(t => t.TransactionType == TransactionType.CheckIn)?.TransactionTimeLocal;
        var workEndTime = transactionsList.LastOrDefault(t =>
            t.TransactionType == TransactionType.CheckOut || t.TransactionType == TransactionType.AutoCheckOut)?.TransactionTimeLocal;

        var totalTimeOnPremises = 0m;
        if (workStartTime.HasValue && workEndTime.HasValue)
        {
            totalTimeOnPremises = (decimal)(workEndTime.Value - workStartTime.Value).TotalHours;
        }

        var breakPeriods = GetBreakPeriods(transactionsList);
        var totalBreakTime = breakPeriods.Sum(bp => bp.Duration);
        var longestBreakDuration = breakPeriods.Any() ? breakPeriods.Max(bp => bp.Duration) : 0m;

        var efficiency = totalTimeOnPremises > 0 ? (attendanceRecord.WorkingHours / totalTimeOnPremises) * 100 : 0m;

        var workingDay = new WorkingDay
        {
            AttendanceRecordId = attendanceRecord.Id,
            WorkStartTime = workStartTime,
            WorkEndTime = workEndTime,
            TotalTimeOnPremises = totalTimeOnPremises,
            ProductiveWorkingTime = attendanceRecord.WorkingHours,
            TotalBreakTime = totalBreakTime,
            BreakPeriodCount = breakPeriods.Count,
            LongestBreakDuration = longestBreakDuration,
            CoreHoursWorked = 0m, // TODO: Implement core hours calculation
            CoreHoursCompliant = true, // TODO: Implement core hours compliance check
            RegularOvertimeHours = attendanceRecord.OvertimeHours,
            PremiumOvertimeHours = 0m, // TODO: Implement premium overtime tiers
            EarlyStartHours = 0m, // TODO: Implement early start calculation
            LateEndHours = 0m, // TODO: Implement late end calculation
            EfficiencyPercentage = Math.Min(100, Math.Max(0, efficiency)),
            TrackingGaps = 0m, // TODO: Implement tracking gap detection
            IsCalculationComplete = true
        };

        return workingDay;
    }

    public async Task<AttendanceStatus> DetermineAttendanceStatusAsync(
        Shift? shift,
        IEnumerable<AttendanceTransaction> transactions,
        DateTime attendanceDate,
        CancellationToken cancellationToken = default)
    {
        // Call the overloaded method with employeeId = 0 for backward compatibility
        return await DetermineAttendanceStatusAsync(0, shift, transactions, attendanceDate, cancellationToken);
    }

    public async Task<AttendanceStatus> DetermineAttendanceStatusAsync(
        long employeeId,
        Shift? shift,
        IEnumerable<AttendanceTransaction> transactions,
        DateTime attendanceDate,
        CancellationToken cancellationToken = default)
    {
        var transactionsList = transactions.ToList();

        // Rule 1: Check for holidays FIRST (highest priority - holidays override all other rules)
        if (employeeId > 0)
        {
            var employee = await _context.Employees
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == employeeId && !e.IsDeleted, cancellationToken);

            // Check for holiday even if employee is not found - use null branchId for national holidays
            var branchId = employee?.BranchId;
            var isHoliday = await _publicHolidayService.IsHolidayAsync(attendanceDate, branchId, cancellationToken);

            if (isHoliday)
            {
                _logger?.LogInformation("Holiday detected for date {Date} and employee {EmployeeId} (branch {BranchId}). Setting status to Holiday.",
                    attendanceDate.Date, employeeId, branchId);
                return AttendanceStatus.Holiday; // Public holiday - always mark as Holiday
            }

            // Rule 1.5: Check for approved leave SECOND (higher priority than day off)
            var normalizedAttendanceDate = attendanceDate.ToUtcDate();
            var isOnLeave = await _context.EmployeeVacations
                .AsNoTracking()
                .AnyAsync(ev => ev.EmployeeId == employeeId &&
                              ev.IsApproved &&
                              !ev.IsDeleted &&
                              normalizedAttendanceDate >= ev.StartDate.Date &&
                              normalizedAttendanceDate <= ev.EndDate.Date,
                         cancellationToken);

            if (isOnLeave)
            {
                _logger?.LogInformation("Approved leave detected for date {Date} and employee {EmployeeId}. Setting status to OnLeave.",
                    attendanceDate.Date, employeeId);
                return AttendanceStatus.OnLeave; // Approved leave - mark as OnLeave
            }

            // Rule 1.6: Check for approved remote work THIRD (higher priority than day off)
            var attendanceDateOnly = DateOnly.FromDateTime(attendanceDate.Date);
            var isRemoteWork = await _context.RemoteWorkRequests
                .AsNoTracking()
                .AnyAsync(rw => rw.EmployeeId == employeeId &&
                              rw.Status == RemoteWorkRequestStatus.Approved &&
                              !rw.IsDeleted &&
                              attendanceDateOnly >= rw.StartDate &&
                              attendanceDateOnly <= rw.EndDate,
                         cancellationToken);

            if (isRemoteWork)
            {
                _logger?.LogInformation("Approved remote work detected for date {Date} and employee {EmployeeId}. Setting status to RemoteWork.",
                    attendanceDate.Date, employeeId);
                return AttendanceStatus.RemoteWork; // Approved remote work - mark as RemoteWork
            }

            // Rule 1.7: Check for approved FULL-DAY excuses FOURTH (higher priority than day off for full-day excuses)
            var approvedExcuses = await GetApprovedExcusesForDateAsync(employeeId, attendanceDate, cancellationToken);
            if (approvedExcuses.Any())
            {
                var totalExcuseHours = approvedExcuses.Sum(e => e.DurationHours);

                // For full-day excuses (8+ hours or covers entire scheduled shift), set status directly
                if (totalExcuseHours >= 8m)
                {
                    var dominantExcuseType = approvedExcuses.OrderByDescending(e => e.DurationHours).First().ExcuseType;
                    if (dominantExcuseType == ExcuseType.OfficialDuty)
                    {
                        _logger?.LogInformation("Full-day official duty detected for date {Date} and employee {EmployeeId}. Setting status to OnDuty.",
                            attendanceDate.Date, employeeId);
                        return AttendanceStatus.OnDuty;
                    }
                    else
                    {
                        _logger?.LogInformation("Full-day excuse detected for date {Date} and employee {EmployeeId}. Setting status to Excused.",
                            attendanceDate.Date, employeeId);
                        return AttendanceStatus.Excused;
                    }
                }
                // For partial excuses, continue with normal status determination
                // The late/early minutes will be adjusted in CalculateAttendanceAsync
            }

            // Log if employee not found for debugging
            if (employee == null)
            {
                _logger?.LogWarning("Employee {EmployeeId} not found or deleted when calculating attendance for {Date}",
                    employeeId, attendanceDate.Date);
            }
        }
        else
        {
            // If no employeeId provided, still check for national holidays
            var isNationalHoliday = await _publicHolidayService.IsHolidayAsync(attendanceDate, null, cancellationToken);
            if (isNationalHoliday)
            {
                _logger?.LogInformation("National holiday detected for date {Date}. Setting status to Holiday.", attendanceDate.Date);
                return AttendanceStatus.Holiday;
            }
        }

        // Rule 2: If employee has no shift assignment
        if (shift == null)
        {
            // No shift assignment means not scheduled to work = DayOff
            if (!transactionsList.Any())
            {
                return AttendanceStatus.DayOff;
            }

            // If they have transactions despite no shift, they worked on their day off
            var hasCheckInNoShift = transactionsList.Any(t => t.TransactionType == TransactionType.CheckIn);
            return hasCheckInNoShift ? AttendanceStatus.Overtime : AttendanceStatus.Incomplete;
        }

        // Rule 2: Check if it's a working day for the employee's shift
        var isWorkingDay = IsWorkingDay(shift, attendanceDate);

        // Rule 3: Handle no transactions case based on working day status
        if (!transactionsList.Any())
        {
            // No transactions: DayOff for non-working days, Absent for working days
            return isWorkingDay ? AttendanceStatus.Absent : AttendanceStatus.DayOff;
        }

        // Rule 4: Handle transactions on non-working days
        if (!isWorkingDay)
        {
            // If not a working day but employee has transactions, they worked on their day off
            if (transactionsList.Any(t => t.TransactionType == TransactionType.CheckIn))
            {
                return AttendanceStatus.Overtime; // Working on non-scheduled day
            }
            return AttendanceStatus.DayOff;
        }

        // Rule 5: For working days with transactions, determine status based on shift rules

        // Check for check-in
        var hasCheckIn = transactionsList.Any(t => t.TransactionType == TransactionType.CheckIn);
        var hasCheckOut = transactionsList.Any(t =>
            t.TransactionType == TransactionType.CheckOut || t.TransactionType == TransactionType.AutoCheckOut);

        // If no check-in transaction, status is Absent (unless it's not required)
        if (!hasCheckIn)
        {
            return shift?.IsCheckInRequired == false ? AttendanceStatus.Present : AttendanceStatus.Absent;
        }

        // If check-in but no check-out, status is Incomplete
        if (!hasCheckOut)
        {
            return AttendanceStatus.Incomplete;
        }

        // Check for late arrival
        var checkInTransaction = transactionsList.First(t => t.TransactionType == TransactionType.CheckIn);
        if (shift != null)
        {
            var (scheduledStartTime, _) = GetScheduledTimes(shift, attendanceDate);
            if (scheduledStartTime.HasValue)
            {
                var lateMinutes = await CalculateLateMinutesAsync(
                    scheduledStartTime,
                    checkInTransaction.TransactionTimeLocal,
                    shift,
                    cancellationToken);

                if (lateMinutes > 0)
                {
                    return AttendanceStatus.Late;
                }
            }
        }

        // Check for early leave
        var checkOutTransaction = transactionsList.First(t =>
            t.TransactionType == TransactionType.CheckOut || t.TransactionType == TransactionType.AutoCheckOut);
        if (shift != null)
        {
            var (_, scheduledEndTime) = GetScheduledTimes(shift, attendanceDate);
            if (scheduledEndTime.HasValue)
            {
                var earlyLeaveMinutes = await CalculateEarlyLeaveMinutesAsync(
                    scheduledEndTime,
                    checkOutTransaction.TransactionTimeLocal,
                    checkInTransaction.TransactionTimeLocal,
                    shift,
                    cancellationToken);

                if (earlyLeaveMinutes > 0)
                {
                    return AttendanceStatus.EarlyLeave;
                }
            }
        }

        return AttendanceStatus.Present;
    }

    public async Task<(decimal WorkingHours, decimal BreakHours)> CalculateWorkingHoursAsync(
        IEnumerable<AttendanceTransaction> transactions,
        CancellationToken cancellationToken = default)
    {
        var transactionsList = transactions.OrderBy(t => t.TransactionTimeUtc).ToList();

        decimal workingHours = 0;
        decimal breakHours = 0;

        DateTime? workStart = null;
        DateTime? breakStart = null;

        foreach (var transaction in transactionsList)
        {
            switch (transaction.TransactionType)
            {
                case TransactionType.CheckIn:
                    workStart = transaction.TransactionTimeLocal;
                    break;

                case TransactionType.CheckOut:
                case TransactionType.AutoCheckOut:
                    if (workStart.HasValue)
                    {
                        var sessionHours = (decimal)(transaction.TransactionTimeLocal - workStart.Value).TotalHours;
                        workingHours += sessionHours;
                    }
                    workStart = null;
                    break;

                case TransactionType.BreakStart:
                    breakStart = transaction.TransactionTimeLocal;
                    break;

                case TransactionType.BreakEnd:
                    if (breakStart.HasValue)
                    {
                        var breakSessionHours = (decimal)(transaction.TransactionTimeLocal - breakStart.Value).TotalHours;
                        breakHours += breakSessionHours;
                    }
                    breakStart = null;
                    break;
            }
        }

        return (Math.Max(0, workingHours), Math.Max(0, breakHours));
    }

    public async Task<OvertimeCalculationResult> CalculateOvertimeAsync(
        long employeeId,
        DateTime attendanceDate,
        IEnumerable<AttendanceTransaction> transactions,
        Shift? shift,
        CancellationToken cancellationToken = default)
    {
        var result = new OvertimeCalculationResult
        {
            IsOvertimeEnabled = false,
            DayType = Domain.Settings.DayType.Normal,
            BaseOvertimeRate = 0,
            ConsideredFlexibleTime = false
        };

        // Get employee's branch for day type calculation
        var employee = await _context.Employees
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == employeeId, cancellationToken);

        if (employee == null)
        {
            result.CalculationNotes.Add("Employee not found");
            return result;
        }

        var branchId = employee.BranchId;

        // Get overtime configuration
        var config = await _overtimeConfigService.GetActiveConfigurationAsync(cancellationToken);
        result.ConsideredFlexibleTime = config.ConsiderFlexibleTime;

        // Check if it's a holiday and adjust day type accordingly
        var isHoliday = await _publicHolidayService.IsHolidayAsync(attendanceDate, branchId, cancellationToken);

        // Get day type and overtime rate
        result.DayType = isHoliday ? Domain.Settings.DayType.PublicHoliday : await _overtimeConfigService.GetDayTypeAsync(attendanceDate, branchId, cancellationToken);
        result.BaseOvertimeRate = await _overtimeConfigService.GetOvertimeRateAsync(attendanceDate, branchId, cancellationToken);

        // The overtime rate is already adjusted for holidays by the OvertimeConfigurationService
        if (isHoliday)
        {
            result.CalculationNotes.Add("Public holiday overtime rate applied");
        }

        var transactionsList = transactions.OrderBy(t => t.TransactionTimeUtc).ToList();

        if (!transactionsList.Any())
        {
            result.CalculationNotes.Add("No transactions found for the day");
            return result;
        }

        // Calculate working hours and periods
        var (totalWorkingHours, breakHours) = await CalculateWorkingHoursAsync(transactionsList, cancellationToken);
        var scheduledHours = CalculateScheduledHours(shift, attendanceDate);

        if (shift == null)
        {
            result.CalculationNotes.Add("No shift assignment found");
            return result;
        }

        var (scheduledStartTime, scheduledEndTime) = GetScheduledTimes(shift, attendanceDate);

        if (!scheduledStartTime.HasValue || !scheduledEndTime.HasValue)
        {
            result.CalculationNotes.Add("Unable to determine scheduled start/end times");
            return result;
        }

        // SPECIAL CASE: For public holidays, ALL working hours are considered overtime
        if (isHoliday)
        {
            result.IsOvertimeEnabled = true;
            result.PostShiftOvertime.IsEnabled = true;
            result.PostShiftOvertime.RawHours = totalWorkingHours;
            result.PostShiftOvertime.FlexibleTimeAdjustedHours = totalWorkingHours;
            result.PostShiftOvertime.FinalHours = totalWorkingHours;
            result.PostShiftOvertime.MetMinimumThreshold = totalWorkingHours > 0;
            result.PostShiftOvertime.Notes.Add($"Public holiday: All {totalWorkingHours:F2}h working hours counted as overtime");
            result.CalculationNotes.Add($"Holiday overtime: {totalWorkingHours:F2}h at {result.BaseOvertimeRate}x rate");
        }
        else
        {
            // Normal day overtime calculation
            // Calculate pre-shift overtime
            if (await _overtimeConfigService.IsOvertimeEnabledAsync(attendanceDate, true, cancellationToken))
            {
                result.PreShiftOvertime = await CalculatePreShiftOvertimeAsync(
                    transactionsList, scheduledStartTime.Value, config, cancellationToken);
                result.IsOvertimeEnabled = true;
            }

            // Calculate post-shift overtime
            if (await _overtimeConfigService.IsOvertimeEnabledAsync(attendanceDate, false, cancellationToken))
            {
                result.PostShiftOvertime = await CalculatePostShiftOvertimeAsync(
                    transactionsList, scheduledEndTime.Value, totalWorkingHours, scheduledHours, config, cancellationToken);
                result.IsOvertimeEnabled = true;
            }
        }

        // Apply rates and calculate amounts
        result.PreShiftOvertime.Rate = result.BaseOvertimeRate;
        result.PreShiftOvertime.Amount = result.PreShiftOvertime.FinalHours * result.BaseOvertimeRate;

        result.PostShiftOvertime.Rate = result.BaseOvertimeRate;
        result.PostShiftOvertime.Amount = result.PostShiftOvertime.FinalHours * result.BaseOvertimeRate;

        // Calculate totals
        result.TotalOvertimeHours = result.PreShiftOvertime.FinalHours + result.PostShiftOvertime.FinalHours;
        result.TotalOvertimeAmount = result.PreShiftOvertime.Amount + result.PostShiftOvertime.Amount;

        // Add summary note
        if (result.TotalOvertimeHours > 0)
        {
            result.CalculationNotes.Add($"Total overtime: {result.TotalOvertimeHours:F2}h at {result.BaseOvertimeRate}x rate");
        }
        else
        {
            result.CalculationNotes.Add("No overtime calculated for this day");
        }

        return result;
    }

    private async Task<OvertimePeriodDetails> CalculatePreShiftOvertimeAsync(
        List<AttendanceTransaction> transactions,
        TimeOnly scheduledStartTime,
        Domain.Settings.OvertimeConfiguration config,
        CancellationToken cancellationToken)
    {
        var periodDetails = new OvertimePeriodDetails
        {
            IsEnabled = config.EnablePreShiftOvertime,
            MaximumAllowedHours = config.MaxPreShiftOvertimeHours,
            MinimumThresholdMinutes = config.MinimumOvertimeMinutes
        };

        if (!periodDetails.IsEnabled)
        {
            periodDetails.Notes.Add("Pre-shift overtime is disabled");
            return periodDetails;
        }

        var checkInTransaction = transactions.FirstOrDefault(t => t.TransactionType == Domain.Attendance.TransactionType.CheckIn);
        if (checkInTransaction == null)
        {
            periodDetails.Notes.Add("No check-in transaction found");
            return periodDetails;
        }

        var actualCheckInTime = TimeOnly.FromDateTime(checkInTransaction.TransactionTimeUtc.ToLocalTime());
        periodDetails.StartTime = actualCheckInTime;
        periodDetails.EndTime = scheduledStartTime;

        if (actualCheckInTime >= scheduledStartTime)
        {
            periodDetails.Notes.Add("Check-in was not before scheduled start time");
            return periodDetails;
        }

        // Calculate raw pre-shift hours
        var preShiftMinutes = (scheduledStartTime.ToTimeSpan() - actualCheckInTime.ToTimeSpan()).TotalMinutes;
        periodDetails.RawHours = (decimal)(preShiftMinutes / 60.0);

        // For pre-shift overtime, do not apply grace period deduction
        // Grace period is for lateness calculations, not overtime calculations
        periodDetails.FlexibleTimeAdjustedHours = periodDetails.RawHours;

        // Note: Grace period (OvertimeGracePeriodMinutes) is used for lateness calculations,
        // but overtime should be calculated on actual time worked before scheduled hours
        periodDetails.Notes.Add($"Pre-shift overtime: {periodDetails.RawHours:F2}h worked before scheduled start time");

        // Check minimum threshold
        var adjustedMinutes = (double)(periodDetails.FlexibleTimeAdjustedHours * 60);
        periodDetails.MetMinimumThreshold = adjustedMinutes >= config.MinimumOvertimeMinutes;

        if (!periodDetails.MetMinimumThreshold)
        {
            periodDetails.Notes.Add($"Below minimum threshold of {config.MinimumOvertimeMinutes} minutes");
            periodDetails.FinalHours = 0;
            return periodDetails;
        }

        // Apply rounding
        periodDetails.FinalHours = await _overtimeConfigService.RoundOvertimeHoursAsync(
            periodDetails.FlexibleTimeAdjustedHours, cancellationToken);

        // Check maximum limit
        if (periodDetails.FinalHours > periodDetails.MaximumAllowedHours)
        {
            periodDetails.ExceededMaximum = true;
            periodDetails.FinalHours = periodDetails.MaximumAllowedHours;
            periodDetails.Notes.Add($"Capped at maximum {periodDetails.MaximumAllowedHours:F2}h");
        }

        return periodDetails;
    }

    private async Task<OvertimePeriodDetails> CalculatePostShiftOvertimeAsync(
        List<AttendanceTransaction> transactions,
        TimeOnly scheduledEndTime,
        decimal totalWorkingHours,
        decimal scheduledHours,
        Domain.Settings.OvertimeConfiguration config,
        CancellationToken cancellationToken)
    {
        var periodDetails = new OvertimePeriodDetails
        {
            IsEnabled = config.EnablePostShiftOvertime,
            MaximumAllowedHours = config.MaxPostShiftOvertimeHours,
            MinimumThresholdMinutes = config.MinimumOvertimeMinutes
        };

        if (!periodDetails.IsEnabled)
        {
            periodDetails.Notes.Add("Post-shift overtime is disabled");
            return periodDetails;
        }

        var checkOutTransaction = transactions.FirstOrDefault(t =>
            t.TransactionType == Domain.Attendance.TransactionType.CheckOut ||
            t.TransactionType == Domain.Attendance.TransactionType.AutoCheckOut);

        if (checkOutTransaction == null)
        {
            periodDetails.Notes.Add("No check-out transaction found");
            return periodDetails;
        }

        var actualCheckOutTime = TimeOnly.FromDateTime(checkOutTransaction.TransactionTimeUtc.ToLocalTime());
        periodDetails.StartTime = scheduledEndTime;
        periodDetails.EndTime = actualCheckOutTime;

        if (actualCheckOutTime <= scheduledEndTime)
        {
            periodDetails.Notes.Add("Check-out was not after scheduled end time");
            return periodDetails;
        }

        // Calculate raw post-shift hours (either time-based or work-based)
        var timeBasedMinutes = (actualCheckOutTime.ToTimeSpan() - scheduledEndTime.ToTimeSpan()).TotalMinutes;
        var workBasedHours = Math.Max(0, totalWorkingHours - scheduledHours);

        // Use the smaller of the two calculations to avoid double-counting
        periodDetails.RawHours = Math.Min((decimal)(timeBasedMinutes / 60.0), workBasedHours);

        // For post-shift overtime, do not apply grace period deduction
        // Grace period is for lateness calculations, not overtime calculations
        periodDetails.FlexibleTimeAdjustedHours = periodDetails.RawHours;

        // Note: Grace period (OvertimeGracePeriodMinutes) is used for lateness calculations,
        // but overtime should be calculated on actual time worked beyond scheduled hours
        periodDetails.Notes.Add($"Post-shift overtime: {periodDetails.RawHours:F2}h worked beyond scheduled end time");

        // Check minimum threshold
        var adjustedMinutes = (double)(periodDetails.FlexibleTimeAdjustedHours * 60);
        periodDetails.MetMinimumThreshold = adjustedMinutes >= config.MinimumOvertimeMinutes;

        if (!periodDetails.MetMinimumThreshold)
        {
            periodDetails.Notes.Add($"Below minimum threshold of {config.MinimumOvertimeMinutes} minutes");
            periodDetails.FinalHours = 0;
            return periodDetails;
        }

        // Apply rounding
        periodDetails.FinalHours = await _overtimeConfigService.RoundOvertimeHoursAsync(
            periodDetails.FlexibleTimeAdjustedHours, cancellationToken);

        // Check maximum limit
        if (periodDetails.FinalHours > periodDetails.MaximumAllowedHours)
        {
            periodDetails.ExceededMaximum = true;
            periodDetails.FinalHours = periodDetails.MaximumAllowedHours;
            periodDetails.Notes.Add($"Capped at maximum {periodDetails.MaximumAllowedHours:F2}h");
        }

        return periodDetails;
    }

    public async Task<int> CalculateLateMinutesAsync(
        TimeOnly? scheduledStartTime,
        DateTime? actualCheckInTime,
        int? gracePeriodMinutes,
        CancellationToken cancellationToken = default)
    {
        if (!scheduledStartTime.HasValue || !actualCheckInTime.HasValue)
            return 0;

        var scheduledDateTime = actualCheckInTime.Value.Date.Add(scheduledStartTime.Value.ToTimeSpan());
        var lateSpan = actualCheckInTime.Value - scheduledDateTime;
        var lateMinutes = (int)lateSpan.TotalMinutes;

        // Grace Period Business Rules:
        // - If late entry <= grace period: No delay counted (0 late minutes)
        // - If late entry > grace period: Count the FULL late time (not reduced by grace period)
        var graceMinutes = gracePeriodMinutes ?? 0;

        if (lateMinutes <= 0)
        {
            // Not late or early arrival
            return 0;
        }

        if (lateMinutes <= graceMinutes)
        {
            // Late but within grace period - no penalty
            return 0;
        }

        // Late beyond grace period - count full late time
        return lateMinutes;
    }

    public async Task<int> CalculateLateMinutesAsync(
        TimeOnly? scheduledStartTime,
        DateTime? actualCheckInTime,
        Shift? shift,
        CancellationToken cancellationToken = default)
    {
        if (!scheduledStartTime.HasValue || !actualCheckInTime.HasValue)
            return 0;

        DateTime effectiveLateCutoffTime;

        if (shift != null && shift.AllowFlexibleHours)
        {
            // FLEXIBLE HOURS BUSINESS RULE:
            // Lateness is calculated from the END of the flexible arrival window, not the original shift start time
            // Example: 08:00 shift with 30 min before + 60 min after flexibility
            // - Flexible window: 07:30 - 09:00
            // - Check-in at 09:15 = 15 minutes late (from 09:00, not from 08:00)

            var flexMinutesAfter = shift.FlexMinutesAfter ?? 0;
            var flexibleEndTime = scheduledStartTime.Value.AddMinutes(flexMinutesAfter);
            effectiveLateCutoffTime = actualCheckInTime.Value.Date.Add(flexibleEndTime.ToTimeSpan());

            // Calculate lateness from the effective cutoff time
            var lateSpan = actualCheckInTime.Value - effectiveLateCutoffTime;
            var lateMinutes = (int)lateSpan.TotalMinutes;

            // Return the calculated late minutes (can be negative for early arrivals)
            return Math.Max(0, lateMinutes);
        }
        else
        {
            // For non-flexible shifts, use grace period logic
            var scheduledDateTime = actualCheckInTime.Value.Date.Add(scheduledStartTime.Value.ToTimeSpan());
            var lateSpan = actualCheckInTime.Value - scheduledDateTime;
            var lateMinutes = (int)lateSpan.TotalMinutes;

            // Grace Period Business Rules:
            // - If late entry <= grace period: No delay counted (0 late minutes)
            // - If late entry > grace period: Count the FULL late time (not reduced by grace period)
            var graceMinutes = shift?.GracePeriodMinutes ?? 0;

            if (lateMinutes <= 0)
            {
                // Not late or early arrival
                return 0;
            }

            if (lateMinutes <= graceMinutes)
            {
                // Late but within grace period - no penalty
                return 0;
            }

            // Late beyond grace period - count full late time
            return lateMinutes;
        }
    }

    public async Task<int> CalculateEarlyLeaveMinutesAsync(
        TimeOnly? scheduledEndTime,
        DateTime? actualCheckOutTime,
        int toleranceMinutes,
        CancellationToken cancellationToken = default)
    {
        if (!scheduledEndTime.HasValue || !actualCheckOutTime.HasValue)
            return 0;

        var scheduledDateTime = actualCheckOutTime.Value.Date.Add(scheduledEndTime.Value.ToTimeSpan());
        var earlySpan = scheduledDateTime - actualCheckOutTime.Value;
        var earlyMinutes = (int)earlySpan.TotalMinutes;

        // Early Leave Business Rule: All early leave minutes are counted (no tolerance applied)
        return Math.Max(0, earlyMinutes);
    }

    public async Task<int> CalculateEarlyLeaveMinutesAsync(
        TimeOnly? scheduledEndTime,
        DateTime? actualCheckOutTime,
        DateTime? actualCheckInTime,
        Shift? shift,
        CancellationToken cancellationToken = default)
    {
        if (!scheduledEndTime.HasValue || !actualCheckOutTime.HasValue || shift == null)
            return 0;

        DateTime requiredEndDateTime;

        if (shift.AllowFlexibleHours && actualCheckInTime.HasValue)
        {
            // FLEXIBLE HOURS BUSINESS RULE:
            // Employee must work the full required hours from their actual check-in time
            // Example: Check-in 09:15 + 8 hours = Required end time 17:15
            // If checkout at 16:30, then early leave = 17:15 - 16:30 = 45 minutes

            var requiredWorkingHours = 8.0m; // Standard 8-hour shift
            var requiredEndTime = TimeOnly.FromDateTime(actualCheckInTime.Value).AddMinutes((int)(requiredWorkingHours * 60));

            // Apply flexible hours constraints
            var baseShiftEnd = scheduledEndTime ?? new TimeOnly(16, 0); // Use actual scheduled end or default
            var flexMinutesBefore = shift.FlexMinutesBefore ?? 30;
            var flexMinutesAfter = shift.FlexMinutesAfter ?? 60;

            var earliestAllowedEnd = baseShiftEnd.AddMinutes(-flexMinutesBefore); // 15:30
            var latestAllowedEnd = baseShiftEnd.AddMinutes(flexMinutesAfter);     // 17:00

            // Constrain the required end time within flexible bounds
            if (requiredEndTime < earliestAllowedEnd)
                requiredEndTime = earliestAllowedEnd;
            else if (requiredEndTime > latestAllowedEnd)
                requiredEndTime = latestAllowedEnd;

            requiredEndDateTime = actualCheckOutTime.Value.Date.Add(requiredEndTime.ToTimeSpan());
        }
        else
        {
            // For non-flexible shifts, use the original scheduled time
            // Early Leave Business Rule: All early leave minutes are counted (no grace period applied)
            requiredEndDateTime = actualCheckOutTime.Value.Date.Add(scheduledEndTime.Value.ToTimeSpan());
        }

        // Calculate Early Leave based on the required end time established above
        // For flexible hours: If employee checks out before completing required hours, record as Early Leave
        // Example: Check-in 08:30 → Required end 16:30 → Check-out 16:00 → 30 minutes Early Leave
        var earlySpan = requiredEndDateTime - actualCheckOutTime.Value;
        var earlyMinutes = (int)earlySpan.TotalMinutes;

        return Math.Max(0, earlyMinutes);
    }

    public async Task<TransactionValidationResult> ValidateTransactionSequenceAsync(
        IEnumerable<AttendanceTransaction> transactions,
        CancellationToken cancellationToken = default)
    {
        var transactionsList = transactions.OrderBy(t => t.TransactionTimeUtc).ToList();
        var result = new TransactionValidationResult { IsValid = true };
        var issues = new List<string>();

        bool hasCheckIn = false;
        bool hasCheckOut = false;
        bool inBreak = false;
        int breakStartCount = 0;
        int breakEndCount = 0;

        foreach (var transaction in transactionsList)
        {
            switch (transaction.TransactionType)
            {
                case TransactionType.CheckIn:
                    if (hasCheckIn && !hasCheckOut)
                        issues.Add("Multiple check-ins without check-out");
                    hasCheckIn = true;
                    hasCheckOut = false;
                    break;

                case TransactionType.CheckOut:
                case TransactionType.AutoCheckOut:
                    if (!hasCheckIn)
                        issues.Add("Check-out without check-in");
                    hasCheckOut = true;
                    break;

                case TransactionType.BreakStart:
                    if (!hasCheckIn)
                        issues.Add("Break start before check-in");
                    if (inBreak)
                        issues.Add("Break start while already on break");
                    inBreak = true;
                    breakStartCount++;
                    break;

                case TransactionType.BreakEnd:
                    if (!inBreak)
                        issues.Add("Break end without break start");
                    inBreak = false;
                    breakEndCount++;
                    break;
            }
        }

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

        result.Issues = issues;
        result.IsValid = !issues.Any();
        result.HasInvalidSequence = issues.Any(i => !i.Contains("Missing") && !i.Contains("Unmatched"));

        return result;
    }

    public async Task<ShiftAssignment?> GetEffectiveShiftAssignmentAsync(
        long employeeId,
        DateTime date,
        CancellationToken cancellationToken = default)
    {
        // Get employee with department and branch info
        var employee = await _context.Employees
            .Include(e => e.Department)
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == employeeId, cancellationToken);

        if (employee == null)
            return null;

        // Normalize date to UTC for PostgreSQL timestamp with time zone comparisons
        var normalizedDate = date.ToUtcDate();

        // Get all potential shift assignments for the date
        var assignments = await _context.ShiftAssignments
            .Include(sa => sa.Shift)
                .ThenInclude(s => s.ShiftPeriods)
            .Where(sa => sa.Status == ShiftAssignmentStatus.Active &&
                        sa.EffectiveFromDate.Date <= normalizedDate &&
                        (!sa.EffectiveToDate.HasValue || sa.EffectiveToDate.Value.Date >= normalizedDate))
            .Where(sa =>
                (sa.AssignmentType == ShiftAssignmentType.Employee && sa.EmployeeId == employeeId) ||
                (sa.AssignmentType == ShiftAssignmentType.Department && sa.DepartmentId == employee.DepartmentId) ||
                (sa.AssignmentType == ShiftAssignmentType.Branch && sa.BranchId == employee.BranchId))
            .OrderByDescending(sa => sa.Priority)
            .ThenByDescending(sa => sa.AssignmentType) // Employee > Department > Branch
            .ToListAsync(cancellationToken);

        return assignments.FirstOrDefault();
    }

    // Helper methods
    private decimal CalculateScheduledHours(Shift? shift, DateTime date)
    {
        if (shift == null || !IsWorkingDay(shift, date))
            return 0;

        return shift.CalculateTotalHours();
    }

    private (TimeOnly? Start, TimeOnly? End) GetScheduledTimes(Shift? shift, DateTime date)
    {
        if (shift == null || !IsWorkingDay(shift, date))
            return (null, null);

        var firstPeriod = shift.ShiftPeriods.OrderBy(sp => sp.StartTime).FirstOrDefault();
        var lastPeriod = shift.ShiftPeriods.OrderByDescending(sp => sp.EndTime).FirstOrDefault();

        return (firstPeriod?.StartTime, lastPeriod?.EndTime);
    }

    private bool IsWorkingDay(Shift shift, DateTime date)
    {
        return date.DayOfWeek switch
        {
            DayOfWeek.Sunday => shift.IsSunday,
            DayOfWeek.Monday => shift.IsMonday,
            DayOfWeek.Tuesday => shift.IsTuesday,
            DayOfWeek.Wednesday => shift.IsWednesday,
            DayOfWeek.Thursday => shift.IsThursday,
            DayOfWeek.Friday => shift.IsFriday,
            DayOfWeek.Saturday => shift.IsSaturday,
            _ => false
        };
    }

    private List<BreakPeriod> GetBreakPeriods(List<AttendanceTransaction> transactions)
    {
        var breakPeriods = new List<BreakPeriod>();
        AttendanceTransaction? currentBreakStart = null;

        foreach (var transaction in transactions)
        {
            if (transaction.TransactionType == TransactionType.BreakStart)
            {
                currentBreakStart = transaction;
            }
            else if (transaction.TransactionType == TransactionType.BreakEnd && currentBreakStart != null)
            {
                var duration = (decimal)(transaction.TransactionTimeLocal - currentBreakStart.TransactionTimeLocal).TotalHours;
                breakPeriods.Add(new BreakPeriod
                {
                    Start = currentBreakStart.TransactionTimeLocal,
                    End = transaction.TransactionTimeLocal,
                    Duration = Math.Max(0, duration)
                });
                currentBreakStart = null;
            }
        }

        return breakPeriods;
    }

    private class BreakPeriod
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public decimal Duration { get; set; }
    }

    /// <summary>
    /// Gets all approved excuses for an employee on a specific date.
    /// </summary>
    private async Task<List<EmployeeExcuse>> GetApprovedExcusesForDateAsync(
        long employeeId,
        DateTime date,
        CancellationToken cancellationToken)
    {
        var normalizedDate = date.ToUtcDate();
        return await _context.EmployeeExcuses
            .AsNoTracking()
            .Where(ee => ee.EmployeeId == employeeId &&
                        ee.ExcuseDate.Date == normalizedDate &&
                        ee.ApprovalStatus == ApprovalStatus.Approved &&
                        !ee.IsDeleted)
            .OrderBy(ee => ee.StartTime)
            .ToListAsync(cancellationToken);
    }

    /// <summary>
    /// Calculates how many minutes of late/early leave are covered by approved excuses.
    /// For flexible shifts, uses the effective late period start (end of flexible window)
    /// and the required end time (based on check-in + 8 hours) for accurate offset calculation.
    /// </summary>
    /// <param name="excuses">List of approved excuses for the date</param>
    /// <param name="scheduledStartTime">Shift scheduled start time</param>
    /// <param name="scheduledEndTime">Shift scheduled end time</param>
    /// <param name="actualCheckInTime">Actual check-in time</param>
    /// <param name="actualCheckOutTime">Actual check-out time</param>
    /// <param name="shift">Shift information for flexible hours calculation</param>
    /// <returns>Offset values for late and early leave minutes</returns>
    private ExcuseOffset CalculateExcuseOffset(
        List<EmployeeExcuse> excuses,
        TimeOnly? scheduledStartTime,
        TimeOnly? scheduledEndTime,
        DateTime? actualCheckInTime,
        DateTime? actualCheckOutTime,
        Shift? shift = null)
    {
        if (!excuses.Any())
            return new ExcuseOffset(0, 0, false, null);

        int lateMinutesOffset = 0;
        int earlyLeaveOffset = 0;

        // Calculate late minutes offset
        // For flexible shifts: late period starts from the end of the flexible arrival window
        // For regular shifts: late period starts from the scheduled start time
        if (scheduledStartTime.HasValue && actualCheckInTime.HasValue)
        {
            var checkInTimeOnly = TimeOnly.FromDateTime(actualCheckInTime.Value);

            // Determine the effective late period start based on shift type
            TimeOnly effectiveLatePeriodStart;
            if (shift != null && shift.AllowFlexibleHours)
            {
                // For flexible shifts, late period starts at the END of the flexible arrival window
                var flexMinutesAfter = shift.FlexMinutesAfter ?? 0;
                effectiveLatePeriodStart = scheduledStartTime.Value.AddMinutes(flexMinutesAfter);
            }
            else
            {
                // For regular shifts, use the scheduled start time
                effectiveLatePeriodStart = scheduledStartTime.Value;
            }

            // Only calculate offset if employee was actually late (check-in after effective late period start)
            if (checkInTimeOnly > effectiveLatePeriodStart)
            {
                foreach (var excuse in excuses)
                {
                    // Calculate the overlap between excuse period and late period
                    // Late period: [effectiveLatePeriodStart, checkInTimeOnly]
                    // Excuse period: [excuse.StartTime, excuse.EndTime]

                    var latePeriodStart = effectiveLatePeriodStart;
                    var latePeriodEnd = checkInTimeOnly;

                    // Find the intersection of excuse period and late period
                    var overlapStart = excuse.StartTime > latePeriodStart ? excuse.StartTime : latePeriodStart;
                    var overlapEnd = excuse.EndTime < latePeriodEnd ? excuse.EndTime : latePeriodEnd;

                    // If there's a valid overlap (start < end), calculate covered minutes
                    if (overlapStart < overlapEnd)
                    {
                        var coveredMinutes = (int)(overlapEnd - overlapStart).TotalMinutes;
                        lateMinutesOffset += coveredMinutes;
                    }
                }
            }
        }

        // Calculate early leave offset
        // For flexible shifts: use the required end time (check-in + 8 hours, constrained to flexible bounds)
        // For regular shifts: use the scheduled end time
        if (scheduledEndTime.HasValue && actualCheckOutTime.HasValue)
        {
            var checkOutTimeOnly = TimeOnly.FromDateTime(actualCheckOutTime.Value);

            // Determine the effective required end time based on shift type
            TimeOnly effectiveRequiredEndTime;
            if (shift != null && shift.AllowFlexibleHours && actualCheckInTime.HasValue)
            {
                // For flexible shifts, employee must work the full required hours from check-in time
                var requiredWorkingHours = 8.0m; // Standard 8-hour shift
                var requiredEndTime = TimeOnly.FromDateTime(actualCheckInTime.Value).AddMinutes((int)(requiredWorkingHours * 60));

                // Apply flexible hours constraints
                var baseShiftEnd = scheduledEndTime.Value;
                var flexMinutesBefore = shift.FlexMinutesBefore ?? 30;
                var flexMinutesAfter = shift.FlexMinutesAfter ?? 60;

                var earliestAllowedEnd = baseShiftEnd.AddMinutes(-flexMinutesBefore);
                var latestAllowedEnd = baseShiftEnd.AddMinutes(flexMinutesAfter);

                // Constrain the required end time within flexible bounds
                if (requiredEndTime < earliestAllowedEnd)
                    requiredEndTime = earliestAllowedEnd;
                else if (requiredEndTime > latestAllowedEnd)
                    requiredEndTime = latestAllowedEnd;

                effectiveRequiredEndTime = requiredEndTime;
            }
            else
            {
                // For regular shifts, use the scheduled end time
                effectiveRequiredEndTime = scheduledEndTime.Value;
            }

            // Only calculate offset if employee left early (check-out before required end time)
            if (checkOutTimeOnly < effectiveRequiredEndTime)
            {
                foreach (var excuse in excuses)
                {
                    // Calculate the overlap between excuse period and early leave period
                    // Early leave period: [checkOutTimeOnly, effectiveRequiredEndTime]
                    // Excuse period: [excuse.StartTime, excuse.EndTime]

                    var earlyLeavePeriodStart = checkOutTimeOnly;
                    var earlyLeavePeriodEnd = effectiveRequiredEndTime;

                    // Find the intersection of excuse period and early leave period
                    var overlapStart = excuse.StartTime > earlyLeavePeriodStart ? excuse.StartTime : earlyLeavePeriodStart;
                    var overlapEnd = excuse.EndTime < earlyLeavePeriodEnd ? excuse.EndTime : earlyLeavePeriodEnd;

                    // If there's a valid overlap (start < end), calculate covered minutes
                    if (overlapStart < overlapEnd)
                    {
                        var coveredMinutes = (int)(overlapEnd - overlapStart).TotalMinutes;
                        earlyLeaveOffset += coveredMinutes;
                    }
                }
            }
        }

        // Determine if it's a full-day excuse and the dominant excuse type
        var totalExcuseHours = excuses.Sum(e => e.DurationHours);
        var isFullDayExcuse = totalExcuseHours >= 8m;
        var dominantExcuseType = excuses.OrderByDescending(e => e.DurationHours).FirstOrDefault()?.ExcuseType;

        return new ExcuseOffset(lateMinutesOffset, earlyLeaveOffset, isFullDayExcuse, dominantExcuseType);
    }

    /// <summary>
    /// Record for excuse offset calculation results.
    /// </summary>
    private record ExcuseOffset(
        int LateMinutesOffset,
        int EarlyLeaveMinutesOffset,
        bool IsFullDayExcuse,
        ExcuseType? DominantExcuseType);
}