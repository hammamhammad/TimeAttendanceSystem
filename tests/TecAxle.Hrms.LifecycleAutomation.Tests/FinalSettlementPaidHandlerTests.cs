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

public class FinalSettlementPaidHandlerTests
{
    [Fact]
    public async Task Deactivates_employee_when_enabled()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db); // default AutoDeactivateEmployeeOnFinalSettlementPaid=true
        var emp = TestHarness.SeedEmployee(db, configure: e => { e.IsSuspended = true; e.IsActive = true; });

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<DeactivateEmployeeCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success());

        var handler = new FinalSettlementPaidHandler(db, mediator.Object,
            NullLogger<FinalSettlementPaidHandler>.Instance);

        await handler.Handle(new FinalSettlementPaidEvent(777L, 555L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "FinalSettlement", 777L,
            LifecycleAutomationType.FinalSettlementPaidDeactivateEmployee,
            LifecycleAutomationStatus.Succeeded).Should().Be(1);

        mediator.Verify(m => m.Send(It.IsAny<DeactivateEmployeeCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Skips_when_employee_already_fully_inactive()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        var emp = TestHarness.SeedEmployee(db, configure: e => { e.IsActive = false; e.IsSuspended = false; });

        var mediator = new Mock<IMediator>(MockBehavior.Strict); // must not be called

        var handler = new FinalSettlementPaidHandler(db, mediator.Object,
            NullLogger<FinalSettlementPaidHandler>.Instance);

        await handler.Handle(new FinalSettlementPaidEvent(777L, 555L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "FinalSettlement", 777L,
            LifecycleAutomationType.FinalSettlementPaidDeactivateEmployee,
            LifecycleAutomationStatus.Skipped).Should().Be(1);
    }

    [Fact]
    public async Task Disabled_when_flag_off()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s => s.AutoDeactivateEmployeeOnFinalSettlementPaid = false);
        var emp = TestHarness.SeedEmployee(db);

        var mediator = new Mock<IMediator>(MockBehavior.Strict);

        var handler = new FinalSettlementPaidHandler(db, mediator.Object,
            NullLogger<FinalSettlementPaidHandler>.Instance);

        await handler.Handle(new FinalSettlementPaidEvent(777L, 555L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "FinalSettlement", 777L,
            LifecycleAutomationType.FinalSettlementPaidDeactivateEmployee,
            LifecycleAutomationStatus.Disabled).Should().Be(1);
    }

    [Fact]
    public async Task Duplicate_event_suppressed()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        var emp = TestHarness.SeedEmployee(db);

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<DeactivateEmployeeCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success());

        var handler = new FinalSettlementPaidHandler(db, mediator.Object,
            NullLogger<FinalSettlementPaidHandler>.Instance);

        await handler.Handle(new FinalSettlementPaidEvent(777L, 555L, emp.Id, 1L), default);
        await handler.Handle(new FinalSettlementPaidEvent(777L, 555L, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "FinalSettlement", 777L,
            LifecycleAutomationType.FinalSettlementPaidDeactivateEmployee,
            LifecycleAutomationStatus.Succeeded).Should().Be(1);
        TestHarness.CountAudits(db, "FinalSettlement", 777L,
            LifecycleAutomationType.FinalSettlementPaidDeactivateEmployee,
            LifecycleAutomationStatus.DuplicateSuppressed).Should().Be(1);

        mediator.Verify(m => m.Send(It.IsAny<DeactivateEmployeeCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}
