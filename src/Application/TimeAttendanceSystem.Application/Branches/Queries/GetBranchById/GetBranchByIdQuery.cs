using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Branches.Queries.GetBranches;

namespace TimeAttendanceSystem.Application.Branches.Queries.GetBranchById;

public record GetBranchByIdQuery(long Id) : IRequest<Result<BranchDto>>;
