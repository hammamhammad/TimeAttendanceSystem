using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Application.Shifts.Commands.CreateShift;

/// <summary>
/// Command handler for creating new shifts with comprehensive validation and business rule enforcement.
/// Implements shift management business rules from the specification document.
/// </summary>
public class CreateShiftCommandHandler : BaseHandler<CreateShiftCommand, Result<long>>
{
    public CreateShiftCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateShiftCommand request, CancellationToken cancellationToken)
    {
        // Check if shift name already exists (system-wide uniqueness)
        var existingShift = await Context.Shifts
            .FirstOrDefaultAsync(s => s.Name == request.Name, cancellationToken);

        if (existingShift != null)
        {
            return Result.Failure<long>("Shift name must be unique across the system");
        }

        // Create the shift
        var shift = new Shift
        {
            Name = request.Name,
            Description = request.Description,
            ShiftType = request.ShiftType,
            Status = request.Status,
            RequiredHours = request.RequiredHours,
            IsCheckInRequired = request.IsCheckInRequired,
            IsAutoCheckOut = request.IsAutoCheckOut,
            AllowFlexibleHours = request.AllowFlexibleHours,
            FlexMinutesBefore = request.FlexMinutesBefore,
            FlexMinutesAfter = request.FlexMinutesAfter,
            GracePeriodMinutes = request.GracePeriodMinutes,
            // Extended Business Rules
            RequiredWeeklyHours = request.RequiredWeeklyHours,
            HasCoreHours = request.HasCoreHours,
            CoreStart = request.HasCoreHours && !string.IsNullOrEmpty(request.CoreStart) ? TimeOnly.Parse(request.CoreStart) : null,
            CoreEnd = request.HasCoreHours && !string.IsNullOrEmpty(request.CoreEnd) ? TimeOnly.Parse(request.CoreEnd) : null,
            // Working Days
            IsSunday = request.IsSunday,
            IsMonday = request.IsMonday,
            IsTuesday = request.IsTuesday,
            IsWednesday = request.IsWednesday,
            IsThursday = request.IsThursday,
            IsFriday = request.IsFriday,
            IsSaturday = request.IsSaturday,
            // IsNightShift will be calculated based on periods
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username
        };

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.ShiftCreated,
            EntityName = nameof(Domain.Shifts.Shift),
            EntityId = shift.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(request),
            CreatedAtUtc = DateTime.UtcNow
        });

        // Create shift periods if provided
        if (request.ShiftPeriods?.Any() == true)
        {
            var shiftPeriods = request.ShiftPeriods.Select(sp => new ShiftPeriod
            {
                ShiftId = shift.Id,
                PeriodOrder = sp.PeriodOrder,
                StartTime = sp.StartTime,
                EndTime = sp.EndTime,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username
            }).ToList();

            // Calculate hours for each period and validate
            foreach (var period in shiftPeriods)
            {
                period.CalculateHours();

                var (isValid, errorMessage) = period.ValidatePeriod();
                if (!isValid)
                {
                    return Result.Failure<long>($"Invalid period {period.PeriodOrder}: {errorMessage}");
                }
            }

            // Validate shift periods don't overlap and are in correct order
            if (shiftPeriods.Count > 1)
            {
                var sortedPeriods = shiftPeriods.OrderBy(p => p.PeriodOrder).ToList();

                // Ensure period orders are sequential starting from 1
                var periodOrders = sortedPeriods.Select(p => p.PeriodOrder).ToList();
                var expectedOrders = Enumerable.Range(1, periodOrders.Count).ToList();
                if (!periodOrders.SequenceEqual(expectedOrders))
                {
                    return Result.Failure<long>("Shift periods must have sequential order starting from 1");
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
                            return Result.Failure<long>("Shift periods cannot overlap");
                        }
                    }
                    // For night shifts, validation is more complex
                    else if (prevIsNight && currentIsNight)
                    {
                        return Result.Failure<long>("Cannot have multiple night periods in a single shift");
                    }
                }
            }

            // Add periods to shift for validation
            shift.ShiftPeriods = shiftPeriods;

            // Calculate and set IsNightShift based on shift periods
            shift.IsNightShift = shiftPeriods.Any(p => p.EndTime < p.StartTime);

            // Add periods to database
            Context.ShiftPeriods.AddRange(shiftPeriods);
        }
        else
        {
            // For hours-only shifts, set IsNightShift to false (no time periods defined)
            shift.IsNightShift = false;
        }

        // Validate complete shift business rules
        var (isShiftValid, shiftErrors) = shift.ValidateShiftRules();
        if (!isShiftValid)
        {
            return Result.Failure<long>(string.Join(", ", shiftErrors));
        }

        // Add the shift to database
        Context.Shifts.Add(shift);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(shift.Id);
    }
}