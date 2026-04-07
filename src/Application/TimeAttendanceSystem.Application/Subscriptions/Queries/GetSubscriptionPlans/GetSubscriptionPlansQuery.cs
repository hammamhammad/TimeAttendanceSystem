using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Subscriptions.Dtos;

namespace TecAxle.Hrms.Application.Subscriptions.Queries.GetSubscriptionPlans;

public record GetSubscriptionPlansQuery() : IRequest<Result<List<SubscriptionPlanDto>>>;
