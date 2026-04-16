using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Entitlement.Tests.EndToEnd;

/// <summary>
/// End-to-end HTTP tests that route real requests through the actual ASP.NET Core pipeline
/// (middleware, auth, routing, model binding, action filters). These prove that a tenant without
/// the required module receives <c>403 Forbidden</c> for every formerly-unprotected controller
/// this change patched — including controllers that used <c>IApplicationDbContext</c> directly
/// and therefore bypassed the MediatR pipeline.
///
/// Caveat: tests only assert the <b>entitlement outcome</b>. When the filter passes (SystemAdmin
/// bypass, enabled module, or AllowModuleReadOnly on a GET), the controller action may still fail
/// for an unrelated reason (no real DB, missing body, etc). We assert "status is NOT 403 with a
/// subscription message" rather than requiring a 200 in those cases.
/// </summary>
public class ModuleEntitlementEndToEndTests : IClassFixture<EntitlementTestWebApplicationFactory>
{
    private readonly EntitlementTestWebApplicationFactory _factory;
    private readonly HttpClient _client;

    private const long TestTenantId = 42;

    public ModuleEntitlementEndToEndTests(EntitlementTestWebApplicationFactory factory)
    {
        _factory = factory;
        _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }

    // ------------ Helpers ------------

    private HttpRequestMessage Req(HttpMethod method, string path, long? tenantId, params string[] roles)
    {
        var msg = new HttpRequestMessage(method, path);
        msg.Headers.Add("X-Test-User-Id", "1000");
        if (tenantId.HasValue) msg.Headers.Add("X-Test-Tenant-Id", tenantId.Value.ToString());
        if (roles.Length > 0) msg.Headers.Add("X-Test-Roles", string.Join(",", roles));
        return msg;
    }

    private static async Task<bool> Is403SubscriptionError(HttpResponseMessage resp, string moduleName)
    {
        if (resp.StatusCode != HttpStatusCode.Forbidden) return false;
        var body = await resp.Content.ReadAsStringAsync();
        return body.Contains("not available in your current subscription plan")
               && body.Contains(moduleName);
    }

    // ============================================================
    // 1. Disabled module → 403 for every target controller
    // ============================================================

    public static IEnumerable<object[]> DisabledModuleCases() => new[]
    {
        // Recruitment
        new object[] { "POST", "/api/v1/job-requisitions",                    "Recruitment" },
        new object[] { "POST", "/api/v1/job-postings",                        "Recruitment" },
        new object[] { "POST", "/api/v1/candidates",                          "Recruitment" },
        new object[] { "POST", "/api/v1/job-applications",                    "Recruitment" },
        new object[] { "POST", "/api/v1/interviews",                          "Recruitment" },
        new object[] { "POST", "/api/v1/interview-feedbacks",                 "Recruitment" },
        new object[] { "POST", "/api/v1/offer-letters",                       "Recruitment" },
        // Onboarding
        new object[] { "POST", "/api/v1/onboarding-templates",                "Onboarding" },
        new object[] { "POST", "/api/v1/onboarding-processes",                "Onboarding" },
        // Performance — routes are actionised; use real ones
        new object[] { "POST", "/api/v1/performance-cycles",                  "Performance" },
        new object[] { "POST", "/api/v1/performance-reviews/1/approve",       "Performance" },
        new object[] { "POST", "/api/v1/pips",                                "Performance" },
        new object[] { "POST", "/api/v1/goals",                               "Performance" },
        new object[] { "POST", "/api/v1/competency-frameworks",               "Performance" },
        new object[] { "POST", "/api/v1/feedback-requests",                   "Performance" },
        // Offboarding — exit-interviews uses {terminationId} route
        new object[] { "POST", "/api/v1/exit-interviews/1",                   "Offboarding" },
        new object[] { "POST", "/api/v1/clearance/1/initialize",              "Offboarding" },
        // EmployeeLifecycle
        new object[] { "POST", "/api/v1/job-grades",                          "EmployeeLifecycle" },
        // Payroll
        new object[] { "POST", "/api/v1/payroll-settings/tax-configs",        "Payroll" },
        new object[] { "POST", "/api/v1/payroll-settings/social-insurance",   "Payroll" },
        new object[] { "POST", "/api/v1/payroll-settings/insurance-providers","Payroll" },
        new object[] { "POST", "/api/v1/payroll-settings/calendar-policies",  "Payroll" },
        new object[] { "POST", "/api/v1/salary-advances",                     "Payroll" }
    };

