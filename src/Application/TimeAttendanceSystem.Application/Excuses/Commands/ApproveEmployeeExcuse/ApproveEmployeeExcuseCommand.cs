using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Commands.ApproveEmployeeExcuse;

/// <summary>
/// CQRS command for approving or rejecting employee excuse requests.
/// Handles approval workflow with attendance integration and audit trail.
/// </summary>
/// <param name="ExcuseId">Excuse identifier for approval action</param>
/// <param name="ApproverId">User identifier performing the approval action</param>
/// <param name="Decision">Approval decision (Approved or Rejected)</param>
/// <param name="RejectionReason">Required reason if rejecting</param>
/// <param name="ProcessingNotes">Optional processing notes for the decision</param>
/// <remarks>
/// Command Processing:
/// - Validates excuse exists and is in pending status
/// - Validates approver has permission to approve excuses
/// - Updates excuse with approval decision and timestamp
/// - Records approver information for audit trail
/// - Updates attendance records if approved
/// - Ensures rejection reason is provided for denials
///
/// Business Rules Enforced:
/// - Only pending excuses can be approved/rejected
/// - Approver must have appropriate permissions
/// - Rejection reason is mandatory for rejections
/// - Approval automatically affects attendance calculations
/// - Official duties don't affect salary when approved
///
/// Integration Effects:
/// - Approved excuses update attendance status to Excused/OnDuty
/// - Rejected excuses remain as absence in attendance
/// - Audit trail maintained for compliance
/// - Notifications sent to employee about decision
/// </remarks>
public record ApproveEmployeeExcuseCommand(
    long ExcuseId,
    long ApproverId,
    ApprovalStatus Decision,
    string? RejectionReason = null,
    string? ProcessingNotes = null
) : IRequest<Result<bool>>;