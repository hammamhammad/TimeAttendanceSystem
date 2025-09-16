using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Departments.Commands.UpdateDepartment;

public class UpdateDepartmentCommandHandler : BaseHandler<UpdateDepartmentCommand, Result>
{
    public UpdateDepartmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(UpdateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = await Context.Departments
            .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);

        if (department == null)
            return Result.Failure("Department not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(department.BranchId))
            return Result.Failure("Access denied to this department's branch.");

        // Check if department code is unique within branch (excluding current department)
        var existingDepartment = await Context.Departments
            .FirstOrDefaultAsync(d => d.BranchId == department.BranchId && 
                                    d.Code == request.Code && 
                                    d.Id != request.Id, cancellationToken);

        if (existingDepartment != null)
            return Result.Failure("Department code already exists in this branch.");

        // Validate parent department if provided
        if (request.ParentDepartmentId.HasValue)
        {
            if (request.ParentDepartmentId == request.Id)
                return Result.Failure("Department cannot be its own parent.");

            var parentDepartment = await Context.Departments
                .FirstOrDefaultAsync(d => d.Id == request.ParentDepartmentId && 
                                        d.BranchId == department.BranchId, cancellationToken);

            if (parentDepartment == null)
                return Result.Failure("Parent department does not exist in the same branch.");

            // Check for circular reference
            if (await HasCircularReference(request.ParentDepartmentId.Value, request.Id, cancellationToken))
                return Result.Failure("Updating this department would create a circular reference.");
        }

        // Validate manager employee if provided
        if (request.ManagerEmployeeId.HasValue)
        {
            var managerExists = await Context.Employees
                .AnyAsync(e => e.Id == request.ManagerEmployeeId && 
                              e.BranchId == department.BranchId, cancellationToken);

            if (!managerExists)
                return Result.Failure("Manager employee does not exist in the same branch.");
        }

        // Update department properties
        department.Code = request.Code.Trim();
        department.Name = request.Name.Trim();
        department.NameAr = request.NameAr?.Trim();
        department.Description = request.Description?.Trim();
        department.DescriptionAr = request.DescriptionAr?.Trim();
        department.ParentDepartmentId = request.ParentDepartmentId;
        department.ManagerEmployeeId = request.ManagerEmployeeId;
        department.CostCenter = request.CostCenter?.Trim();
        department.Location = request.Location?.Trim();
        department.Phone = request.Phone?.Trim();
        department.Email = request.Email?.Trim();
        department.SortOrder = request.SortOrder;
        department.IsActive = request.IsActive;
        department.ModifiedAtUtc = DateTime.UtcNow;
        department.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }

    private async Task<bool> HasCircularReference(long parentId, long checkingId, CancellationToken cancellationToken, int depth = 0)
    {
        if (depth > 10) return true; // Prevent infinite recursion

        if (parentId == checkingId) return true;

        var parent = await Context.Departments
            .AsNoTracking()
            .FirstOrDefaultAsync(d => d.Id == parentId, cancellationToken);

        if (parent?.ParentDepartmentId == null) return false;

        return await HasCircularReference(parent.ParentDepartmentId.Value, checkingId, cancellationToken, depth + 1);
    }
}