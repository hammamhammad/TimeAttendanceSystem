using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Departments.Queries.GetDepartments;

namespace TimeAttendanceSystem.Application.Departments.Queries.GetDepartmentById;

public class GetDepartmentByIdQueryHandler : BaseHandler<GetDepartmentByIdQuery, Result<DepartmentDto>>
{
    public GetDepartmentByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<DepartmentDto>> Handle(GetDepartmentByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.Departments
            .Include(d => d.Branch)
            .Include(d => d.ParentDepartment)
            .Where(d => d.Id == request.Id);

        // Apply branch access restrictions for non-system admins (only if user has specific branch assignments)
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            query = query.Where(d => CurrentUser.BranchIds.Contains(d.BranchId));
        }

        var department = await query
            .Select(d => new DepartmentDto
            {
                Id = d.Id,
                BranchId = d.BranchId,
                BranchName = d.Branch.Name,
                Code = d.Code,
                Name = d.Name,
                NameAr = d.NameAr,
                Description = d.Description,
                DescriptionAr = d.DescriptionAr,
                ParentDepartmentId = d.ParentDepartmentId,
                ParentDepartmentName = d.ParentDepartment != null ? d.ParentDepartment.Name : null,
                ManagerEmployeeId = d.ManagerEmployeeId,
                ManagerName = d.ManagerEmployeeId.HasValue ?
                    Context.Employees
                        .Where(e => e.Id == d.ManagerEmployeeId)
                        .Select(e => e.FirstName + " " + e.LastName)
                        .FirstOrDefault() : null,
                CostCenter = d.CostCenter,
                Location = d.Location,
                Phone = d.Phone,
                Email = d.Email,
                SortOrder = d.SortOrder,
                IsActive = d.IsActive,
                EmployeeCount = Context.Employees.Count(e => e.DepartmentId == d.Id),
                HasChildren = Context.Departments.Any(sub => sub.ParentDepartmentId == d.Id),
                CreatedAtUtc = d.CreatedAtUtc
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (department == null)
        {
            return Result.Failure<DepartmentDto>("Department not found");
        }

        // Build department path and calculate level
        var allDepartments = await Context.Departments
            .Include(d => d.ParentDepartment)
            .Where(d => CurrentUser.IsSystemAdmin || !CurrentUser.BranchIds.Any() || CurrentUser.BranchIds.Contains(d.BranchId))
            .Select(d => new DepartmentDto
            {
                Id = d.Id,
                Name = d.Name,
                ParentDepartmentId = d.ParentDepartmentId
            })
            .ToListAsync(cancellationToken);

        department.Path = BuildDepartmentPath(department, allDepartments);
        department.Level = CalculateLevel(department, allDepartments);

        return Result.Success(department);
    }

    private static int CalculateLevel(DepartmentDto department, List<DepartmentDto> allDepartments)
    {
        if (department.ParentDepartmentId == null)
            return 0;

        var parent = allDepartments.FirstOrDefault(d => d.Id == department.ParentDepartmentId);
        return parent != null ? CalculateLevel(parent, allDepartments) + 1 : 0;
    }

    private static string BuildDepartmentPath(DepartmentDto department, List<DepartmentDto> allDepartments)
    {
        if (department.ParentDepartmentId == null)
            return department.Name;

        var parent = allDepartments.FirstOrDefault(d => d.Id == department.ParentDepartmentId);
        if (parent != null)
        {
            var parentPath = BuildDepartmentPath(parent, allDepartments);
            return $"{parentPath} > {department.Name}";
        }

        return department.Name;
    }
}