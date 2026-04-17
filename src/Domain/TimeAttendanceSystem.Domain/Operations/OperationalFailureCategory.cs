namespace TecAxle.Hrms.Domain.Operations;

public enum OperationalFailureCategory
{
    /// <summary>Lifecycle automation handler (v13.5) failed or missing prerequisite.</summary>
    LifecycleAutomation = 1,

    /// <summary>Workflow engine could not resolve an approver and fell through to FailedRouting.</summary>
    WorkflowRouting = 2,

    /// <summary>Phase 1 approval-to-execution step (Allowance/Loan/Advance/Expense/Benefit/Letter) failed.</summary>
    ApprovalExecution = 3,

    /// <summary>Payroll processing side-effect (loan linking, advance deduction, benefit deduction, etc.) failed.</summary>
    PayrollProcessing = 4,

    /// <summary>Background job failed in a way that blocks business flow.</summary>
    BackgroundJob = 5,

    /// <summary>Integration / external dependency failure (FCM, email, etc.).</summary>
    Integration = 6
}
