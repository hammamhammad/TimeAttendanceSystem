using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.RemoteWork;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Commands.ApproveRemoteWorkRequest;

/// <summary>
/// CQRS command for approving or rejecting remote work requests.
/// Handles approval workflow with audit trail.
/// </summary>
/// <param name="RequestId">Remote work request identifier</param>
/// <param name="ApproverId">User identifier performing the approval action</param>
/// <param name="Decision">Approval decision (Approved or Rejected)</param>
/// <param name="RejectionReason">Required reason if rejecting</param>
/// <remarks>
/// Command Processing:
/// - Validates request exists and is in pending status
/// - Validates approver has permission to approve requests
/// - Updates request with approval decision and timestamp
/// - Records approver information for audit trail
/// - Ensures rejection reason is provided for denials
///
/// Business Rules Enforced:
/// - Only pending requests can be approved/rejected
/// - Approver must have appropriate permissions
/// - Rejection reason is mandatory for rejections
/// - Audit trail maintained for compliance
/// </remarks>
public record ApproveRemoteWorkRequestCommand(
    long RequestId,
    long ApproverId,
    RemoteWorkRequestStatus Decision,
    string? RejectionReason = null
) : IRequest<Result<bool>>;
