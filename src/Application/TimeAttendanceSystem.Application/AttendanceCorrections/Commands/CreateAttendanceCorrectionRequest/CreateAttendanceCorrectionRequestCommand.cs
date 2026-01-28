using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Commands.CreateAttendanceCorrectionRequest;

/// <summary>
/// CQRS command for creating a new attendance correction request.
/// Handles correction creation with validation and approval workflow management.
/// </summary>
/// <param name="EmployeeId">Employee identifier for correction assignment</param>
/// <param name="CorrectionDate">Date of the missed clock-in/clock-out</param>
/// <param name="CorrectionTime">Time of the missed clock-in/clock-out</param>
/// <param name="CorrectionType">Type of correction (CheckIn or CheckOut)</param>
/// <param name="Reason">Reason for the correction request</param>
/// <param name="AttachmentPath">Optional path to supporting documentation</param>
/// <param name="ProcessingNotes">Optional processing notes for approval workflow</param>
/// <param name="OnBehalfOfEmployeeId">Optional: When a manager submits on behalf of a team member</param>
/// <remarks>
/// Command Processing:
/// - Validates employee exists and is active
/// - Validates correction date is not too far in the past
/// - Checks for duplicate pending corrections for same date/type
/// - Creates correction request with Pending approval status
/// - Starts approval workflow
///
/// Business Rules Enforced:
/// - Correction date cannot be in the future
/// - Retroactive limits enforced (configurable days in the past)
/// - No duplicate pending corrections for same employee/date/type
/// - Reason is mandatory
///
/// On-Behalf-Of Feature:
/// - If OnBehalfOfEmployeeId is provided, the request is submitted by a manager
/// - Manager must be in the employee's management chain
/// - Manager's approval step is auto-approved if applicable
///
/// Approval Effects:
/// - Upon approval, creates AttendanceTransaction with IsManual=true
/// - Triggers attendance recalculation for the corrected date
/// </remarks>
public record CreateAttendanceCorrectionRequestCommand(
    long EmployeeId,
    DateTime CorrectionDate,
    TimeOnly CorrectionTime,
    AttendanceCorrectionType CorrectionType,
    string Reason,
    string? AttachmentPath = null,
    string? ProcessingNotes = null,
    long? OnBehalfOfEmployeeId = null
) : IRequest<Result<long>>;
