using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.LeaveEncashments.Queries.Common;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.GetLeaveEncashmentById;

public class GetLeaveEncashmentByIdQueryHandler : BaseHandler<GetLeaveEncashmentByIdQuery, Result<LeaveEncashmentDto>>
{
    public GetLeaveEncashmentByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<LeaveEncashmentDto>> Handle(GetLeaveEncashmentByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.LeaveEncashments
            .Include(le => le.Employee).ThenInclude(e => e.Branch)
            .Include(le => le.Employee).ThenInclude(e => e.Department)
            .Include(le => le.VacationType)
            .Where(le => le.Id == request.Id && !le.IsDeleted);

        // Branch scope
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(le => CurrentUser.BranchIds.Contains(le.Employee.BranchId));

        var dto = await query
            .Select(le => new LeaveEncashmentDto
            {
                Id = le.Id,
                EmployeeId = le.EmployeeId,
                EmployeeName = le.Employee.FirstName + " " + le.Employee.LastName,
                EmployeeNameAr = le.Employee.FirstNameAr != null && le.Employee.LastNameAr != null
                    ? le.Employee.FirstNameAr + " " + le.Employee.LastNameAr : null,
                EmployeeNumber = le.Employee.EmployeeNumber,
                BranchName = le.Employee.Branch.Name,
                DepartmentName = le.Employee.Department != null ? le.Employee.Department.Name : null,
                VacationTypeId = le.VacationTypeId,
                VacationTypeName = le.VacationType.Name,
                VacationTypeNameAr = le.VacationType.NameAr,
                Year = le.Year,
                DaysEncashed = le.DaysEncashed,
                AmountPerDay = le.AmountPerDay,
                TotalAmount = le.TotalAmount,
                Status = le.Status,
                StatusName = le.Status.ToString(),
                PayrollRecordId = le.PayrollRecordId,
                ApprovedByUserId = le.ApprovedByUserId,
                Notes = le.Notes,
                CreatedAtUtc = le.CreatedAtUtc
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<LeaveEncashmentDto>("Leave encashment not found.");

        return Result.Success(dto);
    }
}
