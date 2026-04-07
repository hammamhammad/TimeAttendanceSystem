using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.OnCallSchedules.Queries.Common;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetCurrentOnCallSchedule;

public class GetCurrentOnCallScheduleQueryHandler : BaseHandler<GetCurrentOnCallScheduleQuery, Result<object>>
{
    public GetCurrentOnCallScheduleQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetCurrentOnCallScheduleQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;

        var query = Context.OnCallSchedules
            .Include(o => o.Employee).ThenInclude(e => e.Branch)
            .Include(o => o.Employee).ThenInclude(e => e.Department)
            .Include(o => o.Shift)
            .Where(o => !o.IsDeleted && o.IsActive && o.StartDate <= now && o.EndDate >= now)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(o => CurrentUser.BranchIds.Contains(o.Employee.BranchId));

        if (request.BranchId.HasValue)
            query = query.Where(o => o.Employee.BranchId == request.BranchId.Value);

        var items = await query
            .OrderBy(o => o.OnCallType)
            .ThenBy(o => o.Employee.FirstName)
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
            .ToListAsync(cancellationToken);

        return Result.Success<object>(new { items });
    }
}
