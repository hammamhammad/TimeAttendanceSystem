using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeeTransfers.Queries.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Queries.GetEmployeeTransfers;

public class GetEmployeeTransfersQueryHandler : BaseHandler<GetEmployeeTransfersQuery, Result<object>>
{
    public GetEmployeeTransfersQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetEmployeeTransfersQuery request, CancellationToken cancellationToken)
    {
        var query = Context.EmployeeTransfers
            .Include(t => t.Employee)
            .Include(t => t.FromBranch)
            .Include(t => t.ToBranch)
            .Include(t => t.FromDepartment)
            .Include(t => t.ToDepartment)
            .Where(t => !t.IsDeleted)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            query = query.Where(t => CurrentUser.BranchIds.Contains(t.Employee.BranchId)
                                  || CurrentUser.BranchIds.Contains(t.ToBranchId));
        }

        if (request.EmployeeId.HasValue)
            query = query.Where(t => t.EmployeeId == request.EmployeeId.Value);

        if (request.BranchId.HasValue)
            query = query.Where(t => t.FromBranchId == request.BranchId.Value
                                  || t.ToBranchId == request.BranchId.Value);

        if (request.Status.HasValue)
            query = query.Where(t => t.Status == request.Status.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(t => t.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(t => new EmployeeTransferDto
            {
                Id = t.Id,
                EmployeeId = t.EmployeeId,
                EmployeeName = t.Employee.FirstName + " " + t.Employee.LastName,
                EmployeeNameAr = t.Employee.FirstNameAr != null && t.Employee.LastNameAr != null
                    ? t.Employee.FirstNameAr + " " + t.Employee.LastNameAr : null,
                EmployeeNumber = t.Employee.EmployeeNumber,
                FromBranchId = t.FromBranchId,
                FromBranchName = t.FromBranch.Name,
                ToBranchId = t.ToBranchId,
                ToBranchName = t.ToBranch.Name,
                FromDepartmentId = t.FromDepartmentId,
                FromDepartmentName = t.FromDepartment != null ? t.FromDepartment.Name : null,
                ToDepartmentId = t.ToDepartmentId,
                ToDepartmentName = t.ToDepartment != null ? t.ToDepartment.Name : null,
                FromJobTitle = t.FromJobTitle,
                ToJobTitle = t.ToJobTitle,
                FromJobTitleAr = t.FromJobTitleAr,
                ToJobTitleAr = t.ToJobTitleAr,
                RequestDate = t.RequestDate,
                EffectiveDate = t.EffectiveDate,
                Reason = t.Reason,
                ReasonAr = t.ReasonAr,
                Status = t.Status,
                RejectionReason = t.RejectionReason,
                ApprovedByUserId = t.ApprovedByUserId,
                ApprovedAt = t.ApprovedAt,
                CompletedAt = t.CompletedAt,
                Notes = t.Notes,
                SubmittedByUserId = t.SubmittedByUserId,
                CreatedAtUtc = t.CreatedAtUtc
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
