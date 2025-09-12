using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployeeById;

public class GetEmployeeByIdQueryHandler : BaseHandler<GetEmployeeByIdQuery, Result<EmployeeDetailDto>>
{
    public GetEmployeeByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<EmployeeDetailDto>> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .Include(e => e.Branch)
            .Include(e => e.Department)
            .Include(e => e.Manager)
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<EmployeeDetailDto>("Employee not found");
        }

        // Get linked user
        var userLink = await Context.EmployeeUserLinks
            .Include(eul => eul.User)
            .FirstOrDefaultAsync(eul => eul.EmployeeId == request.EmployeeId, cancellationToken);

        // Get direct reports
        var directReports = await Context.Employees
            .Where(e => e.ManagerEmployeeId == request.EmployeeId)
            .Select(e => new EmployeeDto
            {
                Id = e.Id,
                EmployeeNumber = e.EmployeeNumber,
                FullName = $"{e.FirstName} {e.LastName}",
                JobTitle = e.JobTitle
            })
            .ToListAsync(cancellationToken);

        var employeeDetail = new EmployeeDetailDto
        {
            Id = employee.Id,
            BranchId = employee.BranchId,
            BranchName = employee.Branch.Name,
            BranchCode = employee.Branch.Code,
            EmployeeNumber = employee.EmployeeNumber,
            FirstName = employee.FirstName,
            LastName = employee.LastName,
            FirstNameAr = employee.FirstNameAr,
            LastNameAr = employee.LastNameAr,
            NationalId = employee.NationalId,
            Email = employee.Email,
            Phone = employee.Phone,
            DateOfBirth = employee.DateOfBirth,
            Gender = employee.Gender,
            HireDate = employee.HireDate,
            EmploymentStatus = employee.EmploymentStatus,
            JobTitle = employee.JobTitle,
            JobTitleAr = employee.JobTitleAr,
            DepartmentId = employee.DepartmentId,
            DepartmentName = employee.Department?.Name,
            ManagerEmployeeId = employee.ManagerEmployeeId,
            ManagerName = employee.Manager != null ? $"{employee.Manager.FirstName} {employee.Manager.LastName}" : null,
            ManagerEmployeeNumber = employee.Manager?.EmployeeNumber,
            WorkLocationType = employee.WorkLocationType,
            PhotoUrl = employee.PhotoUrl,
            IsActive = !employee.IsDeleted,
            CreatedAtUtc = employee.CreatedAtUtc,
            ModifiedAtUtc = employee.ModifiedAtUtc,
            CreatedBy = employee.CreatedBy,
            ModifiedBy = employee.ModifiedBy,
            LinkedUser = userLink != null ? new LinkedUserDto
            {
                UserId = userLink.UserId,
                Username = userLink.User.Username,
                Email = userLink.User.Email,
                IsActive = userLink.User.IsActive
            } : null,
            DirectReports = directReports
        };

        return Result.Success(employeeDetail);
    }
}