using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Shifts.Queries.GetShifts;

/// <summary>
/// Query handler for retrieving shifts with comprehensive filtering and pagination support.
/// </summary>
public class GetShiftsQueryHandler : BaseHandler<GetShiftsQuery, Result<PagedResult<ShiftDto>>>
{
    public GetShiftsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PagedResult<ShiftDto>>> Handle(GetShiftsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.Shifts
            .Include(s => s.ShiftPeriods.OrderBy(sp => sp.PeriodOrder))
            .Where(s => !s.IsDeleted)
            .AsQueryable();

        // Apply search filter
        if (!string.IsNullOrEmpty(request.Search))
        {
            query = query.Where(s =>
                s.Name.Contains(request.Search) ||
                (s.Description != null && s.Description.Contains(request.Search)));
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination and projection
        var shifts = await query
            .OrderBy(s => s.Name)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
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
            .ToListAsync(cancellationToken);

        var result = new PagedResult<ShiftDto>(
            shifts,
            totalCount,
            request.Page,
            request.PageSize
        );

        return Result.Success(result);
    }
}