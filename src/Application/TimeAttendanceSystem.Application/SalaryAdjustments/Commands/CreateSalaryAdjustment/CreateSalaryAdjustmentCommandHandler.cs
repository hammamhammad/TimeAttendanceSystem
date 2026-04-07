using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Commands.CreateSalaryAdjustment;

public class CreateSalaryAdjustmentCommandHandler : BaseHandler<CreateSalaryAdjustmentCommand, Result<long>>
{
    public CreateSalaryAdjustmentCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateSalaryAdjustmentCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        // Get current salary from EmployeeSalaries
        var currentSalary = await Context.EmployeeSalaries
            .Where(s => s.EmployeeId == request.EmployeeId && s.IsCurrent && !s.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        var currentBaseSalary = currentSalary?.BaseSalary ?? 0m;
        var adjustmentAmount = request.NewBaseSalary - currentBaseSalary;
        var percentageChange = currentBaseSalary > 0
            ? Math.Round((adjustmentAmount / currentBaseSalary) * 100, 2)
            : 0m;

        var entity = new SalaryAdjustment
        {
            EmployeeId = request.EmployeeId,
            AdjustmentType = request.AdjustmentType,
            CurrentBaseSalary = currentBaseSalary,
            CurrentTotalPackage = currentBaseSalary, // Total package = base when no components loaded
            NewBaseSalary = request.NewBaseSalary,
            AdjustmentAmount = adjustmentAmount,
            PercentageChange = percentageChange,
            EffectiveDate = request.EffectiveDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Justification = request.Justification,
            DocumentUrl = request.DocumentUrl,
            Status = SalaryAdjustmentStatus.Draft,
            SubmittedByUserId = CurrentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.SalaryAdjustments.Add(entity);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(entity.Id);
    }
}
