using FluentAssertions;
using MediatR;
using Moq;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Entitlement.Tests;

/// <summary>
/// Verifies that <see cref="UsageLimitBehavior{TRequest,TResponse}"/> enforces the
/// <see cref="RequiresLimitAttribute"/> for commands decorated in this change
/// (<c>CreateEmployeeCommand</c>, <c>CreateBranchCommand</c>).
/// </summary>
public class UsageLimitBehaviorTests
{
    [RequiresLimit(LimitType.MaxEmployees)]
    public record StubLimitedCommand : IRequest<Result<long>>;

    public record StubUnlimitedCommand : IRequest<Result<long>>;

    private static UsageLimitBehavior<TRequest, Result<long>> CreateBehavior<TRequest>(
        ICurrentUser user, IEntitlementService entitlements)
        where TRequest : notnull
        => new(user, entitlements);

    [Fact]
    public async Task LimitReached_ReturnsFailureWithLimitMessage()
    {
        var user = new Mock<ICurrentUser>();
        user.SetupGet(u => u.IsSystemAdmin).Returns(false);
        user.SetupGet(u => u.TenantId).Returns(1);

        var ent = new Mock<IEntitlementService>();
        ent.Setup(e => e.CanAddMoreAsync(1, LimitType.MaxEmployees, 1, It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);
        ent.Setup(e => e.GetLimitAsync(1, LimitType.MaxEmployees, It.IsAny<CancellationToken>()))
            .ReturnsAsync(50);

        var behavior = CreateBehavior<StubLimitedCommand>(user.Object, ent.Object);

        var result = await behavior.Handle(
            new StubLimitedCommand(),
            () => Task.FromResult(Result.Success<long>(999)),
            CancellationToken.None);

        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Contain("50").And.Contain("MaxEmployees");
    }

    [Fact]
    public async Task UnderLimit_PassesThrough()
    {
        var user = new Mock<ICurrentUser>();
        user.SetupGet(u => u.IsSystemAdmin).Returns(false);
        user.SetupGet(u => u.TenantId).Returns(1);

        var ent = new Mock<IEntitlementService>();
        ent.Setup(e => e.CanAddMoreAsync(1, LimitType.MaxEmployees, 1, It.IsAny<CancellationToken>()))
            .ReturnsAsync(true);

        var behavior = CreateBehavior<StubLimitedCommand>(user.Object, ent.Object);

        var result = await behavior.Handle(
            new StubLimitedCommand(),
            () => Task.FromResult(Result.Success<long>(999)),
            CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        result.Value.Should().Be(999);
    }

    [Fact]
    public async Task SystemAdmin_BypassesLimit()
    {
        var user = new Mock<ICurrentUser>();
        user.SetupGet(u => u.IsSystemAdmin).Returns(true);
        user.SetupGet(u => u.TenantId).Returns(1);

        var ent = new Mock<IEntitlementService>();
        var behavior = CreateBehavior<StubLimitedCommand>(user.Object, ent.Object);

        var result = await behavior.Handle(
            new StubLimitedCommand(),
            () => Task.FromResult(Result.Success<long>(999)),
            CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        ent.Verify(e => e.CanAddMoreAsync(It.IsAny<long>(), It.IsAny<LimitType>(), It.IsAny<int>(), It.IsAny<CancellationToken>()),
            Times.Never);
    }

    [Fact]
    public async Task RequestWithoutAttribute_PassesThrough()
    {
        var user = new Mock<ICurrentUser>();
        var ent = new Mock<IEntitlementService>();

        var behavior = CreateBehavior<StubUnlimitedCommand>(user.Object, ent.Object);

        var result = await behavior.Handle(
            new StubUnlimitedCommand(),
            () => Task.FromResult(Result.Success<long>(1)),
            CancellationToken.None);

        result.IsSuccess.Should().BeTrue();
        ent.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task CreateEmployeeCommand_HasRequiresLimitAttribute()
    {
        var attr = typeof(TecAxle.Hrms.Application.Employees.Commands.CreateEmployee.CreateEmployeeCommand)
            .GetCustomAttributes(typeof(RequiresLimitAttribute), inherit: false);
        attr.Should().HaveCount(1);
        ((RequiresLimitAttribute)attr[0]).LimitType.Should().Be(LimitType.MaxEmployees);
    }

    [Fact]
    public async Task CreateBranchCommand_HasRequiresLimitAttribute()
    {
        var attr = typeof(TecAxle.Hrms.Application.Branches.Commands.CreateBranch.CreateBranchCommand)
            .GetCustomAttributes(typeof(RequiresLimitAttribute), inherit: false);
        attr.Should().HaveCount(1);
        ((RequiresLimitAttribute)attr[0]).LimitType.Should().Be(LimitType.MaxBranches);
    }
}
