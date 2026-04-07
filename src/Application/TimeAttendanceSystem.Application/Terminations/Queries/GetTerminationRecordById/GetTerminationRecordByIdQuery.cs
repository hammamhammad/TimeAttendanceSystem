using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Terminations.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Terminations.Queries.GetTerminationRecordById;

[RequiresModule(SystemModule.Offboarding, AllowReadWhenDisabled = true)]
public record GetTerminationRecordByIdQuery(long Id) : IRequest<Result<TerminationRecordDto>>;
