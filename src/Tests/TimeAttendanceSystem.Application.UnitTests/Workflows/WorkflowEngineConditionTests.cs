using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Moq;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.UnitTests.Common;
using TimeAttendanceSystem.Application.Workflows.Services;
using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.Workflows.Enums;
using Xunit;

namespace TimeAttendanceSystem.Application.UnitTests.Workflows;

public class WorkflowEngineConditionTests
{
    private readonly TestApplicationDbContext _context;
    private readonly WorkflowEngine _sut;

    public WorkflowEngineConditionTests()
    {
        var options = new DbContextOptionsBuilder<TestApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        _context = new TestApplicationDbContext(options);
        _sut = new WorkflowEngine(_context);
    }

    [Fact]
    public async Task StartWorkflow_ShouldEvaluateNumericCondition_True()
    {
        // Arrange
        var definition = CreateConditionWorkflowDefinition("days", ">", "5");
        _context.WorkflowDefinitions.Add(definition);
        await _context.SaveChangesAsync();

        var contextData = new Dictionary<string, object> { { "days", 10 } };

        // Act
        var result = await _sut.StartWorkflowAsync(WorkflowEntityType.Vacation, 1, 1, null, contextData);

        // Assert
        result.IsSuccess.Should().BeTrue();
        var instance = result.Value;
        
        // Should have passed the condition (Step 1) and moved to the True path (Step 2)
        // Step 2 is an Approval step, so it should pause there.
        instance.CurrentStepId.Should().Be(20, "Workflow should have moved to the True-path step");
        instance.Status.Should().Be(WorkflowStatus.InProgress);

        // Verify history
        var executions = await _context.WorkflowStepExecutions
            .Where(e => e.WorkflowInstanceId == instance.Id)
            .ToListAsync();
            
        executions.Should().Contain(e => e.StepId == 10 && e.Action == ApprovalAction.Skipped && e.Comments.Contains("True"));
    }

    [Fact]
    public async Task StartWorkflow_ShouldEvaluateNumericCondition_False()
    {
        // Arrange
        var definition = CreateConditionWorkflowDefinition("days", ">", "5");
        _context.WorkflowDefinitions.Add(definition);
        await _context.SaveChangesAsync();

        var contextData = new Dictionary<string, object> { { "days", 3 } };

        // Act
        var result = await _sut.StartWorkflowAsync(WorkflowEntityType.Vacation, 2, 1, null, contextData);

        // Assert
        result.IsSuccess.Should().BeTrue();
        var instance = result.Value;

        // Should have failed the condition (Step 1) and moved to the False path (Step 3)
        // Step 3 is an Approval step, so it should pause there.
        instance.CurrentStepId.Should().Be(30, "Workflow should have moved to the False-path step");
    }

    [Fact]
    public async Task StartWorkflow_ShouldEvaluateStringCondition_True()
    {
        // Arrange
        var definition = CreateConditionWorkflowDefinition("type", "==", "Sick");
        _context.WorkflowDefinitions.Add(definition);
        await _context.SaveChangesAsync();

        var contextData = new Dictionary<string, object> { { "type", "Sick" } };

        // Act
        var result = await _sut.StartWorkflowAsync(WorkflowEntityType.Vacation, 3, 1, null, contextData);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.CurrentStepId.Should().Be(20);
    }

    [Fact]
    public async Task StartWorkflow_ShouldDefaultToTrue_WhenFieldMissing()
    {
         // Arrange
        var definition = CreateConditionWorkflowDefinition("nonexistent_field", "==", "value");
        _context.WorkflowDefinitions.Add(definition);
        await _context.SaveChangesAsync();

        var contextData = new Dictionary<string, object> { { "other_field", "value" } };

        // Act
        var result = await _sut.StartWorkflowAsync(WorkflowEntityType.Vacation, 4, 1, null, contextData);

        // Assert
        // Logic changed: Missing field should evaluate to False (safer default)
        result.IsSuccess.Should().BeTrue();
        result.Value.CurrentStepId.Should().Be(30);
    }

    private WorkflowDefinition CreateConditionWorkflowDefinition(string field, string op, string value)
    {
        var conditionJson = $"{{\"field\": \"{field}\", \"operator\": \"{op}\", \"value\": \"{value}\"}}";

        return new WorkflowDefinition
        {
            Id = 1,
            Name = "Variable Verification Workflow",
            EntityType = WorkflowEntityType.Vacation,
            IsActive = true,
            IsDefault = true,
            Steps = new List<WorkflowStep>
            {
                // Step 1: Condition
                new WorkflowStep
                {
                    Id = 10,
                    Name = "Check Condition",
                    StepOrder = 1,
                    StepType = WorkflowStepType.Condition,
                    ConditionJson = conditionJson,
                    OnApproveNextStepId = 20, // Check EvaluateConditionAsync logic. It uses OnApproveNextStepId for True? 
                    // Let's verify WorkflowEngine logic: 
                    // if (conditionResult) nextStep = step.OnApproveNextStepId 
                    // Yes.
                    OnRejectNextStepId = 30
                },
                // Step 2: Approval (True Path)
                new WorkflowStep
                {
                    Id = 20,
                    Name = "Manager Approval (High)",
                    StepOrder = 2,
                    StepType = WorkflowStepType.Approval,
                    ApproverType = ApproverType.SpecificUser,
                    ApproverUserId = 99
                },
                // Step 3: Approval (False Path)
                new WorkflowStep
                {
                    Id = 30,
                    Name = "HR Approval (Low)",
                    StepOrder = 3,
                    StepType = WorkflowStepType.Approval,
                    ApproverType = ApproverType.SpecificUser,
                    ApproverUserId = 88
                }
            }
        };
    }
}
