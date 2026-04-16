using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.SalaryStructures.Queries.GetSalaryStructures;

public record GetSalaryStructuresQuery(
    long? BranchId = null,
    bool? IsActive = null,
    string? Search = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
