using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Excuses;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Excuses.Commands.UpdateEmployeeExcuse;

[RequiresModule(SystemModule.LeaveManagement)]
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