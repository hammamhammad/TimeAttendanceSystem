using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.RenewEmployeeContract;

public class RenewEmployeeContractCommandHandler : BaseHandler<RenewEmployeeContractCommand, Result<long>>
{
    public RenewEmployeeContractCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(RenewEmployeeContractCommand request, CancellationToken cancellationToken)
    {
        var oldContract = await Context.EmployeeContracts
            .Include(c => c.Employee)
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

        if (oldContract == null)
            return Result.Failure<long>("Contract not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(oldContract.Employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        if (oldContract.Status != ContractStatus.Active && oldContract.Status != ContractStatus.Expired)
            return Result.Failure<long>("Only active or expired contracts can be renewed.");

        // Validate new contract number uniqueness
        var exists = await Context.EmployeeContracts
            .AnyAsync(c => c.ContractNumber == request.ContractNumber && !c.IsDeleted, cancellationToken);

        if (exists)
            return Result.Failure<long>("Contract number already exists.");

        if (request.EndDate.HasValue && request.EndDate.Value <= request.StartDate)
            return Result.Failure<long>("End date must be after start date.");

        // Mark old contract as Expired
        oldContract.Status = ContractStatus.Expired;
        oldContract.ModifiedAtUtc = DateTime.UtcNow;
        oldContract.ModifiedBy = CurrentUser.Username;

        // Create new contract linked to the previous one
        var newContract = new EmployeeContract
        {
            EmployeeId = oldContract.EmployeeId,
            ContractNumber = request.ContractNumber.Trim(),
            ContractType = request.ContractType ?? oldContract.ContractType,
            Status = ContractStatus.Draft,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            AutoRenew = oldContract.AutoRenew,
            BasicSalary = request.BasicSalary ?? oldContract.BasicSalary,
            Currency = oldContract.Currency,
            ProbationPeriodDays = oldContract.ProbationPeriodDays,
            ProbationStatus = ProbationStatus.NotApplicable,
            NoticePeriodDays = oldContract.NoticePeriodDays,
            Terms = oldContract.Terms,
            TermsAr = oldContract.TermsAr,
            Notes = request.Notes,
            PreviousContractId = oldContract.Id,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.EmployeeContracts.Add(newContract);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(newContract.Id);
    }
}
