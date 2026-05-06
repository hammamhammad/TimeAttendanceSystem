using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Shifts;

namespace TecAxle.Hrms.Application.Employees.Queries.GetEmployees;

public class GetEmployeesQueryHandler : BaseHandler<GetEmployeesQuery, Result<PagedResult<EmployeeDto>>>
{
    public GetEmployeesQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PagedResult<EmployeeDto>>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
    {
        var query = Context.Employees
            .Include(e => e.Branch)
            .Include(e => e.Department)
            .Include(e => e.Manager)
            .AsQueryable();

        // Apply filters
        if (!string.IsNullOrEmpty(request.Search))
        {
            query = query.Where(e => 
                e.FirstName.Contains(request.Search) ||
                e.LastName.Contains(request.Search) ||
                e.FirstNameAr.Contains(request.Search) ||
                e.LastNameAr.Contains(request.Search) ||
                e.EmployeeNumber.Contains(request.Search) ||
                (e.Email != null && e.Email.Contains(request.Search)));
        }

        if (request.BranchId.HasValue)
        {
            query = query.Where(e => e.BranchId == request.BranchId.Value);
        }

        if (request.DepartmentId.HasValue)
        {
            query = query.Where(e => e.DepartmentId == request.DepartmentId.Value);
        }

        if (request.ManagerId.HasValue)
        {
            query = query.Where(e => e.ManagerEmployeeId == request.ManagerId.Value);
        }

        if (request.IsActive.HasValue)
        {
            query = query.Where(e => e.IsActive == request.IsActive.Value);
        }

        if (!string.IsNullOrEmpty(request.EmploymentStatus) && 
            Enum.TryParse<EmploymentStatus>(request.EmploymentStatus, true, out var status))
        {
            query = query.Where(e => e.EmploymentStatus == status);
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply sorting — falls back to (LastName, FirstName) when no SortBy given.
        // Accepts both domain-field names (fullName, employeeNumber) and UI column keys (name, employeeCode).
        var desc = string.Equals(request.SortDirection, "desc", StringComparison.OrdinalIgnoreCase);
        IQueryable<Domain.Employees.Employee> ordered = (request.SortBy?.ToLowerInvariant()) switch
        {
            "fullname" or "lastname" or "employee" or "name" => desc
                ? query.OrderByDescending(e => e.LastName).ThenByDescending(e => e.FirstName)
                : query.OrderBy(e => e.LastName).ThenBy(e => e.FirstName),
            "firstname" => desc ? query.OrderByDescending(e => e.FirstName) : query.OrderBy(e => e.FirstName),
            "employeenumber" or "code" or "employeecode" => desc ? query.OrderByDescending(e => e.EmployeeNumber) : query.OrderBy(e => e.EmployeeNumber),
            "email" => desc ? query.OrderByDescending(e => e.Email) : query.OrderBy(e => e.Email),
            "branch" or "branchname" => desc ? query.OrderByDescending(e => e.Branch.Name) : query.OrderBy(e => e.Branch.Name),
            "department" or "departmentname" => desc ? query.OrderByDescending(e => e.Department!.Name) : query.OrderBy(e => e.Department!.Name),
            "hiredate" => desc ? query.OrderByDescending(e => e.HireDate) : query.OrderBy(e => e.HireDate),
            "status" or "isactive" => desc ? query.OrderByDescending(e => e.IsActive) : query.OrderBy(e => e.IsActive),
            "employmentstatus" => desc ? query.OrderByDescending(e => e.EmploymentStatus) : query.OrderBy(e => e.EmploymentStatus),
            _ => query.OrderBy(e => e.LastName).ThenBy(e => e.FirstName)
        };

        // Apply pagination
        var employees = await ordered
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(e => new EmployeeDto
            {
                Id = e.Id,
                BranchId = e.BranchId,
                BranchName = e.Branch.Name,
                EmployeeNumber = e.EmployeeNumber,
                FirstName = e.FirstName,
                LastName = e.LastName,
                FirstNameAr = e.FirstNameAr,
                LastNameAr = e.LastNameAr,
                Email = e.Email,
                Phone = e.Phone,
                HireDate = e.HireDate,
                EmploymentStatus = e.EmploymentStatus,
                JobTitle = e.JobTitle,
                JobTitleAr = e.JobTitleAr,
                DepartmentId = e.DepartmentId,
                DepartmentName = e.Department != null ? e.Department.Name : null,
                ManagerEmployeeId = e.ManagerEmployeeId,
                ManagerName = e.Manager != null ? $"{e.Manager.FirstName} {e.Manager.LastName}" : null,
                WorkLocationType = e.WorkLocationType,
                // Resolve shift: Employee-level > Department-level > Branch-level
                CurrentShiftId = Context.ShiftAssignments
                    .Where(sa => sa.Status == ShiftAssignmentStatus.Active &&
                                sa.EffectiveFromDate <= DateTime.UtcNow &&
                                (sa.EffectiveToDate == null || sa.EffectiveToDate >= DateTime.UtcNow) &&
                                (
                                    (sa.AssignmentType == ShiftAssignmentType.Employee && sa.EmployeeId == e.Id) ||
                                    (sa.AssignmentType == ShiftAssignmentType.Department && sa.DepartmentId == e.DepartmentId) ||
                                    (sa.AssignmentType == ShiftAssignmentType.Branch && sa.BranchId == e.BranchId)
                                ))
                    .OrderByDescending(sa => sa.Priority)
                    .ThenByDescending(sa => sa.EffectiveFromDate)
                    .Select(sa => sa.ShiftId)
                    .FirstOrDefault(),
                CurrentShiftName = Context.ShiftAssignments
                    .Where(sa => sa.Status == ShiftAssignmentStatus.Active &&
                                sa.EffectiveFromDate <= DateTime.UtcNow &&
                                (sa.EffectiveToDate == null || sa.EffectiveToDate >= DateTime.UtcNow) &&
                                (
                                    (sa.AssignmentType == ShiftAssignmentType.Employee && sa.EmployeeId == e.Id) ||
                                    (sa.AssignmentType == ShiftAssignmentType.Department && sa.DepartmentId == e.DepartmentId) ||
                                    (sa.AssignmentType == ShiftAssignmentType.Branch && sa.BranchId == e.BranchId)
                                ))
                    .OrderByDescending(sa => sa.Priority)
                    .ThenByDescending(sa => sa.EffectiveFromDate)
                    .Join(Context.Shifts, sa => sa.ShiftId, s => s.Id, (sa, s) => s.Name)
                    .FirstOrDefault(),
                IsActive = e.IsActive,
                HasUserAccount = Context.EmployeeUserLinks.Any(eul => eul.EmployeeId == e.Id),
                CreatedAtUtc = e.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var result = new PagedResult<EmployeeDto>(
            employees,
            totalCount,
            request.Page,
            request.PageSize
        );

        return Result.Success(result);
    }
}