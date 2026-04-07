using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.FinalSettlements.Queries.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Queries.GetFinalSettlementByTermination;

public class GetFinalSettlementByTerminationQueryHandler : BaseHandler<GetFinalSettlementByTerminationQuery, Result<FinalSettlementDto>>
{
    public GetFinalSettlementByTerminationQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<FinalSettlementDto>> Handle(GetFinalSettlementByTerminationQuery request, CancellationToken cancellationToken)
    {
        var settlement = await Context.FinalSettlements
            .Include(f => f.Employee)
            .Where(f => f.TerminationRecordId == request.TerminationId && !f.IsDeleted)
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
            .FirstOrDefaultAsync(cancellationToken);

        if (settlement == null)
            return Result.Failure<FinalSettlementDto>("Final settlement not found.");

        return Result.Success(settlement);
    }
}
