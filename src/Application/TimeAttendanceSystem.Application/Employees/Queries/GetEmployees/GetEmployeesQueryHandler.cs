using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Shifts;

namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployees;

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
            query = query.Where(e => !e.IsDeleted == request.IsActive.Value);
        }

        if (!string.IsNullOrEmpty(request.EmploymentStatus) && 
            Enum.TryParse<EmploymentStatus>(request.EmploymentStatus, true, out var status))
        {
            query = query.Where(e => e.EmploymentStatus == status);
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination
        var employees = await query
            .OrderBy(e => e.LastName)
            .ThenBy(e => e.FirstName)
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
                CurrentShiftId = Context.ShiftAssignments
                    .Where(sa => sa.EmployeeId == e.Id &&
                                sa.AssignmentType == ShiftAssignmentType.Employee &&
                                sa.Status == ShiftAssignmentStatus.Active &&
                                sa.EffectiveDate <= DateTime.UtcNow &&
                                (sa.EndDate == null || sa.EndDate >= DateTime.UtcNow))
                    .OrderByDescending(sa => sa.Priority)
                    .ThenByDescending(sa => sa.EffectiveDate)
                    .Select(sa => sa.ShiftId)
                    .FirstOrDefault(),
                CurrentShiftName = Context.ShiftAssignments
                    .Where(sa => sa.EmployeeId == e.Id &&
                                sa.AssignmentType == ShiftAssignmentType.Employee &&
                                sa.Status == ShiftAssignmentStatus.Active &&
                                sa.EffectiveDate <= DateTime.UtcNow &&
                                (sa.EndDate == null || sa.EndDate >= DateTime.UtcNow))
                    .OrderByDescending(sa => sa.Priority)
                    .ThenByDescending(sa => sa.EffectiveDate)
                    .Join(Context.Shifts, sa => sa.ShiftId, s => s.Id, (sa, s) => s.Name)
                    .FirstOrDefault(),
                IsActive = !e.IsDeleted,
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