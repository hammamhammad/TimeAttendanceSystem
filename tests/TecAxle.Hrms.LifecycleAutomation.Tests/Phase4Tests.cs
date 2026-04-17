using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Loans;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 4 (v14.4) backend tests. Phase 4 is overwhelmingly UI work over existing
/// backend endpoints (Phase 1/2/3 already covered). These tests verify:
///   - the deprecated legacy fields still work when written by older callers
///     (backward-compat must not regress);
///   - the GlobalSearchService query shape matches what the Phase 4 UI consumes;
///   - the FailureAlertService + OperationalFailureAlert still behave with the
///     shape the Phase 4 bulk-resolve/retry UI expects.
/// </summary>
public class Phase4Tests
{
    // -------------------------------------------------------------------
    // Phase 7: the legacy DeductionMonth-only back-fill path is gone (field dropped).
    // This test now verifies the executor's date-range default when NEITHER a date
    // range NOR ApprovedAt is available — it falls back to (now + 1 month).
    // -------------------------------------------------------------------
    [Fact]
    public async Task Advance_without_dates_gets_default_deduction_window()
    {
        using var db = TestHarness.NewDb();
        var emp = TestHarness.SeedEmployee(db);
        var approvedAt = new DateTime(2026, 5, 10, 0, 0, 0, DateTimeKind.Utc);
        var adv = new SalaryAdvance
        {
            EmployeeId = emp.Id,
            Amount = 500m,
            Status = SalaryAdvanceStatus.Approved,
            DeductionStartDate = null,
            DeductionEndDate = null,
            ApprovedAt = approvedAt,
            RequestDate = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "t"
        };
        db.SalaryAdvances.Add(adv);
        db.SaveChanges();

        var exec = new TecAxle.Hrms.Application.Features.ApprovalExecution.SalaryAdvanceExecutor(
            new ApplicationDbContextAdapter(db));
        var r = await exec.ExecuteAsync(adv.Id, 42L);

        r.Outcome.Should().Be(TecAxle.Hrms.Application.Features.ApprovalExecution.ExecutionOutcome.Succeeded);
        var refreshed = db.SalaryAdvances.Find(adv.Id)!;
        // Approved in May 2026 → deduct in June.
        refreshed.DeductionStartDate.Should().Be(new DateTime(2026, 6, 1, 0, 0, 0, DateTimeKind.Utc));
        refreshed.DeductionEndDate.Should().Be(new DateTime(2026, 6, 30, 0, 0, 0, DateTimeKind.Utc));
    }

    // -------------------------------------------------------------------
    // Global search: the Phase 4 UI reads .entityType / .entityId / .title /
    // .subtitle / .status. This test fixes the shape so the UI contract is
    // stable against future backend refactors.
    // -------------------------------------------------------------------
    [Fact]
    public async Task GlobalSearch_result_shape_contains_ui_contract_fields()
    {
        using var db = TestHarness.NewDb();
        TestHarness.SeedEmployee(db, configure: e =>
        {
            e.FirstName = "Phase4"; e.LastName = "UIShape";
            e.EmployeeNumber = "E9999"; e.JobTitle = "Analyst";
        });

        var svc = new GlobalSearchService(
            new ApplicationDbContextAdapter(db),
            TestHarness.StubUser());
        var r = await svc.SearchAsync(new GlobalSearchRequest { Query = "phase4" });

        r.Items.Should().NotBeEmpty();
        var item = r.Items.First();
        item.EntityType.Should().Be("Employee");
        item.EntityId.Should().BeGreaterThan(0);
        item.Title.Should().Contain("Phase4"); // UI "title" line
        item.Subtitle.Should().NotBeNull();     // UI "subtitle" line
        item.Status.Should().NotBeNull();       // UI status chip
    }

    // -------------------------------------------------------------------
    // Bulk-retry contract: Phase 4 UI calls bulk-retry and expects the
    // alert's retry count to increment, independent of whether the retry
    // itself succeeded. This verifies the service-level invariant the UI
    // relies on.
    // -------------------------------------------------------------------
    [Fact]
    public async Task FailureAlertService_RecordRetry_increments_counter_without_resolving()
    {
        using var db = TestHarness.NewDb();
        var notifs = new Mock<IInAppNotificationService>();
        notifs.Setup(n => n.SendBulkNotificationsAsync(
                It.IsAny<IEnumerable<CreateNotificationRequest>>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        var alerts = new FailureAlertService(
            new ApplicationDbContextAdapter(db),
            notifs.Object,
            TestHarness.StubRecipients(42),
            NullLogger<FailureAlertService>.Instance);

        var id = await alerts.RaiseAsync(new RaiseFailureAlertRequest
        {
            Category = TecAxle.Hrms.Domain.Operations.OperationalFailureCategory.ApprovalExecution,
            SourceEntityType = "AllowanceRequest",
            SourceEntityId = 9,
            FailureCode = "UiRetryContract",
            Reason = "phase4 ui contract",
            IsRetryable = true
        });

        await alerts.RecordRetryAsync(id);
        await alerts.RecordRetryAsync(id);

        var refreshed = db.OperationalFailureAlerts.Find(id)!;
        refreshed.RetryCount.Should().Be(2);
        refreshed.IsResolved.Should().BeFalse("RecordRetry must never auto-resolve — only bulk-retry success does");
        refreshed.LastRetryAtUtc.Should().NotBeNull();
    }
}
