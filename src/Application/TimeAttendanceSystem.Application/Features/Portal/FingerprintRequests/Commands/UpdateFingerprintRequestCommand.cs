using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.FingerprintRequests;

namespace TimeAttendanceSystem.Application.Features.Portal.FingerprintRequests.Commands;

/// <summary>
/// Command to update a fingerprint request
/// </summary>
public record UpdateFingerprintRequestCommand : IRequest<Result>
{
    /// <summary>
    /// Request ID
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Type of request
    /// </summary>
    public string RequestType { get; set; } = string.Empty;

    /// <summary>
    /// Description of the issue
    /// </summary>
    public string IssueDescription { get; set; } = string.Empty;

    /// <summary>
    /// Affected fingers
    /// </summary>
    public string? AffectedFingers { get; set; }

    /// <summary>
    /// Preferred date for re-enrollment
    /// </summary>
    public DateTime? PreferredDate { get; set; }

    /// <summary>
    /// Preferred time for re-enrollment
    /// </summary>
    public TimeSpan? PreferredTime { get; set; }
}

/// <summary>
/// Handler for UpdateFingerprintRequestCommand
/// </summary>
public class UpdateFingerprintRequestCommandHandler : IRequestHandler<UpdateFingerprintRequestCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public UpdateFingerprintRequestCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<Result> Handle(
        UpdateFingerprintRequestCommand request,
        CancellationToken cancellationToken)
    {
        // Get current employee through EmployeeUserLink
        var employeeLink = await _context.EmployeeUserLinks
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId, cancellationToken);

        if (employeeLink == null)
            return Result.Failure("Employee not found for current user");

        var employee = employeeLink.Employee;

        // Get fingerprint request
        var fingerprintRequest = await _context.FingerprintRequests
            .FirstOrDefaultAsync(fr => fr.Id == request.Id && !fr.IsDeleted, cancellationToken);

        if (fingerprintRequest == null)
            return Result.Failure("Fingerprint request not found");

        // Check if user owns this request
        if (fingerprintRequest.EmployeeId != employee.Id && !_currentUser.IsSystemAdmin)
            return Result.Failure("You can only update your own fingerprint requests");

        // Check if request can be updated (only pending requests)
        if (fingerprintRequest.Status != FingerprintRequestStatus.Pending)
            return Result.Failure("Only pending fingerprint requests can be updated");

        // Parse request type
        if (!Enum.TryParse<FingerprintRequestType>(request.RequestType, true, out var requestType))
            return Result.Failure("Invalid request type");

        // Validate preferred date is not in the past
        if (request.PreferredDate.HasValue && request.PreferredDate.Value.Date < DateTime.UtcNow.Date)
            return Result.Failure("Preferred date cannot be in the past");

        // Update fingerprint request
        fingerprintRequest.RequestType = requestType;
        fingerprintRequest.IssueDescription = request.IssueDescription;
        fingerprintRequest.AffectedFingers = request.AffectedFingers;
        fingerprintRequest.PreferredDate = request.PreferredDate;
        fingerprintRequest.PreferredTime = request.PreferredTime;
        fingerprintRequest.ModifiedAtUtc = DateTime.UtcNow;
        fingerprintRequest.ModifiedBy = _currentUser.Username ?? "SYSTEM";

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
