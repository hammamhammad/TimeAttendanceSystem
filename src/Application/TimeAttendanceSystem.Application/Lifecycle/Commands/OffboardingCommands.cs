using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.Lifecycle.Commands;

// --- Create termination from resignation ---
public record CreateTerminationFromResignationCommand(
    long ResignationRequestId,
    long? TriggeredByUserId
) : IRequest<Result<long?>>;

public class CreateTerminationFromResignationCommandHandler
    : BaseHandler<CreateTerminationFromResignationCommand, Result<long?>>
{
    public CreateTerminationFromResignationCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long?>> Handle(
        CreateTerminationFromResignationCommand request, CancellationToken cancellationToken)
    {
        var resignation = await Context.ResignationRequests
            .Include(r => r.Employee)
            .FirstOrDefaultAsync(r => r.Id == request.ResignationRequestId && !r.IsDeleted, cancellationToken);

        if (resignation == null)
            return Result.Failure<long?>("Resignation request not found.");

        if (resignation.Status != ResignationStatus.Approved)
            return Result.Failure<long?>("Only approved resignation requests can produce a termination.");

        // Defense-in-depth: skip if a termination already references this resignation.
        var existing = await Context.TerminationRecords.AnyAsync(
            t => t.ResignationRequestId == request.ResignationRequestId && !t.IsDeleted, cancellationToken);
        if (existing)
            return Result.Success<long?>(null); // interpreted as "nothing to do".

        var termination = new TerminationRecord
        {
            EmployeeId = resignation.EmployeeId,
            TerminationType = TerminationType.Resignation,
            TerminationDate = resignation.ResignationDate,
            LastWorkingDate = resignation.LastWorkingDate,
            Reason = resignation.Reason,
            ReasonAr = resignation.ReasonAr,
            ResignationRequestId = resignation.Id,
            ProcessedByUserId = request.TriggeredByUserId ?? CurrentUser.UserId,
            Notes = "Auto-created from approved resignation request.",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        // Minimal employee state update — does NOT deactivate. The termination-created handler
        // drives suspension/clearance creation based on tenant config.
        var employee = resignation.Employee;
        employee.EmploymentStatus = EmploymentStatus.Terminated;
        employee.TerminationDate = resignation.ResignationDate;
        employee.LastWorkingDate = resignation.LastWorkingDate;
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username ?? "SYSTEM";

        Context.TerminationRecords.Add(termination);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success<long?>(termination.Id);
    }
}

// --- Create clearance checklist ---
// Optional templateId is currently a forward-compat hook — there is no dedicated
// ClearanceTemplate entity yet, so when null we seed the 8 hardcoded defaults that
// v13.x already shipped (IT×2, Finance×2, Admin×2, HR×2). Recording which path was
// taken via the audit row's ContextJson lets us migrate to real templates later.
public record CreateClearanceFromTemplateCommand(
    long TerminationRecordId,
    long? TemplateId,
    long? TriggeredByUserId
) : IRequest<Result<long?>>;

public class CreateClearanceFromTemplateCommandHandler
    : BaseHandler<CreateClearanceFromTemplateCommand, Result<long?>>
{
    public CreateClearanceFromTemplateCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long?>> Handle(
        CreateClearanceFromTemplateCommand request, CancellationToken cancellationToken)
    {
        var termination = await Context.TerminationRecords.FirstOrDefaultAsync(
            t => t.Id == request.TerminationRecordId && !t.IsDeleted, cancellationToken);

        if (termination == null)
            return Result.Failure<long?>("Termination record not found.");

        var exists = await Context.ClearanceChecklists.AnyAsync(
            c => c.TerminationRecordId == request.TerminationRecordId && !c.IsDeleted, cancellationToken);
        if (exists)
            return Result.Success<long?>(null); // idempotent.

        var checklist = new ClearanceChecklist
        {
            TerminationRecordId = termination.Id,
            EmployeeId = termination.EmployeeId,
            OverallStatus = ClearanceStatus.Pending,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "SYSTEM"
        };

        Context.ClearanceChecklists.Add(checklist);
        await Context.SaveChangesAsync(cancellationToken);

        var by = CurrentUser.Username ?? "SYSTEM";
        var defaultItems = new List<ClearanceItem>
        {
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.IT, ItemName = "Return laptop and equipment", ItemNameAr = "إعادة اللابتوب والمعدات", DisplayOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = by },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.IT, ItemName = "Revoke system access", ItemNameAr = "إلغاء صلاحيات النظام", DisplayOrder = 2, CreatedAtUtc = DateTime.UtcNow, CreatedBy = by },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Finance, ItemName = "Settle outstanding advances", ItemNameAr = "تسوية السلف المستحقة", DisplayOrder = 3, CreatedAtUtc = DateTime.UtcNow, CreatedBy = by },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Finance, ItemName = "Return company credit card", ItemNameAr = "إعادة بطاقة الشركة الائتمانية", DisplayOrder = 4, CreatedAtUtc = DateTime.UtcNow, CreatedBy = by },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Admin, ItemName = "Return access card and keys", ItemNameAr = "إعادة بطاقة الدخول والمفاتيح", DisplayOrder = 5, CreatedAtUtc = DateTime.UtcNow, CreatedBy = by },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Admin, ItemName = "Return parking permit", ItemNameAr = "إعادة تصريح المواقف", DisplayOrder = 6, CreatedAtUtc = DateTime.UtcNow, CreatedBy = by },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.HR, ItemName = "Complete exit interview", ItemNameAr = "إتمام مقابلة نهاية الخدمة", DisplayOrder = 7, CreatedAtUtc = DateTime.UtcNow, CreatedBy = by },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.HR, ItemName = "Sign final settlement", ItemNameAr = "توقيع التسوية النهائية", DisplayOrder = 8, CreatedAtUtc = DateTime.UtcNow, CreatedBy = by },
        };

        Context.ClearanceItems.AddRange(defaultItems);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success<long?>(checklist.Id);
    }
}

