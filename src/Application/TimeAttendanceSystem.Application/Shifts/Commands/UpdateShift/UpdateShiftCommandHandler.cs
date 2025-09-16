using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Application.Shifts.Commands.UpdateShift;

/// <summary>
/// Command handler for updating existing shifts with comprehensive validation and business rule enforcement.
/// Implements shift management business rules and audit requirements from the specification.
/// </summary>
public class UpdateShiftCommandHandler : BaseHandler<UpdateShiftCommand, Result>
{
    public UpdateShiftCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateShiftCommand request, CancellationToken cancellationToken)
    {
        // Find the existing shift
        var shift = await Context.Shifts
            .Include(s => s.ShiftPeriods)
            .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

        if (shift == null)
        {
            return Result.Failure("Shift not found");
        }

        // Check if shift name already exists (excluding current shift)
        var existingShift = await Context.Shifts
            .FirstOrDefaultAsync(s => s.Name == request.Name && s.Id != request.Id, cancellationToken);

        if (existingShift != null)
        {
            return Result.Failure("Shift name must be unique across the system");
        }

        // Update shift properties
        shift.Name = request.Name;
        shift.Description = request.Description;
        shift.ShiftType = request.ShiftType;
        shift.Status = request.Status;
        shift.RequiredHours = request.RequiredHours;
        shift.IsCheckInRequired = request.IsCheckInRequired;
        shift.IsAutoCheckOut = request.IsAutoCheckOut;
        shift.AllowFlexibleHours = request.AllowFlexibleHours;
        shift.FlexMinutesBefore = request.FlexMinutesBefore;
        shift.FlexMinutesAfter = request.FlexMinutesAfter;
        shift.GracePeriodMinutes = request.GracePeriodMinutes;

        // Extended Business Rules
        shift.RequiredWeeklyHours = request.RequiredWeeklyHours;
        shift.HasCoreHours = request.HasCoreHours;
        shift.CoreStart = request.CoreStart;
        shift.CoreEnd = request.CoreEnd;

        // Working Days
        shift.IsSunday = request.IsSunday;
        shift.IsMonday = request.IsMonday;
        shift.IsTuesday = request.IsTuesday;
        shift.IsWednesday = request.IsWednesday;
        shift.IsThursday = request.IsThursday;
        shift.IsFriday = request.IsFriday;
        shift.IsSaturday = request.IsSaturday;
        // IsNightShift will be calculated based on shift periods

        shift.ModifiedAtUtc = DateTime.UtcNow;
        shift.ModifiedBy = CurrentUser.Username;

        // Handle shift periods update
        if (request.ShiftPeriods?.Any() == true)
        {
            // Remove existing periods that are not in the update request
            var periodsToRemove = shift.ShiftPeriods
                .Where(existing => !request.ShiftPeriods.Any(update => update.Id == existing.Id))
                .ToList();

            Context.ShiftPeriods.RemoveRange(periodsToRemove);

            // Update or create shift periods
            foreach (var periodCommand in request.ShiftPeriods)
            {
                ShiftPeriod period;

                if (periodCommand.Id.HasValue)
                {
                    // Update existing period
                    period = shift.ShiftPeriods.FirstOrDefault(p => p.Id == periodCommand.Id.Value);
                    if (period == null)
                    {
                        return Result.Failure($"Shift period with ID {periodCommand.Id.Value} not found");
                    }

                    period.PeriodOrder = periodCommand.PeriodOrder;
                    period.StartTime = periodCommand.StartTime;
                    period.EndTime = periodCommand.EndTime;
                    period.ModifiedAtUtc = DateTime.UtcNow;
                    period.ModifiedBy = CurrentUser.Username;
                }
                else
                {
                    // Create new period
                    period = new ShiftPeriod
                    {
                        ShiftId = shift.Id,
                        PeriodOrder = periodCommand.PeriodOrder,
                        StartTime = periodCommand.StartTime,
                        EndTime = periodCommand.EndTime,
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = CurrentUser.Username
                    };

                    Context.ShiftPeriods.Add(period);
                }

                // Calculate hours for the period and validate
                period.CalculateHours();

                var (isValid, errorMessage) = period.ValidatePeriod();
                if (!isValid)
                {
                    return Result.Failure($"Invalid period {period.PeriodOrder}: {errorMessage}");
                }
            }

            // Validate shift periods don't overlap and are in correct order
            // Only validate the periods being sent in this request
            var periodsToValidate = request.ShiftPeriods.ToList();

            if (periodsToValidate.Count > 1)
            {
                var sortedPeriods = periodsToValidate.OrderBy(p => p.PeriodOrder).ToList();

                // Ensure period orders are sequential starting from 1
                var periodOrders = sortedPeriods.Select(p => p.PeriodOrder).ToList();
                var expectedOrders = Enumerable.Range(1, periodOrders.Count).ToList();
                if (!periodOrders.SequenceEqual(expectedOrders))
                {
                    return Result.Failure("Shift periods must have sequential order starting from 1");
                }

                for (int i = 1; i < sortedPeriods.Count; i++)
                {
                    var prevPeriod = sortedPeriods[i - 1];
                    var currentPeriod = sortedPeriods[i];

                    // Check if periods are night shifts (end time < start time)
                    var prevIsNight = prevPeriod.EndTime < prevPeriod.StartTime;
                    var currentIsNight = currentPeriod.EndTime < currentPeriod.StartTime;

                    // For non-night shifts, ensure no overlap
                    if (!prevIsNight && !currentIsNight)
                    {
                        if (prevPeriod.EndTime >= currentPeriod.StartTime)
                        {
                            return Result.Failure("Shift periods cannot overlap");
                        }
                    }
                    // For night shifts, validation is more complex
                    else if (prevIsNight && currentIsNight)
                    {
                        return Result.Failure("Cannot have multiple night periods in a single shift");
                    }
                }
            }

            // Calculate and set IsNightShift based on shift periods
            shift.IsNightShift = request.ShiftPeriods?.Any(p => p.EndTime < p.StartTime) ?? false;
        }
        else
        {
            // Remove all existing periods if none provided
            Context.ShiftPeriods.RemoveRange(shift.ShiftPeriods);
            shift.ShiftPeriods.Clear();

            // For hours-only shifts, set IsNightShift to false (no time periods defined)
            shift.IsNightShift = false;
        }

        // Validate complete shift business rules
        var (isShiftValid, shiftErrors) = shift.ValidateShiftRules();
        if (!isShiftValid)
        {
            return Result.Failure(string.Join(", ", shiftErrors));
        }

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.ShiftUpdated,
            EntityName = nameof(Domain.Shifts.Shift),
            EntityId = shift.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(request),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}