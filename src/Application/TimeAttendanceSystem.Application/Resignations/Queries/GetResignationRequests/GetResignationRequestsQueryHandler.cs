using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Resignations.Queries.Common;

namespace TecAxle.Hrms.Application.Resignations.Queries.GetResignationRequests;

public class GetResignationRequestsQueryHandler : BaseHandler<GetResignationRequestsQuery, Result<object>>
{
    public GetResignationRequestsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetResignationRequestsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.ResignationRequests
            .Include(r => r.Employee).ThenInclude(e => e.Branch)
            .Include(r => r.Employee).ThenInclude(e => e.Department)
            .Where(r => !r.IsDeleted)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(r => CurrentUser.BranchIds.Contains(r.Employee.BranchId));

        if (request.EmployeeId.HasValue)
            query = query.Where(r => r.EmployeeId == request.EmployeeId.Value);

        if (request.BranchId.HasValue)
            query = query.Where(r => r.Employee.BranchId == request.BranchId.Value);

        if (request.Status.HasValue)
            query = query.Where(r => r.Status == request.Status.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(r => r.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(r => new ResignationRequestDto
            {
                Id = r.Id,
                EmployeeId = r.EmployeeId,
                EmployeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                EmployeeNameAr = r.Employee.FirstNameAr != null && r.Employee.LastNameAr != null
                    ? r.Employee.FirstNameAr + " " + r.Employee.LastNameAr : null,
                EmployeeNumber = r.Employee.EmployeeNumber,
                BranchName = r.Employee.Branch.Name,
                DepartmentName = r.Employee.Department != null ? r.Employee.Department.Name : null,
                ResignationDate = r.ResignationDate,
                LastWorkingDate = r.LastWorkingDate,
                NoticePeriodDays = r.NoticePeriodDays,
                WaivedNoticeDays = r.WaivedNoticeDays,
                Reason = r.Reason,
                ReasonAr = r.ReasonAr,
                Status = r.Status,
                RejectionReason = r.RejectionReason,
                ApprovedByUserId = r.ApprovedByUserId,
                ApprovedAt = r.ApprovedAt,
                Notes = r.Notes,
                SubmittedByUserId = r.SubmittedByUserId,
                CreatedAtUtc = r.CreatedAtUtc
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
