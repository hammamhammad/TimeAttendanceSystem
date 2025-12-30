using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using TimeAttendanceSystem.Application.UnitTests.Common;
using TimeAttendanceSystem.Application.Workflows.Services;
using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.Workflows.Enums;
using Xunit;

namespace TimeAttendanceSystem.Application.UnitTests.Workflows;

public class WorkflowEngineTests : IDisposable
{
    private readonly TestApplicationDbContext _context;
    private readonly WorkflowEngine _sut;

    public WorkflowEngineTests()
    {
        var options = new DbContextOptionsBuilder<TestApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        _context = new TestApplicationDbContext(options);
        _sut = new WorkflowEngine(_context);
    }
    
    [Fact]
    public async Task StartWorkflowAsync_ShouldFail_WhenNoDefinitionExists()
    {
        // Act
        var result = await _sut.StartWorkflowAsync(WorkflowEntityType.Vacation, 1, 1);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Contain("No active workflow definition found");
    }

    [Fact]
    public async Task StartWorkflowAsync_ShouldSucceed_WhenDefinitionExists()
    {
        // Arrange
        var definition = new WorkflowDefinition
        {
            Name = "Test Workflow",
            EntityType = WorkflowEntityType.Vacation,
            IsActive = true,
            IsDefault = true,
            Steps = new List<WorkflowStep>
            {
                new() { Name = "Step 1", StepOrder = 1, StepType = WorkflowStepType.Approval, ApproverType = ApproverType.SpecificUser, ApproverUserId = 99 }
            }
        };
        _context.WorkflowDefinitions.Add(definition);
        await _context.SaveChangesAsync();

        // Act
        var result = await _sut.StartWorkflowAsync(WorkflowEntityType.Vacation, 100, 1);

        // Assert
        result.IsSuccess.Should().BeTrue(result.Error);
        result.Value.Should().NotBeNull();
        result.Value!.Status.Should().Be(WorkflowStatus.InProgress);
        result.Value.CurrentStepId.Should().BePositive();
    }

    [Fact]
    public async Task ApproveAsync_ShouldCompleteWorkflow_WhenLastStep()
    {
        // Arrange
        var definition = new WorkflowDefinition
        {
            Name = "Test Workflow",
            EntityType = WorkflowEntityType.Vacation,
            IsActive = true,
            IsDefault = true,
            Steps = new List<WorkflowStep>
            {
                new() { Name = "Step 1", StepOrder = 1, StepType = WorkflowStepType.Approval, ApproverType = ApproverType.SpecificUser, ApproverUserId = 99 }
            }
        };
        _context.WorkflowDefinitions.Add(definition);
        await _context.SaveChangesAsync();

        var startResult = await _sut.StartWorkflowAsync(WorkflowEntityType.Vacation, 100, 1);
        startResult.IsSuccess.Should().BeTrue(startResult.Error);
        var instanceId = startResult.Value!.Id;

        // Act
        var approveResult = await _sut.ApproveAsync(instanceId, 99, "Approved");

        // Assert
        approveResult.IsSuccess.Should().BeTrue(approveResult.Error);

        var instance = await _context.WorkflowInstances.FindAsync(instanceId);
        instance!.Status.Should().Be(WorkflowStatus.Approved);
        instance.FinalOutcome.Should().Be(ApprovalAction.Approved);
    }

    [Fact]
    public async Task RejectAsync_ShouldTerminateWorkflow_Immediately()
    {
        // Arrange
        var definition = new WorkflowDefinition
        {
            Name = "Multi Step Workflow",
            EntityType = WorkflowEntityType.Vacation,
            IsActive = true,
            IsDefault = true,
            Steps = new List<WorkflowStep>
            {
                new() { Name = "Step 1", StepOrder = 1, StepType = WorkflowStepType.Approval, ApproverType = ApproverType.SpecificUser, ApproverUserId = 99 },
                new() { Name = "Step 2", StepOrder = 2, StepType = WorkflowStepType.Approval, ApproverType = ApproverType.SpecificUser, ApproverUserId = 99 }
            }
        };
        _context.WorkflowDefinitions.Add(definition);
        await _context.SaveChangesAsync();

        var startResult = await _sut.StartWorkflowAsync(WorkflowEntityType.Vacation, 100, 1);
        startResult.IsSuccess.Should().BeTrue(startResult.Error);
        var instanceId = startResult.Value!.Id;

        // Act
        var rejectResult = await _sut.RejectAsync(instanceId, 99, "Rejected!");

        // Assert
        rejectResult.IsSuccess.Should().BeTrue(rejectResult.Error);

        var instance = await _context.WorkflowInstances.FindAsync(instanceId);
        instance!.Status.Should().Be(WorkflowStatus.Rejected);
        instance.FinalOutcome.Should().Be(ApprovalAction.Rejected);
    }

    public void Dispose()
    {
        // InMemory Db uses unique names per instance if configured correctly, 
        // or effectively disposed when references are gone.
    }
}
