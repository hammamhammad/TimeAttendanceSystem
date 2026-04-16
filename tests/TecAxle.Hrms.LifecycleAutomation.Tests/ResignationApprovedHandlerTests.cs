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

public class ResignationApprovedHandlerTests
{
    [Fact]
    public async Task Creates_termination_when_flag_on()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s => s.AutoCreateTerminationOnResignationApproved = true);
        var emp = TestHarness.SeedEmployee(db);

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<CreateTerminationFromResignationCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success<long?>(1234));

        var handler = new ResignationApprovedHandler(db, mediator.Object,
            NullLogger<ResignationApprovedHandler>.Instance);

        await handler.Handle(new ResignationApprovedEvent(500L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "ResignationRequest", 500L,
            LifecycleAutomationType.ResignationApprovedCreateTermination,
            LifecycleAutomationStatus.Succeeded).Should().Be(1);
    }

    [Fact]
    public async Task Disabled_when_flag_off_default()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db); // default = false
        var emp = TestHarness.SeedEmployee(db);

        var mediator = new Mock<IMediator>(MockBehavior.Strict);

        var handler = new ResignationApprovedHandler(db, mediator.Object,
            NullLogger<ResignationApprovedHandler>.Instance);

        await handler.Handle(new ResignationApprovedEvent(500L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "ResignationRequest", 500L,
            LifecycleAutomationType.ResignationApprovedCreateTermination,
            LifecycleAutomationStatus.Disabled).Should().Be(1);
    }

    [Fact]
    public async Task Duplicate_event_suppressed()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s => s.AutoCreateTerminationOnResignationApproved = true);
        var emp = TestHarness.SeedEmployee(db);

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<CreateTerminationFromResignationCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success<long?>(1234));

        var handler = new ResignationApprovedHandler(db, mediator.Object,
            NullLogger<ResignationApprovedHandler>.Instance);

        await handler.Handle(new ResignationApprovedEvent(500L, emp.Id, 1L), default);
        await handler.Handle(new ResignationApprovedEvent(500L, emp.Id, 1L), default);

        mediator.Verify(m => m.Send(It.IsAny<CreateTerminationFromResignationCommand>(), It.IsAny<CancellationToken>()), Times.Once);
        TestHarness.CountAudits(db, "ResignationRequest", 500L,
            LifecycleAutomationType.ResignationApprovedCreateTermination,
            LifecycleAutomationStatus.DuplicateSuppressed).Should().Be(1);
    }
}
