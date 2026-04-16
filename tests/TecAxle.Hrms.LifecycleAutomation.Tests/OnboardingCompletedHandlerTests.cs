using FluentAssertions;
using MediatR;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Application.Lifecycle.Handlers;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

public class OnboardingCompletedHandlerTests
{
    [Fact]
    public async Task Milestone_only_mode_does_not_call_activate()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db); // AutoActivateEmployeeOnOnboardingComplete=false by default
        var emp = TestHarness.SeedEmployee(db);

        var mediator = new Mock<IMediator>(MockBehavior.Strict); // strict: activate must NOT be called

        var handler = new OnboardingCompletedHandler(db, mediator.Object,
            NullLogger<OnboardingCompletedHandler>.Instance);

        await handler.Handle(new OnboardingCompletedEvent(888L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "OnboardingProcess", 888L,
            LifecycleAutomationType.OnboardingCompletedActivateEmployee,
            LifecycleAutomationStatus.Skipped).Should().Be(1);

        // Milestone was still stamped.
        var refreshed = db.Employees.Find(emp.Id);
        refreshed!.OnboardingCompletedAt.Should().NotBeNull();
    }

    [Fact]
    public async Task Activate_mode_flips_prehire_to_active()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s => s.AutoActivateEmployeeOnOnboardingComplete = true);
        var emp = TestHarness.SeedEmployee(db, configure: e =>
        {
            e.IsActive = false;
            e.IsPreHire = true;
        });

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<ActivateEmployeeCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success());

        var handler = new OnboardingCompletedHandler(db, mediator.Object,
            NullLogger<OnboardingCompletedHandler>.Instance);

        await handler.Handle(new OnboardingCompletedEvent(888L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "OnboardingProcess", 888L,
            LifecycleAutomationType.OnboardingCompletedActivateEmployee,
            LifecycleAutomationStatus.Succeeded).Should().Be(1);

        mediator.Verify(m => m.Send(It.IsAny<ActivateEmployeeCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Master_kill_switch_off_skips_everything_including_milestone_stamping_audit()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s => s.LifecycleAutomationEnabled = false);
        var emp = TestHarness.SeedEmployee(db);

        var mediator = new Mock<IMediator>(MockBehavior.Strict);

        var handler = new OnboardingCompletedHandler(db, mediator.Object,
            NullLogger<OnboardingCompletedHandler>.Instance);

        await handler.Handle(new OnboardingCompletedEvent(888L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "OnboardingProcess", 888L,
            LifecycleAutomationType.OnboardingCompletedActivateEmployee,
            LifecycleAutomationStatus.Disabled).Should().Be(1);
    }
}
