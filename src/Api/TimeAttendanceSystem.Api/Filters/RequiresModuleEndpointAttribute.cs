using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Api.Filters;

/// <summary>
/// HTTP-layer entitlement filter. Used on controllers/actions that do not dispatch through MediatR
/// (and therefore cannot rely on <c>ModuleEntitlementBehavior</c>). Enforces the identical contract:
/// bypass for SystemAdmin, bypass when no tenant is resolved, otherwise check
/// <see cref="IEntitlementService.IsModuleEnabledAsync"/> and return 403 on failure.
/// </summary>
/// <remarks>
/// Combine with <see cref="AllowModuleReadOnlyAttribute"/> on safe (GET/HEAD) actions to permit
/// read-only historical access after a plan downgrade — mirrors the <c>AllowReadWhenDisabled</c>
/// flag used by the MediatR-side <c>[RequiresModule]</c>.
/// </remarks>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
public sealed class RequiresModuleEndpointAttribute : Attribute, IAsyncAuthorizationFilter
{
    public SystemModule Module { get; }
    public bool AllowReadWhenDisabled { get; init; }

    public RequiresModuleEndpointAttribute(SystemModule module)
    {
        Module = module;
    }

    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        var services = context.HttpContext.RequestServices;
        var currentUser = services.GetRequiredService<ICurrentUser>();

        if (currentUser.IsSystemAdmin)
            return;

        if (!currentUser.TenantId.HasValue)
            return;

        var entitlements = services.GetRequiredService<IEntitlementService>();
        var enabled = await entitlements.IsModuleEnabledAsync(
            currentUser.TenantId.Value, Module, context.HttpContext.RequestAborted);

        if (enabled)
            return;

        var allowReadOnly = AllowReadWhenDisabled
            || context.ActionDescriptor.EndpointMetadata.OfType<AllowModuleReadOnlyAttribute>().Any();

        if (allowReadOnly && IsSafeMethod(context.HttpContext.Request.Method))
            return;

        context.Result = new ObjectResult(new
        {
            statusCode = StatusCodes.Status403Forbidden,
            message = $"The '{Module}' module is not available in your current subscription plan.",
            traceId = context.HttpContext.TraceIdentifier
        })
        {
            StatusCode = StatusCodes.Status403Forbidden
        };
    }

    private static bool IsSafeMethod(string method) =>
        HttpMethods.IsGet(method) || HttpMethods.IsHead(method);
}

/// <summary>
/// Marker that, when present on an action, allows GET/HEAD requests to bypass module enforcement
/// even if the tenant's plan does not include the module. Intended for read-only access to historical
/// data after a plan downgrade. Has no effect on non-safe HTTP methods.
/// </summary>
[AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
public sealed class AllowModuleReadOnlyAttribute : Attribute { }
