using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.RemoteWork;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Features.RemoteWorkRequests.Commands.ApproveRemoteWorkRequest;

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
[RequiresModule(SystemModule.RemoteWork)]
[Obsolete("Use ApproveStepCommand via the workflow engine instead. This legacy path bypasses " +
          "the workflow engine and skips attendance updates when approving. Scheduled for removal in v14.")]
public record ApproveRemoteWorkRequestCommand(
    long RequestId,
    long ApproverId,
    RemoteWorkRequestStatus Decision,
    string? RejectionReason = null
) : IRequest<Result<bool>>;
