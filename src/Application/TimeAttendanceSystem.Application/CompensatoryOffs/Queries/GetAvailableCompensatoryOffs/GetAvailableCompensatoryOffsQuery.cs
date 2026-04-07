using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetAvailableCompensatoryOffs;

[RequiresModule(SystemModule.LeaveManagement, AllowReadWhenDisabled = true)]
public record GetAvailableCompensatoryOffsQuery(long EmployeeId) : IRequest<Result<object>>;
