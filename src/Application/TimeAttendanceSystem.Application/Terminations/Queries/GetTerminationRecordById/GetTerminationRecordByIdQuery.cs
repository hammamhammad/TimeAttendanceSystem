using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Terminations.Queries.Common;

namespace TecAxle.Hrms.Application.Terminations.Queries.GetTerminationRecordById;

public record GetTerminationRecordByIdQuery(long Id) : IRequest<Result<TerminationRecordDto>>;
