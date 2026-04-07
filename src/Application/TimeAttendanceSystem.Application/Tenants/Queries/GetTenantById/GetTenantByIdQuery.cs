using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Tenants.Dtos;

namespace TecAxle.Hrms.Application.Tenants.Queries.GetTenantById;

public record GetTenantByIdQuery(long Id) : IRequest<Result<TenantDetailDto>>;
