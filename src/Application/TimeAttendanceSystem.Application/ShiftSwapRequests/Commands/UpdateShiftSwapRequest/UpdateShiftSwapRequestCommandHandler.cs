using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.UpdateShiftSwapRequest;

public class UpdateShiftSwapRequestCommandHandler : BaseHandler<UpdateShiftSwapRequestCommand, Result>
{
    public UpdateShiftSwapRequestCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result> Handle(UpdateShiftSwapRequestCommand request, CancellationToken cancellationToken)
    {
        if (!CurrentUser.IsAuthenticated || CurrentUser.UserId == null)
            return Result.Failure("User is not authenticated.");

        var swapRequest = await Context.ShiftSwapRequests
            .FirstOrDefaultAsync(s => s.Id == request.Id && !s.IsDeleted, cancellationToken);

        if (swapRequest == null)
            return Result.Failure("Shift swap request not found.");

        // Only allow update when status is Pending
        if (swapRequest.Status != ShiftSwapStatus.Pending)
            return Result.Failure("Only pending shift swap requests can be updated.");

        // Verify current user is the requestor
        var employeeLink = await Context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == CurrentUser.UserId, cancellationToken);

        if (employeeLink == null || employeeLink.EmployeeId != swapRequest.EmployeeId)
            return Result.Failure("Only the requestor can update this shift swap request.");

        swapRequest.SwapDate = request.SwapDate;
        swapRequest.Reason = request.Reason;
        swapRequest.ReasonAr = request.ReasonAr;
        swapRequest.ModifiedAtUtc = DateTime.UtcNow;
        swapRequest.ModifiedBy = CurrentUser.Username;

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
