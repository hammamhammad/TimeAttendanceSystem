using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Subscriptions.Dtos;

namespace TecAxle.Hrms.Application.Subscriptions.Queries.GetSubscriptionPlanById;

public record GetSubscriptionPlanByIdQuery(long Id) : IRequest<Result<SubscriptionPlanDto>>;
