using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Shifts.Queries.GetShifts;

namespace TimeAttendanceSystem.Application.Shifts.Queries.GetShiftById;

/// <summary>
/// Query handler for retrieving a specific shift by its identifier.
/// </summary>
public class GetShiftByIdQueryHandler : BaseHandler<GetShiftByIdQuery, Result<ShiftDto?>>
{
    public GetShiftByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<ShiftDto?>> Handle(GetShiftByIdQuery request, CancellationToken cancellationToken)
    {
        var shift = await Context.Shifts
            .Include(s => s.ShiftPeriods.OrderBy(sp => sp.PeriodOrder))
            .Where(s => s.Id == request.Id)
            .Select(s => new ShiftDto
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                ShiftType = s.ShiftType,
                Status = s.Status,
                RequiredHours = s.RequiredHours,
                IsCheckInRequired = s.IsCheckInRequired,
                IsAutoCheckOut = s.IsAutoCheckOut,
                AllowFlexibleHours = s.AllowFlexibleHours,
                FlexMinutesBefore = s.FlexMinutesBefore,
                FlexMinutesAfter = s.FlexMinutesAfter,
                GracePeriodMinutes = s.GracePeriodMinutes,

                // Extended Business Rules
                RequiredWeeklyHours = s.RequiredWeeklyHours,
                HasCoreHours = s.HasCoreHours,
                CoreStart = s.CoreStart,
                CoreEnd = s.CoreEnd,

                // Working Days
                IsSunday = s.IsSunday,
                IsMonday = s.IsMonday,
                IsTuesday = s.IsTuesday,
                IsWednesday = s.IsWednesday,
                IsThursday = s.IsThursday,
                IsFriday = s.IsFriday,
                IsSaturday = s.IsSaturday,
                IsNightShift = s.IsNightShift,

                ShiftPeriods = s.ShiftPeriods.Select(sp => new ShiftPeriodDto
                {
                    Id = sp.Id,
                    PeriodOrder = sp.PeriodOrder,
                    StartTime = sp.StartTime,
                    EndTime = sp.EndTime,
                    Hours = sp.Hours,
                    IsNightPeriod = sp.IsNightPeriod
                }).ToList(),
                CreatedAtUtc = s.CreatedAtUtc,
                CreatedBy = s.CreatedBy,
                ModifiedAtUtc = s.ModifiedAtUtc,
                ModifiedBy = s.ModifiedBy
            })
            .FirstOrDefaultAsync(cancellationToken);

        return Result.Success(shift);
    }
}