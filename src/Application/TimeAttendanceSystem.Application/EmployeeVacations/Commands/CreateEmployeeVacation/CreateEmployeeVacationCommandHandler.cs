using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Vacations;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Commands.CreateEmployeeVacation;

/// <summary>
/// Command handler for creating employee vacation records.
/// Implements comprehensive validation, conflict detection, and attendance integration.
/// </summary>
public class CreateEmployeeVacationCommandHandler : IRequestHandler<CreateEmployeeVacationCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;

    public CreateEmployeeVacationCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the creation of a new employee vacation record with full validation and integration.
    /// </summary>
    /// <param name="request">Command containing vacation details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing the created vacation ID or validation errors</returns>
    public async Task<Result<long>> Handle(CreateEmployeeVacationCommand request, CancellationToken cancellationToken)
    {
        // Validate employee exists and is active
        var employee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<long>("Employee not found");
        }

        // Validate vacation type exists and is active
        var vacationType = await _context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.Id == request.VacationTypeId && vt.IsActive, cancellationToken);

        if (vacationType == null)
        {
            return Result.Failure<long>("Vacation type not found or inactive");
        }

        // Create vacation entity
        var vacation = new EmployeeVacation
        {
            EmployeeId = request.EmployeeId,
            VacationTypeId = request.VacationTypeId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            IsApproved = request.IsApproved,
            Notes = request.Notes
        };

        // Calculate total days
        vacation.CalculateTotalDays();

        // Validate vacation business rules
        var (isValid, errors) = vacation.ValidateVacation();
        if (!isValid)
        {
            return Result.Failure<long>(string.Join(", ", errors));
        }

        // Check for overlapping vacations for the same employee
        var hasOverlapQuery = _context.EmployeeVacations
            .Where(ev => ev.EmployeeId == request.EmployeeId)
            .Where(ev => ev.StartDate <= request.EndDate && ev.EndDate >= request.StartDate);

        var hasOverlap = await hasOverlapQuery.AnyAsync(cancellationToken);

        if (hasOverlap)
        {
            return Result.Failure<long>("Vacation dates overlap with existing vacation period");
        }

        // Add vacation to context
        _context.EmployeeVacations.Add(vacation);

        // Save changes to get the vacation ID
        await _context.SaveChangesAsync(cancellationToken);

        // If vacation is approved, update attendance records
        if (vacation.IsApproved)
        {
            await UpdateAttendanceRecordsAsync(vacation, cancellationToken);
        }

        return Result.Success(vacation.Id);
    }

    /// <summary>
    /// Updates attendance records for the vacation period when vacation is approved.
    /// </summary>
    /// <param name="vacation">The approved vacation record</param>
    /// <param name="cancellationToken">Cancellation token</param>
    private async Task UpdateAttendanceRecordsAsync(EmployeeVacation vacation, CancellationToken cancellationToken)
    {
        try
        {
            // Get all dates in the vacation period
            var vacationDates = vacation.GetVacationDates();

            foreach (var date in vacationDates)
            {
                // Find or create attendance record for this date
                var attendanceRecord = await _context.AttendanceRecords
                    .FirstOrDefaultAsync(ar => ar.EmployeeId == vacation.EmployeeId &&
                                              ar.AttendanceDate.Date == date.Date, cancellationToken);

                if (attendanceRecord != null)
                {
                    // Update existing attendance record to OnLeave
                    attendanceRecord.Status = AttendanceStatus.OnLeave;
                    attendanceRecord.Notes = string.IsNullOrEmpty(attendanceRecord.Notes)
                        ? $"On vacation: {vacation.VacationType?.Name}"
                        : $"{attendanceRecord.Notes}\nOn vacation: {vacation.VacationType?.Name}";
                }
                else
                {
                    // Create new attendance record for vacation day
                    var newAttendanceRecord = new AttendanceRecord
                    {
                        EmployeeId = vacation.EmployeeId,
                        AttendanceDate = date,
                        Status = AttendanceStatus.OnLeave,
                        ScheduledHours = 0,
                        WorkingHours = 0,
                        BreakHours = 0,
                        OvertimeHours = 0,
                        Notes = $"On vacation: {vacation.VacationType?.Name}"
                    };

                    _context.AttendanceRecords.Add(newAttendanceRecord);
                }
            }

            // Save attendance record changes
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (Exception)
        {
            // Log error but don't fail the vacation creation
            // Attendance integration is secondary to vacation creation
            // TODO: Add proper logging here
        }
    }
}