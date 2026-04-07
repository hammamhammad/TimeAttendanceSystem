using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.LeaveEncashments.Queries.Common;

namespace TecAxle.Hrms.Application.LeaveEncashments.Queries.GetLeaveEncashments;

public class GetLeaveEncashmentsQueryHandler : BaseHandler<GetLeaveEncashmentsQuery, Result<object>>
{
    public GetLeaveEncashmentsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetLeaveEncashmentsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.LeaveEncashments
            .Include(le => le.Employee).ThenInclude(e => e.Branch)
            .Include(le => le.Employee).ThenInclude(e => e.Department)
            .Include(le => le.VacationType)
            .Where(le => !le.IsDeleted)
            .AsQueryable();

        // Branch scope
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(le => CurrentUser.BranchIds.Contains(le.Employee.BranchId));

        if (request.BranchId.HasValue)
            query = query.Where(le => le.Employee.BranchId == request.BranchId.Value);

        if (request.EmployeeId.HasValue)
            query = query.Where(le => le.EmployeeId == request.EmployeeId.Value);

        if (request.Year.HasValue)
            query = query.Where(le => le.Year == request.Year.Value);

        if (request.Status.HasValue)
            query = query.Where(le => le.Status == request.Status.Value);

        if (request.VacationTypeId.HasValue)
            query = query.Where(le => le.VacationTypeId == request.VacationTypeId.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(le => le.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
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
