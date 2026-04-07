using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SalaryAdjustments.Queries.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Queries.GetSalaryAdjustmentById;

public class GetSalaryAdjustmentByIdQueryHandler : BaseHandler<GetSalaryAdjustmentByIdQuery, Result<SalaryAdjustmentDto>>
{
    public GetSalaryAdjustmentByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<SalaryAdjustmentDto>> Handle(GetSalaryAdjustmentByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.SalaryAdjustments
            .Include(s => s.Employee)
            .Where(s => s.Id == request.Id && !s.IsDeleted);

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(s => CurrentUser.BranchIds.Contains(s.Employee.BranchId));

        var dto = await query
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
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<SalaryAdjustmentDto>("Salary adjustment not found.");

        return Result.Success(dto);
    }
}
