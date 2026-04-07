using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.OnCallSchedules.Commands.UpdateOnCallSchedule;

public class UpdateOnCallScheduleCommandHandler : BaseHandler<UpdateOnCallScheduleCommand, Result>
{
    public UpdateOnCallScheduleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(UpdateOnCallScheduleCommand request, CancellationToken cancellationToken)
    {
        if (request.StartDate >= request.EndDate)
            return Result.Failure("Start date must be before end date.");

        var schedule = await Context.OnCallSchedules
            .Include(o => o.Employee)
            .FirstOrDefaultAsync(o => o.Id == request.Id && !o.IsDeleted, cancellationToken);

        if (schedule == null)
            return Result.Failure("On-call schedule not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(schedule.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        // Validate employee exists if changed
        if (request.EmployeeId != schedule.EmployeeId)
        {
            var employee = await Context.Employees
                .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

            if (employee == null)
                return Result.Failure("Employee not found.");

            if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
                return Result.Failure("Access denied to the target employee's branch.");
        }

        // Validate shift exists if provided
        if (request.ShiftId.HasValue)
        {
            var shiftExists = await Context.Shifts
                .AnyAsync(s => s.Id == request.ShiftId.Value && !s.IsDeleted, cancellationToken);

            if (!shiftExists)
                return Result.Failure("Shift not found.");
        }

        // Check for overlapping on-call schedules (excluding this one)
        var hasOverlap = await Context.OnCallSchedules
            .AnyAsync(o => o.EmployeeId == request.EmployeeId
                && o.Id != request.Id
                && !o.IsDeleted
                && o.IsActive
                && o.StartDate < request.EndDate
                && o.EndDate > request.StartDate, cancellationToken);

        if (hasOverlap)
            return Result.Failure("Employee already has an overlapping on-call schedule for this period.");

        schedule.EmployeeId = request.EmployeeId;
        schedule.StartDate = request.StartDate;
        schedule.EndDate = request.EndDate;
        schedule.OnCallType = request.OnCallType;
        schedule.ShiftId = request.ShiftId;
        schedule.Notes = request.Notes;
        schedule.NotesAr = request.NotesAr;
        schedule.IsActive = request.IsActive;
        schedule.ModifiedAtUtc = DateTime.UtcNow;
        schedule.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
