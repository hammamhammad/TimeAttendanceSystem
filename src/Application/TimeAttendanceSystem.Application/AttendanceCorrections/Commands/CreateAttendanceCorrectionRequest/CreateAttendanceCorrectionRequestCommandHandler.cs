using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Workflows.Services;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Excuses;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.AttendanceCorrections.Commands.CreateAttendanceCorrectionRequest;

/// <summary>
/// Command handler for creating attendance correction requests.
/// Implements validation, workflow integration, and attendance correction management.
/// </summary>
public class CreateAttendanceCorrectionRequestCommandHandler : IRequestHandler<CreateAttendanceCorrectionRequestCommand, Result<long>>
{
    private readonly IApplicationDbContext _context;
    private readonly IWorkflowEngine _workflowEngine;
    private readonly ICurrentUser _currentUser;

    public CreateAttendanceCorrectionRequestCommandHandler(
        IApplicationDbContext context,
        IWorkflowEngine workflowEngine,
        ICurrentUser currentUser)
    {
        _context = context;
        _workflowEngine = workflowEngine;
        _currentUser = currentUser;
    }

    /// <summary>
    /// Handles the creation of a new attendance correction request with full validation and workflow integration.
    /// </summary>
    /// <param name="request">Command containing correction details</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result containing the created correction request ID or validation errors</returns>
    public async Task<Result<long>> Handle(CreateAttendanceCorrectionRequestCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = _currentUser.UserId ?? 0;
        var isOnBehalfOf = request.OnBehalfOfEmployeeId.HasValue;
        var targetEmployeeId = request.EmployeeId;

        // If submitting on behalf of another employee, validate manager chain
        if (isOnBehalfOf)
        {
            var isInChain = await IsInManagementChainAsync(currentUserId, request.OnBehalfOfEmployeeId!.Value, cancellationToken);
            if (!isInChain)
            {
                return Result.Failure<long>("You can only submit requests on behalf of employees in your management chain");
            }
            targetEmployeeId = request.OnBehalfOfEmployeeId.Value;
        }

        // Validate employee exists and is active
        var employee = await _context.Employees
            .Include(e => e.Branch)
            .FirstOrDefaultAsync(e => e.Id == targetEmployeeId, cancellationToken);

        if (employee == null)
        {
            return Result.Failure<long>("Employee not found");
        }

        // Validate correction date is not in the future
        if (request.CorrectionDate.Date > DateTime.Today)
        {
            return Result.Failure<long>("Correction date cannot be in the future");
        }

        // Retroactive limit driven by tenant configuration
        // (TenantSettings.AttendanceCorrectionMaxRetroactiveDays, default 30).
        var settings = await _context.TenantSettings.AsNoTracking().FirstOrDefaultAsync(cancellationToken);
        var maxRetroactiveDays = settings?.AttendanceCorrectionMaxRetroactiveDays > 0
            ? settings.AttendanceCorrectionMaxRetroactiveDays
            : 30;

        var daysDiff = (DateTime.Today - request.CorrectionDate.Date).Days;
        if (daysDiff > maxRetroactiveDays)
        {
            return Result.Failure<long>($"Cannot create correction request more than {maxRetroactiveDays} days in the past");
        }

        // Check for duplicate pending correction requests for same employee, date, and type
        var existingPendingCorrection = await _context.AttendanceCorrectionRequests
            .AnyAsync(acr => acr.EmployeeId == targetEmployeeId
                && acr.CorrectionDate.Date == request.CorrectionDate.Date
                && acr.CorrectionType == request.CorrectionType
                && acr.ApprovalStatus == ApprovalStatus.Pending
                && !acr.IsDeleted, cancellationToken);

        if (existingPendingCorrection)
        {
            var correctionTypeName = request.CorrectionType == AttendanceCorrectionType.CheckIn ? "Check-In" : "Check-Out";
            return Result.Failure<long>($"A pending {correctionTypeName} correction request already exists for this date");
        }

        // Create correction request entity - ALWAYS pending workflow approval
        var correctionRequest = new AttendanceCorrectionRequest
        {
            EmployeeId = targetEmployeeId,
            CorrectionDate = request.CorrectionDate.Date,
            CorrectionTime = request.CorrectionTime,
            CorrectionType = request.CorrectionType,
            Reason = request.Reason,
            AttachmentPath = request.AttachmentPath,
            ProcessingNotes = isOnBehalfOf
                ? $"{request.ProcessingNotes}\n[Submitted on behalf by user ID: {currentUserId}]"
                : request.ProcessingNotes,
            ApprovalStatus = ApprovalStatus.Pending,
            SubmittedByUserId = currentUserId
        };

        // Validate correction request business rules
        var (isValid, errors) = correctionRequest.ValidateRequest();
        if (!isValid)
        {
            return Result.Failure<long>(string.Join(", ", errors));
        }

        // Add correction request to context
        _context.AttendanceCorrectionRequests.Add(correctionRequest);

        // Save changes to get the correction request ID
        await _context.SaveChangesAsync(cancellationToken);

        // Start workflow for approval
        var contextData = new Dictionary<string, object>
        {
            { "correctionDate", correctionRequest.CorrectionDate.ToString("yyyy-MM-dd") },
            { "correctionTime", correctionRequest.CorrectionTime.ToString() },
            { "correctionType", correctionRequest.CorrectionType.ToString() }
        };

        var workflowResult = await _workflowEngine.StartWorkflowAsync(
            WorkflowEntityType.AttendanceCorrection,
            correctionRequest.Id,
            currentUserId,
            employee.BranchId,
            contextData);

        if (!workflowResult.IsSuccess)
        {
            // Workflow start failed - delete the correction request and return error
            _context.AttendanceCorrectionRequests.Remove(correctionRequest);
            await _context.SaveChangesAsync(cancellationToken);
            return Result.Failure<long>($"Failed to start approval workflow: {workflowResult.Error}");
        }

        // Update correction request with workflow instance ID
        correctionRequest.WorkflowInstanceId = workflowResult.Value.Id;
        await _context.SaveChangesAsync(cancellationToken);

        // Auto-approve manager's step if submitted on behalf and manager is assigned to current step
        if (isOnBehalfOf && workflowResult.Value.Id > 0)
        {
            var canApprove = await _workflowEngine.CanUserApproveAsync(workflowResult.Value.Id, currentUserId);
            if (canApprove)
            {
                await _workflowEngine.ApproveAsync(
                    workflowResult.Value.Id,
                    currentUserId,
                    "Auto-approved: Request submitted by manager on behalf of employee");
            }
        }

        return Result.Success(correctionRequest.Id);
    }

    /// <summary>
    /// Checks if the current user is in the employee's management chain (recursive).
    /// </summary>
    /// <param name="userId">User ID of the potential manager</param>
    /// <param name="employeeId">Employee ID to check</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if user is in the management chain</returns>
    private async Task<bool> IsInManagementChainAsync(long userId, long employeeId, CancellationToken cancellationToken)
    {
        // Get the employee link for the current user
        var userEmployeeLink = await _context.EmployeeUserLinks
            .FirstOrDefaultAsync(eul => eul.UserId == userId, cancellationToken);

        if (userEmployeeLink == null)
            return false;

        var managerEmployeeId = userEmployeeLink.EmployeeId;

        // Get the target employee
        var currentEmployee = await _context.Employees
            .FirstOrDefaultAsync(e => e.Id == employeeId, cancellationToken);

        // Traverse up the management chain
        while (currentEmployee != null)
        {
            if (currentEmployee.ManagerEmployeeId == managerEmployeeId)
                return true;

            if (!currentEmployee.ManagerEmployeeId.HasValue)
                break;

            currentEmployee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Id == currentEmployee.ManagerEmployeeId, cancellationToken);
        }

        return false;
    }
}
