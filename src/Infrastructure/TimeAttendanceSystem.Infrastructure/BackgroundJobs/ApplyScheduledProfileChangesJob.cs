using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that applies scheduled employee profile changes when their effective date is reached.
/// Queries EmployeeProfileChanges where EffectiveDate &lt;= today and IsApplied == false,
/// then updates the corresponding Employee properties.
/// </summary>
public class ApplyScheduledProfileChangesJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<ApplyScheduledProfileChangesJob> _logger;

    public ApplyScheduledProfileChangesJob(IApplicationDbContext context, ILogger<ApplyScheduledProfileChangesJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting apply scheduled profile changes job at {Time}", DateTime.UtcNow);

        try
        {
            var today = DateTime.UtcNow.Date;

            var pendingChanges = await _context.EmployeeProfileChanges
                .Include(pc => pc.Employee)
                .Where(pc => pc.EffectiveDate.Date <= today
                    && !pc.IsApplied
                    && !pc.IsDeleted)
                .OrderBy(pc => pc.EffectiveDate)
                .ThenBy(pc => pc.Id)
                .ToListAsync();

            if (!pendingChanges.Any())
            {
                _logger.LogInformation("No pending profile changes to apply");
                return;
            }

            int appliedCount = 0;
            int errorCount = 0;

            foreach (var change in pendingChanges)
            {
                try
                {
                    var employee = change.Employee;
                    if (employee == null || employee.IsDeleted)
                    {
                        _logger.LogWarning("Skipping profile change {ChangeId}: employee not found or deleted", change.Id);
                        continue;
                    }

                    ApplyFieldChange(employee, change.FieldName, change.NewValue);

                    employee.ModifiedAtUtc = DateTime.UtcNow;
                    employee.ModifiedBy = "SYSTEM";

                    change.IsApplied = true;
                    change.AppliedAt = DateTime.UtcNow;
                    change.ModifiedAtUtc = DateTime.UtcNow;
                    change.ModifiedBy = "SYSTEM";

                    appliedCount++;
                    _logger.LogInformation("Applied profile change {ChangeId}: {FieldName} for employee {EmployeeId}",
                        change.Id, change.FieldName, change.EmployeeId);
                }
                catch (Exception ex)
                {
                    errorCount++;
                    _logger.LogError(ex, "Error applying profile change {ChangeId} for employee {EmployeeId}",
                        change.Id, change.EmployeeId);
                }
            }

            await _context.SaveChangesAsync(default);
            _logger.LogInformation("Apply scheduled profile changes job completed: {Applied} applied, {Errors} errors",
                appliedCount, errorCount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running apply scheduled profile changes job");
            throw;
        }
    }

    private static void ApplyFieldChange(Domain.Employees.Employee employee, string fieldName, string? newValue)
    {
        switch (fieldName)
        {
            case "DepartmentId":
                employee.DepartmentId = string.IsNullOrEmpty(newValue) ? null : long.Parse(newValue);
                break;
            case "ManagerEmployeeId":
                employee.ManagerEmployeeId = string.IsNullOrEmpty(newValue) ? null : long.Parse(newValue);
                break;
            case "JobTitle":
                employee.JobTitle = newValue ?? string.Empty;
                break;
            case "JobTitleAr":
                employee.JobTitleAr = newValue;
                break;
            case "BranchId":
                if (!string.IsNullOrEmpty(newValue))
                    employee.BranchId = long.Parse(newValue);
                break;
            case "EmploymentStatus":
                if (!string.IsNullOrEmpty(newValue) && Enum.TryParse<EmploymentStatus>(newValue, out var status))
                    employee.EmploymentStatus = status;
                break;
            case "WorkLocationType":
                if (!string.IsNullOrEmpty(newValue) && Enum.TryParse<WorkLocationType>(newValue, out var locationType))
                    employee.WorkLocationType = locationType;
                break;
            case "JobGradeId":
                employee.JobGradeId = string.IsNullOrEmpty(newValue) ? null : long.Parse(newValue);
                break;
            case "CostCenter":
                employee.CostCenter = newValue;
                break;
            case "IsActive":
                if (bool.TryParse(newValue, out var isActive))
                    employee.IsActive = isActive;
                break;
            default:
                throw new InvalidOperationException($"Unsupported profile change field: {fieldName}");
        }
    }
}
