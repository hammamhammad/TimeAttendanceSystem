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
        // Find the employee - no need to ignore query filters since we're using IsActive now
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<bool>("Employee not found");
        }

        // Toggle the IsActive flag
        employee.IsActive = !employee.IsActive;
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        // Determine the audit action
        var auditAction = employee.IsActive
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
                IsActive = employee.IsActive
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);

        // Return the new active status
        return Result.Success(employee.IsActive);
    }
}
