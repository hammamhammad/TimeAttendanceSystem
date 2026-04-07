using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.OnCallSchedules.Queries.Common;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.GetOnCallSchedules;

public class GetOnCallSchedulesQueryHandler : BaseHandler<GetOnCallSchedulesQuery, Result<object>>
{
    public GetOnCallSchedulesQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetOnCallSchedulesQuery request, CancellationToken cancellationToken)
    {
        var query = Context.OnCallSchedules
            .Include(o => o.Employee).ThenInclude(e => e.Branch)
            .Include(o => o.Employee).ThenInclude(e => e.Department)
            .Include(o => o.Shift)
            .Where(o => !o.IsDeleted)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(o => CurrentUser.BranchIds.Contains(o.Employee.BranchId));

        if (request.BranchId.HasValue)
            query = query.Where(o => o.Employee.BranchId == request.BranchId.Value);

        if (request.EmployeeId.HasValue)
            query = query.Where(o => o.EmployeeId == request.EmployeeId.Value);

        if (request.OnCallType.HasValue)
            query = query.Where(o => o.OnCallType == request.OnCallType.Value);

        if (request.IsActive.HasValue)
            query = query.Where(o => o.IsActive == request.IsActive.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(o => o.StartDate)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
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

        return Result.Success<object>(new
        {
            items,
            totalCount,
            page = request.Page,
            pageSize = request.PageSize
        });
    }
}
