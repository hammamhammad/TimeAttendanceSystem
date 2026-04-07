using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.Terminations.Commands.CreateTerminationRecord;

public class CreateTerminationRecordCommandHandler : BaseHandler<CreateTerminationRecordCommand, Result<long>>
{
    public CreateTerminationRecordCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateTerminationRecordCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        // Update employee
        employee.EmploymentStatus = EmploymentStatus.Terminated;
        employee.TerminationDate = request.TerminationDate;
        employee.LastWorkingDate = request.LastWorkingDate;
        employee.IsActive = false;
        employee.ModifiedAtUtc = DateTime.UtcNow;
        employee.ModifiedBy = CurrentUser.Username;

        var termination = new TerminationRecord
        {
            EmployeeId = request.EmployeeId,
            TerminationType = request.TerminationType,
            TerminationDate = request.TerminationDate,
            LastWorkingDate = request.LastWorkingDate,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            ResignationRequestId = request.ResignationRequestId,
            ProcessedByUserId = CurrentUser.UserId,
            Notes = request.Notes,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.TerminationRecords.Add(termination);
        await Context.SaveChangesAsync(cancellationToken);

        // Auto-create clearance checklist with default items
        var checklist = new ClearanceChecklist
        {
            TerminationRecordId = termination.Id,
            EmployeeId = request.EmployeeId,
            OverallStatus = ClearanceStatus.Pending,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.ClearanceChecklists.Add(checklist);
        await Context.SaveChangesAsync(cancellationToken);

        var defaultItems = new List<ClearanceItem>
        {
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.IT, ItemName = "Return laptop and equipment", ItemNameAr = "إعادة اللابتوب والمعدات", DisplayOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.IT, ItemName = "Revoke system access", ItemNameAr = "إلغاء صلاحيات النظام", DisplayOrder = 2, CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Finance, ItemName = "Settle outstanding advances", ItemNameAr = "تسوية السلف المستحقة", DisplayOrder = 3, CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Finance, ItemName = "Return company credit card", ItemNameAr = "إعادة بطاقة الشركة الائتمانية", DisplayOrder = 4, CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Admin, ItemName = "Return access card and keys", ItemNameAr = "إعادة بطاقة الدخول والمفاتيح", DisplayOrder = 5, CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.Admin, ItemName = "Return parking permit", ItemNameAr = "إعادة تصريح المواقف", DisplayOrder = 6, CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.HR, ItemName = "Complete exit interview", ItemNameAr = "إتمام مقابلة نهاية الخدمة", DisplayOrder = 7, CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "system" },
            new() { ClearanceChecklistId = checklist.Id, Department = ClearanceDepartment.HR, ItemName = "Sign final settlement", ItemNameAr = "توقيع التسوية النهائية", DisplayOrder = 8, CreatedAtUtc = DateTime.UtcNow, CreatedBy = CurrentUser.Username ?? "system" },
        };

        Context.ClearanceItems.AddRange(defaultItems);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(termination.Id);
    }
}
