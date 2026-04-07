using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Queries.GetSalaryAdjustments;

[RequiresModule(SystemModule.EmployeeLifecycle, AllowReadWhenDisabled = true)]
public record GetSalaryAdjustmentsQuery(
    long? EmployeeId = null,
    SalaryAdjustmentStatus? Status = null,
    SalaryAdjustmentType? AdjustmentType = null,
    long? BranchId = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
