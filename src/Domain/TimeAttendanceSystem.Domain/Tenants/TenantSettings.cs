using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Tenants;

/// <summary>
/// Centralized operational settings for a tenant (company).
/// One row per tenant. Covers cross-cutting configuration that doesn't belong to a specific policy entity.
/// Branch-level overrides are handled by BranchSettingsOverride; department-level by DepartmentSettingsOverride.
/// </summary>
public class TenantSettings : BaseEntity
{
    public long TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;

    // ── General Settings ─────────────────────────────────

    /// <summary>Month number "01"–"12" when the fiscal year starts.</summary>
    public string FiscalYearStartMonth { get; set; } = "01";

    /// <summary>First day of the work week: "Sunday", "Monday", etc.</summary>
    public string WeekStartDay { get; set; } = "Sunday";

    /// <summary>Display date format, e.g. "dd/MM/yyyy".</summary>
    public string DateFormat { get; set; } = "dd/MM/yyyy";

    /// <summary>"HH:mm" (24-hour) or "hh:mm a" (12-hour).</summary>
    public string TimeFormat { get; set; } = "HH:mm";

    /// <summary>Locale tag for number formatting, e.g. "en-US", "ar-SA".</summary>
    public string NumberFormat { get; set; } = "en-US";

    // ── Attendance Settings ──────────────────────────────

    public bool EnableGpsAttendance { get; set; } = false;
    public bool EnableNfcAttendance { get; set; } = false;
    public bool EnableBiometricAttendance { get; set; } = true;
    public bool EnableManualAttendance { get; set; } = true;
    public bool AutoCheckOutEnabled { get; set; } = false;
    public TimeOnly? AutoCheckOutTime { get; set; }
    public int LateGracePeriodMinutes { get; set; } = 15;
    public int EarlyLeaveGracePeriodMinutes { get; set; } = 15;
    public bool TrackBreakTime { get; set; } = false;
    public int MinimumWorkingHoursForPresent { get; set; } = 4;

    // ── Leave Settings ───────────────────────────────────

    public bool AllowNegativeLeaveBalance { get; set; } = false;
    public bool RequireAttachmentForSickLeave { get; set; } = true;
    public int MinDaysBeforeLeaveRequest { get; set; } = 1;
    public bool AllowHalfDayLeave { get; set; } = true;
    public bool AllowLeaveEncashment { get; set; } = false;

    /// <summary>"MM-dd" pattern for leave year start, null = calendar year.</summary>
    public string? LeaveYearStart { get; set; }

    // ── Payroll Settings ─────────────────────────────────

    public int PayrollCutOffDay { get; set; } = 25;

    /// <summary>ISO 4217 currency code override; null = use Tenant.DefaultCurrency.</summary>
    public string? PayrollCurrency { get; set; }

    public bool EnableEndOfServiceCalc { get; set; } = true;

    /// <summary>"Calendar" or "WorkingDays".</summary>
    public string SalaryCalculationBasis { get; set; } = "Calendar";

    // ── Approval Settings ────────────────────────────────

    public bool AutoApproveAfterTimeout { get; set; } = false;
    public int DefaultApprovalTimeoutHours { get; set; } = 72;
    public bool AllowSelfApproval { get; set; } = false;
    public bool RequireApprovalComments { get; set; } = false;

    // ── Notification Settings ────────────────────────────

    public bool EnableEmailNotifications { get; set; } = true;
    public bool EnablePushNotifications { get; set; } = true;
    public bool EnableSmsNotifications { get; set; } = false;
    public bool NotifyManagerOnLeaveRequest { get; set; } = true;
    public bool NotifyEmployeeOnApproval { get; set; } = true;
    public bool DailyAttendanceSummaryEnabled { get; set; } = false;

    // ── Mobile App Settings ──────────────────────────────

    public bool MobileCheckInEnabled { get; set; } = true;
    public bool RequireNfcForMobile { get; set; } = false;
    public bool RequireGpsForMobile { get; set; } = true;
    public bool AllowMockLocation { get; set; } = false;

