using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.Common;

namespace TecAxle.Hrms.Application.PayrollPeriods.Queries.GetPayrollPeriodById;

public class GetPayrollPeriodByIdQueryHandler : BaseHandler<GetPayrollPeriodByIdQuery, Result<PayrollPeriodDto>>
{
    public GetPayrollPeriodByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PayrollPeriodDto>> Handle(GetPayrollPeriodByIdQuery request, CancellationToken cancellationToken)
    {
        var dto = await Context.PayrollPeriods
            .Where(p => p.Id == request.Id && !p.IsDeleted)
            .Select(p => new PayrollPeriodDto
            {
                Id = p.Id,
                BranchId = p.BranchId,
                BranchName = p.Branch.Name,
                Name = p.Name,
                NameAr = p.NameAr,
                PeriodType = (int)p.PeriodType,
                StartDate = p.StartDate,
                EndDate = p.EndDate,
                Status = (int)p.Status,
                TotalGross = p.TotalGross,
                TotalDeductions = p.TotalDeductions,
                TotalNet = p.TotalNet,
                EmployeeCount = p.EmployeeCount,
                ProcessedAt = p.ProcessedAt,
                ApprovedAt = p.ApprovedAt,
                Notes = p.Notes,
                CreatedAtUtc = p.CreatedAtUtc,
                LockedAtUtc = p.LockedAtUtc,
                LockedByUserId = p.LockedByUserId
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (dto == null)
            return Result.Failure<PayrollPeriodDto>("Payroll period not found.");

        return Result.Success(dto);
    }
}
