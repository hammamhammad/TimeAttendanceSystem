using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeeContracts.Queries.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Queries.GetEmployeeContracts;

public class GetEmployeeContractsQueryHandler : BaseHandler<GetEmployeeContractsQuery, Result<object>>
{
    public GetEmployeeContractsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<object>> Handle(GetEmployeeContractsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.EmployeeContracts
            .Include(c => c.Employee)
            .Where(c => !c.IsDeleted)
            .AsQueryable();

        // Branch access restriction
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            query = query.Where(c => CurrentUser.BranchIds.Contains(c.Employee.BranchId));
        }

        if (request.EmployeeId.HasValue)
            query = query.Where(c => c.EmployeeId == request.EmployeeId.Value);

        if (request.BranchId.HasValue)
            query = query.Where(c => c.Employee.BranchId == request.BranchId.Value);

        if (request.Status.HasValue)
            query = query.Where(c => c.Status == request.Status.Value);

        if (request.ExpiringWithinDays.HasValue)
        {
            var cutoff = DateTime.UtcNow.AddDays(request.ExpiringWithinDays.Value);
            query = query.Where(c => c.Status == ContractStatus.Active
                                  && c.EndDate.HasValue
                                  && c.EndDate.Value <= cutoff);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(c => c.CreatedAtUtc)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
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
