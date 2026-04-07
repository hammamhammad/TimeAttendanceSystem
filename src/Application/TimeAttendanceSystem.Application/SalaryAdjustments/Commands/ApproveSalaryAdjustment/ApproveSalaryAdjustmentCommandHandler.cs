using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.ApproveSalaryAdjustment;

public class ApproveSalaryAdjustmentCommandHandler : BaseHandler<ApproveSalaryAdjustmentCommand, Result>
{
    public ApproveSalaryAdjustmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(ApproveSalaryAdjustmentCommand request, CancellationToken cancellationToken)
    {
        var entity = await Context.SalaryAdjustments
            .Include(s => s.Employee)
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (entity == null)
            return Result.Failure("Salary adjustment not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(entity.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (entity.Status != SalaryAdjustmentStatus.Pending)
            return Result.Failure("Only pending salary adjustments can be approved.");

        entity.Status = SalaryAdjustmentStatus.Approved;
        entity.ApprovedByUserId = CurrentUser.UserId;
        entity.ApprovedAt = DateTime.UtcNow;
        entity.ModifiedAtUtc = DateTime.UtcNow;
        entity.ModifiedBy = CurrentUser.Username;

        // If effective date is today or in the past, apply immediately
        if (entity.EffectiveDate.Date <= DateTime.UtcNow.Date)
        {
            // Mark existing current salary as no longer current
            var currentSalary = await Context.EmployeeSalaries
                .Where(s => s.EmployeeId == entity.EmployeeId && s.IsCurrent && !s.IsDeleted)
                .FirstOrDefaultAsync(cancellationToken);

            if (currentSalary != null)
            {
                currentSalary.IsCurrent = false;
                currentSalary.EndDate = entity.EffectiveDate.AddDays(-1);
                currentSalary.ModifiedAtUtc = DateTime.UtcNow;
                currentSalary.ModifiedBy = CurrentUser.Username;
            }

            // Create new current salary record
            var newSalary = new Domain.Payroll.EmployeeSalary
            {
                EmployeeId = entity.EmployeeId,
                SalaryStructureId = currentSalary?.SalaryStructureId ?? 1,
                BaseSalary = entity.NewBaseSalary,
                Currency = currentSalary?.Currency ?? "SAR",
                EffectiveDate = entity.EffectiveDate,
                Reason = $"Salary Adjustment #{entity.Id}: {entity.Reason}",
                ApprovedByUserId = CurrentUser.UserId,
                IsCurrent = true,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "system"
            };

            Context.EmployeeSalaries.Add(newSalary);

            entity.IsApplied = true;
            entity.AppliedAt = DateTime.UtcNow;
            entity.Status = SalaryAdjustmentStatus.Applied;
        }

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
