using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.CreateOnCallSchedule;

public class CreateOnCallScheduleCommandHandler : BaseHandler<CreateOnCallScheduleCommand, Result<long>>
{
    public CreateOnCallScheduleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateOnCallScheduleCommand request, CancellationToken cancellationToken)
    {
        if (request.StartDate >= request.EndDate)
            return Result.Failure<long>("Start date must be before end date.");

        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        // Validate shift exists if provided
        if (request.ShiftId.HasValue)
        {
            var shiftExists = await Context.Shifts
                .AnyAsync(s => s.Id == request.ShiftId.Value && !s.IsDeleted, cancellationToken);

            if (!shiftExists)
                return Result.Failure<long>("Shift not found.");
        }

        // Check for overlapping on-call schedules for the same employee
        var hasOverlap = await Context.OnCallSchedules
            .AnyAsync(o => o.EmployeeId == request.EmployeeId
                && !o.IsDeleted
                && o.IsActive
                && o.StartDate < request.EndDate
                && o.EndDate > request.StartDate, cancellationToken);

        if (hasOverlap)
            return Result.Failure<long>("Employee already has an overlapping on-call schedule for this period.");

        var schedule = new OnCallSchedule
        {
            EmployeeId = request.EmployeeId,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            OnCallType = request.OnCallType,
            ShiftId = request.ShiftId,
            Notes = request.Notes,
            NotesAr = request.NotesAr,
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.OnCallSchedules.Add(schedule);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(schedule.Id);
    }
}