    // ── Security Settings ────────────────────────────────

    public int PasswordExpiryDays { get; set; } = 90;
    public int MaxLoginAttempts { get; set; } = 5;
    public int SessionTimeoutMinutes { get; set; } = 480;
    public bool Require2FA { get; set; } = false;
    public int PasswordHistoryCount { get; set; } = 3;

    /// <summary>Minimum password length enforced on set/change. Defaults to 8.</summary>
    public int PasswordMinLength { get; set; } = 8;

    /// <summary>JSON-serialized progressive login-lockout escalation policy.
    /// Default: [{attempts:5,minutes:15},{attempts:10,minutes:60},{attempts:15,minutes:1440}].
    /// Applies to tenant users; platform admin uses its own defaults.</summary>
    public string? LoginLockoutPolicyJson { get; set; }

    // ── Reminder / Alert Windows (background jobs, tenant-scoped) ─

    /// <summary>Comma-separated days before contract expiry to notify HR. Default "30,15,7".</summary>
    public string ContractExpiryAlertDaysCsv { get; set; } = "30,15,7";

    /// <summary>Comma-separated days before visa expiry to notify HR. Default "90,60,30,15,7".</summary>
    public string VisaExpiryAlertDaysCsv { get; set; } = "90,60,30,15,7";

    /// <summary>Comma-separated days before review cycle deadlines to send reminders. Default "7,3,1".</summary>
    public string ReviewReminderDaysCsv { get; set; } = "7,3,1";

    /// <summary>Days ahead to check for upcoming loan repayment reminders. Default 7.</summary>
    public int LoanRepaymentReminderDays { get; set; } = 7;

    /// <summary>Days a workflow may remain frozen before it is auto-cancelled. Default 90.</summary>
    public int FrozenWorkflowCleanupDays { get; set; } = 90;

    // ── Default Values for Auto-created Records ─────────

    /// <summary>Default probation days applied when converting an offer to a contract (if not specified). Default 90.</summary>
    public int DefaultProbationDays { get; set; } = 90;

    // ── Validation / Limit Overrides ─────────────────────

    /// <summary>Maximum file upload size in MB. Default 10.</summary>
    public int MaxUploadSizeMb { get; set; } = 10;

    /// <summary>Maximum days per single vacation request. Default 365.</summary>
    public int MaxVacationDaysPerRequest { get; set; } = 365;

    /// <summary>Maximum years in the future a bulk vacation request may be scheduled. Default 2.</summary>
    public int MaxVacationFuturePlanningYears { get; set; } = 2;

    /// <summary>Maximum minutes a shift's grace period may be configured to. Default 120.</summary>
    public int MaxShiftGracePeriodMinutes { get; set; } = 120;

    /// <summary>Excuse request look-back window in days. Default 365.</summary>
    public int ExcuseBackwardWindowDays { get; set; } = 365;

    /// <summary>Excuse request look-forward window in days. Default 30.</summary>
    public int ExcuseForwardWindowDays { get; set; } = 30;

    /// <summary>Max days an Overtime Configuration's effective date may be in the future when activated. Default 30.</summary>
    public int OvertimeConfigMaxFutureDays { get; set; } = 30;

    // ── Reminder / Alert Windows — batch 2 (v13.4) ───────────

    /// <summary>Max days in the past an attendance correction may be submitted. Default 30.</summary>
    public int AttendanceCorrectionMaxRetroactiveDays { get; set; } = 30;

    /// <summary>CSV of days before document expiry to notify HR. Default "30,15,7".</summary>
    public string DocumentExpiryAlertDaysCsv { get; set; } = "30,15,7";

    /// <summary>CSV of days before asset warranty expiry to alert. Default "30,15,7,1".</summary>
    public string AssetWarrantyExpiryAlertDaysCsv { get; set; } = "30,15,7,1";

