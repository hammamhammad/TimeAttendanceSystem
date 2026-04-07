using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.AttendanceCorrections.Commands.UpdateAttendanceCorrectionRequest;

/// <summary>
/// CQRS command for updating an existing attendance correction request.
/// Only pending requests can be updated.
/// </summary>
/// <param name="Id">Correction request identifier</param>
/// <param name="CorrectionDate">Date of the missed clock-in/clock-out</param>
/// <param name="CorrectionTime">Time of the missed clock-in/clock-out</param>
/// <param name="CorrectionType">Type of correction (CheckIn or CheckOut)</param>
/// <param name="Reason">Reason for the correction request</param>
/// <param name="AttachmentPath">Optional path to supporting documentation</param>
/// <remarks>
/// Command Processing:
/// - Validates request exists and is still pending
/// - Validates correction date is not in the future
/// - Updates request properties
/// - Maintains audit trail
///
/// Business Rules Enforced:
/// - Only pending requests can be updated
/// - Cannot change employee ID
/// - Correction date cannot be in the future
/// </remarks>
[RequiresModule(SystemModule.TimeAttendance)]
public record UpdateAttendanceCorrectionRequestCommand(
    long Id,
    DateTime CorrectionDate,
    TimeOnly CorrectionTime,
    AttendanceCorrectionType CorrectionType,
    string Reason,
    string? AttachmentPath = null
) : IRequest<Result<bool>>;
