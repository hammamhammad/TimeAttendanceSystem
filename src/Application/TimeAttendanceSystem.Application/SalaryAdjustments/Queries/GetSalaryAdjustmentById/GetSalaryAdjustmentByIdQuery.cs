using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SalaryAdjustments.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Queries.GetSalaryAdjustmentById;

[RequiresModule(SystemModule.EmployeeLifecycle, AllowReadWhenDisabled = true)]
public record GetSalaryAdjustmentByIdQuery(long Id) : IRequest<Result<SalaryAdjustmentDto>>;
