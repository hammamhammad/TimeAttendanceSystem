using FluentAssertions;
using MediatR;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Lifecycle.Commands;
using TecAxle.Hrms.Application.Lifecycle.Events;
using TecAxle.Hrms.Application.Lifecycle.Handlers;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

public class ContractExpiredHandlerTests
{
    [Theory]
    [InlineData("AutoMarkExpired")]
    [InlineData("Suspend")]
    [InlineData("Deactivate")]
    [InlineData("NotifyOnly")]
    public async Task Handler_passes_configured_action_to_apply_command(string actionName)
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s => s.ContractExpiredAction = actionName);
        var emp = TestHarness.SeedEmployee(db);
        var contract = new EmployeeContract
        {
            EmployeeId = emp.Id,
            ContractNumber = "CTR-001",
            ContractType = ContractType.Permanent,
            BasicSalary = 1000m,
            Currency = "SAR",
            StartDate = new DateTime(2020, 1, 1),
            EndDate = new DateTime(2024, 1, 1),
            Status = ContractStatus.Active,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        db.EmployeeContracts.Add(contract);
        db.SaveChanges();

        ApplyContractExpiredActionCommand? captured = null;
        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<ApplyContractExpiredActionCommand>(), It.IsAny<CancellationToken>()))
            .Callback<IRequest<Result<string>>, CancellationToken>((cmd, _) => captured = (ApplyContractExpiredActionCommand)cmd)
            .ReturnsAsync(Result.Success("applied"));

        var handler = new ContractExpiredHandler(db, mediator.Object,
            NullLogger<ContractExpiredHandler>.Instance);

        await handler.Handle(new ContractExpiredEvent(contract.Id, emp.Id), default);

        TestHarness.CountAudits(db, "EmployeeContract", contract.Id,
            LifecycleAutomationType.ContractExpiredAction,
            LifecycleAutomationStatus.Succeeded).Should().Be(1);

        captured.Should().NotBeNull();
        captured!.Action.ToString().Should().Be(actionName);
    }

    [Fact]
    public async Task Degrades_to_mark_expired_when_employee_already_inactive_and_action_would_be_deactivate()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db, s => s.ContractExpiredAction = "Deactivate");
        var emp = TestHarness.SeedEmployee(db, configure: e => e.IsActive = false);
        var contract = new EmployeeContract
        {
            EmployeeId = emp.Id,
            ContractNumber = "CTR-002",
            ContractType = ContractType.Permanent,
            BasicSalary = 1000m,
            Currency = "SAR",
            StartDate = new DateTime(2020, 1, 1),
            EndDate = new DateTime(2024, 1, 1),
            Status = ContractStatus.Active,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        db.EmployeeContracts.Add(contract);
        db.SaveChanges();

        ApplyContractExpiredActionCommand? captured = null;
        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<ApplyContractExpiredActionCommand>(), It.IsAny<CancellationToken>()))
            .Callback<IRequest<Result<string>>, CancellationToken>((cmd, _) => captured = (ApplyContractExpiredActionCommand)cmd)
            .ReturnsAsync(Result.Success("applied"));

        var handler = new ContractExpiredHandler(db, mediator.Object,
            NullLogger<ContractExpiredHandler>.Instance);

        await handler.Handle(new ContractExpiredEvent(contract.Id, emp.Id), default);

        captured.Should().NotBeNull();
        captured!.Action.Should().Be(ContractExpiredAction.AutoMarkExpired);
    }

    [Fact]
    public async Task Duplicate_event_does_not_double_apply()
    {
        await using var db = TestHarness.NewDb();
        TestHarness.SeedSettings(db);
        var emp = TestHarness.SeedEmployee(db);
        var contract = new EmployeeContract
        {
            EmployeeId = emp.Id,
            ContractNumber = "CTR-003",
            ContractType = ContractType.Permanent,
            BasicSalary = 1000m,
            Currency = "SAR",
            StartDate = new DateTime(2020, 1, 1),
            EndDate = new DateTime(2024, 1, 1),
            Status = ContractStatus.Active,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        db.EmployeeContracts.Add(contract);
        db.SaveChanges();

        var mediator = new Mock<IMediator>();
        mediator.Setup(m => m.Send(It.IsAny<ApplyContractExpiredActionCommand>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(Result.Success("applied"));

        var handler = new ContractExpiredHandler(db, mediator.Object,
            NullLogger<ContractExpiredHandler>.Instance);

        await handler.Handle(new ContractExpiredEvent(contract.Id, emp.Id), default);
        await handler.Handle(new ContractExpiredEvent(contract.Id, emp.Id), default);

        mediator.Verify(m => m.Send(It.IsAny<ApplyContractExpiredActionCommand>(), It.IsAny<CancellationToken>()), Times.Once);
        TestHarness.CountAudits(db, "EmployeeContract", contract.Id,
            LifecycleAutomationType.ContractExpiredAction,
            LifecycleAutomationStatus.DuplicateSuppressed).Should().Be(1);
    }
}
