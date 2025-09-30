using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Commands.UpdateEmployeeExcuse;

public record UpdateEmployeeExcuseCommand(
    long Id,
    DateTime ExcuseDate,
    ExcuseType ExcuseType,
    TimeOnly StartTime,
    TimeOnly EndTime,
    string Reason,
    ApprovalStatus ApprovalStatus,
    string? ReviewerComments = null,
    string? AttachmentPath = null
) : IRequest<Result<bool>>;