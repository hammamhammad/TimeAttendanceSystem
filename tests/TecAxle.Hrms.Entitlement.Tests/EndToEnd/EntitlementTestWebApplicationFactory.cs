using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Entitlement.Tests.EndToEnd;

/// <summary>
/// Boots the real <c>TecAxle.Hrms.Api</c> app with the ASP.NET Core pipeline fully in place
/// (middleware, authentication, authorization, filters), but replaces two dependencies:
///
/// <list type="bullet">
///   <item><see cref="IEntitlementService"/> → <see cref="FakeEntitlementService"/> — tests control which modules a tenant has.</item>
///   <item>Default JWT auth scheme → <see cref="TestAuthHandler"/> — tests impersonate users via HTTP headers.</item>
/// </list>
///
/// The real <c>MasterDbContext</c> migration at startup is wrapped in try/catch in <c>Program.cs</c> and is
/// harmless when PostgreSQL is unreachable — the app still boots. 403 responses short-circuit before any
/// tenant <c>DbContext</c> access, so no real database is required for these tests.
/// </summary>
public class EntitlementTestWebApplicationFactory : WebApplicationFactory<Program>
{
    public FakeEntitlementService Entitlements { get; } = new();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        // Use Development so GlobalExceptionHandlerMiddleware surfaces the underlying exception
        // in the response body, which the E2E tests check when an assertion needs diagnostics.
        builder.UseEnvironment("Development");

        builder.ConfigureTestServices(services =>
        {
            // Replace the production entitlement service with the in-memory fake.
            services.RemoveAll<IEntitlementService>();
            services.AddSingleton<IEntitlementService>(Entitlements);

            // Replace the tenant connection resolver with a stub that returns a dummy connection
            // string. TecAxleDbContext is resolved per-request by the DI container (e.g. during
            // construction of the globally-registered AuditActionFilter) even if the controller
            // action never runs. We don't want that resolution to hit the real master database.
            // The returned connection string is never actually connected to: entitlement 403s
            // short-circuit before any query executes.
            services.RemoveAll<ITenantConnectionResolver>();
            services.AddSingleton<ITenantConnectionResolver, StubTenantConnectionResolver>();

            // Replace the default auth scheme with a deterministic header-driven handler.
            // Reconfigure AuthenticationOptions so challenges/forbids go through our scheme.
            services.AddAuthentication(opts =>
            {
                opts.DefaultAuthenticateScheme = TestAuthHandler.SchemeName;
                opts.DefaultChallengeScheme = TestAuthHandler.SchemeName;
                opts.DefaultForbidScheme = TestAuthHandler.SchemeName;
                opts.DefaultScheme = TestAuthHandler.SchemeName;
                opts.DefaultSignInScheme = TestAuthHandler.SchemeName;
                opts.DefaultSignOutScheme = TestAuthHandler.SchemeName;
            })
            .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(TestAuthHandler.SchemeName, _ => { });
        });
    }

    private sealed class StubTenantConnectionResolver : ITenantConnectionResolver
    {
        public Task<string> GetConnectionStringAsync(long tenantId, CancellationToken ct = default)
            => Task.FromResult("Host=127.0.0.1;Port=5432;Database=test_tenant;Username=test;Password=test");

        public void InvalidateCache(long tenantId) { }
    }
}
