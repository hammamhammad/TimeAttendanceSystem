using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.Terminations.Queries.GetTerminationRecords;

[RequiresModule(SystemModule.Offboarding, AllowReadWhenDisabled = true)]
public record GetTerminationRecordsQuery(
    long? BranchId = null,
    TerminationType? TerminationType = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