    /// <summary>CSV of days after an asset return becomes overdue to remind. Default "1,3,7,14,30".</summary>
    public string AssetOverdueReturnAlertDaysCsv { get; set; } = "1,3,7,14,30";

    /// <summary>CSV of days before a training session to remind enrolled employees. Default "7,3,1".</summary>
    public string TrainingSessionReminderDaysCsv { get; set; } = "7,3,1";

    /// <summary>CSV of days before a succession plan review to remind owners. Default "30,7,1".</summary>
    public string SuccessionPlanReminderDaysCsv { get; set; } = "30,7,1";

    /// <summary>Days before the timesheet submission deadline to start reminding employees. Default 2.</summary>
    public int TimesheetSubmissionReminderDaysBefore { get; set; } = 2;

    /// <summary>CSV of days before a grievance SLA breach to alert. Default "3,1".</summary>
    public string GrievanceSlaAlertDaysCsv { get; set; } = "3,1";

    /// <summary>
    /// CSV of role names whose members receive system-generated HR notifications
    /// (contract/visa/document expiry, loan reminders, PIP expiry, etc).
    /// Default "HRManager,SystemAdmin" — preserves pre-v13.4 behavior.
    /// Replaces scattered hardcoded <c>Role.Name == "HR"</c> / <c>"HRManager"</c> / <c>"Admin"</c> checks.
    /// </summary>
    public string NotificationRecipientRolesCsv { get; set; } = "HRManager,SystemAdmin";

    // ── Lifecycle Automation (v13.5) ─────────────────────────
    // Every flag below has a DB default that mirrors pre-v13.5 observable behavior,
    // so deploying this version changes nothing until a tenant actively flips a flag.

    /// <summary>Master kill-switch for all lifecycle automation. When false, every
    /// handler short-circuits with <c>LifecycleAutomationStatus.Disabled</c> and the
    /// originating command still succeeds. Default true.</summary>
    public bool LifecycleAutomationEnabled { get; set; } = true;

    /// <summary>When true (default), accepting an offer auto-creates an onboarding
    /// process from the best-matching template. Mirrors v13.x hardcoded behavior.</summary>
    public bool AutoCreateOnboardingOnOfferAcceptance { get; set; } = true;

    /// <summary>Explicit fallback onboarding template id. Null = fall back to the
    /// department → branch → IsDefault selection (current v13.x logic).</summary>
    public long? DefaultOnboardingTemplateId { get; set; }

    /// <summary>When true, new employees produced by offer acceptance are created with
    /// <c>IsActive=false, IsPreHire=true</c> and must be activated by the onboarding-completed
    /// handler. Default false — employees are fully active on day one (v13.x behavior).</summary>
    public bool CreateEmployeeInactiveAtOfferAcceptance { get; set; } = false;

    /// <summary>Opt-in: when true, completing an onboarding process activates the employee
    /// (flips <c>IsPreHire=false, IsActive=true</c>). When false (default), completion only
    /// sets the milestone timestamp and notifies HR — no state toggle.</summary>
    public bool AutoActivateEmployeeOnOnboardingComplete { get; set; } = false;

    /// <summary>When true (default), an onboarding process cannot be completed while any
    /// <c>IsRequired=true</c> task is still pending. Matches v13.x validation in
    /// <c>OnboardingProcessesController.Complete</c>.</summary>
    public bool OnboardingCompletionRequiresAllRequiredTasks { get; set; } = true;

    /// <summary>New v13.5 gate: when true, onboarding completion additionally requires every
    /// <c>IsRequired=true</c> document to be submitted+verified. Default false preserves behavior.</summary>
    public bool OnboardingCompletionRequiresAllRequiredDocuments { get; set; } = false;

    /// <summary>Opt-in: when true, approving a resignation auto-creates a TerminationRecord.
    /// Default false — HR must still create the termination manually (v13.x behavior).</summary>
    public bool AutoCreateTerminationOnResignationApproved { get; set; } = false;

