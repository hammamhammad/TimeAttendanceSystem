using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Application.EmployeePromotions.Commands.CreateEmployeePromotion;

public class CreateEmployeePromotionCommandHandler : BaseHandler<CreateEmployeePromotionCommand, Result<long>>
{
    public CreateEmployeePromotionCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateEmployeePromotionCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .Include(e => e.JobGrade)
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        if (request.NewDepartmentId.HasValue)
        {
            var dept = await Context.Departments
                .FirstOrDefaultAsync(d => d.Id == request.NewDepartmentId.Value && !d.IsDeleted, cancellationToken);

            if (dept == null)
                return Result.Failure<long>("Target department not found.");
        }

        if (request.EffectiveDate.Date < DateTime.Today)
            return Result.Failure<long>("Effective date cannot be in the past.");

        // Check for existing pending promotion
        var hasPending = await Context.EmployeePromotions
            .AnyAsync(p => p.EmployeeId == request.EmployeeId
                        && p.Status == Domain.Common.PromotionStatus.Pending
                        && !p.IsDeleted, cancellationToken);

        if (hasPending)
            return Result.Failure<long>("Employee already has a pending promotion request.");

        // Capture current employee salary from latest EmployeeSalary record
        decimal? currentSalary = await Context.EmployeeSalaries
            .Where(s => s.EmployeeId == request.EmployeeId && s.IsCurrent && !s.IsDeleted)
            .Select(s => (decimal?)s.BaseSalary)
            .FirstOrDefaultAsync(cancellationToken);

        var promotion = new EmployeePromotion
        {
            EmployeeId = request.EmployeeId,
            OldJobTitle = employee.JobTitle,
            NewJobTitle = request.NewJobTitle,
            OldJobTitleAr = employee.JobTitleAr,
            NewJobTitleAr = request.NewJobTitleAr,
            OldGrade = employee.JobGrade?.Name,
            NewGrade = request.NewGrade,
            OldDepartmentId = employee.DepartmentId,
            NewDepartmentId = request.NewDepartmentId,
            OldBaseSalary = currentSalary,
            NewBaseSalary = request.NewBaseSalary,
            RequestDate = DateTime.UtcNow,
            EffectiveDate = request.EffectiveDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Notes = request.Notes,
            Status = Domain.Common.PromotionStatus.Pending,
            SubmittedByUserId = CurrentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.EmployeePromotions.Add(promotion);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(promotion.Id);
    }
}
