using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuses;

/// <summary>
/// Query handler for retrieving employee excuse requests with filtering and pagination.
/// Implements comprehensive filtering and efficient data projection.
/// </summary>
public class GetEmployeeExcusesQueryHandler : IRequestHandler<GetEmployeeExcusesQuery, Result<PagedResult<EmployeeExcuseDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetEmployeeExcusesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the retrieval of employee excuses with applied filters and pagination.
    /// </summary>
    /// <param name="request">Query parameters including filters and pagination</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of employee excuse DTOs</returns>
    public async Task<Result<PagedResult<EmployeeExcuseDto>>> Handle(GetEmployeeExcusesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.EmployeeExcuses
            .AsNoTracking()
            .Include(ee => ee.Employee)
                .ThenInclude(e => e.Department)
            .Include(ee => ee.Employee)
                .ThenInclude(e => e.Branch)
            .Include(ee => ee.ApprovedBy)
            .AsQueryable();

        // Apply employee filter if specified
        if (request.EmployeeId.HasValue)
        {
            query = query.Where(ee => ee.EmployeeId == request.EmployeeId.Value);
        }

        // Apply date range filters
        if (request.StartDate.HasValue)
        {
            query = query.Where(ee => ee.ExcuseDate.Date >= request.StartDate.Value.Date);
        }

        if (request.EndDate.HasValue)
        {
            query = query.Where(ee => ee.ExcuseDate.Date <= request.EndDate.Value.Date);
        }

        // Apply excuse type filter if specified
        if (request.ExcuseType.HasValue)
        {
            query = query.Where(ee => ee.ExcuseType == request.ExcuseType.Value);
        }

        // Apply approval status filter if specified
        if (request.ApprovalStatus.HasValue)
        {
            query = query.Where(ee => ee.ApprovalStatus == request.ApprovalStatus.Value);
        }

        // Apply branch filter if specified
        if (request.BranchId.HasValue)
        {
            query = query.Where(ee => ee.Employee.BranchId == request.BranchId.Value);
        }

        // Order by excuse date (newest first), then by creation time
        query = query.OrderByDescending(ee => ee.ExcuseDate)
                    .ThenByDescending(ee => ee.CreatedAtUtc);

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Get excuse IDs first for pagination
        var excuseIds = await query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(ee => ee.Id)
            .ToListAsync(cancellationToken);

        // Get workflow instances for these excuses
        var workflowInstances = await _context.WorkflowInstances
            .Include(wi => wi.CurrentStep)
                .ThenInclude(cs => cs!.ApproverRole)
            .Include(wi => wi.CurrentStep)
                .ThenInclude(cs => cs!.ApproverUser)
            .Include(wi => wi.WorkflowDefinition)
                .ThenInclude(wd => wd.Steps)
            .Where(wi => wi.EntityType == WorkflowEntityType.Excuse && excuseIds.Contains(wi.EntityId))
            .ToListAsync(cancellationToken);

        // Create a lookup dictionary for workflow info
        var workflowLookup = workflowInstances.ToDictionary(wi => wi.EntityId);

        // Get workflow instance IDs for step executions
        var workflowInstanceIds = workflowInstances.Select(wi => wi.Id).ToList();

        // Get all step executions for these workflow instances
        var stepExecutions = await _context.WorkflowStepExecutions
            .Include(wse => wse.Step)
            .Include(wse => wse.AssignedToUser)
            .Include(wse => wse.ActionTakenByUser)
            .Where(wse => workflowInstanceIds.Contains(wse.WorkflowInstanceId))
            .OrderBy(wse => wse.Step.StepOrder)
            .ThenBy(wse => wse.AssignedAt)
            .ToListAsync(cancellationToken);

        // Create a lookup dictionary for step executions by workflow instance ID
        var stepExecutionLookup = stepExecutions
            .GroupBy(se => se.WorkflowInstanceId)
            .ToDictionary(g => g.Key, g => g.ToList());

        // Get the excuse items
        var excuseItems = await query
            .Where(ee => excuseIds.Contains(ee.Id))
            .Select(ee => new
            {
                ee.Id,
                ee.EmployeeId,
                EmployeeName = $"{ee.Employee.FirstName} {ee.Employee.LastName}",
                ee.Employee.EmployeeNumber,
                DepartmentName = ee.Employee.Department != null ? ee.Employee.Department.Name : "",
                BranchName = ee.Employee.Branch != null ? ee.Employee.Branch.Name : "",
                ee.ExcuseDate,
                ee.ExcuseType,
                ee.StartTime,
                ee.EndTime,
                ee.DurationHours,
                ee.Reason,
                ee.ApprovalStatus,
                ee.ApprovedById,
                ApprovedByName = ee.ApprovedBy != null ? ee.ApprovedBy.Username : null,
                ee.ApprovedAt,
                ee.RejectionReason,
                ee.AttachmentPath,
                ee.AffectsSalary,
                ee.ProcessingNotes,
                ee.CreatedAtUtc,
                ee.CreatedBy,
                ee.ModifiedAtUtc,
                ee.ModifiedBy
            })
            .ToListAsync(cancellationToken);

        // Map to DTOs with workflow info
        var excuses = excuseItems.Select(ee =>
        {
            workflowLookup.TryGetValue(ee.Id, out var workflow);
            var currentStep = workflow?.CurrentStep;
            var totalSteps = workflow?.WorkflowDefinition?.Steps?.Count ?? 0;

            string? approverName = null;
            string? approverRole = null;

            if (currentStep != null)
            {
                if (currentStep.ApproverType == ApproverType.DirectManager)
                {
                    approverRole = "Direct Manager";
                }
                else if (currentStep.ApproverType == ApproverType.DepartmentHead)
                {
                    approverRole = "Department Head";
                }
                else if (currentStep.ApproverType == ApproverType.Role && currentStep.ApproverRole != null)
                {
                    approverRole = currentStep.ApproverRole.Name;
                }
                else if (currentStep.ApproverType == ApproverType.SpecificUser && currentStep.ApproverUser != null)
                {
                    approverName = currentStep.ApproverUser.Username;
                }
            }

            // Build approval history
            List<ExcuseApprovalStepDto>? approvalHistory = null;
            if (workflow != null && stepExecutionLookup.TryGetValue(workflow.Id, out var executions))
            {
                approvalHistory = executions.Select(exec => new ExcuseApprovalStepDto
                {
                    StepOrder = exec.Step.StepOrder,
                    StepName = exec.Step.Name ?? $"Step {exec.Step.StepOrder}",
                    Status = exec.Action?.ToString() ?? "Pending",
                    AssignedToName = exec.AssignedToUser?.Username ?? "Unknown",
                    ActionByName = exec.ActionTakenByUser?.Username,
                    AssignedAt = exec.AssignedAt,
                    ActionAt = exec.ActionTakenAt,
                    Comments = exec.Comments
                }).ToList();
            }

            return new EmployeeExcuseDto
            {
                Id = ee.Id,
                EmployeeId = ee.EmployeeId,
                EmployeeName = ee.EmployeeName,
                EmployeeNumber = ee.EmployeeNumber,
                DepartmentName = ee.DepartmentName,
                BranchName = ee.BranchName,
                ExcuseDate = ee.ExcuseDate,
                ExcuseType = ee.ExcuseType,
                ExcuseTypeDisplay = ee.ExcuseType == ExcuseType.PersonalExcuse ? "Personal Excuse" : "Official Duty",
                StartTime = ee.StartTime,
                EndTime = ee.EndTime,
                TimeRange = $"{ee.StartTime:HH:mm} - {ee.EndTime:HH:mm}",
                DurationHours = ee.DurationHours,
                Reason = ee.Reason,
                ApprovalStatus = ee.ApprovalStatus,
                ApprovalStatusDisplay = ee.ApprovalStatus.ToString(),
                ApprovedById = ee.ApprovedById,
                ApprovedByName = ee.ApprovedByName,
                ApprovedAt = ee.ApprovedAt,
                RejectionReason = ee.RejectionReason,
                AttachmentPath = ee.AttachmentPath,
                AffectsSalary = ee.AffectsSalary,
                ProcessingNotes = ee.ProcessingNotes,
                CreatedAtUtc = ee.CreatedAtUtc,
                CreatedBy = ee.CreatedBy,
                ModifiedAtUtc = ee.ModifiedAtUtc,
                ModifiedBy = ee.ModifiedBy,
                CanBeModified = ee.ApprovalStatus != ApprovalStatus.Approved && ee.ExcuseDate.Date >= DateTime.Today,
                ExcuseSummary = $"{ee.ExcuseDate:MMM dd, yyyy} {ee.StartTime:HH:mm} - {ee.EndTime:HH:mm} ({ee.DurationHours:F1}h) - {(ee.ExcuseType == ExcuseType.PersonalExcuse ? "Personal" : "Official Duty")} - {ee.ApprovalStatus}",
                // Workflow information
                WorkflowInstanceId = workflow?.Id,
                WorkflowStatus = workflow?.Status.ToString(),
                CurrentApproverName = approverName,
                CurrentApproverRole = approverRole,
                CurrentStepOrder = currentStep?.StepOrder,
                TotalSteps = totalSteps > 0 ? totalSteps : null,
                ApprovalHistory = approvalHistory
            };
        }).ToList();

        var result = new PagedResult<EmployeeExcuseDto>(
            excuses,
            totalCount,
            request.PageNumber,
            request.PageSize
        );

        return Result.Success(result);
    }
}