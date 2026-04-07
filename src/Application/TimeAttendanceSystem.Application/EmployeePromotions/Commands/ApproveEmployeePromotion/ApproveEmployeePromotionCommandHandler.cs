using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.ApproveEmployeePromotion;

public class ApproveEmployeePromotionCommandHandler : BaseHandler<ApproveEmployeePromotionCommand, Result>
{
    public ApproveEmployeePromotionCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(ApproveEmployeePromotionCommand request, CancellationToken cancellationToken)
    {
        var promotion = await Context.EmployeePromotions
            .Include(p => p.Employee)
            .FirstOrDefaultAsync(p => p.Id == request.Id && !p.IsDeleted, cancellationToken);

        if (promotion == null)
            return Result.Failure("Promotion not found.");

        if (promotion.Status != PromotionStatus.Pending)
            return Result.Failure("Only pending promotions can be approved.");

        var employee = promotion.Employee;

        // Update promotion status
        promotion.Status = PromotionStatus.Approved;
        promotion.ApprovedByUserId = CurrentUser.UserId;
        promotion.ApprovedAt = DateTime.UtcNow;
        promotion.Notes = string.IsNullOrEmpty(request.Comments) ? promotion.Notes : request.Comments;
        promotion.ModifiedAtUtc = DateTime.UtcNow;
        promotion.ModifiedBy = CurrentUser.Username;

        // Update Employee entity
        employee.JobTitle = promotion.NewJobTitle;

        if (promotion.NewJobTitleAr != null)
            employee.JobTitleAr = promotion.NewJobTitleAr;

        if (promotion.NewDepartmentId.HasValue)
            employee.DepartmentId = promotion.NewDepartmentId;

        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        // Create SalaryAdjustment if salary changed
        if (promotion.NewBaseSalary.HasValue && promotion.OldBaseSalary.HasValue
            && promotion.NewBaseSalary.Value != promotion.OldBaseSalary.Value)
        {
            var adjustmentAmount = promotion.NewBaseSalary.Value - promotion.OldBaseSalary.Value;
            var percentageChange = promotion.OldBaseSalary.Value != 0
                ? (adjustmentAmount / promotion.OldBaseSalary.Value) * 100
                : 0;

            var salaryAdjustment = new SalaryAdjustment
            {
                EmployeeId = promotion.EmployeeId,
                AdjustmentType = SalaryAdjustmentType.PromotionIncrease,
                CurrentBaseSalary = promotion.OldBaseSalary.Value,
                CurrentTotalPackage = promotion.OldBaseSalary.Value,
                NewBaseSalary = promotion.NewBaseSalary.Value,
                AdjustmentAmount = adjustmentAmount,
                PercentageChange = percentageChange,
                EffectiveDate = promotion.EffectiveDate,
                Reason = $"Promotion: {promotion.OldJobTitle} -> {promotion.NewJobTitle}",
                Status = SalaryAdjustmentStatus.Approved,
                ApprovedByUserId = CurrentUser.UserId,
                ApprovedAt = DateTime.UtcNow,
                RelatedPromotionId = promotion.Id,
                SubmittedByUserId = CurrentUser.UserId,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "system"
            };

            Context.SalaryAdjustments.Add(salaryAdjustment);
        }

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
