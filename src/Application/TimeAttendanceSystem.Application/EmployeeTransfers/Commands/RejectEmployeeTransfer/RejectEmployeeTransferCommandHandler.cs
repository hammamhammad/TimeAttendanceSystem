using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.RejectEmployeeTransfer;

public class RejectEmployeeTransferCommandHandler : BaseHandler<RejectEmployeeTransferCommand, Result>
{
    public RejectEmployeeTransferCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(RejectEmployeeTransferCommand request, CancellationToken cancellationToken)
    {
        var transfer = await Context.EmployeeTransfers
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (transfer == null)
            return Result.Failure("Transfer not found.");

        if (transfer.Status != TransferStatus.Pending)
            return Result.Failure("Only pending transfers can be rejected.");

        if (string.IsNullOrWhiteSpace(request.RejectionReason))
            return Result.Failure("Rejection reason is required.");

        transfer.Status = TransferStatus.Rejected;
        transfer.RejectionReason = request.RejectionReason;
        transfer.ApprovedByUserId = CurrentUser.UserId;
        transfer.ApprovedAt = DateTime.UtcNow;
        transfer.ModifiedAtUtc = DateTime.UtcNow;
        transfer.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
