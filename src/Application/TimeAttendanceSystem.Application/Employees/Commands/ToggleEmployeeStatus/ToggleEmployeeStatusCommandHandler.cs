using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.ToggleEmployeeStatus;

/// <summary>
/// Handler for toggling employee active/inactive status
/// </summary>
public class ToggleEmployeeStatusCommandHandler : BaseHandler<ToggleEmployeeStatusCommand, Result<bool>>
{
    public ToggleEmployeeStatusCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<bool>> Handle(ToggleEmployeeStatusCommand request, CancellationToken cancellationToken)
    {
        // Find the employee
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<bool>("Employee not found");
        }

        // Toggle the IsDeleted flag (which maps to IsActive in DTOs)
        // IsActive = !IsDeleted, so toggling IsDeleted toggles the active status
        var isCurrentlyActive = !employee.IsDeleted;
        employee.IsDeleted = isCurrentlyActive; // If currently active (IsDeleted=false), set to true (inactive)
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        // Determine the audit action
        var auditAction = !employee.IsDeleted // Now active (IsDeleted=false)
            ? AuditAction.EmployeeActivated
            : AuditAction.EmployeeDeactivated;

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = auditAction,
            EntityName = nameof(Domain.Employees.Employee),
            EntityId = employee.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                EmployeeId = employee.Id,
                EmployeeNumber = employee.EmployeeNumber,
                FullName = employee.FullName,
                EmploymentStatus = employee.EmploymentStatus.ToString(),
                IsActive = !employee.IsDeleted
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);

        // Return true if now active, false if now inactive
        return Result.Success(!employee.IsDeleted);
    }
}
