using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SalaryAdjustments.Queries.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Queries.GetSalaryAdjustmentById;

public record GetSalaryAdjustmentByIdQuery(long Id) : IRequest<Result<SalaryAdjustmentDto>>;
