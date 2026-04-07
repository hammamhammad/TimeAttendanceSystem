using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.PayrollPeriods.Queries.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.PayrollPeriods.Queries.GetPayrollPeriods;

public class GetPayrollPeriodsQueryHandler : BaseHandler<GetPayrollPeriodsQuery, Result<PagedResult<PayrollPeriodDto>>>
{
    public GetPayrollPeriodsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PagedResult<PayrollPeriodDto>>> Handle(GetPayrollPeriodsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.PayrollPeriods
            .Where(p => !p.IsDeleted)
            .AsQueryable();

        if (request.BranchId.HasValue)
            query = query.Where(p => p.BranchId == request.BranchId.Value);

        if (request.Status.HasValue)
            query = query.Where(p => p.Status == (PayrollPeriodStatus)request.Status.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(p => p.StartDate)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
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
                CreatedAtUtc = p.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        return Result.Success(new PagedResult<PayrollPeriodDto>(items, totalCount, request.Page, request.PageSize));
    }
}
