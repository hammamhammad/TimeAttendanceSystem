using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.TenantConfiguration.Dtos;

namespace TecAxle.Hrms.Infrastructure.Services;

public class TenantSettingsResolver : ITenantSettingsResolver
{
    private readonly IApplicationDbContext _context;
    private readonly IMemoryCache _cache;
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(5);

    public TenantSettingsResolver(IApplicationDbContext context, IMemoryCache cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<ResolvedSettingsDto> GetSettingsAsync(
        long tenantId, long? branchId = null, long? departmentId = null, CancellationToken ct = default)
    {
        // Step 1: Load tenant settings (cached)
        var tenantSettings = await GetTenantSettingsCachedAsync(tenantId, ct);

        // Build resolved DTO from tenant settings
        var resolved = MapFromTenantSettings(tenantSettings, tenantId);

        // Step 2: Apply branch overrides if requested
        if (branchId.HasValue)
        {
            resolved.BranchId = branchId.Value;
            var branchOverrides = await _context.BranchSettingsOverrides
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.BranchId == branchId.Value && !o.IsDeleted, ct);

            if (branchOverrides != null)
                ApplyBranchOverrides(resolved, branchOverrides);
        }

        // Step 3: Apply department overrides if requested
        if (departmentId.HasValue)
        {
            resolved.DepartmentId = departmentId.Value;
            var deptOverrides = await _context.DepartmentSettingsOverrides
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.DepartmentId == departmentId.Value && !o.IsDeleted, ct);

            if (deptOverrides != null)
                ApplyDepartmentOverrides(resolved, deptOverrides);
        }

