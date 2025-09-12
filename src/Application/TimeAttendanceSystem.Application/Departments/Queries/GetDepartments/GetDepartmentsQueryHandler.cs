using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Departments.Queries.GetDepartments;

public class GetDepartmentsQueryHandler : BaseHandler<GetDepartmentsQuery, Result<List<DepartmentDto>>>
{
    public GetDepartmentsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<List<DepartmentDto>>> Handle(GetDepartmentsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.Departments
            .Include(d => d.Branch)
            .Include(d => d.ParentDepartment)
            .AsQueryable();

        // Apply branch filter if provided or restrict based on user access
        if (request.BranchId.HasValue)
        {
            query = query.Where(d => d.BranchId == request.BranchId.Value);
        }
        else if (!CurrentUser.IsSystemAdmin)
        {
            query = query.Where(d => CurrentUser.BranchIds.Contains(d.BranchId));
        }

        // Apply active status filter
        if (request.IsActive.HasValue)
        {
            query = query.Where(d => d.IsActive == request.IsActive.Value);
        }
        else if (!request.IncludeInactive)
        {
            query = query.Where(d => d.IsActive);
        }

        // Apply parent department filter
        if (request.ParentDepartmentId.HasValue)
        {
            query = query.Where(d => d.ParentDepartmentId == request.ParentDepartmentId.Value);
        }

        // Apply search filter
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var searchTerm = request.Search.Trim().ToLower();
            query = query.Where(d => 
                d.Name.ToLower().Contains(searchTerm) ||
                d.Code.ToLower().Contains(searchTerm) ||
                (d.NameAr != null && d.NameAr.ToLower().Contains(searchTerm)) ||
                (d.Description != null && d.Description.ToLower().Contains(searchTerm)) ||
                (d.CostCenter != null && d.CostCenter.ToLower().Contains(searchTerm))
            );
        }

        // Get all departments with enhanced data
        var allDepartments = await query
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
            .OrderBy(d => d.BranchName)
            .ThenBy(d => d.SortOrder)
            .ThenBy(d => d.Name)
            .ToListAsync(cancellationToken);

        // Build path for each department
        foreach (var dept in allDepartments)
        {
            dept.Path = BuildDepartmentPath(dept, allDepartments);
        }

        if (request.IncludeTree)
        {
            // Build hierarchical structure
            var rootDepartments = allDepartments.Where(d => d.ParentDepartmentId == null).ToList();
            
            foreach (var root in rootDepartments)
            {
                BuildDepartmentTree(root, allDepartments, 0);
            }
            
            return Result.Success(rootDepartments);
        }

        // Calculate level for flat structure
        foreach (var dept in allDepartments)
        {
            dept.Level = CalculateLevel(dept, allDepartments);
        }

        return Result.Success(allDepartments);
    }

    private static void BuildDepartmentTree(DepartmentDto parent, List<DepartmentDto> allDepartments, int level)
    {
        parent.Level = level;
        parent.Children = allDepartments
            .Where(d => d.ParentDepartmentId == parent.Id)
            .OrderBy(d => d.SortOrder)
            .ThenBy(d => d.Name)
            .ToList();

        foreach (var child in parent.Children)
        {
            BuildDepartmentTree(child, allDepartments, level + 1);
        }
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