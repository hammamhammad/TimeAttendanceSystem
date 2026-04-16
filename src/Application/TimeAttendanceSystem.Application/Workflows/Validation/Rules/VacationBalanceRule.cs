using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Workflows;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Workflows.Validation.Rules;

/// <summary>
/// Reference validation rule that ships with v13.6.
/// Verifies the requester has at least <c>requestedDays</c> of available vacation balance
/// for the requested vacation type in the current year.
/// </summary>
/// <remarks>
/// Runs only for <see cref="WorkflowEntityType.Vacation"/> instances. For other entity types the rule
/// passes (it does not apply). Context dictionary expected keys:
/// <list type="bullet">
///   <item><c>vacationTypeId</c> (long) — required</item>
///   <item><c>totalDays</c> (decimal / number) — required</item>
///   <item><c>employeeId</c> (long) — required</item>
/// </list>
///
/// Step config JSON example:
/// <code>{ "minDaysRemaining": 0 }</code>
/// where <c>minDaysRemaining</c> specifies how many days must remain AFTER subtracting
/// the requested amount. Default 0.
/// </remarks>
public sealed class VacationBalanceRule : IWorkflowValidationRule
{
    public string RuleCode => "vacation_balance";
    public string DisplayName => "Vacation Balance Check";

    private readonly IApplicationDbContext _db;
    public VacationBalanceRule(IApplicationDbContext db) => _db = db;

    public async Task<ValidationRuleResult> EvaluateAsync(
        WorkflowInstance instance,
        WorkflowStep step,
        IReadOnlyDictionary<string, object?> context,
        CancellationToken ct)
    {
        if (instance.EntityType != WorkflowEntityType.Vacation)
        {
            return new ValidationRuleResult(true, "Rule not applicable — not a vacation instance.");
        }

        if (!TryGetLong(context, "employeeId", out var employeeId) ||
            !TryGetLong(context, "vacationTypeId", out var vacationTypeId) ||
            !TryGetDecimal(context, "totalDays", out var totalDays))
        {
            return new ValidationRuleResult(
                false,
                "Context missing required fields (employeeId, vacationTypeId, totalDays).",
                new Dictionary<string, object?>
                {
                    ["ruleCode"] = RuleCode,
                    ["missingContext"] = true
                });
        }

        var minDaysRemaining = 0m;
        if (!string.IsNullOrWhiteSpace(step.ValidationConfigJson))
        {
            try
            {
                using var doc = JsonDocument.Parse(step.ValidationConfigJson);
                if (doc.RootElement.TryGetProperty("minDaysRemaining", out var el) &&
                    el.TryGetDecimal(out var configured))
                {
                    minDaysRemaining = configured;
                }
            }
            catch (JsonException)
            {
                // Malformed config JSON — fail closed with a clear message.
                return new ValidationRuleResult(
                    false,
                    "ValidationConfigJson is not valid JSON.",
                    new Dictionary<string, object?> { ["ruleCode"] = RuleCode });
            }
        }

        var currentYear = DateTime.UtcNow.Year;
        var balance = await _db.LeaveBalances
            .AsNoTracking()
            .FirstOrDefaultAsync(
                b => b.EmployeeId == employeeId
                     && b.VacationTypeId == vacationTypeId
                     && b.Year == currentYear,
                ct);

        if (balance == null)
        {
            return new ValidationRuleResult(
                false,
                $"No leave balance record found for employee {employeeId}, vacation type {vacationTypeId}, year {currentYear}.",
                new Dictionary<string, object?>
                {
                    ["ruleCode"] = RuleCode,
                    ["employeeId"] = employeeId,
                    ["vacationTypeId"] = vacationTypeId,
                    ["year"] = currentYear
                });
        }

        var projectedRemaining = balance.CurrentBalance - totalDays;
        var passed = projectedRemaining >= minDaysRemaining;

        return new ValidationRuleResult(
            passed,
            passed
                ? $"Sufficient balance: {balance.CurrentBalance} days available, {totalDays} requested, {projectedRemaining} remaining."
                : $"Insufficient balance: {balance.CurrentBalance} days available, {totalDays} requested — would leave {projectedRemaining} remaining (minimum {minDaysRemaining}).",
            new Dictionary<string, object?>
            {
                ["ruleCode"] = RuleCode,
                ["currentBalance"] = balance.CurrentBalance,
                ["requestedDays"] = totalDays,
                ["projectedRemaining"] = projectedRemaining,
                ["minDaysRemaining"] = minDaysRemaining
            });
    }

    private static bool TryGetLong(IReadOnlyDictionary<string, object?> ctx, string key, out long value)
    {
        value = 0;
        if (!ctx.TryGetValue(key, out var raw) || raw == null) return false;
        return raw switch
        {
            long l => (value = l) == l,
            int i => (value = i) == i,
            JsonElement je when je.ValueKind == JsonValueKind.Number && je.TryGetInt64(out var l) => (value = l) == l,
            string s when long.TryParse(s, out var l) => (value = l) == l,
            _ => false
        };
    }

    private static bool TryGetDecimal(IReadOnlyDictionary<string, object?> ctx, string key, out decimal value)
    {
        value = 0m;
        if (!ctx.TryGetValue(key, out var raw) || raw == null) return false;
        return raw switch
        {
            decimal d => (value = d) == d,
            double dd => (value = (decimal)dd) == (decimal)dd,
            long l => (value = l) == l,
            int i => (value = i) == i,
            JsonElement je when je.ValueKind == JsonValueKind.Number && je.TryGetDecimal(out var d) => (value = d) == d,
            string s when decimal.TryParse(s, out var d) => (value = d) == d,
            _ => false
        };
    }
}