        return resolved;
    }

    public void InvalidateCache(long tenantId)
    {
        _cache.Remove($"tenant-settings:{tenantId}");
    }

    private async Task<Domain.Tenants.TenantSettings?> GetTenantSettingsCachedAsync(long tenantId, CancellationToken ct)
    {
        var cacheKey = $"tenant-settings:{tenantId}";

        if (_cache.TryGetValue<Domain.Tenants.TenantSettings>(cacheKey, out var cached))
            return cached;

        var settings = await _context.TenantSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(s => s.TenantId == tenantId && !s.IsDeleted, ct);

        if (settings != null)
            _cache.Set(cacheKey, settings, CacheDuration);

        return settings;
    }

    private static ResolvedSettingsDto MapFromTenantSettings(Domain.Tenants.TenantSettings? settings, long tenantId)
    {
        var dto = new ResolvedSettingsDto { TenantId = tenantId };

        if (settings == null)
        {
            // All defaults — all sources are "default"
            SetAllSources(dto, "default");
            return dto;
        }

        // General
        dto.FiscalYearStartMonth = settings.FiscalYearStartMonth;
        dto.WeekStartDay = settings.WeekStartDay;
        dto.DateFormat = settings.DateFormat;
        dto.TimeFormat = settings.TimeFormat;
        dto.NumberFormat = settings.NumberFormat;

        // Attendance
        dto.EnableGpsAttendance = settings.EnableGpsAttendance;
        dto.EnableNfcAttendance = settings.EnableNfcAttendance;
        dto.EnableBiometricAttendance = settings.EnableBiometricAttendance;
        dto.EnableManualAttendance = settings.EnableManualAttendance;
        dto.AutoCheckOutEnabled = settings.AutoCheckOutEnabled;
        dto.AutoCheckOutTime = settings.AutoCheckOutTime?.ToString("HH:mm");
        dto.LateGracePeriodMinutes = settings.LateGracePeriodMinutes;
        dto.EarlyLeaveGracePeriodMinutes = settings.EarlyLeaveGracePeriodMinutes;
        dto.TrackBreakTime = settings.TrackBreakTime;
        dto.MinimumWorkingHoursForPresent = settings.MinimumWorkingHoursForPresent;

        // Leave
        dto.AllowNegativeLeaveBalance = settings.AllowNegativeLeaveBalance;
        dto.RequireAttachmentForSickLeave = settings.RequireAttachmentForSickLeave;
        dto.MinDaysBeforeLeaveRequest = settings.MinDaysBeforeLeaveRequest;
        dto.AllowHalfDayLeave = settings.AllowHalfDayLeave;
        dto.AllowLeaveEncashment = settings.AllowLeaveEncashment;
        dto.LeaveYearStart = settings.LeaveYearStart;

        // Payroll
        dto.PayrollCutOffDay = settings.PayrollCutOffDay;
        dto.PayrollCurrency = settings.PayrollCurrency;
        dto.EnableEndOfServiceCalc = settings.EnableEndOfServiceCalc;
        dto.SalaryCalculationBasis = settings.SalaryCalculationBasis;

        // Approval
        dto.AutoApproveAfterTimeout = settings.AutoApproveAfterTimeout;
        dto.DefaultApprovalTimeoutHours = settings.DefaultApprovalTimeoutHours;
        dto.AllowSelfApproval = settings.AllowSelfApproval;
        dto.RequireApprovalComments = settings.RequireApprovalComments;

        // Notification
        dto.EnableEmailNotifications = settings.EnableEmailNotifications;
        dto.EnablePushNotifications = settings.EnablePushNotifications;
        dto.EnableSmsNotifications = settings.EnableSmsNotifications;
        dto.NotifyManagerOnLeaveRequest = settings.NotifyManagerOnLeaveRequest;
        dto.NotifyEmployeeOnApproval = settings.NotifyEmployeeOnApproval;
        dto.DailyAttendanceSummaryEnabled = settings.DailyAttendanceSummaryEnabled;

        // Mobile
        dto.MobileCheckInEnabled = settings.MobileCheckInEnabled;
        dto.RequireNfcForMobile = settings.RequireNfcForMobile;
        dto.RequireGpsForMobile = settings.RequireGpsForMobile;
        dto.AllowMockLocation = settings.AllowMockLocation;

        // Security
        dto.PasswordExpiryDays = settings.PasswordExpiryDays;
        dto.MaxLoginAttempts = settings.MaxLoginAttempts;
        dto.SessionTimeoutMinutes = settings.SessionTimeoutMinutes;
        dto.Require2FA = settings.Require2FA;
        dto.PasswordHistoryCount = settings.PasswordHistoryCount;

        SetAllSources(dto, "tenant");
        return dto;
    }

    private static void ApplyBranchOverrides(ResolvedSettingsDto dto, Domain.Branches.BranchSettingsOverride o)
    {
        if (o.EnableGpsAttendance.HasValue) { dto.EnableGpsAttendance = o.EnableGpsAttendance.Value; dto.Sources["enableGpsAttendance"] = "branch"; }
        if (o.EnableNfcAttendance.HasValue) { dto.EnableNfcAttendance = o.EnableNfcAttendance.Value; dto.Sources["enableNfcAttendance"] = "branch"; }
        if (o.EnableBiometricAttendance.HasValue) { dto.EnableBiometricAttendance = o.EnableBiometricAttendance.Value; dto.Sources["enableBiometricAttendance"] = "branch"; }
        if (o.EnableManualAttendance.HasValue) { dto.EnableManualAttendance = o.EnableManualAttendance.Value; dto.Sources["enableManualAttendance"] = "branch"; }
        if (o.AutoCheckOutEnabled.HasValue) { dto.AutoCheckOutEnabled = o.AutoCheckOutEnabled.Value; dto.Sources["autoCheckOutEnabled"] = "branch"; }
        if (o.AutoCheckOutTime.HasValue) { dto.AutoCheckOutTime = o.AutoCheckOutTime.Value.ToString("HH:mm"); dto.Sources["autoCheckOutTime"] = "branch"; }
        if (o.LateGracePeriodMinutes.HasValue) { dto.LateGracePeriodMinutes = o.LateGracePeriodMinutes.Value; dto.Sources["lateGracePeriodMinutes"] = "branch"; }
        if (o.EarlyLeaveGracePeriodMinutes.HasValue) { dto.EarlyLeaveGracePeriodMinutes = o.EarlyLeaveGracePeriodMinutes.Value; dto.Sources["earlyLeaveGracePeriodMinutes"] = "branch"; }
        if (o.TrackBreakTime.HasValue) { dto.TrackBreakTime = o.TrackBreakTime.Value; dto.Sources["trackBreakTime"] = "branch"; }
        if (o.MinimumWorkingHoursForPresent.HasValue) { dto.MinimumWorkingHoursForPresent = o.MinimumWorkingHoursForPresent.Value; dto.Sources["minimumWorkingHoursForPresent"] = "branch"; }
        if (o.MobileCheckInEnabled.HasValue) { dto.MobileCheckInEnabled = o.MobileCheckInEnabled.Value; dto.Sources["mobileCheckInEnabled"] = "branch"; }
        if (o.RequireNfcForMobile.HasValue) { dto.RequireNfcForMobile = o.RequireNfcForMobile.Value; dto.Sources["requireNfcForMobile"] = "branch"; }
        if (o.RequireGpsForMobile.HasValue) { dto.RequireGpsForMobile = o.RequireGpsForMobile.Value; dto.Sources["requireGpsForMobile"] = "branch"; }
    }

    private static void ApplyDepartmentOverrides(ResolvedSettingsDto dto, Domain.Departments.DepartmentSettingsOverride o)
    {
        if (o.DefaultShiftId.HasValue) { dto.DefaultShiftId = o.DefaultShiftId.Value; dto.Sources["defaultShiftId"] = "department"; }
        if (o.RequireApprovalComments.HasValue) { dto.RequireApprovalComments = o.RequireApprovalComments.Value; dto.Sources["requireApprovalComments"] = "department"; }
    }

    private static void SetAllSources(ResolvedSettingsDto dto, string source)
    {
        var fields = new[]
        {
            "fiscalYearStartMonth", "weekStartDay", "dateFormat", "timeFormat", "numberFormat",
            "enableGpsAttendance", "enableNfcAttendance", "enableBiometricAttendance", "enableManualAttendance",
            "autoCheckOutEnabled", "autoCheckOutTime", "lateGracePeriodMinutes", "earlyLeaveGracePeriodMinutes",
            "trackBreakTime", "minimumWorkingHoursForPresent",
            "allowNegativeLeaveBalance", "requireAttachmentForSickLeave", "minDaysBeforeLeaveRequest",
            "allowHalfDayLeave", "allowLeaveEncashment", "leaveYearStart",
            "payrollCutOffDay", "payrollCurrency", "enableEndOfServiceCalc", "salaryCalculationBasis",
            "autoApproveAfterTimeout", "defaultApprovalTimeoutHours", "allowSelfApproval", "requireApprovalComments",
            "enableEmailNotifications", "enablePushNotifications", "enableSmsNotifications",
            "notifyManagerOnLeaveRequest", "notifyEmployeeOnApproval", "dailyAttendanceSummaryEnabled",
            "mobileCheckInEnabled", "requireNfcForMobile", "requireGpsForMobile", "allowMockLocation",
            "passwordExpiryDays", "maxLoginAttempts", "sessionTimeoutMinutes", "require2FA", "passwordHistoryCount"
        };

        foreach (var field in fields)
            dto.Sources[field] = source;
    }
}
