using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Documents;

public class LetterRequest : BaseEntity
{
    public long EmployeeId { get; set; }
    public LetterType LetterType { get; set; }
    public string? Purpose { get; set; }
    public string? PurposeAr { get; set; }
    public string? AdditionalNotes { get; set; }
    public LetterRequestStatus Status { get; set; } = LetterRequestStatus.Pending;
    public string? RejectionReason { get; set; }
    public string? GeneratedDocumentUrl { get; set; }
    public DateTime? GeneratedAt { get; set; }
    public long? TemplateId { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Phase 1 (v14.1): Execution tracking.
    // The LetterRequestExecutor renders the configured template, writes the output file,
    // sets GeneratedDocumentUrl, and transitions Status to Generated.
    public bool IsExecuted { get; set; }
    public DateTime? ExecutedAtUtc { get; set; }
    public long? ExecutedByUserId { get; set; }
    public string? ExecutionError { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public LetterTemplate? Template { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
