using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequests;

/// <summary>
/// Query handler for retrieving attendance correction requests with filtering and pagination.
/// Implements comprehensive filtering and efficient data projection.
/// </summary>
public class GetAttendanceCorrectionRequestsQueryHandler : IRequestHandler<GetAttendanceCorrectionRequestsQuery, Result<PagedResult<AttendanceCorrectionRequestDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetAttendanceCorrectionRequestsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the retrieval of attendance correction requests with applied filters and pagination.
    /// </summary>
    /// <param name="request">Query parameters including filters and pagination</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of attendance correction request DTOs</returns>
    public async Task<Result<PagedResult<AttendanceCorrectionRequestDto>>> Handle(GetAttendanceCorrectionRequestsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.AttendanceCorrectionRequests
            .AsNoTracking()
            .Include(acr => acr.Employee)
                .ThenInclude(e => e.Department)
            .Include(acr => acr.Employee)
                .ThenInclude(e => e.Branch)
            .Include(acr => acr.ApprovedBy)
            .AsQueryable();

        // Apply employee filter if specified
        if (request.EmployeeId.HasValue)
        {
            query = query.Where(acr => acr.EmployeeId == request.EmployeeId.Value);
        }

        // Apply date range filters
        if (request.StartDate.HasValue)
        {
            query = query.Where(acr => acr.CorrectionDate.Date >= request.StartDate.Value.Date);
        }

        if (request.EndDate.HasValue)
        {
            query = query.Where(acr => acr.CorrectionDate.Date <= request.EndDate.Value.Date);
        }

        // Apply correction type filter if specified
        if (request.CorrectionType.HasValue)
        {
            query = query.Where(acr => acr.CorrectionType == request.CorrectionType.Value);
        }

        // Apply approval status filter if specified
        if (request.ApprovalStatus.HasValue)
        {
            query = query.Where(acr => acr.ApprovalStatus == request.ApprovalStatus.Value);
        }

        // Apply branch filter if specified
        if (request.BranchId.HasValue)
        {
            query = query.Where(acr => acr.Employee.BranchId == request.BranchId.Value);
        }

        // Order by correction date (newest first), then by creation time
        query = query.OrderByDescending(acr => acr.CorrectionDate)
                    .ThenByDescending(acr => acr.CreatedAtUtc);

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Get request IDs first for pagination
        var requestIds = await query
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(acr => acr.Id)
            .ToListAsync(cancellationToken);

        // Get workflow instances for these requests
        var workflowInstances = await _context.WorkflowInstances
            .Include(wi => wi.CurrentStep)
                .ThenInclude(cs => cs!.ApproverRole)
            .Include(wi => wi.CurrentStep)
                .ThenInclude(cs => cs!.ApproverUser)
            .Include(wi => wi.WorkflowDefinition)
                .ThenInclude(wd => wd.Steps)
            .Where(wi => wi.EntityType == WorkflowEntityType.AttendanceCorrection && requestIds.Contains(wi.EntityId))
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

        // Get the correction request items
        var correctionItems = await query
            .Where(acr => requestIds.Contains(acr.Id))
            .Select(acr => new
            {
                acr.Id,
                acr.EmployeeId,
                EmployeeName = $"{acr.Employee.FirstName} {acr.Employee.LastName}",
                EmployeeNameAr = $"{acr.Employee.FirstNameAr} {acr.Employee.LastNameAr}",
                acr.Employee.EmployeeNumber,
                DepartmentName = acr.Employee.Department != null ? acr.Employee.Department.Name : "",
                BranchName = acr.Employee.Branch != null ? acr.Employee.Branch.Name : "",
                acr.CorrectionDate,
                acr.CorrectionTime,
                acr.CorrectionType,
                acr.Reason,
                acr.ApprovalStatus,
                acr.ApprovedById,
                ApprovedByName = acr.ApprovedBy != null ? acr.ApprovedBy.Username : null,
                acr.ApprovedAt,
                acr.RejectionReason,
                acr.AttachmentPath,
                acr.ProcessingNotes,
                acr.CreatedTransactionId,
                acr.CreatedAtUtc,
                acr.CreatedBy,
                acr.ModifiedAtUtc,
                acr.ModifiedBy
            })
            .ToListAsync(cancellationToken);

        // Map to DTOs with workflow info
        var corrections = correctionItems.Select(acr =>
        {
            workflowLookup.TryGetValue(acr.Id, out var workflow);
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
            List<CorrectionApprovalStepDto>? approvalHistory = null;
            if (workflow != null && stepExecutionLookup.TryGetValue(workflow.Id, out var executions))
            {
                approvalHistory = executions.Select(exec => new CorrectionApprovalStepDto
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

            return new AttendanceCorrectionRequestDto
            {
                Id = acr.Id,
                EmployeeId = acr.EmployeeId,
                EmployeeName = acr.EmployeeName,
                EmployeeNameAr = acr.EmployeeNameAr,
                EmployeeNumber = acr.EmployeeNumber,
                DepartmentName = acr.DepartmentName,
                BranchName = acr.BranchName,
                CorrectionDate = acr.CorrectionDate,
                CorrectionTime = acr.CorrectionTime,
                CorrectionType = acr.CorrectionType,
                CorrectionTypeDisplay = acr.CorrectionType == AttendanceCorrectionType.CheckIn ? "Check In" : "Check Out",
                Reason = acr.Reason,
                ApprovalStatus = acr.ApprovalStatus,
                ApprovalStatusDisplay = acr.ApprovalStatus.ToString(),
                ApprovedById = acr.ApprovedById,
                ApprovedByName = acr.ApprovedByName,
                ApprovedAt = acr.ApprovedAt,
                RejectionReason = acr.RejectionReason,
                AttachmentPath = acr.AttachmentPath,
                ProcessingNotes = acr.ProcessingNotes,
                CreatedTransactionId = acr.CreatedTransactionId,
                CreatedAtUtc = acr.CreatedAtUtc,
                CreatedBy = acr.CreatedBy,
                ModifiedAtUtc = acr.ModifiedAtUtc,
                ModifiedBy = acr.ModifiedBy,
                CanBeModified = acr.ApprovalStatus == ApprovalStatus.Pending,
                CorrectionSummary = $"{acr.CorrectionDate:MMM dd, yyyy} {acr.CorrectionTime:HH:mm} - {(acr.CorrectionType == AttendanceCorrectionType.CheckIn ? "Check In" : "Check Out")} - {acr.ApprovalStatus}",
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

        var result = new PagedResult<AttendanceCorrectionRequestDto>(
            corrections,
            totalCount,
            request.PageNumber,
            request.PageSize
        );

        return Result.Success(result);
    }
}
