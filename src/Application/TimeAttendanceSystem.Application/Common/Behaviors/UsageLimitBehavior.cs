using System.Reflection;
using MediatR;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Application.Common.Behaviors;

/// <summary>
/// MediatR pipeline behavior that enforces usage limit checks.
/// If the request class has [RequiresLimit], verifies the tenant hasn't exceeded their plan limit.
/// </summary>
public class UsageLimitBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly ICurrentUser _currentUser;
    private readonly IEntitlementService _entitlementService;

    public UsageLimitBehavior(ICurrentUser currentUser, IEntitlementService entitlementService)
    {
        _currentUser = currentUser;
        _entitlementService = entitlementService;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var attribute = typeof(TRequest).GetCustomAttribute<RequiresLimitAttribute>();
        if (attribute == null)
            return await next();

        // System admins bypass limit checks
        if (_currentUser.IsSystemAdmin)
            return await next();

        var tenantId = _currentUser.TenantId;
        if (!tenantId.HasValue)
            return await next();

        var canAdd = await _entitlementService.CanAddMoreAsync(tenantId.Value, attribute.LimitType, 1, cancellationToken);
        if (canAdd)
            return await next();

        // Limit exceeded
        var limit = await _entitlementService.GetLimitAsync(tenantId.Value, attribute.LimitType, cancellationToken);
        var responseType = typeof(TResponse);

        var message = $"You have reached the maximum limit of {limit} for '{attribute.LimitType}' in your current subscription plan.";

        if (responseType == typeof(Result))
            return (TResponse)(object)Result.Failure(message);

        if (responseType.IsGenericType && responseType.GetGenericTypeDefinition() == typeof(Result<>))
        {
            var failureMethod = responseType.GetMethod("Failure", BindingFlags.Public | BindingFlags.Static, null,
                new[] { typeof(string) }, null);

            if (failureMethod != null)
                return (TResponse)failureMethod.Invoke(null, new object[] { message })!;
        }

        throw new UnauthorizedAccessException(message);
    }
}
