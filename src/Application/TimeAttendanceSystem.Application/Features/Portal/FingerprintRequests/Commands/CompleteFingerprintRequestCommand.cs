using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.FingerprintRequests;

namespace TimeAttendanceSystem.Application.Features.Portal.FingerprintRequests.Commands;

/// <summary>
/// Command to complete a fingerprint request (admin/technician only)
/// </summary>
public record CompleteFingerprintRequestCommand : IRequest<Result>
{
    /// <summary>
    /// Request ID
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Technician notes
    /// </summary>
    public string? TechnicianNotes { get; set; }
}

/// <summary>
/// Handler for CompleteFingerprintRequestCommand
/// </summary>
public class CompleteFingerprintRequestCommandHandler
    : BaseHandler<CompleteFingerprintRequestCommand, Result>
{
    public CompleteFingerprintRequestCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(
        CompleteFingerprintRequestCommand request,
        CancellationToken cancellationToken)
    {
        // Only admin/system admin can complete requests
        if (!CurrentUser.IsSystemAdmin)
            return Result.Failure("Only administrators can complete fingerprint requests");

        // Get fingerprint request
        var fingerprintRequest = await Context.FingerprintRequests
            .FirstOrDefaultAsync(fr => fr.Id == request.Id && !fr.IsDeleted, cancellationToken);

        if (fingerprintRequest == null)
            return Result.Failure("Fingerprint request not found");

        // Check if request can be completed
        if (fingerprintRequest.Status == FingerprintRequestStatus.Completed)
            return Result.Failure("Fingerprint request is already completed");

        if (fingerprintRequest.Status == FingerprintRequestStatus.Cancelled)
            return Result.Failure("Cannot complete a cancelled fingerprint request");

        // Complete the request
        fingerprintRequest.Status = FingerprintRequestStatus.Completed;
        fingerprintRequest.CompletedDate = DateTime.UtcNow;
        fingerprintRequest.TechnicianId = CurrentUser.UserId;
        fingerprintRequest.TechnicianNotes = request.TechnicianNotes;
        fingerprintRequest.ModifiedAtUtc = DateTime.UtcNow;
        fingerprintRequest.ModifiedBy = CurrentUser.Username ?? "SYSTEM";

        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
