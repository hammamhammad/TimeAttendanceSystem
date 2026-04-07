using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.CreateEmployeeContract;

public class CreateEmployeeContractCommandHandler : BaseHandler<CreateEmployeeContractCommand, Result<long>>
{
    public CreateEmployeeContractCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateEmployeeContractCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        // Validate contract number uniqueness
        var exists = await Context.EmployeeContracts
            .AnyAsync(c => c.ContractNumber == request.ContractNumber && !c.IsDeleted, cancellationToken);

        if (exists)
            return Result.Failure<long>("Contract number already exists.");

        if (request.EndDate.HasValue && request.EndDate.Value <= request.StartDate)
            return Result.Failure<long>("End date must be after start date.");

        var contract = new EmployeeContract
        {
            EmployeeId = request.EmployeeId,
            ContractNumber = request.ContractNumber.Trim(),
            ContractType = request.ContractType,
            Status = ContractStatus.Draft,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            RenewalDate = request.RenewalDate,
            AutoRenew = request.AutoRenew,
            BasicSalary = request.BasicSalary,
            Currency = request.Currency ?? "SAR",
            ProbationPeriodDays = request.ProbationPeriodDays,
            ProbationEndDate = request.ProbationEndDate,
            ProbationStatus = request.ProbationStatus,
            NoticePeriodDays = request.NoticePeriodDays,
            Terms = request.Terms,
            TermsAr = request.TermsAr,
            DocumentUrl = request.DocumentUrl,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.EmployeeContracts.Add(contract);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(contract.Id);
    }
}
