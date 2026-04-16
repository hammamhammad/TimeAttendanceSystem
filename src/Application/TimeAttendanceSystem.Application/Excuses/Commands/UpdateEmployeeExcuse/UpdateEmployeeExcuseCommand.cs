using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Excuses;

namespace TecAxle.Hrms.Application.Excuses.Commands.UpdateEmployeeExcuse;

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