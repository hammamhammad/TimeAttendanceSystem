using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.UpdateEmployeeContract;

public class UpdateEmployeeContractCommandHandler : BaseHandler<UpdateEmployeeContractCommand, Result>
{
    public UpdateEmployeeContractCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(UpdateEmployeeContractCommand request, CancellationToken cancellationToken)
    {
        var contract = await Context.EmployeeContracts
            .Include(c => c.Employee)
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

        if (contract == null)
            return Result.Failure("Contract not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(contract.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (contract.Status != ContractStatus.Draft)
            return Result.Failure("Only draft contracts can be updated.");

        // Validate contract number uniqueness (excluding current)
        var exists = await Context.EmployeeContracts
            .AnyAsync(c => c.ContractNumber == request.ContractNumber && c.Id != request.Id && !c.IsDeleted, cancellationToken);

        if (exists)
            return Result.Failure("Contract number already exists.");

        if (request.EndDate.HasValue && request.EndDate.Value <= request.StartDate)
            return Result.Failure("End date must be after start date.");

        contract.ContractNumber = request.ContractNumber.Trim();
        contract.ContractType = request.ContractType;
        contract.StartDate = request.StartDate;
        contract.EndDate = request.EndDate;
        contract.RenewalDate = request.RenewalDate;
        contract.AutoRenew = request.AutoRenew;
        contract.BasicSalary = request.BasicSalary;
        contract.Currency = request.Currency ?? "SAR";
        contract.ProbationPeriodDays = request.ProbationPeriodDays;
        contract.ProbationEndDate = request.ProbationEndDate;
        contract.ProbationStatus = request.ProbationStatus;
        contract.NoticePeriodDays = request.NoticePeriodDays;
        contract.Terms = request.Terms;
        contract.TermsAr = request.TermsAr;
        contract.DocumentUrl = request.DocumentUrl;
        contract.Notes = request.Notes;
        contract.ModifiedAtUtc = DateTime.UtcNow;
        contract.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
