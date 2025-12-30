using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.FingerprintRequests;

namespace TimeAttendanceSystem.Application.Features.Portal.FingerprintRequests.Commands;

/// <summary>
/// Command to create a new fingerprint request
/// </summary>
public record CreateFingerprintRequestCommand : IRequest<Result<long>>
{
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
/// Handler for CreateFingerprintRequestCommand
/// </summary>
public class CreateFingerprintRequestCommandHandler : IRequestHandler<CreateFingerprintRequestCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CreateFingerprintRequestCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<Result<long>> Handle(
        CreateFingerprintRequestCommand request,
        CancellationToken cancellationToken)
    {
        // Get current employee through EmployeeUserLink
        var employeeLink = await _context.EmployeeUserLinks
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == _currentUser.UserId, cancellationToken);

        if (employeeLink == null)
            return Result.Failure<long>("Employee not found for current user");

        var employee = employeeLink.Employee;

        // Check if employee already has an active fingerprint request
        var hasActiveRequest = await _context.FingerprintRequests
            .AnyAsync(fr => fr.EmployeeId == employee.Id &&
                           (fr.Status == FingerprintRequestStatus.Pending ||
                            fr.Status == FingerprintRequestStatus.Scheduled) &&
                           !fr.IsDeleted,
                     cancellationToken);

        if (hasActiveRequest)
            return Result.Failure<long>("You already have an active fingerprint request. Please wait for it to be processed.");

        // Parse request type
        if (!Enum.TryParse<FingerprintRequestType>(request.RequestType, true, out var requestType))
            return Result.Failure<long>("Invalid request type");

        // Validate preferred date is not in the past
        if (request.PreferredDate.HasValue && request.PreferredDate.Value.Date < DateTime.UtcNow.Date)
            return Result.Failure<long>("Preferred date cannot be in the past");

        // Create fingerprint request
        var fingerprintRequest = new FingerprintRequest
        {
            EmployeeId = employee.Id,
            RequestType = requestType,
            IssueDescription = request.IssueDescription,
            AffectedFingers = request.AffectedFingers,
            PreferredDate = request.PreferredDate,
            PreferredTime = request.PreferredTime,
            Status = FingerprintRequestStatus.Pending,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = _currentUser.Username ?? "SYSTEM"
        };

        _context.FingerprintRequests.Add(fingerprintRequest);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(fingerprintRequest.Id);
    }
}
