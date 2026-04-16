using FluentAssertions;
using TecAxle.Hrms.Application.Workflows.Services;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Workflow.Tests;

/// <summary>
/// v13.6 — snapshot helper round-trip + enum additions sanity.
/// </summary>
public class SnapshotAndEnumTests
{
    [Fact]
    public void Snapshot_Serialize_CapturesAllRelevantFields()
    {
        var def = new WorkflowDefinition
        {
            Id = 42,
            Version = 7,
            Name = "Vacation Flow",
            EntityType = WorkflowEntityType.Vacation,
            BranchId = 3,
            Steps = new List<WorkflowStep>
            {
                new()
                {
                    Id = 101, StepOrder = 1, Name = "Direct Manager",
                    StepType = WorkflowStepType.Approval,
                    ApproverType = ApproverType.DirectManager,
                    RoleAssignmentStrategy = RoleAssignmentStrategy.LeastPendingApprovals,
                    AllowReturnForCorrection = true,
                    ValidationRuleCode = null
                },
                new()
                {
                    Id = 102, StepOrder = 2, Name = "Department Head",
                    StepType = WorkflowStepType.Approval,
                    ApproverType = ApproverType.DepartmentHead,
                    RoleAssignmentStrategy = RoleAssignmentStrategy.FirstMatch
                }
            }
        };

        var json = WorkflowDefinitionSnapshot.Serialize(def);
        json.Should().Contain("\"definitionVersion\":7");
        json.Should().Contain("\"entityType\":1");
        json.Should().Contain("\"name\":\"Vacation Flow\"");
        json.Should().Contain("\"stepOrder\":1");
        json.Should().Contain("\"allowReturnForCorrection\":true");

        var back = WorkflowDefinitionSnapshot.Deserialize(json);
        back.Should().NotBeNull();
        back!.SchemaVersion.Should().Be(1);
        back.DefinitionVersion.Should().Be(7);
        back.Steps.Should().HaveCount(2);
        back.Steps[0].AllowReturnForCorrection.Should().BeTrue();
    }

    [Fact]
    public void Snapshot_Deserialize_EmptyReturnsNull()
    {
        WorkflowDefinitionSnapshot.Deserialize("{}").Should().BeNull();
        WorkflowDefinitionSnapshot.Deserialize(null).Should().BeNull();
        WorkflowDefinitionSnapshot.Deserialize("").Should().BeNull();
    }

    [Fact]
    public void NewEnumValues_AreDistinct()
    {
        // ApprovalAction — new values don't collide with old ones
        ((int)ApprovalAction.ReturnedForCorrection).Should().Be(9);
        ((int)ApprovalAction.FailedNoApprover).Should().Be(10);
        ((int)ApprovalAction.Resubmitted).Should().Be(11);

        // WorkflowStatus — additive
        ((int)WorkflowStatus.ReturnedForCorrection).Should().Be(8);
        ((int)WorkflowStatus.FailedRouting).Should().Be(9);

        // RoleAssignmentStrategy default value 3 = LeastPendingApprovals
        ((int)RoleAssignmentStrategy.LeastPendingApprovals).Should().Be(3);
    }

    [Fact]
    public void IsTerminated_ExcludesReturnedForCorrection_IncludesFailedRouting()
    {
        var i = new WorkflowInstance { Status = WorkflowStatus.ReturnedForCorrection };
        i.IsTerminated().Should().BeFalse("ReturnedForCorrection is non-terminal; requester can resubmit");

        i.Status = WorkflowStatus.FailedRouting;
        i.IsTerminated().Should().BeTrue("FailedRouting is terminal and requires HR remediation");
    }

    [Fact]
    public void ReturnForCorrection_TransitionsStateCorrectly()
    {
        var i = new WorkflowInstance { Status = WorkflowStatus.InProgress, CurrentStepId = 5, ResubmissionCount = 0 };
        i.ReturnForCorrection(approverUserId: 42, comments: "please add medical cert");
        i.Status.Should().Be(WorkflowStatus.ReturnedForCorrection);
        i.ReturnedByUserId.Should().Be(42);
        i.CurrentStepId.Should().BeNull();
        i.FinalComments.Should().Contain("medical cert");
        i.ResubmissionCount.Should().Be(0, "counter doesn't increment on return — only on resubmit");
    }

    [Fact]
    public void RecordResubmission_IncrementsCountAndResumesProgress()
    {
        var i = new WorkflowInstance { Status = WorkflowStatus.ReturnedForCorrection, ResubmissionCount = 0 };
        i.RecordResubmission();
        i.Status.Should().Be(WorkflowStatus.InProgress);
        i.ResubmissionCount.Should().Be(1);

        i.Status = WorkflowStatus.ReturnedForCorrection;
        i.RecordResubmission();
        i.ResubmissionCount.Should().Be(2);
    }
}
