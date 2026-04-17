using System.Collections.ObjectModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Lifecycle;
using TecAxle.Hrms.Domain.Offboarding;
using TecAxle.Hrms.Domain.Onboarding;
using TecAxle.Hrms.Domain.Recruitment;
using TecAxle.Hrms.Domain.Company;
using TecAxle.Hrms.Domain.Users;
using TecAxle.Hrms.Infrastructure.Persistence;

namespace TecAxle.Hrms.LifecycleAutomation.Tests;

/// <summary>
/// Shared helpers: new InMemory DbContext per test, stub <see cref="ICurrentUser"/>,
/// minimal company/settings/employee seeding, and a Moq-wired <see cref="IMediator"/>
/// that exposes the commands the handlers under test need.
/// </summary>
internal static class TestHarness
{
    public static TecAxleDbContext NewDb()
    {
        var options = new DbContextOptionsBuilder<TecAxleDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.InMemoryEventId.TransactionIgnoredWarning))
            .Options;
        return new TecAxleDbContext(options);
    }

    public static CompanySettings SeedSettings(TecAxleDbContext db, Action<CompanySettings>? configure = null)
    {
        var s = new CompanySettings
        {
            // Defaults aligned with v13.5 DB defaults — tests override per scenario.
            LifecycleAutomationEnabled = true,
            AutoCreateOnboardingOnOfferAcceptance = true,
            CreateEmployeeInactiveAtOfferAcceptance = false,
            AutoActivateEmployeeOnOnboardingComplete = false,
            OnboardingCompletionRequiresAllRequiredTasks = true,
            OnboardingCompletionRequiresAllRequiredDocuments = false,
            AutoCreateTerminationOnResignationApproved = false,
            AutoCreateClearanceOnTermination = true,
            AutoSuspendEmployeeOnTerminationCreated = true,
            RequireClearanceCompleteBeforeFinalSettlement = false,
            AutoEnableFinalSettlementCalcOnClearanceComplete = false,
            AutoDeactivateEmployeeOnFinalSettlementPaid = true,
            ContractExpiredAction = "AutoMarkExpired",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test",
            ModifiedAtUtc = DateTime.UtcNow,
            ModifiedBy = "test"
        };
        configure?.Invoke(s);
        db.CompanySettings.Add(s);
        db.SaveChanges();
        return s;
    }

    public static Employee SeedEmployee(TecAxleDbContext db, long branchId = 1, Action<Employee>? configure = null)
    {
        var e = new Employee
        {
            EmployeeNumber = "E0001",
            FirstName = "Test", LastName = "Employee",
            BranchId = branchId,
            HireDate = new DateTime(2020, 1, 1),
            EmploymentStatus = EmploymentStatus.Active,
            IsActive = true,
            JobTitle = "Tester",
            WorkLocationType = WorkLocationType.OnSite,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        configure?.Invoke(e);
        db.Employees.Add(e);
        db.SaveChanges();
        return e;
    }

    public static ICurrentUser StubUser(long userId = 42, string username = "test-user")
    {
        var mock = new Mock<ICurrentUser>();
        mock.Setup(u => u.UserId).Returns(userId);
        mock.Setup(u => u.Username).Returns(username);
        mock.Setup(u => u.IsAuthenticated).Returns(true);
        mock.Setup(u => u.IsSystemAdmin).Returns(true); // bypass branch-scope checks
        mock.Setup(u => u.Roles).Returns(new ReadOnlyCollection<string>(new[] { "SystemAdmin" }));
        mock.Setup(u => u.Permissions).Returns(new ReadOnlyCollection<string>(Array.Empty<string>()));
        mock.Setup(u => u.BranchIds).Returns(new ReadOnlyCollection<long>(Array.Empty<long>()));
        mock.Setup(u => u.PreferredLanguage).Returns("en");
        return mock.Object;
    }

    public static INotificationRecipientResolver StubRecipients(params long[] userIds)
    {
        var mock = new Mock<INotificationRecipientResolver>();
        mock.Setup(r => r.GetRecipientUserIdsAsync(It.IsAny<CancellationToken>()))
            .ReturnsAsync(userIds);
        mock.Setup(r => r.GetRecipientUserIdsAsync(It.IsAny<IEnumerable<string>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(userIds);
        return mock.Object;
    }

    /// <summary>
    /// Count audit rows matching a given (source, type, status) filter. Used by every test.
    /// </summary>
    public static int CountAudits(TecAxleDbContext db, string sourceType, long sourceId,
        LifecycleAutomationType automationType, LifecycleAutomationStatus? status = null)
    {
        var q = db.LifecycleAutomationAudits
            .Where(a => a.SourceEntityType == sourceType
                     && a.SourceEntityId == sourceId
                     && a.AutomationType == automationType);
        if (status.HasValue) q = q.Where(a => a.Status == status.Value);
        return q.Count();
    }
}
