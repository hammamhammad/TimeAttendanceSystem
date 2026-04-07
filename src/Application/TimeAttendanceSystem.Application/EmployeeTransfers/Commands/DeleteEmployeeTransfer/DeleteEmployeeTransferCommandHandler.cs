using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.DeleteEmployeeTransfer;

public class DeleteEmployeeTransferCommandHandler : BaseHandler<DeleteEmployeeTransferCommand, Result>
{
    public DeleteEmployeeTransferCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(DeleteEmployeeTransferCommand request, CancellationToken cancellationToken)
    {
        var transfer = await Context.EmployeeTransfers
            .Include(t => t.Employee)
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (transfer == null)
            return Result.Failure("Transfer not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(transfer.Employee.BranchId))
            return Result.Failure("Access denied to this employee's branch.");

        if (transfer.Status != TransferStatus.Pending)
            return Result.Failure("Only pending transfers can be deleted.");

        transfer.IsDeleted = true;
        transfer.ModifiedAtUtc = DateTime.UtcNow;
        transfer.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
