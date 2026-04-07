using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Commands.ApproveEmployeeTransfer;

public class ApproveEmployeeTransferCommandHandler : BaseHandler<ApproveEmployeeTransferCommand, Result>
{
    public ApproveEmployeeTransferCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(ApproveEmployeeTransferCommand request, CancellationToken cancellationToken)
    {
        var transfer = await Context.EmployeeTransfers
            .Include(t => t.Employee)
            .FirstOrDefaultAsync(t => t.Id == request.Id && !t.IsDeleted, cancellationToken);

        if (transfer == null)
            return Result.Failure("Transfer not found.");

        if (transfer.Status != TransferStatus.Pending)
            return Result.Failure("Only pending transfers can be approved.");

        transfer.Status = TransferStatus.Approved;
        transfer.ApprovedByUserId = CurrentUser.UserId;
        transfer.ApprovedAt = DateTime.UtcNow;
        transfer.Notes = string.IsNullOrEmpty(request.Comments) ? transfer.Notes : request.Comments;
        transfer.ModifiedAtUtc = DateTime.UtcNow;
        transfer.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
