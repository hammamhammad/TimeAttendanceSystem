using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Terminations.Queries.GetTerminationRecords;

public record GetTerminationRecordsQuery(
    long? BranchId = null,
    TerminationType? TerminationType = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
