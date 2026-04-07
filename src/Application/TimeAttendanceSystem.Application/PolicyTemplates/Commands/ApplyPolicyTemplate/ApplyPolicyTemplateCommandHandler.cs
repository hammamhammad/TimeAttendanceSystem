using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Excuses;
using TecAxle.Hrms.Domain.RemoteWork;
using TecAxle.Hrms.Domain.Settings;
using TecAxle.Hrms.Domain.Shifts;
using TecAxle.Hrms.Domain.Tenants;
using TecAxle.Hrms.Domain.VacationTypes;

namespace TecAxle.Hrms.Application.PolicyTemplates.Commands.ApplyPolicyTemplate;

public class ApplyPolicyTemplateCommandHandler : BaseHandler<ApplyPolicyTemplateCommand, Result>
{
    private readonly ITenantContext _tenantContext;

    public ApplyPolicyTemplateCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantContext tenantContext)
        : base(context, currentUser)
    {
        _tenantContext = tenantContext;
    }

    public override async Task<Result> Handle(ApplyPolicyTemplateCommand request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure("Tenant context not resolved");

        var template = await Context.PolicyTemplates
            .Include(t => t.Items.Where(i => !i.IsDeleted))
            .FirstOrDefaultAsync(t => t.Id == request.TemplateId && !t.IsDeleted, cancellationToken);

        if (template == null)
            return Result.Failure("Policy template not found");

        // Verify template is accessible (system template or owned by tenant)
        if (!template.IsSystemTemplate && template.TenantId != tenantId)
            return Result.Failure("Template not accessible");

        var username = CurrentUser.Username ?? "SYSTEM";
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() }
        };

        var appliedCount = 0;
        var errors = new List<string>();

        foreach (var item in template.Items.OrderBy(i => i.SortOrder))
        {
            try
            {
                switch (item.PolicyType)
                {
                    case "TenantSettings":
                        await ApplyTenantSettings(item.ConfigurationJson, tenantId.Value, username, options, cancellationToken);
                        appliedCount++;
                        break;
                    case "ExcusePolicy":
                        ApplyExcusePolicy(item.ConfigurationJson, request.BranchId, username, options);
                        appliedCount++;
                        break;
                    case "VacationType":
                        ApplyVacationType(item.ConfigurationJson, request.BranchId, username, options);
                        appliedCount++;
                        break;
                    case "RemoteWorkPolicy":
                        ApplyRemoteWorkPolicy(item.ConfigurationJson, request.BranchId, username, options);
                        appliedCount++;
                        break;
                    case "Shift":
                        ApplyShift(item.ConfigurationJson, username);
                        appliedCount++;
                        break;
                    case "OffDay":
                        ApplyOffDay(item.ConfigurationJson, request.BranchId, username);
                        appliedCount++;
                        break;
                    case "OvertimeConfiguration":
                        ApplyOvertimeConfiguration(item.ConfigurationJson, username, options);
                        appliedCount++;
                        break;
                }
            }
            catch (Exception ex)
            {
                errors.Add($"{item.PolicyType}: {ex.Message}");
            }
        }

        if (errors.Count > 0 && appliedCount == 0)
            return Result.Failure($"Failed to apply template: {string.Join("; ", errors)}");

        try
        {
            await Context.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException ex)
        {
            var innerMsg = ex.InnerException?.Message ?? ex.Message;
            if (innerMsg.Contains("duplicate key") || innerMsg.Contains("unique constraint"))
            {
                // Extract the entity name from the constraint details
                var detail = innerMsg;
                if (detail.Contains("Key (\"Name\")=("))
                {
                    var start = detail.IndexOf("Key (\"Name\")=(") + 14;
                    var end = detail.IndexOf(")", start);
                    var name = end > start ? detail.Substring(start, end - start) : "unknown";
                    return Result.Failure($"A record named \"{name}\" already exists. The template may have been applied previously.");
                }
                return Result.Failure("Some policies from this template already exist. The template may have been applied previously.");
            }
            return Result.Failure($"Failed to save template policies: {innerMsg}");
        }

        if (errors.Count > 0)
            return Result.Failure($"Partially applied ({appliedCount} policies). Errors: {string.Join("; ", errors)}");

        return Result.Success();
    }

    private async Task ApplyTenantSettings(string json, long tenantId, string username, JsonSerializerOptions options, CancellationToken ct)
    {
        var existing = await Context.TenantSettings
            .FirstOrDefaultAsync(s => s.TenantId == tenantId && !s.IsDeleted, ct);

        if (existing == null)
        {
            var settings = JsonSerializer.Deserialize<TenantSettings>(json, options) ?? new TenantSettings();
            settings.TenantId = tenantId;
            settings.CreatedBy = username;
            Context.TenantSettings.Add(settings);
        }
    }

    private void ApplyExcusePolicy(string json, long? branchId, string username, JsonSerializerOptions options)
    {
        var policy = JsonSerializer.Deserialize<ExcusePolicy>(json, options) ?? new ExcusePolicy();
        policy.Id = 0;
        policy.BranchId = branchId;
        policy.CreatedBy = username;
        policy.IsDeleted = false;
        Context.ExcusePolicies.Add(policy);
    }

    private void ApplyVacationType(string json, long? branchId, string username, JsonSerializerOptions options)
    {
        var vt = JsonSerializer.Deserialize<VacationType>(json, options) ?? new VacationType();
        vt.Id = 0;
        vt.BranchId = branchId;
        vt.CreatedBy = username;
        vt.IsDeleted = false;
        Context.VacationTypes.Add(vt);
    }

    private void ApplyRemoteWorkPolicy(string json, long? branchId, string username, JsonSerializerOptions options)
    {
        var policy = JsonSerializer.Deserialize<RemoteWorkPolicy>(json, options) ?? new RemoteWorkPolicy();
        policy.Id = 0;
        policy.BranchId = branchId;
        policy.CreatedBy = username;
        policy.IsDeleted = false;
        Context.RemoteWorkPolicies.Add(policy);
    }

    private void ApplyShift(string json, string username)
    {
        // Parse manually because Shift has TimeOnly properties that don't deserialize from JSON strings
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        var shift = new Shift
        {
            Name = root.GetProperty("Name").GetString() ?? "Shift",
            Description = root.TryGetProperty("Description", out var desc) ? desc.GetString() : null,
            ShiftType = root.TryGetProperty("ShiftType", out var st) && Enum.TryParse<ShiftType>(st.GetString(), true, out var stVal) ? stVal : ShiftType.TimeBased,
            Status = root.TryGetProperty("Status", out var ss) && Enum.TryParse<ShiftStatus>(ss.GetString(), true, out var ssVal) ? ssVal : ShiftStatus.Active,
            IsCheckInRequired = GetBool(root, "IsCheckInRequired", true),
            IsAutoCheckOut = GetBool(root, "IsAutoCheckOut", false),
            AllowFlexibleHours = GetBool(root, "AllowFlexibleHours", false),
            FlexMinutesBefore = GetNullableInt(root, "FlexMinutesBefore"),
            FlexMinutesAfter = GetNullableInt(root, "FlexMinutesAfter"),
            GracePeriodMinutes = GetNullableInt(root, "GracePeriodMinutes"),
            RequiredWeeklyHours = GetNullableDecimal(root, "RequiredWeeklyHours"),
            HasCoreHours = GetBool(root, "HasCoreHours", false),
            CoreStart = GetTimeOnly(root, "CoreStart"),
            CoreEnd = GetTimeOnly(root, "CoreEnd"),
            IsSunday = GetBool(root, "IsSunday", false),
            IsMonday = GetBool(root, "IsMonday", false),
            IsTuesday = GetBool(root, "IsTuesday", false),
            IsWednesday = GetBool(root, "IsWednesday", false),
            IsThursday = GetBool(root, "IsThursday", false),
            IsFriday = GetBool(root, "IsFriday", false),
            IsSaturday = GetBool(root, "IsSaturday", false),
            IsNightShift = GetBool(root, "IsNightShift", false),
            IsDefault = GetBool(root, "IsDefault", false),
            CreatedBy = username,
            CreatedAtUtc = DateTime.UtcNow
        };

        if (root.TryGetProperty("ShiftPeriods", out var periodsEl) && periodsEl.ValueKind == JsonValueKind.Array)
        {
            foreach (var pEl in periodsEl.EnumerateArray())
            {
                var period = new ShiftPeriod
                {
                    PeriodOrder = pEl.TryGetProperty("PeriodOrder", out var po) ? po.GetInt32() : 1,
                    StartTime = GetTimeOnly(pEl, "StartTime") ?? new TimeOnly(8, 0),
                    EndTime = GetTimeOnly(pEl, "EndTime") ?? new TimeOnly(17, 0),
                    Hours = GetDecimal(pEl, "Hours", 0),
                    IsNightPeriod = GetBool(pEl, "IsNightPeriod", false),
                    CreatedBy = username,
                    CreatedAtUtc = DateTime.UtcNow
                };
                period.CalculateHours();
                shift.ShiftPeriods.Add(period);
            }
        }

        Context.Shifts.Add(shift);
    }

    private void ApplyOffDay(string json, long? branchId, string username)
    {
        // Parse manually because OffDay has DateTime properties that need proper defaults
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        var offDay = new OffDay
        {
            Name = root.GetProperty("Name").GetString() ?? "Off Day",
            NameAr = root.TryGetProperty("NameAr", out var na) ? na.GetString() : null,
            OffDayType = root.TryGetProperty("OffDayType", out var odt) && Enum.TryParse<OffDayType>(odt.GetString(), true, out var odtVal) ? odtVal : OffDayType.WeeklyRecurring,
            IsActive = GetBool(root, "IsActive", true),
            IsCompanyWide = branchId == null && GetBool(root, "IsCompanyWide", true),
            BranchId = branchId,
            IsSunday = GetBool(root, "IsSunday", false),
            IsMonday = GetBool(root, "IsMonday", false),
            IsTuesday = GetBool(root, "IsTuesday", false),
            IsWednesday = GetBool(root, "IsWednesday", false),
            IsThursday = GetBool(root, "IsThursday", false),
            IsFriday = GetBool(root, "IsFriday", false),
            IsSaturday = GetBool(root, "IsSaturday", false),
            Priority = root.TryGetProperty("Priority", out var pr) ? pr.GetInt32() : 1,
            OverridesPublicHolidays = GetBool(root, "OverridesPublicHolidays", true),
            EffectiveFromDate = DateTime.UtcNow,
            CreatedBy = username,
            CreatedAtUtc = DateTime.UtcNow
        };

        Context.OffDays.Add(offDay);
    }

    private void ApplyOvertimeConfiguration(string json, string username, JsonSerializerOptions options)
    {
        var config = JsonSerializer.Deserialize<OvertimeConfiguration>(json, options) ?? new OvertimeConfiguration();
        config.Id = 0;
        config.CreatedBy = username;
        config.CreatedAtUtc = DateTime.UtcNow;
        config.EffectiveFromDate = DateTime.UtcNow;
        config.IsDeleted = false;
        Context.OvertimeConfigurations.Add(config);
    }

    // --- JSON helper methods ---

    private static bool GetBool(JsonElement el, string prop, bool defaultVal)
    {
        return el.TryGetProperty(prop, out var v) && v.ValueKind == JsonValueKind.True || v.ValueKind == JsonValueKind.False
            ? v.GetBoolean()
            : defaultVal;
    }

    private static int? GetNullableInt(JsonElement el, string prop)
    {
        return el.TryGetProperty(prop, out var v) && v.ValueKind == JsonValueKind.Number ? v.GetInt32() : null;
    }

    private static decimal GetDecimal(JsonElement el, string prop, decimal defaultVal)
    {
        return el.TryGetProperty(prop, out var v) && v.ValueKind == JsonValueKind.Number ? v.GetDecimal() : defaultVal;
    }

    private static decimal? GetNullableDecimal(JsonElement el, string prop)
    {
        return el.TryGetProperty(prop, out var v) && v.ValueKind == JsonValueKind.Number ? v.GetDecimal() : null;
    }

    private static TimeOnly? GetTimeOnly(JsonElement el, string prop)
    {
        if (el.TryGetProperty(prop, out var v) && v.ValueKind == JsonValueKind.String)
        {
            var str = v.GetString();
            if (!string.IsNullOrEmpty(str) && TimeOnly.TryParse(str, out var time))
                return time;
        }
        return null;
    }
}
