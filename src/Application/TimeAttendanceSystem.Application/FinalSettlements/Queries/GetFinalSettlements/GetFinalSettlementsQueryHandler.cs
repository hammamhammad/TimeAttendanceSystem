using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.FinalSettlements.Queries.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Queries.GetFinalSettlements;

public class GetFinalSettlementsQueryHandler : BaseHandler<GetFinalSettlementsQuery, Result<object>>
{
    public GetFinalSettlementsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetFinalSettlementsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.FinalSettlements
            .Include(f => f.Employee).ThenInclude(e => e.Branch)
            .Include(f => f.Employee).ThenInclude(e => e.Department)
            .Where(f => !f.IsDeleted)
            .AsQueryable();

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
            query = query.Where(f => CurrentUser.BranchIds.Contains(f.Employee.BranchId));

        if (request.BranchId.HasValue)
            query = query.Where(f => f.Employee.BranchId == request.BranchId.Value);

        if (request.Status.HasValue)
            query = query.Where(f => f.Status == request.Status.Value);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(f => f.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(f => new FinalSettlementDto
            {
                Id = f.Id,
                TerminationRecordId = f.TerminationRecordId,
                EmployeeId = f.EmployeeId,
                EmployeeName = f.Employee.FirstName + " " + f.Employee.LastName,
                EmployeeNameAr = f.Employee.FirstNameAr != null && f.Employee.LastNameAr != null
                    ? f.Employee.FirstNameAr + " " + f.Employee.LastNameAr : null,
                BasicSalaryDue = f.BasicSalaryDue,
                AllowancesDue = f.AllowancesDue,
                LeaveEncashmentAmount = f.LeaveEncashmentAmount,
                LeaveEncashmentDays = f.LeaveEncashmentDays,
                EndOfServiceAmount = f.EndOfServiceAmount,
                OvertimeDue = f.OvertimeDue,
                LoanOutstanding = f.LoanOutstanding,
                AdvanceOutstanding = f.AdvanceOutstanding,
                OtherDeductions = f.OtherDeductions,
                OtherAdditions = f.OtherAdditions,
                GrossSettlement = f.GrossSettlement,
                TotalDeductions = f.TotalDeductions,
                NetSettlement = f.NetSettlement,
                Status = f.Status,
                ApprovedByUserId = f.ApprovedByUserId,
                ApprovedAt = f.ApprovedAt,
                PaidAt = f.PaidAt,
                CalculationDetails = f.CalculationDetails,
                Notes = f.Notes,
                CreatedAtUtc = f.CreatedAtUtc
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
