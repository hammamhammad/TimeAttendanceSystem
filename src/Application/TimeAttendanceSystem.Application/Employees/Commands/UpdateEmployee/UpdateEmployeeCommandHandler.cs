using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.UpdateEmployee;

public class UpdateEmployeeCommandHandler : BaseHandler<UpdateEmployeeCommand, Result<Unit>>
{
    public UpdateEmployeeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<Unit>("Employee not found");
        }

        // Check if email is already taken by another employee
        if (!string.IsNullOrEmpty(request.Email))
        {
            var existingEmployee = await Context.Employees
                .FirstOrDefaultAsync(e => e.Email == request.Email && e.Id != request.Id, cancellationToken);
            
            if (existingEmployee != null)
            {
                return Result.Failure<Unit>("Email is already taken by another employee");
            }
        }

        // Validate department exists if provided
        if (request.DepartmentId.HasValue)
        {
            var departmentExists = await Context.Departments
                .AnyAsync(d => d.Id == request.DepartmentId.Value, cancellationToken);
            
            if (!departmentExists)
            {
                return Result.Failure<Unit>("Department not found");
            }
        }

        // Validate manager exists if provided
        if (request.ManagerEmployeeId.HasValue)
        {
            var managerExists = await Context.Employees
                .AnyAsync(e => e.Id == request.ManagerEmployeeId.Value, cancellationToken);
            
            if (!managerExists)
            {
                return Result.Failure<Unit>("Manager employee not found");
            }

            // Prevent circular manager relationships
            if (request.ManagerEmployeeId.Value == request.Id)
            {
                return Result.Failure<Unit>("Employee cannot be their own manager");
            }
        }

        // Update employee properties
        employee.FirstName = request.FirstName;
        employee.LastName = request.LastName;
        employee.FirstNameAr = request.FirstNameAr;
        employee.LastNameAr = request.LastNameAr;
        employee.Email = request.Email;
        employee.Phone = request.Phone;
        employee.DateOfBirth = request.DateOfBirth;
        employee.Gender = request.Gender;
        employee.EmploymentStatus = request.EmploymentStatus;
        employee.JobTitle = request.JobTitle;
        employee.JobTitleAr = request.JobTitleAr;
        employee.DepartmentId = request.DepartmentId;
        employee.ManagerEmployeeId = request.ManagerEmployeeId;
        employee.WorkLocationType = request.WorkLocationType;
        employee.PhotoUrl = request.PhotoUrl;
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.EmployeeUpdated,
            EntityName = nameof(Domain.Employees.Employee),
            EntityId = employee.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                request.FirstName,
                request.LastName,
                request.Email,
                request.JobTitle,
                request.EmploymentStatus,
                request.DepartmentId,
                request.ManagerEmployeeId
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}