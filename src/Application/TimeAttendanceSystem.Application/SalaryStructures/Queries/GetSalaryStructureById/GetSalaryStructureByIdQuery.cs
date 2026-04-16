using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SalaryStructures.Queries.Common;

namespace TecAxle.Hrms.Application.SalaryStructures.Queries.GetSalaryStructureById;

public record GetSalaryStructureByIdQuery(long Id) : IRequest<Result<SalaryStructureDto>>;
