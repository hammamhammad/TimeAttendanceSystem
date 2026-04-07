using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.PartnerApproveShiftSwap;

public class PartnerApproveShiftSwapCommandHandler : BaseHandler<PartnerApproveShiftSwapCommand, Result>
{
    public PartnerApproveShiftSwapCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(PartnerApproveShiftSwapCommand request, CancellationToken cancellationToken)
    {
        if (!CurrentUser.IsAuthenticated || CurrentUser.UserId == null)
            return Result.Failure("User is not authenticated.");

        var swapRequest = await Context.ShiftSwapRequests
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (swapRequest == null)
            return Result.Failure("Shift swap request not found.");

        if (swapRequest.Status != ShiftSwapStatus.Pending)
            return Result.Failure("Only pending shift swap requests can be accepted by the partner.");

        // Verify current user is the swap partner
        var employeeLink = await Context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == CurrentUser.UserId, cancellationToken);

        if (employeeLink == null || employeeLink.EmployeeId != swapRequest.SwapWithEmployeeId)
            return Result.Failure("Only the swap partner can accept this request.");

        swapRequest.Status = ShiftSwapStatus.AcceptedByPeer;
        swapRequest.ModifiedAtUtc = DateTime.UtcNow;
        swapRequest.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
