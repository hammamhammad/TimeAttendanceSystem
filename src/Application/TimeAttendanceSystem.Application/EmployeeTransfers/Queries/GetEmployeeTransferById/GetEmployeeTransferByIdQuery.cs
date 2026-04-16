using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeeTransfers.Queries.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Queries.GetEmployeeTransferById;

public record GetEmployeeTransferByIdQuery(long Id) : IRequest<Result<EmployeeTransferDto>>;
