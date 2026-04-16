using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Queries.GetAvailableCompensatoryOffs;

public record GetAvailableCompensatoryOffsQuery(long EmployeeId) : IRequest<Result<object>>;
