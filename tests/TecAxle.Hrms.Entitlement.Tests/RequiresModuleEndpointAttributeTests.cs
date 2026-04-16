using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Entitlement.Tests;

/// <summary>
/// Tests the HTTP-layer module entitlement filter in isolation.
/// Mirrors the <c>ModuleEntitlementBehavior</c> contract for controllers that do not use MediatR.
/// </summary>
public class RequiresModuleEndpointAttributeTests
{
    private static AuthorizationFilterContext BuildContext(
        ICurrentUser currentUser,
        IEntitlementService entitlementService,
        string httpMethod,
        params object[] endpointMetadata)
    {
        var services = new ServiceCollection();
        services.AddSingleton(currentUser);
        services.AddSingleton(entitlementService);
        var provider = services.BuildServiceProvider();

        var httpContext = new DefaultHttpContext
        {
            RequestServices = provider
        };
        httpContext.Request.Method = httpMethod;

        var actionContext = new ActionContext
        {
            HttpContext = httpContext,
            RouteData = new RouteData(),
            ActionDescriptor = new ControllerActionDescriptor
            {
                EndpointMetadata = endpointMetadata.ToList()
            }
        };

        return new AuthorizationFilterContext(actionContext, new List<IFilterMetadata>());
    }

    private static Mock<ICurrentUser> MakeUser(bool isSystemAdmin, long? tenantId)
    {
        var mock = new Mock<ICurrentUser>();
        mock.SetupGet(x => x.IsSystemAdmin).Returns(isSystemAdmin);
        mock.SetupGet(x => x.TenantId).Returns(tenantId);
        return mock;
    }

    private static Mock<IEntitlementService> MakeEntitlements(bool moduleEnabled)
    {
        var mock = new Mock<IEntitlementService>();
        mock.Setup(x => x.IsModuleEnabledAsync(It.IsAny<long>(), It.IsAny<SystemModule>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(moduleEnabled);
        return mock;
    }

    // ---------- Success cases ----------

    [Fact]
    public async Task SystemAdmin_AlwaysBypasses_RegardlessOfModuleState()
    {
        var user = MakeUser(isSystemAdmin: true, tenantId: 1);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Recruitment);
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Post, attr);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeNull("SystemAdmin bypasses module enforcement");
        ent.Verify(x => x.IsModuleEnabledAsync(It.IsAny<long>(), It.IsAny<SystemModule>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task NoTenantResolved_Bypasses()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: null);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Payroll);
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Post, attr);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeNull("no tenant context means platform-admin / pre-auth — pass through");
        ent.Verify(x => x.IsModuleEnabledAsync(It.IsAny<long>(), It.IsAny<SystemModule>(), It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task ModuleEnabled_Passes()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: true);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Recruitment);
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Post, attr);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeNull();
        ent.Verify(x => x.IsModuleEnabledAsync(42, SystemModule.Recruitment, It.IsAny<CancellationToken>()), Times.Once);
    }

    // ---------- Blocked cases ----------

    [Fact]
    public async Task ModuleDisabled_WriteMethod_Returns403()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Recruitment);
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Post, attr);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeOfType<ObjectResult>();
        var result = (ObjectResult)ctx.Result!;
        result.StatusCode.Should().Be(StatusCodes.Status403Forbidden);
        result.Value.Should().NotBeNull();
        result.Value!.ToString().Should().Contain("Recruitment");
    }

    [Fact]
    public async Task ModuleDisabled_GetWithoutReadOnlyMarker_Returns403()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Performance);
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Get, attr);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeOfType<ObjectResult>();
        ((ObjectResult)ctx.Result!).StatusCode.Should().Be(StatusCodes.Status403Forbidden);
    }

    // ---------- Read-only semantics ----------

    [Fact]
    public async Task ModuleDisabled_GetWithReadOnlyMarker_Passes()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Recruitment);
        var readOnly = new AllowModuleReadOnlyAttribute();
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Get, attr, readOnly);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeNull("GET + [AllowModuleReadOnly] permits historical read access");
    }

    [Fact]
    public async Task ModuleDisabled_PostWithReadOnlyMarker_StillBlocked()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Recruitment);
        var readOnly = new AllowModuleReadOnlyAttribute();
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Post, attr, readOnly);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeOfType<ObjectResult>("the read-only marker must not permit writes");
        ((ObjectResult)ctx.Result!).StatusCode.Should().Be(StatusCodes.Status403Forbidden);
    }

    [Fact]
    public async Task ModuleDisabled_HeadWithReadOnlyMarker_Passes()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Payroll);
        var readOnly = new AllowModuleReadOnlyAttribute();
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Head, attr, readOnly);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeNull();
    }

    [Fact]
    public async Task ModuleDisabled_DeleteWithReadOnlyMarker_StillBlocked()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Recruitment);
        var readOnly = new AllowModuleReadOnlyAttribute();
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Delete, attr, readOnly);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeOfType<ObjectResult>();
        ((ObjectResult)ctx.Result!).StatusCode.Should().Be(StatusCodes.Status403Forbidden);
    }

    // ---------- AllowReadWhenDisabled property (alternative to marker attribute) ----------

    [Fact]
    public async Task ModuleDisabled_GetWithAllowReadWhenDisabledFlag_Passes()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Documents) { AllowReadWhenDisabled = true };
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Get, attr);

        await attr.OnAuthorizationAsync(ctx);

        ctx.Result.Should().BeNull();
    }

    // ---------- 403 body shape ----------

    [Fact]
    public async Task ForbiddenResponse_IncludesStatusCodeMessageAndTraceId()
    {
        var user = MakeUser(isSystemAdmin: false, tenantId: 42);
        var ent = MakeEntitlements(moduleEnabled: false);
        var attr = new RequiresModuleEndpointAttribute(SystemModule.Onboarding);
        var ctx = BuildContext(user.Object, ent.Object, HttpMethods.Post, attr);
        ctx.HttpContext.TraceIdentifier = "trace-xyz";

        await attr.OnAuthorizationAsync(ctx);

        var result = (ObjectResult)ctx.Result!;
        var payload = result.Value!;
        var type = payload.GetType();

        type.GetProperty("statusCode")!.GetValue(payload).Should().Be(StatusCodes.Status403Forbidden);
        type.GetProperty("message")!.GetValue(payload)!.ToString().Should().Contain("Onboarding");
        type.GetProperty("traceId")!.GetValue(payload).Should().Be("trace-xyz");
    }
}
