using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Shifts.Queries.GetShifts;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Shifts.Queries.GetDefaultShift;

public class GetDefaultShiftQueryHandler : IRequestHandler<GetDefaultShiftQuery, Result<ShiftDto?>>
{
    private readonly IApplicationDbContext _context;

    public GetDefaultShiftQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<ShiftDto?>> Handle(GetDefaultShiftQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var defaultShift = await _context.Shifts
                .Include(s => s.ShiftPeriods)
                .Where(s => s.IsDefault && !s.IsDeleted)
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
                    RequiredWeeklyHours = s.RequiredWeeklyHours,
                    HasCoreHours = s.HasCoreHours,
                    CoreStart = s.CoreStart,
                    CoreEnd = s.CoreEnd,
                    IsSunday = s.IsSunday,
                    IsMonday = s.IsMonday,
                    IsTuesday = s.IsTuesday,
                    IsWednesday = s.IsWednesday,
                    IsThursday = s.IsThursday,
                    IsFriday = s.IsFriday,
                    IsSaturday = s.IsSaturday,
                    IsNightShift = s.IsNightShift,
                    IsDefault = s.IsDefault,
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

            return Result<ShiftDto?>.Success(defaultShift);
        }
        catch (Exception ex)
        {
            return Result.Failure<ShiftDto?>($"Failed to retrieve default shift: {ex.Message}");
        }
    }
}