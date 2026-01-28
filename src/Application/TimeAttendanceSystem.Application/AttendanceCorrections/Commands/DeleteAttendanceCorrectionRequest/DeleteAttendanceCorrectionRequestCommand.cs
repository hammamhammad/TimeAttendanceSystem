using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Commands.DeleteAttendanceCorrectionRequest;

/// <summary>
/// CQRS command for deleting (soft delete) an attendance correction request.
/// Only pending requests can be deleted by the requester.
/// Approved requests that have created transactions require special handling.
/// </summary>
/// <param name="Id">Correction request identifier to delete</param>
/// <remarks>
/// Command Processing:
/// - Validates request exists
/// - For pending requests: soft delete
/// - For approved requests: soft delete and revert created transaction
/// - Recalculates attendance after deletion if transaction was created
///
/// Business Rules:
/// - Pending requests can be cancelled/deleted by owner
/// - Approved requests deletion requires recalculation
/// - Rejected requests cannot be modified
/// </remarks>
public record DeleteAttendanceCorrectionRequestCommand(long Id) : IRequest<Result<bool>>;
