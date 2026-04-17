using FluentAssertions;
using MediatR;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Features.ApprovalExecution;
using TecAxle.Hrms.Application.Features.ApprovalExecution.Commands;
using TecAxle.Hrms.Application.Features.ApprovalExecution.Events;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Operations;
using TecAxle.Hrms.Domain.Workflows.Enums;
using TecAxle.Hrms.Infrastructure.Persistence;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Phase 1 (v14.1) closure pass tests:
///  - RequestFinallyApprovedHandler dispatches ExecuteApprovalCommand for each of the 6 targets.
///  - Non-target workflow types (Vacation, Excuse, ...) are ignored.
///  - Handler converts executor exceptions into OperationalFailureAlerts (retryable).
///  - FailureAlertService persists a WorkflowRouting alert with full metadata and dedups on repeat.
/// </summary>
public class Phase1ClosureTests
{
    private static IFailureAlertService BuildAlerts(TecAxleDbContext db)
    {
        var notifs = new Mock<IInAppNotificationService>();
        notifs.Setup(n => n.SendBulkNotificationsAsync(
                It.IsAny<IEnumerable<CreateNotificationRequest>>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        var recipients = TestHarness.StubRecipients(42);
        return new FailureAlertService(
            new ApplicationDbContextAdapter(db),
            notifs.Object,
            recipients,
            NullLogger<FailureAlertService>.Instance);
    }

    [Theory]
    [InlineData(WorkflowEntityType.AllowanceRequest, ApprovalExecutionTargetType.AllowanceRequest)]
    [InlineData(WorkflowEntityType.LoanApplication, ApprovalExecutionTargetType.LoanApplication)]
    [InlineData(WorkflowEntityType.SalaryAdvance, ApprovalExecutionTargetType.SalaryAdvance)]
    [InlineData(WorkflowEntityType.ExpenseClaim, ApprovalExecutionTargetType.ExpenseClaim)]
    [InlineData(WorkflowEntityType.BenefitEnrollment, ApprovalExecutionTargetType.BenefitEnrollment)]
    [InlineData(WorkflowEntityType.LetterRequest, ApprovalExecutionTargetType.LetterRequest)]
    public async Task RequestFinallyApprovedHandler_dispatches_ExecuteApprovalCommand_for_each_target(
        WorkflowEntityType src, ApprovalExecutionTargetType expected)
    {
        await using var db = TestHarness.NewDb();
        var alerts = BuildAlerts(db);
        var publisher = new Mock<IPublisher>();

        ExecuteApprovalCommand? observed = null;
        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<ExecuteApprovalCommand>(), It.IsAny<CancellationToken>()))
            .Callback<object, CancellationToken>((req, _) => observed = (ExecuteApprovalCommand)req)
            .ReturnsAsync(Result.Success(ExecutionResult.Succeeded(999, "ok")));

        var handler = new RequestFinallyApprovedHandler(
            mediator.Object, alerts, NullLogger<RequestFinallyApprovedHandler>.Instance);

        await handler.Handle(new RequestFinallyApprovedEvent(src, 42, 7, 1L), default);

        observed.Should().NotBeNull();
        observed!.TargetType.Should().Be(expected);
        observed.RequestId.Should().Be(42);
        db.OperationalFailureAlerts.Count().Should().Be(0, "success path must not raise alerts");
    }

    [Fact]
    public async Task RequestFinallyApprovedHandler_ignores_non_target_entity_types()
    {
        await using var db = TestHarness.NewDb();
        var alerts = BuildAlerts(db);

        var mediator = new Mock<IMediator>(MockBehavior.Strict); // any Send() call = test failure
        var handler = new RequestFinallyApprovedHandler(
            mediator.Object, alerts, NullLogger<RequestFinallyApprovedHandler>.Instance);

        foreach (var t in new[] {
            WorkflowEntityType.Vacation,
            WorkflowEntityType.Excuse,
            WorkflowEntityType.RemoteWork,
            WorkflowEntityType.AttendanceCorrection
        })
        {
            await handler.Handle(new RequestFinallyApprovedEvent(t, 1, 2, 3), default);
        }

        mediator.VerifyNoOtherCalls();
        db.OperationalFailureAlerts.Count().Should().Be(0);
    }

