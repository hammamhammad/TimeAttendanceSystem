using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Shifts.Commands.DeleteShift;

/// <summary>
/// Command handler for soft deleting shifts with proper audit trail and referential integrity checks.
/// </summary>
public class DeleteShiftCommandHandler : BaseHandler<DeleteShiftCommand, Result>
{
    public DeleteShiftCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(DeleteShiftCommand request, CancellationToken cancellationToken)
    {
        var shift = await Context.Shifts
            .Include(s => s.ShiftPeriods)
            .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

        if (shift == null)
        {
            return Result.Failure("Shift not found");
        }

        // Check if shift is currently assigned to any active employees
        var hasActiveAssignments = await Context.ShiftAssignments
            .Where(sa => sa.ShiftId == request.Id &&
                         !sa.IsDeleted &&
                         sa.Status == Domain.Common.ShiftAssignmentStatus.Active &&
                         sa.EffectiveFromDate <= DateTime.UtcNow &&
                         (!sa.EffectiveToDate.HasValue || sa.EffectiveToDate >= DateTime.UtcNow))
            .AnyAsync(cancellationToken);

        if (hasActiveAssignments)
        {
            return Result.Failure("Cannot delete shift because it is currently assigned to active employees. Please remove all active assignments before deleting the shift.");
        }

        // Soft delete the shift
        shift.IsDeleted = true;
        shift.ModifiedAtUtc = DateTime.UtcNow;
        shift.ModifiedBy = CurrentUser.Username;

        // Soft delete associated shift periods
        foreach (var period in shift.ShiftPeriods)
        {
            period.IsDeleted = true;
            period.ModifiedAtUtc = DateTime.UtcNow;
            period.ModifiedBy = CurrentUser.Username;
        }

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.ShiftDeleted,
            EntityName = nameof(Domain.Shifts.Shift),
            EntityId = shift.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new { Id = request.Id }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}