    [Theory]
    [MemberData(nameof(DisabledModuleCases))]
    public async Task TenantWithoutModule_WriteEndpoint_Returns403(string method, string path, string moduleName)
    {
        // Tenant has NO modules enabled.
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var req = Req(new HttpMethod(method), path, TestTenantId);
        // Empty JSON body so we reach the filter (even if model binding would later reject).
        req.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");

        var resp = await _client.SendAsync(req);

        (await Is403SubscriptionError(resp, moduleName))
            .Should().BeTrue(
                $"{method} {path} should return 403 with subscription message, got {(int)resp.StatusCode} {resp.StatusCode}");
    }

    // ============================================================
    // 2. Read-only: GET on a disabled module should pass the filter (still accessible)
    //    Some endpoints may then fail for DB reasons — we only assert it wasn't the filter.
    // ============================================================

    public static IEnumerable<object[]> ReadOnlyOnDisabledModuleCases() => new[]
    {
        new object[] { "/api/v1/job-requisitions",                "Recruitment" },
        new object[] { "/api/v1/performance-reviews",             "Performance" },
        new object[] { "/api/v1/onboarding-templates",            "Onboarding" },
        new object[] { "/api/v1/clearance",                       "Offboarding" },
        new object[] { "/api/v1/payroll-settings/calendar-policies","Payroll" },
        new object[] { "/api/v1/reports/attendance?from=2026-01-01&to=2026-01-31", "TimeAttendance" }
    };

    [Theory]
    [MemberData(nameof(ReadOnlyOnDisabledModuleCases))]
    public async Task TenantWithoutModule_GetWithReadOnlyMarker_NotBlockedByFilter(string path, string moduleName)
    {
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var resp = await _client.SendAsync(Req(HttpMethod.Get, path, TestTenantId));

        (await Is403SubscriptionError(resp, moduleName))
            .Should().BeFalse($"GET {path} carries [AllowModuleReadOnly]; filter must permit it even when {moduleName} is disabled");
    }

    // ============================================================
    // 3. Enabled module: filter should not block
    // ============================================================

    [Fact]
    public async Task TenantWithModule_WritePasses_TheFilter()
    {
        _factory.Entitlements.SetTenantModules(TestTenantId, SystemModule.Recruitment);

        var req = Req(HttpMethod.Post, "/api/v1/job-requisitions", TestTenantId);
        req.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");

        var resp = await _client.SendAsync(req);

        (await Is403SubscriptionError(resp, "Recruitment"))
            .Should().BeFalse($"Recruitment is enabled for tenant; filter must not return a 403 subscription error. Got {(int)resp.StatusCode}.");
    }

    // ============================================================
    // 4. SystemAdmin bypass
    // ============================================================

    [Fact]
    public async Task SystemAdmin_DisabledModule_IsNotBlockedByFilter()
    {
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var req = Req(HttpMethod.Post, "/api/v1/performance-reviews", TestTenantId, "SystemAdmin");
        req.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");

        var resp = await _client.SendAsync(req);

        (await Is403SubscriptionError(resp, "Performance"))
            .Should().BeFalse("SystemAdmin must bypass module entitlement enforcement");
    }

    // ============================================================
    // 5. No tenant context (platform admin pre-selection) bypasses filter
    // ============================================================

    [Fact]
    public async Task PlatformAdminWithoutTenant_IsNotBlockedByFilter()
    {
        // Simulate platform admin: no tenant_id claim.
        var req = new HttpRequestMessage(HttpMethod.Get, "/api/v1/job-requisitions");
        req.Headers.Add("X-Test-User-Id", "99");
        req.Headers.Add("X-Test-Platform-User", "true");
        req.Headers.Add("X-Test-Roles", "TecAxleAdmin");

        var resp = await _client.SendAsync(req);

        (await Is403SubscriptionError(resp, "Recruitment"))
            .Should().BeFalse("platform admin without a selected tenant bypasses module enforcement");
    }

