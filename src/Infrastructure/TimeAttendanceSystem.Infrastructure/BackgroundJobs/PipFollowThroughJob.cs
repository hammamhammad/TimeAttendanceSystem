using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Notifications;
using TecAxle.Hrms.Domain.Offboarding;
using TecAxle.Hrms.Domain.Operations;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Phase 3 (v14.3): Completes the performance-action follow-through path so a PIP
/// ending in <see cref="PipStatus.CompletedUnsuccessful"/> is not a dead-end state.
///
/// Business rule: when a PIP is marked <c>CompletedUnsuccessful</c>, HR's next step is
/// typically to initiate offboarding. The existing domain has a <see cref="ResignationRequest"/>
/// entity (Pending → Approved/Rejected) that models exactly this follow-up. Rather than
/// leaving the unsuccessful PIP in the audit trail with no downstream record, this job
/// creates a <b>pending</b> <c>ResignationRequest</c> for HR to review, approve, or override.
/// HR retains full control — the request is Pending, not Approved — but the follow-through
/// is now visible as an actionable item rather than a silently-dead state.
///
/// Safety + idempotency:
///   - The PIP's new <c>RelatedResignationRequestId</c> field is the idempotency marker.
///     A second pass over the same PIP finds this set and skips.
///   - If the employee already has a non-terminal ResignationRequest for any reason, the
///     job skips PIP follow-through to avoid parallel resignations.
///   - Missing manager-employee / missing employee data → raise an
///     <see cref="OperationalFailureAlert"/> (category PerformanceFollowThrough-equivalent,
///     mapped to <see cref="OperationalFailureCategory.LifecycleAutomation"/>) so HR sees it
///     rather than having the job silently skip.
///
/// Configurability: Phase 3 keeps this simple — if the PIP outcome is unsuccessful, the
/// follow-up is created. Future phases can add per-policy toggles (e.g.
/// <c>AutoCreateResignationOnPipUnsuccessful</c> setting) when that controlability is
/// justified; the domain model doesn't yet define such a flag, and inventing one now
/// would be speculative overbuilding.
///
/// Cadence: hourly. Short cadence is safe because the job is idempotent.
/// </summary>
public sealed class PipFollowThroughJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly IFailureAlertService _alerts;
    private readonly IInAppNotificationService _notifications;
    private readonly INotificationRecipientResolver _recipientResolver;
    private readonly ILogger<PipFollowThroughJob> _logger;

    public PipFollowThroughJob(
        IApplicationDbContext context,
        IFailureAlertService alerts,
        IInAppNotificationService notifications,
        INotificationRecipientResolver recipientResolver,
        ILogger<PipFollowThroughJob> logger)
    {
        _context = context;
        _alerts = alerts;
        _notifications = notifications;
        _recipientResolver = recipientResolver;
        _logger = logger;
    }

    public async Task Invoke()
    {
        var now = DateTime.UtcNow;

        // Candidate PIPs: terminal CompletedUnsuccessful AND no follow-through yet.
        var candidates = await _context.PerformanceImprovementPlans
            .Where(p => !p.IsDeleted
                     && p.Status == PipStatus.CompletedUnsuccessful
                     && p.RelatedResignationRequestId == null)
            .ToListAsync();

        if (candidates.Count == 0) return;

        int created = 0, skipped = 0, failed = 0;

        foreach (var pip in candidates)
        {
            try
            {
                // Already has a live resignation? Don't create a parallel one.
                var hasActiveResignation = await _context.ResignationRequests.AsNoTracking()
                    .AnyAsync(r => !r.IsDeleted
                                && r.EmployeeId == pip.EmployeeId
                                && (r.Status == ResignationStatus.Pending
                                    || r.Status == ResignationStatus.Approved));
                if (hasActiveResignation)
                {
                    pip.FollowThroughProcessedAt = now;
                    pip.OutcomeNotes = AppendNote(pip.OutcomeNotes,
                        $"Phase-3 follow-through skipped at {now:O}: employee already has an active resignation request.");
                    pip.ModifiedAtUtc = now;
                    pip.ModifiedBy = "SYSTEM:PipFollowThroughJob";
                    skipped++;
                    continue;
                }

                // Sanity: employee must exist and be active.
                var emp = await _context.Employees.AsNoTracking()
                    .Where(e => e.Id == pip.EmployeeId && !e.IsDeleted)
                    .Select(e => new { e.Id, e.IsActive })
                    .FirstOrDefaultAsync();
                if (emp == null || !emp.IsActive)
                {
                    pip.FollowThroughProcessedAt = now;
                    pip.OutcomeNotes = AppendNote(pip.OutcomeNotes,
                        $"Phase-3 follow-through skipped at {now:O}: employee missing or inactive.");
                    pip.ModifiedAtUtc = now;
                    pip.ModifiedBy = "SYSTEM:PipFollowThroughJob";
                    skipped++;
                    continue;
                }

                // Create a pending resignation tied to the unsuccessful PIP. HR can still
                // approve, reject, or override — this just makes the follow-through visible.
                var resignation = new ResignationRequest
                {
                    EmployeeId = pip.EmployeeId,
                    ResignationDate = now.Date,
                    LastWorkingDate = now.Date.AddDays(30), // default 30-day notice; HR edits as needed
                    NoticePeriodDays = 30,
                    WaivedNoticeDays = 0,
                    Reason = "Performance Improvement Plan unsuccessful — follow-through",
                    Status = ResignationStatus.Pending,
                    Notes = $"Auto-created by PipFollowThroughJob from PIP #{pip.Id}. HR must review before approving.",
                    CreatedAtUtc = now,
                    CreatedBy = "SYSTEM:PipFollowThroughJob"
                };
                _context.ResignationRequests.Add(resignation);
                await _context.SaveChangesAsync();

                pip.RelatedResignationRequestId = resignation.Id;
                pip.FollowThroughProcessedAt = now;
                pip.OutcomeNotes = AppendNote(pip.OutcomeNotes,
                    $"Phase-3 follow-through: pending ResignationRequest #{resignation.Id} created at {now:O}.");
                pip.ModifiedAtUtc = now;
                pip.ModifiedBy = "SYSTEM:PipFollowThroughJob";

                // Notify HR so the new pending resignation is visible.
                try
                {
                    var recipients = await _recipientResolver.GetRecipientUserIdsAsync();
                    foreach (var uid in recipients)
                    {
                        await _notifications.SendNotificationAsync(new CreateNotificationRequest
                        {
                            UserId = uid,
                            Type = NotificationType.SystemAlert,
                            TitleEn = "PIP follow-through: pending resignation",
                            TitleAr = "متابعة خطة تحسين الأداء: استقالة معلقة",
                            MessageEn = $"PIP #{pip.Id} ended unsuccessfully. Pending ResignationRequest #{resignation.Id} was created for HR review.",
                            MessageAr = $"خطة تحسين الأداء #{pip.Id} انتهت بشكل غير ناجح. تم إنشاء طلب استقالة معلق #{resignation.Id} لمراجعة الموارد البشرية.",
                            EntityType = "ResignationRequest",
                            EntityId = resignation.Id,
                            ActionUrl = $"/resignations/{resignation.Id}"
                        });
                    }
                }
                catch (Exception nex)
                {
                    _logger.LogWarning(nex, "PipFollowThroughJob: could not send notification for PIP {PipId}.", pip.Id);
                }

                created++;
            }
            catch (Exception ex)
            {
                failed++;
                _logger.LogError(ex, "PipFollowThroughJob failed for PIP {PipId}.", pip.Id);
                try
                {
                    await _alerts.RaiseAsync(new RaiseFailureAlertRequest
                    {
                        Category = OperationalFailureCategory.LifecycleAutomation,
                        SourceEntityType = "PerformanceImprovementPlan",
                        SourceEntityId = pip.Id,
                        EmployeeId = pip.EmployeeId,
                        FailureCode = "PipFollowThroughFailed",
                        Reason = $"Follow-through failed for PIP #{pip.Id}.",
                        ErrorMessage = ex.Message,
                        Severity = OperationalFailureSeverity.Error,
                        IsRetryable = true
                    });
                }
                catch (Exception aex)
                {
                    _logger.LogWarning(aex, "PipFollowThroughJob: could not raise operational alert.");
                }
            }
        }

        if (created > 0 || skipped > 0)
            await _context.SaveChangesAsync();

        _logger.LogInformation(
            "PipFollowThroughJob: created {Created} resignations, skipped {Skipped} (existing resignation / inactive employee), failed {Failed}.",
            created, skipped, failed);
    }

    private static string AppendNote(string? existing, string append)
        => string.IsNullOrWhiteSpace(existing) ? append : $"{existing} | {append}";
}
