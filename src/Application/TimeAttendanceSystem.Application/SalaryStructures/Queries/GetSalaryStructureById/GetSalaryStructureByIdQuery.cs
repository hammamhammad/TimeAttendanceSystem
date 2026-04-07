using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SalaryStructures.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.SalaryStructures.Queries.GetSalaryStructureById;

[RequiresModule(SystemModule.Payroll, AllowReadWhenDisabled = true)]
public record GetSalaryStructureByIdQuery(long Id) : IRequest<Result<SalaryStructureDto>>;
