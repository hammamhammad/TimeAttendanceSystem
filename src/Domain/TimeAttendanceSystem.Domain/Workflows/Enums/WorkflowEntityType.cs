namespace TecAxle.Hrms.Domain.Workflows.Enums;

/// <summary>
/// Defines the types of entities that can have workflow-based approval processes.
/// Each entity type can have its own workflow definition and approval chain.
/// </summary>
public enum WorkflowEntityType
{
    /// <summary>
    /// Vacation/Leave request workflow.
    /// Supports vacation requests, annual leave, sick leave, etc.
    /// </summary>
    Vacation = 1,

    /// <summary>
    /// Excuse request workflow.
    /// Supports early departure, late arrival, and other time-based excuses.
    /// </summary>
    Excuse = 2,

    /// <summary>
    /// Remote work request workflow.
    /// Supports work-from-home and remote location requests.
    /// </summary>
    RemoteWork = 3,

    /// <summary>
    /// Overtime request workflow.
    /// Supports pre-approval and post-facto overtime justification.
    /// </summary>
    Overtime = 4,

    /// <summary>
    /// Attendance correction request workflow.
    /// Supports corrections for missing check-in/out and time adjustments.
    /// </summary>
    AttendanceCorrection = 5,

    /// <summary>
    /// Timesheet submission workflow.
    /// Supports weekly/monthly timesheet approval.
    /// </summary>
    Timesheet = 6,

    /// <summary>
    /// Employee transfer workflow.
    /// Supports inter-branch and inter-department transfers.
    /// </summary>
    Transfer = 7,

    /// <summary>
    /// Employee promotion workflow.
    /// Supports job title, grade, and salary promotion approvals.
    /// </summary>
    Promotion = 8,

    /// <summary>
    /// Payroll approval workflow.
    /// Supports payroll period approval before disbursement.
    /// </summary>
    Payroll = 9,

    /// <summary>
    /// Resignation request workflow.
    /// Supports employee resignation approval process.
    /// </summary>
    Resignation = 10,

    /// <summary>
    /// Final settlement approval workflow.
    /// Supports end-of-service settlement approval.
    /// </summary>
    FinalSettlement = 11,

    /// <summary>
    /// Salary adjustment workflow.
    /// Supports salary change requests and approvals.
    /// </summary>
    SalaryAdjustment = 22,

    /// <summary>
    /// Allowance request workflow.
    /// Supports employee allowance request approvals.
    /// </summary>
    AllowanceRequest = 23,

    /// <summary>
    /// Job requisition approval workflow.
    /// Supports headcount request approvals.
    /// </summary>
    JobRequisition = 30,

    /// <summary>
    /// Performance review approval workflow.
    /// Supports manager review approval process.
    /// </summary>
    PerformanceReview = 31,

    /// <summary>
    /// Performance improvement plan approval workflow.
    /// Supports PIP creation and monitoring.
    /// </summary>
    PerformanceImprovementPlan = 32,

    /// <summary>
    /// Offer letter approval workflow.
    /// Supports offer letter approval before sending to candidate.
    /// </summary>
    OfferLetter = 33,

    /// <summary>
    /// Letter request approval workflow.
    /// </summary>
    LetterRequest = 34,

    /// <summary>
    /// Expense claim approval workflow.
    /// </summary>
    ExpenseClaim = 35,

    /// <summary>
    /// Loan application approval workflow.
    /// </summary>
    LoanApplication = 36,

    /// <summary>
    /// Salary advance approval workflow.
    /// </summary>
    SalaryAdvance = 37,

    /// <summary>
    /// Training enrollment approval workflow.
    /// Supports enrollment approval before training session participation.
    /// </summary>
    TrainingEnrollment = 40,

    /// <summary>
    /// Disciplinary action approval workflow.
    /// Supports approval of disciplinary measures (warnings, suspensions, terminations).
    /// </summary>
    DisciplinaryAction = 41,

    /// <summary>
    /// Grievance escalation workflow.
    /// Supports routing and escalation of employee grievances.
    /// </summary>
    Grievance = 42,

    /// <summary>
    /// Benefit enrollment approval workflow.
    /// Supports life-event enrollment changes outside open enrollment periods.
    /// </summary>
    BenefitEnrollment = 51,

    /// <summary>
    /// Shift swap request workflow.
    /// Supports employee-initiated shift swaps with peer and manager approval.
    /// </summary>
    ShiftSwap = 20
}
