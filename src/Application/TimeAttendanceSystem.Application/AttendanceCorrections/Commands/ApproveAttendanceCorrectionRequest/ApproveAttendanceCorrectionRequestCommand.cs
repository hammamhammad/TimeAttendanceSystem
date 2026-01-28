using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Commands.ApproveAttendanceCorrectionRequest;

/// <summary>
/// CQRS command for approving or rejecting attendance correction requests.
/// Handles approval workflow with transaction creation and attendance recalculation.
/// </summary>
/// <param name="CorrectionRequestId">Correction request identifier for approval action</param>
/// <param name="ApproverId">User identifier performing the approval action</param>
/// <param name="Decision">Approval decision (Approved or Rejected)</param>
/// <param name="RejectionReason">Required reason if rejecting</param>
/// <param name="ProcessingNotes">Optional processing notes for the decision</param>
/// <remarks>
/// Command Processing:
/// - Validates correction request exists and is in pending status
/// - Validates approver has permission to approve requests
/// - Updates request with approval decision and timestamp
/// - Records approver information for audit trail
/// - Creates attendance transaction if approved
/// - Triggers attendance recalculation if approved
/// - Ensures rejection reason is provided for denials
///
/// Business Rules Enforced:
/// - Only pending requests can be approved/rejected
/// - Approver must have appropriate permissions
/// - Rejection reason is mandatory for rejections
/// - Approval creates a new attendance transaction
/// - Approval recalculates attendance for the corrected date
///
/// Approval Effects:
/// - Creates AttendanceTransaction with IsManual=true
/// - Transaction type matches correction type (CheckIn/CheckOut)
/// - Attendance record recalculated for the date
/// - Links created transaction to correction request
/// - Notifications sent to employee about decision
/// </remarks>
public record ApproveAttendanceCorrectionRequestCommand(
    long CorrectionRequestId,
    long ApproverId,
    ApprovalStatus Decision,
    string? RejectionReason = null,
    string? ProcessingNotes = null
) : IRequest<Result<bool>>;