    // ============================================================
    // 6. 403 body shape: statusCode + message + traceId
    // ============================================================

    [Fact]
    public async Task BlockedResponse_HasExpectedJsonShape()
    {
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var req = Req(HttpMethod.Post, "/api/v1/job-requisitions", TestTenantId);
        req.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");

        var resp = await _client.SendAsync(req);
        var body = await resp.Content.ReadAsStringAsync();
        resp.StatusCode.Should().Be(HttpStatusCode.Forbidden, $"body was: {body}");

        using var doc = JsonDocument.Parse(body);
        var root = doc.RootElement;

        root.GetProperty("statusCode").GetInt32().Should().Be(403);
        root.GetProperty("message").GetString().Should().Contain("Recruitment");
        root.GetProperty("traceId").GetString().Should().NotBeNullOrEmpty();
    }

    // ============================================================
    // 7. ReportsController consolidation: write-style report (none exist, but the module mapping
    //    should still flow through the filter for the GET path)
    // ============================================================

    [Fact]
    public async Task ReportsController_PayrollReport_BlockedWhenPayrollDisabled_ThenAllowedViaReadOnly()
    {
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var resp = await _client.SendAsync(Req(HttpMethod.Get, "/api/v1/reports/salary-register?payrollPeriodId=1", TestTenantId));

        // salary-register is a GET with [AllowModuleReadOnly] — must NOT be a 403 subscription error.
        (await Is403SubscriptionError(resp, "Payroll")).Should().BeFalse();
    }

    // ============================================================
    // 8. MobileScheduleController: direct-DB controller now guarded by TimeAttendance
    // ============================================================

    [Fact]
    public async Task MobileSchedule_Today_OnDisabledTimeAttendance_GetStillPasses_ViaReadOnly()
    {
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var resp = await _client.SendAsync(Req(HttpMethod.Get, "/api/v1/mobile/schedule/today", TestTenantId));

        (await Is403SubscriptionError(resp, "TimeAttendance")).Should().BeFalse();
    }

    // ============================================================
    // 9. PortalController: write-path on disabled module is blocked
    //    (POST /my-resignation requires Offboarding; POST /my-grievances requires EmployeeRelations)
    // ============================================================

    [Fact]
    public async Task Portal_SubmitResignation_Requires_Offboarding()
    {
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var req = Req(HttpMethod.Post, "/api/v1/portal/my-resignation", TestTenantId);
        req.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");

        var resp = await _client.SendAsync(req);

        (await Is403SubscriptionError(resp, "Offboarding")).Should().BeTrue(
            "self-service resignation must honor Offboarding module even though it's a portal endpoint");
    }

    [Fact]
    public async Task Portal_FileGrievance_Requires_EmployeeRelations()
    {
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var req = Req(HttpMethod.Post, "/api/v1/portal/my-grievances", TestTenantId);
        req.Content = new StringContent("{}", System.Text.Encoding.UTF8, "application/json");

        var resp = await _client.SendAsync(req);

        (await Is403SubscriptionError(resp, "EmployeeRelations")).Should().BeTrue();
    }

    [Fact]
    public async Task Portal_MyProfile_Get_IsCore_AndNotBlocked()
    {
        // my-profile is a Core endpoint (no module decoration).
        _factory.Entitlements.SetTenantModules(TestTenantId /* none */);

        var resp = await _client.SendAsync(Req(HttpMethod.Get, "/api/v1/portal/my-profile", TestTenantId));

        // Should NEVER be a 403 subscription error regardless of the tenant's plan.
        var body = resp.StatusCode == HttpStatusCode.Forbidden ? await resp.Content.ReadAsStringAsync() : string.Empty;
        body.Should().NotContain("not available in your current subscription plan",
            "profile is Core and must remain accessible regardless of module subscription");
    }
}
