using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompensatoryOffs.Queries.Common;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetCompensatoryOffs;

public class GetCompensatoryOffsQueryHandler : BaseHandler<GetCompensatoryOffsQuery, Result<object>>
{
    public GetCompensatoryOffsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetCompensatoryOffsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.CompensatoryOffs
            .Include(c => c.Employee).ThenInclude(e => e.Branch)
            .Include(c => c.Employee).ThenInclude(e => e.Department)
            .Where(c => !c.IsDeleted)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(c => CurrentUser.BranchIds.Contains(c.Employee.BranchId));

        if (request.BranchId.HasValue)
            query = query.Where(c => c.Employee.BranchId == request.BranchId.Value);

        if (request.EmployeeId.HasValue)
            query = query.Where(c => c.EmployeeId == request.EmployeeId.Value);

        if (request.Status.HasValue)
            query = query.Where(c => c.Status == request.Status.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(c => c.EarnedDate)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(c => new CompensatoryOffDto
            {
                Id = c.Id,
                EmployeeId = c.EmployeeId,
                EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                EmployeeNameAr = c.Employee.FirstNameAr != null && c.Employee.LastNameAr != null
                    ? c.Employee.FirstNameAr + " " + c.Employee.LastNameAr : null,
                EmployeeNumber = c.Employee.EmployeeNumber,
                BranchName = c.Employee.Branch.Name,
                DepartmentName = c.Employee.Department != null ? c.Employee.Department.Name : null,
                EarnedDate = c.EarnedDate,
                ExpiryDate = c.ExpiryDate,
                Reason = c.Reason,
                ReasonAr = c.ReasonAr,
                Status = c.Status,
                StatusName = c.Status.ToString(),
                UsedVacationId = c.UsedVacationId,
                HoursWorked = c.HoursWorked,
                ApprovedByUserId = c.ApprovedByUserId,
                Notes = c.Notes,
                CreatedAtUtc = c.CreatedAtUtc
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
