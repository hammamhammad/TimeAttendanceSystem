using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.CancelShiftSwapRequest;

public class CancelShiftSwapRequestCommandHandler : BaseHandler<CancelShiftSwapRequestCommand, Result>
{
    public CancelShiftSwapRequestCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(CancelShiftSwapRequestCommand request, CancellationToken cancellationToken)
    {
        if (!CurrentUser.IsAuthenticated || CurrentUser.UserId == null)
            return Result.Failure("User is not authenticated.");

        var swapRequest = await Context.ShiftSwapRequests
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (swapRequest == null)
            return Result.Failure("Shift swap request not found.");

        // Only allow cancellation when Pending or AcceptedByPeer
        if (swapRequest.Status != ShiftSwapStatus.Pending && swapRequest.Status != ShiftSwapStatus.AcceptedByPeer)
            return Result.Failure("Only pending or peer-accepted shift swap requests can be cancelled.");

        // Verify current user is the requestor
        var employeeLink = await Context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == CurrentUser.UserId, cancellationToken);

        if (employeeLink == null || employeeLink.EmployeeId != swapRequest.EmployeeId)
            return Result.Failure("Only the requestor can cancel this shift swap request.");

        swapRequest.Status = ShiftSwapStatus.Cancelled;
        swapRequest.ModifiedAtUtc = DateTime.UtcNow;
        swapRequest.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
