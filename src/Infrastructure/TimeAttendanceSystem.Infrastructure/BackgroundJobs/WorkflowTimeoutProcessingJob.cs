using Coravel.Invocable;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Workflows.Services;

namespace TimeAttendanceSystem.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that runs hourly to process workflow step timeouts.
/// Implements Coravel's IInvocable interface for scheduled execution.
/// </summary>
/// <remarks>
/// This job checks for workflow step executions that have exceeded their timeout period
/// and processes them according to the configured TimeoutAction:
/// - Expire: Mark workflow as expired
/// - Escalate: Move to configured escalation step
/// - AutoApprove: Automatically approve and proceed
/// - AutoReject: Automatically reject the request
/// </remarks>
public class WorkflowTimeoutProcessingJob : IInvocable
{
    private readonly IWorkflowEngine _workflowEngine;
    private readonly ILogger<WorkflowTimeoutProcessingJob> _logger;

    public WorkflowTimeoutProcessingJob(
        IWorkflowEngine workflowEngine,
        ILogger<WorkflowTimeoutProcessingJob> logger)
    {
        _workflowEngine = workflowEngine;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting workflow timeout processing job at {Time}", DateTime.UtcNow);

        try
        {
            var processedCount = await _workflowEngine.ProcessTimeoutsAsync();

            if (processedCount > 0)
            {
                _logger.LogInformation(
                    "Workflow timeout processing completed. Processed {Count} timed out step(s)",
                    processedCount);
            }
            else
            {
                _logger.LogDebug("Workflow timeout processing completed. No timed out steps found.");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Fatal error during workflow timeout processing job");
            throw; // Re-throw to let Coravel handle the error
        }
    }
}
