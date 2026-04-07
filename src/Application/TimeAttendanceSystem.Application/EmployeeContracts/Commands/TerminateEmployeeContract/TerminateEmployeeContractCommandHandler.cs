using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.TerminateEmployeeContract;

public class TerminateEmployeeContractCommandHandler : BaseHandler<TerminateEmployeeContractCommand, Result>
{
    public TerminateEmployeeContractCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(TerminateEmployeeContractCommand request, CancellationToken cancellationToken)
    {
        var contract = await Context.EmployeeContracts
            .Include(c => c.Employee)
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

        if (contract == null)
            return Result.Failure("Contract not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(contract.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (contract.Status != ContractStatus.Active)
            return Result.Failure("Only active contracts can be terminated.");

        contract.Status = ContractStatus.Terminated;
        contract.Notes = string.IsNullOrWhiteSpace(request.Reason)
            ? contract.Notes
            : $"{contract.Notes}\nTermination reason: {request.Reason}".Trim();
        contract.ModifiedAtUtc = DateTime.UtcNow;
        contract.ModifiedBy = CurrentUser.Username;

        // Clear employee's current contract type
        contract.Employee.CurrentContractType = null;
        contract.Employee.ModifiedAtUtc = DateTime.UtcNow;
        contract.Employee.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
