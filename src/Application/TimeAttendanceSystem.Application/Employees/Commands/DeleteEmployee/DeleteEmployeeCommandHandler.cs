using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.DeleteEmployee;

/// <summary>
/// Handler for deleting an employee (soft-delete)
/// </summary>
public class DeleteEmployeeCommandHandler : BaseHandler<DeleteEmployeeCommand, Result<Unit>>
{
    public DeleteEmployeeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
    {
        // Find the employee (ignore soft-delete filter)
        var employee = await Context.Employees
            .IgnoreQueryFilters()
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<Unit>("Employee not found");
        }

        // Check if already deleted
        if (employee.IsDeleted)
        {
            return Result.Failure<Unit>("Employee is already deleted");
        }

        // Soft delete - set IsDeleted flag
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
                EmployeeId = employee.Id,
                EmployeeNumber = employee.EmployeeNumber,
                FullName = employee.FullName,
                Email = employee.Email
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(Unit.Value);
    }
}
