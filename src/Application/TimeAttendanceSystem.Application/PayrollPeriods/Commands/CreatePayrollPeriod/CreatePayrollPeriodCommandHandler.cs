using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.PayrollPeriods.Commands.CreatePayrollPeriod;

public class CreatePayrollPeriodCommandHandler : BaseHandler<CreatePayrollPeriodCommand, Result<long>>
{
    public CreatePayrollPeriodCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreatePayrollPeriodCommand request, CancellationToken cancellationToken)
    {
        // Check for overlapping period in the same branch
        var overlap = await Context.PayrollPeriods
            .AnyAsync(p => p.BranchId == request.BranchId && !p.IsDeleted &&
                           p.Status != PayrollPeriodStatus.Cancelled &&
                           p.StartDate < request.EndDate && p.EndDate > request.StartDate,
                      cancellationToken);

        if (overlap)
            return Result.Failure<long>("An overlapping payroll period already exists for this branch.");

        var period = new PayrollPeriod
        {
            BranchId = request.BranchId,
            Name = request.Name.Trim(),
            NameAr = request.NameAr?.Trim(),
            PeriodType = (PayrollPeriodType)request.PeriodType,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            Status = PayrollPeriodStatus.Draft,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        Context.PayrollPeriods.Add(period);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(period.Id);
    }
}
