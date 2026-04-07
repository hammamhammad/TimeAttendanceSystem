using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.OnCallSchedules.Queries.Common;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetOnCallScheduleById;

public class GetOnCallScheduleByIdQueryHandler : BaseHandler<GetOnCallScheduleByIdQuery, Result<OnCallScheduleDto>>
{
    public GetOnCallScheduleByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<OnCallScheduleDto>> Handle(GetOnCallScheduleByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.OnCallSchedules
            .Include(o => o.Employee).ThenInclude(e => e.Branch)
            .Include(o => o.Employee).ThenInclude(e => e.Department)
            .Include(o => o.Shift)
            .Where(o => o.Id == request.Id && !o.IsDeleted);

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(o => CurrentUser.BranchIds.Contains(o.Employee.BranchId));

        var dto = await query
            .Select(o => new OnCallScheduleDto
            {
                Id = o.Id,
                EmployeeId = o.EmployeeId,
                EmployeeName = o.Employee.FirstName + " " + o.Employee.LastName,
                EmployeeNameAr = o.Employee.FirstNameAr != null && o.Employee.LastNameAr != null
                    ? o.Employee.FirstNameAr + " " + o.Employee.LastNameAr : null,
                EmployeeNumber = o.Employee.EmployeeNumber,
                BranchName = o.Employee.Branch.Name,
                DepartmentName = o.Employee.Department != null ? o.Employee.Department.Name : null,
                StartDate = o.StartDate,
                EndDate = o.EndDate,
                OnCallType = o.OnCallType,
                OnCallTypeName = o.OnCallType.ToString(),
                ShiftId = o.ShiftId,
                ShiftName = o.Shift != null ? o.Shift.Name : null,
                Notes = o.Notes,
                NotesAr = o.NotesAr,
                IsActive = o.IsActive,
                CreatedAtUtc = o.CreatedAtUtc
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<OnCallScheduleDto>("On-call schedule not found.");

        return Result.Success(dto);
    }
}
