using FluentAssertions;
using MediatR;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Application.Lifecycle.Handlers;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

public class TerminationCreatedHandlerTests
{
    [Fact]
    public async Task Creates_clearance_and_suspends_employee_with_default_settings()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db); // defaults: both sub-steps enabled
        var emp = TestHarness.SeedEmployee(db);

        var termination = new TerminationRecord
        {
            EmployeeId = emp.Id,
            TerminationType = TerminationType.Termination,
            TerminationDate = DateTime.UtcNow,
            LastWorkingDate = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        db.TerminationRecords.Add(termination);
        db.SaveChanges();

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<CreateClearanceFromTemplateCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success<long?>(999));
        mediator.Setup(m => m.Send(It.IsAny<SuspendEmployeeCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success());

        var handler = new TerminationCreatedHandler(db, mediator.Object,
            NullLogger<TerminationCreatedHandler>.Instance);

        await handler.Handle(new TerminationCreatedEvent(termination.Id, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "TerminationRecord", termination.Id,
            LifecycleAutomationType.TerminationCreateClearance, LifecycleAutomationStatus.Succeeded)
            .Should().Be(1);
        TestHarness.CountAudits(db, "TerminationRecord", termination.Id,
            LifecycleAutomationType.TerminationSuspendEmployee, LifecycleAutomationStatus.Succeeded)
            .Should().Be(1);

        mediator.Verify(m => m.Send(It.IsAny<CreateClearanceFromTemplateCommand>(), It.IsAny<CancellationToken>()), Times.Once);
        mediator.Verify(m => m.Send(It.IsAny<SuspendEmployeeCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Master_kill_switch_off_writes_disabled_rows_for_both_substeps()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s => s.LifecycleAutomationEnabled = false);
        var emp = TestHarness.SeedEmployee(db);

        var termination = new TerminationRecord
        {
            EmployeeId = emp.Id,
            TerminationType = TerminationType.Resignation,
            TerminationDate = DateTime.UtcNow,
            LastWorkingDate = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        db.TerminationRecords.Add(termination);
        db.SaveChanges();

        var mediator = new Mock<IMediator>(MockBehavior.Strict); // must not call anything

        var handler = new TerminationCreatedHandler(db, mediator.Object,
            NullLogger<TerminationCreatedHandler>.Instance);

        await handler.Handle(new TerminationCreatedEvent(termination.Id, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "TerminationRecord", termination.Id,
            LifecycleAutomationType.TerminationCreateClearance, LifecycleAutomationStatus.Disabled)
            .Should().Be(1);
        TestHarness.CountAudits(db, "TerminationRecord", termination.Id,
            LifecycleAutomationType.TerminationSuspendEmployee, LifecycleAutomationStatus.Disabled)
            .Should().Be(1);
    }

    [Fact]
    public async Task Substep_flag_off_disables_that_substep_but_runs_the_other()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s =>
        {
            s.AutoCreateClearanceOnTermination = false;        // disabled
            s.AutoSuspendEmployeeOnTerminationCreated = true;  // enabled
        });
        var emp = TestHarness.SeedEmployee(db);

        var termination = new TerminationRecord
        {
            EmployeeId = emp.Id,
            TerminationType = TerminationType.Termination,
            TerminationDate = DateTime.UtcNow,
            LastWorkingDate = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        db.TerminationRecords.Add(termination);
        db.SaveChanges();

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<SuspendEmployeeCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success());

        var handler = new TerminationCreatedHandler(db, mediator.Object,
            NullLogger<TerminationCreatedHandler>.Instance);

        await handler.Handle(new TerminationCreatedEvent(termination.Id, emp.Id, 1L), default);

        TestHarness.CountAudits(db, "TerminationRecord", termination.Id,
            LifecycleAutomationType.TerminationCreateClearance, LifecycleAutomationStatus.Disabled)
            .Should().Be(1);
        TestHarness.CountAudits(db, "TerminationRecord", termination.Id,
            LifecycleAutomationType.TerminationSuspendEmployee, LifecycleAutomationStatus.Succeeded)
            .Should().Be(1);
        mediator.Verify(m => m.Send(It.IsAny<CreateClearanceFromTemplateCommand>(), It.IsAny<CancellationToken>()), Times.Never);
        mediator.Verify(m => m.Send(It.IsAny<SuspendEmployeeCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Duplicate_event_does_not_double_create_clearance()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        var emp = TestHarness.SeedEmployee(db);

        var termination = new TerminationRecord
        {
            EmployeeId = emp.Id,
            TerminationType = TerminationType.Termination,
            TerminationDate = DateTime.UtcNow,
            LastWorkingDate = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        db.TerminationRecords.Add(termination);
        db.SaveChanges();

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<CreateClearanceFromTemplateCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success<long?>(999));
        mediator.Setup(m => m.Send(It.IsAny<SuspendEmployeeCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success());

        var handler = new TerminationCreatedHandler(db, mediator.Object,
            NullLogger<TerminationCreatedHandler>.Instance);

        await handler.Handle(new TerminationCreatedEvent(termination.Id, emp.Id, 1L), default);
        await handler.Handle(new TerminationCreatedEvent(termination.Id, emp.Id, 1L), default); // replay

        TestHarness.CountAudits(db, "TerminationRecord", termination.Id,
            LifecycleAutomationType.TerminationCreateClearance, LifecycleAutomationStatus.Succeeded)
            .Should().Be(1);
        TestHarness.CountAudits(db, "TerminationRecord", termination.Id,
            LifecycleAutomationType.TerminationCreateClearance, LifecycleAutomationStatus.DuplicateSuppressed)
            .Should().Be(1);

        mediator.Verify(m => m.Send(It.IsAny<CreateClearanceFromTemplateCommand>(), It.IsAny<CancellationToken>()), Times.Once);
    }
}
