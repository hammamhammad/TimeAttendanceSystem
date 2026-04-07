using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.CancelEmployeeTransfer;

public class CancelEmployeeTransferCommandHandler : BaseHandler<CancelEmployeeTransferCommand, Result>
{
    public CancelEmployeeTransferCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(CancelEmployeeTransferCommand request, CancellationToken cancellationToken)
    {
        var transfer = await Context.EmployeeTransfers
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (transfer == null)
            return Result.Failure("Transfer not found.");

        if (transfer.Status != TransferStatus.Pending)
            return Result.Failure("Only pending transfers can be cancelled.");

        transfer.Status = TransferStatus.Cancelled;
        transfer.ModifiedAtUtc = DateTime.UtcNow;
        transfer.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
