using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Commands.DeleteEmployeeContract;

public class DeleteEmployeeContractCommandHandler : BaseHandler<DeleteEmployeeContractCommand, Result>
{
    public DeleteEmployeeContractCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteEmployeeContractCommand request, CancellationToken cancellationToken)
    {
        var contract = await Context.EmployeeContracts
            .Include(c => c.Employee)
            .FirstOrDefaultAsync(c => c.Id == request.Id && !c.IsDeleted, cancellationToken);

        if (contract == null)
            return Result.Failure("Contract not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(contract.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (contract.Status != ContractStatus.Draft)
            return Result.Failure("Only draft contracts can be deleted.");

        contract.IsDeleted = true;
        contract.ModifiedAtUtc = DateTime.UtcNow;
        contract.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
