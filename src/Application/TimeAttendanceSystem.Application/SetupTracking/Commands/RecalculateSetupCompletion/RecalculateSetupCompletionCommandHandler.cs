using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.SetupTracking.Dtos;
using TecAxle.Hrms.Domain.Configuration;

namespace TecAxle.Hrms.Application.SetupTracking.Commands.RecalculateSetupCompletion;

public class RecalculateSetupCompletionCommandHandler : BaseHandler<RecalculateSetupCompletionCommand, Result<SetupStatusDto>>
{
    private readonly IMasterDbContext _masterContext;
    private readonly ITenantContext _tenantContext;

    public RecalculateSetupCompletionCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IMasterDbContext masterContext,
        ITenantContext tenantContext)
        : base(context, currentUser)
    {
        _masterContext = masterContext;
        _tenantContext = tenantContext;
    }

    protected override IMasterDbContext? GetMasterContext() => _masterContext;

    public override async Task<Result<SetupStatusDto>> Handle(RecalculateSetupCompletionCommand request, CancellationToken cancellationToken)
    {
        var tenantId = _tenantContext.TenantId ?? await ResolveTenantIdAsync(cancellationToken);
        if (tenantId == null)
            return Result.Failure<SetupStatusDto>("Tenant context not resolved");

        // Initialize steps if they don't exist
        var steps = await Context.SetupSteps
            .Where(s => s.TenantId == tenantId.Value && !s.IsDeleted)
            .ToListAsync(cancellationToken);

        if (!steps.Any())
        {
            steps = CreateDefaultSteps(tenantId.Value);
            Context.SetupSteps.AddRange(steps);
        }

        var username = CurrentUser.Username ?? "SYSTEM";

        // Auto-detect completion
        await DetectCompanyInfo(steps, tenantId.Value, username, cancellationToken);
        await DetectBranches(steps, tenantId.Value, username, cancellationToken);
        await DetectDepartments(steps, tenantId.Value, username, cancellationToken);
        await DetectShifts(steps, username, cancellationToken);
        await DetectVacationTypes(steps, username, cancellationToken);
        await DetectExcusePolicies(steps, username, cancellationToken);
        await DetectWorkflows(steps, username, cancellationToken);
        await DetectEmployees(steps, tenantId.Value, username, cancellationToken);

        await Context.SaveChangesAsync(cancellationToken);

        // Build response
        var dto = new SetupStatusDto
        {
            TenantId = tenantId.Value,
            TotalSteps = steps.Count,
            CompletedSteps = steps.Count(s => s.IsCompleted),
            RequiredSteps = steps.Count(s => s.IsRequired),
            CompletedRequiredSteps = steps.Count(s => s.IsRequired && s.IsCompleted),
            Steps = steps.OrderBy(s => s.SortOrder).Select(s => new SetupStepDto
            {
                Id = s.Id,
                StepKey = s.StepKey,
                Category = s.Category,
                IsCompleted = s.IsCompleted,
                CompletedAtUtc = s.CompletedAtUtc,
                IsRequired = s.IsRequired,
                SortOrder = s.SortOrder
            }).ToList()
        };

        dto.CompletionPercentage = dto.TotalSteps > 0
            ? Math.Round((double)dto.CompletedSteps / dto.TotalSteps * 100, 1)
            : 0;

        var nextStep = steps.OrderBy(s => s.SortOrder).FirstOrDefault(s => !s.IsCompleted && s.IsRequired);
        dto.NextRecommendedStep = nextStep?.StepKey;

        dto.Categories = steps
            .GroupBy(s => s.Category)
            .Select(g => new SetupCategoryDto
            {
                Category = g.Key,
                Total = g.Count(),
                Completed = g.Count(s => s.IsCompleted),
                Percentage = g.Count() > 0 ? Math.Round((double)g.Count(s => s.IsCompleted) / g.Count() * 100, 1) : 0
            }).ToList();

        return Result.Success(dto);
    }

    private static List<SetupStep> CreateDefaultSteps(long tenantId)
    {
        return new List<SetupStep>
        {
            new() { TenantId = tenantId, StepKey = "company_info", Category = "Organization", IsRequired = true, SortOrder = 1, CreatedBy = "SYSTEM" },
            new() { TenantId = tenantId, StepKey = "branches", Category = "Organization", IsRequired = true, SortOrder = 2, CreatedBy = "SYSTEM" },
            new() { TenantId = tenantId, StepKey = "departments", Category = "Organization", IsRequired = true, SortOrder = 3, CreatedBy = "SYSTEM" },
            new() { TenantId = tenantId, StepKey = "shifts", Category = "TimeAttendance", IsRequired = true, SortOrder = 4, CreatedBy = "SYSTEM" },
            new() { TenantId = tenantId, StepKey = "vacation_types", Category = "Leave", IsRequired = true, SortOrder = 5, CreatedBy = "SYSTEM" },
            new() { TenantId = tenantId, StepKey = "excuse_policies", Category = "Leave", IsRequired = false, SortOrder = 6, CreatedBy = "SYSTEM" },
            new() { TenantId = tenantId, StepKey = "workflows", Category = "TimeAttendance", IsRequired = true, SortOrder = 7, CreatedBy = "SYSTEM" },
            new() { TenantId = tenantId, StepKey = "employees", Category = "Organization", IsRequired = true, SortOrder = 8, CreatedBy = "SYSTEM" },
            new() { TenantId = tenantId, StepKey = "payroll", Category = "Payroll", IsRequired = false, SortOrder = 9, CreatedBy = "SYSTEM" },
        };
    }

    private void MarkStep(List<SetupStep> steps, string stepKey, bool completed, string username)
    {
        var step = steps.FirstOrDefault(s => s.StepKey == stepKey);
        if (step == null) return;

        if (completed && !step.IsCompleted)
        {
            step.IsCompleted = true;
            step.CompletedAtUtc = DateTime.UtcNow;
            step.CompletedByUserId = username;
        }
        else if (!completed && step.IsCompleted)
        {
            step.IsCompleted = false;
            step.CompletedAtUtc = null;
            step.CompletedByUserId = null;
        }
    }

    private async Task DetectCompanyInfo(List<SetupStep> steps, long tenantId, string username, CancellationToken ct)
    {
        var tenant = await _masterContext.Tenants.AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId && !t.IsDeleted, ct);
        var completed = tenant != null
            && !string.IsNullOrWhiteSpace(tenant.CompanyRegistrationNumber)
            && !string.IsNullOrWhiteSpace(tenant.Country)
            && !string.IsNullOrWhiteSpace(tenant.City);
        MarkStep(steps, "company_info", completed, username);
    }

    private async Task DetectBranches(List<SetupStep> steps, long tenantId, string username, CancellationToken ct)
    {
        var hasBranches = await Context.Branches.AnyAsync(b => b.IsActive && !b.IsDeleted, ct);
        MarkStep(steps, "branches", hasBranches, username);
    }

    private async Task DetectDepartments(List<SetupStep> steps, long tenantId, string username, CancellationToken ct)
    {
        var hasDepts = await Context.Departments.AnyAsync(d => d.IsActive && !d.IsDeleted, ct);
        MarkStep(steps, "departments", hasDepts, username);
    }

    private async Task DetectShifts(List<SetupStep> steps, string username, CancellationToken ct)
    {
        var hasShifts = await Context.Shifts.AnyAsync(s => !s.IsDeleted, ct);
        MarkStep(steps, "shifts", hasShifts, username);
    }

    private async Task DetectVacationTypes(List<SetupStep> steps, string username, CancellationToken ct)
    {
        var count = await Context.VacationTypes.CountAsync(v => v.IsActive && !v.IsDeleted, ct);
        MarkStep(steps, "vacation_types", count >= 2, username);
    }

    private async Task DetectExcusePolicies(List<SetupStep> steps, string username, CancellationToken ct)
    {
        var has = await Context.ExcusePolicies.AnyAsync(e => e.IsActive && !e.IsDeleted, ct);
        MarkStep(steps, "excuse_policies", has, username);
    }

    private async Task DetectWorkflows(List<SetupStep> steps, string username, CancellationToken ct)
    {
        var has = await Context.WorkflowDefinitions.AnyAsync(w => w.IsActive && !w.IsDeleted, ct);
        MarkStep(steps, "workflows", has, username);
    }

    private async Task DetectEmployees(List<SetupStep> steps, long tenantId, string username, CancellationToken ct)
    {
        var has = await Context.Employees.AnyAsync(e => !e.IsDeleted, ct);
        MarkStep(steps, "employees", has, username);
    }
}