    /// <summary>When true (default), creating a termination record auto-creates a clearance
    /// checklist. Matches v13.x hardcoded behavior.</summary>
    public bool AutoCreateClearanceOnTermination { get; set; } = true;

    /// <summary>Optional clearance template id. Currently there is no dedicated ClearanceTemplate
    /// entity — when null (default), the lifecycle handler seeds the 8 hardcoded default items
    /// (IT×2, Finance×2, Admin×2, HR×2) that v13.x already used.</summary>
    public long? DefaultClearanceTemplateId { get; set; }

    /// <summary>When true (default), creating a termination record also suspends the employee
    /// (<c>IsSuspended=true</c> + <c>User.IsActive=false</c>). The full deactivation
    /// (<c>Employee.IsActive=false</c>) happens later at final-settlement-paid. Combined with
    /// <see cref="AutoDeactivateEmployeeOnFinalSettlementPaid"/>=true (default), the observable
    /// end-state for tenants who never flip a flag matches v13.x behavior.</summary>
    public bool AutoSuspendEmployeeOnTerminationCreated { get; set; } = true;

    /// <summary>Opt-in: when true, <c>CalculateFinalSettlementCommand</c> is rejected until
    /// the clearance checklist is <c>Completed</c>. Default false preserves v13.x behavior.</summary>
    public bool RequireClearanceCompleteBeforeFinalSettlement { get; set; } = false;

    /// <summary>Opt-in: when true, completing a clearance checklist auto-runs
    /// <c>CalculateFinalSettlementCommand</c>. Default false — HR triggers calc manually.</summary>
    public bool AutoEnableFinalSettlementCalcOnClearanceComplete { get; set; } = false;

    /// <summary>When true (default), marking a final settlement as Paid auto-deactivates the
    /// employee (<c>IsActive=false</c>, clears <c>IsSuspended</c>). With
    /// <see cref="AutoSuspendEmployeeOnTerminationCreated"/>=true, the net outcome equals the
    /// pre-v13.5 "deactivate at termination" result — just deferred to settlement-paid.</summary>
    public bool AutoDeactivateEmployeeOnFinalSettlementPaid { get; set; } = true;

    /// <summary>Per-tenant action applied to contracts whose <c>EndDate</c> has passed.
    /// Stored as string for forward compat; parsed into <c>ContractExpiredAction</c>.
    /// Default <c>AutoMarkExpired</c> fixes the pre-v13.5 bug where contracts stayed
    /// <c>Active</c> indefinitely past their end date.</summary>
    public string ContractExpiredAction { get; set; } = "AutoMarkExpired";

    // -------- v13.6 Workflow Routing Hardening --------

    /// <summary>Role name used as the fallback approver when primary approver resolution fails
    /// (e.g. department has no manager, role has no active users). Resolved via the same
    /// role-assignment strategy as the step being routed. Default <c>"HRManager"</c>. (v13.6)</summary>
    public string WorkflowFallbackApproverRole { get; set; } = "HRManager";

    /// <summary>Optional explicit user override for the fallback approver. When set, wins over
    /// <see cref="WorkflowFallbackApproverRole"/>. Null = fall through to role-based resolution. (v13.6)</summary>
    public long? WorkflowFallbackApproverUserId { get; set; }

    /// <summary>Maximum allowed depth of a delegation chain (A→B→C). Default 2 — A can delegate
    /// to B, B can delegate to C, but C cannot delegate further. Prevents orphaned / runaway
    /// delegation trees. Range 1–5. (v13.6)</summary>
    public int MaxWorkflowDelegationDepth { get; set; } = 2;

    /// <summary>Maximum times a request can be returned for correction and resubmitted before
    /// the workflow engine rejects further resubmissions and asks the requester to cancel and
    /// recreate. Default 3. (v13.6)</summary>
    public int MaxWorkflowResubmissions { get; set; } = 3;
}
