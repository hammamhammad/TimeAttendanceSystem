using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Branches.Queries.GetBranches;

namespace TecAxle.Hrms.Application.Branches.Queries.GetBranchById;

public record GetBranchByIdQuery(long Id) : IRequest<Result<BranchDto>>;
