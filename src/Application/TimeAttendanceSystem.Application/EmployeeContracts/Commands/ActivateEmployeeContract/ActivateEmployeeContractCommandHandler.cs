using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.ActivateEmployeeContract;

public class ActivateEmployeeContractCommandHandler : BaseHandler<ActivateEmployeeContractCommand, Result>
{
    public ActivateEmployeeContractCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(ActivateEmployeeContractCommand request, CancellationToken cancellationToken)
    {
        var contract = await Context.EmployeeContracts
            .Include(c => c.Employee)
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

        if (contract == null)
            return Result.Failure("Contract not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(contract.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (contract.Status != ContractStatus.Draft)
            return Result.Failure("Only draft contracts can be activated.");

        // Deactivate any existing active contract for this employee
        var activeContracts = await Context.EmployeeContracts
            .Where(c => c.EmployeeId == contract.EmployeeId
                     && c.Status == ContractStatus.Active
                     && c.Id != contract.Id
                     && !c.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var active in activeContracts)
        {
            active.Status = ContractStatus.Expired;
            active.ModifiedAtUtc = DateTime.UtcNow;
            active.ModifiedBy = CurrentUser.Username;
        }

        contract.Status = ContractStatus.Active;
        contract.ApprovedByUserId = CurrentUser.UserId;
        contract.ApprovedAt = DateTime.UtcNow;
        contract.ModifiedAtUtc = DateTime.UtcNow;
        contract.ModifiedBy = CurrentUser.Username;

        // Update employee's current contract type
        contract.Employee.CurrentContractType = contract.ContractType;
        contract.Employee.ModifiedAtUtc = DateTime.UtcNow;
        contract.Employee.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
