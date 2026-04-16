using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Onboarding;

namespace TecAxle.Hrms.Application.Lifecycle.Commands;

/// <summary>
/// Idempotent. Creates an <see cref="OnboardingProcess"/> + task list from the best-matching
/// template for the employee linked to the offer. Returns the process id on success, a
/// descriptive failure when no template can be resolved or one already exists.
/// </summary>
public record CreateOnboardingProcessFromOfferCommand(
    long OfferLetterId,
    long? DefaultTemplateId,
    long? TriggeredByUserId
) : IRequest<Result<long?>>;

public class CreateOnboardingProcessFromOfferCommandHandler
    : BaseHandler<CreateOnboardingProcessFromOfferCommand, Result<long?>>
{
    public CreateOnboardingProcessFromOfferCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long?>> Handle(
        CreateOnboardingProcessFromOfferCommand request, CancellationToken cancellationToken)
    {
        var offer = await Context.OfferLetters
            .Include(o => o.JobApplication).ThenInclude(a => a.JobPosting).ThenInclude(p => p.JobRequisition)
            .FirstOrDefaultAsync(o => o.Id == request.OfferLetterId && !o.IsDeleted, cancellationToken);

        if (offer == null)
            return Result.Failure<long?>("Offer letter not found.");

        if (offer.CreatedEmployeeId == null)
            return Result.Failure<long?>("Offer has no linked employee — accept the offer first.");

        var employeeId = offer.CreatedEmployeeId.Value;

        // Defense-in-depth: if the employee already has an open onboarding process, skip.
        var existing = await Context.OnboardingProcesses.AnyAsync(
            p => p.EmployeeId == employeeId
                 && !p.IsDeleted
                 && (p.Status == OnboardingStatus.NotStarted || p.Status == OnboardingStatus.InProgress),
            cancellationToken);
        if (existing)
            return Result.Success<long?>(null); // caller interprets null as "nothing to do".

        var requisition = offer.JobApplication.JobPosting.JobRequisition;

        // Template selection: explicit default overrides; otherwise dept → branch → IsDefault (v13.x logic).
        OnboardingTemplate? template = null;
        if (request.DefaultTemplateId is long tid)
        {
            template = await Context.OnboardingTemplates
                .Include(t => t.Tasks.Where(task => !task.IsDeleted))
                .FirstOrDefaultAsync(t => t.Id == tid && t.IsActive && !t.IsDeleted, cancellationToken);
        }

        if (template == null)
        {
            template = await Context.OnboardingTemplates
                .Include(t => t.Tasks.Where(task => !task.IsDeleted))
                .Where(t => t.IsActive && !t.IsDeleted
                    && (t.DepartmentId == requisition.DepartmentId || t.DepartmentId == null)
                    && (t.BranchId == requisition.BranchId || t.BranchId == null))
                .OrderByDescending(t => t.DepartmentId.HasValue)
                .ThenByDescending(t => t.BranchId.HasValue)
                .ThenByDescending(t => t.IsDefault)
                .FirstOrDefaultAsync(cancellationToken);
        }

        if (template == null)
            return Result.Failure<long?>(
                $"No onboarding template available for department {requisition.DepartmentId} / branch {requisition.BranchId}.");

        var activeTasks = template.Tasks.Where(t => !t.IsDeleted).ToList();

        var process = new OnboardingProcess
        {
            EmployeeId = employeeId,
            OnboardingTemplateId = template.Id,
            StartDate = offer.StartDate,
            ExpectedCompletionDate = offer.StartDate.AddDays(
                activeTasks.Count > 0 ? activeTasks.Max(t => t.DueDaysAfterJoining) : 30),
            Status = OnboardingStatus.InProgress,
            TotalTasks = activeTasks.Count,
            CompletedTasks = 0,
            OfferLetterId = offer.Id,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        Context.OnboardingProcesses.Add(process);
        await Context.SaveChangesAsync(cancellationToken);

        foreach (var templateTask in activeTasks.OrderBy(t => t.DisplayOrder))
        {
            Context.OnboardingTasks.Add(new OnboardingTask
            {
                OnboardingProcessId = process.Id,
                OnboardingTemplateTaskId = templateTask.Id,
                TaskName = templateTask.TaskName,
                TaskNameAr = templateTask.TaskNameAr,
                Description = templateTask.Description,
                Category = templateTask.Category,
                DueDate = offer.StartDate.AddDays(templateTask.DueDaysAfterJoining),
                IsRequired = templateTask.IsRequired,
                Priority = templateTask.Priority,
                Status = OnboardingTaskStatus.Pending,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = CurrentUser.Username ?? "SYSTEM"
            });
        }

        await Context.SaveChangesAsync(cancellationToken);
        return Result.Success<long?>(process.Id);
    }
}
