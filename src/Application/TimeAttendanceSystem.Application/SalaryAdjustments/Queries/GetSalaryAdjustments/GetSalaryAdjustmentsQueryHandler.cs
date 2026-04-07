using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SalaryAdjustments.Queries.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Queries.GetSalaryAdjustments;

public class GetSalaryAdjustmentsQueryHandler : BaseHandler<GetSalaryAdjustmentsQuery, Result<object>>
{
    public GetSalaryAdjustmentsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetSalaryAdjustmentsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.SalaryAdjustments
            .Include(s => s.Employee)
            .Where(s => !s.IsDeleted)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(s => CurrentUser.BranchIds.Contains(s.Employee.BranchId));

        if (request.EmployeeId.HasValue)
            query = query.Where(s => s.EmployeeId == request.EmployeeId.Value);

        if (request.Status.HasValue)
            query = query.Where(s => s.Status == request.Status.Value);

        if (request.AdjustmentType.HasValue)
            query = query.Where(s => s.AdjustmentType == request.AdjustmentType.Value);

        if (request.BranchId.HasValue)
            query = query.Where(s => s.Employee.BranchId == request.BranchId.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(s => s.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(s => new SalaryAdjustmentDto
            {
                Id = s.Id,
                EmployeeId = s.EmployeeId,
                EmployeeName = s.Employee.FirstName + " " + s.Employee.LastName,
                AdjustmentType = s.AdjustmentType,
                CurrentBaseSalary = s.CurrentBaseSalary,
                CurrentTotalPackage = s.CurrentTotalPackage,
                NewBaseSalary = s.NewBaseSalary,
                AdjustmentAmount = s.AdjustmentAmount,
                PercentageChange = s.PercentageChange,
                ComponentAdjustments = s.ComponentAdjustments,
                EffectiveDate = s.EffectiveDate,
                IsApplied = s.IsApplied,
                AppliedAt = s.AppliedAt,
                Reason = s.Reason,
                ReasonAr = s.ReasonAr,
                Justification = s.Justification,
                DocumentUrl = s.DocumentUrl,
                Status = s.Status,
                RejectionReason = s.RejectionReason,
                ApprovedByUserId = s.ApprovedByUserId,
                ApprovedAt = s.ApprovedAt,
                RelatedPromotionId = s.RelatedPromotionId,
                RelatedContractId = s.RelatedContractId,
                RelatedTransferId = s.RelatedTransferId,
                WorkflowInstanceId = s.WorkflowInstanceId,
                SubmittedByUserId = s.SubmittedByUserId,
                CreatedAtUtc = s.CreatedAtUtc
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
