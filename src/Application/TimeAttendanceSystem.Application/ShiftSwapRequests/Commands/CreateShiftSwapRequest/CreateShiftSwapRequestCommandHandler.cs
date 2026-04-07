using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.CreateShiftSwapRequest;

public class CreateShiftSwapRequestCommandHandler : BaseHandler<CreateShiftSwapRequestCommand, Result<long>>
{
    public CreateShiftSwapRequestCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateShiftSwapRequestCommand request, CancellationToken cancellationToken)
    {
        if (!CurrentUser.IsAuthenticated || CurrentUser.UserId == null)
            return Result.Failure<long>("User is not authenticated.");

        // Resolve current user's employee ID via EmployeeUserLink
        var employeeLink = await Context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == CurrentUser.UserId, cancellationToken);

        if (employeeLink == null)
            return Result.Failure<long>("No employee record linked to the current user.");

        var employeeId = employeeLink.EmployeeId;

        if (employeeId == request.SwapWithEmployeeId)
            return Result.Failure<long>("Cannot create a swap request with yourself.");

        // Validate requesting employee exists
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == employeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        // Validate swap partner exists
        var swapPartner = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.SwapWithEmployeeId && !e.IsDeleted, cancellationToken);

        if (swapPartner == null)
            return Result.Failure<long>("Swap partner employee not found.");

        // Check for duplicate pending swap requests between these employees on the same dates
        var duplicateExists = await Context.ShiftSwapRequests
            .AnyAsync(s => !s.IsDeleted
                && s.EmployeeId == employeeId
                && s.SwapWithEmployeeId == request.SwapWithEmployeeId
                && s.OriginalDate == request.OriginalDate
                && s.SwapDate == request.SwapDate
                && (s.Status == ShiftSwapStatus.Pending || s.Status == ShiftSwapStatus.AcceptedByPeer),
                cancellationToken);

        if (duplicateExists)
            return Result.Failure<long>("A pending or accepted swap request already exists for these employees and dates.");

        var swapRequest = new ShiftSwapRequest
        {
            EmployeeId = employeeId,
            SwapWithEmployeeId = request.SwapWithEmployeeId,
            OriginalDate = request.OriginalDate,
            SwapDate = request.SwapDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Status = ShiftSwapStatus.Pending,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.ShiftSwapRequests.Add(swapRequest);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(swapRequest.Id);
    }
}
