using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.ToggleEmployeeVacationStatus;

/// <summary>
/// Command handler for toggling employee vacation approval status.
/// Handles status changes with database updates and attendance record integration.
/// Updates attendance records when vacation is approved or unapproved.
/// </summary>
public class ToggleEmployeeVacationStatusCommandHandler : IRequestHandler<ToggleEmployeeVacationStatusCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IAttendanceCalculationService _calculationService;
    private readonly IAttendanceTransactionRepository _transactionRepository;

    public ToggleEmployeeVacationStatusCommandHandler(
        IApplicationDbContext context,
        IAttendanceCalculationService calculationService,
        IAttendanceTransactionRepository transactionRepository)
    {
        _context = context;
        _calculationService = calculationService;
        _transactionRepository = transactionRepository;
    }

    /// <summary>
    /// Handles the toggling of employee vacation approval status.
    /// </summary>
    /// <param name="request">Command containing vacation ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success or failure</returns>
    public async Task<Result> Handle(ToggleEmployeeVacationStatusCommand request, CancellationToken cancellationToken)
    {
        // Find the vacation record
        var vacation = await _context.EmployeeVacations
            .FirstOrDefaultAsync(v => v.Id == request.Id && !v.IsDeleted, cancellationToken);

        if (vacation == null)
        {
            return Result.Failure("Employee vacation not found");
        }

        // Store previous approval status
        var wasApproved = vacation.IsApproved;

        // Toggle the approval status
        vacation.IsApproved = !vacation.IsApproved;
        vacation.ModifiedAtUtc = DateTime.UtcNow;

        // Update the record in the database
        _context.EmployeeVacations.Update(vacation);

        // Save changes
        await _context.SaveChangesAsync(cancellationToken);

        // Update attendance records based on the new approval status
        if (vacation.IsApproved)
        {
            // Vacation was approved - mark attendance as OnLeave
            await UpdateAttendanceForVacationPeriodAsync(
                vacation.EmployeeId,
                vacation.StartDate,
                vacation.EndDate,
                cancellationToken);
        }
        else
        {
            // Vacation was unapproved - recalculate attendance to remove OnLeave status
            await RecalculateAttendanceForVacationPeriodAsync(
                vacation.EmployeeId,
                vacation.StartDate,
                vacation.EndDate,
                cancellationToken);
        }

        return Result.Success();
    }

    /// <summary>
    /// Updates attendance records to OnLeave status for the vacation period when approved.
    /// Creates attendance records if they don't exist for dates within the vacation period.
    /// </summary>
    private async Task UpdateAttendanceForVacationPeriodAsync(
        long employeeId,
        DateTime startDate,
        DateTime endDate,
        CancellationToken cancellationToken)
    {
        // Get all attendance records for the vacation period
        var attendanceRecords = await _context.AttendanceRecords
            .Where(ar => ar.EmployeeId == employeeId &&
                        ar.AttendanceDate.Date >= startDate.Date &&
                        ar.AttendanceDate.Date <= endDate.Date &&
                        !ar.IsFinalized) // Only update non-finalized records
            .ToListAsync(cancellationToken);

        // Update existing records to OnLeave status
        foreach (var record in attendanceRecords)
        {
            // Only update if not already OnLeave (to preserve any manual overrides)
            if (record.Status != AttendanceStatus.OnLeave)
            {
                record.Status = AttendanceStatus.OnLeave;
                // Clear working hours since employee is on leave
                record.WorkingHours = 0;
                record.OvertimeHours = 0;
                record.LateMinutes = 0;
                record.EarlyLeaveMinutes = 0;
                record.Notes = record.Notes != null
                    ? $"{record.Notes} | Updated to OnLeave due to approved vacation (toggle)"
                    : "Updated to OnLeave due to approved vacation (toggle)";
                record.ModifiedAtUtc = DateTime.UtcNow;
            }
        }

        // Create attendance records for dates that don't have records yet
        var existingDates = attendanceRecords.Select(ar => ar.AttendanceDate.Date).ToHashSet();
        var currentDate = startDate.Date;

        while (currentDate <= endDate.Date)
        {
            if (!existingDates.Contains(currentDate))
            {
                // Create a new attendance record with OnLeave status
                var newRecord = new AttendanceRecord
                {
                    EmployeeId = employeeId,
                    AttendanceDate = currentDate,
                    Status = AttendanceStatus.OnLeave,
                    WorkingHours = 0,
                    OvertimeHours = 0,
                    LateMinutes = 0,
                    EarlyLeaveMinutes = 0,
                    ScheduledHours = 0,
                    BreakHours = 0,
                    Notes = "Created as OnLeave due to approved vacation (toggle)"
                };
                _context.AttendanceRecords.Add(newRecord);
            }
            currentDate = currentDate.AddDays(1);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Recalculates attendance records for the vacation period when vacation is unapproved.
    /// This will restore the original attendance status based on transactions.
    /// </summary>
    private async Task RecalculateAttendanceForVacationPeriodAsync(
        long employeeId,
        DateTime startDate,
        DateTime endDate,
        CancellationToken cancellationToken)
    {
        // Get all attendance records for the vacation period with shift assignment
        var attendanceRecords = await _context.AttendanceRecords
            .Include(ar => ar.ShiftAssignment)
                .ThenInclude(sa => sa!.Shift)
                    .ThenInclude(s => s.ShiftPeriods)
            .Where(ar => ar.EmployeeId == employeeId &&
                        ar.AttendanceDate.Date >= startDate.Date &&
                        ar.AttendanceDate.Date <= endDate.Date &&
                        !ar.IsFinalized) // Only update non-finalized records
            .ToListAsync(cancellationToken);

        foreach (var record in attendanceRecords)
        {
            // Get transactions for the date
            var transactions = await _transactionRepository.GetByEmployeeAndDateAsync(
                employeeId, record.AttendanceDate, cancellationToken);

            // Recalculate attendance
            var recalculatedRecord = await _calculationService.RecalculateAttendanceAsync(
                record, transactions, cancellationToken);

            // Copy recalculated values to existing record
            record.Status = recalculatedRecord.Status;
            record.LateMinutes = recalculatedRecord.LateMinutes;
            record.EarlyLeaveMinutes = recalculatedRecord.EarlyLeaveMinutes;
            record.WorkingHours = recalculatedRecord.WorkingHours;
            record.OvertimeHours = recalculatedRecord.OvertimeHours;
            record.BreakHours = recalculatedRecord.BreakHours;
            record.Notes = string.IsNullOrEmpty(record.Notes)
                ? "Recalculated after vacation was unapproved"
                : $"{record.Notes} | Recalculated after vacation was unapproved";
            record.ModifiedAtUtc = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}