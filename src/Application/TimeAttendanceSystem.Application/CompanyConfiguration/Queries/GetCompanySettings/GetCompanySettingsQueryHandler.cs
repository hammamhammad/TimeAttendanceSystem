using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Queries.GetCompanySettings;

public class GetCompanySettingsQueryHandler : BaseHandler<GetCompanySettingsQuery, Result<CompanySettingsDto>>
{
    public GetCompanySettingsQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<CompanySettingsDto>> Handle(GetCompanySettingsQuery request, CancellationToken cancellationToken)
    {
        var settings = await Context.CompanySettings
            .AsNoTracking()
            .FirstOrDefaultAsync(s => !s.IsDeleted, cancellationToken);

        if (settings == null)
        {
            return Result.Success(new CompanySettingsDto());
        }

        var dto = new CompanySettingsDto
        {
            Id = settings.Id,
            FiscalYearStartMonth = settings.FiscalYearStartMonth,
            WeekStartDay = settings.WeekStartDay,
            DateFormat = settings.DateFormat,
            TimeFormat = settings.TimeFormat,
            NumberFormat = settings.NumberFormat,
            EnableBiometricAttendance = settings.EnableBiometricAttendance,
            EnableManualAttendance = settings.EnableManualAttendance,
            LateGracePeriodMinutes = settings.LateGracePeriodMinutes,
            EarlyLeaveGracePeriodMinutes = settings.EarlyLeaveGracePeriodMinutes,
            TrackBreakTime = settings.TrackBreakTime,
            MinimumWorkingHoursForPresent = settings.MinimumWorkingHoursForPresent,
            AllowNegativeLeaveBalance = settings.AllowNegativeLeaveBalance,
            RequireAttachmentForSickLeave = settings.RequireAttachmentForSickLeave,
            MinDaysBeforeLeaveRequest = settings.MinDaysBeforeLeaveRequest,
            AllowHalfDayLeave = settings.AllowHalfDayLeave,
            AllowLeaveEncashment = settings.AllowLeaveEncashment,
            LeaveYearStart = settings.LeaveYearStart,
            PayrollCutOffDay = settings.PayrollCutOffDay,
            PayrollCurrency = settings.PayrollCurrency,
            EnableEndOfServiceCalc = settings.EnableEndOfServiceCalc,
            SalaryCalculationBasis = settings.SalaryCalculationBasis,
            AutoApproveAfterTimeout = settings.AutoApproveAfterTimeout,
            DefaultApprovalTimeoutHours = settings.DefaultApprovalTimeoutHours,
            AllowSelfApproval = settings.AllowSelfApproval,
            RequireApprovalComments = settings.RequireApprovalComments,
            EnableEmailNotifications = settings.EnableEmailNotifications,
            EnableSmsNotifications = settings.EnableSmsNotifications,
            NotifyManagerOnLeaveRequest = settings.NotifyManagerOnLeaveRequest,
            NotifyEmployeeOnApproval = settings.NotifyEmployeeOnApproval,
            DailyAttendanceSummaryEnabled = settings.DailyAttendanceSummaryEnabled,
            PasswordExpiryDays = settings.PasswordExpiryDays,
            MaxLoginAttempts = settings.MaxLoginAttempts,
            SessionTimeoutMinutes = settings.SessionTimeoutMinutes,
            Require2FA = settings.Require2FA,
            PasswordHistoryCount = settings.PasswordHistoryCount,
            PasswordMinLength = settings.PasswordMinLength,
            LoginLockoutPolicyJson = settings.LoginLockoutPolicyJson,
            ContractExpiryAlertDaysCsv = settings.ContractExpiryAlertDaysCsv,
            VisaExpiryAlertDaysCsv = settings.VisaExpiryAlertDaysCsv,
            ReviewReminderDaysCsv = settings.ReviewReminderDaysCsv,
            LoanRepaymentReminderDays = settings.LoanRepaymentReminderDays,
            FrozenWorkflowCleanupDays = settings.FrozenWorkflowCleanupDays,
            DefaultProbationDays = settings.DefaultProbationDays,
            MaxUploadSizeMb = settings.MaxUploadSizeMb,
            MaxVacationDaysPerRequest = settings.MaxVacationDaysPerRequest,
            MaxVacationFuturePlanningYears = settings.MaxVacationFuturePlanningYears,
            MaxShiftGracePeriodMinutes = settings.MaxShiftGracePeriodMinutes,
            ExcuseBackwardWindowDays = settings.ExcuseBackwardWindowDays,
            ExcuseForwardWindowDays = settings.ExcuseForwardWindowDays,
            OvertimeConfigMaxFutureDays = settings.OvertimeConfigMaxFutureDays,
            AttendanceCorrectionMaxRetroactiveDays = settings.AttendanceCorrectionMaxRetroactiveDays,
            DocumentExpiryAlertDaysCsv = settings.DocumentExpiryAlertDaysCsv,
            AssetWarrantyExpiryAlertDaysCsv = settings.AssetWarrantyExpiryAlertDaysCsv,
            AssetOverdueReturnAlertDaysCsv = settings.AssetOverdueReturnAlertDaysCsv,
            TrainingSessionReminderDaysCsv = settings.TrainingSessionReminderDaysCsv,
            SuccessionPlanReminderDaysCsv = settings.SuccessionPlanReminderDaysCsv,
            TimesheetSubmissionReminderDaysBefore = settings.TimesheetSubmissionReminderDaysBefore,
            GrievanceSlaAlertDaysCsv = settings.GrievanceSlaAlertDaysCsv,
            NotificationRecipientRolesCsv = settings.NotificationRecipientRolesCsv
        };

        return Result.Success(dto);
    }
}
