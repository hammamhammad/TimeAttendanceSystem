using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Departments.Commands.DeleteDepartment;

public class DeleteDepartmentCommandHandler : BaseHandler<DeleteDepartmentCommand, Result>
{
    public DeleteDepartmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = await Context.Departments
            .Include(d => d.SubDepartments)
            .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);

        if (department == null)
            return Result.Failure("Department not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(department.BranchId))
            return Result.Failure("Access denied to this department's branch.");

        // Check if department has sub-departments
        if (department.SubDepartments.Any())
            return Result.Failure("Cannot delete department with sub-departments. Please delete or reassign sub-departments first.");

        // Check if department has employees
        var hasEmployees = await Context.Employees
            .AnyAsync(e => e.DepartmentId == request.Id, cancellationToken);

        if (hasEmployees)
            return Result.Failure("Cannot delete department with employees. Please reassign employees first.");

        // Soft delete
        department.IsDeleted = true;
        department.ModifiedAtUtc = DateTime.UtcNow;
        department.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}