using System.Reflection;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using TecAxle.Hrms.Api.Filters;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Entitlement.Tests;

/// <summary>
/// Reflection-based regression test that pins the set of controllers required to carry
/// <see cref="RequiresModuleEndpointAttribute"/> (i.e. the 22 controllers that the
/// entitlement-enforcement fix added the filter to). If any of them loses its attribute
/// in a future change, this test fails fast.
/// </summary>
public class ControllerCoverageTests
{
    private static readonly Assembly ApiAssembly =
        typeof(TecAxle.Hrms.Api.Filters.RequiresModuleEndpointAttribute).Assembly;

    public static IEnumerable<object[]> GuardedControllers() => new[]
    {
        // Recruitment
        new object[] { "JobRequisitionsController", SystemModule.Recruitment },
        new object[] { "JobPostingsController", SystemModule.Recruitment },
        new object[] { "CandidatesController", SystemModule.Recruitment },
        new object[] { "JobApplicationsController", SystemModule.Recruitment },
        new object[] { "InterviewSchedulesController", SystemModule.Recruitment },
        new object[] { "InterviewFeedbacksController", SystemModule.Recruitment },
        new object[] { "OfferLettersController", SystemModule.Recruitment },
        // Onboarding
        new object[] { "OnboardingTemplatesController", SystemModule.Onboarding },
        new object[] { "OnboardingProcessesController", SystemModule.Onboarding },
        new object[] { "OnboardingTasksController", SystemModule.Onboarding },
        // Performance
        new object[] { "PerformanceReviewCyclesController", SystemModule.Performance },
        new object[] { "PerformanceReviewsController", SystemModule.Performance },
        new object[] { "PerformanceImprovementPlansController", SystemModule.Performance },
        new object[] { "GoalDefinitionsController", SystemModule.Performance },
        new object[] { "CompetencyFrameworksController", SystemModule.Performance },
        new object[] { "FeedbackRequestsController", SystemModule.Performance },
        // Offboarding
        new object[] { "ExitInterviewsController", SystemModule.Offboarding },
        new object[] { "ClearanceController", SystemModule.Offboarding },
        // EmployeeLifecycle
        new object[] { "JobGradesController", SystemModule.EmployeeLifecycle },
        new object[] { "EmployeeDetailsController", SystemModule.EmployeeLifecycle },
        // Payroll
        new object[] { "PayrollSettingsController", SystemModule.Payroll },
        new object[] { "SalaryAdvancesController", SystemModule.Payroll },
        // Mobile schedule (direct-DB, TimeAttendance)
        new object[] { "MobileScheduleController", SystemModule.TimeAttendance }
    };

    [Theory]
    [MemberData(nameof(GuardedControllers))]
    public void Controller_HasRequiresModuleEndpointAttribute(string typeName, SystemModule expectedModule)
    {
        var type = ApiAssembly.GetTypes()
            .FirstOrDefault(t => t.Name == typeName && typeof(ControllerBase).IsAssignableFrom(t));

        type.Should().NotBeNull($"controller {typeName} must exist in the API assembly");

        var attr = type!.GetCustomAttribute<RequiresModuleEndpointAttribute>();
        attr.Should().NotBeNull($"controller {typeName} must be decorated with [RequiresModuleEndpoint]");
        attr!.Module.Should().Be(expectedModule, $"controller {typeName} must enforce the {expectedModule} module");
    }

    [Fact]
    public void EveryGetActionOnGuardedController_IsEitherAllowReadOnly_Or_ExplicitWriteVerb()
    {
        // Sanity check: on each guarded controller, every action with [HttpGet] should have
        // a companion [AllowModuleReadOnly]. Detail-light check — ensures the read-only
        // policy remains consistent across the codebase.
        var failures = new List<string>();

        foreach (var row in GuardedControllers())
        {
            var typeName = (string)row[0];
            var type = ApiAssembly.GetTypes().FirstOrDefault(t => t.Name == typeName);
            if (type == null) continue;

            foreach (var method in type.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly))
            {
                var isGet = method.GetCustomAttributes<HttpGetAttribute>(false).Any();
                if (!isGet) continue;

                var hasReadOnly = method.GetCustomAttribute<AllowModuleReadOnlyAttribute>() != null;
                if (!hasReadOnly)
                {
                    failures.Add($"{typeName}.{method.Name} is a GET action but lacks [AllowModuleReadOnly]");
                }
            }
        }

        failures.Should().BeEmpty(
            "every GET action on a guarded controller should allow historical read-only access after a downgrade");
    }
}
