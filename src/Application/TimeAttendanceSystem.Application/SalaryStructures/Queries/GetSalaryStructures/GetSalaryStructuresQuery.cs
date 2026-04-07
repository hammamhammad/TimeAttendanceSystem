using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryStructures.Queries.GetSalaryStructures;

[RequiresModule(SystemModule.Payroll, AllowReadWhenDisabled = true)]
public record GetSalaryStructuresQuery(
    long? BranchId = null,
    bool? IsActive = null,
    string? Search = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