// --- Apply contract expired action ---
public record ApplyContractExpiredActionCommand(
    long ContractId,
    ContractExpiredAction Action
) : IRequest<Result<string>>;

public class ApplyContractExpiredActionCommandHandler
    : BaseHandler<ApplyContractExpiredActionCommand, Result<string>>
{
    private readonly IMediator _mediator;

    public ApplyContractExpiredActionCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IMediator mediator)
        : base(context, currentUser)
    {
        _mediator = mediator;
    }

    public override async Task<Result<string>> Handle(
        ApplyContractExpiredActionCommand request, CancellationToken cancellationToken)
    {
        var contract = await Context.EmployeeContracts
            .Include(c => c.Employee)
            .FirstOrDefaultAsync(c => c.Id == request.ContractId && !c.IsDeleted, cancellationToken);

        if (contract == null)
            return Result.Failure<string>("Contract not found.");

        // NotifyOnly is a no-op at the command level — the alert job has already sent notifications.
        if (request.Action == ContractExpiredAction.NotifyOnly)
            return Result.Success("NotifyOnly — no state change.");

        // Guard: the calling job has already filtered to EndDate <= today + Status==Active,
        // so if we got here we should flip Status unless an earlier run already did.
        if (contract.Status == ContractStatus.Active)
        {
            contract.Status = ContractStatus.Expired;
            contract.ModifiedAtUtc = DateTime.UtcNow;
            contract.ModifiedBy = CurrentUser.Username ?? "SYSTEM";
            await Context.SaveChangesAsync(cancellationToken);
        }

        // Respect "employee already inactive" short-circuit.
        if (!contract.Employee.IsActive && request.Action != ContractExpiredAction.AutoMarkExpired)
            return Result.Success("Contract marked Expired; employee was already inactive.");

        switch (request.Action)
        {
            case ContractExpiredAction.Suspend:
                await _mediator.Send(new SuspendEmployeeCommand(
                    contract.EmployeeId,
                    $"Contract {contract.ContractNumber} expired.",
                    CurrentUser.UserId), cancellationToken);
                return Result.Success("Contract expired → employee suspended.");

            case ContractExpiredAction.Deactivate:
                await _mediator.Send(new DeactivateEmployeeCommand(
                    contract.EmployeeId,
                    $"Contract {contract.ContractNumber} expired.",
                    CurrentUser.UserId), cancellationToken);
                return Result.Success("Contract expired → employee deactivated.");

            case ContractExpiredAction.AutoMarkExpired:
            default:
                return Result.Success("Contract marked Expired.");
        }
    }
}
