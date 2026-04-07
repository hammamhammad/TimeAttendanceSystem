using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeeContracts.Queries.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Queries.GetEmployeeContractById;

public class GetEmployeeContractByIdQueryHandler : BaseHandler<GetEmployeeContractByIdQuery, Result<EmployeeContractDto>>
{
    public GetEmployeeContractByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<EmployeeContractDto>> Handle(GetEmployeeContractByIdQuery request, CancellationToken cancellationToken)
    {
        var query = Context.EmployeeContracts
            .Include(c => c.Employee)
            .Where(c => c.Id == request.Id && !c.IsDeleted);

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            query = query.Where(c => CurrentUser.BranchIds.Contains(c.Employee.BranchId));
        }

        var contract = await query
            .Select(c => new EmployeeContractDto
            {
                Id = c.Id,
                EmployeeId = c.EmployeeId,
                EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                ContractNumber = c.ContractNumber,
                ContractType = c.ContractType,
                Status = c.Status,
                StartDate = c.StartDate,
                EndDate = c.EndDate,
                RenewalDate = c.RenewalDate,
                AutoRenew = c.AutoRenew,
                BasicSalary = c.BasicSalary,
                Currency = c.Currency,
                ProbationPeriodDays = c.ProbationPeriodDays,
                ProbationEndDate = c.ProbationEndDate,
                ProbationStatus = c.ProbationStatus,
                NoticePeriodDays = c.NoticePeriodDays,
                Terms = c.Terms,
                TermsAr = c.TermsAr,
                DocumentUrl = c.DocumentUrl,
                Notes = c.Notes,
                ApprovedByUserId = c.ApprovedByUserId,
                ApprovedAt = c.ApprovedAt,
                PreviousContractId = c.PreviousContractId,
                CreatedAtUtc = c.CreatedAtUtc
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (contract == null)
            return Result.Failure<EmployeeContractDto>("Contract not found.");

        return Result.Success(contract);
    }
}
