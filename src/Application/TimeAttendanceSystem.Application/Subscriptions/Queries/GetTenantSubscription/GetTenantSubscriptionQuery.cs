using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Subscriptions.Dtos;

namespace TecAxle.Hrms.Application.Subscriptions.Queries.GetTenantSubscription;

public record GetTenantSubscriptionQuery(long TenantId) : IRequest<Result<TenantSubscriptionDto>>;
