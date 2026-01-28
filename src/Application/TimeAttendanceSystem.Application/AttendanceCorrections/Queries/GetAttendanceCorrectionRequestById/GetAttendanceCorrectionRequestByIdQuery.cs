using MediatR;
using TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequests;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequestById;

/// <summary>
/// CQRS query for retrieving a single attendance correction request by ID.
/// </summary>
/// <param name="Id">The correction request identifier</param>
public record GetAttendanceCorrectionRequestByIdQuery(long Id) : IRequest<Result<AttendanceCorrectionRequestDto?>>;
