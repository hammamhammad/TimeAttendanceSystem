using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Application.TenantConfiguration.Commands.UpdateTenantSettings;

public class UpdateTenantSettingsCommandHandler : BaseHandler<UpdateTenantSettingsCommand, Result>
{
    private readonly ITenantContext _tenantContext;

    public UpdateTenantSettingsCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantContext tenantContext)
        : base(context, currentUser)
    {
        _tenantContext = tenantContext;
    }

    public override async Task<Result> Handle(UpdateTenantSettingsCommand request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure("Tenant context not resolved");

        var settings = await Context.TenantSettings
            .FirstOrDefaultAsync(s => s.TenantId == tenantId.Value && !s.IsDeleted, cancellationToken);

        if (settings == null)
        {
            settings = new TenantSettings
            {
                TenantId = tenantId.Value,
                CreatedBy = CurrentUser.Username ?? "SYSTEM"
            };
            Context.TenantSettings.Add(settings);
        }

        // General
        settings.FiscalYearStartMonth = request.FiscalYearStartMonth ?? "01";
        settings.WeekStartDay = request.WeekStartDay ?? "Sunday";
        settings.DateFormat = request.DateFormat ?? "dd/MM/yyyy";
        settings.TimeFormat = request.TimeFormat ?? "HH:mm";
        settings.NumberFormat = request.NumberFormat ?? "en-US";

        // Attendance
        settings.EnableGpsAttendance = request.EnableGpsAttendance;
        settings.EnableNfcAttendance = request.EnableNfcAttendance;
        settings.EnableBiometricAttendance = request.EnableBiometricAttendance;
        settings.EnableManualAttendance = request.EnableManualAttendance;
        settings.AutoCheckOutEnabled = request.AutoCheckOutEnabled;
        settings.AutoCheckOutTime = string.IsNullOrEmpty(request.AutoCheckOutTime)
            ? null
            : TimeOnly.Parse(request.AutoCheckOutTime);
        settings.LateGracePeriodMinutes = request.LateGracePeriodMinutes;
        settings.EarlyLeaveGracePeriodMinutes = request.EarlyLeaveGracePeriodMinutes;
        settings.TrackBreakTime = request.TrackBreakTime;
        settings.MinimumWorkingHoursForPresent = request.MinimumWorkingHoursForPresent;

        // Leave
        settings.AllowNegativeLeaveBalance = request.AllowNegativeLeaveBalance;
        settings.RequireAttachmentForSickLeave = request.RequireAttachmentForSickLeave;
        settings.MinDaysBeforeLeaveRequest = request.MinDaysBeforeLeaveRequest;
        settings.AllowHalfDayLeave = request.AllowHalfDayLeave;
        settings.AllowLeaveEncashment = request.AllowLeaveEncashment;
        settings.LeaveYearStart = request.LeaveYearStart;

        // Payroll
        settings.PayrollCutOffDay = request.PayrollCutOffDay;
        settings.PayrollCurrency = request.PayrollCurrency;
        settings.EnableEndOfServiceCalc = request.EnableEndOfServiceCalc;
        settings.SalaryCalculationBasis = request.SalaryCalculationBasis ?? "Calendar";

        // Approval
        settings.AutoApproveAfterTimeout = request.AutoApproveAfterTimeout;
        settings.DefaultApprovalTimeoutHours = request.DefaultApprovalTimeoutHours;
        settings.AllowSelfApproval = request.AllowSelfApproval;
        settings.RequireApprovalComments = request.RequireApprovalComments;

        // Notification
        settings.EnableEmailNotifications = request.EnableEmailNotifications;
        settings.EnablePushNotifications = request.EnablePushNotifications;
        settings.EnableSmsNotifications = request.EnableSmsNotifications;
        settings.NotifyManagerOnLeaveRequest = request.NotifyManagerOnLeaveRequest;
        settings.NotifyEmployeeOnApproval = request.NotifyEmployeeOnApproval;
        settings.DailyAttendanceSummaryEnabled = request.DailyAttendanceSummaryEnabled;

        // Mobile
        settings.MobileCheckInEnabled = request.MobileCheckInEnabled;
        settings.RequireNfcForMobile = request.RequireNfcForMobile;
        settings.RequireGpsForMobile = request.RequireGpsForMobile;
        settings.AllowMockLocation = request.AllowMockLocation;

        // Security
        settings.PasswordExpiryDays = request.PasswordExpiryDays;
        settings.MaxLoginAttempts = request.MaxLoginAttempts;
        settings.SessionTimeoutMinutes = request.SessionTimeoutMinutes;
        settings.Require2FA = request.Require2FA;
        settings.PasswordHistoryCount = request.PasswordHistoryCount;

        // v13.3 tenant-configurable thresholds — null means "keep current".
        if (request.PasswordMinLength.HasValue) settings.PasswordMinLength = request.PasswordMinLength.Value;
        if (request.LoginLockoutPolicyJson != null) settings.LoginLockoutPolicyJson = request.LoginLockoutPolicyJson;
        if (!string.IsNullOrWhiteSpace(request.ContractExpiryAlertDaysCsv)) settings.ContractExpiryAlertDaysCsv = request.ContractExpiryAlertDaysCsv;
        if (!string.IsNullOrWhiteSpace(request.VisaExpiryAlertDaysCsv)) settings.VisaExpiryAlertDaysCsv = request.VisaExpiryAlertDaysCsv;
        if (!string.IsNullOrWhiteSpace(request.ReviewReminderDaysCsv)) settings.ReviewReminderDaysCsv = request.ReviewReminderDaysCsv;
        if (request.LoanRepaymentReminderDays.HasValue) settings.LoanRepaymentReminderDays = request.LoanRepaymentReminderDays.Value;
        if (request.FrozenWorkflowCleanupDays.HasValue) settings.FrozenWorkflowCleanupDays = request.FrozenWorkflowCleanupDays.Value;
        if (request.DefaultProbationDays.HasValue) settings.DefaultProbationDays = request.DefaultProbationDays.Value;
        if (request.MaxUploadSizeMb.HasValue) settings.MaxUploadSizeMb = request.MaxUploadSizeMb.Value;
        if (request.MaxVacationDaysPerRequest.HasValue) settings.MaxVacationDaysPerRequest = request.MaxVacationDaysPerRequest.Value;
        if (request.MaxVacationFuturePlanningYears.HasValue) settings.MaxVacationFuturePlanningYears = request.MaxVacationFuturePlanningYears.Value;
        if (request.MaxShiftGracePeriodMinutes.HasValue) settings.MaxShiftGracePeriodMinutes = request.MaxShiftGracePeriodMinutes.Value;
        if (request.ExcuseBackwardWindowDays.HasValue) settings.ExcuseBackwardWindowDays = request.ExcuseBackwardWindowDays.Value;
        if (request.ExcuseForwardWindowDays.HasValue) settings.ExcuseForwardWindowDays = request.ExcuseForwardWindowDays.Value;
        if (request.OvertimeConfigMaxFutureDays.HasValue) settings.OvertimeConfigMaxFutureDays = request.OvertimeConfigMaxFutureDays.Value;

        // v13.4 — null means "keep current".
        if (request.AttendanceCorrectionMaxRetroactiveDays.HasValue) settings.AttendanceCorrectionMaxRetroactiveDays = request.AttendanceCorrectionMaxRetroactiveDays.Value;
        if (!string.IsNullOrWhiteSpace(request.DocumentExpiryAlertDaysCsv)) settings.DocumentExpiryAlertDaysCsv = request.DocumentExpiryAlertDaysCsv;
        if (!string.IsNullOrWhiteSpace(request.AssetWarrantyExpiryAlertDaysCsv)) settings.AssetWarrantyExpiryAlertDaysCsv = request.AssetWarrantyExpiryAlertDaysCsv;
        if (!string.IsNullOrWhiteSpace(request.AssetOverdueReturnAlertDaysCsv)) settings.AssetOverdueReturnAlertDaysCsv = request.AssetOverdueReturnAlertDaysCsv;
        if (!string.IsNullOrWhiteSpace(request.TrainingSessionReminderDaysCsv)) settings.TrainingSessionReminderDaysCsv = request.TrainingSessionReminderDaysCsv;
        if (!string.IsNullOrWhiteSpace(request.SuccessionPlanReminderDaysCsv)) settings.SuccessionPlanReminderDaysCsv = request.SuccessionPlanReminderDaysCsv;
        if (request.TimesheetSubmissionReminderDaysBefore.HasValue) settings.TimesheetSubmissionReminderDaysBefore = request.TimesheetSubmissionReminderDaysBefore.Value;
        if (!string.IsNullOrWhiteSpace(request.GrievanceSlaAlertDaysCsv)) settings.GrievanceSlaAlertDaysCsv = request.GrievanceSlaAlertDaysCsv;
        if (!string.IsNullOrWhiteSpace(request.NotificationRecipientRolesCsv)) settings.NotificationRecipientRolesCsv = request.NotificationRecipientRolesCsv;

        settings.ModifiedBy = CurrentUser.Username ?? "SYSTEM";

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
