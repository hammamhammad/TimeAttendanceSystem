using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeePromotions.Queries.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Queries.GetEmployeePromotionById;

public class GetEmployeePromotionByIdQueryHandler : BaseHandler<GetEmployeePromotionByIdQuery, Result<EmployeePromotionDto>>
{
    public GetEmployeePromotionByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<EmployeePromotionDto>> Handle(GetEmployeePromotionByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.EmployeePromotions
            .Include(p => p.Employee)
            .Include(p => p.OldDepartment)
            .Include(p => p.NewDepartment)
            .Where(p => p.Id == request.Id && !p.IsDeleted);

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            query = query.Where(p => CurrentUser.BranchIds.Contains(p.Employee.BranchId));
        }

        var promotion = await query
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
            .FirstOrDefaultAsync(cancellationToken);

        if (promotion == null)
            return Result.Failure<EmployeePromotionDto>("Promotion not found.");

        return Result.Success(promotion);
    }
}