    [Fact]
    public async Task RequestFinallyApprovedHandler_raises_alert_when_executor_throws()
    {
        await using var db = TestHarness.NewDb();
        var alerts = BuildAlerts(db);
        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<ExecuteApprovalCommand>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("boom"));

        var handler = new RequestFinallyApprovedHandler(
            mediator.Object, alerts, NullLogger<RequestFinallyApprovedHandler>.Instance);

        await handler.Handle(new RequestFinallyApprovedEvent(
            WorkflowEntityType.AllowanceRequest, 42, 7, 1L), default);

        var alert = db.OperationalFailureAlerts.Single();
        alert.Category.Should().Be(OperationalFailureCategory.ApprovalExecution);
        alert.SourceEntityType.Should().Be("AllowanceRequest");
        alert.SourceEntityId.Should().Be(42);
        alert.FailureCode.Should().Be("AutoExecuteHandlerException");
        alert.IsRetryable.Should().BeTrue();
        alert.ErrorMessage.Should().Contain("boom");
    }

    [Fact]
    public async Task RequestFinallyApprovedHandler_raises_alert_when_command_returns_failure()
    {
        await using var db = TestHarness.NewDb();
        var alerts = BuildAlerts(db);
        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<ExecuteApprovalCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Failure<ExecutionResult>("no executor registered"));

        var handler = new RequestFinallyApprovedHandler(
            mediator.Object, alerts, NullLogger<RequestFinallyApprovedHandler>.Instance);

        await handler.Handle(new RequestFinallyApprovedEvent(
            WorkflowEntityType.LoanApplication, 99, 7, null), default);

        var alert = db.OperationalFailureAlerts.Single();
        alert.FailureCode.Should().Be("AutoExecuteCommandFailed");
        alert.Category.Should().Be(OperationalFailureCategory.ApprovalExecution);
        alert.ErrorMessage.Should().Contain("no executor");
    }

    [Fact]
    public async Task FailureAlertService_persists_WorkflowRouting_alert_with_metadata_and_dedups()
    {
        await using var db = TestHarness.NewDb();
        var alerts = BuildAlerts(db);

        var req = new RaiseFailureAlertRequest
        {
            Category = OperationalFailureCategory.WorkflowRouting,
            SourceEntityType = "WorkflowInstance",
            SourceEntityId = 1234,
            FailureCode = "FailedRouting",
            Reason = "No approver resolved for step 'Manager Approval'",
            Severity = OperationalFailureSeverity.Error,
            IsRetryable = false,
            MetadataJson = "{\"workflowEntityType\":\"AllowanceRequest\",\"stepId\":55}"
        };
        var id1 = await alerts.RaiseAsync(req);
        var id2 = await alerts.RaiseAsync(req); // same key → dedup

        id1.Should().Be(id2);
        var alert = db.OperationalFailureAlerts.Single();
        alert.Category.Should().Be(OperationalFailureCategory.WorkflowRouting);
        alert.SourceEntityType.Should().Be("WorkflowInstance");
        alert.SourceEntityId.Should().Be(1234);
        alert.FailureCode.Should().Be("FailedRouting");
        alert.IsRetryable.Should().BeFalse();
        alert.RetryCount.Should().Be(1);
        alert.MetadataJson.Should().Contain("AllowanceRequest");

        // Resolving this alert + raising again → new row (old one preserved for audit).
        await alerts.ResolveAsync(id1, 42, "config fixed");
        var id3 = await alerts.RaiseAsync(req);
        id3.Should().NotBe(id1);
        db.OperationalFailureAlerts.Count().Should().Be(2);
    }
}
