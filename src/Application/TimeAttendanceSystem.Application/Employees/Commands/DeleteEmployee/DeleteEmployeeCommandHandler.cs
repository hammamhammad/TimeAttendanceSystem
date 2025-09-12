using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.DeleteEmployee;

public class DeleteEmployeeCommandHandler : BaseHandler<DeleteEmployeeCommand, Result<Unit>>
{
    public DeleteEmployeeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<Unit>("Employee not found");
        }

        // Check if employee has direct reports
        var hasDirectReports = await Context.Employees
            .AnyAsync(e => e.ManagerEmployeeId == request.EmployeeId, cancellationToken);

        if (hasDirectReports)
        {
            return Result.Failure<Unit>("Cannot delete employee with direct reports. Reassign reports first.");
        }

        // Check if employee is linked to a user account
        var hasUserLink = await Context.EmployeeUserLinks
            .AnyAsync(eul => eul.EmployeeId == request.EmployeeId, cancellationToken);

        if (hasUserLink)
        {
            return Result.Failure<Unit>("Cannot delete employee linked to a user account. Unlink user first.");
        }

        // Soft delete
        employee.IsDeleted = true;
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.EmployeeDeleted,
            EntityName = nameof(Domain.Employees.Employee),
            EntityId = employee.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                EmployeeNumber = employee.EmployeeNumber,
                FullName = employee.FullName,
                Email = employee.Email,
                DeletedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}