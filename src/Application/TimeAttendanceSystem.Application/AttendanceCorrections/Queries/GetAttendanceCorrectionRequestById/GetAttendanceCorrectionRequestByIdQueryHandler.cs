using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequests;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Attendance;
using TimeAttendanceSystem.Domain.Excuses;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.AttendanceCorrections.Queries.GetAttendanceCorrectionRequestById;

/// <summary>
/// Query handler for retrieving a single attendance correction request by ID.
/// </summary>
public class GetAttendanceCorrectionRequestByIdQueryHandler : IRequestHandler<GetAttendanceCorrectionRequestByIdQuery, Result<AttendanceCorrectionRequestDto?>>
{
    private readonly IApplicationDbContext _context;

    public GetAttendanceCorrectionRequestByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<AttendanceCorrectionRequestDto?>> Handle(GetAttendanceCorrectionRequestByIdQuery request, CancellationToken cancellationToken)
    {
        var correctionRequest = await _context.AttendanceCorrectionRequests
            .AsNoTracking()
            .Include(acr => acr.Employee)
                .ThenInclude(e => e.Department)
            .Include(acr => acr.Employee)
                .ThenInclude(e => e.Branch)
            .Include(acr => acr.ApprovedBy)
            .FirstOrDefaultAsync(acr => acr.Id == request.Id, cancellationToken);

        if (correctionRequest == null)
        {
            return Result.Success<AttendanceCorrectionRequestDto?>(null);
        }

        // Get workflow instance for this request
        var workflow = await _context.WorkflowInstances
            .Include(wi => wi.CurrentStep)
                .ThenInclude(cs => cs!.ApproverRole)
            .Include(wi => wi.CurrentStep)
                .ThenInclude(cs => cs!.ApproverUser)
            .Include(wi => wi.WorkflowDefinition)
                .ThenInclude(wd => wd.Steps)
            .FirstOrDefaultAsync(wi => wi.EntityType == WorkflowEntityType.AttendanceCorrection && wi.EntityId == request.Id, cancellationToken);

        // Get step executions if workflow exists
        List<CorrectionApprovalStepDto>? approvalHistory = null;
        if (workflow != null)
        {
            var executions = await _context.WorkflowStepExecutions
                .Include(wse => wse.Step)
                .Include(wse => wse.AssignedToUser)
                .Include(wse => wse.ActionTakenByUser)
                .Where(wse => wse.WorkflowInstanceId == workflow.Id)
                .OrderBy(wse => wse.Step.StepOrder)
                .ThenBy(wse => wse.AssignedAt)
                .ToListAsync(cancellationToken);

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

        var dto = new AttendanceCorrectionRequestDto
        {
            Id = correctionRequest.Id,
            EmployeeId = correctionRequest.EmployeeId,
            EmployeeName = $"{correctionRequest.Employee.FirstName} {correctionRequest.Employee.LastName}",
            EmployeeNameAr = $"{correctionRequest.Employee.FirstNameAr} {correctionRequest.Employee.LastNameAr}",
            EmployeeNumber = correctionRequest.Employee.EmployeeNumber,
            DepartmentName = correctionRequest.Employee.Department?.Name ?? "",
            BranchName = correctionRequest.Employee.Branch?.Name ?? "",
            CorrectionDate = correctionRequest.CorrectionDate,
            CorrectionTime = correctionRequest.CorrectionTime,
            CorrectionType = correctionRequest.CorrectionType,
            CorrectionTypeDisplay = correctionRequest.CorrectionType == AttendanceCorrectionType.CheckIn ? "Check In" : "Check Out",
            Reason = correctionRequest.Reason,
            ApprovalStatus = correctionRequest.ApprovalStatus,
            ApprovalStatusDisplay = correctionRequest.ApprovalStatus.ToString(),
            ApprovedById = correctionRequest.ApprovedById,
            ApprovedByName = correctionRequest.ApprovedBy?.Username,
            ApprovedAt = correctionRequest.ApprovedAt,
            RejectionReason = correctionRequest.RejectionReason,
            AttachmentPath = correctionRequest.AttachmentPath,
            ProcessingNotes = correctionRequest.ProcessingNotes,
            CreatedTransactionId = correctionRequest.CreatedTransactionId,
            CreatedAtUtc = correctionRequest.CreatedAtUtc,
            CreatedBy = correctionRequest.CreatedBy,
            ModifiedAtUtc = correctionRequest.ModifiedAtUtc,
            ModifiedBy = correctionRequest.ModifiedBy,
            CanBeModified = correctionRequest.ApprovalStatus == ApprovalStatus.Pending,
            CorrectionSummary = $"{correctionRequest.CorrectionDate:MMM dd, yyyy} {correctionRequest.CorrectionTime:HH:mm} - {(correctionRequest.CorrectionType == AttendanceCorrectionType.CheckIn ? "Check In" : "Check Out")} - {correctionRequest.ApprovalStatus}",
            // Workflow information
            WorkflowInstanceId = workflow?.Id,
            WorkflowStatus = workflow?.Status.ToString(),
            CurrentApproverName = approverName,
            CurrentApproverRole = approverRole,
            CurrentStepOrder = currentStep?.StepOrder,
            TotalSteps = totalSteps > 0 ? totalSteps : null,
            ApprovalHistory = approvalHistory
        };

        return Result.Success<AttendanceCorrectionRequestDto?>(dto);
    }
}
