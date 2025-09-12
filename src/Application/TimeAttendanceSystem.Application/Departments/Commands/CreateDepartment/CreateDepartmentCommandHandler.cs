using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Application.Departments.Commands.CreateDepartment;

public class CreateDepartmentCommandHandler : BaseHandler<CreateDepartmentCommand, Result<long>>
{
    public CreateDepartmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateDepartmentCommand request, CancellationToken cancellationToken)
    {
        // Validate branch exists and user has access
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.BranchId, cancellationToken);

        if (branch == null)
            return Result.Failure<long>("Branch does not exist.");

        if (!CurrentUser.IsSystemAdmin && !CurrentUser.BranchIds.Contains(request.BranchId))
            return Result.Failure<long>("Access denied to this branch.");

        // Check if department code is unique within branch
        var existingDepartment = await Context.Departments
            .FirstOrDefaultAsync(d => d.BranchId == request.BranchId && d.Code == request.Code, cancellationToken);

        if (existingDepartment != null)
            return Result.Failure<long>("Department code already exists in this branch.");

        // Validate parent department if provided
        if (request.ParentDepartmentId.HasValue)
        {
            var parentDepartment = await Context.Departments
                .FirstOrDefaultAsync(d => d.Id == request.ParentDepartmentId && d.BranchId == request.BranchId, cancellationToken);

            if (parentDepartment == null)
                return Result.Failure<long>("Parent department does not exist in the specified branch.");

            // Check for circular reference
            if (await HasCircularReference(request.ParentDepartmentId.Value, 0, cancellationToken))
                return Result.Failure<long>("Creating this department would create a circular reference.");
        }

        // Validate manager employee if provided
        if (request.ManagerEmployeeId.HasValue)
        {
            var managerExists = await Context.Employees
                .AnyAsync(e => e.Id == request.ManagerEmployeeId && e.BranchId == request.BranchId, cancellationToken);

            if (!managerExists)
                return Result.Failure<long>("Manager employee does not exist in the specified branch.");
        }

        var department = new Department
        {
            BranchId = request.BranchId,
            Code = request.Code.Trim(),
            Name = request.Name.Trim(),
            NameAr = request.NameAr?.Trim(),
            Description = request.Description?.Trim(),
            DescriptionAr = request.DescriptionAr?.Trim(),
            ParentDepartmentId = request.ParentDepartmentId,
            ManagerEmployeeId = request.ManagerEmployeeId,
            CostCenter = request.CostCenter?.Trim(),
            Location = request.Location?.Trim(),
            Phone = request.Phone?.Trim(),
            Email = request.Email?.Trim(),
            SortOrder = request.SortOrder,
            IsActive = request.IsActive,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username
        };

        Context.Departments.Add(department);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(department.Id);
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