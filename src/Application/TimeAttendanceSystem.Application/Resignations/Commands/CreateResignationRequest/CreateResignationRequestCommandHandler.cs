using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.Resignations.Commands.CreateResignationRequest;

public class CreateResignationRequestCommandHandler : BaseHandler<CreateResignationRequestCommand, Result<long>>
{
    public CreateResignationRequestCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(CreateResignationRequestCommand request, CancellationToken cancellationToken)
    {
        var employee = await Context.Employees
            .FirstOrDefaultAsync(e => e.Id == request.EmployeeId && !e.IsDeleted, cancellationToken);

        if (employee == null)
            return Result.Failure<long>("Employee not found.");

        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any() && !CurrentUser.BranchIds.Contains(employee.BranchId))
            return Result.Failure<long>("Access denied to this employee's branch.");

        var hasPending = await Context.ResignationRequests
            .AnyAsync(r => r.EmployeeId == request.EmployeeId
                        && r.Status == ResignationStatus.Pending
                        && !r.IsDeleted, cancellationToken);

        if (hasPending)
            return Result.Failure<long>("Employee already has a pending resignation request.");

        var noticePeriodDays = employee.NoticePeriodDays ?? 30;

        var resignation = new ResignationRequest
        {
            EmployeeId = request.EmployeeId,
            ResignationDate = request.ResignationDate,
            LastWorkingDate = request.LastWorkingDate,
            NoticePeriodDays = noticePeriodDays,
            Reason = request.Reason,
            ReasonAr = request.ReasonAr,
            Status = ResignationStatus.Pending,
            SubmittedByUserId = CurrentUser.UserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "system"
        };

        Context.ResignationRequests.Add(resignation);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(resignation.Id);
    }
}
