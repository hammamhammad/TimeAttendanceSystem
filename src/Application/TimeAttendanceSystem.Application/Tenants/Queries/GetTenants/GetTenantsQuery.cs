using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Tenants.Dtos;

namespace TecAxle.Hrms.Application.Tenants.Queries.GetTenants;

public record GetTenantsQuery(
    int Page = 1,
    int PageSize = 10,
    string? Search = null,
    string? Status = null,
    bool? IsActive = null
) : IRequest<Result<PagedResult<TenantDto>>>;
