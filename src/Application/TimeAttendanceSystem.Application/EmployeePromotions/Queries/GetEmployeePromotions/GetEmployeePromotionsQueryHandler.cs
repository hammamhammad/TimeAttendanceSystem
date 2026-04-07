using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeePromotions.Queries.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Queries.GetEmployeePromotions;

public class GetEmployeePromotionsQueryHandler : BaseHandler<GetEmployeePromotionsQuery, Result<object>>
{
    public GetEmployeePromotionsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetEmployeePromotionsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.EmployeePromotions
            .Include(p => p.Employee)
            .Include(p => p.OldDepartment)
            .Include(p => p.NewDepartment)
            .Where(p => !p.IsDeleted)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            query = query.Where(p => CurrentUser.BranchIds.Contains(p.Employee.BranchId));
        }

        if (request.EmployeeId.HasValue)
            query = query.Where(p => p.EmployeeId == request.EmployeeId.Value);

        if (request.BranchId.HasValue)
            query = query.Where(p => p.Employee.BranchId == request.BranchId.Value);

        if (request.Status.HasValue)
            query = query.Where(p => p.Status == request.Status.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(p => p.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(p => new EmployeePromotionDto
            {
                Id = p.Id,
                EmployeeId = p.EmployeeId,
                EmployeeName = p.Employee.FirstName + " " + p.Employee.LastName,
                EmployeeNameAr = p.Employee.FirstNameAr != null && p.Employee.LastNameAr != null
                    ? p.Employee.FirstNameAr + " " + p.Employee.LastNameAr : null,
                EmployeeNumber = p.Employee.EmployeeNumber,
                OldJobTitle = p.OldJobTitle,
                NewJobTitle = p.NewJobTitle,
                OldJobTitleAr = p.OldJobTitleAr,
                NewJobTitleAr = p.NewJobTitleAr,
                OldGrade = p.OldGrade,
                NewGrade = p.NewGrade,
                OldDepartmentId = p.OldDepartmentId,
                OldDepartmentName = p.OldDepartment != null ? p.OldDepartment.Name : null,
                NewDepartmentId = p.NewDepartmentId,
                NewDepartmentName = p.NewDepartment != null ? p.NewDepartment.Name : null,
                OldBaseSalary = p.OldBaseSalary,
                NewBaseSalary = p.NewBaseSalary,
                RequestDate = p.RequestDate,
                EffectiveDate = p.EffectiveDate,
                Reason = p.Reason,
                ReasonAr = p.ReasonAr,
                Status = p.Status,
                RejectionReason = p.RejectionReason,
                ApprovedByUserId = p.ApprovedByUserId,
                ApprovedAt = p.ApprovedAt,
                Notes = p.Notes,
                SubmittedByUserId = p.SubmittedByUserId,
                CreatedAtUtc = p.CreatedAtUtc
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
