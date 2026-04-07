using System.Reflection;
using MediatR;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Application.Common.Behaviors;

/// <summary>
/// MediatR pipeline behavior that enforces module entitlement checks.
/// If the request class has [RequiresModule], verifies the current tenant's subscription includes that module.
/// </summary>
public class ModuleEntitlementBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly ICurrentUser _currentUser;
    private readonly IEntitlementService _entitlementService;

    public ModuleEntitlementBehavior(ICurrentUser currentUser, IEntitlementService entitlementService)
    {
        _currentUser = currentUser;
        _entitlementService = entitlementService;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var attribute = typeof(TRequest).GetCustomAttribute<RequiresModuleAttribute>();
        if (attribute == null)
            return await next(); // No module requirement, pass through

        // System admins bypass module checks
        if (_currentUser.IsSystemAdmin)
            return await next();

        var tenantId = _currentUser.TenantId;
        if (!tenantId.HasValue)
            return await next(); // No tenant context (e.g., unauthenticated), pass through

        var isEnabled = await _entitlementService.IsModuleEnabledAsync(tenantId.Value, attribute.Module, cancellationToken);
        if (isEnabled)
            return await next();

        // Module not enabled but read-only access is allowed (for queries accessing historical data)
        if (attribute.AllowReadWhenDisabled)
            return await next();

        // Module not enabled - return failure
        // Handle both Result and Result<T> response types
        var responseType = typeof(TResponse);

        if (responseType == typeof(Result))
        {
            return (TResponse)(object)Result.Failure($"The '{attribute.Module}' module is not available in your current subscription plan.");
        }

        if (responseType.IsGenericType && responseType.GetGenericTypeDefinition() == typeof(Result<>))
        {
            var failureMethod = responseType.GetMethod("Failure", BindingFlags.Public | BindingFlags.Static, null,
                new[] { typeof(string) }, null);

            if (failureMethod != null)
            {
                return (TResponse)failureMethod.Invoke(null, new object[]
                {
                    $"The '{attribute.Module}' module is not available in your current subscription plan."
                })!;
            }
        }

        throw new UnauthorizedAccessException($"The '{attribute.Module}' module is not available in your current subscription plan.");
    }
}
